---
chapter: 4
title: "LLM, mô hình sinh và đa phương thức"
file: 04-llm-va-mo-hinh-sinh.md
terms: 57
bible_version: "0.2"
version: "0.1"
updated: 2026-10-02
status: review
---

# Chương 4 — LLM, mô hình sinh và đa phương thức

Chương này giải thích các loại mô hình AI tạo ra văn bản, hình ảnh, âm thanh, video và hành động của robot. Người đọc gặp các thuật ngữ này trong tin tức, tài liệu của nhà cung cấp và hợp đồng dịch vụ AI. Các cụm 4.1 đến 4.3 mô tả loại mô hình, cách mô hình tạo văn bản và mô hình suy luận. Các cụm 4.4 đến 4.6 mô tả các mô hình xử lý ảnh, âm thanh, video, tài liệu và robot ở mức khái niệm. Cụm 4.7 tách các loại lỗi khác nhau của mô hình. Cụm 4.8 giúp người đọc dùng tài liệu đi kèm mô hình và theo dõi phiên bản của mô hình.

## 4.1 Loại mô hình

<a id="language-model"></a>
### Language model — Mô hình ngôn ngữ

*Mã: language-model · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mô hình ngôn ngữ là một [mô hình](01-nen-tang.md#model) gán [xác suất](01-nen-tang.md#probability) cho các chuỗi văn bản. Mô hình ngôn ngữ dự đoán phần văn bản đứng tiếp theo, hoặc phần văn bản đã được che trong một câu.

**Giải thích.** Mô hình ngôn ngữ có nhiều cỡ và nhiều kiến trúc. Một mô hình ngôn ngữ đơn giản đếm số lần các cụm 2 hoặc 3 từ xuất hiện trong văn bản. Một [LLM](#llm) dùng [mạng nơ-ron](01-nen-tang.md#neural-network) có hàng tỷ [tham số](01-nen-tang.md#parameter). Một số mô hình ngôn ngữ học bằng [masked language modeling](#masked-language-modeling) và không tạo văn bản từ trái sang phải.

**Phân biệt.** Mô hình ngôn ngữ là nhóm rộng. LLM là mô hình ngôn ngữ có kích thước lớn và học từ lượng văn bản lớn. Cơ chế [dự đoán token tiếp theo](#next-token-prediction) mô tả phần lớn LLM, không mô tả tất cả các mô hình ngôn ngữ. Đơn vị mà mô hình ngôn ngữ xử lý là [token](03-kien-truc-mo-hinh.md#token), không phải từ.

**Liên quan.** [LLM](#llm) · [SLM](#slm) · [perplexity](#perplexity)

**Nguồn.** [1] Dan Jurafsky và James H. Martin, "Speech and Language Processing" (bản nháp lần 3, chương 3 và chương 9), 2026, https://web.stanford.edu/~jurafsky/slp3/, truy cập 2/10/2026 (S401).

<a id="llm"></a>
### Large language model (LLM) — Mô hình ngôn ngữ lớn

*Mã: llm · Chương 4 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mô hình ngôn ngữ cỡ lớn. Dạng chuẩn trong sách: LLM.

**Định nghĩa.** LLM là một [mô hình](01-nen-tang.md#model) AI xử lý và tạo ra ngôn ngữ. LLM thường có hàng tỷ [tham số](01-nen-tang.md#parameter) và học từ một lượng văn bản lớn.

**Giải thích.** Phần lớn LLM tạo văn bản theo cách [tự hồi quy](#autoregressive). LLM chia văn bản đầu vào thành các [token](03-kien-truc-mo-hinh.md#token). LLM tính [xác suất](01-nen-tang.md#probability) cho mỗi token có thể đứng tiếp theo. LLM chọn một token theo các xác suất này và theo cách [lấy mẫu](#sampling) đã đặt. Sau đó, LLM thêm token này vào chuỗi và làm lại bước này cho đến khi câu trả lời hoàn tất.

Kỹ sư tạo ra một LLM qua 2 giai đoạn. Giai đoạn 1 là [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining): LLM học các mẫu của ngôn ngữ từ hàng nghìn tỷ token văn bản. Giai đoạn 2 là [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training): kỹ sư dạy LLM làm theo hướng dẫn và trả lời an toàn.

Tính đến tháng 10/2026, một số LLM thương mại nhận đầu vào là văn bản, hình ảnh, âm thanh và video. Các LLM này là [mô hình đa phương thức](#multimodal-model). Trong một số ứng dụng, LLM tạo yêu cầu [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use), ví dụ: tìm kiếm web hoặc [chạy mã](06-agent-va-tu-dong-hoa.md#code-execution).

**Ví dụ.** Người dùng nhập câu hỏi "Thủ đô của Việt Nam là gì?". LLM tạo ra câu trả lời "Thủ đô của Việt Nam là Hà Nội." từng token một.

**Phân biệt.** LLM là một mô hình. [Chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) là một ứng dụng dùng LLM cùng các thành phần khác, ví dụ: công cụ tìm kiếm, [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory), [bộ phân loại an toàn](08-an-toan-va-alignment.md#safety-classifier). [Mô hình ngôn ngữ](#language-model) là nhóm rộng hơn LLM. Tài liệu kỹ thuật và văn bản pháp luật có thể nói về mô hình, về [hệ thống AI](01-nen-tang.md#ai-system), hoặc về cả hai.

**Không nên hiểu là.** LLM không lưu văn bản đã học để tra cứu như một cơ sở dữ liệu. LLM lưu các mẫu của ngôn ngữ trong tham số. Dù vậy, LLM vẫn có thể nhớ nguyên văn một phần [dữ liệu huấn luyện](01-nen-tang.md#training-data).

**Giới hạn.** Bản thân LLM không kiểm tra sự thật. LLM có thể tạo ra nội dung sai nhưng trông đúng. Tên của loại lỗi này là [ảo giác](#hallucination). LLM chỉ có thông tin đến [ngày giới hạn kiến thức](#knowledge-cutoff), trừ khi ứng dụng đưa thông tin mới vào [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt).

> **CẢNH BÁO:** Kiểm tra thông tin quan trọng từ LLM với một nguồn tin cậy. Nội dung sai có thể gây thiệt hại pháp lý hoặc tài chính.

**Liên quan.** [mô hình nền tảng](#foundation-model) · [mô hình suy luận](#reasoning-model) · [transformer](03-kien-truc-mo-hinh.md#transformer) · [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) · [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot)

**Nguồn.** [1] Vaswani et al., "Attention Is All You Need", 2017, https://arxiv.org/abs/1706.03762, truy cập 2/10/2026 (S004). [2] Brown et al., "Language Models are Few-Shot Learners", 2020, https://arxiv.org/abs/2005.14165, truy cập 2/10/2026 (S402). [3] Touvron et al., "Llama 2: Open Foundation and Fine-Tuned Chat Models", 2023, https://arxiv.org/abs/2307.09288, truy cập 2/10/2026 (S403). [4] Google AI for Developers, "Understand and count tokens" (Gemini API, cập nhật 23/9/2026), 2026, https://ai.google.dev/gemini-api/docs/tokens, truy cập 2/10/2026 (S418).

<a id="foundation-model"></a>
### Foundation model — Mô hình nền tảng

*Mã: foundation-model · Chương 4 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mô hình nền tảng là một [mô hình](01-nen-tang.md#model) học từ lượng dữ liệu lớn và đa dạng. Sau đó, người dùng điều chỉnh mô hình cho nhiều nhiệm vụ khác nhau. Một mô hình nền tảng là điểm bắt đầu chung cho nhiều ứng dụng.

**Giải thích.** Kỹ sư [huấn luyện](01-nen-tang.md#training) một mô hình nền tảng một lần, với chi phí lớn. Sau đó, nhiều nhóm khác dùng lại mô hình này. Các nhóm này [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning) mô hình, viết [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt), hoặc nối mô hình với dữ liệu riêng.

Mô hình nền tảng thường học bằng [học tự giám sát](01-nen-tang.md#self-supervised-learning). [Thuật toán](01-nen-tang.md#algorithm) huấn luyện tự tạo đáp án từ dữ liệu chưa gán nhãn, ví dụ: phần văn bản đứng tiếp theo. Một mô hình nền tảng có thể xử lý văn bản, hình ảnh, âm thanh hoặc nhiều loại dữ liệu cùng lúc. Một [LLM](#llm) lớn là một ví dụ của mô hình nền tảng.

**Ví dụ.** Ví dụ giả định. Công ty An Bình dùng một mô hình nền tảng có sẵn cho 2 việc. Phòng chăm sóc khách hàng tinh chỉnh mô hình trên 2.000 email để [phân loại](01-nen-tang.md#classification) thư. Phòng pháp chế chỉ viết prompt để mô hình tóm tắt hợp đồng. Cả 2 việc dùng cùng một mô hình nền tảng.

**Phân biệt.** Mô hình nền tảng nói về vai trò của mô hình: làm nền cho nhiều ứng dụng. [Mô hình gốc](#base-model) nói về giai đoạn huấn luyện: mô hình đã qua [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining) nhưng chưa qua [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training). [Mô hình GPAI](10-phap-ly-quan-tri-chinh-sach.md#gpai) là thuật ngữ pháp lý của [EU AI Act](10-phap-ly-quan-tri-chinh-sach.md#eu-ai-act), có nghĩa vụ riêng.

**Không nên hiểu là.** "Nền tảng" không có nghĩa là mô hình đúng, an toàn, hoặc đủ cho một nhiệm vụ cụ thể. Lỗi và [thiên lệch thuật toán](08-an-toan-va-alignment.md#bias-thien-lech) trong mô hình nền tảng có thể đi vào các ứng dụng dùng mô hình đó.

**Giới hạn.** Một mô hình nền tảng không thay thế bước kiểm tra trên nhiệm vụ cụ thể. Doanh nghiệp dùng mô hình vẫn phải [đánh giá](07-danh-gia-va-chat-luong.md#evaluation) mô hình trên dữ liệu và tình huống của mình.

**Liên quan.** [LLM](#llm) · [mô hình gốc](#base-model) · [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning) · [mô hình GPAI](10-phap-ly-quan-tri-chinh-sach.md#gpai) · [AI tạo sinh](#generative-ai)

**Nguồn.** [1] Bommasani et al., "On the Opportunities and Risks of Foundation Models", 2021, https://arxiv.org/abs/2108.07258, truy cập 2/10/2026 (S404). [2] NIST, "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile" (NIST AI 600-1), 2024, https://doi.org/10.6028/NIST.AI.600-1, truy cập 2/10/2026 (S405).

<a id="generative-ai"></a>
### Generative AI — AI tạo sinh

*Mã: generative-ai · Chương 4 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** generative AI, GenAI, trí tuệ nhân tạo tạo sinh. Dạng chuẩn trong sách: AI tạo sinh.

**Định nghĩa.** AI tạo sinh là một nhóm [mô hình](01-nen-tang.md#model) và ứng dụng AI tạo ra nội dung mới. Nội dung có thể là văn bản, hình ảnh, âm thanh, video hoặc mã máy tính.

**Giải thích.** Một mô hình AI tạo sinh học các mẫu thống kê của [dữ liệu huấn luyện](01-nen-tang.md#training-data). Khi chạy, mô hình tạo ra mẫu mới theo các mẫu thống kê này. Đầu vào thường là một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt). Đầu ra là nội dung mới, không phải một bản sao lưu sẵn.

Sách này mô tả các loại mô hình AI tạo sinh sau:

- [LLM](#llm) tạo văn bản và mã máy tính.
- [Mô hình tạo ảnh từ văn bản](#text-to-image-model) tạo hình ảnh.
- [Mô hình tạo video từ văn bản](#text-to-video-model) tạo video.
- [Mô hình giọng nói sang giọng nói](#speech-to-speech-model) tạo lời nói.

**Ví dụ.** Anh Minh nhập prompt "Viết thư mời khách hàng dự hội thảo ngày 15/11". Một LLM tạo ra một bức thư mới. Một mô hình tạo ảnh từ văn bản tạo ra ảnh bìa cho thư mời này.

**Phân biệt.** AI phân biệt (discriminative AI) chọn nhãn hoặc dự đoán một giá trị cho đầu vào. Ví dụ: một mô hình [phân loại](01-nen-tang.md#classification) thư rác trả về "rác" hoặc "không rác". AI tạo sinh tạo ra nội dung mới. Một ứng dụng có thể dùng cả 2 loại. AI tạo sinh viết câu trả lời, rồi một mô hình phân loại kiểm tra câu trả lời.

**Không nên hiểu là.** AI tạo sinh không phải toàn bộ AI. Nhiều mô hình trong tín dụng, bảo hiểm và chống gian lận là mô hình phân biệt, không tạo nội dung. "Tạo sinh" cũng không có nghĩa là nội dung luôn mới hoàn toàn. Mô hình có thể tạo lại gần nguyên văn một phần dữ liệu đã học.

**Giới hạn.** AI tạo sinh không bảo đảm nội dung đúng sự thật. Nội dung tạo ra có thể sai nhưng trông thuyết phục ([ảo giác](#hallucination)). Nội dung tạo ra cũng có thể gây tranh chấp về quyền tác giả, xem [tác quyền của đầu ra AI](10-phap-ly-quan-tri-chinh-sach.md#ai-output-copyrightability).

**Liên quan.** [LLM](#llm) · [mô hình nền tảng](#foundation-model) · [mô hình khuếch tán](03-kien-truc-mo-hinh.md#diffusion-model) · [deepfake](09-bao-mat-rieng-tu-xac-thuc.md#deepfake) · [ảo giác](#hallucination)

**Nguồn.** [1] NIST, "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile" (NIST AI 600-1, chú thích 1), 2024, https://doi.org/10.6028/NIST.AI.600-1, truy cập 2/10/2026 (S405). [2] Google for Developers, "Machine Learning Glossary" (mục generative AI, generative model, discriminative model; cập nhật 10/4/2026), https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="frontier-model"></a>
### Frontier model — Mô hình tiên phong

*Mã: frontier-model · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** frontier AI model, mô hình biên. Dạng chuẩn trong sách: mô hình tiên phong.

**Định nghĩa.** Mô hình tiên phong là một [mô hình nền tảng](#foundation-model) có năng lực thuộc nhóm cao nhất tại một thời điểm. Thuật ngữ này xuất hiện trong chính sách và tài liệu về [an toàn AI](08-an-toan-va-alignment.md#ai-safety).

**Giải thích.** Thuật ngữ này không có một định nghĩa kỹ thuật thống nhất. Một số tài liệu chính sách dùng thuật ngữ này cho [mô hình](01-nen-tang.md#model) có thể có [năng lực nguy hiểm](08-an-toan-va-alignment.md#dangerous-capability). Năng lực này đủ gây rủi ro lớn cho an toàn công cộng. Nhóm mô hình tiên phong thay đổi theo thời gian. Một mô hình tiên phong của năm 2023 có thể không còn ở nhóm này vào năm 2026.

**Phân biệt.** Mô hình tiên phong không phải một hạng mục pháp lý chung. [Mô hình GPAI](10-phap-ly-quan-tri-chinh-sach.md#gpai) là thuật ngữ pháp lý của EU, có tiêu chí và nghĩa vụ riêng. Mô hình tiên phong cũng khác mô hình có [kích thước mô hình](03-kien-truc-mo-hinh.md#model-size) lớn nhất. Năng lực không chỉ phụ thuộc vào số [tham số](01-nen-tang.md#parameter).

**Liên quan.** [mô hình nền tảng](#foundation-model) · [khung an toàn cho mô hình tiên phong](08-an-toan-va-alignment.md#frontier-safety-framework) · [năng lực nguy hiểm](08-an-toan-va-alignment.md#dangerous-capability) · [mô hình GPAI](10-phap-ly-quan-tri-chinh-sach.md#gpai)

**Nguồn.** [1] Anderljung et al., "Frontier AI Regulation: Managing Emerging Risks to Public Safety", 2023, https://arxiv.org/abs/2307.03718, truy cập 2/10/2026 (S414).

<a id="slm"></a>
### Small language model (SLM) — Mô hình ngôn ngữ nhỏ

*Mã: slm · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mô hình ngôn ngữ nhỏ. Dạng chuẩn trong sách: SLM.

**Định nghĩa.** SLM là một [mô hình ngôn ngữ](#language-model) nhỏ hơn các [LLM](#llm) lớn. SLM đủ nhỏ để chạy trên máy tính cá nhân, điện thoại hoặc một máy chủ đơn lẻ.

**Giải thích.** Không có ngưỡng [kích thước mô hình](03-kien-truc-mo-hinh.md#model-size) chung để xếp một [mô hình](01-nen-tang.md#model) vào nhóm SLM. Một nghiên cứu năm 2025 dùng tiêu chí thực tế. Theo tiêu chí này, SLM chạy được trên một máy tiêu dùng và trả lời một người dùng với [độ trễ](11-trien-khai-san-pham-kinh-te.md#latency) chấp nhận được. Kỹ sư tạo SLM bằng cách [huấn luyện](01-nen-tang.md#training) mô hình nhỏ từ đầu, hoặc [chưng cất tri thức](02-du-lieu-va-huan-luyen.md#distillation) từ mô hình lớn. Kỹ sư cũng có thể [lượng tử hóa](03-kien-truc-mo-hinh.md#quantization) mô hình để giảm dung lượng cần dùng.

SLM giảm [chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost). SLM cũng cho phép dữ liệu ở lại trên máy của người dùng ([AI tại biên](11-trien-khai-san-pham-kinh-te.md#edge-ai)).

**Phân biệt.** SLM khác LLM ở kích thước và chi phí, không khác ở cơ chế tạo văn bản. Một số nhà nghiên cứu cho rằng SLM đủ cho nhiều bước lặp lại trong hệ thống [agent](06-agent-va-tu-dong-hoa.md#ai-agent).

**Liên quan.** [LLM](#llm) · [chưng cất tri thức](02-du-lieu-va-huan-luyen.md#distillation) · [AI tại biên](11-trien-khai-san-pham-kinh-te.md#edge-ai)

**Nguồn.** [1] Belcak et al., "Small Language Models are the Future of Agentic AI", 2025, https://arxiv.org/abs/2506.02153, truy cập 2/10/2026 (S415).

<a id="base-model"></a>
### Base model — Mô hình gốc

*Mã: base-model · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** pretrained model, mô hình đã huấn luyện trước. Dạng chuẩn trong sách: mô hình gốc.

**Định nghĩa.** Mô hình gốc là một mô hình ngôn ngữ đã qua [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining) nhưng chưa qua [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training). Mô hình gốc viết tiếp văn bản đầu vào theo các mẫu đã học.

**Giải thích.** Một [mô hình ngôn ngữ](#language-model) ở dạng gốc học dự đoán phần tiếp theo của văn bản. Khi nhận một câu hỏi, mô hình gốc có thể viết tiếp bằng một câu hỏi khác thay vì trả lời. Kỹ sư dùng mô hình gốc làm điểm bắt đầu để [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning) cho một việc riêng.

**Ví dụ.** Người dùng nhập "Thủ đô của Pháp là gì?". Mô hình gốc có thể viết tiếp "Thủ đô của Đức là gì?". Mô hình trò chuyện trả lời "Thủ đô của Pháp là Paris."

**Phân biệt.** Mô hình trò chuyện (chat model) là mô hình gốc đã qua hậu huấn luyện. Mô hình trò chuyện làm theo hướng dẫn và trả lời theo lượt hội thoại. Người dùng [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) làm việc với mô hình trò chuyện, không làm việc trực tiếp với mô hình gốc. [Mô hình nền tảng](#foundation-model) nói về vai trò của [mô hình](01-nen-tang.md#model), còn mô hình gốc nói về giai đoạn [huấn luyện](01-nen-tang.md#training).

**Liên quan.** [mô hình đã tinh chỉnh theo hướng dẫn](#instruction-tuned-model) · [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining) · [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training)

**Nguồn.** [1] Dan Jurafsky và James H. Martin, "Speech and Language Processing" (bản nháp lần 3, chương 8), 2026, https://web.stanford.edu/~jurafsky/slp3/, truy cập 2/10/2026 (S401). [2] Touvron et al., "Llama 2: Open Foundation and Fine-Tuned Chat Models", 2023, https://arxiv.org/abs/2307.09288, truy cập 2/10/2026 (S403).

<a id="instruction-tuned-model"></a>
### Instruction-tuned model — Mô hình đã tinh chỉnh theo hướng dẫn

*Mã: instruction-tuned-model · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mô hình đã tinh chỉnh theo hướng dẫn là một mô hình đã qua [instruction tuning](02-du-lieu-va-huan-luyen.md#instruction-tuning). Kỹ sư dạy tiếp mô hình trên nhiều cặp hướng dẫn và câu trả lời mẫu. Mô hình này làm theo yêu cầu tốt hơn [mô hình gốc](#base-model).

**Phân biệt.** Instruction tuning là một dạng [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning). Một [mô hình](01-nen-tang.md#model) đã tinh chỉnh theo hướng dẫn chưa chắc đã qua [RLHF](02-du-lieu-va-huan-luyen.md#rlhf).

**Liên quan.** [mô hình gốc](#base-model) · [instruction tuning](02-du-lieu-va-huan-luyen.md#instruction-tuning) · [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training)

<a id="code-model"></a>
### Code model — Mô hình sinh mã

*Mã: code-model · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mô hình sinh mã là một [LLM](#llm) học từ nhiều mã máy tính. Mô hình này tạo ra mã từ mô tả bằng ngôn ngữ tự nhiên, và có thể giải thích hoặc sửa mã.

**Phân biệt.** Mô hình sinh mã là một [mô hình](01-nen-tang.md#model). [Agent lập trình](06-agent-va-tu-dong-hoa.md#coding-agent) là một ứng dụng dùng mô hình để đọc, sửa và [chạy mã](06-agent-va-tu-dong-hoa.md#code-execution) qua nhiều bước.

**Liên quan.** [agent lập trình](06-agent-va-tu-dong-hoa.md#coding-agent) · [pass@k](07-danh-gia-va-chat-luong.md#pass-at-k) · [trợ lý lập trình AI](06-agent-va-tu-dong-hoa.md#ai-pair-programmer)

<a id="embedding-model"></a>
### Embedding model — Mô hình embedding

*Mã: embedding-model · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mô hình nhúng. Dạng chuẩn trong sách: mô hình embedding.

**Định nghĩa.** Mô hình embedding là một [mô hình](01-nen-tang.md#model) chuyển văn bản, hình ảnh hoặc dữ liệu khác thành [embedding](03-kien-truc-mo-hinh.md#embedding). Mô hình embedding không tạo văn bản trả lời.

**Giải thích.** Kỹ sư [huấn luyện](01-nen-tang.md#training) mô hình embedding để các câu có nghĩa gần nhau có embedding gần nhau. Ứng dụng so sánh 2 embedding bằng một [điểm tương đồng](05-prompt-ngu-canh-tri-thuc.md#similarity-score). Cách so sánh này phục vụ [tìm kiếm ngữ nghĩa](05-prompt-ngu-canh-tri-thuc.md#semantic-search), gom nhóm tài liệu và bước truy xuất trong [RAG](05-prompt-ngu-canh-tri-thuc.md#rag). Ứng dụng có thể lưu embedding trong một [cơ sở dữ liệu vector](05-prompt-ngu-canh-tri-thuc.md#vector-database).

**Ví dụ.** Chị Lan tìm "thủ tục chấm dứt hợp đồng lao động" trong kho văn bản của công ty. Ứng dụng tạo embedding cho câu tìm kiếm và so sánh với embedding của các văn bản. Ứng dụng trả về văn bản "quy trình cho nhân viên nghỉ việc", dù 2 câu không có chung nhiều từ.

**Phân biệt.** Một [LLM](#llm) tạo ra [token](03-kien-truc-mo-hinh.md#token) mới. Mô hình embedding trả về một [vector](01-nen-tang.md#vector) có độ dài cố định cho mỗi đầu vào.

**Liên quan.** [embedding](03-kien-truc-mo-hinh.md#embedding) · [tìm kiếm ngữ nghĩa](05-prompt-ngu-canh-tri-thuc.md#semantic-search) · [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) · [số chiều embedding](11-trien-khai-san-pham-kinh-te.md#embedding-dimension)

**Nguồn.** [1] Reimers và Gurevych, "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks", 2019, https://arxiv.org/abs/1908.10084, truy cập 2/10/2026 (S434).

## 4.2 Cách mô hình sinh văn bản

<a id="next-token-prediction"></a>
### Next-token prediction — Dự đoán token tiếp theo

*Mã: next-token-prediction · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Dự đoán token tiếp theo là một nhiệm vụ trong đó [mô hình](01-nen-tang.md#model) tính xác suất cho mỗi [token](03-kien-truc-mo-hinh.md#token) có thể đứng tiếp theo. Phép tính dựa trên chuỗi token đứng trước.

**Phân biệt.** Phần lớn [LLM](#llm) dùng nhiệm vụ này khi [huấn luyện](01-nen-tang.md#training) và khi tạo văn bản. Không phải tất cả các [mô hình ngôn ngữ](#language-model) dùng nhiệm vụ này. Nhiệm vụ này cho ra [xác suất](01-nen-tang.md#probability) của token, không cho ra độ tin cậy về sự thật.

**Liên quan.** [tự hồi quy](#autoregressive) · [masked language modeling](#masked-language-modeling) · [mô hình ngôn ngữ khuếch tán](03-kien-truc-mo-hinh.md#diffusion-language-model)

<a id="autoregressive"></a>
### Autoregressive model — Tự hồi quy

*Mã: autoregressive · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tự hồi quy là một phương pháp tạo đầu ra theo từng phần, theo thứ tự. [Mô hình](01-nen-tang.md#model) dùng các phần đã tạo làm đầu vào cho bước sau. Phần lớn [LLM](#llm) tạo văn bản theo cách tự hồi quy.

**Phân biệt.** Mô hình tự hồi quy tạo mỗi bước một [token](03-kien-truc-mo-hinh.md#token). [Mô hình khuếch tán](03-kien-truc-mo-hinh.md#diffusion-model) tạo đầu ra bằng cách sửa dần toàn bộ đầu ra qua nhiều bước.

**Liên quan.** [dự đoán token tiếp theo](#next-token-prediction) · [decoding](#decoding) · [mô hình chỉ có decoder](03-kien-truc-mo-hinh.md#decoder-only-model)

<a id="masked-language-modeling"></a>
### Masked language modeling — Mô hình hóa ngôn ngữ có che

*Mã: masked-language-modeling · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mô hình hóa ngôn ngữ có che. Dạng chuẩn trong sách: masked language modeling.

**Định nghĩa.** Masked language modeling là một nhiệm vụ học của [mô hình ngôn ngữ](#language-model). Kỹ sư che một số [token](03-kien-truc-mo-hinh.md#token) trong câu. Mô hình dự đoán các token đã che từ ngữ cảnh ở cả 2 phía.

**Phân biệt.** Khác [dự đoán token tiếp theo](#next-token-prediction), [mô hình](01-nen-tang.md#model) dùng cả phần trước và phần sau của vị trí đã che. Các [encoder](03-kien-truc-mo-hinh.md#encoder) học theo cách này dùng để [phân loại](01-nen-tang.md#classification) và tìm kiếm, không dùng để tạo văn bản dài.

**Liên quan.** [encoder](03-kien-truc-mo-hinh.md#encoder) · [mô hình ngôn ngữ](#language-model) · [embedding](03-kien-truc-mo-hinh.md#embedding)

<a id="input-token"></a>
### Input token — Token đầu vào

*Mã: input-token · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** prompt token. Dạng chuẩn trong sách: token đầu vào.

**Định nghĩa.** Token đầu vào là một [token](03-kien-truc-mo-hinh.md#token) mà [mô hình](01-nen-tang.md#model) nhận vào trong một lần chạy. Token đầu vào gồm prompt, tài liệu đính kèm, lịch sử hội thoại và kết quả công cụ.

**Giải thích.** Dịch vụ [API](11-trien-khai-san-pham-kinh-te.md#api) đếm token đầu vào và token đầu ra riêng. Hai số này quyết định [chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost) và ảnh hưởng tới [độ trễ](11-trien-khai-san-pham-kinh-te.md#latency). [Prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) dài làm tăng token đầu vào. Câu trả lời dài làm tăng token đầu ra.

Ảnh, âm thanh và video cũng được quy đổi thành token đầu vào. Với [mô hình suy luận](#reasoning-model), token của phần suy luận được tính vào token đầu ra. Tính đến tháng 10/2026, trong bảng giá của 2 nhà phát triển lớn, giá token đầu ra văn bản thường gấp 5 đến 6 lần giá token đầu vào.

**Ví dụ.** Ví dụ giả định. Chị Lan gửi một hợp đồng dài 8.000 token và yêu cầu tóm tắt. Mô hình trả về bản tóm tắt dài 500 token. Hóa đơn ghi 8.000 token đầu vào và 500 token đầu ra.

**Phân biệt.** Token đầu ra là token mà mô hình tạo ra. Token đầu ra khác [số token đầu ra tối đa](#max-output-tokens). Số tối đa là giới hạn do người dùng đặt, không phải số token mà mô hình tạo ra thật.

**Liên quan.** [giá theo token](11-trien-khai-san-pham-kinh-te.md#token-pricing) · [bộ đếm token](11-trien-khai-san-pham-kinh-te.md#token-counter) · [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window)

**Nguồn.** [1] Google AI for Developers, "Understand and count tokens" (Gemini API, cập nhật 23/9/2026), 2026, https://ai.google.dev/gemini-api/docs/tokens, truy cập 2/10/2026 (S418). [2] Anthropic, "Pricing" (Claude API docs), 2026, https://platform.claude.com/docs/en/about-claude/pricing, truy cập 2/10/2026 (S419). [3] Google AI for Developers, "Gemini Developer API pricing", 2026, https://ai.google.dev/gemini-api/docs/pricing, truy cập 2/10/2026 (S459).

<a id="decoding"></a>
### Decoding — Giải mã

*Mã: decoding · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** giải mã. Dạng chuẩn trong sách: decoding.

**Định nghĩa.** Decoding là bước chọn [token](03-kien-truc-mo-hinh.md#token) cụ thể từ các [xác suất](01-nen-tang.md#probability) mà mô hình tính ra, để tạo đầu ra. Greedy decoding là cách decoding luôn chọn token có xác suất cao nhất.

**Phân biệt.** Decoding không thay đổi [tham số](01-nen-tang.md#parameter) của [mô hình](01-nen-tang.md#model). Các cách decoding khác gồm [lấy mẫu](#sampling), [lấy mẫu top-k](#top-k-sampling) và [lấy mẫu top-p](#top-p-sampling).

**Liên quan.** [lấy mẫu](#sampling) · [temperature](#temperature) · [giải mã có ràng buộc](05-prompt-ngu-canh-tri-thuc.md#constrained-decoding)

<a id="sampling"></a>
### Sampling — Lấy mẫu

*Mã: sampling · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** sampling. Dạng chuẩn trong sách: lấy mẫu.

**Định nghĩa.** Lấy mẫu là một phương pháp [decoding](#decoding) chọn ngẫu nhiên [token](03-kien-truc-mo-hinh.md#token) tiếp theo theo xác suất của từng token. Token có xác suất cao được chọn nhiều hơn, nhưng token có xác suất thấp vẫn có thể được chọn.

**Giải thích.** [Mô hình](01-nen-tang.md#model) tính [xác suất](01-nen-tang.md#probability) cho các token. Phần mềm [chạy mô hình](01-nen-tang.md#inference) chọn một token theo các xác suất này. Lấy mẫu làm cho cùng một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) có thể cho ra các câu trả lời khác nhau. Người dùng chỉnh mức ngẫu nhiên bằng [temperature](#temperature), [lấy mẫu top-k](#top-k-sampling) và [lấy mẫu top-p](#top-p-sampling). [Seed](#seed) cố định chuỗi số ngẫu nhiên trong một số hệ thống.

**Phân biệt.** Greedy decoding luôn chọn token có xác suất cao nhất ở mỗi bước. Văn bản từ greedy decoding dễ lặp lại và đơn điệu. Lấy mẫu chấp nhận yếu tố ngẫu nhiên để có văn bản đa dạng hơn. Trên lý thuyết, greedy decoding cho cùng đầu ra với cùng đầu vào. Trên thực tế, cả 2 cách vẫn có thể cho đầu ra khác nhau giữa các lần chạy ([tính không tất định](#nondeterminism)).

**Liên quan.** [decoding](#decoding) · [temperature](#temperature) · [lấy mẫu top-p](#top-p-sampling) · [seed](#seed)

**Nguồn.** [1] Dan Jurafsky và James H. Martin, "Speech and Language Processing" (bản nháp lần 3, chương 7, mục 7.6), 2026, https://web.stanford.edu/~jurafsky/slp3/, truy cập 2/10/2026 (S401). [2] Holtzman et al., "The Curious Case of Neural Text Degeneration", 2019, https://arxiv.org/abs/1904.09751, truy cập 2/10/2026 (S416).

<a id="temperature"></a>
### Temperature — Nhiệt độ lấy mẫu

*Mã: temperature · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** nhiệt độ lấy mẫu, nhiệt độ. Dạng chuẩn trong sách: temperature.

**Định nghĩa.** Temperature là một thiết lập của bước [lấy mẫu](#sampling), quyết định mức ngẫu nhiên khi chọn [token](03-kien-truc-mo-hinh.md#token) tiếp theo. Temperature thấp làm đầu ra ổn định hơn. Temperature cao làm đầu ra đa dạng hơn.

**Giải thích.** Hệ thống chia [logit](03-kien-truc-mo-hinh.md#logit) của mỗi token cho temperature trước bước [softmax](01-nen-tang.md#softmax). Temperature nhỏ hơn 1 làm token có [xác suất](01-nen-tang.md#probability) cao chiếm phần lớn hơn. Temperature lớn hơn 1 làm các xác suất gần nhau hơn. Khi temperature tiến về 0, hệ thống gần như luôn chọn token có xác suất cao nhất. Tính đến tháng 10/2026, một số [API](11-trien-khai-san-pham-kinh-te.md#api) nhận temperature từ 0 đến 2, và giá trị mặc định khác nhau theo mô hình.

**Ví dụ.** Một [mô hình](01-nen-tang.md#model) có 3 ứng viên cho phần tiếp theo của câu: "đồng ý", "chấp thuận" và "nhất trí". Với temperature thấp, hệ thống chọn "đồng ý" ở phần lớn các lần chạy. Với temperature cao, 3 từ xuất hiện với tần suất gần nhau hơn.

**Không nên hiểu là.** Temperature 0 không bảo đảm câu trả lời đúng. Temperature 0 chỉ làm hệ thống chọn token có xác suất cao nhất. Temperature 0 cũng không bảo đảm đầu ra giống nhau ở các lần chạy. Các yếu tố khác khi [chạy mô hình](01-nen-tang.md#inference) có thể làm kết quả tính toán thay đổi ([tính không tất định](#nondeterminism)).

**Phân biệt.** Temperature khác [seed](#seed). Temperature chỉnh mức ngẫu nhiên. Seed cố định chuỗi số ngẫu nhiên dùng khi lấy mẫu.

**Liên quan.** [lấy mẫu](#sampling) · [lấy mẫu top-p](#top-p-sampling) · [tính không tất định](#nondeterminism)

**Nguồn.** [1] Dan Jurafsky và James H. Martin, "Speech and Language Processing" (bản nháp lần 3, chương 7, mục 7.6), 2026, https://web.stanford.edu/~jurafsky/slp3/, truy cập 2/10/2026 (S401). [2] Google AI for Developers, "Generating content" (Gemini API reference, mục GenerationConfig, cập nhật 23/9/2026), 2026, https://ai.google.dev/api/generate-content, truy cập 2/10/2026 (S426). [3] Horace He và Thinking Machines Lab, "Defeating Nondeterminism in LLM Inference", 2025, https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/, truy cập 2/10/2026 (S417).

<a id="top-k-sampling"></a>
### Top-k sampling — Lấy mẫu top-k

*Mã: top-k-sampling · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Lấy mẫu top-k là một phương pháp [lấy mẫu](#sampling) chỉ giữ k [token](03-kien-truc-mo-hinh.md#token) có xác suất cao nhất. Hệ thống chọn ngẫu nhiên một token trong nhóm này.

**Phân biệt.** Với k bằng 1, lấy mẫu top-k giống greedy [decoding](#decoding). Lấy mẫu top-k giữ một số token cố định. [Lấy mẫu top-p](#top-p-sampling) giữ số token thay đổi theo tổng [xác suất](01-nen-tang.md#probability).

**Liên quan.** [lấy mẫu](#sampling) · [lấy mẫu top-p](#top-p-sampling) · [temperature](#temperature)

<a id="top-p-sampling"></a>
### Top-p sampling — Lấy mẫu top-p

*Mã: top-p-sampling · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** nucleus sampling. Dạng chuẩn trong sách: lấy mẫu top-p.

**Định nghĩa.** Lấy mẫu top-p là một phương pháp [lấy mẫu](#sampling) chỉ giữ nhóm token nhỏ nhất có tổng [xác suất](01-nen-tang.md#probability) đạt ngưỡng p. Hệ thống chọn ngẫu nhiên một token trong nhóm này. Với p bằng 0,9, nhóm này chiếm 90% xác suất.

**Phân biệt.** Khác [lấy mẫu top-k](#top-k-sampling), số [token](03-kien-truc-mo-hinh.md#token) giữ lại thay đổi ở mỗi bước. Một số [API](11-trien-khai-san-pham-kinh-te.md#api) dùng cả top-k và top-p cùng lúc.

**Liên quan.** [lấy mẫu](#sampling) · [lấy mẫu top-k](#top-k-sampling) · [API](11-trien-khai-san-pham-kinh-te.md#api)

<a id="repetition-penalty"></a>
### Repetition penalty — Phạt lặp lại

*Mã: repetition-penalty · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Phạt lặp lại là một thiết lập của bước [decoding](#decoding) giảm [xác suất](01-nen-tang.md#probability) của các token đã xuất hiện trong đầu ra. Thiết lập này làm đầu ra ít lặp lại từ và câu.

**Phân biệt.** Một số [API](11-trien-khai-san-pham-kinh-te.md#api) có 2 thiết lập gần nhau. Presence penalty phạt một [token](03-kien-truc-mo-hinh.md#token) đã xuất hiện ít nhất một lần. Frequency penalty phạt tăng dần theo số lần token xuất hiện.

**Liên quan.** [decoding](#decoding) · [lấy mẫu](#sampling) · [temperature](#temperature)

<a id="seed"></a>
### Seed — Hạt giống ngẫu nhiên

*Mã: seed · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** hạt giống ngẫu nhiên. Dạng chuẩn trong sách: seed.

**Định nghĩa.** Seed là một số nguyên dùng để bắt đầu bộ sinh số ngẫu nhiên trong bước [lấy mẫu](#sampling). Cùng seed, cùng đầu vào và cùng thiết lập giúp hệ thống lặp lại cùng các lựa chọn ngẫu nhiên.

**Phân biệt.** Seed không bảo đảm đầu ra giống nhau tuyệt đối. [Tính không tất định](#nondeterminism) của phần cứng và phần mềm vẫn có thể làm đầu ra thay đổi.

**Liên quan.** [lấy mẫu](#sampling) · [tính không tất định](#nondeterminism) · [khả năng tái lập](07-danh-gia-va-chat-luong.md#reproducibility)

<a id="nondeterminism"></a>
### Nondeterminism — Tính không tất định

*Mã: nondeterminism · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tính không tất định là đặc điểm của một [mô hình](01-nen-tang.md#model) hoặc ứng dụng AI cho ra đầu ra khác nhau với cùng một đầu vào. Nguyên nhân gồm [lấy mẫu](#sampling) ngẫu nhiên và sai khác nhỏ trong phép tính trên phần cứng.

**Phân biệt.** [Temperature](#temperature) 0 làm bước chọn [token](03-kien-truc-mo-hinh.md#token) không còn ngẫu nhiên trên lý thuyết. Một nghiên cứu năm 2025 cho thấy [API](11-trien-khai-san-pham-kinh-te.md#api) vẫn trả về đầu ra khác nhau. Nguyên nhân là số yêu cầu mà máy chủ tính cùng lúc thay đổi theo tải.

**Liên quan.** [seed](#seed) · [dao động giữa các lần chạy](07-danh-gia-va-chat-luong.md#run-to-run-variance) · [khả năng tái lập](07-danh-gia-va-chat-luong.md#reproducibility)

<a id="max-output-tokens"></a>
### Max output tokens — Số token đầu ra tối đa

*Mã: max-output-tokens · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Số token đầu ra tối đa là giới hạn trên của số [token](03-kien-truc-mo-hinh.md#token) mà [mô hình](01-nen-tang.md#model) được phép tạo trong một lần trả lời. Khi đạt giới hạn này, hệ thống dừng tạo đầu ra, kể cả khi câu trả lời chưa xong.

**Phân biệt.** Với [mô hình suy luận](#reasoning-model), giới hạn này có thể tính cả token của phần suy luận. Một giới hạn thấp có thể cắt câu trả lời giữa chừng. Xem [token đầu vào](#input-token) để tách token đầu vào khỏi token đầu ra.

**Liên quan.** [token đầu vào](#input-token) · [chuỗi dừng](#stop-sequence) · [ngân sách suy nghĩ](#thinking-budget)

<a id="stop-sequence"></a>
### Stop sequence — Chuỗi dừng

*Mã: stop-sequence · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Chuỗi dừng là một chuỗi ký tự do người dùng đặt để dừng đầu ra. Khi [mô hình](01-nen-tang.md#model) tạo ra chuỗi này, hệ thống dừng tạo đầu ra. Trong một số [API](11-trien-khai-san-pham-kinh-te.md#api), chuỗi dừng không xuất hiện trong đầu ra trả về.

**Phân biệt.** Chuỗi dừng dừng đầu ra theo nội dung. [Số token đầu ra tối đa](#max-output-tokens) dừng đầu ra theo độ dài.

**Liên quan.** [số token đầu ra tối đa](#max-output-tokens) · [decoding](#decoding) · [đầu ra có cấu trúc](05-prompt-ngu-canh-tri-thuc.md#structured-output)

<a id="logprobs"></a>
### Logprobs — Log xác suất của token

*Mã: logprobs · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** log probabilities, log xác suất của token. Dạng chuẩn trong sách: logprobs.

**Định nghĩa.** Logprobs là logarit của [xác suất](01-nen-tang.md#probability) mà [mô hình](01-nen-tang.md#model) gán cho mỗi token trong đầu ra.

**Phân biệt.** Một số [API](11-trien-khai-san-pham-kinh-te.md#api) trả về logprobs của token đã chọn và của vài token thay thế. Logprobs đo mức chắc chắn về [token](03-kien-truc-mo-hinh.md#token) tiếp theo, không đo độ đúng của thông tin. Một câu sai vẫn có thể có logprobs cao. Xem thêm [hiệu chuẩn](07-danh-gia-va-chat-luong.md#calibration).

**Liên quan.** [hiệu chuẩn](07-danh-gia-va-chat-luong.md#calibration) · [logit](03-kien-truc-mo-hinh.md#logit) · [API](11-trien-khai-san-pham-kinh-te.md#api)

<a id="perplexity"></a>
### Perplexity — Độ bối rối

*Mã: perplexity · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** độ bối rối. Dạng chuẩn trong sách: perplexity.

**Định nghĩa.** Perplexity là một chỉ số đo mức một [mô hình ngôn ngữ](#language-model) dự đoán tốt một tập văn bản kiểm tra. Perplexity càng thấp, mô hình càng gán [xác suất](01-nen-tang.md#probability) cao cho văn bản thật.

**Phân biệt.** Perplexity thấp không có nghĩa là câu trả lời đúng hoặc hữu ích. Perplexity của 2 [mô hình](01-nen-tang.md#model) chỉ so sánh được khi 2 mô hình dùng cùng [bộ từ vựng token](03-kien-truc-mo-hinh.md#vocabulary) và cùng tập văn bản.

**Liên quan.** [mô hình ngôn ngữ](#language-model) · [hàm mất mát](01-nen-tang.md#loss-function) · [benchmark](07-danh-gia-va-chat-luong.md#benchmark)

<a id="in-context-learning"></a>
### In-context learning — Học trong ngữ cảnh

*Mã: in-context-learning · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học trong ngữ cảnh là khả năng của một [LLM](#llm) làm một nhiệm vụ mới từ hướng dẫn hoặc vài ví dụ trong [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt). LLM không cần cập nhật tham số cho việc này.

**Phân biệt.** Học trong ngữ cảnh không thay đổi [tham số](01-nen-tang.md#parameter) hay [trọng số](01-nen-tang.md#weight) của [mô hình](01-nen-tang.md#model). Khi phiên làm việc kết thúc, các ví dụ trong prompt không còn tác dụng. [Tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning) thì thay đổi trọng số.

**Liên quan.** [zero-shot](05-prompt-ngu-canh-tri-thuc.md#zero-shot) · [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) · [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning)

## 4.3 Mô hình suy luận

<a id="reasoning-model"></a>
### Reasoning model — Mô hình suy luận

*Mã: reasoning-model · Chương 4 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** mô hình lập luận, thinking model. Dạng chuẩn trong sách: mô hình suy luận.

**Định nghĩa.** Mô hình suy luận là một [LLM](#llm) được huấn luyện để tạo ra một chuỗi bước trung gian trước câu trả lời cuối. Chuỗi bước này dùng thêm [năng lực tính toán](01-nen-tang.md#compute) lúc chạy để giải bài toán nhiều bước.

**Giải thích.** Theo các báo cáo đã công bố, kỹ sư [huấn luyện](01-nen-tang.md#training) mô hình suy luận bằng [học tăng cường](01-nen-tang.md#reinforcement-learning), ví dụ: [RLVR](02-du-lieu-va-huan-luyen.md#rlvr). Các bài toán huấn luyện có đáp án kiểm tra được, ví dụ: toán và lập trình. [Mô hình](01-nen-tang.md#model) nhận phần thưởng khi câu trả lời cuối đúng. Theo một báo cáo năm 2025, qua huấn luyện, chuỗi bước trung gian ([chuỗi suy nghĩ](#chain-of-thought)) dài hơn và có thêm các bước làm lại, tự kiểm tra.

Một số nhà phát triển báo cáo rằng kết quả tăng khi phần suy luận dùng thêm [token](03-kien-truc-mo-hinh.md#token) ([test-time compute](#test-time-compute)). Đổi lại, câu trả lời tốn nhiều token đầu ra hơn. [Chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost) và [độ trễ](11-trien-khai-san-pham-kinh-te.md#latency) tăng theo.

Tính đến tháng 10/2026, một số nhà phát triển chỉ cho người dùng xem bản tóm tắt của phần suy luận. Người dùng chỉnh lượng suy luận bằng [ngân sách suy nghĩ](#thinking-budget) hoặc bằng mức nỗ lực.

**Ví dụ.** Anh Minh hỏi: "Kho có 3 thùng, mỗi thùng 24 hộp. Cửa hàng đã bán 50 hộp. Kho còn bao nhiêu hộp?". Mô hình suy luận tạo các bước trung gian: 3 nhân 24 bằng 72, rồi 72 trừ 50 bằng 22. Sau đó mô hình trả lời "22 hộp". Ứng dụng có thể ẩn các bước trung gian và chỉ hiển thị câu trả lời.

**Phân biệt.** Suy luận (reasoning) khác [chạy mô hình](01-nen-tang.md#inference) (inference). Chạy mô hình là việc một mô hình đã huấn luyện nhận đầu vào và tạo đầu ra. Một LLM thông thường và một mô hình suy luận đều cần chạy mô hình. Suy luận là việc tạo các bước trung gian để giải một bài toán nhiều bước.

**Không nên hiểu là.** "Suy luận" là tên của một nhóm mô hình, không mô tả trải nghiệm hay ý thức. Câu trả lời dài hoặc có nhiều bước không chứng minh kết quả đúng. Các bước hiển thị không phải toàn bộ tính toán bên trong mô hình.

**Giới hạn.** Mô hình suy luận vẫn có thể tạo [ảo giác](#hallucination) và lỗi tính toán. Với câu hỏi đơn giản, phần suy luận dài có thể chỉ làm tăng chi phí và độ trễ.

**Thay đổi gần đây.** Tháng 9/2024, một nhà phát triển công bố một mô hình suy luận thương mại, huấn luyện bằng học tăng cường. Tháng 1/2025, một nhóm nghiên cứu công bố [trọng số](01-nen-tang.md#weight) và quy trình huấn luyện của một mô hình suy luận. Tính đến tháng 10/2026, một số nhà phát triển chuyển từ giới hạn số token suy luận cố định sang các mức nỗ lực.

**Liên quan.** [chuỗi suy nghĩ](#chain-of-thought) · [test-time compute](#test-time-compute) · [ngân sách suy nghĩ](#thinking-budget) · [RLVR](02-du-lieu-va-huan-luyen.md#rlvr) · [chạy mô hình](01-nen-tang.md#inference)

**Nguồn.** [1] OpenAI, "Learning to reason with LLMs", 2024, https://openai.com/index/learning-to-reason-with-llms/, truy cập 2/10/2026 (S408). [2] DeepSeek-AI, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", 2025, https://arxiv.org/abs/2501.12948, truy cập 2/10/2026 (S409). [3] Anthropic, "Extended thinking" (Claude API docs), 2026, https://platform.claude.com/docs/en/build-with-claude/extended-thinking, truy cập 2/10/2026 (S424). [4] Google AI for Developers, "Gemini thinking" (cập nhật 25/9/2026), 2026, https://ai.google.dev/gemini-api/docs/thinking, truy cập 2/10/2026 (S425).

<a id="chain-of-thought"></a>
### Chain of thought (CoT) — Chuỗi suy nghĩ

*Mã: chain-of-thought · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** reasoning trace, vết suy luận. Dạng chuẩn trong sách: chuỗi suy nghĩ.

**Định nghĩa.** Chuỗi suy nghĩ là một dãy bước trung gian bằng ngôn ngữ tự nhiên do một [LLM](#llm) tạo ra trước câu trả lời cuối.

**Giải thích.** Một nghiên cứu năm 2022 cho thấy [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) có ví dụ giải từng bước giúp LLM lớn giải bài toán số học tốt hơn. Tên của kỹ thuật này là [prompt chuỗi suy nghĩ](05-prompt-ngu-canh-tri-thuc.md#chain-of-thought-prompting). Với [mô hình suy luận](#reasoning-model), kỹ sư dùng [học tăng cường](01-nen-tang.md#reinforcement-learning) để [huấn luyện](01-nen-tang.md#training) hành vi tạo các bước trung gian. Tính đến tháng 10/2026, một số nhà phát triển chỉ cho người dùng xem bản tóm tắt của chuỗi này.

**Phân biệt.** Chuỗi suy nghĩ hiển thị không phải toàn bộ tính toán bên trong [mô hình](01-nen-tang.md#model). Các nhà nghiên cứu chưa thống nhất về độ trung thực của chuỗi suy nghĩ. Một bên cho rằng chuỗi này giúp phát hiện hành vi không mong muốn ([giám sát chuỗi suy nghĩ](08-an-toan-va-alignment.md#cot-monitoring)). Bên kia cho rằng chuỗi này có thể bỏ qua yếu tố thật sự tác động tới câu trả lời. Một nghiên cứu năm 2025 đưa gợi ý vào prompt của các mô hình suy luận. Khi mô hình dùng gợi ý, phần lớn chuỗi suy nghĩ không nhắc tới gợi ý đó.

**Liên quan.** [mô hình suy luận](#reasoning-model) · [prompt chuỗi suy nghĩ](05-prompt-ngu-canh-tri-thuc.md#chain-of-thought-prompting) · [giám sát chuỗi suy nghĩ](08-an-toan-va-alignment.md#cot-monitoring)

**Nguồn.** [1] Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", 2022, https://arxiv.org/abs/2201.11903, truy cập 2/10/2026 (S420). [2] Chen et al., "Reasoning Models Don't Always Say What They Think", 2025, https://arxiv.org/abs/2505.05410, truy cập 2/10/2026 (S421). [3] OpenAI, "Learning to reason with LLMs", 2024, https://openai.com/index/learning-to-reason-with-llms/, truy cập 2/10/2026 (S408).

<a id="test-time-compute"></a>
### Test-time compute — Tính toán lúc chạy

*Mã: test-time-compute · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** inference-time scaling, tính toán lúc chạy. Dạng chuẩn trong sách: test-time compute.

**Định nghĩa.** Test-time compute là lượng [năng lực tính toán](01-nen-tang.md#compute) mà một [mô hình](01-nen-tang.md#model) dùng khi trả lời một yêu cầu, sau khi huấn luyện xong.

**Giải thích.** Tăng test-time compute có thể cải thiện kết quả mà không thay đổi [tham số](01-nen-tang.md#parameter) của mô hình. Các cách tăng test-time compute gồm:

- Tạo một [chuỗi suy nghĩ](#chain-of-thought) dài hơn trước câu trả lời cuối.
- Tạo nhiều câu trả lời, rồi chọn một câu bằng [bỏ phiếu đa số](07-danh-gia-va-chat-luong.md#majority-vote) hoặc bằng [bộ kiểm chứng](06-agent-va-tu-dong-hoa.md#verifier).
- Sửa dần một câu trả lời qua nhiều lượt.

Một nghiên cứu năm 2024 cho thấy với một số bài toán, tăng test-time compute hiệu quả hơn tăng [kích thước mô hình](03-kien-truc-mo-hinh.md#model-size).

**Phân biệt.** Test-time compute khác năng lực tính toán dùng khi [huấn luyện](01-nen-tang.md#training). Test-time compute phát sinh ở mỗi câu trả lời, nên làm tăng [chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost) và [độ trễ](11-trien-khai-san-pham-kinh-te.md#latency).

**Liên quan.** [mô hình suy luận](#reasoning-model) · [ngân sách suy nghĩ](#thinking-budget) · [quy luật mở rộng](02-du-lieu-va-huan-luyen.md#scaling-laws)

**Nguồn.** [1] Snell et al., "Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters", 2024, https://arxiv.org/abs/2408.03314, truy cập 2/10/2026 (S423). [2] OpenAI, "Learning to reason with LLMs", 2024, https://openai.com/index/learning-to-reason-with-llms/, truy cập 2/10/2026 (S408).

<a id="thinking-budget"></a>
### Thinking budget — Ngân sách suy nghĩ

*Mã: thinking-budget · Chương 4 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** thinking budget, budget_tokens, thinkingBudget. Dạng chuẩn trong sách: ngân sách suy nghĩ.

**Định nghĩa.** Ngân sách suy nghĩ là một thiết lập quy định số [token](03-kien-truc-mo-hinh.md#token) cho phần suy luận của một [mô hình suy luận](#reasoning-model). Phần suy luận đứng trước câu trả lời cuối.

**Giải thích.** Ngân sách lớn cho phép phần suy luận dài hơn. Kết quả có thể tốt hơn với bài toán khó, nhưng chi phí và [độ trễ](11-trien-khai-san-pham-kinh-te.md#latency) tăng. Token của phần suy luận được tính theo [giá theo token](11-trien-khai-san-pham-kinh-te.md#token-pricing) của token đầu ra.

Với một số [API](11-trien-khai-san-pham-kinh-te.md#api), ngân sách là mục tiêu, không phải giới hạn cứng. [Mô hình](01-nen-tang.md#model) có thể dừng phần suy luận sớm hơn ngân sách.

**Phân biệt.** Ngân sách suy nghĩ khác [số token đầu ra tối đa](#max-output-tokens). Số token đầu ra tối đa là giới hạn cứng cho toàn bộ đầu ra, gồm cả phần suy luận.

**Thay đổi gần đây.** Tính đến tháng 10/2026, một nhà phát triển lớn thay ngân sách tính bằng token bằng mức nỗ lực (effort) ở các mô hình mới. Một nhà phát triển khác khuyến nghị mức suy nghĩ (thinking level) cho mô hình mới. Nhà phát triển này vẫn giữ trường ngân sách tính bằng token cho mô hình cũ.

**Liên quan.** [mô hình suy luận](#reasoning-model) · [test-time compute](#test-time-compute) · [số token đầu ra tối đa](#max-output-tokens)

**Nguồn.** [1] Anthropic, "Extended thinking" (Claude API docs), 2026, https://platform.claude.com/docs/en/build-with-claude/extended-thinking, truy cập 2/10/2026 (S424). [2] Google AI for Developers, "Gemini thinking" (cập nhật 25/9/2026), 2026, https://ai.google.dev/gemini-api/docs/thinking, truy cập 2/10/2026 (S425). [3] Google AI for Developers, "Generating content" (Gemini API reference, mục ThinkingConfig, cập nhật 23/9/2026), 2026, https://ai.google.dev/api/generate-content, truy cập 2/10/2026 (S426).

## 4.4 Đa phương thức

<a id="multimodal-model"></a>
### Multimodal model — Mô hình đa phương thức

*Mã: multimodal-model · Chương 4 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** multimodal AI, AI đa phương thức. Dạng chuẩn trong sách: mô hình đa phương thức.

**Định nghĩa.** Mô hình đa phương thức là một [mô hình](01-nen-tang.md#model) nhận đầu vào hoặc tạo đầu ra thuộc từ 2 loại dữ liệu trở lên. Các loại dữ liệu gồm văn bản, hình ảnh, âm thanh và video. Mỗi loại dữ liệu là một phương thức.

**Giải thích.** Mô hình đa phương thức chuyển mỗi loại dữ liệu thành [token](03-kien-truc-mo-hinh.md#token) hoặc [embedding](03-kien-truc-mo-hinh.md#embedding). Ví dụ: mô hình chia một hình ảnh thành các ô nhỏ, và mỗi ô trở thành một hoặc vài token. Sau đó, mô hình xử lý token hình ảnh cùng với token văn bản.

Các cách kết hợp phương thức hay gặp:

- Đầu vào là ảnh và văn bản, đầu ra là văn bản, ví dụ: [VLM](#vlm).
- Đầu vào là văn bản, đầu ra là ảnh hoặc video, ví dụ: [mô hình tạo ảnh từ văn bản](#text-to-image-model).
- Đầu vào và đầu ra là lời nói, ví dụ: [mô hình giọng nói sang giọng nói](#speech-to-speech-model).
- Đầu vào là ảnh và văn bản, đầu ra là hành động của robot, ví dụ: [VLA](#vla).

Tính đến tháng 10/2026, một số [API](11-trien-khai-san-pham-kinh-te.md#api) quy đổi ảnh, âm thanh và video thành [token đầu vào](#input-token) để tính giá. Ví dụ: một nhà phát triển tính 32 token cho mỗi giây âm thanh.

**Ví dụ.** Chị Lan chụp ảnh một hóa đơn điện bằng điện thoại. Chị hỏi: "Tổng tiền phải trả là bao nhiêu?". Mô hình đa phương thức nhận ảnh và câu hỏi, rồi trả về số tiền ghi trên hóa đơn.

**Phân biệt.** Một ứng dụng có thể xử lý nhiều phương thức bằng cách nối nhiều mô hình riêng. Ví dụ: [nhận dạng giọng nói](#speech-recognition) chuyển lời nói thành văn bản, rồi một [LLM](#llm) xử lý văn bản đó. Mô hình đa phương thức xử lý các phương thức trong cùng một mô hình. Hai cách này khác nhau về [độ trễ](11-trien-khai-san-pham-kinh-te.md#latency) và về lượng thông tin giữ lại, ví dụ: giọng điệu của người nói.

**Không nên hiểu là.** Mô hình nhận ảnh không có nghĩa là mô hình tạo được ảnh. Mô hình xử lý nhiều phương thức cũng không xử lý tốt như nhau ở mọi phương thức. Một mô hình đọc tốt ảnh chụp văn bản vẫn có thể đọc sai bảng số, chữ viết tay hoặc ảnh mờ.

**Giới hạn.** Mô hình đa phương thức vẫn có thể tạo [ảo giác](#hallucination) về nội dung ảnh. Ví dụ: mô hình mô tả một vật không có trong ảnh. Ảnh và video tốn nhiều token, nên làm tăng [chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost).

> **THẬN TRỌNG:** Kiểm tra số liệu mà mô hình đọc từ ảnh với bản gốc. Ảnh mờ hoặc bảng phức tạp có thể gây lỗi đọc.

**Liên quan.** [VLM](#vlm) · [mô hình tạo ảnh từ văn bản](#text-to-image-model) · [OCR](#ocr) · [VLA](#vla) · [LLM](#llm)

**Nguồn.** [1] OpenAI, "GPT-4 Technical Report", 2023, https://arxiv.org/abs/2303.08774, truy cập 2/10/2026 (S406). [2] Alayrac et al., "Flamingo: a Visual Language Model for Few-Shot Learning", 2022, https://arxiv.org/abs/2204.14198, truy cập 2/10/2026 (S407). [3] Google for Developers, "Machine Learning Glossary" (mục multimodal model, modality; cập nhật 10/4/2026), https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [4] Google AI for Developers, "Understand and count tokens" (Gemini API, cập nhật 23/9/2026), 2026, https://ai.google.dev/gemini-api/docs/tokens, truy cập 2/10/2026 (S418).

<a id="vlm"></a>
### Vision-language model (VLM) — Mô hình thị giác ngôn ngữ

*Mã: vlm · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mô hình thị giác ngôn ngữ. Dạng chuẩn trong sách: VLM.

**Định nghĩa.** VLM là một [mô hình đa phương thức](#multimodal-model) nhận hình ảnh và văn bản làm đầu vào. VLM tạo văn bản làm đầu ra. VLM trả lời câu hỏi về ảnh, mô tả ảnh và đọc chữ trong ảnh.

**Giải thích.** Một số VLM nối một [mô hình](01-nen-tang.md#model) xử lý ảnh đã huấn luyện sẵn với một [LLM](#llm) đã huấn luyện sẵn. Phần xử lý ảnh chuyển ảnh thành [embedding](03-kien-truc-mo-hinh.md#embedding). LLM xử lý các embedding này cùng với [token](03-kien-truc-mo-hinh.md#token) văn bản. Kỹ sư [huấn luyện](01-nen-tang.md#training) VLM trên các cặp ảnh và văn bản thu thập từ web.

**Phân biệt.** VLM tạo văn bản. [Mô hình tạo ảnh từ văn bản](#text-to-image-model) tạo ảnh. [VLA](#vla) tạo hành động cho robot. VLM cũng khác [OCR](#ocr): OCR trích văn bản từ ảnh, còn VLM có thể trả lời câu hỏi về nội dung ảnh.

**Liên quan.** [mô hình đa phương thức](#multimodal-model) · [thị giác máy tính](#computer-vision) · [VLA](#vla)

**Nguồn.** [1] Alayrac et al., "Flamingo: a Visual Language Model for Few-Shot Learning", 2022, https://arxiv.org/abs/2204.14198, truy cập 2/10/2026 (S407).

<a id="text-to-image-model"></a>
### Text-to-image model — Mô hình tạo ảnh từ văn bản

*Mã: text-to-image-model · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mô hình tạo ảnh từ văn bản là một [mô hình](01-nen-tang.md#model) [AI tạo sinh](#generative-ai) tạo ra hình ảnh mới từ một mô tả bằng văn bản.

**Giải thích.** Mô tả bằng văn bản là [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) của người dùng. Nhiều mô hình loại này là [mô hình khuếch tán](03-kien-truc-mo-hinh.md#diffusion-model). Mô hình bắt đầu từ một ảnh nhiễu ngẫu nhiên. Qua nhiều bước, mô hình bỏ dần nhiễu theo hướng dẫn của prompt. Để giảm tính toán, một số mô hình làm các bước này trong [không gian ẩn](03-kien-truc-mo-hinh.md#latent-space), rồi chuyển kết quả thành ảnh.

**Phân biệt.** Mô hình tạo ảnh từ văn bản nhận văn bản và tạo ảnh. [VLM](#vlm) nhận ảnh và tạo văn bản. [Biến đổi ảnh sang ảnh](#image-to-image) nhận một ảnh có sẵn và tạo ảnh mới từ ảnh đó.

> **CẢNH BÁO:** Ghi nhãn ảnh do AI tạo khi ảnh mô tả người thật hoặc sự kiện thật. Ảnh không ghi nhãn có thể gây hiểu lầm và vi phạm quy định về [nhãn nội dung do AI tạo](09-bao-mat-rieng-tu-xac-thuc.md#ai-content-label).

**Liên quan.** [mô hình khuếch tán](03-kien-truc-mo-hinh.md#diffusion-model) · [biến đổi ảnh sang ảnh](#image-to-image) · [deepfake](09-bao-mat-rieng-tu-xac-thuc.md#deepfake) · [thủy vân](09-bao-mat-rieng-tu-xac-thuc.md#watermarking)

**Nguồn.** [1] Rombach et al., "High-Resolution Image Synthesis with Latent Diffusion Models", 2021, https://arxiv.org/abs/2112.10752, truy cập 2/10/2026 (S430).

<a id="image-to-image"></a>
### Image-to-image — Biến đổi ảnh sang ảnh

*Mã: image-to-image · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** image-to-image, inpainting (một dạng). Dạng chuẩn trong sách: biến đổi ảnh sang ảnh.

**Định nghĩa.** Biến đổi ảnh sang ảnh là một nhiệm vụ trong đó [mô hình](01-nen-tang.md#model) tạo ra một ảnh mới từ một ảnh có sẵn. Ví dụ: mô hình đổi phong cách của ảnh. Inpainting tạo lại một vùng đã chọn và giữ nguyên phần còn lại.

**Phân biệt.** Khác [mô hình tạo ảnh từ văn bản](#text-to-image-model), đầu vào chính là một ảnh. Ảnh đã sửa trở thành [deepfake](09-bao-mat-rieng-tu-xac-thuc.md#deepfake) khi người dùng dùng ảnh đó để lừa người xem.

**Liên quan.** [mô hình tạo ảnh từ văn bản](#text-to-image-model) · [mô hình khuếch tán](03-kien-truc-mo-hinh.md#diffusion-model) · [deepfake](09-bao-mat-rieng-tu-xac-thuc.md#deepfake)

<a id="text-to-video-model"></a>
### Text-to-video model — Mô hình tạo video từ văn bản

*Mã: text-to-video-model · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mô hình tạo video từ văn bản là một [mô hình](01-nen-tang.md#model) [AI tạo sinh](#generative-ai) tạo ra một đoạn video từ mô tả bằng văn bản. Một số mô hình loại này cũng nhận ảnh hoặc video làm đầu vào bổ sung.

**Giải thích.** Nhiều mô hình loại này là [mô hình khuếch tán](03-kien-truc-mo-hinh.md#diffusion-model), mở rộng từ ảnh sang chuỗi khung hình. Một số mô hình chia video thành các mảnh nhỏ theo không gian và thời gian. Mô hình xử lý các mảnh này như [token](03-kien-truc-mo-hinh.md#token). Một yêu cầu khó là [nhất quán theo thời gian](#temporal-consistency). Người, vật và ánh sáng phải giữ đúng qua các khung hình.

**Phân biệt.** Mô hình tạo video từ văn bản tạo video từ mô tả. [Mô hình thế giới](#world-model) dự đoán trạng thái của một [môi trường](06-agent-va-tu-dong-hoa.md#environment) sau một hành động.

**Giới hạn.** Video trông giống thật không chứng minh rằng video mô phỏng đúng vật lý. Một báo cáo kỹ thuật năm 2024 ghi nhận mô hình video không mô phỏng đúng cảnh kính vỡ.

> **CẢNH BÁO:** Kiểm tra nguồn gốc của video trước khi dùng video làm bằng chứng. Video do AI tạo có thể giống video thật.

**Liên quan.** [nhất quán theo thời gian](#temporal-consistency) · [khớp khẩu hình](#lip-sync) · [deepfake](09-bao-mat-rieng-tu-xac-thuc.md#deepfake) · [nguồn gốc nội dung](09-bao-mat-rieng-tu-xac-thuc.md#content-provenance)

**Nguồn.** [1] Ho et al., "Video Diffusion Models", 2022, https://arxiv.org/abs/2204.03458, truy cập 2/10/2026 (S431). [2] OpenAI, "Video generation models as world simulators", 2024, https://openai.com/index/video-generation-models-as-world-simulators/, truy cập 2/10/2026 (S432).

<a id="temporal-consistency"></a>
### Temporal consistency — Nhất quán theo thời gian

*Mã: temporal-consistency · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Nhất quán theo thời gian là đặc điểm của một video trong đó người, vật và chuyển động giữ ổn định qua các khung hình. Đặc điểm này là một tiêu chí chất lượng của [mô hình tạo video từ văn bản](#text-to-video-model).

**Phân biệt.** Lỗi nhất quán theo thời gian gồm vật đổi hình dạng và người đổi khuôn mặt. Một lỗi khác là vật biến mất khi một vật khác che vật đó.

**Liên quan.** [mô hình tạo video từ văn bản](#text-to-video-model) · [khớp khẩu hình](#lip-sync) · [mô hình thế giới](#world-model)

<a id="lip-sync"></a>
### Lip sync — Khớp khẩu hình

*Mã: lip-sync · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** lip sync, đồng bộ môi. Dạng chuẩn trong sách: khớp khẩu hình.

**Định nghĩa.** Khớp khẩu hình là việc tạo hoặc chỉnh chuyển động môi của người trong video cho khớp với một đoạn lời nói. [Mô hình](01-nen-tang.md#model) khớp khẩu hình phục vụ lồng tiếng, dịch video và nhân vật ảo.

**Phân biệt.** Khớp khẩu hình kết hợp với [nhân bản giọng nói](09-bao-mat-rieng-tu-xac-thuc.md#voice-cloning) có thể tạo [deepfake](09-bao-mat-rieng-tu-xac-thuc.md#deepfake) của một người thật.

**Liên quan.** [mô hình tạo video từ văn bản](#text-to-video-model) · [nhân bản giọng nói](09-bao-mat-rieng-tu-xac-thuc.md#voice-cloning) · [deepfake](09-bao-mat-rieng-tu-xac-thuc.md#deepfake)

<a id="speech-recognition"></a>
### Speech recognition (ASR) — Nhận dạng giọng nói

*Mã: speech-recognition · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** automatic speech recognition, speech-to-text, chuyển giọng nói thành văn bản. Dạng chuẩn trong sách: nhận dạng giọng nói.

**Định nghĩa.** Nhận dạng giọng nói là một nhiệm vụ AI chuyển âm thanh lời nói thành văn bản. Một [mô hình](01-nen-tang.md#model) nhận dạng giọng nói nhận một đoạn âm thanh và trả về bản ghi chữ.

**Giải thích.** Một số mô hình nhận dạng giọng nói học từ hàng trăm nghìn giờ âm thanh có bản ghi chữ. Dữ liệu này gồm nhiều ngôn ngữ. Chất lượng phụ thuộc vào giọng địa phương, tiếng ồn, thuật ngữ chuyên ngành và chất lượng micro. Kỹ sư đo chất lượng bằng tỷ lệ lỗi từ: tỷ lệ từ sai, thiếu hoặc thừa so với bản ghi chuẩn.

**Ví dụ.** Công ty An Bình ghi âm một cuộc họp 60 phút bằng tiếng Việt. Mô hình nhận dạng giọng nói tạo bản ghi chữ. Thư ký đọc lại bản ghi và sửa các tên riêng mà mô hình ghi sai.

**Phân biệt.** Chuyển văn bản thành giọng nói (text-to-speech, TTS) làm việc ngược lại: nhận văn bản và tạo âm thanh lời nói. Nhận dạng giọng nói trả về nội dung lời nói, không xác định ai đang nói.

**Liên quan.** [mô hình giọng nói sang giọng nói](#speech-to-speech-model) · [mô hình đa phương thức](#multimodal-model) · [nhân bản giọng nói](09-bao-mat-rieng-tu-xac-thuc.md#voice-cloning)

**Nguồn.** [1] Radford et al., "Robust Speech Recognition via Large-Scale Weak Supervision", 2022, https://arxiv.org/abs/2212.04356, truy cập 2/10/2026 (S433). [2] Dan Jurafsky và James H. Martin, "Speech and Language Processing" (bản nháp lần 3, chương 16 và chương 17), 2026, https://web.stanford.edu/~jurafsky/slp3/, truy cập 2/10/2026 (S401).

<a id="speech-to-speech-model"></a>
### Speech-to-speech model — Mô hình giọng nói sang giọng nói

*Mã: speech-to-speech-model · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mô hình giọng nói sang giọng nói là một [mô hình đa phương thức](#multimodal-model) nhận lời nói và trả về lời nói. Mô hình không cần bước chuyển qua văn bản ở giữa.

**Phân biệt.** Cách cũ nối 3 [mô hình](01-nen-tang.md#model) riêng: [nhận dạng giọng nói](#speech-recognition), xử lý văn bản và tạo giọng nói. Mô hình giọng nói sang giọng nói gộp các bước này.

**Liên quan.** [nhận dạng giọng nói](#speech-recognition) · [mô hình đa phương thức](#multimodal-model) · [nhân bản giọng nói](09-bao-mat-rieng-tu-xac-thuc.md#voice-cloning)

## 4.5 Thị giác máy tính và xử lý tài liệu

<a id="computer-vision"></a>
### Computer vision — Thị giác máy tính

*Mã: computer-vision · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** computer vision. Dạng chuẩn trong sách: thị giác máy tính.

**Định nghĩa.** Thị giác máy tính là một lĩnh vực của AI xử lý hình ảnh và video để nhận ra vật, người, chữ và cảnh. Thị giác máy tính trả về tên loại, vị trí, vùng ảnh hoặc mô tả.

**Giải thích.** Các nhiệm vụ cơ bản của thị giác máy tính:

- [Phân loại ảnh](#image-classification): trả về loại vật có trong ảnh.
- Phát hiện vật thể: trả về loại vật và một khung chữ nhật quanh từng vật.
- Phân đoạn: gán mỗi điểm ảnh vào một loại vật hoặc một vật cụ thể.
- [OCR](#ocr): trả về chữ có trong ảnh.

Thị giác máy tính dùng [học sâu](01-nen-tang.md#deep-learning), ví dụ: [CNN](01-nen-tang.md#cnn) hoặc [transformer](03-kien-truc-mo-hinh.md#transformer). Một số [mô hình](01-nen-tang.md#model) nhận hướng dẫn bằng văn bản và làm nhiều nhiệm vụ thị giác. Các mô hình này không cần [huấn luyện](01-nen-tang.md#training) riêng cho từng nhiệm vụ.

**Phân biệt.** Thị giác máy tính là một lĩnh vực. [VLM](#vlm) là một loại mô hình trong lĩnh vực này, kết hợp ảnh với ngôn ngữ.

**Liên quan.** [phân loại ảnh](#image-classification) · [OCR](#ocr) · [VLM](#vlm) · [CNN](01-nen-tang.md#cnn)

**Nguồn.** [1] Lin et al., "Microsoft COCO: Common Objects in Context", 2014, https://arxiv.org/abs/1405.0312, truy cập 2/10/2026 (S427). [2] Radford et al., "Learning Transferable Visual Models From Natural Language Supervision", 2021, https://arxiv.org/abs/2103.00020, truy cập 2/10/2026 (S445).

<a id="image-classification"></a>
### Image classification — Phân loại ảnh

*Mã: image-classification · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Phân loại ảnh là một nhiệm vụ [thị giác máy tính](#computer-vision) trong đó [mô hình](01-nen-tang.md#model) gán cho cả ảnh một hoặc vài loại. Một ảnh có thể nhận loại "mèo" hoặc loại "hóa đơn". Kết quả không cho vị trí của vật trong ảnh.

**Phân biệt.** Phân loại ảnh là một dạng [phân loại](01-nen-tang.md#classification). Phát hiện vật thể trả về loại và khung chữ nhật quanh từng vật. Phân đoạn gán loại cho từng điểm ảnh, nên trả về đường viền của vật.

**Liên quan.** [thị giác máy tính](#computer-vision) · [phân loại](01-nen-tang.md#classification) · [CNN](01-nen-tang.md#cnn)

<a id="ocr"></a>
### Optical character recognition (OCR) — Nhận dạng ký tự quang học

*Mã: ocr · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** nhận dạng ký tự quang học. Dạng chuẩn trong sách: OCR.

**Định nghĩa.** OCR là một nhiệm vụ [thị giác máy tính](#computer-vision) chuyển chữ trong ảnh hoặc tài liệu quét thành văn bản. Máy tính sửa và tìm kiếm được văn bản này. OCR trả về văn bản và vị trí của từng từ hoặc từng dòng.

**Giải thích.** Một hệ thống OCR tìm vùng có chữ, nhận dạng chữ, rồi sắp xếp kết quả theo trang, khối, đoạn và từ. Một số dịch vụ OCR đọc được chữ viết tay và tệp nhiều trang. Kết quả OCR là đầu vào cho [phân tích tài liệu](05-prompt-ngu-canh-tri-thuc.md#document-parsing) và [RAG](05-prompt-ngu-canh-tri-thuc.md#rag). Một số [mô hình](01-nen-tang.md#model) đọc trực tiếp ảnh tài liệu, không cần bước OCR riêng.

**Ví dụ.** Ví dụ giả định. Phòng kế toán Công ty An Bình quét 200 hóa đơn giấy. OCR chuyển mỗi hóa đơn thành văn bản. Một bước khác lấy số hóa đơn, ngày và tổng tiền từ văn bản đó.

**Phân biệt.** OCR trả về chữ, không trả về ý nghĩa của tài liệu. Bước lấy thông tin cụ thể, ví dụ: số hóa đơn, là bước sau OCR. [VLM](#vlm) có thể làm cả 2 bước trong một lần chạy.

> **THẬN TRỌNG:** Kiểm tra số tiền, ngày tháng và dấu tiếng Việt trong kết quả OCR. Lỗi OCR đi tiếp vào các bước xử lý sau.

**Liên quan.** [thị giác máy tính](#computer-vision) · [phân tích tài liệu](05-prompt-ngu-canh-tri-thuc.md#document-parsing) · [VLM](#vlm)

**Nguồn.** [1] Google Cloud, "Detect text in images" (Cloud Vision API, cập nhật 30/9/2026), 2026, https://docs.cloud.google.com/vision/docs/ocr, truy cập 2/10/2026 (S428). [2] Kim et al., "OCR-free Document Understanding Transformer", 2021, https://arxiv.org/abs/2111.15664, truy cập 2/10/2026 (S429).

## 4.6 AI vật lý

<a id="embodied-ai"></a>
### Embodied AI — AI vật lý

*Mã: embodied-ai · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** physical AI, AI hiện thân. Dạng chuẩn trong sách: AI vật lý.

**Định nghĩa.** AI vật lý là một nhóm [hệ thống AI](01-nen-tang.md#ai-system) điều khiển một máy trong thế giới thật, ví dụ: robot, xe tự lái. Hệ thống nhận dữ liệu từ cảm biến, chọn hành động và tác động lên vật thật.

**Phân biệt.** [Agent](06-agent-va-tu-dong-hoa.md#ai-agent) phần mềm hành động trên máy tính. AI vật lý hành động trên vật thật, nên lỗi có thể gây hại cho người và tài sản.

**Liên quan.** [VLA](#vla) · [robot hình người](#humanoid-robot) · [sim-to-real](#sim-to-real)

<a id="vla"></a>
### Vision-language-action model (VLA) — Mô hình thị giác ngôn ngữ hành động

*Mã: vla · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mô hình thị giác ngôn ngữ hành động. Dạng chuẩn trong sách: VLA.

**Định nghĩa.** VLA là một [mô hình đa phương thức](#multimodal-model) nhận hình ảnh từ camera và hướng dẫn bằng văn bản. VLA trả về lệnh hành động cho robot. Một số VLA biểu diễn hành động dưới dạng [token](03-kien-truc-mo-hinh.md#token), giống token văn bản.

**Phân biệt.** [VLM](#vlm) trả về văn bản. VLA trả về hành động. Một số VLA bắt đầu từ một VLM, rồi học thêm từ dữ liệu điều khiển robot.

**Liên quan.** [VLM](#vlm) · [AI vật lý](#embodied-ai) · [học bắt chước](02-du-lieu-va-huan-luyen.md#imitation-learning)

<a id="humanoid-robot"></a>
### Humanoid robot — Robot hình người

*Mã: humanoid-robot · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Robot hình người là một robot có thân, tay, chân và đầu theo hình dạng cơ thể người. Hình dạng này cho phép robot làm việc trong không gian thiết kế cho người, ví dụ: nhà xưởng có cầu thang.

**Phân biệt.** Robot hình người là phần cứng. [AI vật lý](#embodied-ai) và [VLA](#vla) nói về phần mềm điều khiển. Hình người không có nghĩa là robot có năng lực như người.

**Liên quan.** [AI vật lý](#embodied-ai) · [VLA](#vla) · [sim-to-real](#sim-to-real)

<a id="world-model"></a>
### World model — Mô hình thế giới

*Mã: world-model · Chương 4 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Mô hình thế giới là một [mô hình](01-nen-tang.md#model) dự đoán trạng thái tiếp theo của một [môi trường](06-agent-va-tu-dong-hoa.md#environment) sau một hành động. Mô hình thế giới cho phép thử hành động trong mô phỏng trước khi làm thật.

**Giải thích.** Thuật ngữ này có 2 cách dùng chính:

- Trong [học tăng cường](01-nen-tang.md#reinforcement-learning), mô hình thế giới là một mô hình học quy luật của môi trường. [Agent](06-agent-va-tu-dong-hoa.md#ai-agent) dùng mô hình này để [lập kế hoạch](06-agent-va-tu-dong-hoa.md#planning) hoặc luyện tập.
- Trong [AI tạo sinh](#generative-ai), một số nhà phát triển dùng tên này cho mô hình tạo video hoặc tạo cảnh 3 chiều tương tác được.

Sách này dùng nghĩa thứ nhất: một mô hình dự đoán trạng thái tiếp theo từ trạng thái và hành động.

**Phân biệt.** Một mô phỏng trông giống thật không chứng minh năng lực "hiểu thế giới" theo nghĩa của con người. Các mô phỏng vẫn có lỗi vật lý, ví dụ: vật đổi trạng thái sai sau va chạm.

**Thay đổi gần đây.** Năm 2024, một báo cáo kỹ thuật mô tả mô hình tạo video như một hướng đi tới mô phỏng thế giới vật lý. Tháng 8/2025, một nhà phát triển công bố mô hình tạo cảnh 3 chiều tương tác được từ mô tả bằng văn bản. Cảnh này giữ nhất quán trong vài phút.

**Liên quan.** [AI vật lý](#embodied-ai) · [mô hình tạo video từ văn bản](#text-to-video-model) · [bản sao số](#digital-twin) · [AGI](12-xa-hoi-va-tuong-lai.md#agi)

**Nguồn.** [1] Ha và Schmidhuber, "World Models", 2018, https://arxiv.org/abs/1803.10122, truy cập 2/10/2026 (S435). [2] Google DeepMind, "Genie 3: A new frontier for world models", 2025, https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/, truy cập 2/10/2026 (S436). [3] OpenAI, "Video generation models as world simulators", 2024, https://openai.com/index/video-generation-models-as-world-simulators/, truy cập 2/10/2026 (S432).

<a id="digital-twin"></a>
### Digital twin — Bản sao số

*Mã: digital-twin · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Bản sao số là một bản mô phỏng bằng phần mềm của một sản phẩm, một quy trình hoặc một nơi thật. Bản sao số nhận dữ liệu từ cảm biến của đối tượng thật để cập nhật trạng thái.

**Phân biệt.** Kỹ sư dùng bản sao số để thử robot và tạo [dữ liệu tổng hợp](02-du-lieu-va-huan-luyen.md#synthetic-data). Sau đó, kỹ sư đưa robot ra thế giới thật ([sim-to-real](#sim-to-real)).

**Liên quan.** [sim-to-real](#sim-to-real) · [AI vật lý](#embodied-ai) · [dữ liệu tổng hợp](02-du-lieu-va-huan-luyen.md#synthetic-data)

<a id="sim-to-real"></a>
### Sim-to-real — Chuyển từ mô phỏng sang thực tế

*Mã: sim-to-real · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** chuyển từ mô phỏng sang thực tế. Dạng chuẩn trong sách: sim-to-real.

**Định nghĩa.** Sim-to-real là việc chuyển một [mô hình](01-nen-tang.md#model) điều khiển robot đã [huấn luyện](01-nen-tang.md#training) trong mô phỏng sang robot thật. Khó khăn chính là khoảng cách giữa mô phỏng và thế giới thật.

**Phân biệt.** Một phương pháp giảm khoảng cách này là thay đổi ngẫu nhiên màu, ánh sáng và vật thể trong mô phỏng. Với đủ biến thể, thế giới thật trở thành một biến thể nữa đối với mô hình.

**Liên quan.** [bản sao số](#digital-twin) · [AI vật lý](#embodied-ai) · [dữ liệu tổng hợp](02-du-lieu-va-huan-luyen.md#synthetic-data)

## 4.7 Giới hạn và lỗi

<a id="hallucination"></a>
### Hallucination — Ảo giác

*Mã: hallucination · Chương 4 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** confabulation, fabrication, bịa thông tin. Dạng chuẩn trong sách: ảo giác.

**Định nghĩa.** Ảo giác là một lỗi trong đó [mô hình](01-nen-tang.md#model) [AI tạo sinh](#generative-ai) tạo ra nội dung sai hoặc không có căn cứ. Mô hình trình bày nội dung đó như thông tin đúng.

**Giải thích.** Tên "ảo giác" là một ẩn dụ. Tên này không mô tả một hiện tượng y khoa hay tâm lý trong mô hình. Một số tổ chức dùng tên "confabulation" để tránh gán đặc điểm của con người cho AI.

Mô hình tạo nội dung theo các mẫu thống kê của [dữ liệu huấn luyện](01-nen-tang.md#training-data), không tra cứu một nguồn sự thật. Khi thông tin hiếm hoặc thiếu trong dữ liệu, mô hình vẫn có thể tạo một câu trả lời trôi chảy. Một nghiên cứu năm 2025 cho rằng cách chấm điểm của nhiều [benchmark](07-danh-gia-va-chat-luong.md#benchmark) thưởng cho việc đoán hơn việc trả lời "không chắc chắn".

Một nghiên cứu tổng quan chia ảo giác thành 2 dạng. Dạng 1 là nội dung mâu thuẫn với nguồn đầu vào. Ví dụ: bản tóm tắt ghi sai số tiền trong hợp đồng. Dạng 2 là nội dung không kiểm chứng được từ nguồn đầu vào. Ví dụ: bản tóm tắt thêm một điều khoản không có trong hợp đồng.

**Ví dụ.** Luật sư Hùng yêu cầu một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) tìm bản án về tranh chấp đặt cọc. Chatbot trả về số hiệu và tóm tắt của một bản án. Luật sư Hùng tra cổng thông tin chính thức và không tìm thấy bản án này. Chatbot đã tạo ra một bản án không tồn tại.

**Phân biệt.** Không phải lỗi nào cũng là ảo giác. Các loại lỗi khác nhau cần cách sửa khác nhau:

- Lỗi nguồn: tài liệu nguồn sai hoặc đã cũ, và mô hình chép lại đúng nội dung sai đó.
- Lỗi truy xuất: hệ thống [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) lấy sai tài liệu hoặc bỏ sót tài liệu cần thiết.
- Lỗi công cụ: một công cụ trả về kết quả sai khi ứng dụng [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use).
- Lỗi suy luận: mô hình có đủ dữ kiện đúng nhưng tính toán hoặc kết luận sai.
- Ảo giác: mô hình tạo ra nội dung không có căn cứ trong nguồn và trong đầu vào.

**Không nên hiểu là.** Ảo giác không phải "nói dối". Nói dối cần chủ ý, còn mô hình tạo nội dung sai mà không có chủ ý. Ảo giác cũng không phải lỗi hiếm và ngẫu nhiên. Ảo giác là hệ quả của cách mô hình AI tạo sinh tạo nội dung theo mẫu thống kê.

**Giới hạn.** [Grounding](05-prompt-ngu-canh-tri-thuc.md#grounding), RAG và [trích nguồn](05-prompt-ngu-canh-tri-thuc.md#citation) giảm ảo giác nhưng không loại bỏ ảo giác. Một câu có trích nguồn vẫn có thể sai nếu nguồn không hỗ trợ câu đó.

> **CẢNH BÁO:** Kiểm tra mỗi trích dẫn pháp lý, số liệu và tên người với nguồn gốc. Nội dung ảo giác có thể gây thiệt hại pháp lý hoặc danh dự.

**Liên quan.** [grounding](05-prompt-ngu-canh-tri-thuc.md#grounding) · [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) · [độ bám sát nguồn](07-danh-gia-va-chat-luong.md#faithfulness) · [tính đúng sự thật](07-danh-gia-va-chat-luong.md#factuality) · [hiệu chuẩn](07-danh-gia-va-chat-luong.md#calibration) · [LLM](#llm)

**Nguồn.** [1] NIST, "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile" (NIST AI 600-1, mục 2.2 và chú thích 6), 2024, https://doi.org/10.6028/NIST.AI.600-1, truy cập 2/10/2026 (S405). [2] Ji et al., "Survey of Hallucination in Natural Language Generation", 2022, https://arxiv.org/abs/2202.03629, truy cập 2/10/2026 (S410). [3] Kalai et al., "Why Language Models Hallucinate", 2025, https://arxiv.org/abs/2509.04664, truy cập 2/10/2026 (S411).

<a id="knowledge-cutoff"></a>
### Knowledge cutoff — Ngày giới hạn kiến thức

*Mã: knowledge-cutoff · Chương 4 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** training data cutoff, ngày cắt dữ liệu. Dạng chuẩn trong sách: ngày giới hạn kiến thức.

**Định nghĩa.** Ngày giới hạn kiến thức là ngày cuối cùng của [dữ liệu huấn luyện](01-nen-tang.md#training-data) một [mô hình](01-nen-tang.md#model). Mô hình không có thông tin về các sự kiện sau ngày này, trừ khi ứng dụng đưa thông tin mới vào đầu vào.

**Giải thích.** Nhà phát triển thu thập dữ liệu đến một ngày, rồi [huấn luyện](01-nen-tang.md#training) mô hình. Sau đó, nhà phát triển cần thêm thời gian để [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training), [đánh giá](07-danh-gia-va-chat-luong.md#evaluation) và phát hành mô hình. Mô hình đã phát hành không tự cập nhật thông tin trong [tham số](01-nen-tang.md#parameter).

Ứng dụng bù cho ngày giới hạn kiến thức bằng 2 cách. Cách 1 là tìm kiếm web qua [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use). Cách 2 là đưa tài liệu mới vào [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt), ví dụ: qua [RAG](05-prompt-ngu-canh-tri-thuc.md#rag). Cả 2 cách đưa thông tin vào [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) của lần chạy, không thay đổi tham số.

Một nhà phát triển có thể công bố 2 loại ngày. Loại 1 là ngày giới hạn của dữ liệu huấn luyện. Loại 2 là ngày mà đến đó thông tin trong mô hình đầy đủ và đáng tin cậy nhất.

**Ví dụ.** Ví dụ giả định. Một mô hình có ngày giới hạn kiến thức là tháng 3/2026. Tháng 9/2026, chị Lan hỏi mô hình về một nghị định ban hành tháng 5/2026. Khi không có công cụ tìm kiếm, mô hình có thể trả lời theo văn bản cũ hoặc tạo ra nội dung sai. Khi ứng dụng bật tìm kiếm web, mô hình có thể nhận văn bản mới trong ngữ cảnh và trả lời theo văn bản đó.

**Phân biệt.** Ngày giới hạn kiến thức khác ngày phát hành mô hình. Ngày phát hành đến sau ngày giới hạn kiến thức, có khi cách nhiều tháng. Ví dụ: tài liệu của một nhà phát triển ghi một mô hình có kiến thức đáng tin cậy đến tháng 2/2025. Mã [phiên bản mô hình](#model-version) của mô hình này ghi ngày 1/10/2025.

**Không nên hiểu là.** Ngày giới hạn kiến thức không có nghĩa là mô hình có đủ thông tin đến đúng ngày đó. Một nghiên cứu năm 2024 cho thấy ngày giới hạn thực tế của từng nguồn dữ liệu thường khác ngày nhà phát triển công bố. Một nguyên nhân là dữ liệu web mới thu thập vẫn chứa nhiều trang cũ. Mô hình cũng không có thông tin về ngày người dùng đặt câu hỏi, trừ khi ứng dụng đưa ngày đó vào prompt.

**Giới hạn.** Tìm kiếm web chỉ bù phần thông tin mà công cụ tìm thấy. Chất lượng câu trả lời phụ thuộc vào chất lượng của nguồn tìm được.

> **THẬN TRỌNG:** Kiểm tra ngày giới hạn kiến thức trong tài liệu của nhà phát triển trước khi dùng mô hình cho việc cần thông tin mới. Thông tin về luật, giá và nhân sự có thể đã cũ.

**Liên quan.** [LLM](#llm) · [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining) · [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) · [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use) · [model card](#model-card)

**Nguồn.** [1] Cheng et al., "Dated Data: Tracing Knowledge Cutoffs in Large Language Models", 2024, https://arxiv.org/abs/2403.12958, truy cập 2/10/2026 (S412). [2] Anthropic, "Transparency Hub", 2026, https://www.anthropic.com/transparency, truy cập 2/10/2026 (S413). [3] Anthropic, "Models overview" (Claude API docs), 2026, https://platform.claude.com/docs/en/about-claude/models/overview, truy cập 2/10/2026 (S460). [4] Anthropic, "Model deprecations" (Claude API docs), 2026, https://platform.claude.com/docs/en/about-claude/model-deprecations, truy cập 2/10/2026 (S438).

<a id="stochastic-parrot"></a>
### Stochastic parrot — Con vẹt ngẫu nhiên

*Mã: stochastic-parrot · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** stochastic parrot. Dạng chuẩn trong sách: con vẹt ngẫu nhiên.

**Định nghĩa.** Con vẹt ngẫu nhiên là một phép so sánh mô tả [mô hình ngôn ngữ](#language-model), do một nhóm tác giả đưa ra năm 2021. Theo phép so sánh này, mô hình ghép chuỗi chữ đã thấy theo [xác suất](01-nen-tang.md#probability), không gắn với nghĩa.

**Phân biệt.** Các nhà nghiên cứu chưa thống nhất về phép so sánh này. Một bên cho rằng [LLM](#llm) chỉ lặp lại mẫu thống kê. Bên kia cho rằng phép so sánh này bỏ qua kết quả đo năng lực của [mô hình](01-nen-tang.md#model).

**Liên quan.** [mô hình ngôn ngữ](#language-model) · [năng lực phát sinh](#emergent-abilities) · [căn phòng tiếng Trung](12-xa-hoi-va-tuong-lai.md#chinese-room)

<a id="emergent-abilities"></a>
### Emergent abilities — Năng lực phát sinh

*Mã: emergent-abilities · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Năng lực phát sinh là năng lực không thấy ở [mô hình](01-nen-tang.md#model) nhỏ nhưng xuất hiện ở mô hình lớn hơn cùng họ. Kết quả của mô hình nhỏ không cho phép dự đoán năng lực này.

**Phân biệt.** Các nhà nghiên cứu chưa thống nhất về hiện tượng này. Một bên cho rằng năng lực phát sinh là thay đổi thật theo [kích thước mô hình](03-kien-truc-mo-hinh.md#model-size). Bên kia cho rằng bước nhảy đột ngột đến từ cách chọn thước đo.

**Liên quan.** [quy luật mở rộng](02-du-lieu-va-huan-luyen.md#scaling-laws) · [benchmark](07-danh-gia-va-chat-luong.md#benchmark) · [con vẹt ngẫu nhiên](#stochastic-parrot)

<a id="grokking"></a>
### Grokking — Grokking

*Mã: grokking · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Grokking là hiện tượng một [mạng nơ-ron](01-nen-tang.md#neural-network) bắt đầu [tổng quát hóa](01-nen-tang.md#generalization) tốt lâu sau khi đã khớp hoàn toàn dữ liệu đã học. Một nghiên cứu năm 2022 mô tả hiện tượng này trên các bài toán nhỏ về phép tính.

**Phân biệt.** Grokking xảy ra sau giai đoạn [quá khớp](01-nen-tang.md#overfitting). Trên dữ liệu kiểm tra, [tỷ lệ dự đoán đúng](07-danh-gia-va-chat-luong.md#accuracy) tăng từ mức đoán ngẫu nhiên lên gần tuyệt đối.

**Liên quan.** [quá khớp](01-nen-tang.md#overfitting) · [tổng quát hóa](01-nen-tang.md#generalization) · [mechanistic interpretability](08-an-toan-va-alignment.md#mechanistic-interpretability)

<a id="mode-collapse"></a>
### Mode collapse — Sụp đổ chế độ

*Mã: mode-collapse · Chương 4 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** sụp đổ chế độ. Dạng chuẩn trong sách: mode collapse.

**Định nghĩa.** Mode collapse là một lỗi trong đó một [mô hình](01-nen-tang.md#model) tạo sinh chỉ tạo ra một số ít kiểu đầu ra lặp lại. Đầu ra kém đa dạng hơn [dữ liệu huấn luyện](01-nen-tang.md#training-data).

**Phân biệt.** Ở [GAN](03-kien-truc-mo-hinh.md#gan), mode collapse làm mô hình tạo nhiều ảnh gần giống nhau. Một số nhà nghiên cứu dùng tên này cho [LLM](#llm) có đầu ra kém đa dạng sau [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training). Mode collapse khác [sụp đổ mô hình](12-xa-hoi-va-tuong-lai.md#model-collapse).

**Liên quan.** [GAN](03-kien-truc-mo-hinh.md#gan) · [sụp đổ mô hình](12-xa-hoi-va-tuong-lai.md#model-collapse) · [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training)

## 4.8 Vòng đời mô hình

<a id="model-card"></a>
### Model card — Thẻ mô hình

*Mã: model-card · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** thẻ mô hình. Dạng chuẩn trong sách: model card.

**Định nghĩa.** Model card là một tài liệu ngắn đi kèm một [mô hình](01-nen-tang.md#model). Model card mô tả mục đích dùng, dữ liệu, kết quả [đánh giá](07-danh-gia-va-chat-luong.md#evaluation) và giới hạn của mô hình.

**Giải thích.** Ý tưởng model card được công bố năm 2018. Một model card có các phần sau:

- Thông tin về mô hình: nhà phát triển, phiên bản, ngày, giấy phép.
- Mục đích dùng và các cách dùng không phù hợp.
- Kết quả đánh giá theo từng nhóm người hoặc từng điều kiện.
- Giới hạn, rủi ro và khuyến nghị.

**Phân biệt.** Model card mô tả một mô hình. [System card](08-an-toan-va-alignment.md#system-card) mô tả một mô hình cùng hệ thống bao quanh mô hình, thường có thêm kết quả kiểm tra an toàn. [Hồ sơ kỹ thuật](10-phap-ly-quan-tri-chinh-sach.md#technical-documentation) là tài liệu theo nghĩa vụ pháp luật, có nội dung do luật quy định.

**Không nên hiểu là.** Nhà phát triển tự viết model card. Model card không phải kết quả [kiểm toán AI](10-phap-ly-quan-tri-chinh-sach.md#ai-audit) độc lập.

**Liên quan.** [system card](08-an-toan-va-alignment.md#system-card) · [hồ sơ kỹ thuật](10-phap-ly-quan-tri-chinh-sach.md#technical-documentation) · [phiên bản mô hình](#model-version)

**Nguồn.** [1] Mitchell et al., "Model Cards for Model Reporting", 2018, https://arxiv.org/abs/1810.03993, truy cập 2/10/2026 (S437).

<a id="model-version"></a>
### Model version — Phiên bản mô hình

*Mã: model-version · Chương 4 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** model snapshot, mã mô hình. Dạng chuẩn trong sách: phiên bản mô hình.

**Định nghĩa.** Phiên bản mô hình là một bản cố định của một [mô hình](01-nen-tang.md#model), có mã riêng. Người dùng ghi mã này trong yêu cầu gửi tới [API](11-trien-khai-san-pham-kinh-te.md#api) để gọi đúng bản mô hình.

**Giải thích.** Một tên mô hình có thể có nhiều phiên bản. Một số nhà phát triển gắn ngày vào mã phiên bản. Một tên rút gọn (alias) có thể chuyển sang phiên bản khác khi nhà phát triển phát hành bản cập nhật. Hai phiên bản của cùng một tên mô hình có thể cho kết quả khác nhau với cùng một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt). Doanh nghiệp dùng [ghim phiên bản](11-trien-khai-san-pham-kinh-te.md#version-pinning) và [kiểm thử hồi quy](07-danh-gia-va-chat-luong.md#regression-test) để kiểm soát thay đổi này.

**Phân biệt.** Ngừng hỗ trợ (deprecation) là giai đoạn nhà phát triển không còn khuyến nghị một phiên bản. Nhà phát triển công bố ngày gỡ bỏ phiên bản đó. Sau ngày gỡ bỏ, các yêu cầu gửi tới phiên bản đó thất bại. Tính đến tháng 10/2026, một nhà phát triển cam kết báo trước ít nhất 60 ngày trước khi gỡ bỏ một mô hình công khai.

> **THẬN TRỌNG:** Ghim phiên bản mô hình trong các quy trình quan trọng. Kiểm tra lại kết quả trước khi chuyển sang phiên bản khác.

**Liên quan.** [ghim phiên bản](11-trien-khai-san-pham-kinh-te.md#version-pinning) · [model card](#model-card) · [trôi mô hình](07-danh-gia-va-chat-luong.md#model-drift)

**Nguồn.** [1] Anthropic, "Model deprecations" (Claude API docs), 2026, https://platform.claude.com/docs/en/about-claude/model-deprecations, truy cập 2/10/2026 (S438). [2] Anthropic, "Model IDs and versioning" (Claude API docs), 2026, https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions, truy cập 2/10/2026 (S461).
