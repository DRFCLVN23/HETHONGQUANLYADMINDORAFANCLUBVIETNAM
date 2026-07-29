// js/notices.js

export function renderNoticesPage(user) {
    return `
        ${user.role === 'Ban Quản Trị' ? `
        <div class="card">
            <h3>📢 Đăng thông báo mới</h3>
            <input type="text" id="noticeTitle" placeholder="Tiêu đề thông báo...">
            <textarea id="noticeContent" rows="3" placeholder="Nội dung thông báo chi tiết..."></textarea>
            <button class="btn-primary" onclick="window.addNotice()">🚀 Đăng thông báo</button>
        </div>` : ''}

        <div class="card">
            <h3>📌 Thông báo nội bộ</h3>
            <div id="noticeList">
                <div style="border-left: 4px solid #0284c7; padding-left: 15px; margin-bottom: 20px;">
                    <h4 style="color: #0284c7;">Chào mừng đến với hệ thống Dora Admin 2.0</h4>
                    <p style="font-size: 13px; color: #64748b; margin: 5px 0;">⏰ Đăng bởi: Ban Quản Trị — Ngày: 2026-01-01</p>
                    <p>Hệ thống quản lý hành chính nội bộ chính thức đi vào hoạt động. Vui lòng kiểm tra thông tin cá nhân và quy trình làm việc.</p>
                </div>
            </div>
        </div>
    `;
}

// Xử lý thêm thông báo mới
window.addNotice = function() {
    const title = document.getElementById("noticeTitle")?.value.trim();
    const content = document.getElementById("noticeContent")?.value.trim();

    if (!title || !content) return alert("Vui lòng nhập cả tiêu đề và nội dung thông báo!");

    const noticeList = document.getElementById("noticeList");
    if (noticeList) {
        const today = new Date().toISOString().slice(0, 10);
        const div = document.createElement("div");
        div.style.cssText = "border-left: 4px solid #0284c7; padding-left: 15px; margin-bottom: 20px;";
        div.innerHTML = `
            <h4 style="color: #0284c7;">${title}</h4>
            <p style="font-size: 13px; color: #64748b; margin: 5px 0;">⏰ Đăng bởi: Ban Quản Trị — Ngày: ${today}</p>
            <p>${content}</p>
        `;
        noticeList.prepend(div);
        alert("Đã đăng thông báo mới!");
        document.getElementById("noticeTitle").value = "";
        document.getElementById("noticeContent").value = "";
    }
};
