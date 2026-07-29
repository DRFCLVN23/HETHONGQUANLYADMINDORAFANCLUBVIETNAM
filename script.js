// Mật khẩu giả lập cho demo Frontend
const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

// Tự động kiểm tra trạng thái đăng nhập khi tải xong trang
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

// Xử lý Sự kiện Đăng nhập
function handleLogin(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    // Kiểm tra tài khoản
    if (usernameInput === DEMO_USER && passwordInput === DEMO_PASS) {
        // Tạo Session Data có thời hạn 30 phút
        const sessionData = {
            user: usernameInput,
            token: "fake-jwt-token-" + Math.random().toString(36).substr(2),
            expiresAt: Date.now() + (30 * 60 * 1000)
        };

        // Lưu vào sessionStorage
        sessionStorage.setItem('admin_session', JSON.stringify(sessionData));

        errorMessage.classList.add('hidden');
        checkAuth();
    } else {
        errorMessage.classList.remove('hidden');
    }
}

// Kiểm tra Token và hiển thị giao diện phù hợp
function checkAuth() {
    const sessionRaw = sessionStorage.getItem('admin_session');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (sessionRaw) {
        const session = JSON.parse(sessionRaw);

        // Kiểm tra hết hạn phiên
        if (Date.now() > session.expiresAt) {
            alert('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!');
            handleLogout();
            return;
        }

        // Đã đăng nhập
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');

        document.getElementById('userDisplayName').innerText = session.user;
        document.getElementById('avatarText').innerText = session.user.charAt(0).toUpperCase();

    } else {
        // Chưa đăng nhập
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    }
}

// Xử lý Đăng xuất
function handleLogout() {
    sessionStorage.removeItem('admin_session');
    document.getElementById('loginForm').reset();
    checkAuth();
}
