// ============================================
// LOGIN VALIDATION AND FUNCTIONALITY
// ============================================

// Demo credentials (in real app, this would be server-side)
const DEMO_CREDENTIALS = {
    email: 'usuario@empresa.com',
    password: 'password123'
};

// ============================================
// ALERT SYSTEM
// ============================================
class AlertSystem {
    constructor() {
        this.container = document.getElementById('alertContainer');
        this.alerts = [];
    }

    /**
     * Show an alert message
     * @param {string} type - Alert type: 'error', 'success', 'warning'
     * @param {string} title - Alert title
     * @param {string} message - Alert message
     * @param {number} duration - Duration in ms (default 3000)
     */
    show(type, title, message, duration = 3000) {
        const alertId = Date.now();
        const alertElement = this.createAlertElement(alertId, type, title, message);
        
        this.container.appendChild(alertElement);
        this.alerts.push({ id: alertId, element: alertElement });

        // Auto remove after duration
        setTimeout(() => {
            this.hide(alertId);
        }, duration);

        return alertId;
    }

    createAlertElement(id, type, title, message) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.setAttribute('data-alert-id', id);

        const icons = {
            error: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>',
            success: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
            warning: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>'
        };

        alert.innerHTML = `
            <div class="alert-icon">
                <svg viewBox="0 0 24 24">${icons[type]}</svg>
            </div>
            <div class="alert-content">
                <div class="alert-title">${title}</div>
                <div class="alert-message">${message}</div>
            </div>
            <button class="alert-close" onclick="alertSystem.hide(${id})">
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
            <div class="alert-progress"></div>
        `;

        return alert;
    }

    hide(id) {
        const alertIndex = this.alerts.findIndex(a => a.id === id);
        if (alertIndex === -1) return;

        const { element } = this.alerts[alertIndex];
        element.classList.add('hiding');

        setTimeout(() => {
            element.remove();
            this.alerts.splice(alertIndex, 1);
        }, 300);
    }

    // Shorthand methods
    error(title, message) {
        return this.show('error', title, message);
    }

    success(title, message) {
        return this.show('success', title, message);
    }

    warning(title, message) {
        return this.show('warning', title, message);
    }
}

// Global alert system instance
let alertSystem;

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password (minimum 6 characters)
 * @param {string} password - Password to validate
 * @returns {boolean} - Whether password is valid
 */
function isValidPassword(password) {
    return password.length >= 6;
}

/**
 * Mark input as error
 * @param {HTMLElement} input - Input element
 */
function setInputError(input) {
    input.classList.add('error');
    setTimeout(() => {
        input.classList.remove('error');
    }, 1000);
}

/**
 * Clear input error state
 * @param {HTMLElement} input - Input element
 */
function clearInputError(input) {
    input.classList.remove('error');
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Handle login form submission
 * @param {Event} e - Form submit event
 */
async function handleLogin(e) {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('loginBtn');

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Clear previous errors
    clearInputError(emailInput);
    clearInputError(passwordInput);

    // Validate email
    if (!email) {
        setInputError(emailInput);
        alertSystem.error('Campo requerido', 'Por favor ingresa tu correo electrónico');
        emailInput.focus();
        return;
    }

    if (!isValidEmail(email)) {
        setInputError(emailInput);
        alertSystem.error('Correo inválido', 'Por favor ingresa un correo electrónico válido');
        emailInput.focus();
        return;
    }

    // Validate password
    if (!password) {
        setInputError(passwordInput);
        alertSystem.error('Campo requerido', 'Por favor ingresa tu contraseña');
        passwordInput.focus();
        return;
    }

    if (!isValidPassword(password)) {
        setInputError(passwordInput);
        alertSystem.error('Contraseña inválida', 'La contraseña debe tener al menos 6 caracteres');
        passwordInput.focus();
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate API call
    try {
        await simulateLogin(email, password);
        
        alertSystem.success('¡Bienvenido!', 'Inicio de sesión exitoso. Redirigiendo...');
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        alertSystem.error('Error de autenticación', error.message);
        setInputError(emailInput);
        setInputError(passwordInput);
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

/**
 * Simulate login API call
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Resolves on success, rejects on failure
 */
function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
                resolve({ success: true });
            } else {
                reject(new Error('Credenciales incorrectas. Verifica tu correo y contraseña.'));
            }
        }, 1500);
    });
}

// ============================================
// PASSWORD VISIBILITY TOGGLE
// ============================================
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('passwordToggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
            </svg>
        `;
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
        `;
    }
}

// ============================================
// INPUT EVENT LISTENERS
// ============================================
function initInputListeners() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Clear error on input
    emailInput.addEventListener('input', () => clearInputError(emailInput));
    passwordInput.addEventListener('input', () => clearInputError(passwordInput));

    // Enter key to submit
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('loginForm').dispatchEvent(new Event('submit'));
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize alert system
    alertSystem = new AlertSystem();

    // Initialize form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Initialize input listeners
    initInputListeners();

    // Initialize password toggle
    const passwordToggle = document.getElementById('passwordToggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', togglePasswordVisibility);
    }

    // Show demo credentials hint after 2 seconds
    setTimeout(() => {
        alertSystem.show('warning', 'Credenciales de prueba', 
            `Email: ${DEMO_CREDENTIALS.email} | Password: ${DEMO_CREDENTIALS.password}`, 
            5000);
    }, 2000);
});