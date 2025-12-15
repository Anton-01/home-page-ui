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

    // Initialize search input listener
    const searchInput = document.getElementById('contactSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterContacts);
    }
});