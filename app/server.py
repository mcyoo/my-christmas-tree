import json
import math
import os
import re
import secrets
import sqlite3
from datetime import datetime, timezone
from html import escape
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
DB_PATH = os.environ.get("DATABASE_PATH", str(BASE_DIR / "data" / "trees.sqlite"))
PAGE = (STATIC_DIR / "index.html").read_text(encoding="utf-8")

MAX_ITEMS = 80
MAX_TITLE = 40
CODE_RE = re.compile(r"^[a-z0-9]{8}$")
COLOR_RE = re.compile(r"^#[0-9a-fA-F]{6}$")
ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"
DEFAULT_TITLE = "나의 크리스마스 트리"

ORNAMENT_TYPES = {
    "bauble",
    "star",
    "light",
    "candy",
    "gift",
    "bell",
    "snowflake",
    "bow",
    "heart",
    "gingerbread",
    "stocking",
    "pinecone",
    "icicle",
    "teardrop",
    "angel",
    "poinsettia",
    "nutcracker",
    "snowman",
    "santa",
    "reindeer",
    "cardinal",
    "holly",
    "candle",
    "apple",
    "egg",
    "wreath",
    "mitten",
    "strand",
    "photo",
}
TREE_STYLES = {"green", "snow", "wood"}
TWINKLES = {"steady", "soft", "chase", "spark", "random"}
MEDIA_RE = re.compile(r"^[a-z0-9]{16}$")
MEDIA_EXTS = {".jpg", ".png", ".webp", ".gif", ".mp4", ".webm"}
MAX_PHOTOS = 5

app = Flask(__name__, static_folder=str(STATIC_DIR))
app.json.ensure_ascii = False
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024


def connect():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA journal_mode=WAL")
    return connection


def init_db():
    Path(DB_PATH).parent.mkdir(parents=True, exist_ok=True)
    with connect() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS trees (
                code TEXT PRIMARY KEY,
                edit_token TEXT NOT NULL,
                title TEXT NOT NULL,
                items TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )


def now():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def error(message, status):
    return jsonify({"error": message}), status


def media_dir():
    return Path(DB_PATH).parent / "media"


def media_path(media_id):
    if not MEDIA_RE.fullmatch(media_id or ""):
        return None
    folder = media_dir()
    for ext in MEDIA_EXTS:
        path = folder / f"{media_id}{ext}"
        if path.is_file():
            return path
    return None


def clean_item(raw):
    if not isinstance(raw, dict):
        return None
    ornament_type = raw.get("type")
    if ornament_type not in ORNAMENT_TYPES:
        return None
    color = raw.get("color")
    if not isinstance(color, str) or not COLOR_RE.fullmatch(color):
        return None
    try:
        x = float(raw.get("x"))
        y = float(raw.get("y"))
        rot = float(raw.get("rot", 0))
        scale = float(raw.get("scale", 1))
    except (TypeError, ValueError):
        return None
    if not all(math.isfinite(value) for value in (x, y, rot, scale)):
        return None
    if not (0 <= x <= 1 and 0 <= y <= 1):
        return None
    rot = math.fmod(rot, math.tau)
    if rot > math.pi:
        rot -= math.tau
    elif rot < -math.pi:
        rot += math.tau
    scale = max(0.45, min(2.4, scale))
    item = {
        "type": ornament_type,
        "color": color.lower(),
        "x": round(x, 4),
        "y": round(y, 4),
        "rot": round(rot, 4),
        "scale": round(scale, 3),
    }
    if ornament_type == "photo":
        media_id = raw.get("media")
        kind = raw.get("kind")
        if kind not in {"image", "video"} or media_path(media_id) is None:
            return None
        item["media"] = media_id
        item["kind"] = kind
    return item


def clean_payload(data):
    if not isinstance(data, dict):
        return None, "요청 형식이 올바르지 않습니다."
    title = data.get("title") or DEFAULT_TITLE
    if not isinstance(title, str):
        return None, "트리 이름이 올바르지 않습니다."
    title = " ".join(title.split())[:MAX_TITLE] or DEFAULT_TITLE
    items = data.get("items", [])
    if not isinstance(items, list):
        return None, "장식 목록이 올바르지 않습니다."
    if len(items) > MAX_ITEMS:
        return None, f"장식은 {MAX_ITEMS}개까지 올릴 수 있습니다."
    cleaned = []
    for raw in items:
        item = clean_item(raw)
        if item is None:
            return None, "장식 정보가 올바르지 않습니다."
        cleaned.append(item)
    if sum(item["type"] == "photo" for item in cleaned) > MAX_PHOTOS:
        return None, f"사진과 영상은 {MAX_PHOTOS}개까지 올릴 수 있습니다."
    tree = data.get("tree") or "green"
    twinkle = data.get("twinkle") or "soft"
    if tree not in TREE_STYLES or twinkle not in TWINKLES:
        return None, "트리 설정이 올바르지 않습니다."
    return {"title": title, "items": cleaned, "tree": tree, "twinkle": twinkle}, None


def load_document(raw):
    data = json.loads(raw)
    if isinstance(data, list):
        return {"items": data, "tree": "green", "twinkle": "soft"}
    if not isinstance(data, dict):
        return {"items": [], "tree": "green", "twinkle": "soft"}
    tree = data.get("tree") if data.get("tree") in TREE_STYLES else "green"
    twinkle = data.get("twinkle") if data.get("twinkle") in TWINKLES else "soft"
    items = data.get("items") if isinstance(data.get("items"), list) else []
    return {"items": items, "tree": tree, "twinkle": twinkle}


def dump_document(payload):
    return json.dumps(
        {"items": payload["items"], "tree": payload["tree"], "twinkle": payload["twinkle"]},
        ensure_ascii=False,
    )


def public_tree(row, include_token=False):
    document = load_document(row["items"])
    payload = {
        "code": row["code"],
        "title": row["title"],
        "items": document["items"],
        "tree": document["tree"],
        "twinkle": document["twinkle"],
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
    }
    if include_token:
        payload["edit_token"] = row["edit_token"]
    return payload


def new_code(connection):
    for _ in range(8):
        code = "".join(secrets.choice(ALPHABET) for _ in range(8))
        exists = connection.execute("SELECT 1 FROM trees WHERE code = ?", (code,)).fetchone()
        if exists is None:
            return code
    raise RuntimeError("공유 코드를 만들지 못했습니다.")


def render_page(title=None):
    safe_title = escape(title or "나만의 크리스마스 트리 꾸미기")
    response = app.response_class(PAGE.replace("__PAGE_TITLE__", safe_title), mimetype="text/html; charset=utf-8")
    response.headers["Cache-Control"] = "no-cache"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


def send_static(directory, name):
    response = send_from_directory(directory, name)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Cache-Control"] = "no-cache"
    return response


@app.get("/api/health")
def health():
    return jsonify({"ok": True})


@app.post("/api/trees")
def create_tree():
    payload, message = clean_payload(request.get_json(silent=True))
    if message:
        return error(message, 400)
    stamp = now()
    token = secrets.token_urlsafe(24)
    with connect() as connection:
        code = new_code(connection)
        connection.execute(
            """
            INSERT INTO trees (code, edit_token, title, items, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (code, token, payload["title"], dump_document(payload), stamp, stamp),
        )
        row = connection.execute("SELECT * FROM trees WHERE code = ?", (code,)).fetchone()
    return jsonify(public_tree(row, include_token=True)), 201


@app.get("/api/trees/<code>")
def read_tree(code):
    if not CODE_RE.fullmatch(code):
        return error("트리를 찾을 수 없습니다.", 404)
    with connect() as connection:
        row = connection.execute("SELECT * FROM trees WHERE code = ?", (code,)).fetchone()
    if row is None:
        return error("트리를 찾을 수 없습니다.", 404)
    return jsonify(public_tree(row))


@app.put("/api/trees/<code>")
def update_tree(code):
    if not CODE_RE.fullmatch(code):
        return error("트리를 찾을 수 없습니다.", 404)
    payload, message = clean_payload(request.get_json(silent=True))
    if message:
        return error(message, 400)
    token = request.headers.get("X-Edit-Token", "")
    with connect() as connection:
        row = connection.execute("SELECT * FROM trees WHERE code = ?", (code,)).fetchone()
        if row is None:
            return error("트리를 찾을 수 없습니다.", 404)
        stored = row["edit_token"]
        if not token or len(token) != len(stored) or not secrets.compare_digest(stored, token):
            return error("이 트리를 수정할 수 없습니다.", 403)
        connection.execute(
            "UPDATE trees SET title = ?, items = ?, updated_at = ? WHERE code = ?",
            (payload["title"], dump_document(payload), now(), code),
        )
        updated = connection.execute("SELECT * FROM trees WHERE code = ?", (code,)).fetchone()
    return jsonify(public_tree(updated))


@app.post("/api/media")
def upload_media():
    upload = request.files.get("file")
    if upload is None:
        return error("파일을 선택해 주세요.", 400)
    mime = (upload.mimetype or "").lower()
    if mime in {"image/jpeg", "image/jpg", "image/pjpeg"}:
        ext, kind, limit = ".jpg", "image", 2 * 1024 * 1024
    elif mime == "image/png":
        ext, kind, limit = ".png", "image", 2 * 1024 * 1024
    elif mime == "image/webp":
        ext, kind, limit = ".webp", "image", 2 * 1024 * 1024
    elif mime == "image/gif":
        ext, kind, limit = ".gif", "image", 2 * 1024 * 1024
    elif mime == "video/mp4":
        ext, kind, limit = ".mp4", "video", 8 * 1024 * 1024
    elif mime == "video/webm":
        ext, kind, limit = ".webm", "video", 8 * 1024 * 1024
    else:
        return error("이미지 또는 영상만 올릴 수 있어요.", 400)
    data = upload.read(limit + 1)
    if not data or len(data) > limit:
        return error("파일이 너무 커요. 이미지는 2MB, 영상은 8MB까지 올릴 수 있어요.", 400)
    folder = media_dir()
    folder.mkdir(parents=True, exist_ok=True)
    media_id = "".join(secrets.choice(ALPHABET) for _ in range(16))
    (folder / f"{media_id}{ext}").write_bytes(data)
    return jsonify({"id": media_id, "kind": kind, "url": f"/media/{media_id}"}), 201


@app.get("/media/<media_id>")
def read_media(media_id):
    path = media_path(media_id)
    if path is None:
        return error("파일을 찾을 수 없습니다.", 404)
    response = send_from_directory(path.parent, path.name)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Cache-Control"] = "public, max-age=86400"
    return response


@app.get("/")
def home():
    return render_page()


@app.get("/t/<code>")
def shared(code):
    title = None
    if CODE_RE.fullmatch(code):
        with connect() as connection:
            row = connection.execute("SELECT title FROM trees WHERE code = ?", (code,)).fetchone()
        if row is not None:
            title = f"{row['title']} · 크리스마스 트리"
    return render_page(title)


@app.get("/css/<path:name>")
def styles(name):
    return send_static(STATIC_DIR / "css", name)


@app.get("/js/<path:name>")
def scripts(name):
    return send_static(STATIC_DIR / "js", name)


@app.get("/vendor/<path:name>")
def vendor(name):
    return send_static(STATIC_DIR / "vendor", name)


init_db()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "8000")))
