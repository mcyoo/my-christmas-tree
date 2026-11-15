# 나만의 크리스마스 트리 꾸미기

p5.js로 크리스마스 트리를 꾸미고, 링크 하나로 다른 사람에게 보여주는 웹 서비스입니다.

오른쪽 장식 상자에서 오너먼트, 전구, 선물, 양말을 끌어 트리 위에 놓습니다. 놓은 장식은 다시 끌어 옮기고, 크기와 회전, 앞뒤 순서도 바꿀 수 있습니다. 저장하면 `/t/코드` 주소가 만들어지고, 그 링크를 받은 사람은 같은 트리를 봅니다. 수정 권한은 저장한 브라우저에만 남습니다.

## 실행

프로젝트 폴더에서 아래만 실행하면 됩니다.

```bash
docker compose up -d
```

브라우저에서 [http://localhost](http://localhost) 를 엽니다. 로컬에는 도메인이 없으므로 HTTP로 열리고, 트리 데이터는 Docker 볼륨에 저장됩니다.

## 서버에서 HTTPS

도메인의 A 레코드가 이 서버를 가리키고, 80번과 443번 포트가 열려 있어야 합니다. `.env.example` 을 `.env` 로 복사한 뒤 값을 채웁니다.

```bash
cp .env.example .env
```

```env
DOMAIN=tree.example.com
LETSENCRYPT_EMAIL=you@example.com
SSL_ENABLED=auto
```

다시 올리면 nginx가 Let's Encrypt 인증서를 발급하고, 이후 12시간마다 갱신을 확인합니다. 인증서 발급에 실패하면 HTTP로 계속 서비스하면서 10분마다 다시 시도합니다.

```bash
docker compose up -d
```

발급 한도를 아끼며 시험할 때는 `LETSENCRYPT_STAGING=true` 로 스테이징 인증서를 받을 수 있습니다. 스테이징에서 실제 인증서로 바꿀 때는 인증서 볼륨만 지웁니다.

```bash
docker compose down
docker volume rm my-christmas-tree_letsencrypt
docker compose up -d
```

`docker compose down -v` 는 저장된 트리까지 지우므로, 인증서만 다시 받을 때는 사용하지 않습니다.

## 기술 스택

브라우저에서 트리를 그리고, Python 서버가 저장과 공유를 맡습니다. 프론트엔드는 빌드 단계 없이 정적 파일로 제공되고, 서버는 Flask 앱 하나입니다. 배포는 Docker Compose로 nginx와 웹 앱을 함께 올립니다.

| 영역 | 사용 기술 | 버전 |
| --- | --- | --- |
| 화면 | HTML, CSS, 바닐라 JavaScript, p5.js | p5.js 1.11.3 |
| 글꼴 | IBM Plex Sans KR, Song Myung, Noto Sans SC, Noto Sans JP | Google Fonts |
| API | Python, Flask | Python 3.12, Flask 3.1.2 |
| 프로세스 | Gunicorn | 23.0.0, 워커 2, 타임아웃 60초 |
| 데이터 | SQLite (표준 라이브러리 `sqlite3`, WAL) | 파일 하나 |
| 미디어 | 서버 디스크의 이미지·영상 파일 | SQLite와 같은 디렉터리 |
| 컨테이너 | Docker Compose | `python:3.12-slim`, `nginx:1.27-alpine` |
| 프록시·인증서 | nginx, Certbot, Let's Encrypt | TLS 1.2 / 1.3, HTTP/2 |

### 프론트엔드

프레임워크와 번들러는 쓰지 않습니다. Flask가 `app/static` 을 그대로 내려줍니다.

- `index.html` 은 상단 도구, 트리 캔버스, 장식 상자, 편지 폼, 공유 대화상자를 담습니다.
- `css/style.css` 는 화면 배치와 모바일에서 장식 상자가 캔버스 아래로 쌓이는 레이아웃을 담당합니다.
- `js/sketch.js` 는 p5.js 인스턴스 모드로 트리, 하늘, 눈, 오너먼트를 캔버스에 그립니다. 놓기, 끌기, 크기 조절, 선택 삭제, 전구 반짝임이 여기서 처리됩니다.
- `js/app.js` 는 장식 상자, 저장, 공유 링크, 편지, 사진 업로드를 `fetch` 로 서버와 주고받습니다. 캔버스 크기는 `ResizeObserver` 로 맞춥니다.
- `js/i18n.js` 는 한국어, 영어, 중국어, 일본어 문구를 바꿉니다. 선택한 언어는 `localStorage` 키 `christmas-tree-lang` 에 남고, 저장된 선택이 없으면 영어권 시간대·지역은 영어로 엽니다.
- `vendor/p5.min.js` 는 p5.js 1.11.3 을 프로젝트 안에 포함한 파일입니다. CDN에서 불러오지 않습니다.

수정 권한은 계정이 아니라 브라우저에 있습니다. 트리를 저장하면 서버가 편집 토큰을 한 번 돌려주고, 브라우저는 그 토큰을 `localStorage` 키 `christmas-tree-tokens` 에 트리 코드와 함께 보관합니다. 같은 브라우저에서 `/t/코드` 를 열면 장식할 수 있고, 토큰이 없는 브라우저는 트리와 편지만 봅니다.

사진 장식으로 올릴 이미지는 브라우저에서 `createImageBitmap` 으로 읽은 뒤 긴 변 480px, JPEG 품질 0.72 로 줄입니다. 편지에 첨부하는 사진도 같은 방식으로 줄인 뒤 올립니다.

### 백엔드

`app/server.py` 가 HTTP API와 화면을 같이 제공합니다. ORM, 별도 인증 서버, 작업 큐는 없습니다. 요청 본문 상한은 8MB 입니다.

| 메서드 | 경로 | 역할 |
| --- | --- | --- |
| `GET` | `/`, `/t/<code>` | 꾸미기 화면. 공유 주소는 저장된 트리 제목을 페이지 제목에 넣습니다. |
| `GET` | `/css`, `/js`, `/vendor` | 정적 파일. `Cache-Control: no-cache` |
| `GET` | `/api/health` | 컨테이너 헬스체크 |
| `POST` | `/api/trees` | 트리 생성. 8자리 코드와 편집 토큰을 발급합니다. |
| `GET` | `/api/trees/<code>` | 공유용 트리 조회. 편집 토큰은 응답에 넣지 않습니다. |
| `PUT` | `/api/trees/<code>` | 트리 수정. 헤더 `X-Edit-Token` 을 `secrets.compare_digest` 로 확인합니다. |
| `GET`, `POST` | `/api/trees/<code>/letters` | 편지 목록과 작성 |
| `POST` | `/api/media` | 사진·영상 업로드 |
| `GET` | `/media/<id>` | 업로드한 파일. 하루 동안 캐시합니다. |

저장 값은 서버에서 다시 검사합니다. 트리 스타일은 `green`, `snow`, `wood` 이고, 전구 반짝임은 `steady`, `soft`, `chase`, `spark`, `random` 입니다. 장식은 80개, 제목은 40자, 사진·영상 장식은 5개까지입니다. 편지는 트리당 200통, 이름은 20자, 내용은 400자까지입니다. 이미지 업로드는 2MB, 영상 업로드는 8MB 까지 받습니다. 허용 형식은 JPEG, PNG, WebP, GIF, MP4, WebM 입니다.

트리 코드는 헷갈리기 쉬운 문자를 뺀 8자리입니다. 미디어 ID는 16자리입니다. 시각은 UTC ISO 문자열로 저장합니다.

직접 실행할 때는 `python app/server.py` 가 Flask 개발 서버를 띄웁니다. 포트는 환경 변수 `PORT` 이고 기본값은 8000 입니다. Docker 안에서는 개발 서버 대신 Gunicorn이 `0.0.0.0:8000` 에 붙습니다.

### 데이터

데이터베이스는 SQLite 파일 하나입니다. Docker에서는 `/data/trees.sqlite` 이고, 볼륨 이름은 `tree-data` 입니다. 연결마다 `PRAGMA journal_mode=WAL` 을 켭니다.

`trees` 는 코드, 편집 토큰, 제목, 장식 JSON, 생성·수정 시각을 가집니다. 장식 JSON 안에는 트리 스타일, 전구 반짝임, 각 오너먼트의 종류·색·위치·크기·회전·사진 ID·전구별 반짝임이 들어 있습니다.

`letters` 는 트리 코드, 이름, 내용, 사진 ID, 작성 시각을 가집니다. 트리 코드와 ID로 인덱스를 둡니다.

업로드 파일은 SQLite 옆 `media` 디렉터리에 저장됩니다. 데이터베이스 행에는 파일 경로 대신 미디어 ID만 남습니다.

### 배포

`docker-compose.yml` 이 두 컨테이너를 띄웁니다.

- `web` 은 `app/Dockerfile` 로 만듭니다. 베이스 이미지는 `python:3.12-slim` 이고, `requirements.txt` 의 Flask와 Gunicorn만 설치한 뒤 `server.py` 와 `static` 을 이미지 안에 복사합니다. 화면이나 서버 코드를 바꾼 뒤에는 `docker compose up -d --build` 로 이미지를 다시 만들어야 반영됩니다.
- `nginx` 는 `nginx/Dockerfile` 로 만듭니다. 베이스 이미지는 `nginx:1.27-alpine` 이고, 이미지 안에서 Certbot으로 인증서를 발급합니다. 80과 443을 연 뒤 `web:8000` 으로 프록시합니다. 응답은 gzip 으로 압축합니다.
- `web` 은 호스트 포트를 직접 열지 않습니다. nginx가 뜨기 전에 `/api/health` 가 성공할 때까지 기다립니다.

로컬처럼 도메인이 없으면 HTTP로만 서비스합니다. `DOMAIN` 과 `LETSENCRYPT_EMAIL` 이 있으면 Certbot이 HTTP-01 으로 인증서를 받고, nginx를 TLS 1.2·1.3 과 HTTP/2 설정으로 다시 불러옵니다. 인증서가 있으면 12시간마다 갱신을 확인하고, 아직 없으면 10분마다 발급을 다시 시도합니다. 인증서와 ACME 웹루트는 `letsencrypt`, `certbot-www` 볼륨에 남습니다.

nginx의 요청 본문 상한은 1MB 입니다. Docker로 접속한 업로드는 이 한도를 먼저 탑니다.

## 직접 실행

Docker 없이 화면만 확인할 때는 Python 3.12와 pip가 있으면 됩니다.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r app/requirements.txt
DATABASE_PATH=./data/trees.sqlite PORT=8000 python app/server.py
```
