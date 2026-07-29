// js/documents.js

export function renderDocumentsPage(user) {
    return `
        ${user.role === 'Ban Quản Trị' ? `
        <div class="card">
            <h3>📤 Tải lên Văn bản / Quy định mới</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                <input type="text" id="docTitle" placeholder="Tên văn bản / Quy định...">
                <select id="docCategory">
                    <option value="Quy định chung">Quy định chung</option>
                    <option value="Quy trình Edit / Sub">Quy trình Edit / Sub</option>
                    <option value="Hướng dẫn Kỹ thuật">Hướng dẫn Kỹ thuật</option>
                    <option value="Khác">Khác</option>
                </select>
                <input type="text" id="docLink" placeholder="Đường dẫn liên kết (Drive, Docs,...)">
            </div>
            <button class="btn-primary" onclick="window.addDocument()" style="margin-top: 10px;">💾 Lưu văn bản</button>
        </div>` : ''}

        <div class="card">
            <h3>📑 Kho Văn bản & Quy định nội bộ</h3>
            <div style="margin-bottom: 15px;">
                <input type="text" id="searchDoc" placeholder="🔍 Tìm kiếm văn bản..." onkeyup="window.filterDocs()">
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Tên văn bản</th>
                        <th>Danh mục</th>
                        <th>Ngày cập nhật</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody id="docTableBody">
                    <tr>
                        <td><b>Quy định làm việc Ban Quản Trị & Thành viên</b></td>
                        <td><span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-size: 12px;">Quy định chung</span></td>
                        <td>2026-01-10</td>
                        <td><a href="#" style="color: #0284c7; font-weight: bold; text-decoration: none;">📄 Xem chi tiết</a></td>
                    </tr>
                    <tr>
                        <td><b>Hướng dẫn chuẩn hóa Subtitle & Aegisub</b></td>
                        <td><span style="background: #fef3c7; color: #b45309; padding: 3px 8px; border-radius: 4px; font-size: 12px;">Hướng dẫn Kỹ thuật</span></td>
                        <td>2026-02-15</td>
                        <td><a href="#" style="color: #0284c7; font-weight: bold; text-decoration: none;">📄 Xem chi tiết</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Xử lý thêm văn bản
window.addDocument = function() {
    const title = document.getElementById("docTitle")?.value.trim();
    const cat = document.getElementById("docCategory")?.value;
    const link = document.getElementById("docLink")?.value.trim() || "#";

    if (!title) return alert("Vui lòng nhập tên văn bản!");

    const tbody = document.getElementById("docTableBody");
    if (tbody) {
        const today = new Date().toISOString().slice(0, 10);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><b>${title}</b></td>
            <td><span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${cat}</span></td>
            <td>${today}</td>
            <td><a href="${link}" target="_blank" style="color: #0284c7; font-weight: bold; text-decoration: none;">📄 Xem chi tiết</a></td>
        `;
        tbody.prepend(tr);
        alert("Đã thêm văn bản mới thành công!");
        document.getElementById("docTitle").value = "";
        document.getElementById("docLink").value = "";
    }
};

// Xử lý tìm kiếm văn bản
window.filterDocs = function() {
    const input = document.getElementById("searchDoc")?.value.toLowerCase();
    const rows = document.querySelectorAll("#docTableBody tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
};
