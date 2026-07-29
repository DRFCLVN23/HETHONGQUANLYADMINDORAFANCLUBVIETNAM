// Thông tin tài khoản đăng nhập demo
const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

function handleLogin(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if (usernameInput === DEMO_USER && passwordInput === DEMO_PASS) {
        const sessionData = {
            user: usernameInput,
            token: "fake-jwt-token-" + Math.random().toString(36).substr(2),
            expiresAt: Date.now() + (30 * 60 * 1000)
        };

        sessionStorage.setItem('admin_session', JSON.stringify(sessionData));
        errorMessage.classList.add('hidden');
        checkAuth();
    } else {
        errorMessage.classList.remove('hidden');
    }
}

function checkAuth() {
    const sessionRaw = sessionStorage.getItem('admin_session');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (sessionRaw) {
        const session = JSON.parse(sessionRaw);

        if (Date.now() > session.expiresAt) {
            alert('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!');
            handleLogout();
            return;
        }

        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');

        document.getElementById('userDisplayName').innerText = session.user;
        document.getElementById('avatarText').innerText = session.user.charAt(0).toUpperCase();

    } else {
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    }
}

function handleLogout() {
    sessionStorage.removeItem('admin_session');
    document.getElementById('loginForm').reset();
    checkAuth();
}
