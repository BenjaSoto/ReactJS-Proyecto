<div align="center">

# 🛍️ Tienda React

**Mi proyecto final del curso de React JS · Talento Tech · 2026**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?logo=firebase&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

### 👉 [Ver la tienda en vivo](https://react-js-proyecto-virid.vercel.app/)

</div>

---

## 📖 Sobre el proyecto

Es un e-commerce hecho con React: se puede recorrer el catálogo, buscar productos, armar un carrito y, si sos administrador, gestionar los productos desde un panel propio. Los datos viven en Firebase.

## ✨ Qué se puede hacer

| | Funcionalidad | Detalle |
|---|---|---|
| 🛒 | **Carrito** | Agregar, sumar, restar, eliminar y vaciar, respetando el stock disponible |
| 🔍 | **Buscador** | Está en el encabezado y filtra los productos en tiempo real |
| 📄 | **Paginación** | De a 8 productos en el catálogo y de a 5 en el panel, pidiendo a Firestore solo la página actual |
| 🔐 | **Usuarios** | Registro, inicio y cierre de sesión con Firebase Authentication |
| 🛠️ | **Panel de gestión** | Solo para admin: crear, editar y eliminar productos, con validaciones y confirmación |
| 🖼️ | **Imágenes** | Se suben a ImgBB y en Firestore se guarda la URL |
| 👥 | **Nuestro equipo** | Las tarjetas se leen desde Firestore |
| ✉️ | **Contacto** | Formulario conectado con Formspree |
| 📱 | **Responsive** | Se adapta a computadora y celular |

## 🧰 Tecnologías

- **React 19** con **Vite**
- **React Router** para las rutas
- **Context API** para el estado global (carrito, sesión y búsqueda)
- **Firebase**: Authentication y Cloud Firestore
- **CSS Modules** para los estilos
- **ImgBB** y **Formspree** como servicios externos

## 🗺️ Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo |
| `/producto/:idProducto` | Detalle de un producto |
| `/carrito` | Carrito |
| `/contactos` | Contacto |
| `/login` | Iniciar sesión |
| `/registro` | Crear cuenta |
| `/panel` | Panel de gestión 🔒 solo admin |

## 📂 Estructura

```
src/
├── components/
│   ├── Auth/           Login, registro y ruta protegida
│   ├── Carrito/
│   ├── Contacto/
│   ├── DetalleItems/   Detalle de producto
│   ├── Items/          Catálogo y tarjetas
│   ├── Panel/          Alta, edición y baja de productos
│   ├── comunes/        Modal, paginación, carga y errores
│   └── layout/         Header, nav y footer
├── context/            CarritoContext, AuthContext, SearchContext
├── firebase/           Configuración
├── hooks/              usePaginacion
└── services/           Subida de imágenes a ImgBB
```

## 🚀 Cómo correrlo en tu computadora

Necesitás **Node.js** (20.19 o superior) y **pnpm**.

```bash
git clone https://github.com/BenjaSoto/ReactJS-Proyecto.git
cd ReactJS-Proyecto
pnpm install
```

Copiá el archivo `.env.example` con el nombre `.env` y completalo con tus claves:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_IMGBB_API_KEY=
```

Y levantá el proyecto:

```bash
pnpm dev
```

## 🔑 Acceso de administrador

El usuario y la contraseña de administrador están indicados en el texto de la entrega, en la plataforma del curso.

Las cuentas que se crean desde la web son usuarios comunes: no ven el panel de gestión.

---

<div align="center">

Hecho con ☕ y ⚛️ por **[BenjaSoto](https://github.com/BenjaSoto)**

</div>
