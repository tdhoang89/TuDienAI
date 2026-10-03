---
chapter: 7
title: "Đánh giá và chất lượng"
file: 07-danh-gia-va-chat-luong.md
terms: 40
bible_version: "0.2"
version: "0.1"
updated: 2026-10-02
status: review
---

# Chương 7 — Đánh giá và chất lượng

Tin tức về AI thường đi kèm điểm số, phần trăm và bảng xếp hạng. Chương này giải thích các con số đó nói gì và không nói gì. Người đọc biết một mô hình được chấm theo đáp án nào, ai chấm, và chấm bằng cách nào. Người đọc cũng phân biệt được các chỉ số hay gặp, ví dụ: tỷ lệ dự đoán đúng, precision, recall.

Chương này cũng nêu giới hạn của benchmark. Điểm cao trên một bộ câu hỏi không bảo đảm kết quả tốt trong công việc thật. Trước khi tin một con số, người đọc cần hỏi: đo trên dữ liệu nào, so với mức nào. Người đọc cũng cần hỏi sai số bao nhiêu.

## 7.1 Khái niệm đánh giá

<a id="evaluation"></a>
### Evaluation (eval) — Đánh giá

*Mã: evaluation · Chương 7 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** eval, evals. Dạng chuẩn trong sách: đánh giá.

**Định nghĩa.** Đánh giá là một quy trình đo chất lượng, năng lực hoặc rủi ro của một [mô hình](01-nen-tang.md#model) hay [hệ thống AI](01-nen-tang.md#ai-system). Quy trình này đưa đầu vào cho đối tượng cần đo, rồi chấm đầu ra theo tiêu chí định trước.

**Giải thích.** Một lần đánh giá có 4 thành phần:

- Tập nhiệm vụ: các câu hỏi, tài liệu hoặc việc cần làm.
- Căn cứ chấm: đáp án đúng, hoặc tiêu chí để biết đầu ra đạt hay không đạt.
- Người chấm: một đoạn mã so khớp, một người, hoặc một mô hình chấm ([LLM-as-a-judge](#llm-as-a-judge)).
- Thước đo: con số tổng hợp kết quả, ví dụ: [tỷ lệ dự đoán đúng](#accuracy).

Nhà phát triển đánh giá để so sánh các phiên bản trong lúc [huấn luyện](01-nen-tang.md#training). Doanh nghiệp đánh giá để chọn mô hình cho một việc cụ thể. Nhóm an toàn đánh giá để tìm hành vi có hại trước khi phát hành.

Đánh giá có thể dùng một [benchmark](#benchmark) công khai. Đánh giá cũng có thể dùng một bộ phép thử riêng, bám sát việc của doanh nghiệp. Khi mô hình là một phần của [agent](06-agent-va-tu-dong-hoa.md#ai-agent), đánh giá đo cả mô hình và phần mềm bao quanh mô hình.

**Ví dụ.** Công ty An Bình muốn dùng một [LLM](04-llm-va-mo-hinh-sinh.md#llm) để tóm tắt hợp đồng thuê nhà. Chị Lan chọn 50 hợp đồng cũ đã có bản tóm tắt do luật sư viết. LLM tóm tắt 50 hợp đồng này. Sau đó, 2 luật sư chấm từng bản tóm tắt theo một [thang chấm](#rubric) có 3 tiêu chí.

**Phân biệt.** Đánh giá là quy trình đo. Benchmark là một bộ phép thử chuẩn hóa mà quy trình đánh giá có thể dùng. Một lần đánh giá có thể không dùng benchmark nào, ví dụ: một [thử nghiệm A/B](#ab-test) với người dùng thật. Đánh giá trước khi phát hành cũng khác [đánh giá trong vận hành](11-trien-khai-san-pham-kinh-te.md#production-evaluation). Loại sau đo hệ thống trên dữ liệu thật sau khi phát hành.

**Không nên hiểu là.** Đánh giá không cho một kết luận cuối cùng về mô hình. Kết quả chỉ đúng cho bộ nhiệm vụ, cách chấm và [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version) đã đo. Một điểm số cũng không phải chứng nhận an toàn hay chứng nhận pháp lý.

**Giới hạn.** Đánh giá chỉ đo các tình huống có trong tập nhiệm vụ. Đánh giá không tìm được lỗi trong tình huống chưa ai đưa vào bộ phép thử. Đoạn mã chấm, người chấm và mô hình chấm đều có thể chấm sai.

> **THẬN TRỌNG:** Đọc một mẫu đầu ra và bản ghi chấm điểm trước khi tin một điểm số. Lỗi trong cách chấm có thể làm điểm cao hơn hoặc thấp hơn năng lực thật.

**Liên quan.** [benchmark](#benchmark) · [ground truth](#ground-truth) · [LLM-as-a-judge](#llm-as-a-judge) · [đánh giá bằng con người](#human-evaluation) · [kiểm thử hồi quy](#regression-test)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary" (mục evaluation, automatic evaluation, human evaluation), 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Anthropic (M. Grace và cộng sự), "Demystifying evals for AI agents", 2026, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, truy cập 2/10/2026 (S705).

<a id="benchmark"></a>
### Benchmark — Bộ đo chuẩn

*Mã: benchmark · Chương 7 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ đo chuẩn, bộ kiểm tra chuẩn. Dạng chuẩn trong sách: benchmark.

**Định nghĩa.** Benchmark là một bộ câu hỏi hoặc nhiệm vụ có cách chấm cố định. Các nhà nghiên cứu dùng benchmark để [đánh giá](#evaluation) và so sánh các [mô hình](01-nen-tang.md#model) trong cùng điều kiện.

**Giải thích.** Nhóm tạo benchmark thu thập câu hỏi hoặc nhiệm vụ, viết đáp án, rồi công bố cách chấm. Các nhà phát triển cho mô hình của mình làm benchmark và báo cáo điểm. Điểm có thể là một phần trăm, ví dụ: [tỷ lệ dự đoán đúng](#accuracy).

Mỗi benchmark đo một loại việc hẹp, ví dụ: trả lời câu hỏi trắc nghiệm, sửa lỗi mã nguồn, giải toán. Tên của benchmark không cho biết đủ phạm vi đo. Người đọc cần xem benchmark gồm loại câu hỏi nào và chấm bằng cách nào.

Điểm trên 2 benchmark khác nhau không so sánh được. Lý do: 2 benchmark khác câu hỏi, độ khó và cách chấm. Điểm trên cùng một benchmark cũng thay đổi khi cách chạy thay đổi. Ví dụ về cách chạy: số ví dụ mẫu trong [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt), định dạng đáp án, số lần thử cho mỗi câu.

**Ví dụ.** Năm 2023, một nhà phát triển mô hình báo cáo một thí nghiệm trên benchmark MMLU ([Phụ lục Tên riêng](90-phu-luc-ten-rieng.md)). Nhóm này chỉ đổi ký hiệu đáp án, ví dụ: từ "(A)" thành "(1)". Tỷ lệ dự đoán đúng của cùng một mô hình thay đổi khoảng 5%.

**Phân biệt.** Điểm benchmark khác hiệu quả công việc thật. Một mô hình đạt 90% trên một benchmark về luật vẫn có thể đọc sai hợp đồng thật. Hợp đồng thật dài hơn, không có đáp án sẵn và có bối cảnh riêng. Benchmark cũng khác [bảng xếp hạng](#leaderboard). Bảng xếp hạng trình bày điểm của nhiều mô hình trên một hoặc nhiều benchmark.

**Không nên hiểu là.** Điểm benchmark cao không chứng minh mô hình làm tốt các việc khác cùng loại. Năm 2021, một nhóm nghiên cứu chỉ ra một vấn đề: các benchmark nổi tiếng hay được trình bày như thước đo năng lực chung. Nhưng mỗi benchmark chỉ đo một tập nhiệm vụ hẹp.

**Giới hạn.** Câu hỏi và đáp án của benchmark công khai có thể lọt vào [dữ liệu huấn luyện](01-nen-tang.md#training-data). Tên của lỗi này là [nhiễm dữ liệu kiểm tra](02-du-lieu-va-huan-luyen.md#data-contamination). Khi đó, điểm cao có thể chỉ phản ánh việc mô hình đã gặp đáp án. Đáp án của benchmark cũng có thể sai ([ground truth](#ground-truth)). Khi các mô hình đều đạt gần điểm tối đa, benchmark không còn tách được mô hình mạnh với mô hình yếu ([bão hòa benchmark](#benchmark-saturation)).

> **THẬN TRỌNG:** Thử mô hình trên tài liệu và nhiệm vụ thật của tổ chức trước khi dùng cho việc quan trọng. Điểm benchmark cao không bảo đảm kết quả đúng trên tài liệu thật.

**Liên quan.** [đánh giá](#evaluation) · [bảng xếp hạng](#leaderboard) · [bão hòa benchmark](#benchmark-saturation) · [nhiễm dữ liệu kiểm tra](02-du-lieu-va-huan-luyen.md#data-contamination) · [benchmark cho agent](#agentic-benchmark)

**Nguồn.** [1] Anthropic, "Challenges in evaluating AI systems", 2023, https://www.anthropic.com/research/evaluating-ai-systems, truy cập 2/10/2026 (S706). [2] Raji và cộng sự, "AI and the Everything in the Whole Wide World Benchmark", 2021, https://arxiv.org/abs/2111.15366, truy cập 2/10/2026 (S708). [3] Liang và cộng sự, "Holistic Evaluation of Language Models", 2022, https://arxiv.org/abs/2211.09110, truy cập 2/10/2026 (S709).

<a id="ground-truth"></a>
### Ground truth — Đáp án chuẩn

*Mã: ground-truth · Chương 7 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** đáp án chuẩn, giá trị thật. Dạng chuẩn trong sách: ground truth.

**Định nghĩa.** Ground truth là giá trị được coi là đúng cho một ví dụ trong [tập dữ liệu](01-nen-tang.md#dataset). Ground truth là mốc để chấm đầu ra của [mô hình](01-nen-tang.md#model).

**Giải thích.** Ground truth đến từ 3 nguồn chính:

- Con người: chuyên gia hoặc người [gán nhãn dữ liệu](02-du-lieu-va-huan-luyen.md#data-labeling) ghi đáp án cho từng ví dụ.
- Sự kiện đã xảy ra: ví dụ, khách hàng có trả nợ đúng hạn hay không.
- Phép đo: ví dụ, số đọc của một máy đo.

Khi [đánh giá](#evaluation), phần mềm so đầu ra của mô hình với ground truth của từng ví dụ. Kết quả so sánh cho ra các chỉ số, ví dụ: [tỷ lệ dự đoán đúng](#accuracy), [precision](#precision). Một số câu hỏi có nhiều câu trả lời đúng, ví dụ: viết một đoạn tóm tắt. Khi đó, ground truth có thể là vài câu trả lời mẫu hoặc một [thang chấm](#rubric).

**Ví dụ.** Ngân hàng Phú Hưng xây một mô hình dự đoán khoản vay nào trả nợ trễ. Ground truth của mỗi khoản vay là kết quả thật sau 12 tháng: trả đúng hạn hoặc trả trễ. Nhóm kỹ sư so dự đoán của mô hình với kết quả thật này để tính điểm của mô hình.

**Phân biệt.** Ground truth khác chân lý tuyệt đối. Ground truth là đáp án mà nhóm làm dữ liệu chấp nhận, nên có thể sai, thiếu hoặc lỗi thời. Ground truth cũng khác [tập dữ liệu chuẩn vàng](#golden-dataset). Tập dữ liệu chuẩn vàng là một tập ví dụ được tuyển chọn kỹ. Mỗi ví dụ trong tập có ground truth.

**Không nên hiểu là.** Không nên coi điểm đo theo ground truth là thước đo sự thật tuyệt đối. Năm 2021, một nhóm nghiên cứu kiểm tra 10 tập kiểm tra phổ biến. Nhóm này tìm thấy trung bình ít nhất 3,3% nhãn sai. Trên nhãn đã sửa, thứ hạng giữa một số mô hình có thể đảo ngược. Điều kiện là tỷ lệ nhãn sai trong tập kiểm tra cao thêm vài phần trăm.

**Giới hạn.** Ground truth chỉ tốt bằng quy trình tạo ra ground truth. Người gán nhãn có thể bất đồng với nhau, nhất là với câu hỏi cần ý kiến chuyên môn. Ground truth cũng có thể lỗi thời, ví dụ: đáp án về một quy định pháp luật đã sửa đổi.

> **THẬN TRỌNG:** Cho chuyên gia kiểm tra một mẫu ground truth trước khi dùng để chấm. Đáp án sai làm sai điểm của các mô hình được chấm.

**Liên quan.** [tập dữ liệu chuẩn vàng](#golden-dataset) · [nhãn dữ liệu](01-nen-tang.md#label) · [gán nhãn dữ liệu](02-du-lieu-va-huan-luyen.md#data-labeling) · [tỷ lệ dự đoán đúng](#accuracy) · [đánh giá](#evaluation)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary" (mục ground truth), 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Northcutt, Athalye, Mueller, "Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks", 2021, https://arxiv.org/abs/2103.14749, truy cập 2/10/2026 (S707).

<a id="golden-dataset"></a>
### Golden dataset — Tập dữ liệu chuẩn vàng

*Mã: golden-dataset · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** golden set. Dạng chuẩn trong sách: tập dữ liệu chuẩn vàng.

**Định nghĩa.** Tập dữ liệu chuẩn vàng là một [tập dữ liệu](01-nen-tang.md#dataset) do con người tuyển chọn và kiểm tra kỹ. Mỗi ví dụ trong tập có [ground truth](#ground-truth). Nhóm phát triển dùng tập này làm mốc cố định sau mỗi lần thay đổi.

**Phân biệt.** Tập dữ liệu chuẩn vàng bám sát việc của một tổ chức, còn [benchmark](#benchmark) công khai dùng chung cho nhiều [mô hình](01-nen-tang.md#model).

**Liên quan.** [ground truth](#ground-truth) · [kiểm thử hồi quy](#regression-test) · [benchmark](#benchmark)

<a id="held-out-test"></a>
### Held-out test — Kiểm tra trên dữ liệu giữ lại

*Mã: held-out-test · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** holdout test, kiểm tra trên tập kiểm tra. Dạng chuẩn trong sách: kiểm tra trên dữ liệu giữ lại.

**Định nghĩa.** Kiểm tra trên dữ liệu giữ lại là cách đo chất lượng của một [mô hình](01-nen-tang.md#model) bằng các ví dụ được giữ riêng. Các ví dụ này không dùng trong [huấn luyện](01-nen-tang.md#training).

**Giải thích.** Kỹ sư chia [tập dữ liệu](01-nen-tang.md#dataset) thành 3 phần: tập huấn luyện, [tập kiểm định](02-du-lieu-va-huan-luyen.md#validation-set), tập kiểm tra. Mỗi ví dụ chỉ thuộc một phần. Kỹ sư dùng tập kiểm định nhiều lần để chọn cài đặt. Kỹ sư chỉ dùng tập kiểm tra ở bước cuối. Điểm trên tập kiểm tra là ước lượng ít thiên lệch hơn điểm trên tập kiểm định về [tổng quát hóa](01-nen-tang.md#generalization).

Với [LLM](04-llm-va-mo-hinh-sinh.md#llm), nhóm phát triển khó bảo đảm dữ liệu kiểm tra thật sự được giữ riêng. LLM học từ lượng lớn văn bản trên Internet. Câu hỏi kiểm tra công khai có thể đã nằm trong [dữ liệu huấn luyện](01-nen-tang.md#training-data) ([nhiễm dữ liệu kiểm tra](02-du-lieu-va-huan-luyen.md#data-contamination)).

**Phân biệt.** Tập kiểm tra khác tập kiểm định. Kỹ sư chỉnh mô hình theo điểm trên tập kiểm định. Kỹ sư không chỉnh mô hình theo điểm trên tập kiểm tra. Khi kỹ sư chỉnh nhiều lần theo tập kiểm tra, tập kiểm tra mất tác dụng giữ lại.

**Giới hạn.** Điểm trên dữ liệu giữ lại chỉ dự báo đúng khi dữ liệu thật giống dữ liệu kiểm tra. Với dữ liệu thật khác loại, kết quả có thể kém hơn ([OOD](#ood)).

**Liên quan.** [tập kiểm định](02-du-lieu-va-huan-luyen.md#validation-set) · [nhiễm dữ liệu kiểm tra](02-du-lieu-va-huan-luyen.md#data-contamination) · [quá khớp](01-nen-tang.md#overfitting) · [OOD](#ood)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary" (mục holdout data, test set, validation set), 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="baseline"></a>
### Baseline — Mức cơ sở

*Mã: baseline · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mức cơ sở, mô hình cơ sở. Dạng chuẩn trong sách: baseline.

**Định nghĩa.** Baseline là một [mô hình](01-nen-tang.md#model) đơn giản hoặc một mức điểm dùng làm mốc so sánh. Một mô hình mới chỉ có giá trị khi đạt điểm cao hơn baseline một khoảng đủ lớn.

**Phân biệt.** Baseline khác [benchmark](#benchmark): benchmark là bộ phép thử, baseline là mức điểm để so sánh trên bộ phép thử đó.

**Liên quan.** [benchmark](#benchmark) · [tỷ lệ dự đoán đúng](#accuracy) · [ý nghĩa thống kê](#statistical-significance)

<a id="capability-eval"></a>
### Capability evaluation — Đánh giá năng lực

*Mã: capability-eval · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** capability eval. Dạng chuẩn trong sách: đánh giá năng lực.

**Định nghĩa.** Đánh giá năng lực là một loại [đánh giá](#evaluation) đo các việc một [mô hình](01-nen-tang.md#model) làm được. Phép đo này cũng cho biết mô hình làm tốt các việc đó đến mức nào.

**Giải thích.** Nhà phát triển dùng đánh giá năng lực để theo dõi tiến bộ qua các phiên bản. Bộ nhiệm vụ cần đủ khó: điểm ban đầu thấp thì còn chỗ để đo tiến bộ. Khi mô hình đạt gần 100%, bộ nhiệm vụ có thể chuyển thành bộ [kiểm thử hồi quy](#regression-test).

Trong [an toàn AI](08-an-toan-va-alignment.md#ai-safety), đánh giá năng lực còn đo các việc có thể gây hại, ví dụ: hỗ trợ tấn công mạng. Tên của nhóm phép đo này là đánh giá [năng lực nguy hiểm](08-an-toan-va-alignment.md#dangerous-capability). Nhà phát triển có thể công bố kết quả trong [system card](08-an-toan-va-alignment.md#system-card).

**Phân biệt.** Đánh giá an toàn (safety eval) là nhóm phép đo tìm hành vi hoặc rủi ro có hại. Đánh giá an toàn hỏi 2 câu hỏi khác nhau. Câu hỏi về năng lực: mô hình có thể gây hại hay không. Câu hỏi về xu hướng: mô hình có chọn hành động gây hại khi có cơ hội hay không. Đánh giá năng lực chỉ trả lời câu hỏi thứ nhất.

**Không nên hiểu là.** Điểm thấp trong một lần đo năng lực nguy hiểm không chứng minh mô hình thiếu năng lực đó. Một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) khác hoặc một [agent harness](06-agent-va-tu-dong-hoa.md#agent-harness) khác có thể cho kết quả cao hơn.

**Liên quan.** [kiểm thử hồi quy](#regression-test) · [năng lực nguy hiểm](08-an-toan-va-alignment.md#dangerous-capability) · [red teaming](08-an-toan-va-alignment.md#red-teaming) · [benchmark](#benchmark)

**Nguồn.** [1] Shevlane và cộng sự, "Model evaluation for extreme risks", 2023, https://arxiv.org/abs/2305.15324, truy cập 2/10/2026 (S724). [2] Anthropic (M. Grace và cộng sự), "Demystifying evals for AI agents", 2026, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, truy cập 2/10/2026 (S705).

<a id="regression-test"></a>
### Regression test — Kiểm thử hồi quy

*Mã: regression-test · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** regression eval. Dạng chuẩn trong sách: kiểm thử hồi quy.

**Định nghĩa.** Kiểm thử hồi quy là một bộ phép thử chạy lại sau mỗi thay đổi. Bộ phép thử này phát hiện việc trước đây làm đúng nay làm sai. Thay đổi có thể là sửa [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) hoặc đổi [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version).

**Giải thích.** Nhóm phát triển giữ một bộ ca kiểm thử mà hệ thống đã vượt qua. Sau mỗi thay đổi, phần mềm chạy lại bộ ca này. Phần mềm báo các ca từng đạt nay không đạt. Bộ kiểm thử hồi quy cần tỷ lệ đạt gần 100%. Một lần giảm điểm là tín hiệu cần kiểm tra trước khi phát hành.

Với [LLM](04-llm-va-mo-hinh-sinh.md#llm), đầu ra có thể khác nhau giữa các lần chạy ([dao động giữa các lần chạy](#run-to-run-variance)). Nhóm phát triển cần chạy mỗi ca nhiều lần, hoặc chấm theo tiêu chí thay cho so khớp từng chữ. [Ghim phiên bản](11-trien-khai-san-pham-kinh-te.md#version-pinning) giúp so sánh đúng trước và sau thay đổi.

**Ví dụ.** Ví dụ giả định: Công ty An Bình có 200 câu hỏi mẫu cho [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) chăm sóc khách hàng. Kỹ sư sửa [system prompt](05-prompt-ngu-canh-tri-thuc.md#system-prompt) để chatbot trả lời ngắn hơn. Bộ kiểm thử hồi quy cho thấy 12 câu trước đây đúng nay thiếu thông tin về phí đổi trả. Kỹ sư sửa system prompt lần nữa trước khi phát hành.

**Phân biệt.** Kiểm thử hồi quy kiểm tra hệ thống còn làm đúng các việc cũ hay không. [Đánh giá năng lực](#capability-eval) đo hệ thống làm được các việc mới nào.

**Liên quan.** [tập dữ liệu chuẩn vàng](#golden-dataset) · [ghim phiên bản](11-trien-khai-san-pham-kinh-te.md#version-pinning) · [đánh giá năng lực](#capability-eval) · [trôi mô hình](#model-drift)

**Nguồn.** [1] Anthropic (M. Grace và cộng sự), "Demystifying evals for AI agents", 2026, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, truy cập 2/10/2026 (S705).

<a id="eval-harness"></a>
### Eval harness — Khung chạy đánh giá

*Mã: eval-harness · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** khung chạy đánh giá, evaluation harness. Dạng chuẩn trong sách: eval harness.

**Định nghĩa.** Eval harness là một phần mềm chạy toàn bộ quy trình [đánh giá](#evaluation) cho một [mô hình](01-nen-tang.md#model). Phần mềm này gửi nhiệm vụ, ghi lại và chấm đầu ra, rồi tổng hợp điểm.

**Phân biệt.** [Agent harness](06-agent-va-tu-dong-hoa.md#agent-harness) giúp mô hình làm việc như một [agent](06-agent-va-tu-dong-hoa.md#ai-agent), còn eval harness chấm kết quả của agent đó.

**Liên quan.** [đánh giá](#evaluation) · [agent harness](06-agent-va-tu-dong-hoa.md#agent-harness) · [benchmark](#benchmark)

<a id="agentic-benchmark"></a>
### Agentic benchmark — Benchmark cho agent

*Mã: agentic-benchmark · Chương 7 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Benchmark cho agent là một [benchmark](#benchmark) đo khả năng của một [agent](06-agent-va-tu-dong-hoa.md#ai-agent) hoàn thành nhiệm vụ nhiều bước. Ví dụ về nhiệm vụ: sửa lỗi trong một kho mã nguồn. Điểm dựa trên kết quả cuối cùng của nhiệm vụ.

**Giải thích.** Mỗi nhiệm vụ có một [môi trường](06-agent-va-tu-dong-hoa.md#environment) thử. Agent [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use), đọc kết quả và chọn bước tiếp theo. Phần mềm chấm kiểm tra trạng thái cuối, ví dụ: mã đã qua các bài kiểm thử hay chưa. Chỉ số hay gặp là [tỷ lệ hoàn thành nhiệm vụ](#task-success-rate).

Điểm đo cả [mô hình](01-nen-tang.md#model) và [agent harness](06-agent-va-tu-dong-hoa.md#agent-harness). Cùng một mô hình có thể đạt điểm khác nhau với 2 agent harness khác nhau.

**Phân biệt.** Benchmark cho agent là bộ phép thử chuẩn hóa, dùng chung. [Đánh giá agent](06-agent-va-tu-dong-hoa.md#agent-evaluation) rộng hơn: doanh nghiệp có thể đo agent của mình bằng nhiệm vụ riêng.

**Giới hạn.** Lỗi trong đề bài hoặc cách chấm có thể làm điểm sai lệch. Ví dụ: phần mềm chấm tính một câu trả lời rỗng là thành công. Môi trường giả lập cũng đơn giản hơn công việc thật.

**Thay đổi gần đây.** Năm 2025, một nhóm nghiên cứu công bố danh mục kiểm tra cho benchmark cho agent. Nhóm này ghi nhận lỗi thiết kế có thể làm điểm lệch tới 100% của điểm đúng. Năm 2026, một nhà phát triển mô hình báo cáo điểm của một mô hình tăng từ 42% lên 95%. Mức tăng này đến từ việc sửa lỗi chấm, sửa đề bài và chỉnh agent harness.

**Liên quan.** [benchmark](#benchmark) · [đánh giá agent](06-agent-va-tu-dong-hoa.md#agent-evaluation) · [tỷ lệ hoàn thành nhiệm vụ](#task-success-rate) · [agent harness](06-agent-va-tu-dong-hoa.md#agent-harness)

**Nguồn.** [1] Zhu và cộng sự, "Establishing Best Practices for Building Rigorous Agentic Benchmarks", 2025, https://arxiv.org/abs/2507.02825, truy cập 2/10/2026 (S723). [2] Anthropic (M. Grace và cộng sự), "Demystifying evals for AI agents", 2026, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, truy cập 2/10/2026 (S705).

<a id="retrieval-evaluation"></a>
### Retrieval evaluation — Đánh giá truy xuất

*Mã: retrieval-evaluation · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Đánh giá truy xuất là một loại [đánh giá](#evaluation) đo bước tìm tài liệu trong một hệ thống [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) hoặc công cụ tìm kiếm. Phép đo kiểm tra tài liệu liên quan có nằm trong các kết quả đầu tiên hay không.

**Phân biệt.** Đánh giá truy xuất đo bước tìm tài liệu, còn [độ bám sát nguồn](#faithfulness) đo bước viết câu trả lời.

**Liên quan.** [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) · [độ bám sát nguồn](#faithfulness) · [reranker](05-prompt-ngu-canh-tri-thuc.md#reranker)

<a id="long-context-evaluation"></a>
### Long-context evaluation — Đánh giá ngữ cảnh dài

*Mã: long-context-evaluation · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Đánh giá ngữ cảnh dài là một loại [đánh giá](#evaluation) đo cách [mô hình](01-nen-tang.md#model) dùng thông tin trong hàng trăm trang tài liệu. Phép thử đơn giản nhất giấu một câu trong văn bản dài, rồi hỏi về câu đó.

**Phân biệt.** [Cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) cho biết sức chứa, còn phép đo này kiểm tra mô hình dùng [ngữ cảnh dài](05-prompt-ngu-canh-tri-thuc.md#long-context) tốt đến mức nào.

**Liên quan.** [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) · [lost in the middle](05-prompt-ngu-canh-tri-thuc.md#lost-in-the-middle) · [context rot](05-prompt-ngu-canh-tri-thuc.md#context-rot)

## 7.2 Thước đo

<a id="accuracy"></a>
### Accuracy — Tỷ lệ dự đoán đúng

*Mã: accuracy · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** accuracy, độ chính xác. Dạng chuẩn trong sách: tỷ lệ dự đoán đúng.

**Định nghĩa.** Tỷ lệ dự đoán đúng là một chỉ số bằng số dự đoán đúng chia cho tổng số dự đoán của một [mô hình](01-nen-tang.md#model). Chỉ số này gộp các nhóm lại, không tách riêng nhóm nào.

**Cách tính.** Với mô hình [phân loại](01-nen-tang.md#classification) 2 nhóm, tỷ lệ dự đoán đúng = (TP + TN) / (TP + TN + FP + FN). TP và TN là các dự đoán đúng, FP và FN là các dự đoán sai. Định nghĩa của từng ký hiệu nằm ở mục [precision](#precision).

Ví dụ giả định: một ngân hàng có 1.000 giao dịch, trong đó 10 giao dịch gian lận. Một mô hình luôn trả lời "không gian lận". Mô hình đúng với 990 giao dịch thường. Tỷ lệ dự đoán đúng = 990 / 1.000 = 99%. Nhưng mô hình không tìm được giao dịch gian lận nào.

**Phân biệt.** Tỷ lệ dự đoán đúng tính trên tất cả các ca. Precision chỉ tính trên các ca mô hình báo dương. Recall chỉ tính trên các ca dương thật. Trong ví dụ trên, recall bằng 0%. Một số tài liệu tiếng Việt dịch cả accuracy và precision là "độ chính xác". Kiểm tra công thức trước khi so 2 con số.

**Giới hạn.** Chỉ số này không đo chi phí của từng loại lỗi. Khi dữ liệu mất cân bằng giữa các nhóm, một mô hình vô dụng vẫn có thể đạt điểm cao. So kết quả với một [baseline](#baseline) đơn giản trước khi kết luận.

**Liên quan.** [precision](#precision) · [ma trận nhầm lẫn](#confusion-matrix) · [baseline](#baseline) · [khớp chính xác](#exact-match)

**Nguồn.** [1] Google for Developers, "Classification: Accuracy, recall, precision, and related metrics", 2026, https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall, truy cập 2/10/2026 (S701). [2] Google for Developers, "Machine Learning Glossary" (mục accuracy), 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="precision"></a>
### Precision — Precision

*Mã: precision · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** giá trị dự đoán dương (positive predictive value). Dạng chuẩn trong sách: precision.

**Định nghĩa.** Precision là một chỉ số cho [mô hình](01-nen-tang.md#model) [phân loại](01-nen-tang.md#classification): phần trăm dự đoán đúng trong các lần mô hình báo nhóm dương. Nói cách khác, khi mô hình báo "có", precision là tỷ lệ số lần báo đúng.

**Cách tính.** Nhóm dương là nhóm cần tìm, ví dụ: thư rác. Mô hình phân loại 2 nhóm cho 4 loại kết quả:

- TP (dương đúng): số ca dương mà mô hình báo là dương.
- FP (dương sai): số ca âm mà mô hình báo nhầm là dương.
- FN (âm sai): số ca dương mà mô hình bỏ sót.
- TN (âm đúng): số ca âm mà mô hình báo là âm.

Precision = TP / (TP + FP). Recall = TP / (TP + FN). F1 = 2 × precision × recall / (precision + recall). F1 gộp 2 chỉ số thành một số.

Ví dụ giả định: hộp thư của chị Lan có 100 thư, gồm 20 thư rác. Mô hình đánh dấu 15 thư là rác: 12 thư rác thật (TP = 12) và 3 thư thường (FP = 3). Mô hình bỏ sót 8 thư rác (FN = 8) và để đúng 77 thư thường (TN = 77).

Precision = 12 / 15 = 80%. Recall = 12 / 20 = 60%. F1 = 2 × 0,8 × 0,6 / 1,4 ≈ 0,69.

**Phân biệt.** Precision tính trên các lần mô hình báo dương. Recall tính trên các ca dương thật. [Tỷ lệ dự đoán đúng](#accuracy) tính trên tất cả các ca. Trong ví dụ trên, tỷ lệ dự đoán đúng là 89%.

**Không nên hiểu là.** Precision không phải "độ chính xác" chung của mô hình. Một số tài liệu dịch cả accuracy và precision là "độ chính xác", nên người đọc dễ so nhầm 2 chỉ số.

**Giới hạn.** Chỉ số này không đo số ca dương mà mô hình bỏ sót. Một mô hình chỉ báo dương 1 lần và đúng 1 lần đạt precision 100%. Khi kỹ sư nâng ngưỡng báo dương, precision thường tăng, recall giảm hoặc giữ nguyên.

**Liên quan.** [tỷ lệ dự đoán đúng](#accuracy) · [ma trận nhầm lẫn](#confusion-matrix) · [phân loại](01-nen-tang.md#classification) · [đánh giá truy xuất](#retrieval-evaluation)

**Nguồn.** [1] Google for Developers, "Classification: Accuracy, recall, precision, and related metrics", 2026, https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall, truy cập 2/10/2026 (S701). [2] Google for Developers, "Machine Learning Glossary" (mục precision, recall, F1), 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="confusion-matrix"></a>
### Confusion matrix — Ma trận nhầm lẫn

*Mã: confusion-matrix · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Ma trận nhầm lẫn là một bảng đếm kết quả của một [mô hình](01-nen-tang.md#model) [phân loại](01-nen-tang.md#classification). Mỗi hàng là một nhóm thật, mỗi cột là một nhóm do mô hình dự đoán. Các ô trên đường chéo đếm dự đoán đúng.

**Phân biệt.** Ma trận nhầm lẫn là bảng số gốc, còn [precision](#precision) và [tỷ lệ dự đoán đúng](#accuracy) là chỉ số tính từ bảng này.

**Liên quan.** [precision](#precision) · [tỷ lệ dự đoán đúng](#accuracy) · [ground truth](#ground-truth)

<a id="exact-match"></a>
### Exact match — Khớp chính xác

*Mã: exact-match · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Khớp chính xác là một chỉ số chấm theo kiểu đạt hoặc không đạt. Đầu ra của [mô hình](01-nen-tang.md#model) giống hệt [ground truth](#ground-truth) thì được 1 điểm, khác thì được 0 điểm.

**Cách tính.** Ví dụ giả định: đáp án là "Hà Nội". Đầu ra "Hà Nội" được 1 điểm. Đầu ra "Thủ đô là Hà Nội" được 0 điểm. Bộ 50 câu có 40 câu khớp thì điểm là 80%.

**Giới hạn.** Chỉ số này không đo câu trả lời đúng nhưng diễn đạt khác đáp án.

**Liên quan.** [ground truth](#ground-truth) · [tỷ lệ dự đoán đúng](#accuracy) · [BLEU](#bleu)

<a id="bleu"></a>
### BLEU — BLEU

*Mã: bleu · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** Bilingual Evaluation Understudy. Dạng chuẩn trong sách: BLEU.

**Định nghĩa.** BLEU là một chỉ số chấm bản dịch máy theo số cụm từ trùng với bản dịch mẫu do người dịch. Điểm từ 0 đến 1.

**Cách tính.** Ví dụ giả định: bản dịch có 6 từ, 4 từ có trong bản mẫu, tỷ lệ trùng là 4 / 6 ≈ 0,67. BLEU tính tỷ lệ trùng cho cụm 1 đến 4 từ.

**Phân biệt.** ROUGE là họ chỉ số tương tự cho bản tóm tắt, chú trọng recall thay cho [precision](#precision).

**Giới hạn.** Chỉ số này không đo nghĩa của bản dịch.

**Liên quan.** [khớp chính xác](#exact-match) · [precision](#precision) · [đánh giá bằng con người](#human-evaluation)

<a id="pass-at-k"></a>
### Pass@k — Pass@k

*Mã: pass-at-k · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Pass@k là một chỉ số cho bài toán lập trình. Pass@k là [xác suất](01-nen-tang.md#probability) có ít nhất 1 lời giải đúng trong k lời giải mà [mô hình](01-nen-tang.md#model) tạo ra cho một bài. Lời giải đúng qua hết các bài kiểm thử tự động.

**Cách tính.** Ví dụ giả định: k = 5, có 10 bài. 7 bài có ít nhất 1 lời giải đúng, nên pass@5 = 7 / 10 = 70%.

**Giới hạn.** Chỉ số này không đo độ ổn định và giả định biết lời giải nào đúng. Pass@1 đo lần đầu.

**Liên quan.** [tỷ lệ hoàn thành nhiệm vụ](#task-success-rate) · [agent lập trình](06-agent-va-tu-dong-hoa.md#coding-agent) · [bỏ phiếu đa số](#majority-vote)

<a id="task-success-rate"></a>
### Task success rate — Tỷ lệ hoàn thành nhiệm vụ

*Mã: task-success-rate · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tỷ lệ hoàn thành nhiệm vụ là một chỉ số cho [agent](06-agent-va-tu-dong-hoa.md#ai-agent): số nhiệm vụ đạt yêu cầu chia cho tổng số nhiệm vụ được giao. Mức đạt dựa trên [tiêu chí nghiệm thu](06-agent-va-tu-dong-hoa.md#acceptance-criteria) của từng nhiệm vụ.

**Cách tính.** Ví dụ giả định: một agent xử lý đúng 30 trong 40 yêu cầu hoàn tiền. Tỷ lệ hoàn thành nhiệm vụ = 30 / 40 = 75%.

**Giới hạn.** Chỉ số này không đo chi phí, thời gian và hậu quả của nhiệm vụ thất bại.

**Liên quan.** [benchmark cho agent](#agentic-benchmark) · [pass@k](#pass-at-k) · [tiêu chí nghiệm thu](06-agent-va-tu-dong-hoa.md#acceptance-criteria)

<a id="win-rate"></a>
### Win rate — Tỷ lệ thắng

*Mã: win-rate · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tỷ lệ thắng là một chỉ số so sánh 2 [mô hình](01-nen-tang.md#model). Tỷ lệ thắng của A là phần trăm số câu hỏi mà câu trả lời của A được chọn là tốt hơn của B. Người chọn là con người hoặc [LLM-as-a-judge](#llm-as-a-judge).

**Cách tính.** Ví dụ giả định: trên 100 câu, A thắng 55, thua 35, hòa 10. Tính hòa là nửa lần thắng: (55 + 5) / 100 = 60%.

**Giới hạn.** Chỉ số này không đo độ đúng của câu trả lời.

**Liên quan.** [xếp hạng theo ưu tiên của con người](#human-preference-ranking) · [LLM-as-a-judge](#llm-as-a-judge) · [thử nghiệm A/B](#ab-test)

<a id="majority-vote"></a>
### Majority vote — Bỏ phiếu đa số

*Mã: majority-vote · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Bỏ phiếu đa số là cách chọn đáp án cuối cùng khi [mô hình](01-nen-tang.md#model) trả lời một câu hỏi nhiều lần. Đáp án xuất hiện nhiều nhất được chọn. Điểm [benchmark](#benchmark) theo cách này không so được với điểm của một lần trả lời.

**Phân biệt.** [Self-consistency](05-prompt-ngu-canh-tri-thuc.md#self-consistency) là kỹ thuật tạo nhiều lời giải, rồi dùng bỏ phiếu đa số để chọn.

**Liên quan.** [self-consistency](05-prompt-ngu-canh-tri-thuc.md#self-consistency) · [pass@k](#pass-at-k) · [dao động giữa các lần chạy](#run-to-run-variance)

<a id="calibration"></a>
### Calibration — Hiệu chuẩn

*Mã: calibration · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** calibration, độ hiệu chuẩn. Dạng chuẩn trong sách: hiệu chuẩn.

**Định nghĩa.** Hiệu chuẩn là một tính chất của [mô hình](01-nen-tang.md#model): mức tự tin mô hình báo ra khớp với tỷ lệ đúng thật. Ví dụ, mô hình báo mức tự tin 70% thì khoảng 70% câu trả lời đó đúng.

**Giải thích.** Nhiều mô hình [phân loại](01-nen-tang.md#classification) trả về một [xác suất](01-nen-tang.md#probability) kèm dự đoán. Để đo hiệu chuẩn, kỹ sư gom các câu trả lời theo mức tự tin. Sau đó, kỹ sư so mức tự tin với tỷ lệ đúng của từng nhóm. Tên của chênh lệch trung bình là sai số hiệu chuẩn kỳ vọng (ECE).

Năm 2017, một nhóm nghiên cứu kiểm tra các [mạng nơ-ron](01-nen-tang.md#neural-network) sâu thời đó. Các mạng này hiệu chuẩn kém hơn các mạng nơ-ron 10 năm trước. Một bước điều chỉnh đơn giản sau [huấn luyện](01-nen-tang.md#training) có thể cải thiện hiệu chuẩn.

**Ví dụ.** Ví dụ giả định: một mô hình báo mức tự tin 90% cho 100 hồ sơ vay. Mô hình chỉ dự đoán đúng 60 hồ sơ trong số đó. Mức tự tin mô hình báo ra cao hơn tỷ lệ đúng 30 điểm phần trăm.

**Phân biệt.** Hiệu chuẩn khác [tỷ lệ dự đoán đúng](#accuracy). Một mô hình đúng 60% vẫn hiệu chuẩn tốt nếu mô hình báo mức tự tin khoảng 60%. Xác suất của một [token](03-kien-truc-mo-hinh.md#token) không phải độ tin cậy về sự thật. Xác suất đó chỉ dùng được làm mức tự tin khi kỹ sư đã đo hiệu chuẩn cho loại câu hỏi đó.

**Liên quan.** [abstention](#abstention) · [tỷ lệ dự đoán đúng](#accuracy) · [logprobs](04-llm-va-mo-hinh-sinh.md#logprobs) · [xác suất](01-nen-tang.md#probability)

**Nguồn.** [1] Guo và cộng sự, "On Calibration of Modern Neural Networks", 2017, https://arxiv.org/abs/1706.04599, truy cập 2/10/2026 (S710). [2] Liang và cộng sự, "Holistic Evaluation of Language Models", 2022, https://arxiv.org/abs/2211.09110, truy cập 2/10/2026 (S709).

<a id="abstention"></a>
### Abstention — Không trả lời khi không chắc chắn

*Mã: abstention · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Abstention là hành vi [mô hình](01-nen-tang.md#model) không đưa ra đáp án khi thiếu căn cứ, ví dụ: trả lời "Tôi không chắc chắn". Một số nhà nghiên cứu đề xuất cách [đánh giá](#evaluation) trừ điểm câu sai nặng hơn abstention.

**Phân biệt.** Abstention dựa trên mức không chắc chắn, còn [từ chối trả lời](08-an-toan-va-alignment.md#refusal) dựa trên quy tắc an toàn hoặc chính sách.

**Liên quan.** [từ chối trả lời](08-an-toan-va-alignment.md#refusal) · [hiệu chuẩn](#calibration) · [ảo giác](04-llm-va-mo-hinh-sinh.md#hallucination)

<a id="robustness"></a>
### Robustness — Độ bền vững

*Mã: robustness · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** robustness, tính bền vững. Dạng chuẩn trong sách: độ bền vững.

**Định nghĩa.** Độ bền vững là một tính chất của [mô hình](01-nen-tang.md#model): chất lượng đầu ra giữ ổn định khi đầu vào thay đổi nhỏ mà nghĩa không đổi. Ví dụ về thay đổi nhỏ: lỗi gõ, cách viết khác, thứ tự đáp án khác.

**Giải thích.** Để đo độ bền vững, kỹ sư tạo các biến thể của câu hỏi, ví dụ: thêm lỗi gõ, đổi định dạng. Kỹ sư so điểm trên câu hỏi gốc với điểm trên các biến thể. Kết quả có thể báo theo điểm thấp nhất trên các biến thể. Năm 2022, một nghiên cứu thử một [LLM](04-llm-va-mo-hinh-sinh.md#llm) trên một bộ câu hỏi có các biến đổi như vậy. Điểm của LLM này giảm từ 72,6% xuống 38,9%.

Độ bền vững trước tấn công là một nhánh riêng. Trong nhánh này, người tấn công cố ý tạo [mẫu đối kháng](09-bao-mat-rieng-tu-xac-thuc.md#adversarial-example) để làm mô hình trả về kết quả sai.

**Phân biệt.** Độ bền vững khác [tổng quát hóa](01-nen-tang.md#generalization). Tổng quát hóa nói về dữ liệu mới cùng loại với dữ liệu đã học. Độ bền vững nói về biến thể và nhiễu của đầu vào, hoặc dữ liệu khác loại ([OOD](#ood)).

**Liên quan.** [OOD](#ood) · [mẫu đối kháng](09-bao-mat-rieng-tu-xac-thuc.md#adversarial-example) · [tổng quát hóa](01-nen-tang.md#generalization) · [benchmark](#benchmark)

**Nguồn.** [1] Liang và cộng sự, "Holistic Evaluation of Language Models", 2022, https://arxiv.org/abs/2211.09110, truy cập 2/10/2026 (S709).

<a id="factuality"></a>
### Factuality — Tính đúng sự thật

*Mã: factuality · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tính đúng sự thật là một tính chất của đầu ra: nội dung khớp với thực tế đã kiểm chứng được. Phép [đánh giá](#evaluation) có thể tách câu trả lời thành từng phát biểu, rồi kiểm tra từng phát biểu với nguồn tin cậy.

**Phân biệt.** [Độ bám sát nguồn](#faithfulness) so đầu ra với tài liệu được đưa vào, và tài liệu đó có thể sai.

**Liên quan.** [ảo giác](04-llm-va-mo-hinh-sinh.md#hallucination) · [độ bám sát nguồn](#faithfulness) · [grounding](05-prompt-ngu-canh-tri-thuc.md#grounding)

<a id="faithfulness"></a>
### Faithfulness — Độ bám sát nguồn

*Mã: faithfulness · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** faithfulness, groundedness. Dạng chuẩn trong sách: độ bám sát nguồn.

**Định nghĩa.** Độ bám sát nguồn là một chỉ số đo phần phát biểu có căn cứ trong tài liệu nguồn được đưa cho [mô hình](01-nen-tang.md#model). Trong [RAG](05-prompt-ngu-canh-tri-thuc.md#rag), tài liệu nguồn là các đoạn văn bản mà hệ thống đã truy xuất.

**Giải thích.** Một phương pháp đo có 2 bước. Bước 1 tách câu trả lời thành các phát biểu ngắn. Bước 2 kiểm tra từng phát biểu có suy ra được từ tài liệu nguồn hay không. Điểm bằng số phát biểu có căn cứ chia cho tổng số phát biểu. Một số công cụ dùng một [LLM](04-llm-va-mo-hinh-sinh.md#llm) cho cả 2 bước. Khi đó, điểm phụ thuộc cả chất lượng của LLM chấm.

**Ví dụ.** Ví dụ giả định: một trợ lý pháp lý trả lời bằng 5 phát biểu. 4 phát biểu có căn cứ trong văn bản đã truy xuất. 1 phát biểu nêu một mức phạt không có trong văn bản. Độ bám sát nguồn = 4 / 5 = 80%.

**Phân biệt.** Độ bám sát nguồn khác [tính đúng sự thật](#factuality). Một câu trả lời bám sát nguồn 100% vẫn sai khi tài liệu nguồn sai hoặc lỗi thời. Độ bám sát nguồn cũng khác việc có [trích nguồn](05-prompt-ngu-canh-tri-thuc.md#citation). Câu trả lời có trích dẫn vẫn có thể nêu điều mà nguồn được dẫn không hỗ trợ.

**Liên quan.** [grounding](05-prompt-ngu-canh-tri-thuc.md#grounding) · [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) · [tính đúng sự thật](#factuality) · [đánh giá truy xuất](#retrieval-evaluation)

**Nguồn.** [1] Es và cộng sự, "Ragas: Automated Evaluation of Retrieval Augmented Generation", 2023, https://arxiv.org/abs/2309.15217, truy cập 2/10/2026 (S717). [2] Google for Developers, "Machine Learning Glossary" (mục groundedness, factuality), 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="toxicity"></a>
### Toxicity — Độ độc hại

*Mã: toxicity · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Độ độc hại là mức nội dung có tính lăng mạ, đe dọa hoặc xúc phạm. Một phép [đánh giá](#evaluation) cho [mô hình](01-nen-tang.md#model) viết tiếp một tập câu mở đầu. Sau đó, một công cụ chấm tự động hoặc người chấm cho điểm đầu ra.

**Phân biệt.** [Bộ phân loại an toàn](08-an-toan-va-alignment.md#safety-classifier) chặn hoặc gắn cờ nội dung khi hệ thống chạy thật, không phải phép đo trước khi phát hành.

**Liên quan.** [bộ phân loại an toàn](08-an-toan-va-alignment.md#safety-classifier) · [đánh giá công bằng](#fairness-evaluation) · [red teaming](08-an-toan-va-alignment.md#red-teaming)

<a id="fairness-evaluation"></a>
### Fairness evaluation — Đánh giá công bằng

*Mã: fairness-evaluation · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Đánh giá công bằng là một loại [đánh giá](#evaluation) so sánh kết quả của [mô hình](01-nen-tang.md#model) giữa các nhóm người. Ví dụ về nhóm: giới tính, vùng miền. Phép đo tìm chênh lệch về tỷ lệ đúng hoặc loại lỗi giữa các nhóm.

**Phân biệt.** Có nhiều định nghĩa [công bằng](10-phap-ly-quan-tri-chinh-sach.md#fairness) đo được, và một số định nghĩa không thể cùng đạt.

**Liên quan.** [thiên lệch thuật toán](08-an-toan-va-alignment.md#bias-thien-lech) · [công bằng](10-phap-ly-quan-tri-chinh-sach.md#fairness) · [độ độc hại](#toxicity)

## 7.3 Đánh giá bằng con người và bằng mô hình

<a id="human-evaluation"></a>
### Human evaluation — Đánh giá bằng con người

*Mã: human-evaluation · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** human eval. Dạng chuẩn trong sách: đánh giá bằng con người.

**Định nghĩa.** Đánh giá bằng con người là một loại [đánh giá](#evaluation) trong đó con người chấm đầu ra của [mô hình](01-nen-tang.md#model). Người chấm cho điểm hoặc chọn câu trả lời tốt hơn. Cách này hợp với đầu ra không có một đáp án đúng duy nhất.

**Giải thích.** Có 2 cách chấm chính. Cách 1: người chấm cho điểm từng câu trả lời theo một [thang chấm](#rubric). Cách 2: người chấm so 2 câu trả lời cho cùng một câu hỏi và chọn câu tốt hơn. Người chấm có thể là chuyên gia, nhân viên nội bộ hoặc người làm việc qua nền tảng thuê ngoài.

Đánh giá bằng con người tốn tiền và thời gian. Kết quả phụ thuộc vào trình độ, sự chú ý của người chấm và hướng dẫn chấm. Để giảm sai lệch, nhóm đánh giá cho từ 2 người trở lên chấm mỗi câu. Sau đó, nhóm đo mức đồng ý giữa các người chấm.

**Phân biệt.** [LLM-as-a-judge](#llm-as-a-judge) dùng một [LLM](04-llm-va-mo-hinh-sinh.md#llm) làm người chấm. Nhóm đánh giá có thể cho con người chấm một mẫu nhỏ để kiểm tra LLM chấm.

**Giới hạn.** Người chấm không chuyên có thể bỏ qua lỗi nội dung khi văn bản viết trôi chảy. Năm 2021, một nghiên cứu thử người chấm chưa qua đào tạo. Người chấm phân biệt văn bản do máy viết với văn bản do người viết chỉ ở mức đoán ngẫu nhiên.

**Liên quan.** [LLM-as-a-judge](#llm-as-a-judge) · [thang chấm](#rubric) · [xếp hạng theo ưu tiên của con người](#human-preference-ranking) · [dữ liệu ưu tiên](02-du-lieu-va-huan-luyen.md#preference-data)

**Nguồn.** [1] Clark và cộng sự, "All That's 'Human' Is Not Gold: Evaluating Human Evaluation of Generated Text", 2021, https://aclanthology.org/2021.acl-long.565/, truy cập 2/10/2026 (S725). [2] Anthropic, "Challenges in evaluating AI systems", 2023, https://www.anthropic.com/research/evaluating-ai-systems, truy cập 2/10/2026 (S706).

<a id="rubric"></a>
### Rubric — Thang chấm

*Mã: rubric · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** rubric, tiêu chí chấm. Dạng chuẩn trong sách: thang chấm.

**Định nghĩa.** Thang chấm là một danh sách tiêu chí có mô tả và số điểm. Thang chấm dùng cho đầu ra không có một đáp án đúng duy nhất. Người chấm hoặc [LLM-as-a-judge](#llm-as-a-judge) đối chiếu đầu ra với từng tiêu chí, rồi cộng điểm.

**Phân biệt.** Thang chấm mô tả cách chấm, còn [ground truth](#ground-truth) là đáp án cụ thể để so khớp.

**Liên quan.** [đánh giá bằng con người](#human-evaluation) · [LLM-as-a-judge](#llm-as-a-judge) · [ground truth](#ground-truth)

<a id="llm-as-a-judge"></a>
### LLM-as-a-judge — LLM làm giám khảo

*Mã: llm-as-a-judge · Chương 7 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** LLM làm giám khảo, giám khảo LLM, autorater. Dạng chuẩn trong sách: LLM-as-a-judge.

**Định nghĩa.** LLM-as-a-judge là một phương pháp [đánh giá](#evaluation) trong đó một [LLM](04-llm-va-mo-hinh-sinh.md#llm) chấm đầu ra của một mô hình khác hoặc của chính LLM đó. LLM chấm nhận câu hỏi, câu trả lời và hướng dẫn chấm, rồi trả về điểm hoặc lựa chọn.

**Giải thích.** LLM-as-a-judge có 3 cách dùng chính:

- So sánh từng cặp: LLM chấm nhận 2 câu trả lời và chọn câu tốt hơn, hoặc chọn hòa.
- Chấm một câu trả lời: LLM chấm cho điểm theo một [thang chấm](#rubric).
- Chấm theo lời giải mẫu: LLM chấm nhận thêm một lời giải mẫu để so sánh.

Cách này rẻ và nhanh hơn [đánh giá bằng con người](#human-evaluation) khi cần chấm hàng nghìn đầu ra của [mô hình](01-nen-tang.md#model). Cách này hợp với câu hỏi mở, khi đoạn mã so khớp không chấm được. Năm 2023, một nghiên cứu ghi nhận các LLM chấm mạnh lúc đó đồng ý với người chấm trong hơn 80% trường hợp. Mức này ngang mức đồng ý giữa 2 người chấm.

**Ví dụ.** Ví dụ giả định: Công ty An Bình thử 2 [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) trên 300 câu hỏi của khách hàng. Một LLM chấm so 2 câu trả lời cho mỗi câu hỏi theo thang chấm 4 tiêu chí. Kỹ sư chấm mỗi cặp 2 lần và đổi thứ tự 2 câu trả lời ở lần thứ 2. Chị Lan chấm lại 30 cặp để đo mức đồng ý giữa chị và LLM chấm.

**Phân biệt.** LLM-as-a-judge khác [mô hình phần thưởng](02-du-lieu-va-huan-luyen.md#reward-model). Mô hình phần thưởng được [huấn luyện](01-nen-tang.md#training) riêng để cho điểm đầu ra trong lúc huấn luyện một mô hình khác. LLM chấm nhận hướng dẫn chấm qua [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) và dùng khi đánh giá.

**Không nên hiểu là.** Điểm do LLM chấm không phải phán quyết khách quan. Nhiều lượt tự chấm của cùng một mô hình cũng không phải đánh giá độc lập.

**Giới hạn.** Các nghiên cứu ghi nhận 3 loại thiên lệch của LLM chấm:

- Thiên lệch vị trí: LLM chấm ưu tiên câu trả lời theo vị trí, ví dụ: câu đứng trước.
- Thiên lệch độ dài: LLM chấm ưu tiên câu trả lời dài hơn.
- Thiên lệch tự ưu tiên: LLM chấm ưu tiên câu trả lời do chính LLM đó tạo ra.

LLM chấm cũng có thể chấm sai câu hỏi cần tính toán hoặc kiến thức chuyên môn.

**Thay đổi gần đây.** Năm 2023, một nghiên cứu lớn về LLM-as-a-judge mô tả 3 loại thiên lệch nêu trên. Năm 2024, một khảo sát lớn tập trung vào cách tăng tính nhất quán của LLM chấm. Năm 2026, một nhà phát triển mô hình khuyến nghị đối chiếu LLM chấm với chuyên gia trước khi dùng.

> **THẬN TRỌNG:** Đổi thứ tự 2 câu trả lời và chấm lại khi dùng LLM chấm theo cặp. Thiên lệch vị trí có thể đảo kết quả so sánh.

**Liên quan.** [đánh giá bằng con người](#human-evaluation) · [thang chấm](#rubric) · [tỷ lệ thắng](#win-rate) · [mô hình phần thưởng](02-du-lieu-va-huan-luyen.md#reward-model)

**Nguồn.** [1] Zheng và cộng sự, "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", 2023, https://arxiv.org/abs/2306.05685, truy cập 2/10/2026 (S702). [2] Gu và cộng sự, "A Survey on LLM-as-a-Judge", 2024 (bản 6, 2025), https://arxiv.org/abs/2411.15594, truy cập 2/10/2026 (S704). [3] Anthropic (M. Grace và cộng sự), "Demystifying evals for AI agents", 2026, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, truy cập 2/10/2026 (S705).

<a id="human-preference-ranking"></a>
### Human preference ranking — Xếp hạng theo ưu tiên của con người

*Mã: human-preference-ranking · Chương 7 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** arena, xếp hạng Elo. Dạng chuẩn trong sách: xếp hạng theo ưu tiên của con người.

**Định nghĩa.** Xếp hạng theo ưu tiên của con người là cách xếp hạng các [mô hình](01-nen-tang.md#model) từ nhiều lượt bình chọn của người dùng. Mỗi lượt, người dùng chọn 1 trong 2 câu trả lời ẩn danh.

**Giải thích.** Trên một nền tảng arena, người dùng nhập một câu hỏi. Nền tảng gửi câu hỏi cho 2 mô hình chọn ngẫu nhiên. Nền tảng hiện 2 câu trả lời không kèm tên mô hình. Người dùng chọn câu trả lời tốt hơn, hoặc chọn hòa. Nền tảng chỉ hiện tên mô hình sau khi người dùng chọn. Một phương pháp thống kê chuyển hàng trăm nghìn lượt chọn thành điểm và khoảng tin cậy ([ý nghĩa thống kê](#statistical-significance)).

**Phân biệt.** Cách xếp hạng này khác một [benchmark](#benchmark) có đáp án. Người dùng chọn câu trả lời mình thích hơn, và không bắt buộc kiểm tra đúng hay sai. Câu hỏi do người dùng nền tảng tự đặt, nên có thể khác việc của doanh nghiệp.

**Thay đổi gần đây.** Trong bài báo năm 2024, nhóm vận hành một nền tảng arena công khai mô tả việc chuyển từ điểm Elo sang mô hình Bradley-Terry. Mô hình này giúp ước lượng khoảng tin cậy. Năm 2025, một nghiên cứu độc lập ghi nhận một số nhà phát triển thử riêng nhiều phiên bản trên nền tảng này. Các nhà phát triển đó chọn kết quả để công bố.

**Liên quan.** [bảng xếp hạng](#leaderboard) · [tỷ lệ thắng](#win-rate) · [đánh giá bằng con người](#human-evaluation) · [ý nghĩa thống kê](#statistical-significance)

**Nguồn.** [1] Chiang và cộng sự, "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference", 2024, https://arxiv.org/abs/2403.04132, truy cập 2/10/2026 (S703). [2] Singh và cộng sự, "The Leaderboard Illusion", 2025, https://arxiv.org/abs/2504.20879, truy cập 2/10/2026 (S716).

<a id="ab-test"></a>
### A/B test — Thử nghiệm A/B

*Mã: ab-test · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** A/B testing. Dạng chuẩn trong sách: thử nghiệm A/B.

**Định nghĩa.** Thử nghiệm A/B là một phép so sánh 2 phương án, ví dụ: 2 [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version) hoặc 2 [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt). Người dùng thật được chia ngẫu nhiên thành 2 nhóm, mỗi nhóm dùng một phương án.

**Phân biệt.** [Xếp hạng theo ưu tiên của con người](#human-preference-ranking) thu bình chọn trên một nền tảng chung, không trên người dùng thật của sản phẩm.

**Liên quan.** [ý nghĩa thống kê](#statistical-significance) · [tỷ lệ thắng](#win-rate) · [đánh giá trong vận hành](11-trien-khai-san-pham-kinh-te.md#production-evaluation)

## 7.4 Giới hạn của benchmark

<a id="benchmark-saturation"></a>
### Benchmark saturation — Bão hòa benchmark

*Mã: benchmark-saturation · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** benchmark bão hòa, eval saturation. Dạng chuẩn trong sách: bão hòa benchmark.

**Định nghĩa.** Bão hòa benchmark là tình trạng các [mô hình](01-nen-tang.md#model) hàng đầu đạt gần điểm tối đa trên một [benchmark](#benchmark). Khi đó, benchmark không còn phân biệt được các mô hình mạnh.

**Giải thích.** Khi một benchmark bão hòa, chênh lệch vài điểm có thể chỉ là sai số đo hoặc lỗi đáp án. Nhóm nghiên cứu khi đó tạo benchmark mới, khó hơn. Benchmark bão hòa vẫn có ích làm [kiểm thử hồi quy](#regression-test). Điểm giảm cho thấy mô hình mới làm kém đi ở việc cũ.

Điểm tăng nhanh có thể có 2 nguyên nhân. Nguyên nhân thứ nhất là năng lực của mô hình tăng thật. Nguyên nhân thứ hai là câu hỏi lọt vào [dữ liệu huấn luyện](01-nen-tang.md#training-data) ([nhiễm dữ liệu kiểm tra](02-du-lieu-va-huan-luyen.md#data-contamination)). Điểm số một mình không cho biết nguyên nhân nào đúng.

**Ví dụ.** Năm 2025, nhóm tác giả của một benchmark mới ghi nhận các [LLM](04-llm-va-mo-hinh-sinh.md#llm) đạt trên 90% trên MMLU ([Phụ lục Tên riêng](90-phu-luc-ten-rieng.md)). Nhóm này tạo một bộ câu hỏi khó hơn để tiếp tục đo các LLM hàng đầu.

**Phân biệt.** Bão hòa benchmark không có nghĩa là mô hình đạt năng lực của chuyên gia. Năm 2021, một nhóm nghiên cứu ghi nhận một hiện tượng: mô hình đạt điểm cao trên benchmark. Nhưng mô hình vẫn sai ở các ví dụ thử thách đơn giản và trong tình huống thật.

**Liên quan.** [benchmark](#benchmark) · [nhiễm dữ liệu kiểm tra](02-du-lieu-va-huan-luyen.md#data-contamination) · [kiểm thử hồi quy](#regression-test) · [đánh giá năng lực](#capability-eval)

**Nguồn.** [1] Phan và cộng sự, "Humanity's Last Exam", 2025, https://arxiv.org/abs/2501.14249, truy cập 2/10/2026 (S714). [2] Kiela và cộng sự, "Dynabench: Rethinking Benchmarking in NLP", 2021, https://aclanthology.org/2021.naacl-main.324/, truy cập 2/10/2026 (S715).

<a id="leaderboard"></a>
### Leaderboard — Bảng xếp hạng

*Mã: leaderboard · Chương 7 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** leaderboard. Dạng chuẩn trong sách: bảng xếp hạng.

**Định nghĩa.** Bảng xếp hạng là một danh sách công khai sắp xếp các [mô hình](01-nen-tang.md#model) theo điểm. Điểm lấy từ một hoặc nhiều [benchmark](#benchmark), hoặc từ bình chọn của người dùng.

**Giải thích.** Bên vận hành bảng xếp hạng có thể là nhóm tạo benchmark, một tổ chức nghiên cứu hoặc một công ty. Bên vận hành tự chạy các mô hình, hoặc nhận kết quả do nhà phát triển gửi. Người đọc cần xem điểm do ai chạy, chạy theo cách nào và vào thời điểm nào.

Thứ hạng gần nhau có thể không khác nhau thật, khi chênh lệch nằm trong sai số ([ý nghĩa thống kê](#statistical-significance)). Năm 2022, một nghiên cứu so sánh các [mô hình ngôn ngữ](04-llm-va-mo-hinh-sinh.md#language-model) lớn. Trước nghiên cứu này, mỗi mô hình chỉ được đo trung bình trên 17,9% bộ tình huống chung.

**Phân biệt.** Benchmark là bộ phép thử, còn bảng xếp hạng trình bày kết quả của nhiều mô hình. Một bảng xếp hạng có thể gộp điểm của nhiều benchmark theo cách tính do bên vận hành chọn.

**Giới hạn.** Năm 2025, một nghiên cứu về một bảng xếp hạng dựa trên bình chọn ghi nhận 2 vấn đề. Một số nhà phát triển thử riêng nhiều phiên bản rồi chọn kết quả để công bố. Bên nhận nhiều dữ liệu bình chọn hơn có lợi thế khi tối ưu mô hình cho chính bảng xếp hạng đó.

**Liên quan.** [benchmark](#benchmark) · [xếp hạng theo ưu tiên của con người](#human-preference-ranking) · [bão hòa benchmark](#benchmark-saturation) · [ý nghĩa thống kê](#statistical-significance)

**Nguồn.** [1] Liang và cộng sự, "Holistic Evaluation of Language Models", 2022, https://arxiv.org/abs/2211.09110, truy cập 2/10/2026 (S709). [2] Singh và cộng sự, "The Leaderboard Illusion", 2025, https://arxiv.org/abs/2504.20879, truy cập 2/10/2026 (S716).

<a id="ood"></a>
### Out-of-distribution (OOD) — Ngoài phân phối

*Mã: ood · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** ngoài phân phối, out-of-distribution. Dạng chuẩn trong sách: OOD.

**Định nghĩa.** OOD là một tính chất của dữ liệu: dữ liệu khác loại với dữ liệu [mô hình](01-nen-tang.md#model) đã gặp khi [huấn luyện](01-nen-tang.md#training). Ví dụ: ảnh chụp ban đêm, khi mô hình chỉ học từ ảnh ban ngày.

**Phân biệt.** [Kiểm tra trên dữ liệu giữ lại](#held-out-test) dùng dữ liệu cùng loại với dữ liệu đã học, nên không đo hành vi trên dữ liệu OOD. Trên dữ liệu OOD, mô hình có thể sai mà vẫn báo mức tự tin cao.

**Liên quan.** [độ bền vững](#robustness) · [kiểm tra trên dữ liệu giữ lại](#held-out-test) · [tổng quát hóa](01-nen-tang.md#generalization)

<a id="model-drift"></a>
### Model drift — Trôi mô hình

*Mã: model-drift · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** model drift. Dạng chuẩn trong sách: trôi mô hình.

**Định nghĩa.** Trôi mô hình là tình trạng chất lượng của một [mô hình](01-nen-tang.md#model) đang vận hành giảm theo thời gian. Nguyên nhân là dữ liệu hoặc thực tế thay đổi. Hành vi cũng có thể đổi khi bên bán dịch vụ cập nhật mô hình.

**Phân biệt.** Trôi dữ liệu (data drift) là thay đổi của dữ liệu đầu vào so với [dữ liệu huấn luyện](01-nen-tang.md#training-data), một nguyên nhân của trôi mô hình.

**Liên quan.** [kiểm thử hồi quy](#regression-test) · [ghim phiên bản](11-trien-khai-san-pham-kinh-te.md#version-pinning) · [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version)

<a id="run-to-run-variance"></a>
### Run-to-run variance — Dao động giữa các lần chạy

*Mã: run-to-run-variance · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Dao động giữa các lần chạy là mức chênh lệch điểm khi chạy cùng một phép [đánh giá](#evaluation) nhiều lần. Mô hình và đầu vào giữ nguyên. Khi dao động lớn, chênh lệch nhỏ giữa 2 [mô hình](01-nen-tang.md#model) có thể không có ý nghĩa.

**Phân biệt.** [Tính không tất định](04-llm-va-mo-hinh-sinh.md#nondeterminism) là một nguyên nhân, còn dao động giữa các lần chạy là hệ quả đo được trên điểm số.

**Liên quan.** [tính không tất định](04-llm-va-mo-hinh-sinh.md#nondeterminism) · [ý nghĩa thống kê](#statistical-significance) · [khả năng tái lập](#reproducibility)

<a id="statistical-significance"></a>
### Statistical significance — Ý nghĩa thống kê

*Mã: statistical-significance · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** statistical significance, khoảng tin cậy (confidence interval). Dạng chuẩn trong sách: ý nghĩa thống kê.

**Định nghĩa.** Ý nghĩa thống kê là một kết luận: chênh lệch đo được khó xảy ra chỉ do ngẫu nhiên, theo một ngưỡng chọn trước. Khoảng tin cậy là dải giá trị có thể chứa điểm thật, ví dụ: 72% ± 3%.

**Phân biệt.** Một chênh lệch có ý nghĩa thống kê vẫn có thể quá nhỏ để có giá trị trong công việc.

**Liên quan.** [dao động giữa các lần chạy](#run-to-run-variance) · [thử nghiệm A/B](#ab-test) · [bảng xếp hạng](#leaderboard)

<a id="reproducibility"></a>
### Reproducibility — Khả năng tái lập

*Mã: reproducibility · Chương 7 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Khả năng tái lập là một tính chất của kết quả [đánh giá](#evaluation). Một nhóm khác dùng cùng mã, cùng dữ liệu và cùng cài đặt thì thu được kết quả tương tự.

**Phân biệt.** Ngoài [dao động giữa các lần chạy](#run-to-run-variance) nhỏ, tái lập còn cần bên công bố nêu đủ [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt), phiên bản và cách chấm.

**Liên quan.** [dao động giữa các lần chạy](#run-to-run-variance) · [eval harness](#eval-harness) · [ghim phiên bản](11-trien-khai-san-pham-kinh-te.md#version-pinning)
