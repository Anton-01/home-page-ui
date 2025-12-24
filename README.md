# Home Page UI - Panel de Comunicación Empresarial

Un panel de comunicación empresarial moderno y responsive, diseñado con HTML, CSS y JavaScript vanilla.

![Panel Preview](assets/preview.png)

## 🚀 Características

### Panel Principal
- **Grid de módulos dinámico**: Los módulos se cargan desde un JSON configurable
- **Módulos tipo link y modal**: Soporte para navegación directa o apertura de modales
- **Calendario interactivo**: Muestra eventos programados con mini modal de detalles
- **Cintillo de noticias**: Banner animado con noticias scrolleables
- **Diseño 100% responsive**: Adaptable a cualquier dispositivo

### Modal de Contactos
- **Lista de contactos dinámica**: Cargada desde JSON
- **Avatares automáticos**: Genera avatares con iniciales y colores consistentes
- **Búsqueda en tiempo real**: Filtra por nombre, departamento, email o extensión
- **Copiar al portapapeles**: Botón para copiar email con feedback visual
- **Scrollbar personalizado**: Diseño delgado y elegante

### Página de Login
- **Validación de formularios**: Validación de email y contraseña
- **Sistema de alertas**: Mensajes que desaparecen automáticamente en 3 segundos
- **Toggle de contraseña**: Mostrar/ocultar contraseña
- **Animaciones suaves**: Efectos visuales en errores y transiciones
- **Background animado**: Formas flotantes en el fondo

## 📁 Estructura del Proyecto

```
home-page-ui/
├── index.html          # Página principal del panel
├── login.html          # Página de inicio de sesión
├── css/
│   ├── styles.css      # Estilos del panel principal
│   └── login.css       # Estilos de la página de login
├── js/
│   ├── data.js         # Datos JSON (módulos, contactos, eventos, noticias)
│   ├── app.js          # Lógica principal del panel
│   └── login.js        # Lógica de la página de login
├── assets/             # Imágenes y recursos
└── README.md           # Documentación
```

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Anton-01/home-page-ui.git
```

2. Abre el proyecto en tu editor de código favorito

3. Abre `login.html` o `index.html` en tu navegador

> **Nota**: No requiere servidor web, funciona directamente desde el sistema de archivos.

## ⚙️ Configuración

### Módulos (`js/data.js`)

```javascript
const modulesData = [
    {
        id: "email",
        label: "Email",
        type: "link",           // "link" o "modal"
        url: "https://...",     // URL para tipo link
        target: "_blank",       // "_blank" o "_self"
        icon: "email",          // Nombre del icono
        highlight: null         // null, "red" o "orange"
    },
    {
        id: "contactos",
        label: "Contactos",
        type: "modal",
        modalId: "contactsModal",  // ID del modal a abrir
        icon: "contacts",
        highlight: null
    }
];
```

### Contactos (`js/data.js`)

```javascript
const contactsData = [
    {
        id: 1,
        nombre: "María García López",
        departamento: "Recursos Humanos",
        email: "maria.garcia@empresa.com",
        telefono: "55 1234 5678",
        extension: "101",
        imagen: null  // URL de imagen o null para avatar automático
    }
];
```

### Eventos del Calendario (`js/data.js`)

```javascript
const calendarEventsData = [
    {
        day: 15,
        title: "Reunión de Planeación",
        content: "Descripción del evento...",
        time: "10:00 - 12:00"
    }
];
```

### Noticias (`js/data.js`)

```javascript
const newsTickerData = [
    {
        id: 1,
        text: "Texto de la noticia..."
    }
];
```

## 🔐 Credenciales de Prueba (Login)

- **Email**: `usuario@empresa.com`
- **Password**: `password123`

## 🎨 Personalización

### Colores
Los colores principales se pueden modificar en las variables CSS al inicio de `css/styles.css` y `css/login.css`:

```css
:root {
    --color-bg-primary: #0a1744;
    --color-bg-secondary: #0d1b4c;
    --color-module-bg: #1a3a8f;
    --color-accent-red: #dc2626;
    --color-accent-orange: #f59e0b;
    --color-gold: #c9a227;
    /* ... */
}
```

### Iconos
Los iconos SVG se definen en `iconsLibrary` dentro de `js/data.js`. Puedes agregar nuevos iconos siguiendo el mismo patrón.

## 📱 Breakpoints Responsive

| Breakpoint | Dispositivo |
|------------|-------------|
| > 1200px | Desktop grande |
| 1024px - 1200px | Desktop |
| 768px - 1024px | Tablet |
| 576px - 768px | Móvil grande |
| < 576px | Móvil |
| < 400px | Móvil pequeño |

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

- **Memory-Jehu** - [GitHub](https://github.com/Memory-Jehu)

---

⭐ Si te gustó este proyecto, no olvides darle una estrella en GitHub!