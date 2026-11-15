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
  let sendingLetter = false;
  let letterPhotoLabel = "";
  let saveNote = "saveNew";
  let viewNote = null;
  let titleCustom = false;
  let latestLetters = [];
  const t = (key, vars) => (window.t ? window.t(key, vars) : key);
  const say = (error, fallback) => {
    const message = error && error.message;
    if (message && window.translateError) return window.translateError(message);
    return message || t(fallback);
  };

  const mobileQuery = window.matchMedia("(max-width: 900px)");
  const isMobileLayout = () => mobileQuery.matches;

  if (!window.p5 || !window.createTreeStudio) {
    const message = $("stage-message");
    message.hidden = false;
    message.textContent = t("screenFail");
    return;
  }

  const studio = window.createTreeStudio(host, {
    onReady: applyThumbs,
    onSelect: showSelection,
    onChange: sync,
    onNotice: toast,
  });

  if (window.isDefaultTitle && window.isDefaultTitle(titleInput.value)) {
    titleInput.value = t("defaultTitle");
  }
  window.onTreeLanguage = refreshLanguage;

  renderInventory();
  refreshHint();
  bindTreeControls();
  $("media-input").addEventListener("change", onMediaPicked);
  const match = location.pathname.match(/^\/t\/([a-z0-9]{8})$/);
  if (match) loadShared(match[1]);

  new ResizeObserver(() => studio.resize()).observe(host);

  titleInput.addEventListener("input", () => {
    titleCustom = !(window.isDefaultTitle && window.isDefaultTitle(titleInput.value));
    if (mode === "edit") markDirty();
  });

  $("btn-undo").addEventListener("click", () => studio.undo());
  $("btn-clear").addEventListener("click", () => {
    if (!studio.getItems().length) return;
    if (!window.confirm(t("clearConfirm"))) return;
    studio.clear();
  });
  saveButton.addEventListener("click", saveTree);
  $("btn-copy-share").addEventListener("click", () => copyText($("share-url").value));
  $("btn-close-share").addEventListener("click", () => $("share-dialog").close());
  $("btn-copy-view").addEventListener("click", () => copyText(location.href));
  $("letter-form").addEventListener("submit", sendLetter);
  $("btn-letter-photo").addEventListener("click", () => $("letter-photo").click());
  $("letter-photo").addEventListener("change", onLetterPhotoPicked);
  $("btn-letter-photo-clear").addEventListener("click", clearLetterPhoto);

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
        heading.dataset.group = group;
        heading.textContent = t(`group.${group}`);
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
      card.dataset.key = item.key;
      card.innerHTML = `<div class="swatch" style="background:${item.color}22"><img alt="" draggable="false"></div><span></span>`;
      card.querySelector("span").textContent = t(`item.${item.key}`);
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
    upload.innerHTML = `<div class="plus-mark" aria-hidden="true">+</div><span></span>`;
    upload.querySelector("span").textContent = t("myPhotoCount", { n: 0 });
    upload.addEventListener("click", () => {
      if (mode !== "edit") return;
      if (studio.photoCount() >= 5) {
        toast(t("limitPhotosToast"));
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
      toast(t("movedToTree"));
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
    document.querySelectorAll("[data-glow]").forEach((button) => {
      button.addEventListener("click", () => {
        if (mode !== "edit") return;
        studio.setSelectedGlow(button.dataset.glow);
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

  function markGlow(glow) {
    document.querySelectorAll("[data-glow]").forEach((button) => {
      button.classList.toggle("active", button.dataset.glow === (glow || "inherit"));
    });
  }

  async function onMediaPicked() {
    const input = $("media-input");
    const file = input.files && input.files[0];
    input.value = "";
    if (!file || mode !== "edit") return;
    if (studio.photoCount() >= 5) {
      toast(t("limitPhotosToast"));
      return;
    }
    try {
      const prepared = await prepareMedia(file);
      const body = new FormData();
      body.append("file", prepared.blob, prepared.name);
      const response = await fetch("/api/media", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t("uploadFail"));
      const placed = studio.placeAt("photo", "#e4c27a", 0.5, 0.46, { media: data.id, kind: data.kind });
      if (!placed) return;
      if (isMobileLayout()) scrollToTree();
      toast(data.kind === "video" ? t("placedVideo") : t("placedPhoto"));
    } catch (error) {
      toast(say(error, "uploadFail"));
    }
  }

  async function prepareMedia(file) {
    if (file.type.startsWith("video/")) {
      if (file.size > 8 * 1024 * 1024) throw new Error(t("videoBig"));
      const duration = await videoDuration(file);
      if (duration > 20) throw new Error(t("videoLong"));
      const name = file.type === "video/webm" ? "clip.webm" : "clip.mp4";
      return { blob: file, name };
    }
    if (!file.type.startsWith("image/")) throw new Error(t("mediaOnly"));
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
        reject(new Error(t("videoReadFail")));
      };
      video.src = url;
    });
  }

  async function compressImage(file) {
    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch (error) {
      throw new Error(t("readFail"));
    }
    const limit = 480;
    const scale = Math.min(1, limit / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.72));
    if (!blob) throw new Error(t("photoPrepareFail"));
    return blob;
  }

  function refreshHint() {
    $("empty-hint").textContent = isMobileLayout() ? t("hintMobile") : t("hintDesktop");
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
    const panel = $("bulb-options");
    const show = Boolean(info && mode === "edit" && (info.type === "light" || info.type === "strand"));
    panel.hidden = !show;
    if (show) markGlow(info.glow);
    if (info && mode === "edit") $("empty-hint").hidden = true;
  }

  function paintCounts() {
    $("item-count").textContent = t("itemCount", { n: studio.getItems().length });
    const photoLabel = document.querySelector("#upload-card span");
    if (photoLabel) photoLabel.textContent = t("myPhotoCount", { n: studio.photoCount() });
  }

  function setSaveNote(key) {
    saveNote = key;
    $("save-state").textContent = t(key);
  }

  function setViewNote(key, vars) {
    viewNote = { key, vars: vars || {} };
    $("view-text").textContent = t(key, viewNote.vars);
  }

  function relabelInventory() {
    document.querySelectorAll("#item-grid [data-group]").forEach((heading) => {
      heading.textContent = t(`group.${heading.dataset.group}`);
    });
    document.querySelectorAll("#item-grid [data-key]").forEach((card) => {
      const label = card.querySelector("span");
      if (label && card.id !== "upload-card") label.textContent = t(`item.${card.dataset.key}`);
    });
    paintCounts();
  }

  function refreshLanguage() {
    if (!titleCustom && window.isDefaultTitle && window.isDefaultTitle(titleInput.value)) {
      titleInput.value = t("defaultTitle");
    }
    relabelInventory();
    refreshHint();
    setSaveNote(saveNote);
    if (viewNote && !$("view-bar").hidden) setViewNote(viewNote.key, viewNote.vars);
    $("letter-photo-name").textContent = letterPhotoLabel || t("photoNone");
    if (latestLetters) paintLetters(latestLetters);
    const saveLabel = $("btn-save");
    if (saveLabel && !saving) saveLabel.textContent = t("save");
  }

  function sync() {
    paintCounts();
    $("btn-undo").disabled = !studio.canUndo();
    $("empty-hint").hidden = mode !== "edit" || studio.getItems().length > 0;
    if (mode === "edit") markDirty();
  }

  function markDirty() {
    setSaveNote(savedOnce ? "saveDirty" : "saveNew");
  }

  function applyChrome() {
    document.body.classList.toggle("viewing", mode === "view");
    titleInput.readOnly = mode === "view";
    $("empty-hint").hidden = mode !== "edit" || studio.getItems().length > 0;
    $("letters").hidden = mode !== "view" || !code;
    $("received").hidden = mode !== "edit" || !code;
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
      titleCustom = !(window.isDefaultTitle && window.isDefaultTitle(data.title));
      const stored = readTokens()[data.code];
      if (stored) {
        token = stored;
        savedOnce = true;
        mode = "edit";
        studio.setMode("edit");
        $("view-bar").hidden = true;
        $("save-state").textContent = t("saveSaved");
        saveNote = "saveSaved";
      } else {
        mode = "view";
        stamp = null;
        studio.setStamp(null);
        studio.setMode("view");
        $("view-bar").hidden = false;
        setViewNote("viewInvite", { title: data.title });
        $("btn-copy-view").hidden = false;
      }
      applyChrome();
      syncQuiet();
      loadLetters();
    } catch (error) {
      showMissing();
    }
  }

  function syncQuiet() {
    paintCounts();
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
    $("btn-copy-view").hidden = true;
    $("letters").hidden = true;
    $("received").hidden = true;
    setViewNote("viewMissing");
    $("stage-message").hidden = false;
    $("stage-message").textContent = t("checkLink");
    applyChrome();
  }

  async function saveTree() {
    if (saving || mode !== "edit") return;
    const payload = {
      title: titleInput.value.trim() || t("defaultTitle"),
      items: studio.getItems(),
      tree: studio.getTreeStyle(),
      twinkle: studio.getTwinkle(),
    };
    saving = true;
    saveButton.disabled = true;
    saveButton.textContent = t("saving");
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
      if (!response.ok) throw new Error(data.error || t("connectFail"));
      code = data.code;
      if (data.edit_token) {
        token = data.edit_token;
        storeToken(code, token);
      }
      savedOnce = true;
      titleInput.value = data.title;
      titleCustom = !(window.isDefaultTitle && window.isDefaultTitle(data.title));
      history.replaceState({}, "", `/t/${code}`);
      setSaveNote("saveSaved");
      $("share-url").value = `${location.origin}/t/${code}`;
      $("share-dialog").showModal();
      applyChrome();
      loadLetters();
    } catch (error) {
      toast(say(error, "connectFail"));
    } finally {
      saving = false;
      saveButton.disabled = false;
      saveButton.textContent = t("save");
    }
  }

  async function copyText(value) {
    const text = value || location.href;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        toast(t("copied"));
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
      toast(t("copied"));
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
      toast(t("copyFail"));
      return;
    }
    toast(t("copyManual"));
  }

  function onLetterPhotoPicked() {
    const file = $("letter-photo").files && $("letter-photo").files[0];
    if (!file) {
      clearLetterPhoto();
      return;
    }
    if (!file.type.startsWith("image/")) {
      clearLetterPhoto();
      toast(t("letterPhotoOnly"));
      return;
    }
    letterPhotoLabel = file.name;
    $("letter-photo-name").textContent = file.name;
    $("btn-letter-photo-clear").hidden = false;
  }

  function clearLetterPhoto() {
    letterPhotoLabel = "";
    $("letter-photo").value = "";
    $("letter-photo-name").textContent = t("photoNone");
    $("btn-letter-photo-clear").hidden = true;
  }

  async function sendLetter(event) {
    event.preventDefault();
    if (sendingLetter || mode !== "view" || !code) return;
    const message = $("letter-message").value.trim();
    const author = $("letter-author").value.trim();
    if (!message) {
      toast(t("letterNeeded"));
      return;
    }
    sendingLetter = true;
    const button = $("btn-send-letter");
    button.disabled = true;
    try {
      let media = null;
      const file = $("letter-photo").files && $("letter-photo").files[0];
      if (file) {
        if (!file.type.startsWith("image/")) throw new Error(t("letterPhotoOnly"));
        const blob = await compressImage(file);
        const body = new FormData();
        body.append("file", blob, "letter.jpg");
        const uploaded = await fetch("/api/media", { method: "POST", body });
        const uploadedData = await uploaded.json();
        if (!uploaded.ok) throw new Error(uploadedData.error || t("uploadFail"));
        media = uploadedData.id;
      }
      const response = await fetch(`/api/trees/${code}/letters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, message, media }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t("letterFail"));
      $("letter-form").reset();
      clearLetterPhoto();
      toast(t("letterSent"));
      await loadLetters();
    } catch (error) {
      toast(say(error, "letterFail"));
    } finally {
      sendingLetter = false;
      button.disabled = false;
    }
  }

  async function loadLetters() {
    if (!code) return;
    try {
      const response = await fetch(`/api/trees/${code}/letters`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t("letterLoadFail"));
      paintLetters(data.letters || []);
    } catch (error) {
      toast(say(error, "letterLoadFail"));
    }
  }

  function paintLetters(letters) {
    latestLetters = letters || [];
    $("letter-count").textContent = t("letterCount", { n: latestLetters.length });
    fillLetterList($("letter-list"), latestLetters);
    fillLetterList($("owner-letter-list"), latestLetters);
  }

  function fillLetterList(container, letters) {
    container.replaceChildren();
    if (!letters.length) {
      const empty = document.createElement("p");
      empty.className = "letter-empty";
      empty.textContent = t("letterEmpty");
      container.appendChild(empty);
      return;
    }
    letters.forEach((letter) => {
      const card = document.createElement("article");
      card.className = "letter-card";
      const meta = document.createElement("div");
      meta.className = "letter-meta";
      const author = document.createElement("strong");
      const name = letter.author || t("anonymous");
      author.textContent = name;
      const time = document.createElement("time");
      time.dateTime = letter.created_at || "";
      time.textContent = formatWhen(letter.created_at);
      meta.append(author, time);
      const body = document.createElement("p");
      body.className = "letter-body";
      body.textContent = letter.message || "";
      card.append(meta, body);
      if (letter.photo) {
        const image = document.createElement("img");
        image.src = letter.photo;
        image.alt = t("photoAlt", { name });
        card.appendChild(image);
      }
      container.appendChild(card);
    });
  }

  function formatWhen(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(window.treeLocale ? window.treeLocale() : "ko-KR", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
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
