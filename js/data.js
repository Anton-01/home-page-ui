// ============================================
// DATA - MODULES JSON
// ============================================
const modulesData = [
    {
        id: "email",
        label: "Email",
        type: "link",
        url: "https://mail.empresa.com",
        target: "_blank",
        icon: "email",
        highlight: null
    },
    {
        id: "contactos",
        label: "Contactos",
        type: "modal",
        modalId: "contactsModal",
        icon: "contacts",
        highlight: null
    },
    {
        id: "crm",
        label: "CRM",
        type: "link",
        url: "#crm",
        target: "_self",
        icon: "crm",
        highlight: null
    },
    {
        id: "capacitacion",
        label: "Capacitación",
        type: "link",
        url: "#capacitacion",
        target: "_self",
        icon: "education",
        highlight: null
    },
    {
        id: "vacaciones",
        label: "Solicitud de Vacaciones",
        type: "link",
        url: "#vacaciones",
        target: "_self",
        icon: "calendar",
        highlight: null
    },
    {
        id: "indicadores",
        label: "Indicadores",
        type: "link",
        url: "#indicadores",
        target: "_self",
        icon: "chart",
        highlight: null
    },
    {
        id: "reportes-seguridad",
        label: "Reportes Seguridad",
        type: "link",
        url: "#reportes-seguridad",
        target: "_self",
        icon: "alert",
        highlight: "red"
    },
    {
        id: "procedimientos",
        label: "Procedimientos",
        type: "link",
        url: "#procedimientos",
        target: "_self",
        icon: "document",
        highlight: null
    },
    {
        id: "planeacion",
        label: "Planeación",
        type: "link",
        url: "#planeacion",
        target: "_self",
        icon: "planning",
        highlight: null
    },
    {
        id: "finanzas",
        label: "Finanzas",
        type: "link",
        url: "#finanzas",
        target: "_self",
        icon: "finance",
        highlight: null
    },
    {
        id: "seguridad-higiene",
        label: "Seguridad e Higiene",
        type: "link",
        url: "#seguridad-higiene",
        target: "_self",
        icon: "shield",
        highlight: null
    },
    {
        id: "solicitud-epp",
        label: "Solicitud EPP",
        type: "link",
        url: "#solicitud-epp",
        target: "_self",
        icon: "epp",
        highlight: null
    },
    {
        id: "inventarios",
        label: "Inventarios",
        type: "link",
        url: "#inventarios",
        target: "_self",
        icon: "inventory",
        highlight: null
    },
    {
        id: "facturacion",
        label: "Facturación",
        type: "link",
        url: "#facturacion",
        target: "_self",
        icon: "invoice",
        highlight: null
    },
    {
        id: "almacen",
        label: "Almacén",
        type: "link",
        url: "#almacen",
        target: "_self",
        icon: "warehouse",
        highlight: null
    },
    {
        id: "reporte-ventas",
        label: "Reporte ventas",
        type: "link",
        url: "#reporte-ventas",
        target: "_self",
        icon: "sales",
        highlight: null
    },
    {
        id: "solicitud-compras",
        label: "Solicitud Compras",
        type: "link",
        url: "#solicitud-compras",
        target: "_self",
        icon: "purchase",
        highlight: null
    },
    {
        id: "seguridad-higiene-2",
        label: "Seguridad e Higiene",
        type: "link",
        url: "#seguridad-higiene-2",
        target: "_self",
        icon: "settings",
        highlight: null
    },
    {
        id: "papeleria",
        label: "Papelería",
        type: "link",
        url: "#papeleria",
        target: "_self",
        icon: "stationery",
        highlight: null
    },
    {
        id: "salas-juntas",
        label: "Salas de juntas",
        type: "link",
        url: "#salas-juntas",
        target: "_self",
        icon: "meeting",
        highlight: null
    },
    {
        id: "soporte-it",
        label: "Soporte IT",
        type: "link",
        url: "#soporte-it",
        target: "_self",
        icon: "support",
        highlight: "orange"
    }
];

// ============================================
// DATA - CONTACTS JSON
// ============================================
const contactsData = [
    {
        id: 1,
        nombre: "María García López",
        departamento: "Recursos Humanos",
        email: "maria.garcia@empresa.com",
        telefono: "55 1234 5678",
        extension: "101",
        imagen: null
    },
    {
        id: 2,
        nombre: "Carlos Rodríguez Mendoza",
        departamento: "Tecnología de la Información",
        email: "carlos.rodriguez@empresa.com",
        telefono: "55 1234 5679",
        extension: "205",
        imagen: null
    },
    {
        id: 3,
        nombre: "Ana Martínez Sánchez",
        departamento: "Finanzas",
        email: "ana.martinez@empresa.com",
        telefono: "55 1234 5680",
        extension: "302",
        imagen: null
    },
    {
        id: 4,
        nombre: "Roberto Hernández Villa",
        departamento: "Operaciones",
        email: "roberto.hernandez@empresa.com",
        telefono: "55 1234 5681",
        extension: "150",
        imagen: null
    },
    {
        id: 5,
        nombre: "Patricia Jiménez Torres",
        departamento: "Marketing",
        email: "patricia.jimenez@empresa.com",
        telefono: "55 1234 5682",
        extension: "410",
        imagen: null
    },
    {
        id: 6,
        nombre: "Fernando López Díaz",
        departamento: "Ventas",
        email: "fernando.lopez@empresa.com",
        telefono: "55 1234 5683",
        extension: "501",
        imagen: null
    },
    {
        id: 7,
        nombre: "Laura Sánchez Moreno",
        departamento: "Compras",
        email: "laura.sanchez@empresa.com",
        telefono: "55 1234 5684",
        extension: "220",
        imagen: null
    },
    {
        id: 8,
        nombre: "Miguel Ángel Ramírez",
        departamento: "Logística",
        email: "miguel.ramirez@empresa.com",
        telefono: "55 1234 5685",
        extension: "330",
        imagen: null
    },
    {
        id: 9,
        nombre: "Gabriela Fernández Castro",
        departamento: "Calidad",
        email: "gabriela.fernandez@empresa.com",
        telefono: "55 1234 5686",
        extension: "125",
        imagen: null
    },
    {
        id: 10,
        nombre: "José Luis Morales Ruiz",
        departamento: "Producción",
        email: "jose.morales@empresa.com",
        telefono: "55 1234 5687",
        extension: "180",
        imagen: null
    },
    {
        id: 11,
        nombre: "Alejandra Vega Núñez",
        departamento: "Contabilidad",
        email: "alejandra.vega@empresa.com",
        telefono: "55 1234 5688",
        extension: "305",
        imagen: null
    },
    {
        id: 12,
        nombre: "Ricardo Peña Salazar",
        departamento: "Legal",
        email: "ricardo.pena@empresa.com",
        telefono: "55 1234 5689",
        extension: "400",
        imagen: null
    }
];

// ============================================
// DATA - CALENDAR EVENTS JSON
// ============================================
const calendarEventsData = [
    {
        day: 6,
        title: "Junta de Directivos",
        content: "Reunión mensual para revisar indicadores clave y objetivos del trimestre.",
        time: "09:00 - 11:00"
    },
    {
        day: 10,
        title: "Capacitación: Seguridad Industrial",
        content: "Curso obligatorio para todo el personal del área de producción.",
        time: "14:00 - 17:00"
    },
    {
        day: 14,
        title: "Reunión de Planeación",
        content: "Definición de estrategias y metas para el primer trimestre de 2025.",
        time: "10:00 - 12:00"
    },
    {
        day: 15,
        title: "Auditoría Interna",
        content: "Revisión de procesos y documentación del sistema de gestión de calidad.",
        time: "08:00 - 13:00"
    },
    {
        day: 20,
        title: "Día de Integración",
        content: "Actividades recreativas y de team building para todos los colaboradores.",
        time: "12:00 - 18:00"
    },
    {
        day: 24,
        title: "Entrega de Reportes",
        content: "Fecha límite para entregar reportes mensuales de cada departamento.",
        time: "Todo el día"
    },
    {
        day: 28,
        title: "Mantenimiento Programado",
        content: "Mantenimiento preventivo de equipos de cómputo y servidores.",
        time: "18:00 - 22:00"
    }
];

// ============================================
// DATA - NEWS TICKER JSON
// ============================================
const newsTickerData = [
    {
        id: 1,
        text: "Recordatorio: La fecha límite para entregar solicitudes de vacaciones es el 20 de enero."
    },
    {
        id: 2,
        text: "¡Felicidades al equipo de Ventas por superar la meta del mes!"
    },
    {
        id: 3,
        text: "Nuevo horario de comedor: Lunes a Viernes de 12:00 a 15:00 hrs."
    },
    {
        id: 4,
        text: "Mantenimiento programado en el sistema de correo este sábado de 22:00 a 02:00 hrs."
    },
    {
        id: 5,
        text: "Inscripciones abiertas para el torneo de fútbol interdepartamental 2025."
    }
];

// ============================================
// ICONS SVG LIBRARY
// ============================================
const iconsLibrary = {
    email: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
    contacts: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
    crm: '<text x="3" y="16" font-size="11" font-weight="bold" fill="currentColor">CRM</text>',
    education: '<path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>',
    calendar: '<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>',
    chart: '<path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/>',
    alert: '<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>',
    document: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
    planning: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>',
    finance: '<path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/>',
    shield: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>',
    epp: '<path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v5c0 .75.4 1.38 1 1.73V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3.28c.59-.35 1-.99 1-1.72V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"/>',
    inventory: '<path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/>',
    invoice: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
    warehouse: '<path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>',
    sales: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-3h2v3zm0-5h-2v-2h2v2zm4 5h-2v-7h2v7z"/>',
    purchase: '<path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>',
    settings: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
    stationery: '<path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>',
    meeting: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>',
    support: '<path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>'
};

// ============================================
// AVATAR COLORS (matching the template palette)
// ============================================
const avatarColors = [
    '#1a3a8f',  // Primary blue
    '#2563eb',  // Bright blue
    '#c9a227',  // Gold
    '#dc2626',  // Red
    '#f59e0b',  // Orange
    '#0d9488',  // Teal
    '#7c3aed',  // Purple
    '#059669',  // Green
    '#0891b2',  // Cyan
    '#be185d'   // Pink
];