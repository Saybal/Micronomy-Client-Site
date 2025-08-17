import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyC1iGyJhOMwGGRwBwSXdgsp06NKfapOSJ8",
  authDomain: "micronomy-16f13.firebaseapp.com",
  projectId: "micronomy-16f13",
  storageBucket: "micronomy-16f13.firebasestorage.app",
  messagingSenderId: "927931156420",
  appId: "1:927931156420:web:7040374c91f27ff3944691"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});