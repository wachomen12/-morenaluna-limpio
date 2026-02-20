# 🌟 Página de Catálogo - Accesorios y Pulseras

Una página de catálogo moderna y responsiva para vender pulseras y accesorios, con un diseño inspirado en Instagram.

## ✨ Características

- ✅ Diseño moderno y atractivo estilo Instagram
- ✅ Catálogo con filtros por categoría
- ✅ Carrito de compras funcional
- ✅ Modal con detalles del producto
- ✅ Notificaciones en tiempo real
- ✅ Totalmente responsivo (móvil, tablet, desktop)
- ✅ Integración con WhatsApp para confirmación de pedidos
- ✅ Animaciones suaves y elegantes

## 📁 Estructura de Archivos

```
proyecto de pago/
├── index.html      # Estructura HTML
├── styles.css      # Estilos CSS
├── script.js       # Lógica JavaScript
└── README.md       # Este archivo
```

## 🚀 Cómo Usar

### 1. Abrir la página
Simplemente abre el archivo `index.html` en tu navegador. No requiere instalación de dependencias.

### 2. Personalizar los datos

#### Cambiar el nombre de la tienda
En `index.html`, línea ~20, cambia:
```html
<span>ACCESORIOS</span>
```
Por tu nombre de tienda.

#### Cambiar links de Instagram y WhatsApp
En `index.html`, busca y reemplaza todas las URLs:
- `https://instagram.com` → Tu URL de Instagram
- `https://wa.me/593` → Tu número de WhatsApp (código de país + número)

#### Agregar/Modificar productos
En `script.js`, línea ~3-55, edita el array `productos`:

```javascript
{
    id: 1,
    nombre: "Pulsera de Plata",
    categoria: "pulseras",
    precio: 35.00,
    imagen: "URL_DE_TU_IMAGEN",
    descripcion: "Hermosa pulsera de plata 925...",
    disponible: true
}
```

**Categorías disponibles:**
- pulseras
- anillos
- collares
- tobilleras

### 3. Cambiar colores (opcional)
En `styles.css`, línea ~14, modifica las variables de color:

```css
:root {
    --primary-color: #ff1493;      /* Rosa fuerte */
    --secondary-color: #fe5f75;    /* Rosa suave */
    --dark-bg: #0f0f0f;            /* Fondo oscuro */
}
```

## 📱 Características Principales

### Carrito de Compras
- Agrega productos con cantidad
- Aumenta/disminuye cantidad
- Elimina items
- Cálculo automático de totales

### Modal de Producto
- Vista ampliada del producto
- Descripción completa
- Disponibilidad
- Selector de cantidad

### Filtros
- Todos
- Pulseras
- Anillos
- Collares
- Tobilleras

### Integración WhatsApp
El botón "Proceder al Pago" envía un mensaje por WhatsApp con el resumen del pedido.

## 🌐 Alojamiento (Hosting)

Para que tu página esté en internet, puedes usar:

1. **Netlify** (RECOMENDADO - Gratis)
   - Ve a https://netlify.com
   - Arrastra y suelta la carpeta del proyecto
   - ¡Listo! Tu sitio estará online en minutos

2. **GitHub Pages** (Gratis)
   - Sube tus archivos a un repositorio de GitHub
   - Activa GitHub Pages en las configuraciones

3. **Vercel** (Gratis)
   - Ve a https://vercel.com
   - Conecta tu repositorio de GitHub
   - Deploy automático

## 🎨 Personalización Avanzada

### Agregar Google Analytics
En `index.html`, antes de `</head>`, añade:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Cambiar fuentes
En `styles.css`, línea ~19, modifica la familia de fuentes.

### Agregar más secciones
Simplemente añade nuevas secciones en `index.html` y estilos en `styles.css`.

## 💡 Tips

- Las imágenes de los productos vienen de Unsplash (cambia las URLs por las tuyas)
- Usa fotos de alta calidad en formato cuadrado (800x800px es ideal)
- Mantén los precios actualizados
- Revisa regularmente que los links de redes sociales funcionen

## 📞 Soporte de Redes Sociales

La página incluye botones para:
- **Instagram** - Muestra tus productos
- **WhatsApp** - Confirmación de pedidos
- **Email** - Contacto general

## 🔒 Seguridad

Esta es una página de catálogo estática. Para:
- Pagos en línea: Integra Stripe, PayPal, o similares
- Base de datos: Usa un backend (Node.js, Python, etc.)
- Formularios: Usa servicios como Formspree o EmailJS

## 📝 Notas

- El carrito se guarda solo en la sesión actual (se borra al cerrar)
- Para persistencia, considera agregar localStorage en JavaScript
- Las imágenes vienen de Unsplash por defecto

¡Listo para usar! Si necesitas ayuda, personaliza según tus necesidades. 🎉
