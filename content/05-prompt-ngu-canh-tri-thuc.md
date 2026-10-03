---
chapter: 5
title: "Prompt, ngữ cảnh và tri thức"
file: 05-prompt-ngu-canh-tri-thuc.md
terms: 45
bible_version: "0.2"
version: "0.1"
updated: 2026-10-02
status: review
---

# Chương 5 — Prompt, ngữ cảnh và tri thức

Chương này giải thích cách người dùng giao việc cho một [mô hình](01-nen-tang.md#model) và cách doanh nghiệp đưa thông tin riêng vào mô hình. Người dùng viết [prompt](#prompt) để nêu yêu cầu. Ứng dụng thêm thông tin vào ngữ cảnh, ví dụ lịch sử trò chuyện, tài liệu, kết quả tìm kiếm. Doanh nghiệp dùng [RAG](#rag) để mô hình trả lời dựa trên tài liệu của doanh nghiệp.

Chương này cũng giải thích [bộ nhớ](#memory) của trợ lý AI và [đầu ra có cấu trúc](#structured-output). Sau khi đọc, người đọc phân biệt được 3 nơi chứa thông tin:

- Tham số của mô hình.
- Ngữ cảnh của một lần chạy.
- Kho dữ liệu bên ngoài.

Người đọc cũng biết vì sao một câu trả lời có trích nguồn vẫn có thể sai.

## 5.1 Prompt

<a id="prompt"></a>
### Prompt — Prompt

*Mã: prompt · Chương 5 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** câu lệnh, lời nhắc. Dạng chuẩn trong sách: prompt.

**Định nghĩa.** Prompt là một đầu vào gửi cho một [mô hình](01-nen-tang.md#model) [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai) để định hướng đầu ra. Prompt thường là văn bản, nhưng cũng có thể gồm hình ảnh, âm thanh hoặc tệp.

**Giải thích.** Một prompt có thể gồm các thành phần sau:

- Hướng dẫn: việc cần làm, ví dụ "Tóm tắt văn bản sau trong 3 câu".
- Ví dụ mẫu: một vài cặp đầu vào và đầu ra đúng.
- Dữ liệu đầu vào: văn bản, bảng hoặc hình ảnh cần xử lý.
- Yêu cầu về đầu ra: độ dài, giọng văn, định dạng.

Trong một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot), prompt mà mô hình nhận được dài hơn câu người dùng gõ. Ứng dụng ghép câu của người dùng với [system prompt](#system-prompt), lịch sử trò chuyện và tài liệu đính kèm. [LLM](04-llm-va-mo-hinh-sinh.md#llm) xử lý toàn bộ chuỗi [token](03-kien-truc-mo-hinh.md#token) này trong một lần chạy.

**Ví dụ.** Chị Lan làm kế toán tại Công ty An Bình. Chị Lan gửi ảnh một hóa đơn kèm prompt "Trả về tên người bán, ngày và tổng tiền.". Một [mô hình đa phương thức](04-llm-va-mo-hinh-sinh.md#multimodal-model) xử lý ảnh và hướng dẫn. Mô hình trả về 3 thông tin.

**Phân biệt.** Trong một prompt, hướng dẫn khác dữ liệu đầu vào. Hướng dẫn nêu việc cần làm. Dữ liệu đầu vào là nội dung cần xử lý. Mô hình không luôn tách đúng 2 loại này. Một câu lệnh nằm trong tài liệu đầu vào có thể làm mô hình đổi hành vi. Tên của kiểu tấn công này là [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection).

**Không nên hiểu là.** Prompt không phải mã lệnh mà mô hình chắc chắn làm theo. Cùng một prompt có thể cho các đầu ra khác nhau giữa 2 lần chạy. Kết quả cũng có thể khác giữa 2 [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version). Prompt cũng không phải [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning): prompt không đổi [tham số](01-nen-tang.md#parameter) của mô hình.

**Giới hạn.** Prompt chỉ tác động trong lần chạy nhận prompt đó. [Cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) giới hạn độ dài của prompt. Một prompt tốt tăng cơ hội có kết quả đúng, không bảo đảm kết quả đúng.

**Liên quan.** [system prompt](#system-prompt) · [kỹ thuật prompt](#prompt-engineering) · [kỹ thuật ngữ cảnh](#context-engineering) · [mẫu prompt](#prompt-template) · [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection)

**Nguồn.** [1] Schulhoff et al., "The Prompt Report: A Systematic Survey of Prompt Engineering Techniques", 2024 (bản v6, 2025), https://arxiv.org/abs/2406.06608, truy cập 2/10/2026 (S501). [2] Brown et al., "Language Models are Few-Shot Learners", 2020, https://arxiv.org/abs/2005.14165, truy cập 2/10/2026 (S502). [3] Wallace et al., "The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions", 2024, https://arxiv.org/abs/2404.13208, truy cập 2/10/2026 (S511).

<a id="system-prompt"></a>
### System prompt — System prompt

*Mã: system-prompt · Chương 5 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** lời nhắc hệ thống, system message, developer message. Dạng chuẩn trong sách: system prompt.

**Định nghĩa.** System prompt là một phần của [prompt](#prompt) chứa hướng dẫn chung cho cả cuộc trò chuyện. Nhà phát triển ứng dụng viết system prompt. Người dùng cuối thường không thấy system prompt.

**Giải thích.** Nhà phát triển dùng system prompt để đặt vai trò, giọng văn, phạm vi công việc và quy tắc trả lời. System prompt cũng có thể mô tả các công cụ mà [LLM](04-llm-va-mo-hinh-sinh.md#llm) được dùng. Ứng dụng gửi system prompt cùng mỗi lượt hỏi của người dùng. [API](11-trien-khai-san-pham-kinh-te.md#api) của một số LLM có một trường riêng cho system prompt.

Một số nhà phát triển [mô hình](01-nen-tang.md#model) [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training) LLM để ưu tiên system prompt. Khi system prompt mâu thuẫn với tin nhắn của người dùng, LLM được [huấn luyện](01-nen-tang.md#training) để làm theo system prompt. Thứ tự này là một phần của [thứ bậc hướng dẫn](#instruction-hierarchy).

**Ví dụ.** Công ty An Bình làm một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) trả lời khách hàng. System prompt ghi: "Bạn là trợ lý của Công ty An Bình. Chỉ trả lời câu hỏi về sản phẩm của công ty. Trả lời tối đa 5 câu.". Một khách hàng hỏi về giá vàng. Chatbot trả lời rằng câu hỏi này nằm ngoài phạm vi hỗ trợ.

**Phân biệt.** System prompt khác prompt của người dùng ở 3 điểm: người viết, phạm vi và mức ưu tiên. Prompt của người dùng là yêu cầu trong một lượt. System prompt áp dụng cho cả cuộc trò chuyện.

**Không nên hiểu là.** System prompt không phải cơ chế bảo mật. Người dùng có thể dùng [jailbreak](08-an-toan-va-alignment.md#jailbreak) hoặc [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection) để làm mô hình bỏ qua system prompt. Người dùng cũng có thể làm lộ nội dung system prompt. Rủi ro này vẫn có khi system prompt cấm nhắc lại nội dung. Tên của rủi ro này là [lộ prompt](09-bao-mat-rieng-tu-xac-thuc.md#prompt-leakage).

**Giới hạn.** Quy tắc trong system prompt không thay cho kiểm soát quyền trong phần mềm. Mô hình có thể không làm theo một quy tắc trong system prompt.

> **THẬN TRỌNG:** Không đặt mật khẩu, khóa API hoặc dữ liệu bí mật trong system prompt. Người dùng có thể dùng prompt để lấy ra các dữ liệu này.

**Liên quan.** [prompt](#prompt) · [thứ bậc hướng dẫn](#instruction-hierarchy) · [prompt đóng vai](#role-prompting) · [lộ prompt](09-bao-mat-rieng-tu-xac-thuc.md#prompt-leakage) · [guardrail](08-an-toan-va-alignment.md#guardrail)

**Nguồn.** [1] Wallace et al., "The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions", 2024, https://arxiv.org/abs/2404.13208, truy cập 2/10/2026 (S511). [2] Anthropic, "Prompting best practices" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, truy cập 2/10/2026 (S503). [3] OpenAI, "Prompt engineering" (OpenAI API Docs), https://developers.openai.com/api/docs/guides/prompt-engineering, truy cập 2/10/2026 (S505).

<a id="prompt-template"></a>
### Prompt template — Mẫu prompt

*Mã: prompt-template · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** prompt template, khuôn prompt. Dạng chuẩn trong sách: mẫu prompt.

**Định nghĩa.** Mẫu prompt là một [prompt](#prompt) có các chỗ trống. Ứng dụng điền dữ liệu vào chỗ trống để tạo một prompt cụ thể cho mỗi lần gọi [mô hình](01-nen-tang.md#model).

**Giải thích.** Mẫu prompt giữ phần cố định của prompt, ví dụ hướng dẫn, định dạng đầu ra, ví dụ mẫu. Các chỗ trống là biến, ví dụ {tên khách hàng} hoặc {nội dung thư}. Doanh nghiệp dùng mẫu prompt để các lần gọi mô hình có cùng cấu trúc. Cấu trúc giống nhau giúp so sánh kết quả giữa các lần gọi.

**Ví dụ.** Ví dụ giả định: Công ty An Bình có mẫu prompt "Xếp thư sau vào nhóm khiếu nại, hỏi giá hoặc khác. Thư: {nội dung thư}". Mỗi ngày, ứng dụng điền 500 thư vào mẫu này. Ứng dụng gửi 500 prompt cho mô hình.

**Phân biệt.** Mẫu prompt khác [thư viện prompt](#prompt-library). Mẫu prompt là một prompt có biến. Thư viện prompt là nơi lưu nhiều prompt và mẫu prompt để dùng lại.

**Liên quan.** [prompt](#prompt) · [thư viện prompt](#prompt-library) · [chuỗi prompt](#prompt-chaining)

**Nguồn.** [1] Schulhoff et al., "The Prompt Report: A Systematic Survey of Prompt Engineering Techniques", 2024 (bản v6, 2025), https://arxiv.org/abs/2406.06608, truy cập 2/10/2026 (S501).

<a id="instruction-hierarchy"></a>
### Instruction hierarchy — Thứ bậc hướng dẫn

*Mã: instruction-hierarchy · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** chain of command. Dạng chuẩn trong sách: thứ bậc hướng dẫn.

**Định nghĩa.** Thứ bậc hướng dẫn là một thứ tự ưu tiên giữa các nguồn hướng dẫn trong đầu vào của một [LLM](04-llm-va-mo-hinh-sinh.md#llm). Khi 2 hướng dẫn mâu thuẫn, LLM được [huấn luyện](01-nen-tang.md#training) để làm theo nguồn có mức ưu tiên cao hơn.

**Giải thích.** Một thứ bậc hay gặp có 3 mức:

- [System prompt](#system-prompt) của nhà phát triển ứng dụng có mức cao nhất.
- Tin nhắn của người dùng có mức thứ hai.
- Nội dung từ bên thứ ba có mức thấp nhất, ví dụ kết quả công cụ, trang web, tệp đính kèm.

Một số nhà phát triển [mô hình](01-nen-tang.md#model) xếp nội dung bên thứ ba là dữ liệu. Nội dung này không có quyền ra lệnh. Ở một số mô hình, quy tắc của nhà phát triển mô hình có mức cao hơn system prompt. Nhà phát triển dạy thứ bậc này cho LLM trong [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training).

**Phân biệt.** Thứ bậc hướng dẫn là hành vi mà LLM học được. Kiểm soát quyền là cấu hình của phần mềm. Một LLM đã học thứ bậc hướng dẫn vẫn có thể làm theo một lệnh trong dữ liệu đầu vào. Ứng dụng vẫn cần giới hạn quyền của công cụ theo nguyên tắc [quyền tối thiểu](09-bao-mat-rieng-tu-xac-thuc.md#least-privilege).

**Liên quan.** [system prompt](#system-prompt) · [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection) · [quyền tối thiểu](09-bao-mat-rieng-tu-xac-thuc.md#least-privilege)

**Nguồn.** [1] Wallace et al., "The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions", 2024, https://arxiv.org/abs/2404.13208, truy cập 2/10/2026 (S511). [2] OpenAI, "Model Spec" (bản 2026-08-18), https://model-spec.openai.com/2026-08-18.html, truy cập 2/10/2026 (S512).

<a id="delimiter"></a>
### Delimiter — Ký hiệu phân cách

*Mã: delimiter · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Ký hiệu phân cách là một chuỗi ký tự đánh dấu ranh giới giữa các phần của một [prompt](#prompt). Ví dụ: thẻ XML, tiêu đề Markdown, dấu ngoặc kép. Ký hiệu phân cách giúp tách hướng dẫn khỏi dữ liệu đầu vào.

**Phân biệt.** Ký hiệu phân cách giảm nhầm lẫn giữa hướng dẫn và dữ liệu, nhưng không chặn được hết [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection).

**Liên quan.** [prompt](#prompt) · [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection)

<a id="prompt-library"></a>
### Prompt library — Thư viện prompt

*Mã: prompt-library · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Thư viện prompt là một bộ sưu tập các [prompt](#prompt) và [mẫu prompt](#prompt-template) đã thử. Một nhóm hoặc một tổ chức lưu thư viện này để dùng lại. Thư viện prompt có thể ghi mục đích, phiên bản và người phụ trách của mỗi prompt.

**Phân biệt.** Thư viện prompt là nơi lưu trữ, không bảo đảm prompt vẫn tốt sau khi đổi [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version).

**Liên quan.** [mẫu prompt](#prompt-template) · [kiểm thử hồi quy](07-danh-gia-va-chat-luong.md#regression-test)

<a id="negative-prompt"></a>
### Negative prompt — Prompt phủ định

*Mã: negative-prompt · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Prompt phủ định là một [prompt](#prompt) phụ nêu các nội dung không muốn có trong ảnh đầu ra. Người dùng gửi prompt phủ định cho một [mô hình tạo ảnh từ văn bản](04-llm-va-mo-hinh-sinh.md#text-to-image-model), ví dụ "chữ, hình mờ, ngón tay thừa".

**Phân biệt.** Prompt phủ định là một trường đầu vào riêng, khác một câu "không làm X" trong prompt cho [LLM](04-llm-va-mo-hinh-sinh.md#llm).

**Liên quan.** [prompt](#prompt) · [mô hình khuếch tán](03-kien-truc-mo-hinh.md#diffusion-model)

## 5.2 Kỹ thuật prompt

<a id="prompt-engineering"></a>
### Prompt engineering — Kỹ thuật prompt

*Mã: prompt-engineering · Chương 5 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** prompt engineering, thiết kế prompt. Dạng chuẩn trong sách: kỹ thuật prompt.

**Định nghĩa.** Kỹ thuật prompt là một quy trình lặp lại để viết, thử và sửa [prompt](#prompt). Mục tiêu là đầu ra của [mô hình](01-nen-tang.md#model) đạt yêu cầu của một nhiệm vụ.

**Giải thích.** Kỹ thuật prompt có 3 bước lặp lại:

- Chạy prompt trên một bộ đầu vào mẫu.
- Kiểm tra đầu ra theo tiêu chí đặt trước.
- Sửa prompt, rồi chạy lại.

Một số cách sửa prompt:

- Viết hướng dẫn cụ thể hơn.
- Thêm ví dụ mẫu, xem [zero-shot](#zero-shot).
- Tách tài liệu khỏi hướng dẫn bằng [ký hiệu phân cách](#delimiter).
- Chia việc lớn thành [chuỗi prompt](#prompt-chaining).

Một prompt tốt với một [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version) có thể kém hơn với phiên bản khác. Doanh nghiệp lưu bộ đầu vào mẫu để chạy [kiểm thử hồi quy](07-danh-gia-va-chat-luong.md#regression-test) khi đổi mô hình.

**Ví dụ.** Ví dụ giả định: chị Lan cần mô hình tóm tắt hợp đồng thuê nhà. Với prompt "Tóm tắt hợp đồng", kết quả bỏ sót tiền đặt cọc ở 3 trong 10 hợp đồng thử. Chị Lan thêm danh sách 6 điều khoản phải nêu. Chị Lan chạy lại 10 hợp đồng và kiểm tra từng bản tóm tắt.

**Phân biệt.** Kỹ thuật prompt khác [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning). Kỹ thuật prompt đổi đầu vào. Tinh chỉnh đổi [tham số](01-nen-tang.md#parameter) của mô hình. Kỹ thuật prompt cũng khác [kỹ thuật ngữ cảnh](#context-engineering). Kỹ thuật ngữ cảnh chọn toàn bộ thông tin đưa vào mô hình ở mỗi lần chạy.

**Không nên hiểu là.** Kỹ thuật prompt không phải một bộ câu mẫu cố định dùng được cho các mô hình. Một câu hướng dẫn có ích với mô hình này có thể vô ích với mô hình khác. Người viết prompt cần kiểm tra kết quả trên dữ liệu thật của nhiệm vụ.

**Giới hạn.** Viết lại hướng dẫn không bù được kiến thức mà mô hình còn thiếu. Ví dụ: sự kiện sau [ngày giới hạn kiến thức](04-llm-va-mo-hinh-sinh.md#knowledge-cutoff). Khi thiếu kiến thức, ứng dụng cần đưa tài liệu vào ngữ cảnh, ví dụ bằng [RAG](#rag).

**Liên quan.** [prompt](#prompt) · [kỹ thuật ngữ cảnh](#context-engineering) · [zero-shot](#zero-shot) · [prompt chuỗi suy nghĩ](#chain-of-thought-prompting) · [kiểm thử hồi quy](07-danh-gia-va-chat-luong.md#regression-test)

**Nguồn.** [1] Schulhoff et al., "The Prompt Report: A Systematic Survey of Prompt Engineering Techniques", 2024 (bản v6, 2025), https://arxiv.org/abs/2406.06608, truy cập 2/10/2026 (S501). [2] OpenAI, "Prompt engineering" (OpenAI API Docs), https://developers.openai.com/api/docs/guides/prompt-engineering, truy cập 2/10/2026 (S505). [3] Anthropic, "Prompt engineering overview" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview, truy cập 2/10/2026 (S504).

<a id="zero-shot"></a>
### Zero-shot prompting — Prompt không ví dụ

*Mã: zero-shot · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** prompt không ví dụ. So sánh với few-shot prompting (prompt có vài ví dụ). Dạng chuẩn trong sách: zero-shot.

**Định nghĩa.** Zero-shot là một kiểu [prompt](#prompt) chỉ có hướng dẫn và dữ liệu đầu vào. Prompt này không có ví dụ mẫu về nhiệm vụ.

**Giải thích.** Với zero-shot, [mô hình](01-nen-tang.md#model) làm nhiệm vụ dựa trên các mẫu đã học trong [huấn luyện](01-nen-tang.md#training). Prompt zero-shot ngắn, dễ viết và tốn ít [token](03-kien-truc-mo-hinh.md#token). Khi đầu ra chưa đúng định dạng hoặc giọng văn, người viết có thể thêm ví dụ mẫu. Khi đó prompt trở thành few-shot.

**Ví dụ.** Prompt zero-shot: "Dịch câu sau sang tiếng Anh: Hợp đồng có hiệu lực từ ngày ký.". Prompt few-shot thêm 3 cặp câu Việt và Anh mẫu theo văn phong của công ty. Sau 3 cặp câu này, prompt mới đưa câu cần dịch.

**Phân biệt.** Few-shot là kiểu prompt có một vài cặp đầu vào và đầu ra mẫu. Cả zero-shot và few-shot đều không đổi [tham số](01-nen-tang.md#parameter) của mô hình. Khả năng làm theo ví dụ trong prompt có tên [học trong ngữ cảnh](04-llm-va-mo-hinh-sinh.md#in-context-learning). "Shot" ở đây là một ví dụ trong prompt, không phải một lần huấn luyện.

**Liên quan.** [học trong ngữ cảnh](04-llm-va-mo-hinh-sinh.md#in-context-learning) · [prompt chuỗi suy nghĩ](#chain-of-thought-prompting) · [kỹ thuật prompt](#prompt-engineering)

**Nguồn.** [1] Brown et al., "Language Models are Few-Shot Learners", 2020, https://arxiv.org/abs/2005.14165, truy cập 2/10/2026 (S502). [2] Schulhoff et al., "The Prompt Report: A Systematic Survey of Prompt Engineering Techniques", 2024 (bản v6, 2025), https://arxiv.org/abs/2406.06608, truy cập 2/10/2026 (S501).

<a id="chain-of-thought-prompting"></a>
### Chain-of-thought prompting — Prompt chuỗi suy nghĩ

*Mã: chain-of-thought-prompting · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** CoT prompting. Dạng chuẩn trong sách: prompt chuỗi suy nghĩ.

**Định nghĩa.** Prompt chuỗi suy nghĩ là một kỹ thuật [prompt](#prompt) yêu cầu [mô hình](01-nen-tang.md#model) viết các bước trung gian. Mô hình viết các bước này trước câu trả lời cuối.

**Giải thích.** Kỹ thuật này có 2 dạng chính:

- Dạng few-shot: mỗi ví dụ mẫu trong prompt ghi cả các bước giải.
- Dạng [zero-shot](#zero-shot): prompt thêm một câu như "Hãy giải từng bước".

Năm 2022, 2 nghiên cứu thử kỹ thuật này trên các [LLM](04-llm-va-mo-hinh-sinh.md#llm) lớn. Kỹ thuật này tăng tỷ lệ trả lời đúng ở bài toán số học và bài suy luận nhiều bước. Tính đến tháng 10/2026, các [mô hình suy luận](04-llm-va-mo-hinh-sinh.md#reasoning-model) tự tạo các bước trung gian mà không cần câu yêu cầu này.

**Phân biệt.** Prompt chuỗi suy nghĩ là một kiểu prompt. [Chuỗi suy nghĩ](04-llm-va-mo-hinh-sinh.md#chain-of-thought) là văn bản trung gian do LLM tạo ra.

**Không nên hiểu là.** Các bước được viết ra không chắc là quá trình tính toán thật bên trong LLM. Các bước trông hợp lý vẫn có thể dẫn tới đáp án sai.

**Liên quan.** [chuỗi suy nghĩ](04-llm-va-mo-hinh-sinh.md#chain-of-thought) · [self-consistency](#self-consistency) · [cây suy nghĩ](#tree-of-thoughts) · [mô hình suy luận](04-llm-va-mo-hinh-sinh.md#reasoning-model)

**Nguồn.** [1] Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", 2022, https://arxiv.org/abs/2201.11903, truy cập 2/10/2026 (S514). [2] Kojima et al., "Large Language Models are Zero-Shot Reasoners", 2022, https://arxiv.org/abs/2205.11916, truy cập 2/10/2026 (S515). [3] Anthropic, "Prompting best practices" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, truy cập 2/10/2026 (S503).

<a id="role-prompting"></a>
### Role prompting — Prompt đóng vai

*Mã: role-prompting · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** persona prompting, persona. Dạng chuẩn trong sách: prompt đóng vai.

**Định nghĩa.** Prompt đóng vai là một kỹ thuật [prompt](#prompt) giao cho [mô hình](01-nen-tang.md#model) một vai. Ví dụ: "Bạn là luật sư về đất đai" hoặc "Bạn là biên tập viên".

**Giải thích.** Vai thường nằm trong [system prompt](#system-prompt). Vai giúp đặt giọng văn, mức chi tiết và cách trình bày của câu trả lời. Một nghiên cứu năm 2023 thử 162 vai trên 2.410 câu hỏi kiến thức. Nghiên cứu này không thấy vai trong system prompt làm tăng tỷ lệ trả lời đúng.

**Ví dụ.** Anh Minh viết: "Bạn là luật sư Việt Nam. Giải thích điều khoản đặt cọc này cho người không học luật.". Mô hình trả lời với giọng tư vấn và từ ngữ đơn giản. Câu trả lời này không có giá trị của ý kiến pháp lý từ một luật sư thật.

**Phân biệt.** Prompt đóng vai đổi cách trình bày, không cho mô hình năng lực hoặc thẩm quyền thật. Vai "bác sĩ" không cho mô hình chứng chỉ hành nghề. Vai "quản trị viên" không cho mô hình quyền truy cập hệ thống. Cấu hình phần mềm quyết định quyền truy cập. Một vai do người dùng đặt cũng không vượt qua quy tắc ở mức cao hơn của [thứ bậc hướng dẫn](#instruction-hierarchy).

> **CẢNH BÁO:** Không dùng câu trả lời theo vai chuyên gia thay cho ý kiến của chuyên gia thật. Câu trả lời có thể sai, và không có người chịu trách nhiệm nghề nghiệp.

**Liên quan.** [system prompt](#system-prompt) · [thứ bậc hướng dẫn](#instruction-hierarchy) · [trách nhiệm nghề nghiệp khi dùng AI](10-phap-ly-quan-tri-chinh-sach.md#professional-responsibility)

**Nguồn.** [1] Zheng et al., "When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models", 2023 (Findings of EMNLP 2024), https://arxiv.org/abs/2311.10054, truy cập 2/10/2026 (S513). [2] Schulhoff et al., "The Prompt Report: A Systematic Survey of Prompt Engineering Techniques", 2024 (bản v6, 2025), https://arxiv.org/abs/2406.06608, truy cập 2/10/2026 (S501).

<a id="prompt-chaining"></a>
### Prompt chaining — Chuỗi prompt

*Mã: prompt-chaining · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Chuỗi prompt là một phương pháp chia một nhiệm vụ thành nhiều bước cố định. Mỗi bước là một lần gọi [mô hình](01-nen-tang.md#model) với một [prompt](#prompt) riêng. Đầu ra của bước trước là đầu vào của bước sau.

**Phân biệt.** Trong chuỗi prompt, người thiết kế định trước các bước, còn trong một [agent](06-agent-va-tu-dong-hoa.md#ai-agent), mô hình tự chọn bước tiếp theo.

**Liên quan.** [mẫu prompt](#prompt-template) · [agent](06-agent-va-tu-dong-hoa.md#ai-agent)

<a id="self-consistency"></a>
### Self-consistency — Tự nhất quán

*Mã: self-consistency · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Self-consistency là một kỹ thuật chạy cùng một [prompt chuỗi suy nghĩ](#chain-of-thought-prompting) nhiều lần với [lấy mẫu](04-llm-va-mo-hinh-sinh.md#sampling) ngẫu nhiên. Kết quả cuối là câu trả lời xuất hiện nhiều lần nhất.

**Phân biệt.** Self-consistency là [bỏ phiếu đa số](07-danh-gia-va-chat-luong.md#majority-vote) giữa các lần chạy của cùng một [mô hình](01-nen-tang.md#model), không phải kiểm tra độc lập.

**Liên quan.** [prompt chuỗi suy nghĩ](#chain-of-thought-prompting) · [bỏ phiếu đa số](07-danh-gia-va-chat-luong.md#majority-vote)

<a id="tree-of-thoughts"></a>
### Tree of thoughts — Cây suy nghĩ

*Mã: tree-of-thoughts · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** Tree of Thoughts (ToT). Dạng chuẩn trong sách: cây suy nghĩ.

**Định nghĩa.** Cây suy nghĩ là một kỹ thuật cho [LLM](04-llm-va-mo-hinh-sinh.md#llm) tạo nhiều bước giải ở mỗi giai đoạn và tự chấm từng bước. LLM đi tiếp hoặc quay lại theo một [thuật toán](01-nen-tang.md#algorithm) tìm kiếm.

**Phân biệt.** Cây suy nghĩ thử nhiều nhánh, khác [prompt chuỗi suy nghĩ](#chain-of-thought-prompting) chỉ đi theo một chuỗi bước.

**Liên quan.** [prompt chuỗi suy nghĩ](#chain-of-thought-prompting) · [self-consistency](#self-consistency)

<a id="react-pattern"></a>
### ReAct pattern (ReAct) — Mẫu ReAct

*Mã: react-pattern · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** ReAct (reasoning and acting). Dạng chuẩn trong sách: ReAct.

**Định nghĩa.** ReAct là một kỹ thuật trong đó [LLM](04-llm-va-mo-hinh-sinh.md#llm) xen kẽ bước suy luận bằng văn bản với bước hành động. Một hành động có thể là [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use) tìm kiếm. Kết quả của hành động quay lại đầu vào của LLM.

**Phân biệt.** ReAct mô tả thứ tự đầu ra của LLM, còn [vòng lặp agent](06-agent-va-tu-dong-hoa.md#agent-loop) là phần mềm chạy công cụ thật.

**Liên quan.** [vòng lặp agent](06-agent-va-tu-dong-hoa.md#agent-loop) · [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use)

<a id="reflection"></a>
### Reflection — Tự rà soát

*Mã: reflection · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** reflection, self-reflection, self-critique. Dạng chuẩn trong sách: tự rà soát.

**Định nghĩa.** Tự rà soát là một kỹ thuật cho [LLM](04-llm-va-mo-hinh-sinh.md#llm) đọc lại đầu ra của chính LLM đó và viết nhận xét về lỗi. LLM dùng nhận xét này để làm lại. Kỹ thuật này không đổi [trọng số](01-nen-tang.md#weight) của LLM.

**Phân biệt.** Tự rà soát khác kiểm tra độc lập: khi không có phản hồi bên ngoài, LLM có thể sửa câu đúng thành câu sai.

**Liên quan.** [ReAct](#react-pattern) · [bộ kiểm chứng](06-agent-va-tu-dong-hoa.md#verifier)

<a id="meta-prompting"></a>
### Meta-prompting — Meta-prompting

*Mã: meta-prompting · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Meta-prompting là một kỹ thuật dùng [LLM](04-llm-va-mo-hinh-sinh.md#llm) để viết hoặc sửa một [prompt](#prompt). Tên này còn chỉ một kỹ thuật khác: một LLM chia nhiệm vụ cho nhiều lượt gọi chính LLM đó, rồi ghép kết quả.

**Phân biệt.** Prompt do LLM viết vẫn cần thử trên dữ liệu thật, theo quy trình [kỹ thuật prompt](#prompt-engineering).

**Liên quan.** [kỹ thuật prompt](#prompt-engineering) · [prompt](#prompt)

## 5.3 Ngữ cảnh và bộ nhớ

<a id="context-engineering"></a>
### Context engineering — Kỹ thuật ngữ cảnh

*Mã: context-engineering · Chương 5 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** context engineering, quản lý ngữ cảnh. Dạng chuẩn trong sách: kỹ thuật ngữ cảnh.

**Định nghĩa.** Kỹ thuật ngữ cảnh là một quy trình chọn, sắp xếp và cập nhật thông tin đưa vào [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) của một [LLM](04-llm-va-mo-hinh-sinh.md#llm). Mục tiêu là lượng thông tin nhỏ nhất đủ để LLM làm đúng nhiệm vụ.

**Giải thích.** Ngữ cảnh là toàn bộ [token](03-kien-truc-mo-hinh.md#token) mà LLM xử lý trong một lần chạy. Ngữ cảnh có thể gồm:

- [System prompt](#system-prompt) và hướng dẫn.
- Lịch sử trò chuyện.
- Tài liệu lấy về bằng [RAG](#rag).
- Mô tả công cụ và kết quả [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use).
- Thông tin lấy từ [bộ nhớ](#memory).

Với một [agent](06-agent-va-tu-dong-hoa.md#ai-agent), mỗi lượt chạy thêm token vào ngữ cảnh. Một số cách giữ ngữ cảnh gọn:

- Tóm tắt các lượt cũ bằng [nén ngữ cảnh](#context-compaction).
- Xóa kết quả công cụ đã dùng xong.
- Ghi chú ra một tệp bên ngoài, rồi đọc lại khi cần.
- Tải tài liệu khi cần, thay vì tải hết từ đầu.

**Ví dụ.** Ví dụ giả định: Công ty An Bình có một agent trả lời câu hỏi về 2.000 hợp đồng. Agent không đưa cả 2.000 hợp đồng vào ngữ cảnh. Agent giữ danh sách tên tệp và tìm các hợp đồng liên quan. Agent chỉ đọc các điều khoản cần cho câu hỏi.

**Phân biệt.** [Kỹ thuật prompt](#prompt-engineering) tập trung vào câu chữ của hướng dẫn. Kỹ thuật ngữ cảnh quản lý toàn bộ nội dung trong ngữ cảnh ở mỗi lượt.

Ngữ cảnh cũng khác bộ nhớ và khác kiến thức trong [tham số](01-nen-tang.md#parameter). Ngữ cảnh chỉ tồn tại trong một lần chạy. Bộ nhớ là dữ liệu lưu ngoài [mô hình](01-nen-tang.md#model) để đưa lại vào ngữ cảnh sau. Kiến thức trong tham số có từ [huấn luyện](01-nen-tang.md#training) và không đổi khi mô hình chạy.

**Không nên hiểu là.** Kỹ thuật ngữ cảnh không có nghĩa là đưa càng nhiều thông tin càng tốt. Thêm token có thể làm kết quả kém đi. Tên của hiện tượng này là [context rot](#context-rot).

**Giới hạn.** Kỹ thuật ngữ cảnh không sửa được lỗi trong dữ liệu nguồn. Nội dung sai trong tài liệu lấy về vẫn có thể đi vào câu trả lời.

**Thay đổi gần đây.** Tháng 9/2025, một nhà phát triển mô hình công bố hướng dẫn về kỹ thuật ngữ cảnh. Hướng dẫn này coi kỹ thuật ngữ cảnh là bước tiếp theo của việc viết [prompt](#prompt). Tính đến tháng 10/2026, [API](11-trien-khai-san-pham-kinh-te.md#api) của một số nhà phát triển mô hình có tính năng nén ngữ cảnh.

**Liên quan.** [kỹ thuật prompt](#prompt-engineering) · [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) · [context rot](#context-rot) · [nén ngữ cảnh](#context-compaction) · [bộ nhớ](#memory) · [agent](06-agent-va-tu-dong-hoa.md#ai-agent)

**Nguồn.** [1] Anthropic (Rajasekaran et al.), "Effective context engineering for AI agents", 2025, https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, truy cập 2/10/2026 (S506). [2] Hong, Troynikov, Huber (Chroma), "Context Rot: How Increasing Input Tokens Impacts LLM Performance", 2025, https://www.trychroma.com/research/context-rot, truy cập 2/10/2026 (S507). [3] Anthropic, "Compaction overview" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/compaction, truy cập 2/10/2026 (S510).

<a id="long-context"></a>
### Long context — Ngữ cảnh dài

*Mã: long-context · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** long-context prompting. Dạng chuẩn trong sách: ngữ cảnh dài.

**Định nghĩa.** Ngữ cảnh dài là cách đưa trực tiếp một lượng lớn văn bản vào [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) của [LLM](04-llm-va-mo-hinh-sinh.md#llm) trong một lần chạy. Văn bản này có thể là cả một bộ hồ sơ.

**Giải thích.** Ngữ cảnh dài không cần bước truy xuất. LLM xử lý toàn bộ tài liệu, gồm cả các phần mà bước truy xuất có thể bỏ sót. Đổi lại, mỗi lần chạy tốn nhiều [token đầu vào](04-llm-va-mo-hinh-sinh.md#input-token) hơn. Mỗi lần chạy cũng có [độ trễ](11-trien-khai-san-pham-kinh-te.md#latency) cao hơn. [Prompt caching](#prompt-caching) có thể giảm chi phí khi nhiều câu hỏi dùng chung một bộ tài liệu.

**Phân biệt.** Ngữ cảnh dài và [RAG](#rag) là 2 cách đưa tài liệu vào [mô hình](01-nen-tang.md#model). RAG chọn một phần tài liệu trước khi gọi mô hình. Ngữ cảnh dài đưa cả bộ tài liệu vào. Một nghiên cứu năm 2024 thấy ngữ cảnh dài cho kết quả trung bình tốt hơn khi có đủ tài nguyên tính toán. Nghiên cứu này cũng thấy RAG rẻ hơn nhiều và đề xuất kết hợp 2 cách.

**Không nên hiểu là.** Cửa sổ ngữ cảnh chứa được tài liệu không có nghĩa là LLM dùng tốt các phần của tài liệu. Xem [lost in the middle](#lost-in-the-middle) và [context rot](#context-rot).

**Liên quan.** [RAG](#rag) · [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) · [context rot](#context-rot) · [prompt caching](#prompt-caching)

**Nguồn.** [1] Li et al., "Retrieval Augmented Generation or Long-Context LLMs? A Comprehensive Study and Hybrid Approach", 2024 (EMNLP 2024 Industry Track), https://arxiv.org/abs/2407.16833, truy cập 2/10/2026 (S533). [2] Anthropic, "Introducing Contextual Retrieval", 2024, https://www.anthropic.com/engineering/contextual-retrieval, truy cập 2/10/2026 (S525).

<a id="context-rot"></a>
### Context rot — Suy giảm ngữ cảnh

*Mã: context-rot · Chương 5 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** suy giảm ngữ cảnh. Dạng chuẩn trong sách: context rot.

**Định nghĩa.** Context rot là một hiện tượng trong đó chất lượng đầu ra của [LLM](04-llm-va-mo-hinh-sinh.md#llm) giảm khi số [token](03-kien-truc-mo-hinh.md#token) trong ngữ cảnh tăng. Hiện tượng này xảy ra kể cả khi nhiệm vụ không khó hơn.

**Giải thích.** Các nhà nghiên cứu đo hiện tượng này bằng nhiệm vụ đơn giản, ví dụ tìm một câu trong văn bản dài. Kết quả kém đi khi văn bản dài thêm, và mức giảm không đều. Mức giảm lớn hơn khi văn bản có đoạn gây nhiễu gần giống thông tin cần tìm. Mức giảm cũng lớn hơn khi câu hỏi diễn đạt khác thông tin cần tìm. Tên context rot chưa có định nghĩa chính thức. Báo cáo đặt tên này chỉ dùng tên để mô tả kết quả đo.

**Phân biệt.** Context rot khác [lost in the middle](#lost-in-the-middle). Lost in the middle nói về vị trí của thông tin trong ngữ cảnh. Context rot nói về độ dài của ngữ cảnh. Cả 2 hiện tượng cho thấy sức chứa của [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) khác hiệu quả dùng ngữ cảnh.

**Thay đổi gần đây.** Tháng 7/2025, một báo cáo kỹ thuật thử 18 LLM và dùng tên context rot cho hiện tượng này. Tính đến tháng 10/2026, tài liệu kỹ thuật của ít nhất một nhà phát triển [mô hình](01-nen-tang.md#model) dùng tên này.

**Liên quan.** [lost in the middle](#lost-in-the-middle) · [kỹ thuật ngữ cảnh](#context-engineering) · [ngữ cảnh dài](#long-context) · [đánh giá ngữ cảnh dài](07-danh-gia-va-chat-luong.md#long-context-evaluation)

**Nguồn.** [1] Hong, Troynikov, Huber (Chroma), "Context Rot: How Increasing Input Tokens Impacts LLM Performance", 2025, https://www.trychroma.com/research/context-rot, truy cập 2/10/2026 (S507). [2] Anthropic, "Context windows" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/context-windows, truy cập 2/10/2026 (S509).

<a id="memory"></a>
### Memory — Bộ nhớ của trợ lý AI

*Mã: memory · Chương 5 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** memory, tính năng ghi nhớ. Dạng chuẩn trong sách: bộ nhớ.

**Định nghĩa.** Bộ nhớ của trợ lý AI là một tính năng của ứng dụng lưu thông tin về người dùng ra ngoài [mô hình](01-nen-tang.md#model). Ứng dụng đưa thông tin này vào ngữ cảnh ở các cuộc trò chuyện sau.

**Giải thích.** Bộ nhớ nằm trong kho dữ liệu của bên cung cấp ứng dụng, không nằm trong [tham số](01-nen-tang.md#parameter) của mô hình. Tính đến tháng 10/2026, một số [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) cho người dùng xem, sửa, xóa hoặc tắt bộ nhớ. Ở một số chatbot, xóa một cuộc trò chuyện không xóa thông tin bộ nhớ lấy từ cuộc trò chuyện đó.

**Phân biệt.** Từ "bộ nhớ" trong AI chỉ nhiều thứ:

- Bộ nhớ của trợ lý AI: dữ liệu giữa các cuộc trò chuyện.
- Kiến thức trong tham số: có từ [huấn luyện](01-nen-tang.md#training).
- [KV cache](03-kien-truc-mo-hinh.md#kv-cache): dữ liệu tạm của một lần chạy.
- [Bộ nhớ của agent](06-agent-va-tu-dong-hoa.md#agent-memory): trạng thái của một nhiệm vụ.

Ngữ cảnh là nội dung mô hình xử lý trong một lần chạy.

**Không nên hiểu là.** Bộ nhớ không có nghĩa là mô hình học từ cuộc trò chuyện. Trong một phiên, mô hình không tự cập nhật tham số. Dữ liệu trò chuyện chỉ đổi mô hình khi nhà phát triển dùng dữ liệu đó để huấn luyện. Chính sách [lưu giữ dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-retention) quyết định thời hạn lưu.

**Thay đổi gần đây.** Năm 2024, một số chatbot thêm tính năng bộ nhớ. Năm 2025, một số chatbot mở rộng bộ nhớ sang lịch sử trò chuyện cũ và tách bộ nhớ theo dự án.

**Liên quan.** [bộ nhớ lâu dài](#persistent-memory) · [bộ nhớ của agent](06-agent-va-tu-dong-hoa.md#agent-memory) · [lưu giữ dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-retention) · [dữ liệu cá nhân trong hệ thống AI](09-bao-mat-rieng-tu-xac-thuc.md#personal-data-ai)

**Nguồn.** [1] OpenAI, "Memory and new controls for ChatGPT", 2024 (cập nhật 2025), https://openai.com/index/memory-and-new-controls-for-chatgpt/, truy cập 2/10/2026 (S539). [2] Anthropic, "Use Claude's chat search and memory to build on previous context" (Claude Help Center), https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context, truy cập 2/10/2026 (S540).

<a id="prompt-caching"></a>
### Prompt caching — Lưu đệm prompt

*Mã: prompt-caching · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** lưu đệm prompt, bộ đệm prompt. Dạng chuẩn trong sách: prompt caching.

**Định nghĩa.** Prompt caching là một kỹ thuật lưu tạm kết quả tính toán của phần đầu một [prompt](#prompt). Các lần gọi [mô hình](01-nen-tang.md#model) sau có cùng phần đầu dùng lại kết quả này.

**Giải thích.** Nhiều ứng dụng gửi cùng một phần đầu ở mỗi lần gọi, ví dụ [system prompt](#system-prompt) dài hoặc bộ tài liệu. Lần gọi sau chỉ dùng được bộ đệm khi phần đầu giống hệt. Prompt caching giảm chi phí và thời gian xử lý. Prompt caching không đổi nội dung đầu ra. Tính đến tháng 10/2026, tài liệu của 2 nhà phát triển mô hình ghi thời gian lưu từ vài phút đến 24 giờ. Bộ đệm không dùng chung giữa các tổ chức khách hàng.

**Cách dùng.**

1. Đặt phần cố định ở đầu prompt và phần thay đổi ở cuối prompt.
2. Bật bộ đệm theo tài liệu [API](11-trien-khai-san-pham-kinh-te.md#api) của mô hình.
3. Kiểm tra số [token](03-kien-truc-mo-hinh.md#token) đọc từ bộ đệm trong báo cáo của API.

**Phân biệt.** Prompt caching khác [KV cache](03-kien-truc-mo-hinh.md#kv-cache) trong một lần chạy. Prompt caching cũng khác [bộ nhớ](#memory) của trợ lý AI. Prompt caching không đưa thông tin cũ vào cuộc trò chuyện mới.

**Liên quan.** [KV cache](03-kien-truc-mo-hinh.md#kv-cache) · [giá theo token](11-trien-khai-san-pham-kinh-te.md#token-pricing) · [ngữ cảnh dài](#long-context)

**Nguồn.** [1] Anthropic, "Prompt caching" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/prompt-caching, truy cập 2/10/2026 (S534). [2] OpenAI, "Prompt caching" (OpenAI API Docs), https://developers.openai.com/api/docs/guides/prompt-caching, truy cập 2/10/2026 (S535).

<a id="lost-in-the-middle"></a>
### Lost in the middle — Thất lạc ở giữa

*Mã: lost-in-the-middle · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** thất lạc ở giữa. Dạng chuẩn trong sách: lost in the middle.

**Định nghĩa.** Lost in the middle là một hiện tượng trong đó [LLM](04-llm-va-mo-hinh-sinh.md#llm) dùng thông tin ở đầu hoặc cuối ngữ cảnh tốt hơn thông tin ở giữa. Một nghiên cứu năm 2023 ghi nhận kết quả theo vị trí có dạng chữ U.

**Phân biệt.** Lost in the middle nói về vị trí của thông tin, còn [context rot](#context-rot) nói về độ dài của ngữ cảnh.

**Liên quan.** [context rot](#context-rot) · [ngữ cảnh dài](#long-context)

<a id="token-budget"></a>
### Token budget — Ngân sách token

*Mã: token-budget · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Ngân sách token là một giới hạn số [token](03-kien-truc-mo-hinh.md#token) mà ứng dụng dành cho một phần việc. Ví dụ: tài liệu lấy về, lịch sử trò chuyện, đầu ra. Ngân sách token giữ tổng số token trong [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window).

**Phân biệt.** Ngân sách token khác [ngân sách suy nghĩ](04-llm-va-mo-hinh-sinh.md#thinking-budget) của [mô hình suy luận](04-llm-va-mo-hinh-sinh.md#reasoning-model).

**Liên quan.** [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) · [số token đầu ra tối đa](04-llm-va-mo-hinh-sinh.md#max-output-tokens)

<a id="truncation"></a>
### Truncation — Cắt bớt ngữ cảnh

*Mã: truncation · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Cắt bớt ngữ cảnh là thao tác bỏ một phần nội dung khi tổng số [token](03-kien-truc-mo-hinh.md#token) vượt [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window). Ví dụ: ứng dụng bỏ các lượt trò chuyện cũ nhất. Ứng dụng có thể cắt bớt tự động mà người dùng không thấy.

**Phân biệt.** Cắt bớt ngữ cảnh bỏ hẳn nội dung, còn [nén ngữ cảnh](#context-compaction) thay nội dung cũ bằng một bản tóm tắt.

**Liên quan.** [nén ngữ cảnh](#context-compaction) · [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window)

<a id="context-compaction"></a>
### Context compaction — Nén ngữ cảnh

*Mã: context-compaction · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** compaction. Dạng chuẩn trong sách: nén ngữ cảnh.

**Định nghĩa.** Nén ngữ cảnh là một kỹ thuật thay các lượt cũ của một cuộc trò chuyện bằng một bản tóm tắt do [LLM](04-llm-va-mo-hinh-sinh.md#llm) viết. Kỹ thuật này giữ ngữ cảnh dưới giới hạn để một phiên [agent](06-agent-va-tu-dong-hoa.md#ai-agent) dài chạy tiếp.

**Phân biệt.** Nén ngữ cảnh thay các lượt cũ bằng một bản tóm tắt mới. [Nén prompt](#prompt-compression) làm ngắn một đầu vào bằng cách bỏ phần ít thông tin. Cả 2 cách có thể làm mất chi tiết.

**Liên quan.** [cắt bớt ngữ cảnh](#truncation) · [kỹ thuật ngữ cảnh](#context-engineering)

<a id="persistent-memory"></a>
### Persistent memory — Bộ nhớ lâu dài

*Mã: persistent-memory · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Bộ nhớ lâu dài là một nơi lưu thông tin bên ngoài [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window). Thông tin này còn lại qua nhiều phiên làm việc. Ứng dụng hoặc [agent](06-agent-va-tu-dong-hoa.md#ai-agent) đọc lại thông tin khi cần.

**Phân biệt.** Bộ nhớ lâu dài là cách lưu trữ chung, còn [bộ nhớ](#memory) của trợ lý AI là một tính năng cụ thể cho người dùng.

**Liên quan.** [bộ nhớ](#memory) · [bộ nhớ của agent](06-agent-va-tu-dong-hoa.md#agent-memory)

<a id="prompt-compression"></a>
### Prompt compression — Nén prompt

*Mã: prompt-compression · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Nén prompt là một kỹ thuật làm ngắn một [prompt](#prompt) trước khi gửi cho [LLM](04-llm-va-mo-hinh-sinh.md#llm), ví dụ bằng cách bỏ các phần ít thông tin. Mục đích là giảm chi phí và thời gian xử lý.

**Phân biệt.** Nén prompt có thể bỏ nhầm chi tiết cần thiết, khác [prompt caching](#prompt-caching) giữ nguyên prompt.

**Liên quan.** [prompt caching](#prompt-caching) · [nén ngữ cảnh](#context-compaction)

## 5.4 Truy xuất tri thức (RAG)

<a id="rag"></a>
### Retrieval-augmented generation (RAG) — Tạo sinh tăng cường truy xuất

*Mã: rag · Chương 5 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tạo sinh tăng cường truy xuất, sinh văn bản có truy xuất. Dạng chuẩn trong sách: RAG.

**Định nghĩa.** RAG là một phương pháp trong đó ứng dụng tìm các đoạn tài liệu liên quan tới câu hỏi và đưa các đoạn đó vào [prompt](#prompt). Sau đó, [LLM](04-llm-va-mo-hinh-sinh.md#llm) tạo câu trả lời dựa trên các đoạn này.

**Giải thích.** Một hệ thống RAG có 3 bước:

- Lập chỉ mục: hệ thống [chia đoạn tài liệu](#chunking) trong [kho tri thức](#knowledge-base) và lưu chỉ mục để tìm nhanh.
- Truy xuất: hệ thống tìm các đoạn liên quan, ví dụ bằng [tìm kiếm ngữ nghĩa](#semantic-search).
- Tạo câu trả lời: ứng dụng ghép câu hỏi với các đoạn tìm được, rồi LLM tạo câu trả lời.

Bài báo gốc năm 2020 chia kiến thức thành 2 loại. Loại 1 nằm trong [tham số](01-nen-tang.md#parameter) của [mô hình](01-nen-tang.md#model). Loại 2 nằm trong một kho văn bản bên ngoài. RAG cho phép cập nhật kiến thức bằng cách sửa kho tài liệu, không cần [huấn luyện](01-nen-tang.md#training) lại mô hình.

**Ví dụ.** Ví dụ giả định: nhân viên Công ty An Bình hỏi "Nghỉ phép quá 5 ngày cần ai duyệt?". Hệ thống RAG tìm 3 đoạn liên quan trong quy chế nhân sự và đưa vào prompt. LLM trả lời và ghi tên văn bản, số điều của các đoạn đã dùng.

**Phân biệt.** RAG khác [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning). RAG đưa tài liệu vào ngữ cảnh ở mỗi lần chạy. Tinh chỉnh đổi tham số của mô hình. Tinh chỉnh không phải cách tin cậy để nạp kiến thức mới. Một nghiên cứu năm 2023 thấy LLM khó học sự kiện mới qua tinh chỉnh không giám sát.

**Không nên hiểu là.** RAG không bắt buộc dùng [cơ sở dữ liệu vector](#vector-database). Bước truy xuất có thể dùng [truy xuất theo từ khóa](#lexical-retrieval) hoặc tìm kiếm web. Một [agent](06-agent-va-tu-dong-hoa.md#ai-agent) cũng có thể dùng công cụ tìm tệp. RAG cũng không làm mô hình học tài liệu: sau lần chạy, tham số của mô hình không đổi.

**Giới hạn.** Câu trả lời của RAG phụ thuộc các đoạn truy xuất được. Đoạn truy xuất được có thể không phải đoạn đúng. Đoạn đó có thể cũ, thiếu điều kiện, hoặc chỉ giống câu hỏi về từ ngữ. LLM cũng có thể tạo nội dung không có trong tài liệu, kể cả khi câu trả lời có [trích nguồn](#citation).

> **CẢNH BÁO:** Đối chiếu câu trả lời với đoạn nguồn trước khi dùng cho quyết định pháp lý hoặc tài chính. Một câu trả lời sai có thể gây thiệt hại.

**Liên quan.** [chia đoạn tài liệu](#chunking) · [tìm kiếm ngữ nghĩa](#semantic-search) · [cơ sở dữ liệu vector](#vector-database) · [grounding](#grounding) · [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning) · [độ bám sát nguồn](07-danh-gia-va-chat-luong.md#faithfulness)

**Nguồn.** [1] Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", 2020 (NeurIPS 2020), https://arxiv.org/abs/2005.11401, truy cập 2/10/2026 (S005). [2] Gao et al., "Retrieval-Augmented Generation for Large Language Models: A Survey", 2023 (bản v5, 2024), https://arxiv.org/abs/2312.10997, truy cập 2/10/2026 (S524). [3] Ovadia et al., "Fine-Tuning or Retrieval? Comparing Knowledge Injection in LLMs", 2023, https://arxiv.org/abs/2312.05934, truy cập 2/10/2026 (S547). [4] Anthropic, "Effective context engineering for AI agents", 2025, https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, truy cập 2/10/2026 (S506).

<a id="grounding"></a>
### Grounding — Grounding

*Mã: grounding · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** gắn với căn cứ. Dạng chuẩn trong sách: grounding.

**Định nghĩa.** Grounding là việc gắn đầu ra của [mô hình](01-nen-tang.md#model) với căn cứ kiểm tra được. Căn cứ có thể là tài liệu của doanh nghiệp, kết quả tìm kiếm web hoặc dữ liệu bản đồ.

**Giải thích.** Ứng dụng làm grounding bằng cách đưa nguồn vào ngữ cảnh, thường qua [RAG](#rag) hoặc [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use) tìm kiếm. Tính đến tháng 10/2026, một số dịch vụ trả kèm câu trả lời danh sách nguồn đã dùng. Grounding giảm [ảo giác](04-llm-va-mo-hinh-sinh.md#hallucination), nhưng không loại bỏ ảo giác.

**Phân biệt.** Grounding là mục tiêu: câu trả lời dựa trên căn cứ. RAG là một kỹ thuật để đạt mục tiêu đó. [Trích nguồn](#citation) là cách cho người đọc thấy căn cứ. Một câu trả lời có grounding vẫn cần kiểm tra [độ bám sát nguồn](07-danh-gia-va-chat-luong.md#faithfulness).

**Liên quan.** [RAG](#rag) · [trích nguồn](#citation) · [độ bám sát nguồn](07-danh-gia-va-chat-luong.md#faithfulness) · [ảo giác](04-llm-va-mo-hinh-sinh.md#hallucination)

**Nguồn.** [1] Google Cloud, "Grounding overview" (Vertex AI Docs), https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview, truy cập 2/10/2026 (S523). [2] Anthropic, "Citations" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/citations, truy cập 2/10/2026 (S522).

<a id="citation"></a>
### Citation — Trích nguồn

*Mã: citation · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** trích dẫn nguồn trong câu trả lời. Dạng chuẩn trong sách: trích nguồn.

**Định nghĩa.** Trích nguồn là một phần của câu trả lời do AI tạo ra, chỉ tới tài liệu mà câu trả lời dựa vào. Trích nguồn có thể là một đường liên kết, tên tệp hoặc số trang.

**Giải thích.** Trong [RAG](#rag), ứng dụng có danh sách các đoạn đã đưa vào [prompt](#prompt). Ứng dụng có thể yêu cầu [LLM](04-llm-va-mo-hinh-sinh.md#llm) ghi số thứ tự của đoạn nguồn sau mỗi câu. Tính đến tháng 10/2026, [API](11-trien-khai-san-pham-kinh-te.md#api) của một số nhà phát triển [mô hình](01-nen-tang.md#model) trả kèm nguyên văn đoạn được trích. Cách này bảo đảm trích nguồn trỏ tới một tài liệu có thật trong yêu cầu.

**Phân biệt.** Có trích nguồn khác với có nguồn thực sự hỗ trợ kết luận. Một trích nguồn có thể trỏ tới tài liệu có thật. Nhưng tài liệu đó có thể không nói điều mà câu trả lời khẳng định. Năm 2023, một nghiên cứu kiểm tra 4 công cụ tìm kiếm dùng [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai). Chỉ 74,5% trích nguồn hỗ trợ câu đi kèm. Chỉ 51,5% câu được trích nguồn hỗ trợ đầy đủ.

> **CẢNH BÁO:** Mở nguồn và đọc đoạn được trích trước khi dẫn lại trong văn bản pháp lý. Trích nguồn sai có thể gây thiệt hại về uy tín và pháp lý.

**Liên quan.** [grounding](#grounding) · [độ bám sát nguồn](07-danh-gia-va-chat-luong.md#faithfulness) · [ảo giác](04-llm-va-mo-hinh-sinh.md#hallucination) · [RAG](#rag)

**Nguồn.** [1] Liu, Zhang, Liang, "Evaluating Verifiability in Generative Search Engines", 2023 (Findings of EMNLP 2023), https://arxiv.org/abs/2304.09848, truy cập 2/10/2026 (S521). [2] Anthropic, "Citations" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/citations, truy cập 2/10/2026 (S522).

<a id="vector-database"></a>
### Vector database — Cơ sở dữ liệu vector

*Mã: vector-database · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** vector database, vector store, kho vector. Dạng chuẩn trong sách: cơ sở dữ liệu vector.

**Định nghĩa.** Cơ sở dữ liệu vector là một hệ quản trị dữ liệu lưu các [embedding](03-kien-truc-mo-hinh.md#embedding). Hệ này tìm nhanh các embedding gần nhất với embedding của một câu truy vấn.

**Giải thích.** Mỗi embedding là một [vector](01-nen-tang.md#vector) số biểu diễn nội dung của một đoạn văn, một hình ảnh hoặc một sản phẩm. Cơ sở dữ liệu vector dùng chỉ mục tìm gần đúng để trả kết quả nhanh. Một số cơ sở dữ liệu vector cũng lọc theo thuộc tính, ví dụ ngày ban hành hoặc phòng ban. Trong [RAG](#rag), cơ sở dữ liệu vector thường lưu embedding của các đoạn tài liệu.

**Phân biệt.** RAG không bắt buộc dùng cơ sở dữ liệu vector. Một hệ thống RAG có thể dùng [truy xuất theo từ khóa](#lexical-retrieval), tìm kiếm web hoặc công cụ tìm tệp. Cơ sở dữ liệu vector cũng khác [kho tri thức](#knowledge-base). Kho tri thức là nội dung. Cơ sở dữ liệu vector là công cụ lưu và tìm nội dung.

**Liên quan.** [embedding](03-kien-truc-mo-hinh.md#embedding) · [tìm kiếm ngữ nghĩa](#semantic-search) · [RAG](#rag) · [điểm tương đồng](#similarity-score)

**Nguồn.** [1] Pan, Wang, Li, "Survey of Vector Database Management Systems", 2023, https://arxiv.org/abs/2310.14021, truy cập 2/10/2026 (S526). [2] Gao et al., "Retrieval-Augmented Generation for Large Language Models: A Survey", 2023 (bản v5, 2024), https://arxiv.org/abs/2312.10997, truy cập 2/10/2026 (S524).

<a id="semantic-search"></a>
### Semantic search — Tìm kiếm ngữ nghĩa

*Mã: semantic-search · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** semantic search, tìm kiếm theo nghĩa. Dạng chuẩn trong sách: tìm kiếm ngữ nghĩa.

**Định nghĩa.** Tìm kiếm ngữ nghĩa là một phương pháp tìm tài liệu theo mức gần nghĩa với câu hỏi, không chỉ theo từ trùng. Hệ thống so sánh [embedding](03-kien-truc-mo-hinh.md#embedding) của câu hỏi với embedding của từng tài liệu.

**Giải thích.** Một [mô hình embedding](04-llm-va-mo-hinh-sinh.md#embedding-model) chuyển câu hỏi và tài liệu thành [vector](01-nen-tang.md#vector). Hệ thống tính [điểm tương đồng](#similarity-score) giữa các vector. Hệ thống trả về các tài liệu có điểm cao nhất. Nhờ vậy, câu hỏi "xin nghỉ ốm" có thể tìm được đoạn "vắng mặt do bệnh". Hai cụm này không có từ trùng.

**Phân biệt.** Truy xuất được khác truy xuất đúng. Tài liệu có điểm tương đồng cao chỉ gần nghĩa với câu hỏi. Tài liệu đó có thể không trả lời câu hỏi, có thể cũ, hoặc nói điều ngược lại. Tìm kiếm ngữ nghĩa cũng có thể bỏ sót mã số, số hiệu văn bản và tên riêng. [Truy xuất theo từ khóa](#lexical-retrieval) tìm các nội dung này tốt hơn.

**Liên quan.** [điểm tương đồng](#similarity-score) · [truy xuất theo từ khóa](#lexical-retrieval) · [tìm kiếm lai](#hybrid-search) · [reranker](#reranker)

**Nguồn.** [1] Reimers, Gurevych, "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks", 2019 (EMNLP 2019), https://arxiv.org/abs/1908.10084, truy cập 2/10/2026 (S527). [2] Anthropic, "Introducing Contextual Retrieval", 2024, https://www.anthropic.com/engineering/contextual-retrieval, truy cập 2/10/2026 (S525).

<a id="chunking"></a>
### Chunking — Chia đoạn tài liệu

*Mã: chunking · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** chunking, cắt đoạn. Dạng chuẩn trong sách: chia đoạn tài liệu.

**Định nghĩa.** Chia đoạn tài liệu là bước cắt tài liệu dài thành các đoạn nhỏ trước khi lập chỉ mục cho [RAG](#rag). Mỗi đoạn là một đơn vị để tìm kiếm và đưa vào [prompt](#prompt).

**Giải thích.** Mỗi đoạn thường dài vài trăm [token](03-kien-truc-mo-hinh.md#token). Người làm hệ thống chọn cách cắt: theo số token, theo đoạn văn, theo điều khoản hoặc theo tiêu đề. Đoạn quá ngắn mất thông tin xung quanh. Đoạn quá dài chứa nội dung không liên quan và tốn token. Một giải pháp là thêm vào đầu mỗi đoạn một câu nêu vị trí của đoạn trong tài liệu gốc.

**Ví dụ.** Ví dụ giả định: hệ thống cắt một hợp đồng 40 trang theo điều. Đoạn "Điều 7.2: Bên B thanh toán trong 30 ngày" mất tên hợp đồng và tên Bên B. Hệ thống thêm dòng "Hợp đồng mua bán số 15, Bên B là Công ty An Bình" vào đầu đoạn.

**Liên quan.** [RAG](#rag) · [phân tích tài liệu](#document-parsing) · [tìm kiếm ngữ nghĩa](#semantic-search)

**Nguồn.** [1] Anthropic, "Introducing Contextual Retrieval", 2024, https://www.anthropic.com/engineering/contextual-retrieval, truy cập 2/10/2026 (S525). [2] Gao et al., "Retrieval-Augmented Generation for Large Language Models: A Survey", 2023 (bản v5, 2024), https://arxiv.org/abs/2312.10997, truy cập 2/10/2026 (S524).

<a id="reranker"></a>
### Reranker — Bộ xếp hạng lại

*Mã: reranker · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ xếp hạng lại, mô hình reranking. Dạng chuẩn trong sách: reranker.

**Định nghĩa.** Reranker là một [mô hình](01-nen-tang.md#model) chấm lại mức liên quan giữa câu hỏi và từng tài liệu trong một danh sách ứng viên. Reranker xếp lại danh sách theo điểm mới. Reranker thường đứng sau bước truy xuất đầu tiên trong [RAG](#rag).

**Giải thích.** Bước truy xuất đầu tiên cần nhanh, nên lấy một danh sách rộng, ví dụ 150 đoạn. Reranker xử lý câu hỏi và từng đoạn cùng lúc, rồi chấm điểm từng cặp. Ứng dụng chỉ giữ các đoạn có điểm cao nhất, ví dụ 20 đoạn, để đưa vào [prompt](#prompt). Cách chấm này chậm hơn so sánh [embedding](03-kien-truc-mo-hinh.md#embedding). Ứng dụng chỉ dùng reranker cho danh sách ngắn.

**Phân biệt.** Reranker không tìm tài liệu mới. Reranker chỉ xếp lại các tài liệu mà bước trước đã tìm được. Khi bước trước bỏ sót tài liệu đúng, reranker không lấy lại được tài liệu đó.

**Liên quan.** [RAG](#rag) · [tìm kiếm ngữ nghĩa](#semantic-search) · [tìm kiếm lai](#hybrid-search)

**Nguồn.** [1] Nogueira, Cho, "Passage Re-ranking with BERT", 2019, https://arxiv.org/abs/1901.04085, truy cập 2/10/2026 (S528). [2] Anthropic, "Introducing Contextual Retrieval", 2024, https://www.anthropic.com/engineering/contextual-retrieval, truy cập 2/10/2026 (S525).

<a id="similarity-score"></a>
### Similarity score — Điểm tương đồng

*Mã: similarity-score · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Điểm tương đồng là một con số đo mức gần nhau của 2 [embedding](03-kien-truc-mo-hinh.md#embedding), ví dụ độ tương đồng cosin. Trong [tìm kiếm ngữ nghĩa](#semantic-search), điểm cao hơn cho thấy 2 nội dung gần nghĩa hơn.

**Phân biệt.** Điểm cao không có nghĩa là tài liệu trả lời đúng câu hỏi, và điểm từ 2 [mô hình embedding](04-llm-va-mo-hinh-sinh.md#embedding-model) khác nhau không so sánh được.

**Liên quan.** [tìm kiếm ngữ nghĩa](#semantic-search) · [cơ sở dữ liệu vector](#vector-database)

<a id="hybrid-search"></a>
### Hybrid search — Tìm kiếm lai

*Mã: hybrid-search · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tìm kiếm lai là một phương pháp kết hợp [truy xuất theo từ khóa](#lexical-retrieval) với [tìm kiếm ngữ nghĩa](#semantic-search). Hệ thống gộp 2 danh sách kết quả thành một danh sách chung.

**Phân biệt.** Tìm kiếm lai có thể tìm được cả mã số chính xác và nội dung gần nghĩa, nhưng vẫn cần [reranker](#reranker) hoặc người kiểm tra.

**Liên quan.** [reranker](#reranker) · [RAG](#rag)

<a id="lexical-retrieval"></a>
### Lexical retrieval — Truy xuất theo từ khóa

*Mã: lexical-retrieval · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** lexical retrieval, sparse retrieval, tìm kiếm từ khóa. So sánh với dense retrieval (truy xuất dày đặc). Dạng chuẩn trong sách: truy xuất theo từ khóa.

**Định nghĩa.** Truy xuất theo từ khóa là một phương pháp tìm tài liệu dựa trên các từ trùng với câu hỏi. Phương pháp này tính cả mức hiếm của từ và độ dài tài liệu, ví dụ [thuật toán](01-nen-tang.md#algorithm) BM25.

**Phân biệt.** Dense retrieval so sánh [embedding](03-kien-truc-mo-hinh.md#embedding) thay cho từ trùng, nên tìm được nội dung gần nghĩa nhưng có thể bỏ sót mã số.

**Liên quan.** [tìm kiếm ngữ nghĩa](#semantic-search) · [tìm kiếm lai](#hybrid-search)

<a id="document-parsing"></a>
### Document parsing — Phân tích tài liệu

*Mã: document-parsing · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Phân tích tài liệu là bước chuyển tệp PDF, ảnh quét hoặc bảng tính thành văn bản có cấu trúc. Kết quả giữ tiêu đề, đoạn, bảng và thứ tự đọc. Trong [RAG](#rag), bước này đứng trước [chia đoạn tài liệu](#chunking).

**Phân biệt.** Phân tích tài liệu rộng hơn [OCR](04-llm-va-mo-hinh-sinh.md#ocr), vì phân tích tài liệu khôi phục cả bảng và bố cục.

**Liên quan.** [OCR](04-llm-va-mo-hinh-sinh.md#ocr) · [chia đoạn tài liệu](#chunking)

<a id="knowledge-base"></a>
### Knowledge base — Kho tri thức

*Mã: knowledge-base · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Kho tri thức là một tập hợp tài liệu có tổ chức mà một ứng dụng dùng làm nguồn để trả lời. Ví dụ: quy chế nội bộ, hồ sơ sản phẩm. Trong [RAG](#rag), bước truy xuất tìm tài liệu trong kho tri thức.

**Phân biệt.** Kho tri thức nằm ngoài [mô hình](01-nen-tang.md#model), khác kiến thức mà mô hình học trong [huấn luyện](01-nen-tang.md#training).

**Liên quan.** [RAG](#rag) · [cơ sở dữ liệu vector](#vector-database) · [đồ thị tri thức](#knowledge-graph)

<a id="knowledge-graph"></a>
### Knowledge graph — Đồ thị tri thức

*Mã: knowledge-graph · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Đồ thị tri thức là một kiểu cấu trúc dữ liệu gồm các thực thể và các quan hệ giữa thực thể. Ví dụ, quan hệ "là bên mua" nối thực thể "Công ty An Bình" với thực thể "Hợp đồng số 15".

**Phân biệt.** Đồ thị tri thức lưu quan hệ rõ ràng, khác [cơ sở dữ liệu vector](#vector-database) lưu [embedding](03-kien-truc-mo-hinh.md#embedding) để tìm theo mức gần nghĩa.

**Liên quan.** [GraphRAG](#graphrag) · [kho tri thức](#knowledge-base)

<a id="graphrag"></a>
### GraphRAG — GraphRAG

*Mã: graphrag · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** GraphRAG là một kiểu [RAG](#rag) trong đó ứng dụng trích thực thể và quan hệ từ tài liệu thành một [đồ thị tri thức](#knowledge-graph). Ứng dụng tóm tắt trước từng nhóm thực thể liên quan.

**Phân biệt.** Năm 2024, nghiên cứu gốc ghi nhận GraphRAG cho câu trả lời đầy đủ hơn RAG thông thường với câu hỏi về toàn bộ kho tài liệu. Đổi lại, GraphRAG tốn nhiều lần gọi [LLM](04-llm-va-mo-hinh-sinh.md#llm) hơn.

**Liên quan.** [đồ thị tri thức](#knowledge-graph) · [RAG](#rag)

<a id="agentic-rag"></a>
### Agentic RAG — RAG có tính agent

*Mã: agentic-rag · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** RAG có tính agent. Dạng chuẩn trong sách: agentic RAG.

**Định nghĩa.** Agentic RAG là một kiểu [RAG](#rag) trong đó một [agent](06-agent-va-tu-dong-hoa.md#ai-agent) tự chọn có truy xuất hay không, chọn nguồn và câu truy vấn. Agent tìm lại nhiều lần cho đến khi đủ thông tin.

**Phân biệt.** Agentic RAG tốn nhiều lần gọi [mô hình](01-nen-tang.md#model) hơn RAG cơ bản và khó kiểm soát hơn.

**Liên quan.** [RAG](#rag) · [agent](06-agent-va-tu-dong-hoa.md#ai-agent) · [ReAct](#react-pattern)

## 5.5 Đầu ra có cấu trúc

<a id="structured-output"></a>
### Structured output — Đầu ra có cấu trúc

*Mã: structured-output · Chương 5 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** structured outputs, JSON mode, đầu ra theo JSON schema. Dạng chuẩn trong sách: đầu ra có cấu trúc.

**Định nghĩa.** Đầu ra có cấu trúc là một đầu ra của [mô hình](01-nen-tang.md#model) theo khuôn dạng máy đọc được, ví dụ JSON. Khuôn dạng này có các trường và kiểu dữ liệu định trước, thường mô tả bằng một JSON schema.

**Giải thích.** Phần mềm cần đầu ra có cấu trúc để đọc kết quả tự động. Ở mức kiểm soát thấp, [prompt](#prompt) yêu cầu mô hình trả về JSON. Mô hình vẫn có thể trả sai khuôn dạng. Ở mức kiểm soát cao, [API](11-trien-khai-san-pham-kinh-te.md#api) dùng [giải mã có ràng buộc](#constrained-decoding) để đầu ra khớp schema. Tính đến tháng 10/2026, API của một số nhà phát triển mô hình có chế độ này. Chế độ này vẫn có ngoại lệ, ví dụ khi mô hình [từ chối trả lời](08-an-toan-va-alignment.md#refusal).

**Ví dụ.** Ví dụ giả định: Công ty An Bình đọc 1.000 hóa đơn mỗi tháng. Schema yêu cầu 3 trường: số hóa đơn, ngày, tổng tiền. Mô hình trả về đủ 3 trường cho mỗi hóa đơn. Nhưng một hóa đơn có tổng tiền sai vì ảnh mờ.

**Phân biệt.** Đúng cấu trúc khác đúng nội dung. Schema bảo đảm đủ trường và đúng kiểu dữ liệu. Schema không bảo đảm giá trị trong trường là đúng. Phần mềm vẫn cần kiểm tra giá trị, ví dụ đối chiếu tổng tiền với các dòng hàng.

**Liên quan.** [giải mã có ràng buộc](#constrained-decoding) · [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use) · [prompt](#prompt)

**Nguồn.** [1] OpenAI, "Structured model outputs" (OpenAI API Docs), https://developers.openai.com/api/docs/guides/structured-outputs, truy cập 2/10/2026 (S536). [2] Anthropic, "Structured outputs" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/structured-outputs, truy cập 2/10/2026 (S537).

<a id="constrained-decoding"></a>
### Constrained decoding — Giải mã có ràng buộc

*Mã: constrained-decoding · Chương 5 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** guided generation. Dạng chuẩn trong sách: giải mã có ràng buộc.

**Định nghĩa.** Giải mã có ràng buộc là một kỹ thuật chặn các [token](03-kien-truc-mo-hinh.md#token) không hợp lệ ở mỗi bước sinh văn bản. Nhờ vậy, đầu ra của [mô hình](01-nen-tang.md#model) khớp một khuôn dạng, ví dụ JSON schema hoặc biểu thức chính quy.

**Phân biệt.** Giải mã có ràng buộc can thiệp vào bước chọn token, khác yêu cầu khuôn dạng bằng lời trong [prompt](#prompt). Đầu ra vẫn có thể thiếu một phần khuôn dạng khi hệ thống dừng tạo đầu ra giữa chừng.

**Liên quan.** [đầu ra có cấu trúc](#structured-output) · [decoding](04-llm-va-mo-hinh-sinh.md#decoding)
