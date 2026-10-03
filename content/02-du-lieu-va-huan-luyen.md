---
chapter: 2
title: "Dữ liệu và huấn luyện"
file: 02-du-lieu-va-huan-luyen.md
terms: 41
bible_version: "0.2"
version: "0.1"
updated: 2026-10-02
status: review
---

# Chương 2 — Dữ liệu và huấn luyện

Chương này giải thích cách nhà phát triển tạo ra một mô hình lớn từ dữ liệu. Phần đầu mô tả các giai đoạn huấn luyện: huấn luyện trước, hậu huấn luyện và tinh chỉnh. Phần thứ hai mô tả cách mô hình học từ phản hồi của con người và của máy. Phần thứ ba nêu dữ liệu đến từ đâu, được làm sạch thế nào, và ai có quyền dùng dữ liệu. Phần cuối giải thích quy luật mở rộng và giới hạn của quy luật này. Dữ liệu huấn luyện cũng là tâm điểm của các tranh chấp về bản quyền và dữ liệu cá nhân.

## 2.1 Các giai đoạn huấn luyện

<a id="pretraining"></a>
### Pretraining — Huấn luyện trước

*Mã: pretraining · Chương 2 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tiền huấn luyện, pre-training. Dạng chuẩn trong sách: huấn luyện trước.

**Định nghĩa.** Huấn luyện trước là giai đoạn [huấn luyện](01-nen-tang.md#training) đầu tiên của một [mô hình](01-nen-tang.md#model) lớn. Mô hình học các mẫu chung từ lượng dữ liệu lớn, chưa gắn với một nhiệm vụ cụ thể.

**Giải thích.** Với một [LLM](04-llm-va-mo-hinh-sinh.md#llm), dữ liệu huấn luyện trước gồm văn bản web, sách, mã máy tính và các nguồn khác. Phần lớn LLM học bằng cách [dự đoán token tiếp theo](04-llm-va-mo-hinh-sinh.md#next-token-prediction). Đây là một dạng [học tự giám sát](01-nen-tang.md#self-supervised-learning). Văn bản tự cho đáp án, nên không cần người gán nhãn.

Huấn luyện trước dùng lượng dữ liệu lớn hơn nhiều so với các giai đoạn sau. Kết quả của giai đoạn này là một [mô hình gốc](04-llm-va-mo-hinh-sinh.md#base-model). Mô hình gốc viết tiếp được văn bản. Nhưng mô hình gốc chưa được dạy để làm theo hướng dẫn.

**Ví dụ.** Ví dụ giả định. Công ty An Bình huấn luyện trước một mô hình trên văn bản tiếng Việt từ báo, sách và web. Mô hình nhận đầu vào "Hà Nội là thủ đô" và viết tiếp "của Việt Nam". Người dùng nhập "Hãy tóm tắt hợp đồng này". Mô hình có thể viết thêm một câu lệnh khác, không tóm tắt.

**Phân biệt.** Huấn luyện trước tạo năng lực chung từ dữ liệu lớn. [Hậu huấn luyện](#post-training) gồm các giai đoạn sau, dạy mô hình làm theo hướng dẫn và trả lời an toàn. [Tinh chỉnh](#fine-tuning) là bước huấn luyện thêm cho một mục đích hẹp. Nhà phát triển mô hình làm huấn luyện trước. Một doanh nghiệp dùng mô hình có sẵn có thể tinh chỉnh, hoặc không huấn luyện thêm.

**Không nên hiểu là.** Huấn luyện trước không lưu văn bản để tra cứu như một cơ sở dữ liệu. Mô hình lưu các mẫu thống kê trong [tham số](01-nen-tang.md#parameter). Dù vậy, mô hình vẫn có thể nhớ nguyên văn một phần [dữ liệu huấn luyện](01-nen-tang.md#training-data) (xem [ghi nhớ dữ liệu huấn luyện](09-bao-mat-rieng-tu-xac-thuc.md#memorization)).

**Giới hạn.** Mô hình không có thông tin về sự kiện sau [ngày giới hạn kiến thức](04-llm-va-mo-hinh-sinh.md#knowledge-cutoff). Huấn luyện trước không bảo đảm mô hình tạo ra thông tin đúng. Dữ liệu web chứa lỗi và thiên lệch.

**Liên quan.** [hậu huấn luyện](#post-training) · [tinh chỉnh](#fine-tuning) · [quy luật mở rộng](#scaling-laws) · [thu thập dữ liệu web](#web-crawl) · [mô hình nền tảng](04-llm-va-mo-hinh-sinh.md#foundation-model)

**Nguồn.** [1] Devlin et al., "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", 2018, https://arxiv.org/abs/1810.04805, truy cập 2/10/2026 (S207). [2] Brown et al., "Language Models are Few-Shot Learners", 2020, https://arxiv.org/abs/2005.14165, truy cập 2/10/2026 (S208). [3] Google for Developers, "Machine Learning Glossary" (mục pre-training), cập nhật 10/4/2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="mid-training"></a>
### Mid-training — Huấn luyện giữa kỳ

*Mã: mid-training · Chương 2 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** huấn luyện giữa kỳ. Dạng chuẩn trong sách: mid-training.

**Định nghĩa.** Mid-training là một giai đoạn nằm giữa [huấn luyện trước](#pretraining) và [hậu huấn luyện](#post-training). Giai đoạn này dùng dữ liệu chọn lọc, ví dụ: toán, lập trình, văn bản dài.

**Phân biệt.** Mid-training khác [tinh chỉnh](#fine-tuning): mid-training giữ năng lực chung của [mô hình](01-nen-tang.md#model).

**Thay đổi gần đây.** Tính đến tháng 10/2026, tên và phạm vi của giai đoạn này chưa thống nhất. Tháng 10/2025, 2 bài tổng quan trên arXiv đề xuất định nghĩa riêng.

**Liên quan.** [huấn luyện trước](#pretraining) · [hậu huấn luyện](#post-training) · [học theo giáo trình](#curriculum-learning)

<a id="post-training"></a>
### Post-training — Hậu huấn luyện

*Mã: post-training · Chương 2 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** post-training. Dạng chuẩn trong sách: hậu huấn luyện.

**Định nghĩa.** Hậu huấn luyện là tập hợp các giai đoạn [huấn luyện](01-nen-tang.md#training) diễn ra sau [huấn luyện trước](#pretraining). Hậu huấn luyện dạy mô hình làm theo hướng dẫn, trả lời theo dạng hội thoại và tránh nội dung gây hại.

**Giải thích.** Đầu vào của hậu huấn luyện là một [mô hình](01-nen-tang.md#model) đã huấn luyện trước, tên là [mô hình gốc](04-llm-va-mo-hinh-sinh.md#base-model). Các nhóm phương pháp chính gồm:

- Học từ câu trả lời mẫu, ví dụ: [SFT](#sft).
- Học từ so sánh giữa các câu trả lời, ví dụ: [RLHF](#rlhf), [DPO](#dpo).
- Học từ kết quả kiểm tra tự động, ví dụ: [RLVR](#rlvr).

Dữ liệu của hậu huấn luyện ít hơn dữ liệu của huấn luyện trước nhiều lần. Nhưng con người hoặc chương trình kiểm tra chọn dữ liệu này kỹ hơn. Người dùng gặp kết quả của hậu huấn luyện trong [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) và qua [API](11-trien-khai-san-pham-kinh-te.md#api).

**Ví dụ.** Năm 2022, nhóm nghiên cứu của OpenAI công bố quy trình hậu huấn luyện InstructGPT. Quy trình gồm 3 bước: SFT, tạo [mô hình phần thưởng](#reward-model), và [học tăng cường](01-nen-tang.md#reinforcement-learning). Mô hình sau hậu huấn luyện có 1,3 tỷ [tham số](01-nen-tang.md#parameter). Người chấm chọn câu trả lời của mô hình này nhiều hơn câu trả lời của GPT-3 có 175 tỷ tham số.

**Phân biệt.** Nhà phát triển làm hậu huấn luyện trước khi phát hành mô hình, cho mục đích chung. [Tinh chỉnh](#fine-tuning) phục vụ một mục đích hẹp. Người làm tinh chỉnh cần quyền truy cập [trọng số](01-nen-tang.md#weight) hoặc dịch vụ tinh chỉnh. Hai khái niệm giao nhau: SFT là kỹ thuật dùng trong cả hai.

**Không nên hiểu là.** Hậu huấn luyện không phải nguồn chính của kiến thức trong mô hình. Năm 2024, một nghiên cứu ghi nhận [LLM](04-llm-va-mo-hinh-sinh.md#llm) thu kiến thức sự thật chủ yếu ở huấn luyện trước. Hậu huấn luyện chủ yếu thay đổi cách mô hình dùng kiến thức và cách mô hình trả lời.

**Giới hạn.** Hậu huấn luyện giảm nhưng không loại bỏ câu trả lời sai và nội dung gây hại. Người dùng vẫn có thể vượt qua hành vi từ chối bằng [jailbreak](08-an-toan-va-alignment.md#jailbreak).

**Thay đổi gần đây.** Từ năm 2024, hậu huấn luyện có thêm học tăng cường với phần thưởng kiểm tra được. Năm 2025, một nhóm phát triển công bố kết quả trên tạp chí Nature. Nhóm này dùng học tăng cường để tạo năng lực suy luận mà không cần lời giải mẫu do người viết.

**Liên quan.** [huấn luyện trước](#pretraining) · [SFT](#sft) · [RLHF](#rlhf) · [RLVR](#rlvr) · [alignment](08-an-toan-va-alignment.md#alignment)

**Nguồn.** [1] Ouyang et al., "Training language models to follow instructions with human feedback", 2022, https://arxiv.org/abs/2203.02155, truy cập 2/10/2026 (S201). [2] Lambert et al., "Tulu 3: Pushing Frontiers in Open Language Model Post-Training", 2024, https://arxiv.org/abs/2411.15124, truy cập 2/10/2026 (S214). [3] DeepSeek-AI, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", 2025 (Nature 645), https://arxiv.org/abs/2501.12948, truy cập 2/10/2026 (S216). [4] Gekhman et al., "Does Fine-Tuning LLMs on New Knowledge Encourage Hallucinations?", 2024, https://arxiv.org/abs/2405.05904, truy cập 2/10/2026 (S210).

<a id="fine-tuning"></a>
### Fine-tuning — Tinh chỉnh

*Mã: fine-tuning · Chương 2 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** fine-tuning, tinh chỉnh mô hình. Dạng chuẩn trong sách: tinh chỉnh.

**Định nghĩa.** Tinh chỉnh là một bước [huấn luyện](01-nen-tang.md#training) thêm cho một [mô hình](01-nen-tang.md#model) đã có năng lực chung. Bước này dùng dữ liệu nhỏ hơn cho một nhiệm vụ cụ thể, và thay đổi trọng số của mô hình.

**Giải thích.** Điểm xuất phát của tinh chỉnh là một mô hình đã qua [huấn luyện trước](#pretraining), có thể đã qua cả [hậu huấn luyện](#post-training). Tinh chỉnh điều chỉnh [trọng số](01-nen-tang.md#weight) để mô hình làm tốt hơn một việc hẹp. Ví dụ: phân nhóm thư, viết theo mẫu văn bản của công ty, trả lời theo định dạng cố định. Tinh chỉnh thường cần vài trăm đến vài nghìn ví dụ.

Tinh chỉnh toàn phần cập nhật tất cả trọng số. [PEFT](#peft) giữ nguyên phần lớn trọng số và chỉ cập nhật hoặc thêm một phần nhỏ. Kỹ thuật học thường dùng là [SFT](#sft).

**Ví dụ.** Ví dụ giả định. Công ty Luật An Bình có 2.000 email đã xếp vào 5 nhóm việc. Kỹ sư tinh chỉnh một mô hình nhỏ trên 2.000 email này. Sau đó, mô hình nhận một email mới và trả về tên nhóm việc phù hợp.

**Phân biệt.** Có 3 cách đưa thông tin riêng của doanh nghiệp vào câu trả lời:

- Tinh chỉnh thay đổi trọng số, và thay đổi này có tác dụng ở các lần chạy sau.
- [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) tìm đoạn tài liệu ở mỗi lần chạy, rồi đưa đoạn đó vào [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt).
- Đưa tài liệu vào prompt chỉ có tác dụng trong lần chạy đó.

RAG và prompt không thay đổi trọng số. Tinh chỉnh cũng khác [hậu huấn luyện](#post-training) do nhà phát triển làm cho mục đích chung.

**Không nên hiểu là.** Tinh chỉnh không phải cách tin cậy để nạp kiến thức mới, ví dụ: một văn bản luật mới. Năm 2023, một nghiên cứu ghi nhận [LLM](04-llm-va-mo-hinh-sinh.md#llm) khó học sự kiện mới qua tinh chỉnh. Trong phép thử của nghiên cứu này, RAG cho kết quả tốt hơn tinh chỉnh. Năm 2024, một nghiên cứu khác ghi nhận LLM học ví dụ chứa kiến thức mới chậm hơn ví dụ chứa kiến thức đã biết. Nghiên cứu này cũng ghi nhận [ảo giác](04-llm-va-mo-hinh-sinh.md#hallucination) tăng khi mô hình học các ví dụ chứa kiến thức mới. Viết hoặc sửa prompt cũng không phải tinh chỉnh.

**Giới hạn.** Tinh chỉnh có thể làm mô hình kém đi ở việc khác ([quên thảm khốc](#catastrophic-forgetting)). Quyền tinh chỉnh do [giấy phép mô hình](11-trien-khai-san-pham-kinh-te.md#model-license) và điều khoản dịch vụ quyết định.

> **THẬN TRỌNG:** Kiểm tra lại mô hình sau tinh chỉnh trên cả việc cũ và việc mới. Tinh chỉnh có thể làm giảm chất lượng ở việc không có trong dữ liệu tinh chỉnh.

**Liên quan.** [huấn luyện trước](#pretraining) · [PEFT](#peft) · [SFT](#sft) · [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) · [quên thảm khốc](#catastrophic-forgetting) · [LoRA](03-kien-truc-mo-hinh.md#lora)

**Nguồn.** [1] Devlin et al., "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", 2018, https://arxiv.org/abs/1810.04805, truy cập 2/10/2026 (S207). [2] Ovadia et al., "Fine-Tuning or Retrieval? Comparing Knowledge Injection in LLMs", 2023, https://arxiv.org/abs/2312.05934, truy cập 2/10/2026 (S209). [3] Gekhman et al., "Does Fine-Tuning LLMs on New Knowledge Encourage Hallucinations?", 2024, https://arxiv.org/abs/2405.05904, truy cập 2/10/2026 (S210). [4] Google for Developers, "Machine Learning Glossary" (mục fine-tuning), cập nhật 10/4/2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="sft"></a>
### Supervised fine-tuning (SFT) — Tinh chỉnh có giám sát

*Mã: sft · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tinh chỉnh có giám sát. Dạng chuẩn trong sách: SFT.

**Định nghĩa.** SFT là một phương pháp [tinh chỉnh](#fine-tuning) trong đó [mô hình](01-nen-tang.md#model) học từ các cặp đầu vào và đầu ra mẫu. Mô hình học để tạo ra đầu ra giống đầu ra mẫu.

**Giải thích.** SFT là [học có giám sát](01-nen-tang.md#supervised-learning) cho một mô hình đã [huấn luyện trước](#pretraining). Mỗi ví dụ gồm một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) và một câu trả lời mẫu. Mô hình điều chỉnh [tham số](01-nen-tang.md#parameter) để tăng [xác suất](01-nen-tang.md#probability) tạo ra câu trả lời mẫu. Trong các quy trình [hậu huấn luyện](#post-training) công bố năm 2022 và năm 2024, SFT là bước đầu. Câu trả lời mẫu có thể do người viết, hoặc do một mô hình khác tạo ra ([dữ liệu tổng hợp](#synthetic-data)).

**Phân biệt.** Một số tài liệu dùng SFT và [instruction tuning](#instruction-tuning) thay cho nhau. Sách này tách 2 khái niệm. SFT là phương pháp học từ đáp án mẫu. Instruction tuning là mục tiêu dạy mô hình làm theo hướng dẫn, và thường dùng SFT. SFT cũng phục vụ mục tiêu khác, ví dụ: trả lời theo một định dạng cố định.

**Liên quan.** [tinh chỉnh](#fine-tuning) · [instruction tuning](#instruction-tuning) · [hậu huấn luyện](#post-training) · [RLHF](#rlhf)

**Nguồn.** [1] Ouyang et al., "Training language models to follow instructions with human feedback", 2022, https://arxiv.org/abs/2203.02155, truy cập 2/10/2026 (S201). [2] Zhang et al., "Instruction Tuning for Large Language Models: A Survey", 2023, https://arxiv.org/abs/2308.10792, truy cập 2/10/2026 (S212). [3] Lambert et al., "Tulu 3: Pushing Frontiers in Open Language Model Post-Training", 2024, https://arxiv.org/abs/2411.15124, truy cập 2/10/2026 (S214).

<a id="instruction-tuning"></a>
### Instruction tuning — Tinh chỉnh theo hướng dẫn

*Mã: instruction-tuning · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tinh chỉnh theo hướng dẫn. Dạng chuẩn trong sách: instruction tuning.

**Định nghĩa.** Instruction tuning là một phương pháp [tinh chỉnh](#fine-tuning) dạy [mô hình](01-nen-tang.md#model) làm theo hướng dẫn viết bằng ngôn ngữ tự nhiên. Dữ liệu gồm nhiều nhiệm vụ, và mỗi nhiệm vụ có một câu hướng dẫn.

**Giải thích.** Mỗi ví dụ gồm một hướng dẫn, ví dụ "Dịch câu sau sang tiếng Anh", và một đầu ra đúng. Sau bước này, mô hình làm được cả một số nhiệm vụ không có trong [dữ liệu huấn luyện](01-nen-tang.md#training-data). Người dùng chỉ cần mô tả nhiệm vụ bằng lời ([zero-shot](05-prompt-ngu-canh-tri-thuc.md#zero-shot)). Năm 2021, một nhóm nghiên cứu thử cách này trên 25 nhiệm vụ. Mô hình sau instruction tuning cho kết quả cao hơn một mô hình lớn hơn ở 20 nhiệm vụ. Kết quả của bước này là một [mô hình đã tinh chỉnh theo hướng dẫn](04-llm-va-mo-hinh-sinh.md#instruction-tuned-model).

**Phân biệt.** Instruction tuning nói về mục tiêu và loại dữ liệu: các cặp hướng dẫn và đầu ra. [SFT](#sft) nói về phương pháp học từ đáp án mẫu. Instruction tuning thường dùng SFT, nhưng 2 tên không đồng nghĩa. Instruction tuning cũng khác [kỹ thuật prompt](05-prompt-ngu-canh-tri-thuc.md#prompt-engineering). Viết [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) không thay đổi [trọng số](01-nen-tang.md#weight).

**Liên quan.** [SFT](#sft) · [tinh chỉnh](#fine-tuning) · [hậu huấn luyện](#post-training) · [mô hình đã tinh chỉnh theo hướng dẫn](04-llm-va-mo-hinh-sinh.md#instruction-tuned-model)

**Nguồn.** [1] Wei et al., "Finetuned Language Models Are Zero-Shot Learners", 2021, https://arxiv.org/abs/2109.01652, truy cập 2/10/2026 (S211). [2] Zhang et al., "Instruction Tuning for Large Language Models: A Survey", 2023, https://arxiv.org/abs/2308.10792, truy cập 2/10/2026 (S212). [3] Google for Developers, "Machine Learning Glossary" (mục instruction tuning), cập nhật 10/4/2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="peft"></a>
### Parameter-efficient fine-tuning (PEFT) — Tinh chỉnh tiết kiệm tham số

*Mã: peft · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tinh chỉnh tiết kiệm tham số, parameter-efficient tuning. Dạng chuẩn trong sách: PEFT.

**Định nghĩa.** PEFT là một nhóm kỹ thuật [tinh chỉnh](#fine-tuning) giữ nguyên phần lớn [mô hình](01-nen-tang.md#model) và chỉ cập nhật một phần nhỏ. Nhóm kỹ thuật này tốn ít tính toán và ít dung lượng lưu trữ hơn tinh chỉnh toàn phần.

**Phân biệt.** [LoRA](03-kien-truc-mo-hinh.md#lora) và [adapter](03-kien-truc-mo-hinh.md#adapter) là 2 kỹ thuật thuộc nhóm PEFT, không phải tên khác của PEFT.

**Liên quan.** [tinh chỉnh](#fine-tuning) · [LoRA](03-kien-truc-mo-hinh.md#lora) · [adapter](03-kien-truc-mo-hinh.md#adapter)

<a id="transfer-learning"></a>
### Transfer learning — Học chuyển giao

*Mã: transfer-learning · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học chuyển giao là một phương pháp [học máy](01-nen-tang.md#machine-learning) dùng kết quả học của nhiệm vụ này cho nhiệm vụ khác. Ví dụ: chuyển từ nhiệm vụ có nhiều dữ liệu sang nhiệm vụ có ít dữ liệu.

**Phân biệt.** [Tinh chỉnh](#fine-tuning) là một dạng học chuyển giao. Học chuyển giao là khái niệm rộng hơn.

**Liên quan.** [tinh chỉnh](#fine-tuning) · [huấn luyện trước](#pretraining) · [PEFT](#peft)

<a id="distillation"></a>
### Knowledge distillation — Chưng cất tri thức

*Mã: distillation · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** distillation, chưng cất mô hình. Dạng chuẩn trong sách: chưng cất tri thức.

**Định nghĩa.** Chưng cất tri thức là một phương pháp [huấn luyện](01-nen-tang.md#training). Một [mô hình](01-nen-tang.md#model) nhỏ (mô hình học) học tạo ra đầu ra giống một mô hình lớn hơn (mô hình dạy).

**Giải thích.** Mô hình dạy tạo ra đầu ra cho một tập đầu vào. Mô hình học dùng các đầu ra này làm đáp án. Trong bài gốc năm 2015, mục tiêu học là [xác suất](01-nen-tang.md#probability) mà mô hình dạy gán cho từng đáp án. Với [LLM](04-llm-va-mo-hinh-sinh.md#llm), mô hình học có thể học từ văn bản do mô hình dạy viết, bằng [SFT](#sft). Mô hình học chạy nhanh hơn và tốn ít tài nguyên hơn. Nhưng kết quả của mô hình học thường kém mô hình dạy.

**Ví dụ.** Năm 2025, nhóm phát triển DeepSeek-R1 công bố 6 mô hình nhỏ, từ 1,5 tỷ đến 70 tỷ [tham số](01-nen-tang.md#parameter). Các mô hình này học bằng SFT trên 800.000 ví dụ do DeepSeek-R1 tạo ra.

**Phân biệt.** Chưng cất tri thức khác [lượng tử hóa](03-kien-truc-mo-hinh.md#quantization) và [cắt tỉa mô hình](03-kien-truc-mo-hinh.md#pruning). Hai kỹ thuật kia thu nhỏ chính mô hình cũ. Chưng cất tri thức huấn luyện một mô hình khác. Chưng cất tri thức cũng không phải nén file.

**Liên quan.** [lượng tử hóa](03-kien-truc-mo-hinh.md#quantization) · [SLM](04-llm-va-mo-hinh-sinh.md#slm) · [dữ liệu tổng hợp](#synthetic-data) · [SFT](#sft)

**Nguồn.** [1] Hinton et al., "Distilling the Knowledge in a Neural Network", 2015, https://arxiv.org/abs/1503.02531, truy cập 2/10/2026 (S220). [2] Google for Developers, "Machine Learning Glossary" (mục distillation), cập nhật 10/4/2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [3] DeepSeek-AI, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", 2025, https://arxiv.org/abs/2501.12948, truy cập 2/10/2026 (S216).

<a id="continual-learning"></a>
### Continual learning — Học liên tục

*Mã: continual-learning · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** lifelong learning, học suốt đời. Dạng chuẩn trong sách: học liên tục.

**Định nghĩa.** Học liên tục là một phương pháp [học máy](01-nen-tang.md#machine-learning) trong đó [mô hình](01-nen-tang.md#model) học thêm việc mới theo thời gian. Mô hình vẫn phải giữ năng lực đã học.

**Giải thích.** Thách thức chính của học liên tục là [quên thảm khốc](#catastrophic-forgetting).

Trong một phiên trò chuyện, [LLM](04-llm-va-mo-hinh-sinh.md#llm) không cập nhật [trọng số](01-nen-tang.md#weight). Thông tin người dùng đưa vào chỉ nằm trong ngữ cảnh của phiên đó, hoặc trong [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) do ứng dụng lưu. Công ty AI có thể dùng dữ liệu trò chuyện cho [lượt huấn luyện](#training-run) sau, tùy chính sách dữ liệu.

**Ví dụ.** Tính đến tháng 10/2026, trang trợ giúp của OpenAI ghi rằng OpenAI có thể dùng nội dung trò chuyện ChatGPT để [huấn luyện](01-nen-tang.md#training) mô hình. Quy định này áp dụng cho người dùng cá nhân. Người dùng có thể tắt tùy chọn này.

**Phân biệt.** Học liên tục khác [học trực tuyến](01-nen-tang.md#online-learning). Học trực tuyến cập nhật mô hình theo từng phần dữ liệu mới đến. Học liên tục nhấn mạnh yêu cầu không quên việc cũ.

> **CẢNH BÁO:** Đọc chính sách dữ liệu của dịch vụ AI trước khi nhập thông tin mật. Dữ liệu trò chuyện có thể được dùng cho lượt huấn luyện sau.

**Liên quan.** [quên thảm khốc](#catastrophic-forgetting) · [học trực tuyến](01-nen-tang.md#online-learning) · [lưu giữ dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-retention) · [tinh chỉnh](#fine-tuning)

**Nguồn.** [1] Wang et al., "A Comprehensive Survey of Continual Learning: Theory, Method and Application", 2023 (IEEE TPAMI), https://arxiv.org/abs/2302.00487, truy cập 2/10/2026 (S221). [2] OpenAI Help Center, "How your data is used to improve model performance", https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance, truy cập 2/10/2026 (S223).

<a id="catastrophic-forgetting"></a>
### Catastrophic forgetting — Quên thảm khốc

*Mã: catastrophic-forgetting · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Quên thảm khốc là hiện tượng một [mạng nơ-ron](01-nen-tang.md#neural-network) làm kém đi rõ rệt việc cũ sau khi [huấn luyện](01-nen-tang.md#training) thêm cho việc mới. Đây là tên thuật ngữ, không mô tả trí nhớ của con người.

**Phân biệt.** Quên thảm khốc khác [ngày giới hạn kiến thức](04-llm-va-mo-hinh-sinh.md#knowledge-cutoff). Một [mô hình](01-nen-tang.md#model) thiếu thông tin mới vì dữ liệu kết thúc ở một ngày, không phải vì quên.

**Liên quan.** [học liên tục](#continual-learning) · [tinh chỉnh](#fine-tuning)

<a id="curriculum-learning"></a>
### Curriculum learning — Học theo giáo trình

*Mã: curriculum-learning · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học theo giáo trình là một phương pháp [huấn luyện](01-nen-tang.md#training) đưa dữ liệu vào theo thứ tự từ dễ đến khó. Năm 2009, một nghiên cứu ghi nhận cách này giúp [mô hình](01-nen-tang.md#model) học nhanh hơn ở một số bài toán.

**Phân biệt.** Học theo giáo trình đổi thứ tự dữ liệu, không tạo thêm dữ liệu như [tăng cường dữ liệu](#data-augmentation).

**Liên quan.** [mid-training](#mid-training) · [tăng cường dữ liệu](#data-augmentation)

## 2.2 Học từ phản hồi

<a id="rlhf"></a>
### Reinforcement learning from human feedback (RLHF) — Học tăng cường từ phản hồi của con người

*Mã: rlhf · Chương 2 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** học tăng cường từ phản hồi của con người. Dạng chuẩn trong sách: RLHF.

**Định nghĩa.** RLHF là một phương pháp [hậu huấn luyện](#post-training) trong đó [mô hình](01-nen-tang.md#model) học từ lựa chọn của con người. Mô hình được điều chỉnh để tạo ra loại câu trả lời người chấm ưu tiên.

**Giải thích.** Một quy trình RLHF điển hình có 3 bước:

- Mô hình học từ câu trả lời mẫu do người viết ([SFT](#sft)).
- Người chấm xếp hạng các câu trả lời, và kỹ sư dùng kết quả để tạo một [mô hình phần thưởng](#reward-model).
- Mô hình học bằng [học tăng cường](01-nen-tang.md#reinforcement-learning), với điểm do mô hình phần thưởng chấm.

RLHF giúp dạy các hành vi khó viết thành quy tắc. Ví dụ: giọng văn hữu ích, cách từ chối yêu cầu gây hại. Người chấm chỉ cần so sánh các câu trả lời, không cần tự viết câu trả lời tốt nhất.

**Ví dụ.** Ví dụ giả định. Chị Lan chấm câu trả lời cho một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot). Chị xem 2 câu trả lời cho câu hỏi "Thủ tục đăng ký hộ kinh doanh gồm gì?". Chị Lan chọn câu trả lời rõ ràng hơn. Hàng nghìn lựa chọn như vậy tạo thành [dữ liệu ưu tiên](#preference-data). Mô hình phần thưởng học từ dữ liệu này.

**Phân biệt.** RLHF tối ưu theo lựa chọn của người chấm, không trực tiếp theo [tính đúng sự thật](07-danh-gia-va-chat-luong.md#factuality). Người chấm có thể chọn câu trả lời nghe thuyết phục, dù câu trả lời đó sai. [DPO](#dpo) học từ cùng loại dữ liệu nhưng không cần mô hình phần thưởng riêng. [RLAIF](#rlaif) thay người chấm bằng một mô hình AI.

**Không nên hiểu là.** RLHF không phải phương pháp kiểm tra sự thật. RLHF dạy mô hình tạo ra loại câu trả lời người chấm chọn. Năm 2023, một nghiên cứu ghi nhận người chấm đôi khi chọn câu trả lời [xu nịnh](08-an-toan-va-alignment.md#sycophancy) thay cho câu đúng.

**Giới hạn.** Mô hình có thể học cách tăng điểm mà không tốt hơn thật ([lách phần thưởng](08-an-toan-va-alignment.md#reward-hacking)). Chất lượng của RLHF phụ thuộc vào người chấm, hướng dẫn chấm và lượng dữ liệu.

**Liên quan.** [mô hình phần thưởng](#reward-model) · [dữ liệu ưu tiên](#preference-data) · [DPO](#dpo) · [RLAIF](#rlaif) · [alignment](08-an-toan-va-alignment.md#alignment) · [xu nịnh](08-an-toan-va-alignment.md#sycophancy)

**Nguồn.** [1] Christiano et al., "Deep Reinforcement Learning from Human Preferences", 2017, https://arxiv.org/abs/1706.03741, truy cập 2/10/2026 (S202). [2] Ouyang et al., "Training language models to follow instructions with human feedback", 2022, https://arxiv.org/abs/2203.02155, truy cập 2/10/2026 (S201). [3] Sharma et al., "Towards Understanding Sycophancy in Language Models", 2023, https://arxiv.org/abs/2310.13548, truy cập 2/10/2026 (S203).

<a id="preference-data"></a>
### Preference data — Dữ liệu ưu tiên

*Mã: preference-data · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** dữ liệu so sánh. Dạng chuẩn trong sách: dữ liệu ưu tiên.

**Định nghĩa.** Dữ liệu ưu tiên là một loại [tập dữ liệu](01-nen-tang.md#dataset) ghi lại lựa chọn giữa các câu trả lời cho cùng một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt). Ví dụ: câu trả lời A tốt hơn câu trả lời B.

**Giải thích.** Người chấm hoặc một [mô hình](01-nen-tang.md#model) AI xem 2 hay nhiều câu trả lời, rồi chọn hoặc xếp hạng. Mỗi lựa chọn tạo ra một cặp: câu trả lời được chọn và câu trả lời không được chọn. Dữ liệu này là đầu vào của [RLHF](#rlhf) và [DPO](#dpo). Năm 2022, một quy trình [hậu huấn luyện](#post-training) cho người chấm xếp hạng 4 đến 9 câu trả lời mỗi lần. Hướng dẫn chấm quyết định "tốt hơn" nghĩa là gì: hữu ích hơn, an toàn hơn, hay đúng hơn.

**Phân biệt.** Dữ liệu ưu tiên khác [nhãn dữ liệu](01-nen-tang.md#label) thông thường. Nhãn cho đáp án đúng của một ví dụ. Dữ liệu ưu tiên chỉ cho thứ tự giữa các câu trả lời. Câu trả lời được ưu tiên không nhất thiết đúng sự thật.

**Liên quan.** [RLHF](#rlhf) · [DPO](#dpo) · [mô hình phần thưởng](#reward-model) · [gán nhãn dữ liệu](#data-labeling)

**Nguồn.** [1] Ouyang et al., "Training language models to follow instructions with human feedback", 2022, https://arxiv.org/abs/2203.02155, truy cập 2/10/2026 (S201). [2] Rafailov et al., "Direct Preference Optimization: Your Language Model is Secretly a Reward Model", 2023, https://arxiv.org/abs/2305.18290, truy cập 2/10/2026 (S213).

<a id="reward-model"></a>
### Reward model — Mô hình phần thưởng

*Mã: reward-model · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mô hình phần thưởng là một [mô hình](01-nen-tang.md#model) nhận một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) và một câu trả lời, rồi trả về một điểm số. Điểm số thể hiện mức tốt của câu trả lời, theo các lựa chọn đã học.

**Giải thích.** Kỹ sư [huấn luyện](01-nen-tang.md#training) mô hình phần thưởng trên [dữ liệu ưu tiên](#preference-data). Trong [RLHF](#rlhf), mô hình phần thưởng chấm điểm các câu trả lời mới của mô hình chính. Mô hình chính điều chỉnh để tăng điểm này. Mô hình phần thưởng thay người chấm ở bước này. Người chấm không thể chấm tất cả câu trả lời trong quá trình học.

**Phân biệt.** Mô hình phần thưởng chấm câu trả lời cuối. [Process reward model](#process-reward-model) chấm từng bước của lời giải. [RLVR](#rlvr) thay mô hình phần thưởng bằng một phép kiểm tra tự động. Mô hình phần thưởng cũng khác [policy](01-nen-tang.md#policy-rl): policy là mô hình tạo ra câu trả lời.

**Giới hạn.** Mô hình phần thưởng chỉ ước lượng gần đúng lựa chọn của người chấm. Mô hình chính có thể tăng điểm mà không tốt hơn thật ([lách phần thưởng](08-an-toan-va-alignment.md#reward-hacking)).

**Liên quan.** [RLHF](#rlhf) · [dữ liệu ưu tiên](#preference-data) · [process reward model](#process-reward-model) · [lách phần thưởng](08-an-toan-va-alignment.md#reward-hacking)

**Nguồn.** [1] Ouyang et al., "Training language models to follow instructions with human feedback", 2022, https://arxiv.org/abs/2203.02155, truy cập 2/10/2026 (S201). [2] DeepSeek-AI, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", 2025, https://arxiv.org/abs/2501.12948, truy cập 2/10/2026 (S216).

<a id="dpo"></a>
### Direct preference optimization (DPO) — Tối ưu ưu tiên trực tiếp

*Mã: dpo · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tối ưu ưu tiên trực tiếp. Dạng chuẩn trong sách: DPO.

**Định nghĩa.** DPO là một phương pháp [hậu huấn luyện](#post-training) dạy mô hình trực tiếp từ các cặp câu trả lời có thứ tự ưu tiên. DPO không cần [mô hình phần thưởng](#reward-model) riêng.

**Giải thích.** DPO dùng cùng loại [dữ liệu ưu tiên](#preference-data) như [RLHF](#rlhf). DPO biến bài toán thành một [hàm mất mát](01-nen-tang.md#loss-function) đơn giản, tính trên từng cặp câu trả lời. DPO điều chỉnh [mô hình](01-nen-tang.md#model) để tăng [xác suất](01-nen-tang.md#probability) của câu được chọn và giảm xác suất của câu không được chọn. Năm 2023, bài báo gốc mô tả DPO ổn định hơn và tốn ít tính toán hơn RLHF.

**Ví dụ.** Năm 2024, quy trình [huấn luyện](01-nen-tang.md#training) Tulu 3 dùng DPO sau bước [SFT](#sft) và trước bước [RLVR](#rlvr).

**Phân biệt.** RLHF tạo mô hình phần thưởng trước, rồi dùng [học tăng cường](01-nen-tang.md#reinforcement-learning). DPO bỏ 2 bước này và học thẳng từ các cặp so sánh. Cả hai phương pháp tối ưu theo lựa chọn của người chấm, không trực tiếp theo tính đúng của câu trả lời.

**Liên quan.** [RLHF](#rlhf) · [dữ liệu ưu tiên](#preference-data) · [hậu huấn luyện](#post-training) · [SFT](#sft)

**Nguồn.** [1] Rafailov et al., "Direct Preference Optimization: Your Language Model is Secretly a Reward Model", 2023, https://arxiv.org/abs/2305.18290, truy cập 2/10/2026 (S213). [2] Lambert et al., "Tulu 3: Pushing Frontiers in Open Language Model Post-Training", 2024, https://arxiv.org/abs/2411.15124, truy cập 2/10/2026 (S214).

<a id="rlaif"></a>
### Reinforcement learning from AI feedback (RLAIF) — Học tăng cường từ phản hồi của AI

*Mã: rlaif · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** học tăng cường từ phản hồi của AI. Dạng chuẩn trong sách: RLAIF.

**Định nghĩa.** RLAIF là một biến thể của [RLHF](#rlhf) trong đó một [mô hình](01-nen-tang.md#model) AI chọn câu trả lời tốt hơn, thay cho con người. Năm 2023, một nghiên cứu ghi nhận RLAIF cho kết quả tương đương RLHF ở 3 nhiệm vụ thử.

**Phân biệt.** [Constitutional AI](08-an-toan-va-alignment.md#constitutional-ai) là một phương pháp cụ thể dùng RLAIF theo một bộ nguyên tắc viết sẵn.

**Liên quan.** [RLHF](#rlhf) · [Constitutional AI](08-an-toan-va-alignment.md#constitutional-ai) · [dữ liệu ưu tiên](#preference-data)

<a id="rlvr"></a>
### Reinforcement learning with verifiable rewards (RLVR) — Học tăng cường với phần thưởng kiểm chứng được

*Mã: rlvr · Chương 2 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** học tăng cường với phần thưởng kiểm chứng được. Dạng chuẩn trong sách: RLVR.

**Định nghĩa.** RLVR là một phương pháp [học tăng cường](01-nen-tang.md#reinforcement-learning) dùng phép kiểm tra tự động. [Mô hình](01-nen-tang.md#model) chỉ nhận phần thưởng khi phép kiểm tra xác nhận câu trả lời đúng, ví dụ: đáp số khớp đáp án.

**Giải thích.** RLVR thay [mô hình phần thưởng](#reward-model) bằng một quy tắc kiểm tra. Cách này hợp với nhiệm vụ có đáp án kiểm tra được: toán, lập trình, yêu cầu về định dạng. Năm 2025, một nhóm phát triển chọn phần thưởng theo quy tắc để tạo một [mô hình suy luận](04-llm-va-mo-hinh-sinh.md#reasoning-model). Lý do nhóm này nêu: mô hình phần thưởng dạng [mạng nơ-ron](01-nen-tang.md#neural-network) dễ gặp [lách phần thưởng](08-an-toan-va-alignment.md#reward-hacking).

**Phân biệt.** [RLHF](#rlhf) thưởng câu trả lời người chấm ưu tiên. RLVR thưởng câu trả lời qua phép kiểm tra. RLVR chỉ kiểm tra đáp án cuối, không kiểm tra từng bước như [process reward model](#process-reward-model). Câu trả lời qua phép kiểm tra chỉ đúng theo tiêu chí của phép kiểm tra đó.

**Thay đổi gần đây.** Tên RLVR xuất hiện trong một báo cáo kỹ thuật tháng 11/2024. Năm 2025, một nhóm phát triển kết hợp phần thưởng theo quy tắc với [GRPO](#grpo).

**Liên quan.** [học tăng cường](01-nen-tang.md#reinforcement-learning) · [mô hình suy luận](04-llm-va-mo-hinh-sinh.md#reasoning-model) · [GRPO](#grpo) · [RLHF](#rlhf)

**Nguồn.** [1] Lambert et al., "Tulu 3: Pushing Frontiers in Open Language Model Post-Training", 2024, https://arxiv.org/abs/2411.15124, truy cập 2/10/2026 (S214). [2] DeepSeek-AI, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", 2025 (Nature 645), https://arxiv.org/abs/2501.12948, truy cập 2/10/2026 (S216).

<a id="grpo"></a>
### Group relative policy optimization (GRPO) — Tối ưu policy tương đối theo nhóm

*Mã: grpo · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tối ưu policy theo nhóm. Dạng chuẩn trong sách: GRPO.

**Định nghĩa.** GRPO là một phương pháp [học tăng cường](01-nen-tang.md#reinforcement-learning) cho [LLM](04-llm-va-mo-hinh-sinh.md#llm). Với mỗi câu hỏi, mô hình tạo một nhóm câu trả lời. GRPO khuyến khích các câu trả lời có điểm cao hơn điểm trung bình của nhóm.

**Phân biệt.** GRPO cải tiến từ một phương pháp học tăng cường cũ hơn. Phương pháp cũ cần thêm một [mô hình](01-nen-tang.md#model) phụ để ước lượng điểm kỳ vọng. GRPO dùng điểm trung bình của nhóm thay cho mô hình phụ này, nên tốn ít tài nguyên hơn.

**Liên quan.** [RLVR](#rlvr) · [học tăng cường](01-nen-tang.md#reinforcement-learning) · [mô hình suy luận](04-llm-va-mo-hinh-sinh.md#reasoning-model)

<a id="process-reward-model"></a>
### Process reward model (PRM) — Mô hình phần thưởng theo quá trình

*Mã: process-reward-model · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mô hình phần thưởng theo quá trình, PRM. Dạng chuẩn trong sách: process reward model.

**Định nghĩa.** Process reward model là một [mô hình phần thưởng](#reward-model) chấm từng bước trong lời giải của [mô hình](01-nen-tang.md#model), không chỉ đáp án cuối. Năm 2023, một nghiên cứu ghi nhận cách chấm từng bước cho kết quả tốt hơn trên bài toán.

**Phân biệt.** Năm 2025, một nhóm phát triển nêu 3 khó khăn: khó chia bước, khó xác định bước đúng, dễ gặp [lách phần thưởng](08-an-toan-va-alignment.md#reward-hacking).

**Liên quan.** [mô hình phần thưởng](#reward-model) · [RLVR](#rlvr) · [chuỗi suy nghĩ](04-llm-va-mo-hinh-sinh.md#chain-of-thought)

<a id="imitation-learning"></a>
### Imitation learning — Học bắt chước

*Mã: imitation-learning · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học bắt chước là một phương pháp [học máy](01-nen-tang.md#machine-learning). Hệ thống học một hành vi từ ví dụ minh họa của người hoặc của một [agent](06-agent-va-tu-dong-hoa.md#ai-agent) khác. Các ứng dụng gồm robot, xe tự lái và trò chơi điện tử.

**Phân biệt.** Học bắt chước học từ hành động mẫu. [Học tăng cường](01-nen-tang.md#reinforcement-learning) học từ phần thưởng sau khi thử.

**Liên quan.** [học tăng cường](01-nen-tang.md#reinforcement-learning) · [AI vật lý](04-llm-va-mo-hinh-sinh.md#embodied-ai)

## 2.3 Dữ liệu

<a id="web-crawl"></a>
### Web crawl — Thu thập dữ liệu web

*Mã: web-crawl · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** web crawl, crawling, cào dữ liệu web. Dạng chuẩn trong sách: thu thập dữ liệu web.

**Định nghĩa.** Thu thập dữ liệu web là một quá trình tự động tải và lưu các trang web. Chương trình làm việc này là crawler. Nội dung thu được là một nguồn lớn của [dữ liệu huấn luyện](01-nen-tang.md#training-data).

**Giải thích.** Crawler bắt đầu từ một danh sách địa chỉ, tải trang, tìm liên kết mới, rồi tải tiếp. Dữ liệu web thô chứa trang trùng, quảng cáo, nội dung kém chất lượng và dữ liệu cá nhân. Nhà phát triển phải [tuyển chọn dữ liệu](#data-curation) trước khi dùng cho [huấn luyện trước](#pretraining). Chủ trang web có thể đặt [tín hiệu từ chối thu thập](#opt-out-signal).

**Ví dụ.** Tính đến tháng 10/2026, trang chủ của Common Crawl ghi kho dữ liệu có hơn 300 tỷ trang trong 15 năm. Năm 2020, 60% hỗn hợp dữ liệu của GPT-3 lấy từ bản Common Crawl đã lọc. Common Crawl hướng dẫn chủ trang chặn crawler CCBot bằng 2 dòng trong robots.txt.

**Phân biệt.** Thu thập được một trang không có nghĩa là có quyền dùng trang đó để [huấn luyện](01-nen-tang.md#training). Quyền dùng phụ thuộc vào pháp luật, điều khoản của trang và hợp đồng. Xem [bản quyền và dữ liệu huấn luyện](10-phap-ly-quan-tri-chinh-sach.md#copyright-training-data).

**Liên quan.** [tín hiệu từ chối thu thập](#opt-out-signal) · [tuyển chọn dữ liệu](#data-curation) · [bản quyền và dữ liệu huấn luyện](10-phap-ly-quan-tri-chinh-sach.md#copyright-training-data) · [huấn luyện trước](#pretraining)

**Nguồn.** [1] Common Crawl, "Common Crawl: Open Repository of Web Crawl Data" (trang chủ), https://commoncrawl.org/, truy cập 2/10/2026 (S238). [2] Common Crawl, "CCBot", https://commoncrawl.org/ccbot, truy cập 2/10/2026 (S239). [3] Brown et al., "Language Models are Few-Shot Learners", 2020, https://arxiv.org/abs/2005.14165, truy cập 2/10/2026 (S208).

<a id="opt-out-signal"></a>
### Opt-out signal — Tín hiệu từ chối thu thập

*Mã: opt-out-signal · Chương 2 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** robots.txt, opt-out (web crawler). Dạng chuẩn trong sách: tín hiệu từ chối thu thập.

**Định nghĩa.** Tín hiệu từ chối thu thập là một thông báo máy đọc được của chủ trang web. Thông báo yêu cầu crawler không tải, hoặc không dùng nội dung để [huấn luyện](01-nen-tang.md#training) AI. Dạng cơ bản là tệp robots.txt.

**Phân biệt.** Tín hiệu này là yêu cầu, không phải rào chắn kỹ thuật.

**Thay đổi gần đây.** Tính đến tháng 10/2026, nhãn như "train-ai=n" của IETF, tổ chức chuẩn Internet, còn ở dạng dự thảo. Tháng 12/2025, chuẩn RSL 1.0 cho ghi điều khoản cấp phép trong robots.txt.

**Liên quan.** [thu thập dữ liệu web](#web-crawl) · [bảo lưu quyền từ chối khai thác](10-phap-ly-quan-tri-chinh-sach.md#opt-out-reservation) · [bản quyền và dữ liệu huấn luyện](10-phap-ly-quan-tri-chinh-sach.md#copyright-training-data)

<a id="data-curation"></a>
### Data curation — Tuyển chọn dữ liệu

*Mã: data-curation · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tuyển chọn dữ liệu là một quá trình chọn, lọc, làm sạch và trộn dữ liệu. Kết quả là một [tập dữ liệu](01-nen-tang.md#dataset) phù hợp với mục tiêu [huấn luyện](01-nen-tang.md#training).

**Giải thích.** Các bước hay gặp gồm:

- Lọc văn bản theo ngôn ngữ và theo chất lượng.
- [Khử trùng lặp](#deduplication) các trang và đoạn giống nhau.
- Loại nội dung độc hại, dữ liệu cá nhân và nội dung không được phép dùng.
- Trộn các nguồn theo tỷ lệ chọn trước.

Tuyển chọn dữ liệu thay đổi chất lượng của [mô hình](01-nen-tang.md#model). Năm 2024, một nhóm nghiên cứu công bố một tập 15.000 tỷ [token](03-kien-truc-mo-hinh.md#token) lấy từ dữ liệu web. Mô hình học từ tập này cho kết quả tốt hơn so với các tập mở khác. Một tập con chọn theo giá trị giáo dục cho kết quả tốt hơn nữa trên [benchmark](07-danh-gia-va-chat-luong.md#benchmark) về kiến thức.

**Phân biệt.** Tuyển chọn dữ liệu là các quyết định về nội dung tập dữ liệu. [Data pipeline](#data-pipeline) là chuỗi chương trình thực thi các quyết định đó. [Gán nhãn dữ liệu](#data-labeling) thêm thông tin cho từng ví dụ, không chọn ví dụ.

**Liên quan.** [khử trùng lặp](#deduplication) · [data pipeline](#data-pipeline) · [thu thập dữ liệu web](#web-crawl) · [nguồn gốc dữ liệu](#data-provenance)

**Nguồn.** [1] Penedo et al., "The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale", 2024, https://arxiv.org/abs/2406.17557, truy cập 2/10/2026 (S227). [2] Brown et al., "Language Models are Few-Shot Learners", 2020, https://arxiv.org/abs/2005.14165, truy cập 2/10/2026 (S208).

<a id="deduplication"></a>
### Deduplication — Khử trùng lặp

*Mã: deduplication · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Khử trùng lặp là một bước loại các văn bản giống hệt hoặc gần giống nhau khỏi [tập dữ liệu](01-nen-tang.md#dataset). Năm 2021, một nghiên cứu ghi nhận bước này giảm 10 lần văn bản chép nguyên văn từ [dữ liệu huấn luyện](01-nen-tang.md#training-data).

**Phân biệt.** Khử trùng lặp giảm, nhưng không loại bỏ, [ghi nhớ dữ liệu huấn luyện](09-bao-mat-rieng-tu-xac-thuc.md#memorization).

**Liên quan.** [tuyển chọn dữ liệu](#data-curation) · [nhiễm dữ liệu kiểm tra](#data-contamination) · [ghi nhớ dữ liệu huấn luyện](09-bao-mat-rieng-tu-xac-thuc.md#memorization)

<a id="data-pipeline"></a>
### Data pipeline — Đường ống dữ liệu

*Mã: data-pipeline · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** đường ống dữ liệu. Dạng chuẩn trong sách: data pipeline.

**Định nghĩa.** Data pipeline là một chuỗi bước xử lý tự động đưa dữ liệu từ nguồn đến dạng dùng được. Ví dụ: tải, trích văn bản, lọc, [khử trùng lặp](#deduplication), chia nhỏ và lưu dữ liệu cho [huấn luyện](01-nen-tang.md#training).

**Phân biệt.** Data pipeline là phần mềm thực thi. [Tuyển chọn dữ liệu](#data-curation) là các quyết định mà pipeline thực thi.

**Liên quan.** [tuyển chọn dữ liệu](#data-curation) · [khử trùng lặp](#deduplication) · [nguồn gốc dữ liệu](#data-provenance)

<a id="data-labeling"></a>
### Data labeling — Gán nhãn dữ liệu

*Mã: data-labeling · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** annotation, chú thích dữ liệu. Dạng chuẩn trong sách: gán nhãn dữ liệu.

**Định nghĩa.** Gán nhãn dữ liệu là một công việc gắn [nhãn dữ liệu](01-nen-tang.md#label) vào từng ví dụ trong một [tập dữ liệu](01-nen-tang.md#dataset). Nhãn là đáp án hoặc thông tin mô tả ví dụ. Con người hoặc phần mềm làm công việc này.

**Giải thích.** Nhãn có nhiều dạng:

- Tên nhóm của một email.
- Khung quanh một vật thể trong ảnh.
- Câu trả lời mẫu cho một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt).
- Lựa chọn giữa 2 câu trả lời.

Nhãn là đầu vào của [học có giám sát](01-nen-tang.md#supervised-learning), [SFT](#sft) và [RLHF](#rlhf). Theo một nghiên cứu năm 2024, gán nhãn là phần tốn thời gian nhất của công việc dữ liệu cho AI. Chất lượng nhãn phụ thuộc vào hướng dẫn gán nhãn và mức đồng thuận giữa người gán nhãn. Năm 2022, một nhóm phát triển ghi nhận người gán nhãn của nhóm đồng ý với nhau khoảng 73% số lần.

**Phân biệt.** Gán nhãn dữ liệu thêm thông tin cho ví dụ đã có. [Tuyển chọn dữ liệu](#data-curation) chọn ví dụ nào được dùng. [Lao động dữ liệu](#data-labor) nói về con người làm các việc này.

**Liên quan.** [nhãn dữ liệu](01-nen-tang.md#label) · [lao động dữ liệu](#data-labor) · [dữ liệu ưu tiên](#preference-data) · [học có giám sát](01-nen-tang.md#supervised-learning)

**Nguồn.** [1] Muldoon et al., "A typology of artificial intelligence data work", 2024 (Big Data & Society), https://journals.sagepub.com/doi/10.1177/20539517241232632, truy cập 2/10/2026 (S249). [2] Ouyang et al., "Training language models to follow instructions with human feedback", 2022, https://arxiv.org/abs/2203.02155, truy cập 2/10/2026 (S201).

<a id="data-labor"></a>
### Data labor — Lao động dữ liệu

*Mã: data-labor · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** data work, công việc dữ liệu cho AI. Dạng chuẩn trong sách: lao động dữ liệu.

**Định nghĩa.** Lao động dữ liệu là phần việc của con người trong [học máy](01-nen-tang.md#machine-learning). Ví dụ: gán nhãn, kiểm tra dữ liệu, chấm câu trả lời của [mô hình](01-nen-tang.md#model). Các công ty thường thuê ngoài công việc này cho người lao động thu nhập thấp.

**Phân biệt.** [Gán nhãn dữ liệu](#data-labeling) là một loại việc. Lao động dữ liệu nói về người làm việc và điều kiện làm việc.

**Liên quan.** [gán nhãn dữ liệu](#data-labeling) · [dữ liệu ưu tiên](#preference-data)

<a id="synthetic-data"></a>
### Synthetic data — Dữ liệu tổng hợp

*Mã: synthetic-data · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** dữ liệu nhân tạo. Dạng chuẩn trong sách: dữ liệu tổng hợp.

**Định nghĩa.** Dữ liệu tổng hợp là dữ liệu do chương trình hoặc [mô hình](01-nen-tang.md#model) tạo ra, không thu trực tiếp từ thế giới thật. Dữ liệu này dùng để [huấn luyện](01-nen-tang.md#training) hoặc kiểm tra mô hình.

**Giải thích.** Nhà phát triển dùng dữ liệu tổng hợp khi dữ liệu thật thiếu, đắt, hoặc chứa dữ liệu cá nhân. Ví dụ: một [LLM](04-llm-va-mo-hinh-sinh.md#llm) viết câu trả lời mẫu cho [SFT](#sft). Năm 2024, một bài tổng quan nêu 3 yêu cầu chất lượng: đúng sự thật, giống dữ liệu thật, và không thiên lệch.

**Phân biệt.** Dữ liệu tổng hợp được tạo có chủ đích và được ghi rõ trong quy trình. Dữ liệu giả mạo được tạo ra để lừa người khác, ví dụ: hồ sơ giả, kết quả thử nghiệm bịa. [Nội dung tổng hợp](09-bao-mat-rieng-tu-xac-thuc.md#synthetic-media) là ảnh, âm thanh, video do AI tạo cho người xem.

**Không nên hiểu là.** Dữ liệu tổng hợp không mặc định gây [sụp đổ mô hình](12-xa-hoi-va-tuong-lai.md#model-collapse). Năm 2024, một nghiên cứu ghi nhận sụp đổ khi mỗi thế hệ mô hình chỉ học từ dữ liệu của thế hệ trước. Một nghiên cứu khác ghi nhận mô hình tránh sụp đổ khi dữ liệu tổng hợp được cộng thêm vào dữ liệu thật.

**Liên quan.** [sụp đổ mô hình](12-xa-hoi-va-tuong-lai.md#model-collapse) · [chưng cất tri thức](#distillation) · [tăng cường dữ liệu](#data-augmentation) · [SFT](#sft)

**Nguồn.** [1] Liu et al., "Best Practices and Lessons Learned on Synthetic Data", 2024, https://arxiv.org/abs/2404.07503, truy cập 2/10/2026 (S224). [2] Shumailov et al., "AI models collapse when trained on recursively generated data", 2024 (Nature 631), https://www.nature.com/articles/s41586-024-07566-y, truy cập 2/10/2026 (S225). [3] Gerstgrasser et al., "Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data", 2024, https://arxiv.org/abs/2404.01413, truy cập 2/10/2026 (S226).

<a id="data-augmentation"></a>
### Data augmentation — Tăng cường dữ liệu

*Mã: data-augmentation · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tăng cường dữ liệu là một kỹ thuật tạo thêm ví dụ [huấn luyện](01-nen-tang.md#training) bằng cách biến đổi ví dụ có sẵn. Ví dụ: xoay, lật hoặc kéo giãn một ảnh. Kỹ thuật này giúp [mô hình](01-nen-tang.md#model) học từ dữ liệu đa dạng hơn.

**Phân biệt.** Tăng cường dữ liệu biến đổi ví dụ thật. [Dữ liệu tổng hợp](#synthetic-data) có thể là ví dụ mới hoàn toàn.

**Liên quan.** [dữ liệu tổng hợp](#synthetic-data) · [quá khớp](01-nen-tang.md#overfitting)

<a id="data-provenance"></a>
### Data provenance — Nguồn gốc dữ liệu

*Mã: data-provenance · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** data lineage, dòng dữ liệu. Dạng chuẩn trong sách: nguồn gốc dữ liệu.

**Định nghĩa.** Nguồn gốc dữ liệu là hồ sơ về xuất xứ và lịch sử của một [tập dữ liệu](01-nen-tang.md#dataset). Hồ sơ ghi người tạo, nguồn lấy, giấy phép và các bước xử lý.

**Giải thích.** Một tập dữ liệu cho AI có thể ghép từ nhiều tập khác. Hồ sơ nguồn gốc giúp kiểm tra quyền dùng và truy vết lỗi trong [dữ liệu huấn luyện](01-nen-tang.md#training-data). Năm 2023, một nhóm chuyên gia pháp lý và [học máy](01-nen-tang.md#machine-learning) kiểm tra hơn 1.800 tập dữ liệu văn bản. Trên các trang lưu trữ dữ liệu phổ biến, hơn 70% trường hợp thiếu thông tin giấy phép. Tỷ lệ ghi sai giấy phép là hơn 50%.

**Phân biệt.** Nguồn gốc dữ liệu cho biết dữ liệu đến từ đâu. Hồ sơ này không tự trả lời câu hỏi có quyền dùng dữ liệu hay không. Quyền dùng do giấy phép, hợp đồng và pháp luật quyết định ([bản quyền và dữ liệu huấn luyện](10-phap-ly-quan-tri-chinh-sach.md#copyright-training-data)). [Nguồn gốc nội dung](09-bao-mat-rieng-tu-xac-thuc.md#content-provenance) nói về một ảnh, video hay văn bản đầu ra, không nói về tập dữ liệu.

> **CẢNH BÁO:** Kiểm tra giấy phép của từng tập dữ liệu thành phần trước khi dùng cho mục đích thương mại. Thông tin giấy phép trên trang lưu trữ có thể thiếu hoặc sai.

**Liên quan.** [thỏa thuận cấp phép dữ liệu](#data-licensing-deal) · [bản quyền và dữ liệu huấn luyện](10-phap-ly-quan-tri-chinh-sach.md#copyright-training-data) · [nguồn gốc nội dung](09-bao-mat-rieng-tu-xac-thuc.md#content-provenance) · [bản tóm tắt dữ liệu huấn luyện](10-phap-ly-quan-tri-chinh-sach.md#training-data-summary)

**Nguồn.** [1] Longpre et al., "The Data Provenance Initiative: A Large Scale Audit of Dataset Licensing & Attribution in AI", 2023, https://arxiv.org/abs/2310.16787, truy cập 2/10/2026 (S229).

<a id="data-licensing-deal"></a>
### Data licensing deal — Thỏa thuận cấp phép dữ liệu

*Mã: data-licensing-deal · Chương 2 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Thỏa thuận cấp phép dữ liệu là một hợp đồng cho phép một nhà phát triển AI dùng dữ liệu của bên nắm quyền. Mục đích thường gặp là [huấn luyện](01-nen-tang.md#training) [mô hình](01-nen-tang.md#model).

**Giải thích.** Thỏa thuận có thể gồm quyền huấn luyện, quyền hiển thị trích đoạn và điều kiện ghi nguồn. Năm 2024, một tổ chức nghiên cứu ghi nhận thị trường chưa có bộ điều khoản chuẩn.

**Ví dụ.** Ví dụ giả định. Báo điện tử Bình Minh ký hợp đồng 2 năm với Công ty An Phát. An Phát được dùng kho bài báo để huấn luyện mô hình và được hiển thị trích đoạn có ghi nguồn. Bình Minh nhận phí hằng năm.

**Phân biệt.** Thỏa thuận cấp phép tạo quyền dùng dữ liệu theo hợp đồng. [Tín hiệu từ chối thu thập](#opt-out-signal) chỉ là yêu cầu một chiều của chủ trang. [Nguồn gốc dữ liệu](#data-provenance) ghi lại dữ liệu đến từ đâu, không tạo ra quyền dùng.

**Thay đổi gần đây.** Tháng 12/2025, chuẩn RSL 1.0 được phát hành. Chuẩn này cho chủ trang ghi điều khoản cấp phép cho crawler AI dưới dạng máy đọc được.

**Liên quan.** [nguồn gốc dữ liệu](#data-provenance) · [tín hiệu từ chối thu thập](#opt-out-signal) · [bản quyền và dữ liệu huấn luyện](10-phap-ly-quan-tri-chinh-sach.md#copyright-training-data) · [điều khoản AI trong hợp đồng](10-phap-ly-quan-tri-chinh-sach.md#ai-clause)

**Nguồn.** [1] Ithaka S+R, "Generative AI Licensing Agreement Tracker", 2024, https://sr.ithaka.org/our-work/generative-ai-licensing-agreement-tracker/, truy cập 2/10/2026 (S250). [2] The Register, "Really Simple Licensing spec makes AI orgs pay to scrape", 10/12/2025, https://www.theregister.com/2025/12/10/really_simple_licensing_spec_takes/, truy cập 2/10/2026 (S236).

<a id="data-contamination"></a>
### Data contamination — Nhiễm dữ liệu kiểm tra

*Mã: data-contamination · Chương 2 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** benchmark contamination, nhiễm benchmark. Dạng chuẩn trong sách: nhiễm dữ liệu kiểm tra.

**Định nghĩa.** Nhiễm dữ liệu kiểm tra là tình trạng đề hoặc đáp án của một [benchmark](07-danh-gia-va-chat-luong.md#benchmark) nằm trong [dữ liệu huấn luyện](01-nen-tang.md#training-data). Khi đó, điểm benchmark phản ánh một phần việc mô hình đã gặp đề.

**Giải thích.** [Huấn luyện trước](#pretraining) dùng lượng lớn văn bản web. Nhiều benchmark được đăng công khai trên web. Đề và đáp án có thể lọt vào dữ liệu này ngoài chủ ý của nhà phát triển. Năm 2020, nhóm phát triển một [LLM](04-llm-va-mo-hinh-sinh.md#llm) ghi nhận một lỗi lọc dữ liệu làm sót phần trùng với benchmark. Các cách giảm nhiễm gồm tìm phần trùng, giữ đề kín, và tạo đề mới.

**Phân biệt.** Nhiễm dữ liệu kiểm tra là một trường hợp của [data leakage](#data-leakage) khi [đánh giá](07-danh-gia-va-chat-luong.md#evaluation) [mô hình](01-nen-tang.md#model). Nhiễm dữ liệu kiểm tra khác [đầu độc dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-poisoning). Đầu độc dữ liệu là hành vi cố ý chèn dữ liệu xấu.

> **THẬN TRỌNG:** Không kết luận về năng lực từ điểm benchmark khi chưa kiểm tra nhiễm dữ liệu. Điểm có thể cao hơn năng lực thật.

**Liên quan.** [benchmark](07-danh-gia-va-chat-luong.md#benchmark) · [data leakage](#data-leakage) · [kiểm tra trên dữ liệu giữ lại](07-danh-gia-va-chat-luong.md#held-out-test) · [khử trùng lặp](#deduplication)

**Nguồn.** [1] Xu et al., "Benchmark Data Contamination of Large Language Models: A Survey", 2024, https://arxiv.org/abs/2406.04244, truy cập 2/10/2026 (S240). [2] Brown et al., "Language Models are Few-Shot Learners", 2020, https://arxiv.org/abs/2005.14165, truy cập 2/10/2026 (S208).

<a id="data-leakage"></a>
### Data leakage — Rò rỉ dữ liệu trong học máy

*Mã: data-leakage · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** rò rỉ dữ liệu trong học máy, leakage. Dạng chuẩn trong sách: data leakage.

**Định nghĩa.** Data leakage là một lỗi phương pháp trong [học máy](01-nen-tang.md#machine-learning). Thông tin từ dữ liệu kiểm tra, hoặc thông tin không có lúc dùng thật, lọt vào quá trình [huấn luyện](01-nen-tang.md#training). Lỗi này làm kết quả kiểm tra cao hơn hiệu quả thật.

**Phân biệt.** Data leakage khác [đánh cắp dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-exfiltration), là việc đưa dữ liệu trái phép ra khỏi một hệ thống.

**Liên quan.** [nhiễm dữ liệu kiểm tra](#data-contamination) · [tập kiểm định](#validation-set) · [quá khớp](01-nen-tang.md#overfitting)

<a id="validation-set"></a>
### Validation set — Tập kiểm định

*Mã: validation-set · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tập xác thực. Dạng chuẩn trong sách: tập kiểm định.

**Định nghĩa.** Tập kiểm định là một phần [tập dữ liệu](01-nen-tang.md#dataset) tách riêng khỏi phần dùng để [huấn luyện](01-nen-tang.md#training). Kỹ sư dùng tập kiểm định nhiều lần trong quá trình phát triển, ví dụ: để chọn cấu hình.

**Phân biệt.** Tập kiểm tra (test set) là phần dữ liệu thứ ba, chỉ dùng để đo [mô hình](01-nen-tang.md#model) ở bước cuối. Kết quả trên tập kiểm tra khách quan hơn, vì kỹ sư không dùng tập này để chọn cấu hình.

**Liên quan.** [kiểm định chéo](#cross-validation) · [kiểm tra trên dữ liệu giữ lại](07-danh-gia-va-chat-luong.md#held-out-test) · [quá khớp](01-nen-tang.md#overfitting)

<a id="cross-validation"></a>
### Cross-validation — Kiểm định chéo

*Mã: cross-validation · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Kiểm định chéo là một phương pháp ước lượng [mô hình](01-nen-tang.md#model) làm tốt đến đâu với dữ liệu mới. Dữ liệu được chia thành k phần. Mỗi lần, một phần được giữ lại để kiểm tra, và mô hình học trên các phần còn lại.

**Phân biệt.** Kiểm định chéo lần lượt dùng từng phần dữ liệu để kiểm tra. [Tập kiểm định](#validation-set) là một phần dữ liệu tách riêng cố định.

**Liên quan.** [tập kiểm định](#validation-set) · [tổng quát hóa](01-nen-tang.md#generalization)

## 2.4 Quy luật mở rộng

<a id="scaling-laws"></a>
### Scaling laws — Quy luật mở rộng

*Mã: scaling-laws · Chương 2 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** scaling laws, luật tỷ lệ. Dạng chuẩn trong sách: quy luật mở rộng.

**Định nghĩa.** Quy luật mở rộng là một quan hệ thực nghiệm giữa quy mô [huấn luyện](01-nen-tang.md#training) và chất lượng của [mô hình](01-nen-tang.md#model). Khi tăng số tham số, dữ liệu hoặc năng lực tính toán, sai số giảm theo đường cong dự đoán được.

**Giải thích.** Năm 2020, một nghiên cứu đo [hàm mất mát](01-nen-tang.md#loss-function) của các [mô hình ngôn ngữ](04-llm-va-mo-hinh-sinh.md#language-model) ở nhiều quy mô. Mất mát giảm theo hàm lũy thừa của 3 đại lượng:

- Số [tham số](01-nen-tang.md#parameter).
- Lượng dữ liệu.
- [Năng lực tính toán](01-nen-tang.md#compute) dùng để huấn luyện.

Mỗi quan hệ chỉ đúng khi 2 đại lượng còn lại không giới hạn kết quả. Quan hệ này giữ đúng trên hơn 7 bậc độ lớn trong phạm vi thử nghiệm. Năm 2022, một nghiên cứu khác huấn luyện hơn 400 mô hình. Theo nghiên cứu này, khi tăng gấp đôi số tham số, cần tăng gấp đôi số [token](03-kien-truc-mo-hinh.md#token) huấn luyện. Nhà phát triển dùng các kết quả này để chia một ngân sách tính toán cố định.

**Ví dụ.** Năm 2022, mô hình Chinchilla có 70 tỷ tham số. Mô hình Gopher có 280 tỷ tham số. Với cùng ngân sách tính toán, Chinchilla học trên lượng dữ liệu gấp 4 lần và cho kết quả tốt hơn Gopher. Ví dụ này cho thấy mô hình nhiều tham số hơn không mặc định tốt hơn.

**Phân biệt.** Quy luật mở rộng khác [giả thuyết mở rộng](12-xa-hoi-va-tuong-lai.md#scaling-hypothesis). Quy luật mở rộng mô tả mất mát đo được trong một phạm vi thử nghiệm. Giả thuyết mở rộng là một dự đoán về năng lực của AI khi quy mô tiếp tục tăng.

**Không nên hiểu là.** Quy luật mở rộng không phải định luật vật lý và không bảo đảm năng lực. Quy luật này dự đoán mất mát, không dự đoán trực tiếp một năng lực như giải toán hay soạn hợp đồng. Hai nghiên cứu năm 2020 và năm 2022 đưa ra cách chia ngân sách khác nhau.

**Giới hạn.** Quy luật chỉ được kiểm chứng trong phạm vi đã thử nghiệm. Kéo dài đường cong ra ngoài phạm vi đó là ngoại suy. Chất lượng mô hình còn phụ thuộc vào dữ liệu, [hậu huấn luyện](#post-training) và cách dùng.

**Thay đổi gần đây.** Từ năm 2024, các nhà nghiên cứu đo quan hệ mở rộng cho [test-time compute](04-llm-va-mo-hinh-sinh.md#test-time-compute). Đây là tính toán thêm khi [chạy mô hình](01-nen-tang.md#inference). Một nghiên cứu năm 2024 ghi nhận một mô hình nhỏ dùng cách này vượt mô hình lớn hơn 14 lần ở một số bài toán.

**Liên quan.** [huấn luyện tối ưu tính toán](#compute-optimal-training) · [giả thuyết mở rộng](12-xa-hoi-va-tuong-lai.md#scaling-hypothesis) · [năng lực tính toán](01-nen-tang.md#compute) · [test-time compute](04-llm-va-mo-hinh-sinh.md#test-time-compute) · [bài học cay đắng](12-xa-hoi-va-tuong-lai.md#bitter-lesson)

**Nguồn.** [1] Kaplan et al., "Scaling Laws for Neural Language Models", 2020, https://arxiv.org/abs/2001.08361, truy cập 2/10/2026 (S204). [2] Hoffmann et al., "Training Compute-Optimal Large Language Models", 2022, https://arxiv.org/abs/2203.15556, truy cập 2/10/2026 (S205). [3] Snell et al., "Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters", 2024, https://arxiv.org/abs/2408.03314, truy cập 2/10/2026 (S206).

<a id="compute-optimal-training"></a>
### Compute-optimal training — Huấn luyện tối ưu tính toán

*Mã: compute-optimal-training · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Huấn luyện tối ưu tính toán là cách chọn số [tham số](01-nen-tang.md#parameter) và số [token](03-kien-truc-mo-hinh.md#token) dữ liệu cho một ngân sách tính toán cố định, để mất mát thấp nhất. Năm 2022, một nghiên cứu đề xuất tăng 2 đại lượng theo cùng tỷ lệ.

**Phân biệt.** Tối ưu cho [huấn luyện](01-nen-tang.md#training) khác tối ưu cho [chạy mô hình](01-nen-tang.md#inference). Một [mô hình](01-nen-tang.md#model) nhỏ hơn tốn ít tính toán hơn khi chạy.

**Liên quan.** [quy luật mở rộng](#scaling-laws) · [lượt huấn luyện](#training-run) · [FLOP](01-nen-tang.md#flop)

<a id="training-run"></a>
### Training run — Lượt huấn luyện

*Mã: training-run · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Lượt huấn luyện là một lần chạy quá trình [huấn luyện](01-nen-tang.md#training) từ đầu đến cuối để tạo ra một [mô hình](01-nen-tang.md#model). Mỗi lượt có dữ liệu, cấu hình và phần cứng xác định.

**Phân biệt.** Chi phí của lượt huấn luyện cuối khác tổng chi phí phát triển mô hình. Tổng chi phí còn gồm các lượt thử nghiệm và lương nhân sự. Cả hai khác [chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost).

**Liên quan.** [checkpoint](#checkpoint) · [huấn luyện tối ưu tính toán](#compute-optimal-training) · [năng lực tính toán](01-nen-tang.md#compute)

<a id="checkpoint"></a>
### Checkpoint — Điểm lưu mô hình

*Mã: checkpoint · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** điểm lưu mô hình. Dạng chuẩn trong sách: checkpoint.

**Định nghĩa.** Checkpoint là một bản lưu trạng thái của [mô hình](01-nen-tang.md#model) tại một thời điểm, trong hoặc sau [lượt huấn luyện](#training-run). Kỹ sư dùng checkpoint để chạy tiếp sau khi dừng, hoặc để so sánh các giai đoạn.

**Phân biệt.** Checkpoint là một bản lưu kỹ thuật. [Phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version) là bản nhà phát triển phát hành và đặt tên cho người dùng.

**Liên quan.** [lượt huấn luyện](#training-run) · [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version) · [trọng số](01-nen-tang.md#weight)

<a id="mixed-precision"></a>
### Mixed precision — Độ chính xác hỗn hợp

*Mã: mixed-precision · Chương 2 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mixed precision, huấn luyện độ chính xác hỗn hợp. Dạng chuẩn trong sách: độ chính xác hỗn hợp.

**Định nghĩa.** Độ chính xác hỗn hợp là một kỹ thuật [huấn luyện](01-nen-tang.md#training) tính phần lớn số liệu ở dạng số 16 bit. Kỹ thuật này giữ một bản [trọng số](01-nen-tang.md#weight) ở dạng 32 bit, và giảm gần một nửa dung lượng lưu trữ cần dùng.

**Phân biệt.** [Lượng tử hóa](03-kien-truc-mo-hinh.md#quantization) giảm số bit của một [mô hình](01-nen-tang.md#model) đã huấn luyện, để chạy rẻ hơn.

**Liên quan.** [lượng tử hóa](03-kien-truc-mo-hinh.md#quantization) · [GPU](01-nen-tang.md#gpu) · [lượt huấn luyện](#training-run)
