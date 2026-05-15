import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getDatabase, ref, runTransaction, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

  // ══ Firebase — عداد الزيارات بس ══
  const firebaseConfig = {
    apiKey: "AIzaSyAX1b0UGjPgbX503SVS1cxv_LN2GJmqPjU",
    authDomain: "project-824f0.firebaseapp.com",
    databaseURL: "https://project-824f0-default-rtdb.firebaseio.com",
    projectId: "project-824f0",
    storageBucket: "project-824f0.firebasestorage.app",
    messagingSenderId: "950408080300",
    appId: "1:950408080300:web:c901f7d885fb1c920fe809"
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const visitsRef = ref(db, 'visits');
  if(!sessionStorage.getItem('counted')){
    sessionStorage.setItem('counted','1');
    runTransaction(visitsRef, (current) => (current || 0) + 1);
  }
  onValue(visitsRef, (snap) => {
    const el = document.getElementById('visitCount');
    if(el) el.textContent = (snap.val() || 0).toLocaleString('ar-EG');
  });