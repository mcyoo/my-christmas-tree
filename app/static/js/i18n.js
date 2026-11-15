(function () {
  const STR = {
    ko: {
      pageTitle: "나만의 크리스마스 트리 꾸미기",
      heroTitle: "나만의 크리스마스 트리 꾸미기",
      defaultTitle: "나의 크리스마스 트리",
      treeName: "트리 이름",
      saveNew: "아직 저장하지 않았어요",
      saveDirty: "저장되지 않은 변경이 있어요",
      saveSaved: "저장됨",
      undo: "되돌리기",
      clear: "비우기",
      save: "저장하고 공유",
      saving: "저장하는 중",
      viewInvite: "{title} · 꾸민 트리를 보고 편지를 남겨 주세요",
      viewMissing: "이 주소의 트리를 찾지 못했어요.",
      copyLink: "링크 복사",
      newTree: "새 트리 만들기",
      stageLabel: "크리스마스 트리",
      hintDesktop: "장식을 끌어 트리 위에 놓으세요. 점은 크기, X는 삭제입니다.",
      hintMobile: "장식을 누르면 트리로 이동해요. 점은 크기, X는 삭제입니다.",
      boxTitle: "장식 상자",
      itemCount: "장식 {n}개",
      treePick: "트리",
      treeGreen: "초록 트리",
      treeSnow: "눈 덮인 트리",
      treeWood: "회색 나무",
      bulbPick: "전구",
      twinkleSteady: "켜짐",
      twinkleSoft: "은은하게",
      twinkleChase: "차례로",
      twinkleSpark: "빠르게",
      twinkleRandom: "무작위",
      bulbOwn: "이 전구 반짝임",
      glowInherit: "트리와 같게",
      help: "같은 장식을 여러 번 올릴 수 있어요. 전구 감기는 트리 안을 클릭하면 그 높이에 감기고, 크기는 점만 끌어서 바꿉니다.",
      keyHint: "점은 크기 · X는 삭제 · Ctrl/⌘ Z 되돌리기",
      received: "받은 편지",
      letterEmpty: "아직 도착한 편지가 없어요.",
      lettersTitle: "편지 남기기",
      letterCount: "편지 {n}통",
      lettersHelp: "이 트리는 보기만 할 수 있어요. 편지와 사진을 남겨 주세요.",
      letterName: "이름",
      letterNamePh: "익명",
      letterBody: "편지",
      letterBodyPh: "따뜻한 말을 남겨 주세요.",
      photoAttach: "사진 첨부",
      photoNone: "선택한 사진 없음",
      photoClear: "빼기",
      sendLetter: "편지 남기기",
      shareTitle: "트리를 나눌 준비가 됐어요",
      shareBody: "이 링크를 보내면 꾸민 트리만 보여요. 받은 사람은 장식은 할 수 없고, 편지와 사진을 남길 수 있어요. 트리를 수정하는 권한은 저장한 이 브라우저에만 남아요.",
      shareLink: "공유 링크",
      close: "닫기",
      clearConfirm: "올린 장식을 모두 지울까요?",
      movedToTree: "트리로 이동했어요. 트리 위에서 끌어 놓으세요.",
      limitPhotosToast: "사진과 영상은 5개까지 올릴 수 있어요.",
      placedPhoto: "사진을 트리에 올렸어요. 점을 끌면 크기가 바뀝니다.",
      placedVideo: "영상을 트리에 올렸어요. 점을 끌면 크기가 바뀝니다.",
      uploadFail: "올리지 못했어요.",
      copied: "링크를 복사했어요.",
      copyFail: "링크를 복사하지 못했어요. 주소창의 주소를 복사해 주세요.",
      copyManual: "자동 복사가 막혀 링크를 선택해 두었어요.",
      letterPhotoOnly: "편지에는 사진만 첨부할 수 있어요.",
      letterNeeded: "편지 내용을 적어 주세요.",
      letterSent: "편지를 남겼어요.",
      letterFail: "편지를 남기지 못했어요.",
      letterLoadFail: "편지를 불러오지 못했어요.",
      connectFail: "서버에 연결하지 못했어요.",
      checkLink: "링크를 다시 확인해 주세요.",
      screenFail: "화면을 불러오지 못했어요. 새로고침해 주세요.",
      readFail: "사진을 읽지 못했어요.",
      videoBig: "영상은 8MB까지 올릴 수 있어요.",
      videoLong: "영상은 20초까지 올릴 수 있어요.",
      mediaOnly: "이미지 또는 영상만 올릴 수 있어요.",
      videoReadFail: "영상을 읽지 못했어요.",
      photoPrepareFail: "사진을 준비하지 못했어요.",
      anonymous: "익명",
      myPhotoCount: "내 사진 · {n}/5",
      myPhoto: "내 사진",
      myVideo: "내 영상",
      photoShort: "사진",
      videoShort: "영상",
      photoAlt: "{name}님이 남긴 사진",
      ornamentFallback: "장식",
      limitPhotos: "사진과 영상은 5개까지 올릴 수 있어요.",
      limitItems: "장식은 80개까지 올릴 수 있어요.",
      strandOnly: "전구는 트리 안에만 감을 수 있어요.",
      errRequest: "요청 형식이 올바르지 않습니다.",
      errTitle: "트리 이름이 올바르지 않습니다.",
      errItems: "장식 목록이 올바르지 않습니다.",
      errItemLimit: "장식은 80개까지 올릴 수 있습니다.",
      errItem: "장식 정보가 올바르지 않습니다.",
      errPhotoLimit: "사진과 영상은 5개까지 올릴 수 있습니다.",
      errTree: "트리 설정이 올바르지 않습니다.",
      errName: "이름이 올바르지 않습니다.",
      errLetter: "편지 내용이 올바르지 않습니다.",
      errLetterEmpty: "편지 내용을 적어 주세요.",
      errLetterLimit: "편지는 400자까지 남길 수 있습니다.",
      errPhotoMissing: "사진을 찾지 못했습니다.",
      errLetterPhoto: "편지에는 사진만 첨부할 수 있습니다.",
      errMissing: "트리를 찾을 수 없습니다.",
      errLetterFull: "이 트리에는 편지를 더 남길 수 없어요.",
      errForbidden: "이 트리를 수정할 수 없습니다.",
      errChooseFile: "파일을 선택해 주세요.",
      errMediaType: "이미지 또는 영상만 올릴 수 있어요.",
      errMediaSize: "파일이 너무 커요. 이미지는 2MB, 영상은 8MB까지 올릴 수 있어요.",
      errFile: "파일을 찾을 수 없습니다.",
      group: { year: "올해", ornament: "오너먼트", light: "조명", prop: "소품", figure: "인형" },
      item: {
        ring: "반지", house: "집", car: "자동차", baby: "아기", cap: "졸업", plane: "여행", paw: "반려동물", key: "열쇠", cake: "생일", trophy: "성취", book: "책", music: "음악", camera: "추억", sprout: "새 시작",
        "bauble-red": "빨간 구", "bauble-gold": "금색 구", "bauble-blue": "푸른 구", "bauble-green": "초록 구", "bauble-purple": "보라 구", "bauble-white": "하얀 구",
        "teardrop-red": "빨간 물방울", "teardrop-gold": "금색 물방울", icicle: "고드름", egg: "유리 알", star: "별", bell: "종", bow: "리본", heart: "하트", wreath: "리스",
        "strand-warm": "전구 감기", "strand-multi": "알록달록 전구", "light-yellow": "노란 전구", "light-red": "빨간 전구", "light-blue": "파란 전구", "light-green": "초록 전구", candle: "양초",
        candy: "막대 사탕", "gift-red": "빨간 선물", "gift-green": "초록 선물", "gift-navy": "남색 선물", snowflake: "눈송이", pinecone: "솔방울", holly: "호랑가시", poinsettia: "포인세티아", apple: "사과", stocking: "양말", mitten: "장갑",
        gingerbread: "진저브레드", angel: "천사", nutcracker: "호두까기", snowman: "눈사람", santa: "산타", reindeer: "순록", cardinal: "홍관조",
      },
    },
    en: {
      pageTitle: "Decorate your Christmas tree",
      heroTitle: "Decorate your Christmas tree",
      defaultTitle: "My Christmas tree",
      treeName: "Tree name",
      saveNew: "Not saved yet",
      saveDirty: "Unsaved changes",
      saveSaved: "Saved",
      undo: "Undo",
      clear: "Clear",
      save: "Save and share",
      saving: "Saving",
      viewInvite: "{title} · View the tree and leave a note",
      viewMissing: "No tree was found at this address.",
      copyLink: "Copy link",
      newTree: "Make a new tree",
      stageLabel: "Christmas tree",
      hintDesktop: "Drag an ornament onto the tree. The dot changes size, and X removes it.",
      hintMobile: "Tap an ornament to jump to the tree. The dot changes size, and X removes it.",
      boxTitle: "Ornament box",
      itemCount: "Ornaments · {n}",
      treePick: "Tree",
      treeGreen: "Green",
      treeSnow: "Snowy",
      treeWood: "Silver",
      bulbPick: "Lights",
      twinkleSteady: "Steady",
      twinkleSoft: "Soft",
      twinkleChase: "Chase",
      twinkleSpark: "Sparkle",
      twinkleRandom: "Random",
      bulbOwn: "This light",
      glowInherit: "Match tree",
      help: "You can place the same ornament more than once. Light strands wrap where you click on the tree, and only the dot changes the size.",
      keyHint: "Dot resizes · X deletes · Ctrl/⌘ Z undoes",
      received: "Notes received",
      letterEmpty: "No notes yet.",
      lettersTitle: "Leave a note",
      letterCount: "Notes · {n}",
      lettersHelp: "This tree is view only. Leave a note and a photo.",
      letterName: "Name",
      letterNamePh: "Anonymous",
      letterBody: "Note",
      letterBodyPh: "Leave a warm note.",
      photoAttach: "Add photo",
      photoNone: "No photo selected",
      photoClear: "Remove",
      sendLetter: "Leave note",
      shareTitle: "Ready to share your tree",
      shareBody: "This link shows only the decorated tree. Visitors can leave a note and a photo, but they cannot change the decorations. Only this browser can keep editing.",
      shareLink: "Share link",
      close: "Close",
      clearConfirm: "Remove every ornament on the tree?",
      movedToTree: "Moved to the tree. Drag it into place.",
      limitPhotosToast: "You can add up to 5 photos and videos.",
      placedPhoto: "Photo added. Drag the dot to resize it.",
      placedVideo: "Video added. Drag the dot to resize it.",
      uploadFail: "Could not upload that.",
      copied: "Link copied.",
      copyFail: "Could not copy the link. Copy the address from the bar.",
      copyManual: "Copying was blocked, so the link is selected.",
      letterPhotoOnly: "Notes can include a photo only.",
      letterNeeded: "Write a note first.",
      letterSent: "Note left.",
      letterFail: "Could not leave the note.",
      letterLoadFail: "Could not load the notes.",
      connectFail: "Could not reach the server.",
      checkLink: "Check the link and try again.",
      screenFail: "The page did not load. Refresh and try again.",
      readFail: "Could not read that photo.",
      videoBig: "Videos can be up to 8MB.",
      videoLong: "Videos can be up to 20 seconds.",
      mediaOnly: "Only images and videos can be added.",
      videoReadFail: "Could not read that video.",
      photoPrepareFail: "Could not prepare that photo.",
      anonymous: "Anonymous",
      myPhotoCount: "My photo · {n}/5",
      myPhoto: "My photo",
      myVideo: "My video",
      photoShort: "Photo",
      videoShort: "Video",
      photoAlt: "Photo from {name}",
      ornamentFallback: "Ornament",
      limitPhotos: "You can add up to 5 photos and videos.",
      limitItems: "You can place up to 80 ornaments.",
      strandOnly: "Light strands can only wrap inside the tree.",
      errRequest: "That request was not valid.",
      errTitle: "That tree name is not valid.",
      errItems: "That ornament list is not valid.",
      errItemLimit: "You can place up to 80 ornaments.",
      errItem: "That ornament is not valid.",
      errPhotoLimit: "You can add up to 5 photos and videos.",
      errTree: "Those tree settings are not valid.",
      errName: "That name is not valid.",
      errLetter: "That note is not valid.",
      errLetterEmpty: "Write a note first.",
      errLetterLimit: "Notes can be up to 400 characters.",
      errPhotoMissing: "That photo could not be found.",
      errLetterPhoto: "Notes can include a photo only.",
      errMissing: "That tree could not be found.",
      errLetterFull: "This tree cannot take more notes.",
      errForbidden: "This tree cannot be edited here.",
      errChooseFile: "Choose a file.",
      errMediaType: "Only images and videos can be added.",
      errMediaSize: "That file is too large. Images can be 2MB and videos 8MB.",
      errFile: "That file could not be found.",
      group: { year: "This year", ornament: "Ornaments", light: "Lights", prop: "Trimmings", figure: "Characters" },
      item: {
        ring: "Ring", house: "Home", car: "Car", baby: "Baby", cap: "Graduation", plane: "Trip", paw: "Pet", key: "Key", cake: "Birthday", trophy: "Win", book: "Book", music: "Music", camera: "Memories", sprout: "New start",
        "bauble-red": "Red bauble", "bauble-gold": "Gold bauble", "bauble-blue": "Blue bauble", "bauble-green": "Green bauble", "bauble-purple": "Purple bauble", "bauble-white": "White bauble",
        "teardrop-red": "Red drop", "teardrop-gold": "Gold drop", icicle: "Icicle", egg: "Glass egg", star: "Star", bell: "Bell", bow: "Bow", heart: "Heart", wreath: "Wreath",
        "strand-warm": "Warm strand", "strand-multi": "Color strand", "light-yellow": "Yellow bulb", "light-red": "Red bulb", "light-blue": "Blue bulb", "light-green": "Green bulb", candle: "Candle",
        candy: "Candy cane", "gift-red": "Red gift", "gift-green": "Green gift", "gift-navy": "Navy gift", snowflake: "Snowflake", pinecone: "Pinecone", holly: "Holly", poinsettia: "Poinsettia", apple: "Apple", stocking: "Stocking", mitten: "Mitten",
        gingerbread: "Gingerbread", angel: "Angel", nutcracker: "Nutcracker", snowman: "Snowman", santa: "Santa", reindeer: "Reindeer", cardinal: "Cardinal",
      },
    },
    zh: {
      pageTitle: "装扮我的圣诞树",
      heroTitle: "装扮我的圣诞树",
      defaultTitle: "我的圣诞树",
      treeName: "树的名字",
      saveNew: "还没有保存",
      saveDirty: "有未保存的更改",
      saveSaved: "已保存",
      undo: "撤销",
      clear: "清空",
      save: "保存并分享",
      saving: "正在保存",
      viewInvite: "{title} · 看看这棵树，留一封信",
      viewMissing: "这个地址没有找到圣诞树。",
      copyLink: "复制链接",
      newTree: "做一棵新树",
      stageLabel: "圣诞树",
      hintDesktop: "把装饰拖到树上。圆点改大小，X 删除。",
      hintMobile: "点一下装饰就会到树那里。圆点改大小，X 删除。",
      boxTitle: "装饰盒",
      itemCount: "{n} 个装饰",
      treePick: "树",
      treeGreen: "绿树",
      treeSnow: "雪树",
      treeWood: "银树",
      bulbPick: "灯",
      twinkleSteady: "常亮",
      twinkleSoft: "轻闪",
      twinkleChase: "依次",
      twinkleSpark: "快闪",
      twinkleRandom: "随机",
      bulbOwn: "这盏灯",
      glowInherit: "跟随整棵树",
      help: "同一个装饰可以放很多次。灯串点在树里就会绕在那个高度，大小只能拖圆点来改。",
      keyHint: "圆点改大小 · X 删除 · Ctrl/⌘ Z 撤销",
      received: "收到的信",
      letterEmpty: "还没有信。",
      lettersTitle: "留下一封信",
      letterCount: "{n} 封信",
      lettersHelp: "这棵树只能看。可以留下信和照片。",
      letterName: "名字",
      letterNamePh: "匿名",
      letterBody: "信",
      letterBodyPh: "写一句温暖的话。",
      photoAttach: "添加照片",
      photoNone: "还没有选照片",
      photoClear: "移除",
      sendLetter: "留下信",
      shareTitle: "可以分享这棵树了",
      shareBody: "这个链接只显示装扮好的树。收到的人可以留信和照片，但不能改装饰。只有这台浏览器可以继续编辑。",
      shareLink: "分享链接",
      close: "关闭",
      clearConfirm: "要清掉树上的全部装饰吗？",
      movedToTree: "已经到树这里了。在树上拖到想放的位置。",
      limitPhotosToast: "照片和视频最多 5 个。",
      placedPhoto: "照片已经挂上。拖圆点可以改大小。",
      placedVideo: "视频已经挂上。拖圆点可以改大小。",
      uploadFail: "没能上传。",
      copied: "链接已复制。",
      copyFail: "没能复制链接。请从地址栏复制。",
      copyManual: "浏览器阻止了复制，链接已经选中。",
      letterPhotoOnly: "信里只能附照片。",
      letterNeeded: "请先写好信的内容。",
      letterSent: "信已经留下。",
      letterFail: "没能留下这封信。",
      letterLoadFail: "没能加载信件。",
      connectFail: "连不上服务器。",
      checkLink: "请再确认一下链接。",
      screenFail: "页面没有载入。请刷新后再试。",
      readFail: "没能读取这张照片。",
      videoBig: "视频最大 8MB。",
      videoLong: "视频最长 20 秒。",
      mediaOnly: "只能上传图片或视频。",
      videoReadFail: "没能读取这个视频。",
      photoPrepareFail: "没能准备这张照片。",
      anonymous: "匿名",
      myPhotoCount: "我的照片 · {n}/5",
      myPhoto: "我的照片",
      myVideo: "我的视频",
      photoShort: "照片",
      videoShort: "视频",
      photoAlt: "{name}留下的照片",
      ornamentFallback: "装饰",
      limitPhotos: "照片和视频最多 5 个。",
      limitItems: "装饰最多 80 个。",
      strandOnly: "灯串只能绕在树里面。",
      errRequest: "请求格式不正确。",
      errTitle: "树的名字不正确。",
      errItems: "装饰列表不正确。",
      errItemLimit: "装饰最多 80 个。",
      errItem: "装饰信息不正确。",
      errPhotoLimit: "照片和视频最多 5 个。",
      errTree: "树的设置不正确。",
      errName: "名字不正确。",
      errLetter: "信的内容不正确。",
      errLetterEmpty: "请先写好信的内容。",
      errLetterLimit: "信最多 400 字。",
      errPhotoMissing: "没有找到这张照片。",
      errLetterPhoto: "信里只能附照片。",
      errMissing: "没有找到这棵树。",
      errLetterFull: "这棵树不能再收更多信了。",
      errForbidden: "不能修改这棵树。",
      errChooseFile: "请选择文件。",
      errMediaType: "只能上传图片或视频。",
      errMediaSize: "文件太大。图片最大 2MB，视频最大 8MB。",
      errFile: "没有找到这个文件。",
      group: { year: "今年", ornament: "挂饰", light: "灯饰", prop: "小物", figure: "人物" },
      item: {
        ring: "戒指", house: "新家", car: "汽车", baby: "宝宝", cap: "毕业", plane: "旅行", paw: "宠物", key: "钥匙", cake: "生日", trophy: "成就", book: "书", music: "音乐", camera: "回忆", sprout: "新开始",
        "bauble-red": "红球", "bauble-gold": "金球", "bauble-blue": "蓝球", "bauble-green": "绿球", "bauble-purple": "紫球", "bauble-white": "白球",
        "teardrop-red": "红水滴", "teardrop-gold": "金水滴", icicle: "冰柱", egg: "玻璃蛋", star: "星星", bell: "铃铛", bow: "蝴蝶结", heart: "爱心", wreath: "花环",
        "strand-warm": "暖色灯串", "strand-multi": "彩色灯串", "light-yellow": "黄灯泡", "light-red": "红灯泡", "light-blue": "蓝灯泡", "light-green": "绿灯泡", candle: "蜡烛",
        candy: "拐杖糖", "gift-red": "红礼物", "gift-green": "绿礼物", "gift-navy": "蓝礼物", snowflake: "雪花", pinecone: "松果", holly: "冬青", poinsettia: "一品红", apple: "苹果", stocking: "袜子", mitten: "手套",
        gingerbread: "姜饼人", angel: "天使", nutcracker: "胡桃夹子", snowman: "雪人", santa: "圣诞老人", reindeer: "驯鹿", cardinal: "红雀",
      },
    },
    ja: {
      pageTitle: "自分のクリスマスツリーを飾る",
      heroTitle: "自分のクリスマスツリーを飾る",
      defaultTitle: "わたしのクリスマスツリー",
      treeName: "ツリーの名前",
      saveNew: "まだ保存していません",
      saveDirty: "保存していない変更があります",
      saveSaved: "保存しました",
      undo: "元に戻す",
      clear: "空にする",
      save: "保存して共有",
      saving: "保存しています",
      viewInvite: "{title} · ツリーを見て手紙を残してください",
      viewMissing: "このアドレスのツリーは見つかりませんでした。",
      copyLink: "リンクをコピー",
      newTree: "新しいツリーを作る",
      stageLabel: "クリスマスツリー",
      hintDesktop: "オーナメントをツリーへドラッグします。点は大きさ、Xは削除です。",
      hintMobile: "オーナメントを押すとツリーへ移動します。点は大きさ、Xは削除です。",
      boxTitle: "オーナメント箱",
      itemCount: "オーナメント {n}個",
      treePick: "ツリー",
      treeGreen: "緑のツリー",
      treeSnow: "雪のツリー",
      treeWood: "銀のツリー",
      bulbPick: "ライト",
      twinkleSteady: "点灯",
      twinkleSoft: "やわらかく",
      twinkleChase: "順番に",
      twinkleSpark: "すばやく",
      twinkleRandom: "ランダム",
      bulbOwn: "このライト",
      glowInherit: "ツリーに合わせる",
      help: "同じオーナメントは何度でも置けます。ライトの巻きはツリーの中を押した高さに巻き、大きさは点だけをドラッグして変えます。",
      keyHint: "点で大きさ · Xで削除 · Ctrl/⌘ Z で戻す",
      received: "届いた手紙",
      letterEmpty: "まだ手紙はありません。",
      lettersTitle: "手紙を残す",
      letterCount: "手紙 {n}通",
      lettersHelp: "このツリーは見るだけです。手紙と写真を残せます。",
      letterName: "名前",
      letterNamePh: "名無し",
      letterBody: "手紙",
      letterBodyPh: "あたたかい言葉を残してください。",
      photoAttach: "写真を添える",
      photoNone: "写真は未選択",
      photoClear: "外す",
      sendLetter: "手紙を残す",
      shareTitle: "ツリーを分けられます",
      shareBody: "このリンクでは飾ったツリーだけが見えます。受け取った人は手紙と写真を残せますが、飾りは変えられません。編集できるのは保存したこのブラウザだけです。",
      shareLink: "共有リンク",
      close: "閉じる",
      clearConfirm: "置いたオーナメントをすべて消しますか？",
      movedToTree: "ツリーへ移動しました。ツリーの上でドラッグして置いてください。",
      limitPhotosToast: "写真と動画は5つまでです。",
      placedPhoto: "写真をツリーに置きました。点をドラッグすると大きさが変わります。",
      placedVideo: "動画をツリーに置きました。点をドラッグすると大きさが変わります。",
      uploadFail: "アップロードできませんでした。",
      copied: "リンクをコピーしました。",
      copyFail: "リンクをコピーできませんでした。アドレスバーからコピーしてください。",
      copyManual: "自動コピーが止められたので、リンクを選択しました。",
      letterPhotoOnly: "手紙に添えられるのは写真だけです。",
      letterNeeded: "手紙の内容を書いてください。",
      letterSent: "手紙を残しました。",
      letterFail: "手紙を残せませんでした。",
      letterLoadFail: "手紙を読み込めませんでした。",
      connectFail: "サーバーに接続できませんでした。",
      checkLink: "リンクをもう一度確認してください。",
      screenFail: "画面を読み込めませんでした。更新してください。",
      readFail: "写真を読み取れませんでした。",
      videoBig: "動画は8MBまでです。",
      videoLong: "動画は20秒までです。",
      mediaOnly: "画像か動画だけアップロードできます。",
      videoReadFail: "動画を読み取れませんでした。",
      photoPrepareFail: "写真を準備できませんでした。",
      anonymous: "名無し",
      myPhotoCount: "自分の写真 · {n}/5",
      myPhoto: "自分の写真",
      myVideo: "自分の動画",
      photoShort: "写真",
      videoShort: "動画",
      photoAlt: "{name}さんの写真",
      ornamentFallback: "オーナメント",
      limitPhotos: "写真と動画は5つまでです。",
      limitItems: "オーナメントは80個までです。",
      strandOnly: "ライトはツリーの中にだけ巻けます。",
      errRequest: "リクエストの形式が正しくありません。",
      errTitle: "ツリーの名前が正しくありません。",
      errItems: "オーナメント一覧が正しくありません。",
      errItemLimit: "オーナメントは80個までです。",
      errItem: "オーナメント情報が正しくありません。",
      errPhotoLimit: "写真と動画は5つまでです。",
      errTree: "ツリーの設定が正しくありません。",
      errName: "名前が正しくありません。",
      errLetter: "手紙の内容が正しくありません。",
      errLetterEmpty: "手紙の内容を書いてください。",
      errLetterLimit: "手紙は400字までです。",
      errPhotoMissing: "写真が見つかりませんでした。",
      errLetterPhoto: "手紙に添えられるのは写真だけです。",
      errMissing: "ツリーが見つかりませんでした。",
      errLetterFull: "このツリーにはこれ以上手紙を残せません。",
      errForbidden: "このツリーは編集できません。",
      errChooseFile: "ファイルを選んでください。",
      errMediaType: "画像か動画だけアップロードできます。",
      errMediaSize: "ファイルが大きすぎます。画像は2MB、動画は8MBまでです。",
      errFile: "ファイルが見つかりませんでした。",
      group: { year: "今年", ornament: "オーナメント", light: "ライト", prop: "小物", figure: "キャラクター" },
      item: {
        ring: "指輪", house: "新しい家", car: "車", baby: "赤ちゃん", cap: "卒業", plane: "旅", paw: "ペット", key: "鍵", cake: "誕生日", trophy: "達成", book: "本", music: "音楽", camera: "思い出", sprout: "新しい始まり",
        "bauble-red": "赤い玉", "bauble-gold": "金色の玉", "bauble-blue": "青い玉", "bauble-green": "緑の玉", "bauble-purple": "紫の玉", "bauble-white": "白い玉",
        "teardrop-red": "赤いしずく", "teardrop-gold": "金色のしずく", icicle: "つらら", egg: "ガラスの卵", star: "星", bell: "ベル", bow: "リボン", heart: "ハート", wreath: "リース",
        "strand-warm": "あたたかいライト", "strand-multi": "カラフルライト", "light-yellow": "黄色い電球", "light-red": "赤い電球", "light-blue": "青い電球", "light-green": "緑の電球", candle: "ろうそく",
        candy: "キャンディ", "gift-red": "赤いプレゼント", "gift-green": "緑のプレゼント", "gift-navy": "紺のプレゼント", snowflake: "雪の結晶", pinecone: "まつぼっくり", holly: "ヒイラギ", poinsettia: "ポインセチア", apple: "りんご", stocking: "靴下", mitten: "手袋",
        gingerbread: "ジンジャーブレッド", angel: "天使", nutcracker: "くるみ割り", snowman: "雪だるま", santa: "サンタ", reindeer: "トナカイ", cardinal: "ショウジョウコウカンチョウ",
      },
    },
  };

  const ERRORS = {
    "요청 형식이 올바르지 않습니다.": "errRequest",
    "트리 이름이 올바르지 않습니다.": "errTitle",
    "장식 목록이 올바르지 않습니다.": "errItems",
    "장식은 80개까지 올릴 수 있습니다.": "errItemLimit",
    "장식 정보가 올바르지 않습니다.": "errItem",
    "사진과 영상은 5개까지 올릴 수 있습니다.": "errPhotoLimit",
    "트리 설정이 올바르지 않습니다.": "errTree",
    "이름이 올바르지 않습니다.": "errName",
    "편지 내용이 올바르지 않습니다.": "errLetter",
    "편지 내용을 적어 주세요.": "errLetterEmpty",
    "편지는 400자까지 남길 수 있습니다.": "errLetterLimit",
    "사진을 찾지 못했습니다.": "errPhotoMissing",
    "편지에는 사진만 첨부할 수 있습니다.": "errLetterPhoto",
    "트리를 찾을 수 없습니다.": "errMissing",
    "이 트리에는 편지를 더 남길 수 없어요.": "errLetterFull",
    "이 트리를 수정할 수 없습니다.": "errForbidden",
    "파일을 선택해 주세요.": "errChooseFile",
    "이미지 또는 영상만 올릴 수 있어요.": "errMediaType",
    "파일이 너무 커요. 이미지는 2MB, 영상은 8MB까지 올릴 수 있어요.": "errMediaSize",
    "파일을 찾을 수 없습니다.": "errFile",
    "사진을 읽지 못했어요.": "readFail",
    "영상은 8MB까지 올릴 수 있어요.": "videoBig",
    "영상은 20초까지 올릴 수 있어요.": "videoLong",
    "이미지 또는 영상만 올릴 수 있어요.": "mediaOnly",
    "영상을 읽지 못했어요.": "videoReadFail",
    "사진을 준비하지 못했어요.": "photoPrepareFail",
    "올리지 못했어요.": "uploadFail",
    "편지를 남기지 못했어요.": "letterFail",
    "편지를 불러오지 못했어요.": "letterLoadFail",
    "서버에 연결하지 못했어요.": "connectFail",
    "사진과 영상은 5개까지 올릴 수 있어요.": "limitPhotosToast",
  };

  const EN_REGIONS = new Set(["US", "GB", "AU", "CA", "NZ", "IE", "ZA", "SG", "PH", "JM", "TT", "BB", "BS", "BZ", "GY", "MT", "AG", "KN", "LC", "VC", "DM", "GD", "BW", "NA", "ZW", "ZM", "GH", "NG", "KE", "UG", "TZ", "RW", "LR", "SL", "GM", "MW", "SZ", "LS", "FJ", "PG", "GU", "AS", "VI", "MP"]);
  const KEY = "christmas-tree-lang";
  const LOCALES = { ko: "ko-KR", en: "en-US", zh: "zh-CN", ja: "ja-JP" };
  let current = "ko";

  function lookup(pack, key) {
    if (!pack) return null;
    if (Object.prototype.hasOwnProperty.call(pack, key)) return pack[key];
    const parts = key.split(".");
    let node = pack;
    for (let index = 0; index < parts.length; index += 1) {
      if (!node || typeof node !== "object" || !Object.prototype.hasOwnProperty.call(node, parts[index])) return null;
      node = node[parts[index]];
    }
    return typeof node === "string" ? node : null;
  }

  function t(key, vars) {
    let text = lookup(STR[current], key) || lookup(STR.en, key) || lookup(STR.ko, key) || key;
    if (vars) {
      Object.keys(vars).forEach((name) => {
        text = text.split(`{${name}}`).join(String(vars[name]));
      });
    }
    return text;
  }

  function localeParts(tag) {
    const value = String(tag || "");
    try {
      const locale = new Intl.Locale(value);
      return { lang: (locale.language || "").toLowerCase(), region: (locale.region || "").toUpperCase() };
    } catch (error) {
      const bits = value.split("-");
      const region = bits.length > 1 ? bits[bits.length - 1] : "";
      return { lang: (bits[0] || "").toLowerCase(), region: region.toUpperCase() };
    }
  }

  function isEnglishZone(zone) {
    if (!zone) return false;
    if (zone.startsWith("Australia/")) return true;
    if (zone === "Europe/London" || zone === "Europe/Dublin" || zone === "Europe/Guernsey" || zone === "Europe/Isle_of_Man" || zone === "Europe/Jersey") return true;
    if (zone === "Asia/Singapore" || zone === "Asia/Manila") return true;
    if (zone === "Africa/Johannesburg" || zone === "Africa/Maseru" || zone === "Africa/Mbabane") return true;
    if (zone === "Pacific/Auckland" || zone === "Pacific/Chatham" || zone === "Pacific/Honolulu" || zone === "Pacific/Guam") return true;
    const canada = ["Toronto", "Vancouver", "Winnipeg", "Edmonton", "Regina", "Halifax", "St_Johns", "Moncton", "Goose_Bay", "Glace_Bay", "Whitehorse", "Dawson", "Iqaluit", "Rainy_River", "Atikokan", "Thunder_Bay", "Nipigon", "Pangnirtung", "Resolute", "Rankin_Inlet", "Cambridge_Bay", "Yellowknife", "Inuvik", "Creston", "Dawson_Creek", "Fort_Nelson", "Swift_Current"];
    if (canada.some((city) => zone === `America/${city}`)) return true;
    const us = ["New_York", "Detroit", "Chicago", "Denver", "Boise", "Phoenix", "Los_Angeles", "Anchorage", "Juneau", "Sitka", "Metlakatla", "Yakutat", "Nome", "Adak", "Jamaica", "Nassau", "Barbados", "Port_of_Spain"];
    if (us.some((city) => zone === `America/${city}`)) return true;
    return zone.startsWith("America/Indiana/") || zone.startsWith("America/Kentucky/") || zone.startsWith("America/North_Dakota/");
  }

  function detectLanguage() {
    let saved = "";
    try {
      saved = localStorage.getItem(KEY) || "";
    } catch (error) {
      saved = "";
    }
    if (STR[saved]) return saved;
    let zone = "";
    try {
      zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (error) {
      zone = "";
    }
    const tags = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "ko"];
    const primary = localeParts(tags[0]);
    if (isEnglishZone(zone) || EN_REGIONS.has(primary.region)) return "en";
    if (primary.lang === "zh") return "zh";
    if (primary.lang === "ja") return "ja";
    if (primary.lang === "en") return "en";
    if (primary.lang === "ko") return "ko";
    return "ko";
  }

  function applyDom() {
    document.documentElement.lang = current === "zh" ? "zh-Hans" : current;
    document.documentElement.classList.add("i18n-ready");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });
    if (!location.pathname.startsWith("/t/")) document.title = t("pageTitle");
    document.querySelectorAll("[data-lang]").forEach((button) => {
      const active = button.dataset.lang === current;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (window.onTreeLanguage) window.onTreeLanguage(current);
  }

  function setLanguage(lang) {
    if (!STR[lang] || lang === current) {
      applyDom();
      return;
    }
    current = lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch (error) {
      // 저장할 수 없어도 이번 화면의 언어는 바꿉니다.
    }
    applyDom();
  }

  current = detectLanguage();
  window.t = t;
  window.setTreeLanguage = setLanguage;
  window.getTreeLanguage = function getTreeLanguage() { return current; };
  window.treeLocale = function treeLocale() { return LOCALES[current] || "ko-KR"; };
  window.isDefaultTitle = function isDefaultTitle(value) {
    return Object.keys(STR).some((lang) => STR[lang].defaultTitle === value);
  };
  window.translateError = function translateError(message) {
    const key = ERRORS[message];
    return key ? t(key) : message;
  };

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
  applyDom();
})();
