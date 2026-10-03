---
chapter: 9
title: "Bảo mật, dữ liệu cá nhân, tính xác thực nội dung"
file: 09-bao-mat-rieng-tu-xac-thuc.md
terms: 38
bible_version: "0.2"
version: "0.1"
updated: 2026-10-02
status: review
---

# Chương 9 — Bảo mật, dữ liệu cá nhân, tính xác thực nội dung

Chương này giải thích các thuật ngữ cho 3 nhóm câu hỏi:

- Kẻ tấn công lừa, phá hoặc lấy dữ liệu từ một hệ thống AI bằng cách nào.
- Dữ liệu cá nhân đi vào hệ thống AI ở đâu và nằm lại bao lâu.
- Người đọc kiểm tra nguồn gốc của một ảnh, video, giọng nói hoặc văn bản bằng cách nào.

Cụm cuối nêu các biện pháp vận hành an toàn khi doanh nghiệp đưa AI vào công việc. Các thuật ngữ về hành vi an toàn của mô hình nằm ở [Chương 8](08-an-toan-va-alignment.md). Nghĩa vụ pháp lý và mốc hiệu lực của luật nằm ở [Chương 10](10-phap-ly-quan-tri-chinh-sach.md).

## 9.1 Tấn công vào hệ thống AI

<a id="ai-security"></a>
### AI security — Bảo mật AI

*Mã: ai-security · Chương 9 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** an ninh AI. Dạng chuẩn trong sách: bảo mật AI.

**Định nghĩa.** Bảo mật AI là một lĩnh vực bảo vệ [hệ thống AI](01-nen-tang.md#ai-system) trước hành động cố ý của kẻ tấn công. Lĩnh vực này giữ cho dữ liệu, [mô hình](01-nen-tang.md#model) và đầu ra được bí mật, toàn vẹn và sẵn sàng.

**Giải thích.** Một hệ thống AI có các điểm yếu của phần mềm thông thường. Hệ thống AI còn có điểm yếu riêng. Ví dụ, một [LLM](04-llm-va-mo-hinh-sinh.md#llm) nhận dữ liệu và chỉ dẫn trong cùng một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt). Kẻ tấn công có thể nhắm vào 3 giai đoạn:

- Giai đoạn tạo mô hình: [đầu độc dữ liệu](#data-poisoning), [rủi ro chuỗi cung ứng AI](#supply-chain-risk).
- Giai đoạn nhận đầu vào: [prompt injection](#prompt-injection), [mẫu đối kháng](#adversarial-example).
- Giai đoạn trả đầu ra: [đánh cắp dữ liệu](#data-exfiltration), [trích xuất mô hình](#model-extraction).

Ngoài các biện pháp bảo mật quen thuộc, bảo mật AI thêm biện pháp riêng. Ví dụ: kiểm tra nguồn dữ liệu, giới hạn quyền của [agent](06-agent-va-tu-dong-hoa.md#ai-agent), [red teaming](08-an-toan-va-alignment.md#red-teaming).

**Ví dụ.** Công ty An Bình đưa một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) chăm sóc khách hàng lên website. Nhóm bảo mật thử chèn chỉ dẫn lạ vào tin nhắn. Nhóm cũng thử hỏi dữ liệu của khách hàng khác. Sau đó, nhóm chỉ cấp cho chatbot quyền đọc trạng thái đơn hàng.

**Phân biệt.** Bảo mật AI chống hành động cố ý của kẻ tấn công. [An toàn AI](08-an-toan-va-alignment.md#ai-safety) xử lý tác hại do chính hành vi của hệ thống gây ra, kể cả khi không ai tấn công. Hai lĩnh vực giao nhau. Một vụ [jailbreak](08-an-toan-va-alignment.md#jailbreak) là vấn đề bảo mật, vì có người cố ý lừa mô hình. Vụ đó cũng là vấn đề an toàn, vì mô hình tạo ra nội dung gây hại.

**Không nên hiểu là.** Bảo mật AI không chỉ là bảo vệ máy chủ. Một hệ thống có hạ tầng an toàn vẫn có thể làm theo chỉ dẫn độc hại trong một tài liệu. Bảo mật AI cũng khác việc dùng AI để phát hiện tấn công mạng.

**Giới hạn.** Tính đến tháng 10/2026, các tài liệu chuẩn ghi rằng chưa có cách phòng vệ đầy đủ trước prompt injection và mẫu đối kháng. Các biện pháp bảo mật AI giảm rủi ro, không loại bỏ rủi ro.

**Thay đổi gần đây.** Tháng 2/2025, viện an toàn AI của Vương quốc Anh đổi tên thành AI Security Institute. Khi agent đọc dữ liệu riêng và [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use), bảo mật AI mở rộng sang quyền của agent.

> **THẬN TRỌNG:** Kiểm tra quyền của mỗi thành phần AI trước khi đưa vào dùng. Quyền quá rộng làm tăng thiệt hại khi kẻ tấn công lừa được hệ thống.

**Liên quan.** [an toàn AI](08-an-toan-va-alignment.md#ai-safety) · [prompt injection](#prompt-injection) · [đầu độc dữ liệu](#data-poisoning) · [quyền tối thiểu](#least-privilege) · [red teaming](08-an-toan-va-alignment.md#red-teaming)

**Nguồn.** [1] NIST, "Artificial Intelligence Risk Management Framework (AI RMF 1.0)" (NIST AI 100-1), 2023, https://doi.org/10.6028/NIST.AI.100-1, mục 3.2 và 3.3, truy cập 2/10/2026 (S002). [2] Vassilev, Oprea, Fordyce, Anderson, Davies, Hamin (NIST), "Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations" (NIST AI 100-2 E2025), 2025, https://csrc.nist.gov/pubs/ai/100/2/e2025/final, truy cập 2/10/2026 (S901). [3] NCSC (Vương quốc Anh) và các cơ quan đối tác, "Guidelines for secure AI system development", 2023, https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development, truy cập 2/10/2026 (S942). [4] Chính phủ Vương quốc Anh, "Tackling AI security risks to unleash growth and deliver Plan for Change", 14/2/2025, https://www.gov.uk/government/news/tackling-ai-security-risks-to-unleash-growth-and-deliver-plan-for-change, truy cập 2/10/2026 (S943).

<a id="prompt-injection"></a>
### Prompt injection — Chèn lệnh vào prompt

*Mã: prompt-injection · Chương 9 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** chèn lệnh vào prompt, tấn công chèn chỉ dẫn. Dạng chuẩn trong sách: prompt injection.

**Định nghĩa.** Prompt injection là một kiểu tấn công vào ứng dụng dùng [LLM](04-llm-va-mo-hinh-sinh.md#llm). Kẻ tấn công đặt chỉ dẫn vào nội dung mà LLM xử lý. Mục đích là để LLM bỏ chỉ dẫn của nhà phát triển và làm theo kẻ tấn công.

**Giải thích.** Một ứng dụng LLM ghép nhiều phần thành một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt). Ví dụ: [system prompt](05-prompt-ngu-canh-tri-thuc.md#system-prompt), câu hỏi của người dùng, tài liệu, trang web. LLM nhận các phần này như một chuỗi [token](03-kien-truc-mo-hinh.md#token). Trong chuỗi này, không có ranh giới cứng giữa chỉ dẫn và dữ liệu. Một câu trong tài liệu có thể trông giống chỉ dẫn, và LLM có thể làm theo câu đó.

Prompt injection có 2 dạng. Ở dạng trực tiếp, kẻ tấn công nhập chỉ dẫn vào ô chat. Ở dạng gián tiếp, kẻ tấn công giấu chỉ dẫn trong nội dung mà ứng dụng tự đọc. Chỉ dẫn độc hại không cần hiển thị với con người.

Thiệt hại phụ thuộc quyền của ứng dụng. Một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) chỉ trả lời bằng văn bản có thể trả lời sai lệch. Một [agent](06-agent-va-tu-dong-hoa.md#ai-agent) có quyền [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use) có thể gửi email, xóa tệp hoặc gửi dữ liệu ra ngoài.

**Ví dụ.** Công ty An Bình có một chatbot bán hàng. System prompt ghi rằng chatbot chỉ báo giá theo bảng giá. Một khách hàng tự nhận là quản trị viên và yêu cầu chatbot tặng mã giảm giá 100%. Nếu chatbot làm theo, đây là một vụ prompt injection trực tiếp.

**Phân biệt.** [Jailbreak](08-an-toan-va-alignment.md#jailbreak) nhắm vào quy tắc an toàn của [mô hình](01-nen-tang.md#model). Mục đích là để mô hình tạo ra nội dung mà nhà phát triển cấm. Prompt injection nhắm vào ứng dụng. Mục đích là để ứng dụng làm việc trái ý nhà phát triển hoặc người dùng. Một vụ tấn công có thể vừa là jailbreak vừa là prompt injection.

**Không nên hiểu là.** Prompt injection không giống lỗi chèn mã vào cơ sở dữ liệu. Lỗi chèn mã có cách phòng chuẩn là tách câu lệnh khỏi dữ liệu. Với LLM, cách phòng đó chưa áp dụng được.

**Giới hạn.** Tính đến tháng 10/2026, chưa có biện pháp nào chặn hoàn toàn prompt injection. Bộ lọc đầu vào và [guardrail](08-an-toan-va-alignment.md#guardrail) chỉ giảm tỷ lệ tấn công thành công. Kiểm soát quyền ở phần mềm giới hạn thiệt hại khi tấn công thành công.

**Thay đổi gần đây.** Danh mục OWASP Top 10 for LLM bản 2025 và bản 2026 (tháng 8/2026) đều xếp prompt injection ở vị trí số 1. Khi agent đọc web, email và tệp, [prompt injection gián tiếp](#indirect-prompt-injection) có thể dẫn đến [đánh cắp dữ liệu](#data-exfiltration).

> **THẬN TRỌNG:** Yêu cầu người duyệt trước khi ứng dụng LLM làm việc không hoàn tác được. Prompt injection có thể kích hoạt các quyền này.

**Liên quan.** [prompt injection gián tiếp](#indirect-prompt-injection) · [jailbreak](08-an-toan-va-alignment.md#jailbreak) · [system prompt](05-prompt-ngu-canh-tri-thuc.md#system-prompt) · [thứ bậc hướng dẫn](05-prompt-ngu-canh-tri-thuc.md#instruction-hierarchy) · [quyền tối thiểu](#least-privilege) · [đánh cắp dữ liệu](#data-exfiltration)

**Nguồn.** [1] Vassilev et al. (NIST), "Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations" (NIST AI 100-2 E2025), 2025, https://csrc.nist.gov/pubs/ai/100/2/e2025/final, mục 3.3 và 3.4, truy cập 2/10/2026 (S901). [2] Greshake, Abdelnabi, Mishra, Endres, Holz, Fritz, "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection", 2023, https://arxiv.org/abs/2302.12173, truy cập 2/10/2026 (S907). [3] OWASP GenAI Security Project, "LLM01:2025 Prompt Injection", 2025, https://genai.owasp.org/llmrisk/llm01-prompt-injection/, truy cập 2/10/2026 (S902). [4] Help Net Security, "OWASP 2026 LLM Top 10: 'The model will be fooled'", 2026, https://www.helpnetsecurity.com/2026/08/06/owasp-2026-llm-top-10-released/, truy cập 2/10/2026 (S9058).

<a id="indirect-prompt-injection"></a>
### Indirect prompt injection — Prompt injection gián tiếp

*Mã: indirect-prompt-injection · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Prompt injection gián tiếp là một dạng [prompt injection](#prompt-injection) trong đó chỉ dẫn độc nằm trong nội dung bên ngoài. Ứng dụng tự đọc nội dung này, ví dụ: trang web, email, tệp.

**Giải thích.** Kẻ tấn công không cần truy cập ứng dụng. Kẻ tấn công chỉ cần đặt nội dung ở nơi ứng dụng có thể đọc. Khi một [agent](06-agent-va-tu-dong-hoa.md#ai-agent) tóm tắt trang web, chỉ dẫn ẩn đi vào [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt). Hệ thống [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) cũng có thể lấy một tài liệu chứa chỉ dẫn ẩn. Rủi ro cao nhất khi ứng dụng có cùng lúc 3 điều kiện:

- Ứng dụng truy cập dữ liệu riêng.
- Ứng dụng đọc nội dung do người lạ kiểm soát.
- Ứng dụng có cách gửi thông tin ra ngoài.

**Ví dụ.** Chị Lan nhờ một trợ lý AI tóm tắt 20 hồ sơ ứng viên. Một hồ sơ có dòng chữ trắng trên nền trắng, yêu cầu trợ lý khen ứng viên này. Trợ lý đưa lời khen vào bản tóm tắt. Chị Lan phát hiện lỗi khi so với hồ sơ gốc.

**Phân biệt.** [Đầu độc dữ liệu](#data-poisoning) tác động lúc [huấn luyện](01-nen-tang.md#training) và thay đổi [mô hình](01-nen-tang.md#model). Prompt injection gián tiếp không thay đổi mô hình. Chỉ dẫn độc chỉ tác động trong lần chạy có đọc nội dung đó.

**Liên quan.** [prompt injection](#prompt-injection) · [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) · [agent trình duyệt](06-agent-va-tu-dong-hoa.md#browser-agent) · [đánh cắp dữ liệu](#data-exfiltration)

**Nguồn.** [1] Greshake et al., "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection", 2023, https://arxiv.org/abs/2302.12173, truy cập 2/10/2026 (S907). [2] Vassilev et al. (NIST), NIST AI 100-2 E2025, 2025, https://csrc.nist.gov/pubs/ai/100/2/e2025/final, mục 3.4, truy cập 2/10/2026 (S901). [3] Simon Willison, "The lethal trifecta for AI agents: private data, untrusted content, and external communication", 16/6/2025, https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/, truy cập 2/10/2026 (S908).

<a id="prompt-leakage"></a>
### Prompt leakage — Lộ prompt

*Mã: prompt-leakage · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Lộ prompt là một sự cố trong đó người ngoài lấy được [system prompt](05-prompt-ngu-canh-tri-thuc.md#system-prompt) của một ứng dụng AI. Người ngoài cũng có thể lấy được các chỉ dẫn ẩn khác trong [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt).

**Phân biệt.** Lộ prompt gây hại lớn khi system prompt chứa bí mật, ví dụ: mật khẩu, khóa [API](11-trien-khai-san-pham-kinh-te.md#api). System prompt không phải nơi giữ bí mật hoặc kiểm soát quyền.

**Liên quan.** [system prompt](05-prompt-ngu-canh-tri-thuc.md#system-prompt) · [prompt injection](#prompt-injection) · [đánh cắp dữ liệu](#data-exfiltration)

<a id="encoding-attack"></a>
### Encoding attack — Tấn công bằng mã hóa ký tự

*Mã: encoding-attack · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tấn công bằng mã hóa ký tự là một kỹ thuật [jailbreak](08-an-toan-va-alignment.md#jailbreak) viết yêu cầu không được phép ở dạng mã hóa. Ví dụ, base64 có thể lọt qua bộ lọc, nhưng [mô hình](01-nen-tang.md#model) vẫn giải mã được.

**Phân biệt.** Kỹ thuật này đổi cách viết của cả yêu cầu. [Token smuggling](#token-smuggling) giấu hoặc tách từng phần của yêu cầu.

**Liên quan.** [jailbreak](08-an-toan-va-alignment.md#jailbreak) · [token smuggling](#token-smuggling) · [guardrail](08-an-toan-va-alignment.md#guardrail)

<a id="token-smuggling"></a>
### Token smuggling — Buôn lậu token

*Mã: token-smuggling · Chương 9 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** buôn lậu token. Dạng chuẩn trong sách: token smuggling.

**Định nghĩa.** Token smuggling là một tên trong giới bảo mật cho các kỹ thuật giấu nội dung không được phép khỏi bộ lọc. Kỹ thuật này khai thác khác biệt giữa chữ con người thấy và chuỗi [token](03-kien-truc-mo-hinh.md#token) mà [mô hình](01-nen-tang.md#model) nhận.

**Phân biệt.** [Tấn công bằng mã hóa ký tự](#encoding-attack) đổi cách viết của cả yêu cầu. Token smuggling dùng ký tự ẩn hoặc tách từ thành mảnh.

**Thay đổi gần đây.** Tính đến tháng 10/2026, tên này chưa có định nghĩa chuẩn.

**Liên quan.** [tấn công bằng mã hóa ký tự](#encoding-attack) · [bộ tách token](03-kien-truc-mo-hinh.md#tokenizer) · [guardrail](08-an-toan-va-alignment.md#guardrail)

<a id="many-shot-jailbreak"></a>
### Many-shot jailbreak — Jailbreak nhiều ví dụ

*Mã: many-shot-jailbreak · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** jailbreak nhiều ví dụ. Dạng chuẩn trong sách: many-shot jailbreak.

**Định nghĩa.** Many-shot jailbreak là một kỹ thuật [jailbreak](08-an-toan-va-alignment.md#jailbreak) đặt nhiều đoạn hội thoại giả vào [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt). Trong các đoạn này, "trợ lý" làm theo yêu cầu không được phép. Tỷ lệ thành công tăng khi số đoạn tăng.

**Phân biệt.** Kỹ thuật này cần [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) dài để chứa hàng trăm đoạn. Kỹ thuật này khai thác cơ chế [học trong ngữ cảnh](04-llm-va-mo-hinh-sinh.md#in-context-learning).

**Liên quan.** [jailbreak](08-an-toan-va-alignment.md#jailbreak) · [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) · [học trong ngữ cảnh](04-llm-va-mo-hinh-sinh.md#in-context-learning)

<a id="data-exfiltration"></a>
### Data exfiltration — Đánh cắp dữ liệu

*Mã: data-exfiltration · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** rò rỉ dữ liệu ra ngoài. Dạng chuẩn trong sách: đánh cắp dữ liệu.

**Định nghĩa.** Đánh cắp dữ liệu là một hành vi chuyển dữ liệu ra khỏi hệ thống khi không có sự cho phép. Trong ứng dụng AI, kẻ tấn công có thể dùng [prompt injection](#prompt-injection) để ứng dụng tự gửi dữ liệu ra ngoài.

**Giải thích.** Đường gửi ra ngoài có thể là một email hoặc một lời [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use). Đường gửi cũng có thể là một đường link mà ứng dụng tự mở. Rủi ro cao nhất khi ứng dụng có đủ 3 điều kiện ở mục [prompt injection gián tiếp](#indirect-prompt-injection). Biện pháp chính là cắt đường gửi ra ngoài. Ví dụ: giới hạn địa chỉ mạng mà [agent](06-agent-va-tu-dong-hoa.md#ai-agent) gọi được, và yêu cầu người duyệt trước khi gửi.

**Ví dụ.** Anh Minh cho một agent quyền đọc hộp thư và quyền gửi email. Một email lạ chứa chỉ dẫn ẩn: gửi các hợp đồng trong hộp thư tới một địa chỉ lạ. Nếu anh Minh phải duyệt từng email gửi ra ngoài, anh Minh có thể chặn vụ đánh cắp này.

**Phân biệt.** [Lộ prompt](#prompt-leakage) làm lộ chỉ dẫn của ứng dụng. Đánh cắp dữ liệu lấy đi dữ liệu của người dùng hoặc doanh nghiệp. [Ghi nhớ dữ liệu huấn luyện](#memorization) làm lộ dữ liệu nằm trong [mô hình](01-nen-tang.md#model).

**Liên quan.** [prompt injection gián tiếp](#indirect-prompt-injection) · [lộ prompt](#prompt-leakage) · [quyền tối thiểu](#least-privilege) · [cổng phê duyệt](06-agent-va-tu-dong-hoa.md#permission)

**Nguồn.** [1] Greshake et al., "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection", 2023, https://arxiv.org/abs/2302.12173, truy cập 2/10/2026 (S907). [2] Simon Willison, "The lethal trifecta for AI agents: private data, untrusted content, and external communication", 16/6/2025, https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/, truy cập 2/10/2026 (S908).

<a id="data-poisoning"></a>
### Data poisoning — Đầu độc dữ liệu

*Mã: data-poisoning · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Đầu độc dữ liệu là một kiểu tấn công chèn hoặc sửa một phần [dữ liệu huấn luyện](01-nen-tang.md#training-data). Mục đích là làm [mô hình](01-nen-tang.md#model) học một hành vi sai, ví dụ: một "cửa hậu" bật theo một cụm từ riêng.

**Giải thích.** Mô hình lớn học từ dữ liệu web, dữ liệu mua ngoài và dữ liệu [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning). Kẻ tấn công có thể đặt nội dung độc trên trang web, chờ công cụ [thu thập dữ liệu web](02-du-lieu-va-huan-luyen.md#web-crawl) đọc. Năm 2025, một nghiên cứu cài được cửa hậu đơn giản bằng khoảng 250 tài liệu độc. Các mô hình trong thử nghiệm có từ 600 triệu đến 13 tỷ [tham số](01-nen-tang.md#parameter). Trong phạm vi này, số tài liệu cần dùng không tăng khi mô hình lớn hơn. Nghiên cứu này chưa chứng minh kết quả cho hành vi phức tạp hơn.

**Phân biệt.** Đầu độc dữ liệu tác động lúc [huấn luyện](01-nen-tang.md#training) và thay đổi mô hình. [Mẫu đối kháng](#adversarial-example) và [prompt injection gián tiếp](#indirect-prompt-injection) tác động lúc chạy và không thay đổi mô hình.

**Liên quan.** [nguồn gốc dữ liệu](02-du-lieu-va-huan-luyen.md#data-provenance) · [rủi ro chuỗi cung ứng AI](#supply-chain-risk) · [mẫu đối kháng](#adversarial-example)

**Nguồn.** [1] Anthropic, UK AI Security Institute, Alan Turing Institute, "A small number of samples can poison LLMs of any size", 9/10/2025, https://www.anthropic.com/research/small-samples-poison, truy cập 2/10/2026 (S918). [2] Vassilev et al. (NIST), NIST AI 100-2 E2025, 2025, https://csrc.nist.gov/pubs/ai/100/2/e2025/final, mục 2.3, truy cập 2/10/2026 (S901).

<a id="adversarial-example"></a>
### Adversarial example — Mẫu đối kháng

*Mã: adversarial-example · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mẫu đối kháng là một đầu vào được sửa nhỏ có chủ ý để [mô hình](01-nen-tang.md#model) trả về kết quả sai với độ tự tin cao. Con người có thể không thấy phần thay đổi.

**Giải thích.** Ví dụ kinh điển là ảnh. Kẻ tấn công sửa nhỏ các điểm ảnh của một ảnh gấu trúc. Mô hình [phân loại ảnh](04-llm-va-mo-hinh-sinh.md#image-classification) trả về tên một con vật khác. Mẫu đối kháng cũng có ở âm thanh và văn bản. Với [LLM](04-llm-va-mo-hinh-sinh.md#llm), một chuỗi ký tự trông vô nghĩa ở cuối [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) có thể làm LLM bỏ qua quy tắc an toàn. Tính đến tháng 10/2026, giữ [tỷ lệ dự đoán đúng](07-danh-gia-va-chat-luong.md#accuracy) và chống mẫu đối kháng cùng lúc vẫn là bài toán mở.

**Phân biệt.** Mẫu đối kháng tác động lúc [chạy mô hình](01-nen-tang.md#inference). [Đầu độc dữ liệu](#data-poisoning) tác động lúc [huấn luyện](01-nen-tang.md#training). Mẫu đối kháng cũng khác [ảo giác](04-llm-va-mo-hinh-sinh.md#hallucination). Ảo giác xảy ra khi không có ai tấn công.

**Liên quan.** [độ bền vững](07-danh-gia-va-chat-luong.md#robustness) · [đầu độc dữ liệu](#data-poisoning) · [red teaming](08-an-toan-va-alignment.md#red-teaming)

**Nguồn.** [1] Goodfellow, Shlens, Szegedy, "Explaining and Harnessing Adversarial Examples", 2014, https://arxiv.org/abs/1412.6572, truy cập 2/10/2026 (S914). [2] Vassilev et al. (NIST), NIST AI 100-2 E2025, 2025, https://csrc.nist.gov/pubs/ai/100/2/e2025/final, mục 2.2, truy cập 2/10/2026 (S901). [3] OWASP GenAI Security Project, "LLM01:2025 Prompt Injection", 2025, https://genai.owasp.org/llmrisk/llm01-prompt-injection/, truy cập 2/10/2026 (S902).

<a id="model-extraction"></a>
### Model extraction — Trích xuất mô hình

*Mã: model-extraction · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Trích xuất mô hình là một kiểu tấn công gửi nhiều truy vấn tới một [mô hình](01-nen-tang.md#model) qua [API](11-trien-khai-san-pham-kinh-te.md#api). Kẻ tấn công dùng các câu trả lời để dựng lại chức năng hoặc một phần thông số của mô hình.

**Giải thích.** Kẻ tấn công không cần vào máy chủ. Kẻ tấn công chỉ cần quyền gửi truy vấn như một khách hàng. Năm 2016, các nhà nghiên cứu sao chép chức năng của một số mô hình [học máy](01-nen-tang.md#machine-learning) trên dịch vụ [đám mây](11-trien-khai-san-pham-kinh-te.md#cloud) chỉ qua truy vấn. Năm 2024, một nhóm nghiên cứu lấy được một phần [tham số](01-nen-tang.md#parameter) của một số [LLM](04-llm-va-mo-hinh-sinh.md#llm) thương mại. Chi phí cho 2 mô hình nhỏ là dưới 20 USD. Biện pháp phòng vệ gồm [giới hạn tần suất](11-trien-khai-san-pham-kinh-te.md#rate-limit) và theo dõi truy vấn bất thường.

**Phân biệt.** [Chưng cất tri thức](02-du-lieu-va-huan-luyen.md#distillation) cũng dùng đầu ra của một mô hình để [huấn luyện](01-nen-tang.md#training) mô hình khác. Chưng cất tri thức là một kỹ thuật. Trích xuất mô hình là hành vi không có sự cho phép của bên sở hữu. [Ghi nhớ dữ liệu huấn luyện](#memorization) lấy ra dữ liệu, không lấy ra mô hình.

**Liên quan.** [bảo mật trọng số mô hình](#model-weights-security) · [chưng cất tri thức](02-du-lieu-va-huan-luyen.md#distillation) · [API](11-trien-khai-san-pham-kinh-te.md#api)

**Nguồn.** [1] Tramèr, Zhang, Juels, Reiter, Ristenpart, "Stealing Machine Learning Models via Prediction APIs", USENIX Security 2016, https://arxiv.org/abs/1609.02943, truy cập 2/10/2026 (S915). [2] Carlini et al., "Stealing Part of a Production Language Model", 2024, https://arxiv.org/abs/2403.06634, truy cập 2/10/2026 (S916).

<a id="side-channel"></a>
### Side channel — Kênh phụ

*Mã: side-channel · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Kênh phụ là một đường rò rỉ thông tin qua đặc điểm phụ của hệ thống, ví dụ: thời gian xử lý, độ dài gói tin. Kẻ tấn công suy ra nội dung từ các đặc điểm này.

**Phân biệt.** Mã hóa nội dung không chặn được kênh phụ. Năm 2024, các nhà nghiên cứu suy ra chủ đề của khoảng 55% câu trả lời [streaming](11-trien-khai-san-pham-kinh-te.md#streaming) chỉ từ độ dài gói tin.

**Liên quan.** [đánh cắp dữ liệu](#data-exfiltration) · [streaming](11-trien-khai-san-pham-kinh-te.md#streaming)

## 9.2 Dữ liệu cá nhân và riêng tư

<a id="personal-data-ai"></a>
### Personal data in AI systems — Dữ liệu cá nhân trong hệ thống AI

*Mã: personal-data-ai · Chương 9 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Dữ liệu cá nhân trong hệ thống AI là thông tin về một người đã xác định hoặc có thể xác định. Mục này xét thông tin đó khi thông tin đi vào, nằm lại trong, hoặc đi ra khỏi một [hệ thống AI](01-nen-tang.md#ai-system).

**Giải thích.** Dữ liệu cá nhân có thể nằm ở 5 nơi:

- [Dữ liệu huấn luyện](01-nen-tang.md#training-data): văn bản trên web, hồ sơ, ảnh có mặt người.
- [Tham số](01-nen-tang.md#parameter) của [mô hình](01-nen-tang.md#model): mô hình có thể tạo lại nguyên văn một phần dữ liệu ([ghi nhớ dữ liệu huấn luyện](#memorization)).
- [Prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) và tệp tải lên: hợp đồng, bảng lương do người dùng đưa vào.
- [Bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) của trợ lý AI: thông tin lưu cho các phiên sau.
- Nhật ký vận hành: bản ghi prompt và câu trả lời lưu để kiểm tra vi phạm.

Đọc tài liệu trong một phiên không thay đổi [trọng số](01-nen-tang.md#weight) của mô hình. Dữ liệu trong prompt chỉ đi vào mô hình khi bên cung cấp dịch vụ dùng dữ liệu đó để [huấn luyện](01-nen-tang.md#training) lại. Chính sách dùng dữ liệu của bên cung cấp quyết định điều này. Chính sách [lưu giữ dữ liệu](#data-retention) quyết định dữ liệu nằm lại bao lâu.

Tính đến tháng 10/2026, tài liệu [API](11-trien-khai-san-pham-kinh-te.md#api) của 2 nhà phát triển mô hình lớn ghi một điểm chung. Dữ liệu API không dùng để huấn luyện, trừ khi khách hàng đồng ý. Dữ liệu vẫn có thể được lưu một thời hạn để kiểm tra vi phạm.

**Ví dụ.** Văn phòng luật An Bình nhờ trợ lý AI tóm tắt hợp đồng lao động có tên và mức lương. Dữ liệu này đi vào prompt, rồi có thể nằm trong nhật ký của bên cung cấp dịch vụ. Nếu tính năng bộ nhớ đang bật, trợ lý có thể lưu một phần thông tin. Văn phòng chọn gói dịch vụ không dùng dữ liệu để huấn luyện, và xóa tên trước khi gửi.

**Phân biệt.** [PII](#pii) nhấn vào thông tin dùng để nhận dạng một người. Thuật ngữ của mục này nhìn theo vị trí: dữ liệu nằm ở đâu trong hệ thống. Khung pháp lý nằm ở mục [pháp luật bảo vệ dữ liệu cá nhân](10-phap-ly-quan-tri-chinh-sach.md#personal-data-protection-law).

**Không nên hiểu là.** Mô hình không học từ cuộc trò chuyện ngay trong phiên. Ngược lại, xóa một cuộc trò chuyện trên giao diện không chứng minh dữ liệu đã rời khỏi nhật ký của bên cung cấp.

**Giới hạn.** Dữ liệu đã đi vào tham số không xóa được bằng thao tác xóa một tệp. Che tên trong prompt không loại bỏ hết khả năng nhận dạng.

**Thay đổi gần đây.** Tính đến tháng 10/2026, nhà phát triển ghi thời hạn lưu riêng cho từng tính năng. Ví dụ: lưu tệp, [xử lý theo lô](11-trien-khai-san-pham-kinh-te.md#batch-processing), phiên làm việc của [agent](06-agent-va-tu-dong-hoa.md#ai-agent).

> **CẢNH BÁO:** Không đưa dữ liệu cá nhân của khách hàng vào công cụ AI chưa được duyệt. Dữ liệu có thể nằm lại ở bên thứ ba ngoài kiểm soát của doanh nghiệp.

**Liên quan.** [PII](#pii) · [ghi nhớ dữ liệu huấn luyện](#memorization) · [lưu giữ dữ liệu](#data-retention) · [zero data retention](#zero-data-retention) · [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) · [pháp luật bảo vệ dữ liệu cá nhân](10-phap-ly-quan-tri-chinh-sach.md#personal-data-protection-law)

**Nguồn.** [1] Carlini et al., "Extracting Training Data from Large Language Models", 2020 (bản sửa 2021), https://arxiv.org/abs/2012.07805, truy cập 2/10/2026 (S919). [2] OWASP GenAI Security Project, "LLM02:2025 Sensitive Information Disclosure", 2025, https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/, truy cập 2/10/2026 (S903). [3] OpenAI, "Data controls in the OpenAI platform", tài liệu API, https://developers.openai.com/api/docs/guides/your-data, truy cập 2/10/2026 (S937). [4] Anthropic, "API and data retention", tài liệu Claude Platform, https://platform.claude.com/docs/en/manage-claude/api-and-data-retention, truy cập 2/10/2026 (S938). [5] Liên minh châu Âu, Quy định (EU) 2016/679 (GDPR), ngày 27/4/2016, Điều 4 khoản 1, bản đọc tại https://gdpr-info.eu/art-4-gdpr/, truy cập 2/10/2026 (S924).

<a id="pii"></a>
### Personally identifiable information (PII) — Thông tin nhận dạng cá nhân

*Mã: pii · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** thông tin nhận dạng cá nhân, thông tin định danh cá nhân. Dạng chuẩn trong sách: PII.

**Định nghĩa.** PII là một loại thông tin dùng để phân biệt hoặc truy ra danh tính của một người. Thông tin này có thể dùng riêng hoặc kết hợp với thông tin khác. Ví dụ: họ tên, số căn cước, ngày sinh.

**Giải thích.** Tên PII đến từ tài liệu của cơ quan nhà nước Mỹ. Theo cách dùng này, PII gồm 2 nhóm. Nhóm thứ nhất nhận dạng trực tiếp một người. Nhóm thứ hai liên kết được với một người, ví dụ: thông tin y tế, tài chính, việc làm.

Trong [hệ thống AI](01-nen-tang.md#ai-system), công cụ lọc PII tìm và che số điện thoại, email, số tài khoản. Bước lọc này chạy trước khi dữ liệu đi vào [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) hoặc nhật ký. Công cụ lọc có thể bỏ sót PII viết theo cách lạ.

**Phân biệt.** [Pháp luật bảo vệ dữ liệu cá nhân](10-phap-ly-quan-tri-chinh-sach.md#personal-data-protection-law) của EU dùng khái niệm "dữ liệu cá nhân". Khái niệm này gồm thông tin liên quan tới một người đã xác định hoặc có thể xác định. Xem thêm [dữ liệu cá nhân trong hệ thống AI](#personal-data-ai).

**Liên quan.** [dữ liệu cá nhân trong hệ thống AI](#personal-data-ai) · [ẩn danh hóa](#anonymization) · [tối thiểu hóa dữ liệu](#data-minimization)

**Nguồn.** [1] NIST, "Personally Identifiable Information (PII)", CSRC Glossary, định nghĩa theo NIST SP 800-122, https://csrc.nist.gov/glossary/term/personally_identifiable_information, truy cập 2/10/2026 (S923). [2] Liên minh châu Âu, Quy định (EU) 2016/679 (GDPR), ngày 27/4/2016, Điều 4 khoản 1, bản đọc tại https://gdpr-info.eu/art-4-gdpr/, truy cập 2/10/2026 (S924).

<a id="anonymization"></a>
### Anonymization — Ẩn danh hóa

*Mã: anonymization · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** vô danh hóa. Mục này so sánh với giả danh hóa (pseudonymization). Dạng chuẩn trong sách: ẩn danh hóa.

**Định nghĩa.** Ẩn danh hóa là một quá trình xử lý dữ liệu để không ai còn xác định được người có dữ liệu. Điều này phải đúng cả khi kết hợp với thông tin khác bằng các cách dùng được trên thực tế.

**Giải thích.** Ẩn danh hóa khó hơn việc xóa tên. Một bảng không có tên vẫn có thể chỉ ra một người qua ngày sinh, giới tính và nơi ở. Các kỹ thuật ẩn danh hóa gồm gộp nhóm, làm mờ giá trị, thêm nhiễu và [riêng tư vi phân](#differential-privacy). Theo luật của EU, dữ liệu đã ẩn danh hóa đúng nghĩa không còn là dữ liệu cá nhân.

**Ví dụ.** Bệnh viện Hòa Bình gửi dữ liệu khám bệnh cho một công ty AI. Bệnh viện thay tên bệnh nhân bằng mã BN001 và giữ bảng nối mã với tên. Đây là giả danh hóa. Nếu bệnh viện bỏ bảng nối và gộp tuổi, nơi ở thành khoảng rộng, không ai suy ra được bệnh nhân. Đây là ẩn danh hóa.

**Phân biệt.** Giả danh hóa thay tên bằng một mã giả. Thông tin nối mã giả với người thật được giữ riêng và bảo vệ riêng. Người có thông tin này vẫn xác định được người có dữ liệu. Theo [pháp luật bảo vệ dữ liệu cá nhân](10-phap-ly-quan-tri-chinh-sach.md#personal-data-protection-law) của EU, dữ liệu giả danh hóa vẫn là dữ liệu cá nhân.

**Liên quan.** [PII](#pii) · [riêng tư vi phân](#differential-privacy) · [tối thiểu hóa dữ liệu](#data-minimization)

**Nguồn.** [1] European Data Protection Board, "Guidelines 01/2025 on Pseudonymisation" (bản lấy ý kiến), 16/1/2025, https://www.edpb.europa.eu/system/files/2025-01/edpb_guidelines_202501_pseudonymisation_en.pdf, mục 2.1, truy cập 2/10/2026 (S925). [2] Liên minh châu Âu, Quy định (EU) 2016/679 (GDPR), ngày 27/4/2016, Điều 4 khoản 5 và Đoạn mở đầu 26, bản đọc tại https://gdpr-info.eu/recitals/no-26/, truy cập 2/10/2026 (S924).

<a id="differential-privacy"></a>
### Differential privacy — Riêng tư vi phân

*Mã: differential-privacy · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Riêng tư vi phân là một khung toán học giới hạn lượng thông tin về một cá nhân mà kết quả phân tích làm lộ. Kết quả gần giống nhau dù [tập dữ liệu](01-nen-tang.md#dataset) có hay không có người đó.

**Giải thích.** Hệ thống thêm nhiễu ngẫu nhiên có kiểm soát vào kết quả phân tích. Hệ thống cũng có thể thêm nhiễu vào quá trình [huấn luyện](01-nen-tang.md#training). Một con số tên epsilon đo mức mất riêng tư. Epsilon nhỏ hơn nghĩa là bảo vệ chặt hơn và kết quả kém chính xác hơn. Khi phân tích một tập dữ liệu nhiều lần, các epsilon cộng dồn thành "ngân sách riêng tư". Trong huấn luyện, kỹ thuật này giới hạn khả năng [mô hình](01-nen-tang.md#model) làm lộ dữ liệu của từng người.

**Phân biệt.** [Ẩn danh hóa](#anonymization) biến đổi chính tập dữ liệu. Riêng tư vi phân là tính chất của quá trình phân tích, có bảo đảm đo được. Một sản phẩm ghi "có riêng tư vi phân" mà không nêu epsilon chưa cho biết mức bảo vệ thật.

**Liên quan.** [ẩn danh hóa](#anonymization) · [học liên kết](#federated-learning) · [ghi nhớ dữ liệu huấn luyện](#memorization)

**Nguồn.** [1] Near, Darais, Lefkovitz, Howarth (NIST), "Guidelines for Evaluating Differential Privacy Guarantees" (NIST SP 800-226), 2025, https://csrc.nist.gov/pubs/sp/800/226/final, mục 2.2 và 3.1, truy cập 2/10/2026 (S922).

<a id="memorization"></a>
### Memorization — Ghi nhớ dữ liệu huấn luyện

*Mã: memorization · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** trích xuất dữ liệu huấn luyện (training data extraction), học thuộc. Dạng chuẩn trong sách: ghi nhớ dữ liệu huấn luyện.

**Định nghĩa.** Ghi nhớ dữ liệu huấn luyện là một hiện tượng trong đó [mô hình](01-nen-tang.md#model) tạo lại nguyên văn một phần [dữ liệu huấn luyện](01-nen-tang.md#training-data). Tấn công trích xuất dữ liệu huấn luyện là hành vi cố ý khai thác hiện tượng này.

**Giải thích.** Mô hình không lưu dữ liệu như một cơ sở dữ liệu. Dù vậy, mô hình vẫn có thể ghi nhớ một số đoạn. Năm 2020, các nhà nghiên cứu lấy ra hàng trăm đoạn văn nguyên văn từ một [LLM](04-llm-va-mo-hinh-sinh.md#llm) công khai chỉ bằng truy vấn. Các đoạn này gồm tên, số điện thoại, email và mã nguồn. Một số đoạn chỉ xuất hiện 1 lần trong dữ liệu.

Nghiên cứu này cũng ghi nhận rằng mô hình lớn hơn làm lộ nhiều hơn. Nhà phát triển có thể lọc [PII](#pii) trước khi [huấn luyện](01-nen-tang.md#training) để giảm rủi ro.

**Phân biệt.** [Suy đoán thành viên](#membership-inference) chỉ đoán một bản ghi có trong dữ liệu huấn luyện hay không. Trích xuất dữ liệu huấn luyện lấy ra chính nội dung bản ghi. [Trích xuất mô hình](#model-extraction) lấy ra chức năng của mô hình, không lấy ra dữ liệu.

**Liên quan.** [suy đoán thành viên](#membership-inference) · [dữ liệu cá nhân trong hệ thống AI](#personal-data-ai) · [riêng tư vi phân](#differential-privacy)

**Nguồn.** [1] Carlini et al., "Extracting Training Data from Large Language Models", 2020 (bản sửa 2021), https://arxiv.org/abs/2012.07805, truy cập 2/10/2026 (S919). [2] Vassilev et al. (NIST), NIST AI 100-2 E2025, 2025, https://csrc.nist.gov/pubs/ai/100/2/e2025/final, mục 2.1.2, truy cập 2/10/2026 (S901).

<a id="membership-inference"></a>
### Membership inference — Suy đoán thành viên

*Mã: membership-inference · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Suy đoán thành viên là một kiểu tấn công vào quyền riêng tư. Kẻ tấn công dùng đầu ra của [mô hình](01-nen-tang.md#model) để đoán một bản ghi có nằm trong [dữ liệu huấn luyện](01-nen-tang.md#training-data) hay không.

**Phân biệt.** Kỹ thuật này không lấy ra nội dung bản ghi. Nhưng kết quả vẫn có thể làm lộ thông tin, ví dụ: một người từng khám tại một bệnh viện. [Ghi nhớ dữ liệu huấn luyện](#memorization) lấy ra chính nội dung.

**Liên quan.** [ghi nhớ dữ liệu huấn luyện](#memorization) · [riêng tư vi phân](#differential-privacy)

<a id="federated-learning"></a>
### Federated learning — Học liên kết

*Mã: federated-learning · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học liên kết là một phương pháp [huấn luyện](01-nen-tang.md#training) giữ dữ liệu lại trên máy của từng bên. Mỗi bên tính bản cập nhật cho [mô hình](01-nen-tang.md#model) tại chỗ. Máy chủ trung tâm chỉ nhận và gộp các bản cập nhật.

**Phân biệt.** Học liên kết tránh gom dữ liệu thô về một nơi. Bản cập nhật vẫn có thể làm lộ thông tin. Học liên kết có thể đi kèm [riêng tư vi phân](#differential-privacy).

**Liên quan.** [riêng tư vi phân](#differential-privacy) · [tối thiểu hóa dữ liệu](#data-minimization)

<a id="data-minimization"></a>
### Data minimization — Tối thiểu hóa dữ liệu

*Mã: data-minimization · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tối thiểu hóa dữ liệu là một nguyên tắc chỉ thu thập và xử lý lượng dữ liệu cá nhân đủ cho mục đích đã nêu. Với AI, nguyên tắc này áp dụng cho dữ liệu [huấn luyện](01-nen-tang.md#training), [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) và nhật ký.

**Phân biệt.** Tối thiểu hóa dữ liệu giới hạn lượng dữ liệu thu vào. [Lưu giữ dữ liệu](#data-retention) giới hạn thời gian giữ dữ liệu.

**Liên quan.** [lưu giữ dữ liệu](#data-retention) · [PII](#pii) · [pháp luật bảo vệ dữ liệu cá nhân](10-phap-ly-quan-tri-chinh-sach.md#personal-data-protection-law)

<a id="consent-data-use"></a>
### Consent for data use — Đồng ý cho dùng dữ liệu

*Mã: consent-data-use · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Đồng ý cho dùng dữ liệu là một sự cho phép tự nguyện, cụ thể, có đủ thông tin và rõ ràng của một người. Người đó cho phép bên khác xử lý dữ liệu cá nhân của mình cho một mục đích nêu trước.

**Phân biệt.** Đồng ý cho một mục đích không tự mở rộng sang việc [huấn luyện](01-nen-tang.md#training) AI. [Tín hiệu từ chối thu thập](02-du-lieu-va-huan-luyen.md#opt-out-signal) là cơ chế của trang web, không phải sự đồng ý của người có dữ liệu.

**Liên quan.** [tín hiệu từ chối thu thập](02-du-lieu-va-huan-luyen.md#opt-out-signal) · [pháp luật bảo vệ dữ liệu cá nhân](10-phap-ly-quan-tri-chinh-sach.md#personal-data-protection-law)

<a id="data-retention"></a>
### Data retention — Lưu giữ dữ liệu

*Mã: data-retention · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Lưu giữ dữ liệu là một chính sách quy định dữ liệu nào được lưu, lưu ở đâu, lưu bao lâu và khi nào xóa. Với dịch vụ AI, chính sách này áp dụng cho [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt), câu trả lời và tệp.

**Phân biệt.** Dữ liệu lưu để vận hành khác dữ liệu dùng để [huấn luyện](01-nen-tang.md#training). Một dịch vụ có thể lưu dữ liệu 30 ngày mà không dùng dữ liệu đó để huấn luyện.

**Liên quan.** [zero data retention](#zero-data-retention) · [tối thiểu hóa dữ liệu](#data-minimization) · [nơi lưu trú dữ liệu](#data-residency)

<a id="zero-data-retention"></a>
### Zero data retention (ZDR) — Không lưu giữ dữ liệu

*Mã: zero-data-retention · Chương 9 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** không lưu giữ dữ liệu, ZDR. Dạng chuẩn trong sách: zero data retention.

**Định nghĩa.** Zero data retention là một chế độ dịch vụ trong đó bên cung cấp [API](11-trien-khai-san-pham-kinh-te.md#api) AI không lưu [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) và câu trả lời sau khi trả kết quả. Chế độ này có các ngoại lệ ghi trong thỏa thuận.

**Giải thích.** Ở chế độ thông thường, dịch vụ API có thể lưu prompt và câu trả lời một thời hạn để phát hiện vi phạm. Tính đến tháng 10/2026, tài liệu của 2 nhà phát triển [mô hình](01-nen-tang.md#model) lớn cho thấy các điểm sau:

- Zero data retention là thỏa thuận riêng, không phải chế độ mặc định.
- Một số tính năng nằm ngoài phạm vi, ví dụ: lưu tệp, [xử lý theo lô](11-trien-khai-san-pham-kinh-te.md#batch-processing).
- Một nhà phát triển ghi rằng dữ liệu vẫn được lưu khi pháp luật yêu cầu. Dữ liệu cũng được lưu khi hệ thống an toàn gắn cờ một phiên.

**Phân biệt.** Zero data retention khác cam kết không dùng dữ liệu để [huấn luyện](01-nen-tang.md#training). Một dịch vụ có thể không huấn luyện trên dữ liệu nhưng vẫn lưu dữ liệu 30 ngày. Zero data retention cũng khác [nơi lưu trú dữ liệu](#data-residency), vốn quy định vị trí lưu.

**Thay đổi gần đây.** Tính đến tháng 10/2026, nhà phát triển ghi phạm vi zero data retention theo từng tính năng.

> **THẬN TRỌNG:** Kiểm tra danh sách tính năng thuộc phạm vi zero data retention trước khi gửi dữ liệu nhạy cảm. Tính năng ngoài danh sách vẫn lưu dữ liệu.

**Liên quan.** [lưu giữ dữ liệu](#data-retention) · [nơi lưu trú dữ liệu](#data-residency) · [dữ liệu cá nhân trong hệ thống AI](#personal-data-ai)

**Nguồn.** [1] OpenAI, "Data controls in the OpenAI platform", tài liệu API, https://developers.openai.com/api/docs/guides/your-data, truy cập 2/10/2026 (S937). [2] Anthropic, "API and data retention", tài liệu Claude Platform, https://platform.claude.com/docs/en/manage-claude/api-and-data-retention, truy cập 2/10/2026 (S938).

<a id="data-residency"></a>
### Data residency — Nơi lưu trú dữ liệu

*Mã: data-residency · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Nơi lưu trú dữ liệu là một tùy chọn dịch vụ quy định quốc gia hoặc [vùng lưu trữ](11-trien-khai-san-pham-kinh-te.md#region) nơi dữ liệu của khách hàng được lưu. Một số dịch vụ còn cam kết xử lý dữ liệu tại vùng đó.

**Phân biệt.** Nơi lưu trú dữ liệu là lựa chọn của khách hàng. [Bản địa hóa dữ liệu](10-phap-ly-quan-tri-chinh-sach.md#data-localization) là yêu cầu của pháp luật. Một dịch vụ có thể lưu dữ liệu ở một vùng nhưng [chạy mô hình](01-nen-tang.md#inference) ở vùng khác.

**Liên quan.** [vùng lưu trữ](11-trien-khai-san-pham-kinh-te.md#region) · [bản địa hóa dữ liệu](10-phap-ly-quan-tri-chinh-sach.md#data-localization) · [zero data retention](#zero-data-retention)

## 9.3 Nội dung giả và xác thực

<a id="synthetic-media"></a>
### Synthetic media — Nội dung tổng hợp

*Mã: synthetic-media · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** synthetic content, nội dung do AI tạo. Dạng chuẩn trong sách: nội dung tổng hợp.

**Định nghĩa.** Nội dung tổng hợp là một ảnh, video, âm thanh hoặc văn bản do [thuật toán](01-nen-tang.md#algorithm) tạo ra hoặc sửa đổi đáng kể. Thuật toán đó có thể là [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai).

**Giải thích.** Nội dung tổng hợp có nhiều mục đích hợp pháp, ví dụ: lồng tiếng phim, ảnh minh họa. Một số nội dung tổng hợp gây hại, ví dụ: giả mạo người thật, giấy tờ giả. Các công cụ quản lý nội dung tổng hợp gồm [nguồn gốc nội dung](#content-provenance), [thủy vân](#watermarking) và [nhãn nội dung do AI tạo](#ai-content-label).

**Phân biệt.** [Deepfake](#deepfake) là một phần của nội dung tổng hợp. Deepfake giống người hoặc sự kiện có thật và làm người xem tin là thật. Nội dung tổng hợp có khai báo và có sự đồng ý của người được mô phỏng không có tính lừa dối đó. [Dữ liệu tổng hợp](02-du-lieu-va-huan-luyen.md#synthetic-data) là dữ liệu dùng để tạo [mô hình](01-nen-tang.md#model), không phải nội dung cho người xem.

**Liên quan.** [deepfake](#deepfake) · [nguồn gốc nội dung](#content-provenance) · [nhãn nội dung do AI tạo](#ai-content-label) · [làn sóng nội dung tổng hợp](12-xa-hoi-va-tuong-lai.md#synthetic-content-flood)

**Nguồn.** [1] NIST, "Reducing Risks Posed by Synthetic Content: An Overview of Technical Approaches to Digital Content Transparency" (NIST AI 100-4), 2024, https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf, mục 1 và 5, truy cập 2/10/2026 (S928).

<a id="deepfake"></a>
### Deepfake — Nội dung giả mạo bằng AI

*Mã: deepfake · Chương 9 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** nội dung giả mạo bằng AI, deep fake. Dạng chuẩn trong sách: deepfake.

**Định nghĩa.** Deepfake là một ảnh, đoạn âm thanh hoặc video do AI tạo ra hoặc chỉnh sửa. Nội dung này giống người, vật, nơi chốn hoặc sự kiện có thật, và có thể làm người xem tin là thật.

**Giải thích.** Deepfake có 4 dạng chính:

- Hoán đổi khuôn mặt: ghép mặt của một người vào video của người khác.
- Thay biểu cảm: làm một người nói câu người đó chưa nói, có dùng [khớp khẩu hình](04-llm-va-mo-hinh-sinh.md#lip-sync).
- Tạo mới: tạo khuôn mặt hoặc cảnh không có thật.
- Giả giọng: tạo giọng nói giống một người bằng [nhân bản giọng nói](#voice-cloning).

Deepfake gây hại theo nhiều cách. Kẻ lừa đảo giả mặt hoặc giọng của lãnh đạo, người thân để đòi chuyển tiền. Kẻ gian lận dùng ảnh và video giả để mở tài khoản ([gian lận danh tính bằng AI](#ai-identity-fraud)). Ảnh thân mật giả tạo ra khi không có sự đồng ý gây hại cho danh dự của người trong ảnh.

**Ví dụ.** Ví dụ giả định. Kế toán của Công ty An Bình nhận cuộc gọi video từ một người giống giám đốc. Người này yêu cầu chuyển gấp 2 tỷ đồng cho một đối tác mới. Kế toán gọi lại giám đốc qua số đã lưu và phát hiện cuộc gọi đầu là deepfake.

**Phân biệt.** Deepfake khác [nội dung tổng hợp](#synthetic-media) nói chung. Ví dụ, một video quảng cáo dùng gương mặt số của một diễn viên. Video có hợp đồng, có sự đồng ý và có nhãn. Đây là nội dung tổng hợp có khai báo, không làm người xem tin sai. Deepfake gắn với tính lừa dối.

**Không nên hiểu là.** Deepfake không đồng nghĩa với nội dung do AI tạo. Một ảnh phong cảnh do AI vẽ, không giống sự kiện có thật nào, không phải deepfake. Nhãn "do AI tạo" trên video giả mạo không thay thế sự đồng ý của người được mô phỏng.

**Giới hạn.** Công cụ phát hiện deepfake có độ tin cậy giới hạn. Độ chính xác giảm khi deepfake đến từ một công cụ tạo lạ. Độ chính xác cũng giảm khi video đã nén lại. Một nghiên cứu năm 2024 ghi nhận con người phát hiện ảnh, video và âm thanh do AI tạo chỉ gần mức đoán ngẫu nhiên.

> **CẢNH BÁO:** Xác nhận lệnh chuyển tiền gấp qua một kênh liên lạc thứ hai. Giọng nói và hình ảnh trong cuộc gọi có thể là deepfake.

**Liên quan.** [nội dung tổng hợp](#synthetic-media) · [nhân bản giọng nói](#voice-cloning) · [gian lận danh tính bằng AI](#ai-identity-fraud) · [nguồn gốc nội dung](#content-provenance) · [luật về deepfake trong bầu cử](10-phap-ly-quan-tri-chinh-sach.md#election-deepfake-laws) · [nghĩa vụ minh bạch](10-phap-ly-quan-tri-chinh-sach.md#transparency-obligation)

**Nguồn.** [1] Liên minh châu Âu, Quy định (EU) 2024/1689 (EU AI Act), ngày 13/6/2024, Điều 3 khoản 60, https://eur-lex.europa.eu/eli/reg/2024/1689/oj, đối chiếu qua bản đọc https://artificialintelligenceact.eu/article/3/, truy cập 2/10/2026 (S001, S934). [2] NIST, "Reducing Risks Posed by Synthetic Content" (NIST AI 100-4), 2024, https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf, mục 3.2.2 và 5, truy cập 2/10/2026 (S928). [3] FinCEN (Bộ Tài chính Mỹ), "FinCEN Alert on Fraud Schemes Involving Deepfake Media Targeting Financial Institutions" (FIN-2024-Alert004), 13/11/2024, https://www.fincen.gov/sites/default/files/shared/FinCEN-Alert-DeepFakes-Alert508FINAL.pdf, truy cập 2/10/2026 (S935).

<a id="voice-cloning"></a>
### Voice cloning — Nhân bản giọng nói

*Mã: voice-cloning · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Nhân bản giọng nói là một kỹ thuật dùng AI tạo giọng nói giống giọng của một người thật, từ mẫu ghi âm của người đó. Hệ thống sau đó đọc văn bản bất kỳ bằng giọng này.

**Phân biệt.** Nhân bản giọng nói có sự đồng ý có mục đích hợp pháp, ví dụ: lồng tiếng. Khi giọng nhân bản dùng để lừa người nghe, kết quả là một [deepfake](#deepfake) âm thanh.

**Liên quan.** [deepfake](#deepfake) · [gian lận danh tính bằng AI](#ai-identity-fraud)

<a id="ai-identity-fraud"></a>
### Identity fraud with AI — Gian lận danh tính bằng AI

*Mã: ai-identity-fraud · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Gian lận danh tính bằng AI là một hành vi dùng [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai) để vượt qua bước xác minh khách hàng. Kẻ gian lận giả danh người thật hoặc tạo danh tính giả, ví dụ: giấy tờ giả, video [deepfake](#deepfake).

**Phân biệt.** Deepfake là một công cụ. Gian lận danh tính là hành vi dùng công cụ đó để qua mặt bước xác minh khi mở tài khoản.

**Liên quan.** [deepfake](#deepfake) · [nhân bản giọng nói](#voice-cloning)

<a id="content-provenance"></a>
### Content provenance — Nguồn gốc nội dung

*Mã: content-provenance · Chương 9 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Nguồn gốc nội dung là một tập thông tin ghi lại người hoặc công cụ tạo ra một nội dung số. Thông tin này ghi cả thời điểm tạo và các lần sửa, để người xem kiểm tra lịch sử.

**Giải thích.** Có 2 cách chính để gắn nguồn gốc vào nội dung. Cách thứ nhất là siêu dữ liệu có chữ ký số, nằm trong tệp hoặc ở kho bên ngoài. Chữ ký số giúp phát hiện sửa đổi. Cách thứ hai là [thủy vân](#watermarking), tức tín hiệu nằm ngay trong điểm ảnh, âm thanh hoặc từ ngữ. Chuẩn [chứng chỉ nội dung](#c2pa) dùng cả 2 cách.

Nguồn gốc nội dung áp dụng cho cả nội dung do người tạo và do AI tạo. Một máy ảnh có thể ký ảnh lúc chụp. Một công cụ [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai) có thể ghi rằng ảnh do AI tạo.

**Ví dụ.** Báo Sông Hồng nhận một ảnh hiện trường từ cộng tác viên. Biên tập viên kiểm tra chứng chỉ nội dung của ảnh. Chứng chỉ cho thấy máy ảnh đã ký ảnh, rồi một phần mềm cắt khung ảnh. Biên tập viên vẫn kiểm tra người chụp và địa điểm trước khi đăng.

**Phân biệt.** Nguồn gốc nội dung ghi lại nội dung đến từ đâu. Công cụ phát hiện, ví dụ [phát hiện văn bản do AI viết](#ai-text-detection), chỉ đoán từ đặc điểm của nội dung. [Nguồn gốc dữ liệu](02-du-lieu-va-huan-luyen.md#data-provenance) nói về dữ liệu dùng để tạo [mô hình](01-nen-tang.md#model).

**Không nên hiểu là.** Nguồn gốc hợp lệ không chứng minh nội dung đúng sự thật. Chữ ký chỉ xác nhận bên ký và cho thấy tệp chưa đổi sau khi ký. Một người có thể chụp cảnh dàn dựng và ký ảnh hợp lệ. Thiếu thông tin nguồn gốc cũng không chứng minh nội dung là giả.

**Giới hạn.** Siêu dữ liệu có thể mất khi người dùng chụp màn hình hoặc chuyển định dạng. Hệ thống chỉ có ích khi công cụ tạo, nền tảng và công cụ xem cùng hỗ trợ một chuẩn. Năm 2026, một nhóm nhà nghiên cứu cho rằng chuẩn chứng chỉ nội dung chưa đạt các mục tiêu bảo mật đã nêu.

**Thay đổi gần đây.** Tính đến tháng 10/2026, đặc tả chứng chỉ nội dung có phiên bản 2.4, công bố tháng 4/2026. Quy định về minh bạch nằm ở mục [nghĩa vụ minh bạch](10-phap-ly-quan-tri-chinh-sach.md#transparency-obligation). Quy định Việt Nam nằm ở mục [nhãn nội dung AI theo pháp luật Việt Nam](10-phap-ly-quan-tri-chinh-sach.md#vn-ai-content-label).

> **THẬN TRỌNG:** Không dùng chứng chỉ nội dung làm bằng chứng duy nhất về sự thật. Chứng chỉ chỉ xác nhận lịch sử của tệp.

**Liên quan.** [chứng chỉ nội dung](#c2pa) · [thủy vân](#watermarking) · [deepfake](#deepfake) · [nhãn nội dung do AI tạo](#ai-content-label) · [nguồn gốc dữ liệu](02-du-lieu-va-huan-luyen.md#data-provenance)

**Nguồn.** [1] C2PA, "Content Credentials: C2PA Technical Specification", phiên bản 2.4, 2026, https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html, truy cập 2/10/2026 (S927). [2] NIST, "Reducing Risks Posed by Synthetic Content" (NIST AI 100-4), 2024, https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf, mục 3.1, truy cập 2/10/2026 (S928). [3] Golaszewski et al., "Verifying Provenance of Digital Media: Why the C2PA Specifications Fall Short", 2026, https://arxiv.org/abs/2604.24890, truy cập 2/10/2026 (S929).

<a id="c2pa"></a>
### Content credentials (C2PA) — Chứng chỉ nội dung

*Mã: c2pa · Chương 9 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** Content Credentials, C2PA (Coalition for Content Provenance and Authenticity). Dạng chuẩn trong sách: chứng chỉ nội dung.

**Định nghĩa.** Chứng chỉ nội dung là một chuẩn kỹ thuật mở của liên minh C2PA. Chuẩn này gắn thông tin [nguồn gốc nội dung](#content-provenance) có chữ ký số vào ảnh, video, âm thanh và tài liệu.

**Giải thích.** Chuẩn này kết nối 3 bên: công cụ tạo nội dung, nền tảng phát nội dung, công cụ kiểm tra. Mỗi công cụ ghi một bản kê (manifest) gồm các khẳng định. Ví dụ: công cụ tạo, thời điểm, nội dung chụp thật hay do AI tạo. Công cụ ký bản kê bằng chứng thư số.

Công cụ kiểm tra so chứng thư với một danh sách bên ký tin cậy. Mã băm của nội dung giúp phát hiện sửa đổi. [Thủy vân](#watermarking) giúp tìm lại bản kê khi tệp mất siêu dữ liệu.

**Phân biệt.** Chuẩn này chỉ xác nhận bản kê gắn đúng với nội dung và không có dấu hiệu sửa. Chuẩn này không phán xét nội dung đúng hay sai. [Nhãn nội dung do AI tạo](#ai-content-label) là thông báo cho người xem. Chứng chỉ nội dung là dữ liệu cho máy đọc.

**Thay đổi gần đây.** Tính đến tháng 10/2026, phiên bản đặc tả công bố sau cùng là 2.4 (tháng 4/2026). Phiên bản 2.3 có ngày 5/1/2026.

**Liên quan.** [nguồn gốc nội dung](#content-provenance) · [thủy vân](#watermarking) · [nhãn nội dung do AI tạo](#ai-content-label)

**Nguồn.** [1] C2PA, "Content Credentials: C2PA Technical Specification", phiên bản 2.4, 2026, https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html, truy cập 2/10/2026 (S927). [2] C2PA, "Content Credentials: C2PA Technical Specification", phiên bản 2.3, 5/1/2026, https://spec.c2pa.org/specifications/specifications/2.3/specs/_attachments/C2PA_Specification.pdf, truy cập 2/10/2026 (S944).

<a id="watermarking"></a>
### Watermarking — Thủy vân

*Mã: watermarking · Chương 9 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** watermark, đánh dấu ẩn. Dạng chuẩn trong sách: thủy vân.

**Định nghĩa.** Thủy vân là một tín hiệu nhúng trực tiếp vào nội dung để xác định nguồn của nội dung, ví dụ: trong điểm ảnh hoặc cách chọn từ. Trong AI, thủy vân đánh dấu nội dung do một [mô hình](01-nen-tang.md#model) tạo ra.

**Giải thích.** Thủy vân có 2 loại. Thủy vân hiện là dấu con người thấy được, ví dụ: logo ở góc video. Thủy vân ẩn là thay đổi nhỏ mà chỉ phần mềm phát hiện được.

Với văn bản, thủy vân ẩn hoạt động ở bước [lấy mẫu](04-llm-va-mo-hinh-sinh.md#sampling). Ở mỗi bước, hệ thống dùng một khóa bí mật để chọn một nhóm [token](03-kien-truc-mo-hinh.md#token) ưu tiên. Hệ thống tăng nhẹ khả năng chọn các token này. Một văn bản đủ dài có tỷ lệ token ưu tiên cao bất thường. Công cụ kiểm tra có khóa tính tỷ lệ này và trả về mức tin cậy thống kê.

**Ví dụ.** Một nhà phát triển nhúng thủy vân ẩn vào văn bản do [LLM](04-llm-va-mo-hinh-sinh.md#llm) của mình tạo ra. Cô Hà, giáo viên ở Huế, nghi một bài luận do AI viết. Công cụ của nhà phát triển chỉ cho biết bài có thủy vân của mô hình đó hay không. Nếu học sinh viết lại bằng lời của mình, công cụ có thể không phát hiện được.

**Phân biệt.** Thủy vân nằm trong chính nội dung. [Chứng chỉ nội dung](#c2pa) và siêu dữ liệu nằm cạnh nội dung. [Phát hiện văn bản do AI viết](#ai-text-detection) không dựa vào tín hiệu nhúng sẵn. Công cụ đó chỉ đoán từ đặc điểm của văn bản.

**Không nên hiểu là.** Thủy vân không khẳng định nội dung đúng hay sai. Thủy vân chỉ cho biết nội dung đến từ một công cụ có nhúng thủy vân. Không tìm thấy thủy vân không chứng minh nội dung do người tạo.

**Giới hạn.** Thủy vân văn bản yếu đi khi người dùng diễn đạt lại. Thủy vân cũng khó phát hiện trong văn bản ngắn. Kẻ tấn công có thể gỡ thủy vân ảnh bằng một mô hình [huấn luyện](01-nen-tang.md#training) riêng cho việc này. Kẻ tấn công cũng có thể giả thủy vân để gán nội dung cho nguồn khác.

**Thay đổi gần đây.** Tháng 10/2024, một nhà phát triển lớn công bố trên tạp chí khoa học một hệ thống thủy vân văn bản. Hệ thống này đã chạy trong sản phẩm [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) của nhà phát triển đó. Quy định về đánh dấu nội dung AI nằm ở mục [nghĩa vụ minh bạch](10-phap-ly-quan-tri-chinh-sach.md#transparency-obligation).

> **THẬN TRỌNG:** Không dùng việc thiếu thủy vân làm bằng chứng nội dung do người tạo. Mô hình không nhúng thủy vân tạo ra nội dung không có dấu.

**Liên quan.** [nguồn gốc nội dung](#content-provenance) · [chứng chỉ nội dung](#c2pa) · [phát hiện văn bản do AI viết](#ai-text-detection) · [nhãn nội dung do AI tạo](#ai-content-label) · [lấy mẫu](04-llm-va-mo-hinh-sinh.md#sampling)

**Nguồn.** [1] NIST, "Reducing Risks Posed by Synthetic Content" (NIST AI 100-4), 2024, https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf, mục 3.1.1, truy cập 2/10/2026 (S928). [2] Kirchenbauer, Geiping, Wen, Katz, Miers, Goldstein, "A Watermark for Large Language Models", ICML 2023, https://arxiv.org/abs/2301.10226, truy cập 2/10/2026 (S930). [3] Dathathri et al., "Scalable watermarking for identifying large language model outputs", Nature 634, 23/10/2024, https://www.nature.com/articles/s41586-024-08025-4, truy cập 2/10/2026 (S931).

<a id="ai-content-label"></a>
### AI-generated content label — Nhãn nội dung do AI tạo

*Mã: ai-content-label · Chương 9 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** nhãn AI, nhãn "do AI tạo". Dạng chuẩn trong sách: nhãn nội dung do AI tạo.

**Định nghĩa.** Nhãn nội dung do AI tạo là một thông báo cho người xem rằng nội dung được tạo ra hoặc sửa đáng kể bằng AI. Nhãn có thể là dòng chữ, biểu tượng hoặc lời nói đầu đoạn âm thanh.

**Giải thích.** Nhãn hướng tới con người. [Thủy vân](#watermarking) và [chứng chỉ nội dung](#c2pa) hướng tới máy. Một nền tảng có thể đọc chứng chỉ hoặc thủy vân rồi tự hiển thị nhãn. Người tạo nội dung, công cụ tạo nội dung hoặc nền tảng chia sẻ đều có thể gắn nhãn. Quy định Việt Nam nằm ở mục [nhãn nội dung AI theo pháp luật Việt Nam](10-phap-ly-quan-tri-chinh-sach.md#vn-ai-content-label). Quy định EU nằm ở mục [nghĩa vụ minh bạch](10-phap-ly-quan-tri-chinh-sach.md#transparency-obligation).

**Phân biệt.** Nhãn là thông báo, không phải bằng chứng kỹ thuật. Người đăng có thể gỡ nhãn hoặc gắn nhãn sai. Thủy vân khó gỡ hơn nhãn, nhưng vẫn gỡ được.

**Thay đổi gần đây.** Tính đến tháng 10/2026, quy định ở EU và Việt Nam đặt nghĩa vụ ghi nhãn cho một số loại nội dung do AI tạo. Chi tiết nằm ở Chương 10.

**Liên quan.** [thủy vân](#watermarking) · [chứng chỉ nội dung](#c2pa) · [nhãn nội dung AI theo pháp luật Việt Nam](10-phap-ly-quan-tri-chinh-sach.md#vn-ai-content-label) · [nghĩa vụ minh bạch](10-phap-ly-quan-tri-chinh-sach.md#transparency-obligation)

**Nguồn.** [1] NIST, "Reducing Risks Posed by Synthetic Content" (NIST AI 100-4), 2024, https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf, mục 3.1 và 3.3, truy cập 2/10/2026 (S928). [2] White & Case, "EU AI Omnibus enters into force, amending the AI Act", 2026, https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act, truy cập 2/10/2026 (S007). [3] AP Law (Japan), "[Vietnam Legal Update] Các điểm mới quan trọng của nghị định hướng dẫn Luật Trí tuệ nhân tạo", 28/5/2026, https://www.aplawjapan.com/en/newsletter/20260528-2, truy cập 2/10/2026 (S009).

<a id="ai-text-detection"></a>
### AI text detection — Phát hiện văn bản do AI viết

*Mã: ai-text-detection · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Phát hiện văn bản do AI viết là một kỹ thuật đoán nguồn của một văn bản: người viết hay [LLM](04-llm-va-mo-hinh-sinh.md#llm). Kỹ thuật này dựa trên đặc điểm thống kê của văn bản.

**Phân biệt.** Kết quả của kỹ thuật này có độ tin cậy thấp. Công cụ có thể báo nhầm bài của người viết bằng ngoại ngữ.

> **CẢNH BÁO:** Không dùng kết quả này làm bằng chứng duy nhất trong kỷ luật hoặc tranh chấp.

**Liên quan.** [thủy vân](#watermarking) · [nguồn gốc nội dung](#content-provenance)

## 9.4 Vận hành an toàn trong doanh nghiệp

<a id="shadow-ai"></a>
### Shadow AI — AI ngoài kiểm soát

*Mã: shadow-ai · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** AI ngoài kiểm soát, AI ngầm. Dạng chuẩn trong sách: shadow AI.

**Định nghĩa.** Shadow AI là một tình trạng trong đó nhân viên dùng công cụ AI cho công việc mà tổ chức chưa duyệt. Bộ phận công nghệ thông tin không giám sát các công cụ này.

**Giải thích.** Shadow AI là một dạng của "shadow IT", tức phần mềm dùng ngoài danh mục được duyệt. Rủi ro riêng của shadow AI đến từ dữ liệu.

Nhân viên có thể dán hợp đồng hoặc dữ liệu khách hàng vào một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) công cộng. Dữ liệu này có thể nằm trong nhật ký của bên cung cấp dịch vụ. Dữ liệu cũng có thể đi vào [dữ liệu huấn luyện](01-nen-tang.md#training-data) nếu gói dịch vụ cho phép. Shadow AI có thể gồm cả [agent](06-agent-va-tu-dong-hoa.md#ai-agent) hoặc [connector](06-agent-va-tu-dong-hoa.md#connector) do nhân viên tự cài. Biện pháp xử lý thuộc [quản trị AI](10-phap-ly-quan-tri-chinh-sach.md#ai-governance), ví dụ: danh mục công cụ được duyệt.

**Phân biệt.** Shadow AI là vấn đề quản trị nội bộ. [Bảo mật AI](#ai-security) xử lý hành động cố ý của kẻ tấn công. Người dùng shadow AI có thể không có ý gây hại.

**Liên quan.** [quản trị AI](10-phap-ly-quan-tri-chinh-sach.md#ai-governance) · [dữ liệu cá nhân trong hệ thống AI](#personal-data-ai) · [bảo mật AI](#ai-security)

**Nguồn.** [1] Krantz, Jonker, McGrath (IBM), "What is shadow AI?", IBM Think, 25/10/2024, https://www.ibm.com/think/topics/shadow-ai, truy cập 2/10/2026 (S940).

<a id="least-privilege"></a>
### Least privilege — Quyền tối thiểu

*Mã: least-privilege · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Quyền tối thiểu là một nguyên tắc bảo mật: mỗi người dùng hoặc chương trình chỉ nhận các quyền cần cho nhiệm vụ. Với [agent](06-agent-va-tu-dong-hoa.md#ai-agent), nguyên tắc này giới hạn công cụ, dữ liệu và thao tác mà agent dùng được.

**Phân biệt.** Quyền tối thiểu quyết định agent được làm gì. [Cổng phê duyệt](06-agent-va-tu-dong-hoa.md#permission) quyết định khi nào con người phải duyệt. [Sandbox](06-agent-va-tu-dong-hoa.md#sandbox-co-lap) giới hạn nơi agent chạy.

**Liên quan.** [cổng phê duyệt](06-agent-va-tu-dong-hoa.md#permission) · [sandbox](06-agent-va-tu-dong-hoa.md#sandbox-co-lap) · [prompt injection](#prompt-injection)

<a id="model-weights-security"></a>
### Model weights security — Bảo mật trọng số mô hình

*Mã: model-weights-security · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Bảo mật trọng số mô hình là một tập biện pháp bảo vệ tệp [trọng số](01-nen-tang.md#weight) của một [mô hình](01-nen-tang.md#model). Các biện pháp này chống đánh cắp, sao chép trái phép và sửa đổi trái phép.

**Giải thích.** Trọng số chứa kết quả của quá trình [huấn luyện](01-nen-tang.md#training) tốn nhiều tiền và [năng lực tính toán](01-nen-tang.md#compute). Người có trọng số có thể [chạy mô hình](01-nen-tang.md#inference) mà không qua [guardrail](08-an-toan-va-alignment.md#guardrail) của nhà phát triển. Năm 2024, một báo cáo nghiên cứu liệt kê 38 hướng tấn công vào trọng số. Kẻ tấn công trải từ tội phạm cơ hội tới nhóm có nhà nước hậu thuẫn. Báo cáo đề xuất 5 mức bảo mật và cho rằng một biện pháp đơn lẻ không đủ.

**Phân biệt.** Với [mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights), nhà phát triển chủ động công bố trọng số. Khi đó, mục tiêu chuyển sang bảo vệ tính toàn vẹn của tệp tải về. [Trích xuất mô hình](#model-extraction) lấy thông tin qua [API](11-trien-khai-san-pham-kinh-te.md#api), không cần lấy tệp trọng số.

**Liên quan.** [trích xuất mô hình](#model-extraction) · [rủi ro chuỗi cung ứng AI](#supply-chain-risk) · [mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights)

**Nguồn.** [1] Nevo, Lahav, Karpur, Bar-On, Bradley, Alstott (RAND), "Securing AI Model Weights: Preventing Theft and Misuse of Frontier Models", 30/5/2024, https://www.rand.org/pubs/research_reports/RRA2849-1.html, truy cập 2/10/2026 (S939).

<a id="supply-chain-risk"></a>
### Supply-chain risk — Rủi ro chuỗi cung ứng AI

*Mã: supply-chain-risk · Chương 9 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** rủi ro chuỗi cung ứng (mô hình, tập dữ liệu, plugin). Dạng chuẩn trong sách: rủi ro chuỗi cung ứng AI.

**Định nghĩa.** Rủi ro chuỗi cung ứng AI là một rủi ro đến từ thành phần mà doanh nghiệp lấy từ bên ngoài để xây ứng dụng AI. Ví dụ: [mô hình](01-nen-tang.md#model) có sẵn, [tập dữ liệu](01-nen-tang.md#dataset), thư viện phần mềm, plugin.

**Giải thích.** Một mô hình tải về có thể chứa cửa hậu mà kiểm tra thông thường không phát hiện. Một [adapter](03-kien-truc-mo-hinh.md#adapter) [LoRA](03-kien-truc-mo-hinh.md#lora) độc hại có thể làm hỏng một mô hình an toàn. Tập dữ liệu mua ngoài có thể chứa dữ liệu độc ([đầu độc dữ liệu](#data-poisoning)). Plugin hoặc máy chủ [MCP](06-agent-va-tu-dong-hoa.md#mcp) của bên thứ ba chạy với quyền mà [agent](06-agent-va-tu-dong-hoa.md#ai-agent) cấp. Điều khoản [giấy phép mô hình](11-trien-khai-san-pham-kinh-te.md#model-license) có thể giới hạn mục đích thương mại. Biện pháp gồm lấy thành phần từ nguồn tin cậy, kiểm tra mã băm và [ghim phiên bản](11-trien-khai-san-pham-kinh-te.md#version-pinning).

**Phân biệt.** Rủi ro chuỗi cung ứng nói về nơi thành phần đến. Đầu độc dữ liệu là một kỹ thuật tấn công có thể đi qua chuỗi cung ứng.

**Liên quan.** [đầu độc dữ liệu](#data-poisoning) · [bảo mật trọng số mô hình](#model-weights-security) · [ghim phiên bản](11-trien-khai-san-pham-kinh-te.md#version-pinning)

**Nguồn.** [1] OWASP GenAI Security Project, "LLM03:2025 Supply Chain", 2025, https://genai.owasp.org/llmrisk/llm032025-supply-chain/, truy cập 2/10/2026 (S904). [2] Vassilev et al. (NIST), NIST AI 100-2 E2025, 2025, https://csrc.nist.gov/pubs/ai/100/2/e2025/final, mục 2.3.4, truy cập 2/10/2026 (S901).

<a id="confidential-computing"></a>
### Confidential computing — Điện toán bảo mật

*Mã: confidential-computing · Chương 9 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Điện toán bảo mật là một kỹ thuật bảo vệ dữ liệu trong lúc xử lý. Tính toán chạy trong một vùng phần cứng cô lập, có thể chứng thực từ xa (Trusted Execution Environment).

**Phân biệt.** Mã hóa thông thường bảo vệ dữ liệu khi lưu và khi truyền. Dữ liệu vẫn phải giải mã trong RAM để xử lý. Điện toán bảo mật bảo vệ dữ liệu ở bước xử lý này, ví dụ: khi [chạy mô hình](01-nen-tang.md#inference) trên [đám mây](11-trien-khai-san-pham-kinh-te.md#cloud).

**Liên quan.** [đám mây](11-trien-khai-san-pham-kinh-te.md#cloud) · [triển khai riêng](11-trien-khai-san-pham-kinh-te.md#private-deployment) · [bảo mật trọng số mô hình](#model-weights-security)
