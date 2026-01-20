At first , nijeder PC er command prompt e ipconfig ei command likhe IPv4 address ta ber korte hobe. Wireless wifi oi segment er niche pawa jabe IPv4 address. Oita copy kore duita file er IPv4 address er jaigai paste korte hobe. file gula hocche:
frontend/lib/api.ts
frontend/app/admin/login.tsx
duita file e baseURL: "http://192.168.43.100:8000" eitar 192.168.43.100 jaigata replace korte hobe nijeder PC er ipv4 address diye. eita wifi lan change hole ba pc off korle change hoye jai. 

Mobile app hisebe chalanor jnno mobile e Expo Go app ta install korte hobe.

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


For git push:

git status
git add .
git commit -m "New Push"
git push
