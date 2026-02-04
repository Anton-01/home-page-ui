// ============================================
// LOGIN VALIDATION AND FUNCTIONALITY
// Integration with real backend at https://marks-test.com/graphql
// ============================================

// GraphQL endpoint
const GRAPHQL_URL = '/api/graphql';

// Companies data (will be loaded from backend)
let companiesData = [];

// ============================================
// FETCH COMPANIES FROM BACKEND
// ============================================
async function fetchCompanies() {
    try {
        const response = await fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    query GetCompanies {
                        companies {
                            id
                            nombre
                        }
                    }
                `
            })
        });
        const result = await response.json();
        companiesData = result.data?.companies || [];
        return companiesData;
    } catch (error) {
        console.error('Error fetching companies:', error);
        return [];
    }
}

// ============================================
// SELECT2 STYLE DROPDOWN CLASS
// ============================================
class Select2Custom {
    constructor(containerId, data, placeholder = 'Selecciona una opción') {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.placeholder = placeholder;
        this.selectedValue = null;
        this.selectedText = null;
        this.isOpen = false;
        this.highlightedIndex = -1;
        this.filteredData = [...data];

        if (this.container) {
            this.init();
        }
    }

    init() {
        this.selection = this.container.querySelector('.select2-selection');
        this.selectionText = this.container.querySelector('.select2-selection-text');
        this.dropdown = this.container.querySelector('.select2-dropdown');
        this.searchInput = this.container.querySelector('.select2-search-input');
        this.resultsContainer = this.container.querySelector('.select2-results');
        this.hiddenInput = this.container.querySelector('input[type="hidden"]');

        // Set initial placeholder
        this.selectionText.textContent = this.placeholder;
        this.selectionText.classList.add('placeholder');

        // Render initial options
        this.renderOptions(this.data);

        // Bind events
        this.bindEvents();
    }

    updateData(newData) {
        this.data = newData;
        this.filteredData = [...newData];
        this.renderOptions(this.data);
    }

    bindEvents() {
        // Toggle dropdown on selection click
        this.selection.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Search input
        this.searchInput.addEventListener('input', (e) => {
            this.filterOptions(e.target.value);
        });

        // Prevent dropdown close when clicking inside
        this.dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Focus search input when dropdown opens
        this.searchInput.addEventListener('focus', () => {
            this.highlightedIndex = -1;
        });

        // Keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });

        // Close on outside click
        document.addEventListener('click', () => {
            this.close();
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.container.classList.add('active');
        this.searchInput.value = '';
        this.filterOptions('');
        this.highlightedIndex = -1;

        // Focus search input
        setTimeout(() => {
            this.searchInput.focus();
        }, 100);
    }

    close() {
        this.isOpen = false;
        this.container.classList.remove('active');
        this.highlightedIndex = -1;
    }

    filterOptions(searchTerm) {
        const term = searchTerm.toLowerCase().trim();

        if (!term) {
            this.filteredData = [...this.data];
        } else {
            this.filteredData = this.data.filter(item =>
                item.nombre.toLowerCase().includes(term)
            );
        }

        this.renderOptions(this.filteredData);
        this.highlightedIndex = -1;
    }

    renderOptions(options) {
        if (options.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="select2-no-results">No se encontraron resultados</div>
            `;
            return;
        }

        this.resultsContainer.innerHTML = options.map((item, index) => `
            <div class="select2-result ${this.selectedValue === item.id ? 'selected' : ''}"
                 data-id="${item.id}"
                 data-index="${index}">
                ${item.nombre}
            </div>
        `).join('');

        // Bind click events to results
        this.resultsContainer.querySelectorAll('.select2-result').forEach(result => {
            result.addEventListener('click', () => {
                const id = parseInt(result.dataset.id);
                const item = this.data.find(i => i.id === id);
                if (item) {
                    this.select(item);
                }
            });

            result.addEventListener('mouseenter', () => {
                this.highlightedIndex = parseInt(result.dataset.index);
                this.updateHighlight();
            });
        });
    }

    select(item) {
        this.selectedValue = item.id;
        this.selectedText = item.nombre;

        // Update display
        this.selectionText.textContent = item.nombre;
        this.selectionText.classList.remove('placeholder');

        // Update hidden input
        if (this.hiddenInput) {
            this.hiddenInput.value = item.id;
        }

        // Close dropdown
        this.close();

        // Re-render to show selected state
        this.renderOptions(this.filteredData);
    }

    handleKeydown(e) {
        const results = this.resultsContainer.querySelectorAll('.select2-result');

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (this.highlightedIndex < results.length - 1) {
                    this.highlightedIndex++;
                    this.updateHighlight();
                    this.scrollToHighlighted();
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (this.highlightedIndex > 0) {
                    this.highlightedIndex--;
                    this.updateHighlight();
                    this.scrollToHighlighted();
                }
                break;

            case 'Enter':
                e.preventDefault();
                if (this.highlightedIndex >= 0 && this.filteredData[this.highlightedIndex]) {
                    this.select(this.filteredData[this.highlightedIndex]);
                }
                break;
        }
    }

    updateHighlight() {
        const results = this.resultsContainer.querySelectorAll('.select2-result');
        results.forEach((result, index) => {
            result.classList.toggle('highlighted', index === this.highlightedIndex);
        });
    }

    scrollToHighlighted() {
        const highlighted = this.resultsContainer.querySelector('.select2-result.highlighted');
        if (highlighted) {
            highlighted.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }

    getValue() {
        return this.selectedValue;
    }

    getText() {
        return this.selectedText;
    }

    reset() {
        this.selectedValue = null;
        this.selectedText = null;
        this.selectionText.textContent = this.placeholder;
        this.selectionText.classList.add('placeholder');
        if (this.hiddenInput) {
            this.hiddenInput.value = '';
        }
        this.renderOptions(this.data);
    }
}

// Global company select instance
let companySelect;

// ============================================
// ALERT SYSTEM
// ============================================
class AlertSystem {
    constructor() {
        this.container = document.getElementById('alertContainer');
        this.alerts = [];
    }

    show(type, title, message, duration = 3000) {
        const alertId = Date.now();
        const alertElement = this.createAlertElement(alertId, type, title, message);

        this.container.appendChild(alertElement);
        this.alerts.push({ id: alertId, element: alertElement });

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

    error(title, message) {
        return this.show('error', title, message);
    }

    success(title, message) {
        return this.show('success', title, message);
    }

    warning(title, message, duration = 5000) {
        return this.show('warning', title, message, duration);
    }
}

// Global alert system instance
let alertSystem;

// ============================================
// VALIDATION FUNCTIONS
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password.length >= 6;
}

function setInputError(input) {
    input.classList.add('error');
    setTimeout(() => {
        input.classList.remove('error');
    }, 1000);
}

function clearInputError(input) {
    input.classList.remove('error');
}

// ============================================
// FORM HANDLING - REAL BACKEND LOGIN
// ============================================
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

    try {
        // Call GraphQL mutation for login
        const response = await fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    mutation Login($email: String!, $password: String!) {
                        login(email: $email, password: $password) {
                            success
                            message
                            user { id email nombre companyId }
                            token
                        }
                    }
                `,
                variables: { email, password }
            })
        });

        const result = await response.json();
        const loginResult = result.data?.login;

        if (loginResult?.success) {
            // Save session to cookie
            const session = {
                user: loginResult.user,
                token: loginResult.token,
                expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour
            };
            document.cookie = `session=${encodeURIComponent(JSON.stringify(session))}; path=/; max-age=3600`;

            alertSystem.success('¡Bienvenido!', 'Inicio de sesión exitoso. Redirigiendo...');

            // Redirect to main page
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } else {
            alertSystem.error('Error de autenticación', loginResult?.message || 'Credenciales incorrectas');
            setInputError(emailInput);
            setInputError(passwordInput);
        }
    } catch (error) {
        console.error('Login error:', error);
        alertSystem.error('Error', 'No se pudo conectar con el servidor');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
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
// PASSWORD RESET MODAL FUNCTIONS
// ============================================
function openPasswordResetModal(e) {
    if (e) e.preventDefault();

    const modal = document.getElementById('passwordResetModal');
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const resetEmailInput = document.getElementById('resetEmail');
    const resetEmailError = document.getElementById('resetEmailError');
    const resetBtn = document.getElementById('passwordResetBtn');

    if (resetEmailInput) {
        resetEmailInput.value = '';
        clearInputError(resetEmailInput);
    }
    if (resetEmailError) resetEmailError.textContent = '';
    if (resetBtn) resetBtn.disabled = true;

    setTimeout(() => {
        if (resetEmailInput) resetEmailInput.focus();
    }, 300);
}

function closePasswordResetModal() {
    const modal = document.getElementById('passwordResetModal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function validateResetEmail() {
    const resetEmailInput = document.getElementById('resetEmail');
    const resetEmailError = document.getElementById('resetEmailError');
    const resetBtn = document.getElementById('passwordResetBtn');

    if (!resetEmailInput || !resetBtn) return;

    const email = resetEmailInput.value.trim();

    if (!email) {
        resetEmailError.textContent = '';
        resetBtn.disabled = true;
        clearInputError(resetEmailInput);
        return false;
    }

    if (!isValidEmail(email)) {
        resetEmailError.textContent = 'Por favor ingresa un correo electrónico válido';
        resetBtn.disabled = true;
        return false;
    }

    resetEmailError.textContent = '';
    resetBtn.disabled = false;
    clearInputError(resetEmailInput);
    return true;
}

async function handlePasswordReset(e) {
    e.preventDefault();

    const resetEmailInput = document.getElementById('resetEmail');
    const resetEmailError = document.getElementById('resetEmailError');
    const resetBtn = document.getElementById('passwordResetBtn');

    const email = resetEmailInput.value.trim();

    if (!email) {
        setInputError(resetEmailInput);
        resetEmailError.textContent = 'El correo electrónico es requerido';
        alertSystem.error('Campo requerido', 'Por favor ingresa tu correo electrónico');
        resetEmailInput.focus();
        return;
    }

    if (!isValidEmail(email)) {
        setInputError(resetEmailInput);
        resetEmailError.textContent = 'Por favor ingresa un correo electrónico válido';
        alertSystem.error('Correo inválido', 'Por favor ingresa un correo electrónico válido');
        resetEmailInput.focus();
        return;
    }

    resetBtn.classList.add('loading');
    resetBtn.disabled = true;

    try {
        // Call GraphQL mutation for password reset
        await fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: 'mutation RequestPasswordReset($email: String!) { requestPasswordReset(email: $email) }',
                variables: { email }
            })
        });

        closePasswordResetModal();
        alertSystem.success(
            'Solicitud enviada',
            'Un administrador se pondrá en contacto contigo para restablecer tu contraseña.',
            5000
        );
    } catch (error) {
        alertSystem.error('Error', 'Ocurrió un error al procesar tu solicitud. Intenta nuevamente.');
    } finally {
        resetBtn.classList.remove('loading');
        resetBtn.disabled = false;
    }
}

function initPasswordResetModal() {
    const modal = document.getElementById('passwordResetModal');
    const resetForm = document.getElementById('passwordResetForm');
    const resetEmailInput = document.getElementById('resetEmail');

    if (!modal) return;

    if (resetForm) {
        resetForm.addEventListener('submit', handlePasswordReset);
    }

    if (resetEmailInput) {
        resetEmailInput.addEventListener('input', validateResetEmail);
        resetEmailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !isValidEmail(email)) {
                setInputError(this);
            }
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePasswordResetModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePasswordResetModal();
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize alert system
    alertSystem = new AlertSystem();

    // Fetch companies from backend
    const companies = await fetchCompanies();

    // Initialize company select (Select2 style)
    companySelect = new Select2Custom('companySelect', companies, 'Selecciona una compañía');

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

    // Initialize password reset modal
    initPasswordResetModal();
});
