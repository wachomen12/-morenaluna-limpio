// Script para actualizar el campo 'categoria' de los productos en Firestore
// y agregar el campo 'categoriaNombre' usando la lista de categorías de productos.js

import { db, collection, getDocs, updateDoc, doc } from "../firebase-config";
import { categorias } from "../data/productos";

async function actualizarCategorias() {
  const productosRef = collection(db, "productos");
  const snapshot = await getDocs(productosRef);
  let actualizados = 0;
  let errores = 0;
  const nombreToId = {};
  categorias.forEach(cat => {
    nombreToId[cat.nombre] = cat.id;
  });

  for (const productoDoc of snapshot.docs) {
    const data = productoDoc.data();
    const nombreCategoria = data.categoria;
    if (nombreToId[nombreCategoria]) {
      const idCategoria = nombreToId[nombreCategoria];
      const categoriaNombre = nombreCategoria;
      try {
        await updateDoc(doc(db, "productos", productoDoc.id), {
          categoria: idCategoria,
          categoriaNombre
        });
        actualizados++;
      } catch (e) {
        console.error("Error actualizando producto", productoDoc.id, e);
        errores++;
      }
    }
  }
  console.log(`Productos actualizados: ${actualizados}`);
  console.log(`Errores: ${errores}`);
}

actualizarCategorias();
