import firebase from 'firebase';

// ☆各プロジェクトの設定を記述
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databeseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}
