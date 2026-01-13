Backend Setup (FastAPI + PostgreSQL): 

1️⃣ Backend folder-এ যাও
cd backend

2️⃣ Virtual Environment (venv) create করো
python -m venv venv

3️⃣ venv activate করো
venv\Scripts\activate

✅ Terminal-এ (venv) দেখালে ঠিক আছে

4️⃣ Dependencies install করো
pip install -r requirements.txt


যদি requirements.txt না থাকে:

pip install fastapi uvicorn sqlalchemy psycopg2-binary passlib[bcrypt] python-jose python-multipart pydantic email-validator

5️⃣ Backend server চালু করো
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload


✅ Server running:

http://127.0.0.1:8000
http://<YOUR_IPV4>:8000


✅ Swagger UI:

http://127.0.0.1:8000/docs



Frontend Setup (Expo + React Native):

1️⃣ Frontend folder-এ যাও
cd frontend

2️⃣ Node modules install করো
npm install

3️⃣ Async Storage install (Admin Auth-এর জন্য)
npx expo install @react-native-async-storage/async-storage

4️⃣ Expo server চালু করো (cache clear সহ)
npx expo start -c