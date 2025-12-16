// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get consistent color based on name
 * @param {string} name - The name to generate color for
 * @returns {string} - Hex color code
 */
function getAvatarColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
}

/**
 * Get initials from full name
 * @param {string} name - Full name
 * @returns {string} - Initials (max 2 characters)
 */
function getInitials(name) {
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
}

/**
 * Get icon SVG path from library
 * @param {string} iconName - Name of the icon
 * @returns {string} - SVG path content
 */
function getIcon(iconName) {
    return iconsLibrary[iconName] || iconsLibrary.document;
}

// ============================================
// RENDER MODULES
// ============================================
function renderModules() {
    const grid = document.getElementById('modulesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    modulesData.forEach(module => {
        let element;
        const highlightClass = module.highlight ? `highlight-${module.highlight}` : '';

        if (module.type === 'link') {
            element = document.createElement('a');
            element.href = module.url;
            element.target = module.target || '_self';
        } else if (module.type === 'modal') {
            element = document.createElement('button');
            element.onclick = () => openModal(module.modalId);
        }

        element.className = `module-card ${highlightClass}`;
        element.innerHTML = `
            <div class="module-icon">
                <svg viewBox="0 0 24 24">${getIcon(module.icon)}</svg>
            </div>
            <span class="module-label">${module.label}</span>
        `;

        grid.appendChild(element);
    });
}

// ============================================
// RENDER CONTACTS
// ============================================
function renderContacts(contacts = contactsData) {
    const list = document.getElementById('contactsList');
    if (!list) return;
    
    if (contacts.length === 0) {
        list.innerHTML = `
            <div class="no-results">
                <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                <p>No se encontraron contactos</p>
            </div>
        `;
        return;
    }

    list.innerHTML = contacts.map(contact => {
        const avatarContent = contact.imagen 
            ? `<img src="${contact.imagen}" alt="${contact.nombre}">`
            : getInitials(contact.nombre);
        
        const avatarStyle = contact.imagen 
            ? '' 
            : `background-color: ${getAvatarColor(contact.nombre)}`;

        return `
            <div class="contact-card">
                <div class="contact-avatar" style="${avatarStyle}">
                    ${avatarContent}
                </div>
                <div class="contact-info">
                    <div class="contact-name">${contact.nombre}</div>
                    <div class="contact-department-row">
                        <span class="contact-department">${contact.departamento}</span>
                        <div class="contact-email-container">
                            <span class="contact-email">${contact.email}</span>
                            <button class="copy-email-btn" onclick="copyToClipboard('${contact.email}', this)" title="Copiar correo">
                                <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                                <span class="copy-tooltip">¡Copiado!</span>
                            </button>
                        </div>
                    </div>
                    <div class="contact-phone">
                        <svg viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                        ${contact.telefono}
                        <span class="contact-extension">Ext. ${contact.extension}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Add copied class for animation
        button.classList.add('copied');
        
        // Remove class after animation
        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// ============================================
// FILTER CONTACTS
// ============================================
function filterContacts() {
    const searchInput = document.getElementById('contactSearch');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = contactsData.filter(contact => 
        contact.nombre.toLowerCase().includes(searchTerm) ||
        contact.departamento.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        contact.extension.includes(searchTerm)
    );
    renderContacts(filtered);
}

// ============================================
// RENDER CALENDAR
// ============================================
function renderCalendar() {
    const container = document.getElementById('calendarDays');
    if (!container) return;
    
    container.innerHTML = '';

    // January 2025 starts on Wednesday (offset is 2 counting from Monday)
    const firstDayOffset = 2;
    const daysInMonth = 31;
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Use today's date if we're in January 2025, otherwise use 14 as demo
    const highlightDay = (currentMonth === 0 && currentYear === 2025) ? today : 14;

    // Create event lookup
    const eventsMap = {};
    calendarEventsData.forEach(event => {
        eventsMap[event.day] = event;
    });

    // Add empty cells for offset
    for (let i = 0; i < firstDayOffset; i++) {
        const emptyDay = document.createElement('span');
        emptyDay.className = 'calendar-day empty';
        container.appendChild(emptyDay);
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('span');
        let classes = 'calendar-day';
        
        if (day === highlightDay) {
            classes += ' today';
        }
        
        if (eventsMap[day]) {
            classes += ' has-event';
            dayElement.onclick = (e) => showEventModal(day, eventsMap[day], e);
        }

        dayElement.className = classes;
        dayElement.textContent = day;
        container.appendChild(dayElement);
    }
}

// ============================================
// NEWS TICKER
// ============================================
function renderNewsTicker() {
    const track = document.getElementById('newsTickerTrack');
    if (!track) return;

    // Create news items (duplicated for seamless loop)
    const newsHtml = newsTickerData.map(news => 
        `<span class="news-item">${news.text}</span>`
    ).join('');

    // Duplicate content for seamless scrolling
    track.innerHTML = newsHtml + newsHtml;

    // Calculate animation duration based on content length
    const contentWidth = track.scrollWidth / 2;
    const duration = contentWidth / 50; // 50px per second
    track.style.animationDuration = `${duration}s`;
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset search when opening contacts modal
    if (modalId === 'contactsModal') {
        const searchInput = document.getElementById('contactSearch');
        if (searchInput) {
            searchInput.value = '';
        }
        renderContacts();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
function initModalCloseOnOutsideClick() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Close modal with Escape key
function initModalCloseOnEscape() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
            closeEventModal();
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// EVENT MODAL FUNCTIONS
// ============================================
function showEventModal(day, event, e) {
    const modal = document.getElementById('eventModal');
    if (!modal) return;
    
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    document.getElementById('eventModalDate').textContent = `${day} de ${months[0]} 2025`;
    document.getElementById('eventModalTitle').textContent = event.title;
    document.getElementById('eventModalContent').textContent = event.content;
    document.getElementById('eventModalTimeText').textContent = event.time;

    // Position the modal near the clicked element
    const rect = e.target.getBoundingClientRect();
    const modalWidth = 300;
    const modalHeight = 200;
    
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 10;

    // Adjust if too close to right edge
    if (left + modalWidth > window.innerWidth - 20) {
        left = window.innerWidth - modalWidth - 20;
    }

    // Adjust if too close to bottom
    if (top + modalHeight > window.innerHeight + window.scrollY - 20) {
        top = rect.top + window.scrollY - modalHeight - 10;
    }

    // Ensure minimum left position
    if (left < 20) {
        left = 20;
    }

    modal.style.left = `${left}px`;
    modal.style.top = `${top}px`;
    modal.classList.add('active');
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close event modal when clicking outside
function initEventModalCloseOnOutsideClick() {
    document.addEventListener('click', (e) => {
        const eventModal = document.getElementById('eventModal');
        if (eventModal && eventModal.classList.contains('active')) {
            if (!eventModal.contains(e.target) && !e.target.classList.contains('has-event')) {
                closeEventModal();
            }
        }
    });
}

// ============================================
// SIDEBAR FAB (Floating Action Button)
// ============================================

/**
 * Toggle the sidebar FAB menu
 */
function toggleSidebarFab() {
    const fabContainer = document.querySelector('.sidebar-fab-container');
    const fab = document.getElementById('sidebarFab');

    if (!fabContainer || !fab) return;

    fabContainer.classList.toggle('active');
    fab.classList.toggle('active');
}

/**
 * Close the sidebar FAB menu
 */
function closeSidebarFab() {
    const fabContainer = document.querySelector('.sidebar-fab-container');
    const fab = document.getElementById('sidebarFab');

    if (!fabContainer || !fab) return;

    fabContainer.classList.remove('active');
    fab.classList.remove('active');
}

/**
 * Handle ticket/incident button click
 */
function handleTicketClick() {
    // Close the FAB menu
    closeSidebarFab();

    // Show confirmation alert
    showTicketAlert();
}

/**
 * Show ticket submission alert
 */
function showTicketAlert() {
    // Create alert container if it doesn't exist
    let alertContainer = document.getElementById('mainAlertContainer');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'mainAlertContainer';
        alertContainer.className = 'main-alert-container';
        document.body.appendChild(alertContainer);
    }

    // Create alert element
    const alertId = Date.now();
    const alert = document.createElement('div');
    alert.className = 'main-alert main-alert-success';
    alert.setAttribute('data-alert-id', alertId);
    alert.innerHTML = `
        <div class="main-alert-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </div>
        <div class="main-alert-content">
            <div class="main-alert-title">Incidente Registrado</div>
            <div class="main-alert-message">Un administrador se pondrá en contacto contigo pronto para dar seguimiento a tu solicitud.</div>
        </div>
        <button class="main-alert-close" onclick="closeMainAlert(${alertId})">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
    `;

    alertContainer.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        closeMainAlert(alertId);
    }, 5000);
}

/**
 * Close a main alert by ID
 * @param {number} alertId - The alert ID
 */
function closeMainAlert(alertId) {
    const alert = document.querySelector(`[data-alert-id="${alertId}"]`);
    if (!alert) return;

    alert.classList.add('hiding');
    setTimeout(() => {
        alert.remove();
    }, 300);
}

/**
 * Initialize sidebar FAB functionality
 */
function initSidebarFab() {
    const fab = document.getElementById('sidebarFab');
    const ticketBtn = document.getElementById('ticketBtn');

    if (fab) {
        fab.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebarFab();
        });
    }

    if (ticketBtn) {
        ticketBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleTicketClick();
        });
    }

    // Close FAB when clicking outside
    document.addEventListener('click', (e) => {
        const fabContainer = document.querySelector('.sidebar-fab-container');
        if (fabContainer && !fabContainer.contains(e.target)) {
            closeSidebarFab();
        }
    });

    // Close FAB on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebarFab();
        }
    });
}

// ============================================
// BANNER SLIDER
// ============================================
let currentSlide = 0;
let sliderInterval = null;

/**
 * Initialize the banner slider with automatic transitions
 */
function initBannerSlider() {
    const slider = document.getElementById('bannerSlider');
    const sliderMobile = document.getElementById('bannerSliderMobile');
    const dotsContainer = document.getElementById('bannerDots');

    if (!slider && !sliderMobile) return;

    const slides = slider ? slider.querySelectorAll('.slide-image') : [];
    const slidesMobile = sliderMobile ? sliderMobile.querySelectorAll('.slide-image') : [];
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.banner-dot') : [];

    const totalSlides = Math.max(slides.length, slidesMobile.length);
    if (totalSlides === 0) return;

    /**
     * Go to a specific slide
     * @param {number} index - The slide index to show
     */
    function goToSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        slidesMobile.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Update current slide index
        currentSlide = index;
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;

        // Add active class to current slide
        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (slidesMobile[currentSlide]) slidesMobile[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    /**
     * Go to the next slide
     */
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            // Reset interval when manually clicking
            resetSliderInterval();
        });
    });

    /**
     * Reset the auto-slide interval
     */
    function resetSliderInterval() {
        if (sliderInterval) {
            clearInterval(sliderInterval);
        }
        sliderInterval = setInterval(nextSlide, 1500); // 1.5 seconds
    }

    // Start automatic sliding
    resetSliderInterval();
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Render all components
    renderModules();
    renderContacts();
    renderCalendar();
    renderNewsTicker();

    // Initialize event listeners
    initModalCloseOnOutsideClick();
    initModalCloseOnEscape();
    initEventModalCloseOnOutsideClick();

    // Initialize sidebar FAB
    initSidebarFab();

    // Initialize banner slider
    initBannerSlider();

    // Initialize search input listener
    const searchInput = document.getElementById('contactSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterContacts);
    }
});