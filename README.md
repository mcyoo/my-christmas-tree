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

## 구성

- `nginx`: 80/443을 열고 Flask로 전달합니다. 도메인과 이메일이 있으면 인증서를 발급하고 자동으로 갱신합니다.
- `web`: Flask API와 p5.js 화면입니다. 트리 기록은 SQLite 파일 하나에 저장합니다.
- 볼륨 `tree-data`: 트리 데이터베이스입니다.

## 직접 실행

Docker 없이 화면만 확인할 때는 Python 3.12와 pip가 있으면 됩니다.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r app/requirements.txt
DATABASE_PATH=./data/trees.sqlite PORT=8000 python app/server.py
```
