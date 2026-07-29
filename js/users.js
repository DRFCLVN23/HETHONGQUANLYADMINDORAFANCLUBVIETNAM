// js/users.js

export function renderUsersPage(user) {
    return `
        ${user.role === 'Ban Quản Trị' ? `
        <div class="card">
            <h3>👥 Thêm thành viên mới</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                <input type="text" id="u_id" placeholder="Mã NV (VD: NV002)">
                <input type="text" id="u_name" placeholder="Họ và tên">
                <select id="u_role">
                    <option value="Member">Member</option>
                    <option value="Ban Quản Trị">Ban Quản Trị</option>
                </select>
            </div>
            <button class="btn-primary" onclick="window.addUser()" style="margin-top: 10px;">➕ Thêm tài khoản</button>
        </div>` : ''}

        <div class="card">
            <h3>📋 Danh sách thành viên</h3>
            <table>
                <thead>
                    <tr>
                        <th>Mã NV</th>
                        <th>Họ tên</th>
                        <th>Chức vụ / Vai trò</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody id="userTableBody">
                    <tr>
                        <td><b>BQT001</b></td>
                        <td>Ban Quản Trị Hệ Thống</td>
                        <td><span style="color: #0284c7; font-weight: bold;">Ban Quản Trị</span></td>
                        <td><span style="color: #16a34a;">● Hoạt động</span></td>
                    </tr>
                    <tr>
                        <td><b>NV001</b></td>
                        <td>Nguyễn Văn A</td>
                        <td>Member</td>
                        <td><span style="color: #16a34a;">● Hoạt động</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Xử lý thêm thành viên giả lập
window.addUser = function() {
    const id = document.getElementById("u_id")?.value.trim();
    const name = document.getElementById("u_name")?.value.trim();
    const role = document.getElementById("u_role")?.value;

    if (!id || !name) return alert("Vui lòng điền đầy đủ Mã và Họ tên!");

    const tbody = document.getElementById("userTableBody");
    if (tbody) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><b>${id.toUpperCase()}</b></td>
            <td>${name}</td>
            <td><span style="color: ${role === 'Ban Quản Trị' ? '#0284c7' : '#333'}; font-weight: ${role === 'Ban Quản Trị' ? 'bold' : 'normal'};">${role}</span></td>
            <td><span style="color: #16a34a;">● Hoạt động</span></td>
        `;
        tbody.appendChild(tr);
        alert(`Đã thêm thành viên ${name} (${id}) thành công!`);
        document.getElementById("u_id").value = "";
        document.getElementById("u_name").value = "";
    }
};
