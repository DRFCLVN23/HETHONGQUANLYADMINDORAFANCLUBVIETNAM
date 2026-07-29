// Import các hàm từ Firebase SDK via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyAuKR3AXJp9RQUXDMduWYcaEWa5nNJGreM",
  authDomain: "hethongadmindorafanclubvietnam.firebaseapp.com",
  databaseURL: "https://hethongadmindorafanclubvietnam-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hethongadmindorafanclubvietnam",
  storageBucket: "hethongadmindorafanclubvietnam.firebasestorage.app",
  messagingSenderId: "379418132018",
  appId: "1:379418132018:web:e4b856fa77b0a4fd6b862b",
  measurementId: "G-7C1MGQ1TFR"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Lấy các phần tử DOM
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const btnLogout = document.getElementById('btnLogout');

// 1. Tự động kiểm tra trạng thái Đăng nhập bằng Firebase Observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Đã đăng nhập
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');

        document.getElementById('userDisplayName').innerText = user.email.split('@')[0];
        document.getElementById('avatarText').innerText = user.email.charAt(0).toUpperCase();

        // Tải dữ liệu từ Firebase Realtime Database
        loadDashboardData();
    } else {
        // Chưa đăng nhập / Đã đăng xuất
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    }
});

// 2. Xử lý Đăng nhập với Firebase Auth
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        errorMessage.classList.add('hidden');
        await signInWithEmailAndPassword(auth, email, password);
        loginForm.reset();
    } catch (error) {
        errorMessage.classList.remove('hidden');
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
            errorText.innerText = "Email hoặc mật khẩu không chính xác!";
        } else if (error.code === 'auth/invalid-email') {
            errorText.innerText = "Định dạng Email không hợp lệ!";
        } else {
            errorText.innerText = "Lỗi đăng nhập: " + error.message;
        }
    }
});

// 3. Xử lý Đăng xuất
btnLogout.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        alert("Lỗi khi đăng xuất: " + error.message);
    }
});

// 4. Hàm đọc dữ liệu thời gian thực từ Realtime Database (Tùy chọn)
function loadDashboardData() {
    const statsRef = ref(database, 'stats');
    onValue(statsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            if(data.members) document.getElementById('statMembers').innerText = data.members;
            if(data.offlineEvents) document.getElementById('statEvents').innerText = data.offlineEvents;
            if(data.fund) document.getElementById('statFund').innerText = data.fund;
        }
    });
}
