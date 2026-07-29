// js/tests.js

export function renderTestsPage(user) {
    return `
        <div class="card">
            <h3>📝 Bài Test Đánh giá Kỹ năng Nhân sự</h3>
            <p style="color: #64748b; margin-bottom: 15px; font-size: 14px;">Mỗi câu hỏi đúng sẽ được tính 2.5 điểm. Hoàn thiện bài test để hệ thống cập nhật vào hồ sơ.</p>

            <form id="quizForm" onsubmit="event.preventDefault(); window.submitQuiz();">
                <div style="margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 8px;">
                    <p><b>Câu 1:</b> Quy trình dịch thuật và biên tập tiêu chuẩn gồm những bước cơ bản nào?</p>
                    <label style="display: block; margin-top: 8px;"><input type="radio" name="q1" value="A"> A. Dịch trực tiếp -> Xuất bản ngay</label>
                    <label style="display: block; margin-top: 5px;"><input type="radio" name="q1" value="B"> B. Dịch thô -> Biên tập (Edit) -> Kỹ thuật (Timing/Typeset) -> Kiểm duyệt (QC)</label>
                    <label style="display: block; margin-top: 5px;"><input type="radio" name="q1" value="C"> C. Tạo sub tự động -> Sửa lỗi chính tả -> Xuất bản</label>
                </div>

                <div style="margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 8px;">
                    <p><b>Câu 2:</b> Độ dài tối đa khuyên dùng cho 1 dòng phụ đề là bao nhiêu ký tự?</p>
                    <label style="display: block; margin-top: 8px;"><input type="radio" name="q2" value="A"> A. Không giới hạn</label>
                    <label style="display: block; margin-top: 5px;"><input type="radio" name="q2" value="B"> B. Khoảng 37 - 42 ký tự/dòng</label>
                    <label style="display: block; margin-top: 5px;"><input type="radio" name="q2" value="C"> C. 80 ký tự/dòng</label>
                </div>

                <button type="submit" class="btn-primary" style="width: 100%; padding: 12px;">📤 Nộp bài làm</button>
            </form>

            <div id="quizResult" style="margin-top: 20px; display: none;" class="card"></div>
        </div>
    `;
}

// Xử lý chấm điểm
window.submitQuiz = function() {
    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;

    if (!q1 || !q2) {
        return alert("Vui lòng trả lời đầy đủ các câu hỏi trước khi nộp bài!");
    }

    let score = 0;
    if (q1 === "B") score += 5;
    if (q2 === "B") score += 5;

    const resultDiv = document.getElementById("quizResult");
    if (resultDiv) {
        resultDiv.style.display = "block";
        resultDiv.style.borderLeft = score >= 5 ? "4px solid #16a34a" : "4px solid #ef4444";
        resultDiv.innerHTML = `
            <h3>📊 Kết quả bài test</h3>
            <p style="font-size: 18px; margin: 10px 0;">Điểm số của bạn: <b style="color: ${score >= 5 ? '#16a34a' : '#ef4444'};">${score} / 10 điểm</b></p>
            <p>${score >= 5 ? '🎉 Chúc mừng! Bạn đã đạt yêu cầu kỹ năng cơ bản.' : '⚠️ Điểm số chưa đạt yêu cầu. Vui lòng xem lại tài liệu quy trình và thử lại!'}</p>
        `;
    }
};
