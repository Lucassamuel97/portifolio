import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

if (!isFirebaseConfigured && process.env.NODE_ENV !== 'production') {
  console.warn(
    '[firebase] Variáveis NEXT_PUBLIC_FIREBASE_* não definidas. ' +
      'Copie .env.example para .env.local e preencha com os dados do Firebase Console. ' +
      'Analytics ficará desativado.'
  );
}

// Inicializar Firebase apenas se não estiver inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Inicializar Firestore
export const db = getFirestore(app);

// Analytics só no cliente, com config completa e navegador compatível.
// `let` exportado é uma live binding: services.ts enxerga o valor quando ele for definido.
export let analytics: Analytics | null = null;

if (typeof window !== 'undefined' && isFirebaseConfigured && firebaseConfig.measurementId) {
  isSupported()
    .then((supported) => {
      if (supported) analytics = getAnalytics(app);
    })
    .catch((error) => {
      console.warn('[firebase] Falha ao inicializar Analytics:', error);
    });
}

export default app;
