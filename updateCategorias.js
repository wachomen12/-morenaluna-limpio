// Script para actualizar los productos antiguos y que el filtro funcione correctamente
// Ejecuta este archivo UNA SOLA VEZ con: node updateCategorias.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

// Configuración igual a tu firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyDUnNJETqw9S5eF89bDkEgYYwKRXIr-2nk",
    authDomain: "morenaluna-cd983.firebaseapp.com",
    projectId: "morenaluna-cd983",
    storageBucket: "morenaluna-cd983.appspot.com",
    messagingSenderId: "52409390824",
    appId: "1:52409390824:web:efb8548bb073ac7f785b5d"
};

const categorias = [
  { id: 'cadenas-invisibles', nombre: 'Cadenas invisibles' },
  { id: 'chokers', nombre: 'Chokers' },
  { id: 'collares', nombre: 'Collares' },
  { id: 'cadenas-dobles', nombre: 'Cadenas dobles' },
  { id: 'cadenas-personalizadas', nombre: 'Cadenas personalizadas' },
  { id: 'pulseras-perlas', nombre: 'Pulseras Perlas de río' },
  { id: 'pulseras-cristales', nombre: 'Pulseras cristales' },
  { id: 'pulseras-hilo', nombre: 'Pulseras hilo acerado' },
  { id: 'pulseras-dobles', nombre: 'Pulseras dobles' },
  { id: 'pulseras-personalizadas', nombre: 'Pulseras personalizadas' }
];

async function main() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const productosRef = collection(db, 'productos');
  const snapshot = await getDocs(productosRef);
  let actualizados = 0;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    // Si la categoría es un nombre, buscar el id correcto
    if (data.categoria && !categorias.find(cat => cat.id === data.categoria)) {
      const catObj = categorias.find(cat => cat.nombre === data.categoria);
      if (catObj) {
        await updateDoc(doc(productosRef, docSnap.id), {
          categoria: catObj.id,
          categoriaNombre: catObj.nombre
        });
        actualizados++;
        console.log(`Actualizado producto ${docSnap.id}: ${data.categoria} -> ${catObj.id}`);
      }
    }
  }
  console.log(`Listo. Productos actualizados: ${actualizados}`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
