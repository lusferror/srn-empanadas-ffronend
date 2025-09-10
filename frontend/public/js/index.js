/**
 * This function shows a Bootstrap toast notification
 * @param {Object} options
 * @param {string} options.message - The message to display
 * @param {string} options.type - The type of notification: 'info', 'success', 'error'
 */
function notification ({ message = '', type = 'info' }) {
    const typeColor = {
        info: 'primary',
        success: 'success',
        error: 'danger',
        warning: 'warning'
    }
    const toastEl = document.querySelector('.toast');
    const toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = message;
    toastEl.className = `toast align-items-center text-bg-${typeColor[type]} border-0`;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

function formatNumber(num) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
}

/**
 * Realiza autenticación básica contra la API
 * @param {string} username
 * @param {string} password
 */
function basicAuthApi() {
    const credentials  = btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`);
    return credentials;
}


