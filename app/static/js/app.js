(function () {
  const $ = (id) => document.getElementById(id);
  const catalog = window.TREE_CATALOG || [];
  const TOKEN_KEY = "christmas-tree-tokens";

  const titleInput = $("tree-title");
  const saveButton = $("btn-save");
  const host = $("canvas-host");
  let mode = "edit";
  let code = null;
  let token = null;
  let saving = false;
  let savedOnce = false;
  let stamp = null;
  let dragging = null;
  let pickup = null;
  let toastTimer = 0;

  const mobileQuery = window.matchMedia("(max-width: 900px)");
  const isMobileLayout = () => mobileQuery.matches;

  if (!window.p5 || !window.createTreeStudio) {
    const message = $("stage-message");
    message.hidden = false;
    message.textContent = "화면을 불러오지 못했어요. 새로고침해 주세요.";
    return;
  }

  const studio = window.createTreeStudio(host, {
    onReady: applyThumbs,
    onSelect: showSelection,
    onChange: sync,
    onNotice: toast,
  });

  renderInventory();
  refreshHint();
  bindTreeControls();
  $("media-input").addEventListener("change", onMediaPicked);
  const match = location.pathname.match(/^\/t\/([a-z0-9]{8})$/);
  if (match) loadShared(match[1]);

  new ResizeObserver(() => studio.resize()).observe(host);

  titleInput.addEventListener("input", () => {
    if (mode === "edit") markDirty();
  });

  $("btn-undo").addEventListener("click", () => studio.undo());
  $("btn-clear").addEventListener("click", () => {
    if (!studio.getItems().length) return;
    if (!window.confirm("올린 장식을 모두 지울까요?")) return;
    studio.clear();
  });
  saveButton.addEventListener("click", saveTree);
  $("btn-copy-share").addEventListener("click", () => copyText($("share-url").value));
  $("btn-close-share").addEventListener("click", () => $("share-dialog").close());
  $("btn-copy-view").addEventListener("click", () => copyText(location.href));
  $("btn-remix").addEventListener("click", remix);

  host.addEventListener("dragover", (event) => {
    if (!dragging || mode !== "edit") return;
    event.preventDefault();
    const point = eventToNorm(event);
    if (!studio.canPlace(dragging.type, point.x, point.y)) {
      studio.setGhost(null);
      return;
    }
    studio.setGhost({ type: dragging.type, color: dragging.color, x: point.x, y: point.y });
  });

  host.addEventListener("dragleave", (event) => {
    if (!host.contains(event.relatedTarget)) studio.setGhost(null);
  });

  host.addEventListener("drop", (event) => {
    if (!dragging || mode !== "edit") return;
    event.preventDefault();
    const point = eventToNorm(event);
    studio.setGhost(null);
    studio.placeAt(dragging.type, dragging.color, point.x, point.y);
  });

  window.addEventListener("keydown", (event) => {
    if (event.target.closest("input, textarea") || mode !== "edit") return;
    const key = event.key.toLowerCase();
    if ((event.metaKey || event.ctrlKey) && key === "z" && !event.shiftKey) {
      event.preventDefault();
      studio.undo();
      return;
    }
    if (event.key === "Escape") {
      stamp = null;
      studio.setStamp(null);
      document.querySelectorAll(".item-card.armed").forEach((card) => {
        card.classList.remove("armed");
        card.setAttribute("aria-pressed", "false");
      });
      studio.clearSelection();
      return;
    }
    if (event.key === "Delete" || event.key === "Backspace") {
      if (studio.deleteSelected()) event.preventDefault();
      return;
    }
    const repeat = { skipUndo: event.repeat };
    if (event.key === "[") studio.nudgeRot(-Math.PI / 12, repeat);
    if (event.key === "]") studio.nudgeRot(Math.PI / 12, repeat);
    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      const step = 0.012;
      if (event.key === "ArrowLeft") studio.nudgePos(-step, 0, repeat);
      if (event.key === "ArrowRight") studio.nudgePos(step, 0, repeat);
      if (event.key === "ArrowUp") studio.nudgePos(0, -step, repeat);
      if (event.key === "ArrowDown") studio.nudgePos(0, step, repeat);
    }
  });

  function renderInventory() {
    const grid = $("item-grid");
    let group = "";
    catalog.forEach((item) => {
      if (item.group !== group) {
        group = item.group;
        const heading = document.createElement("h3");
        heading.className = "group-title";
        heading.textContent = group;
        grid.appendChild(heading);
      }
      const card = document.createElement("div");
      card.className = "item-card";
      card.tabIndex = 0;
      card.role = "button";
      card.draggable = true;
      card.dataset.type = item.type;
      card.dataset.color = item.color;
      card.setAttribute("aria-pressed", "false");
      card.innerHTML = `<div class="swatch" style="background:${item.color}22"><img alt="" draggable="false"></div><span></span>`;
      card.querySelector("span").textContent = item.label;
      card.draggable = !isMobileLayout();
      card.addEventListener("click", () => arm(card, item));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          arm(card, item);
          if (isMobileLayout()) scrollToTree();
        }
      });
      card.addEventListener("dragstart", (event) => {
        if (isMobileLayout()) {
          event.preventDefault();
          return;
        }
        dragging = { type: item.type, color: item.color };
        event.dataTransfer.setData("text/plain", JSON.stringify(dragging));
        event.dataTransfer.effectAllowed = "copy";
        arm(card, item);
      });
      card.addEventListener("dragend", () => {
        dragging = null;
        studio.setGhost(null);
      });
      card.addEventListener("pointerdown", (event) => onCardPointerDown(event, card, item));
      card.addEventListener("pointermove", onCardPointerMove);
      card.addEventListener("pointerup", onCardPointerUp);
      card.addEventListener("pointercancel", onCardPointerUp);
      grid.appendChild(card);
    });
    const upload = document.createElement("div");
    upload.id = "upload-card";
    upload.className = "item-card upload-card";
    upload.tabIndex = 0;
    upload.role = "button";
    upload.innerHTML = `<div class="plus-mark" aria-hidden="true">+</div><span>내 사진 · 0/5</span>`;
    upload.addEventListener("click", () => {
      if (mode !== "edit") return;
      if (studio.photoCount() >= 5) {
        toast("사진과 영상은 5개까지 올릴 수 있어요.");
        return;
      }
      $("media-input").click();
    });
    grid.appendChild(upload);
  }

  function applyThumbs(thumbs) {
    const images = document.querySelectorAll(".item-card img");
    thumbs.forEach((url, index) => {
      if (images[index]) images[index].src = url;
    });
  }

  function scrollToTree() {
    document.querySelector(".stage").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onCardPointerDown(event, card, item) {
    if (!isMobileLayout() || mode !== "edit" || event.button > 0) return;
    event.preventDefault();
    arm(card, item);
    scrollToTree();
    pickup = {
      type: item.type,
      color: item.color,
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      moved: false,
    };
    card.setPointerCapture(event.pointerId);
    updatePickupGhost(event);
  }

  function onCardPointerMove(event) {
    if (!pickup || event.pointerId !== pickup.id) return;
    const dx = event.clientX - pickup.x;
    const dy = event.clientY - pickup.y;
    if (dx * dx + dy * dy > 36) pickup.moved = true;
    updatePickupGhost(event);
  }

  function onCardPointerUp(event) {
    if (!pickup || event.pointerId !== pickup.id) return;
    const point = pointOnCanvas(event);
    studio.setGhost(null);
    if (pickup.moved && point) {
      studio.placeAt(pickup.type, pickup.color, point.x, point.y);
    } else if (!pickup.moved) {
      toast("트리로 이동했어요. 트리 위에서 끌어 놓으세요.");
    }
    pickup = null;
  }

  function updatePickupGhost(event) {
    const point = pointOnCanvas(event);
    if (!point || !studio.canPlace(pickup.type, point.x, point.y)) {
      studio.setGhost(null);
      return;
    }
    studio.setGhost({ type: pickup.type, color: pickup.color, x: point.x, y: point.y, scale: 1 });
  }

  function pointOnCanvas(event) {
    const canvas = host.querySelector("canvas");
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
      return null;
    }
    return {
      x: clamp((event.clientX - rect.left) / rect.width, 0.03, 0.97),
      y: clamp((event.clientY - rect.top) / rect.height, 0.04, 0.96),
    };
  }

  function bindTreeControls() {
    document.querySelectorAll("[data-tree]").forEach((button) => {
      button.addEventListener("click", () => {
        if (mode !== "edit") return;
        studio.setTreeStyle(button.dataset.tree);
        markTreeControls();
      });
    });
    document.querySelectorAll("[data-twinkle]").forEach((button) => {
      button.addEventListener("click", () => {
        if (mode !== "edit") return;
        studio.setTwinkle(button.dataset.twinkle);
        markTreeControls();
      });
    });
  }

  function markTreeControls() {
    const style = studio.getTreeStyle();
    const twinkle = studio.getTwinkle();
    document.querySelectorAll("[data-tree]").forEach((button) => {
      button.classList.toggle("active", button.dataset.tree === style);
    });
    document.querySelectorAll("[data-twinkle]").forEach((button) => {
      button.classList.toggle("active", button.dataset.twinkle === twinkle);
    });
  }

  async function onMediaPicked() {
    const input = $("media-input");
    const file = input.files && input.files[0];
    input.value = "";
    if (!file || mode !== "edit") return;
    if (studio.photoCount() >= 5) {
      toast("사진과 영상은 5개까지 올릴 수 있어요.");
      return;
    }
    try {
      const prepared = await prepareMedia(file);
      const body = new FormData();
      body.append("file", prepared.blob, prepared.name);
      const response = await fetch("/api/media", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "올리지 못했어요.");
      const placed = studio.placeAt("photo", "#e4c27a", 0.5, 0.46, { media: data.id, kind: data.kind });
      if (!placed) return;
      if (isMobileLayout()) scrollToTree();
      toast(data.kind === "video" ? "영상을 트리에 올렸어요. 점을 끌면 크기가 바뀝니다." : "사진을 트리에 올렸어요. 점을 끌면 크기가 바뀝니다.");
    } catch (error) {
      toast(error.message || "올리지 못했어요.");
    }
  }

  async function prepareMedia(file) {
    if (file.type.startsWith("video/")) {
      if (file.size > 8 * 1024 * 1024) throw new Error("영상은 8MB까지 올릴 수 있어요.");
      const duration = await videoDuration(file);
      if (duration > 20) throw new Error("영상은 20초까지 올릴 수 있어요.");
      const name = file.type === "video/webm" ? "clip.webm" : "clip.mp4";
      return { blob: file, name };
    }
    if (!file.type.startsWith("image/")) throw new Error("이미지 또는 영상만 올릴 수 있어요.");
    const blob = await compressImage(file);
    return { blob, name: "photo.jpg" };
  }

  function videoDuration(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        const duration = video.duration;
        URL.revokeObjectURL(url);
        resolve(duration);
      };
      video.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("영상을 읽지 못했어요."));
      };
      video.src = url;
    });
  }

  async function compressImage(file) {
    const bitmap = await createImageBitmap(file);
    const limit = 480;
    const scale = Math.min(1, limit / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.72));
    if (!blob) throw new Error("사진을 준비하지 못했어요.");
    return blob;
  }

  function refreshHint() {
    $("empty-hint").textContent = isMobileLayout()
      ? "장식을 누르면 트리로 이동해요. 끌어 놓고, 점을 터치해서 크기를 바꾸세요."
      : "장식을 끌어 트리 위에 놓으세요. 올린 장식의 점을 끌면 크기가 바뀝니다.";
  }

  mobileQuery.addEventListener("change", () => {
    document.querySelectorAll(".item-card").forEach((card) => {
      card.draggable = !isMobileLayout();
    });
    refreshHint();
  });

  function arm(card, item) {
    stamp = { type: item.type, color: item.color };
    studio.setStamp(stamp);
    document.querySelectorAll(".item-card").forEach((entry) => {
      const active = entry === card;
      entry.classList.toggle("armed", active);
      entry.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function eventToNorm(event) {
    const canvas = host.querySelector("canvas");
    const rect = canvas.getBoundingClientRect();
    return {
      x: clamp((event.clientX - rect.left) / rect.width, 0.03, 0.97),
      y: clamp((event.clientY - rect.top) / rect.height, 0.04, 0.96),
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function showSelection(info) {
    if (info && mode === "edit") $("empty-hint").hidden = true;
  }

  function sync() {
    const count = studio.getItems().length;
    $("item-count").textContent = `장식 ${count}개`;
    const photoLabel = document.querySelector("#upload-card span");
    if (photoLabel) photoLabel.textContent = `내 사진 · ${studio.photoCount()}/5`;
    $("btn-undo").disabled = !studio.canUndo();
    $("empty-hint").hidden = mode !== "edit" || count > 0;
    if (mode === "edit") markDirty();
  }

  function markDirty() {
    $("save-state").textContent = savedOnce ? "저장되지 않은 변경이 있어요" : "아직 저장하지 않았어요";
  }

  function applyChrome() {
    document.body.classList.toggle("viewing", mode === "view");
    titleInput.readOnly = mode === "view";
    $("empty-hint").hidden = mode !== "edit" || studio.getItems().length > 0;
    requestAnimationFrame(() => studio.resize());
  }

  async function loadShared(sharedCode) {
    try {
      const response = await fetch(`/api/trees/${sharedCode}`);
      const data = await response.json();
      if (!response.ok) {
        showMissing();
        return;
      }
      code = data.code;
      studio.setItems(data.items);
      studio.setTreeStyle(data.tree || "green", { silent: true });
      studio.setTwinkle(data.twinkle || "soft", { silent: true });
      markTreeControls();
      titleInput.value = data.title;
      const stored = readTokens()[data.code];
      if (stored) {
        token = stored;
        savedOnce = true;
        mode = "edit";
        studio.setMode("edit");
        $("view-bar").hidden = true;
        $("save-state").textContent = "저장됨";
      } else {
      mode = "view";
      stamp = null;
      studio.setStamp(null);
      studio.setMode("view");
        $("view-bar").hidden = false;
        $("view-text").textContent = `${data.title} · 공유된 트리`;
        $("btn-remix").hidden = false;
        $("btn-copy-view").hidden = false;
      }
      applyChrome();
      syncQuiet();
    } catch (error) {
      showMissing();
    }
  }

  function syncQuiet() {
    $("item-count").textContent = `장식 ${studio.getItems().length}개`;
    const photoLabel = document.querySelector("#upload-card span");
    if (photoLabel) photoLabel.textContent = `내 사진 · ${studio.photoCount()}/5`;
    $("btn-undo").disabled = !studio.canUndo();
  }

  function showMissing() {
    mode = "view";
    code = null;
    stamp = null;
    studio.setStamp(null);
    studio.setMode("view");
    studio.setItems([]);
    $("view-bar").hidden = false;
    $("view-text").textContent = "이 주소의 트리를 찾지 못했어요.";
    $("btn-remix").hidden = true;
    $("btn-copy-view").hidden = true;
    $("stage-message").hidden = false;
    $("stage-message").textContent = "링크를 다시 확인해 주세요.";
    applyChrome();
  }

  function remix() {
    const currentTitle = titleInput.value.trim() || "나의 크리스마스 트리";
    mode = "edit";
    code = null;
    token = null;
    savedOnce = false;
    studio.setMode("edit");
    $("view-bar").hidden = true;
    $("stage-message").hidden = true;
    titleInput.value = currentTitle;
    history.pushState({}, "", "/");
    applyChrome();
    markDirty();
    toast("장식을 복사했어요. 저장하면 새로운 링크가 만들어져요.");
  }

  async function saveTree() {
    if (saving || mode !== "edit") return;
    const payload = {
      title: titleInput.value.trim() || "나의 크리스마스 트리",
      items: studio.getItems(),
      tree: studio.getTreeStyle(),
      twinkle: studio.getTwinkle(),
    };
    saving = true;
    saveButton.disabled = true;
    saveButton.textContent = "저장하는 중";
    try {
      const response = await fetch(code ? `/api/trees/${code}` : "/api/trees", {
        method: code ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "X-Edit-Token": token } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "저장하지 못했어요.");
      code = data.code;
      if (data.edit_token) {
        token = data.edit_token;
        storeToken(code, token);
      }
      savedOnce = true;
      titleInput.value = data.title;
      history.replaceState({}, "", `/t/${code}`);
      $("save-state").textContent = "저장됨";
      $("share-url").value = `${location.origin}/t/${code}`;
      $("share-dialog").showModal();
    } catch (error) {
      toast(error.message || "서버에 연결하지 못했어요.");
    } finally {
      saving = false;
      saveButton.disabled = false;
      saveButton.textContent = "저장하고 공유";
    }
  }

  async function copyText(value) {
    const text = value || location.href;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        toast("링크를 복사했어요.");
        return;
      } catch (error) {
        // HTTP로 연 서버이거나 브라우저가 클립보드를 막으면 아래 방식으로 복사합니다.
      }
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }
    area.remove();
    if (copied) {
      toast("링크를 복사했어요.");
      return;
    }
    const input = $("share-url");
    input.value = text;
    const dialog = $("share-dialog");
    try {
      if (!dialog.open) dialog.showModal();
      input.focus();
      input.select();
    } catch (error) {
      toast("링크를 복사하지 못했어요. 주소창의 주소를 복사해 주세요.");
      return;
    }
    toast("자동 복사가 막혀 링크를 선택해 두었어요.");
  }

  function toast(message) {
    const node = $("toast");
    node.textContent = message;
    node.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => node.classList.remove("show"), 2400);
  }

  function readTokens() {
    try {
      return JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function storeToken(treeCode, editToken) {
    const all = readTokens();
    delete all[treeCode];
    all[treeCode] = editToken;
    const entries = Object.entries(all).slice(-30);
    localStorage.setItem(TOKEN_KEY, JSON.stringify(Object.fromEntries(entries)));
  }
})();
