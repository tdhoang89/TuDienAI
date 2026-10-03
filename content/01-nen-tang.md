---
chapter: 1
title: "Nền tảng: AI và học máy"
file: 01-nen-tang.md
terms: 63
bible_version: "0.2"
version: "0.1"
updated: 2026-10-02
status: review
---

# Chương 1 — Nền tảng: AI và học máy

Chương này giải thích các khái niệm nền của AI. Các chương sau dùng các khái niệm này và liên kết về đây. Sau chương này, người đọc phân biệt được các cặp khái niệm sau:

- AI, học máy và học sâu.
- Mô hình, hệ thống AI và sản phẩm.
- Huấn luyện và chạy mô hình.
- Tham số và siêu tham số.

Chương cũng mô tả cách dữ liệu dạy một mô hình. Các cụm sau nêu lỗi hay gặp khi học và phần cứng làm các phép tính. Cụm cuối nêu các khái niệm cũ mà người đọc còn gặp trong tài liệu.

## 1.1 Khái niệm gốc

<a id="ai"></a>
### Artificial intelligence (AI) — Trí tuệ nhân tạo

*Mã: ai · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** trí tuệ nhân tạo. Dạng chuẩn trong sách: AI.

**Định nghĩa.** AI là một lĩnh vực khoa học và kỹ thuật. Lĩnh vực này tạo ra các hệ thống máy tính làm được các nhiệm vụ cần trí tuệ của con người. AI cũng là tên chung của các công nghệ thuộc lĩnh vực này.

**Giải thích.** Tài liệu và báo chí dùng từ "AI" theo 3 cách chính:

- Lĩnh vực: AI là ngành nghiên cứu cách làm máy tính có hành vi thông minh.
- Công nghệ hoặc hệ thống: AI là phần mềm hoặc máy làm một nhiệm vụ thông minh, ví dụ: chấm điểm tín dụng.
- Tên đời thường của sản phẩm: "AI" chỉ một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) hoặc một trợ lý trên điện thoại.

Sách này dùng nghĩa: lĩnh vực và các công nghệ của lĩnh vực đó. Khi nói về một hệ thống cụ thể, sách dùng [hệ thống AI](#ai-system), [mô hình](#model) hoặc tên mục từ cụ thể. Tên "artificial intelligence" được ghi nhận lần đầu trong một đề xuất nghiên cứu năm 1955 ở Mỹ.

Các nhà nghiên cứu chưa thống nhất về ranh giới của AI. Một bên cho rằng chương trình chạy theo quy tắc do người viết sẵn cũng là AI, ví dụ: [hệ chuyên gia](#expert-system). Bên kia cho rằng một hệ thống chỉ là AI khi hệ thống đó học từ dữ liệu hoặc từ kinh nghiệm.

**Ví dụ.** Ngân hàng An Bình dùng một phần mềm để lọc giao dịch thẻ đáng ngờ. Phần mềm nhận số tiền, nơi mua và giờ mua, rồi trả về một điểm rủi ro cho mỗi giao dịch. Báo chí có thể viết "Ngân hàng dùng AI chống gian lận". Trong sách này, phần mềm đó là một hệ thống AI dùng [học máy](#machine-learning).

**Phân biệt.** AI là lĩnh vực rộng nhất. Học máy là một nhóm phương pháp trong AI. Trong học máy, máy tính tìm quy luật từ dữ liệu. [Học sâu](#deep-learning) là một nhóm phương pháp trong học máy, dùng [mạng nơ-ron](#neural-network) nhiều [lớp](#layer). Một hệ thống AI không nhất thiết dùng học máy. [AGI](12-xa-hoi-va-tuong-lai.md#agi) là một mục tiêu còn tranh luận, không phải tên khác của AI.

**Không nên hiểu là.** AI không có nghĩa là máy có ý thức hoặc có cảm xúc. "Trí tuệ nhân tạo" là tên của một lĩnh vực, không phải kết luận về trí tuệ của máy. AI cũng không đồng nghĩa với chatbot hay [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai). Các công nghệ đó chỉ là một phần của AI.

**Giới hạn.** Một hệ thống AI làm tốt một nhiệm vụ không chứng minh hệ thống đó làm tốt nhiệm vụ khác. Ví dụ: một phần mềm chơi cờ giỏi không dịch được văn bản. Xem [AI hẹp](#narrow-ai).

**Liên quan.** [hệ thống AI](#ai-system) · [học máy](#machine-learning) · [học sâu](#deep-learning) · [AI hẹp](#narrow-ai) · [AI biểu tượng](#symbolic-ai) · [AGI](12-xa-hoi-va-tuong-lai.md#agi)

**Nguồn.** [1] McCarthy, Minsky, Rochester, Shannon, "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence", 1955, http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf, truy cập 2/10/2026 (S103). [2] Stanford HAI (Christopher Manning), "Artificial Intelligence Definitions", 2022, https://hai.stanford.edu/sites/default/files/2023-03/AI-Key-Terms-Glossary-Definition.pdf, truy cập 2/10/2026 (S101). [3] OECD, "Explanatory memorandum on the updated OECD definition of an AI system", 2024, https://doi.org/10.1787/623da898-en, truy cập 2/10/2026 (S102). [4] Stone et al. (AI100), "Artificial Intelligence and Life in 2030, Appendix I: A Short History of AI", 2016, https://ai100.stanford.edu/2016-report/appendix-i-short-history-ai, truy cập 2/10/2026 (S115).

<a id="narrow-ai"></a>
### Narrow AI — AI hẹp

*Mã: narrow-ai · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** AI chuyên biệt. Dạng chuẩn trong sách: AI hẹp.

**Định nghĩa.** AI hẹp là một [hệ thống AI](#ai-system) chỉ làm một nhiệm vụ hoặc một nhóm nhiệm vụ hẹp. Ví dụ: nhận dạng khuôn mặt, [nhận dạng giọng nói](04-llm-va-mo-hinh-sinh.md#speech-recognition).

**Giải thích.** Một hệ thống AI hẹp làm tốt nhiệm vụ đã định nhưng không chuyển năng lực đó sang nhiệm vụ khác. Một phần mềm chơi cờ không lái được xe. Một [mô hình](#model) phát hiện gian lận thẻ không đọc được ảnh y khoa.

Các mô hình đa dụng, ví dụ [LLM](04-llm-va-mo-hinh-sinh.md#llm), làm được nhiều loại nhiệm vụ: viết, dịch, tóm tắt, lập trình. Các nhà nghiên cứu chưa thống nhất về việc xếp các mô hình này vào AI hẹp hay vào một nhóm khác.

**Phân biệt.** AI tổng quát (general AI) chỉ một hệ thống có trí tuệ rộng, thích nghi với nhiều loại nhiệm vụ như con người. Mục [AGI](12-xa-hoi-va-tuong-lai.md#agi) trình bày các định nghĩa khác nhau của khái niệm này. AI hẹp là một hệ thống có thật và đo được trên nhiệm vụ cụ thể. AI tổng quát là một mục tiêu nghiên cứu.

**Liên quan.** [AI](#ai) · [AGI](12-xa-hoi-va-tuong-lai.md#agi) · [mô hình nền tảng](04-llm-va-mo-hinh-sinh.md#foundation-model)

**Nguồn.** [1] Stanford HAI (Christopher Manning), "Artificial Intelligence Definitions", 2022, https://hai.stanford.edu/sites/default/files/2023-03/AI-Key-Terms-Glossary-Definition.pdf, truy cập 2/10/2026 (S101).

<a id="algorithm"></a>
### Algorithm — Thuật toán

*Mã: algorithm · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Thuật toán là một dãy bước xác định mà máy tính hoặc con người làm theo để đạt một kết quả.

**Giải thích.** Mỗi chương trình máy tính chạy theo một hoặc nhiều thuật toán. Ví dụ: một thuật toán sắp xếp đặt danh sách tên theo thứ tự chữ cái. Người viết thuật toán quyết định từng bước. Với cùng một đầu vào, thuật toán cho cùng một kết quả, trừ khi thuật toán có bước ngẫu nhiên.

Trong [học máy](#machine-learning), thuật toán [huấn luyện](#training) là các bước điều chỉnh [tham số](#parameter) của [mô hình](#model) từ dữ liệu, ví dụ: [gradient descent](#gradient-descent). Kết quả của thuật toán huấn luyện là một mô hình. Phần lớn hành vi của mô hình đến từ dữ liệu, không đến từ các bước do người viết.

Báo chí và văn bản pháp luật có thể dùng từ "thuật toán" theo nghĩa rộng hơn. Ví dụ: "thuật toán của mạng xã hội" chỉ cả hệ thống xếp hạng nội dung, gồm mô hình, dữ liệu và quy tắc.

**Ví dụ.** Chị Lan viết một thuật toán tính lương: lấy số ngày công, nhân với lương một ngày, rồi trừ bảo hiểm. Mỗi tháng, chương trình làm đúng 3 bước đó. Ngược lại, một mô hình chấm điểm tín dụng học [trọng số](#weight) của từng yếu tố từ hồ sơ vay cũ. Chị Lan không viết các trọng số đó.

**Phân biệt.** Thuật toán là các bước. Mô hình là kết quả của thuật toán huấn luyện. Trong lập trình theo quy tắc, người viết đặt sẵn các bước và các điều kiện. Trong học máy, thuật toán huấn luyện chọn phần lớn các con số quyết định đầu ra.

**Không nên hiểu là.** Thuật toán không tự động khách quan. Người viết chọn các bước, dữ liệu và mục tiêu. Các lựa chọn đó có thể tạo ra kết quả bất lợi cho một nhóm người ([thiên lệch thuật toán](08-an-toan-va-alignment.md#bias-thien-lech)).

**Giới hạn.** Một thuật toán đúng vẫn cho kết quả sai khi dữ liệu đầu vào sai.

**Liên quan.** [mô hình](#model) · [học máy](#machine-learning) · [gradient descent](#gradient-descent) · [thiên lệch thuật toán](08-an-toan-va-alignment.md#bias-thien-lech)

**Nguồn.** [1] Paul E. Black (NIST), "algorithm", Dictionary of Algorithms and Data Structures, 2020, https://xlinux.nist.gov/dads/HTML/algorithm.html, truy cập 2/10/2026 (S106). [2] Stanford HAI (Christopher Manning), "Artificial Intelligence Definitions", 2022, https://hai.stanford.edu/sites/default/files/2023-03/AI-Key-Terms-Glossary-Definition.pdf, truy cập 2/10/2026 (S101).

<a id="model"></a>
### Model — Mô hình

*Mã: model · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Trong AI, mô hình là một cấu trúc toán học nhận đầu vào và tính ra đầu ra. Đầu ra có thể là một dự đoán, một nhóm (ví dụ: thư rác) hoặc một đoạn văn bản.

**Giải thích.** Một mô hình gồm 2 phần. Phần thứ nhất là cấu trúc: các phép tính nối với nhau theo một thứ tự cố định. Phần thứ hai là các [tham số](#parameter): các con số mà các phép tính dùng. Ví dụ: một [mạng nơ-ron](#neural-network) có cấu trúc gồm các [lớp](#layer) và có tham số là các [trọng số](#weight).

Kỹ sư có thể viết mô hình bằng tay, ví dụ: một công thức tính phí bảo hiểm. Mô hình cũng có thể được tạo tự động bằng [học máy](#machine-learning). Khi đó, quá trình [huấn luyện](#training) chọn giá trị cho tham số từ dữ liệu. Sau huấn luyện, phần mềm dùng mô hình để tính đầu ra cho đầu vào mới. Tên của bước này là [chạy mô hình](#inference).

**Ví dụ.** Công ty An Bình huấn luyện một mô hình để dự đoán giá căn hộ ở Hà Nội. Đầu vào là diện tích, quận và năm xây dựng. Đầu ra là một con số: giá dự đoán. Mô hình này là một tệp chứa cấu trúc và tham số, chưa có giao diện cho khách hàng.

**Phân biệt.** Mô hình là một thành phần. [Hệ thống AI](#ai-system) gồm mô hình và các phần mềm đưa mô hình vào hoạt động. Sản phẩm là thứ doanh nghiệp bán hoặc cho người dùng dùng, ví dụ: một ứng dụng [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot). [Thuật toán](#algorithm) huấn luyện là các bước tạo ra mô hình. Mô hình là kết quả của các bước đó.

**Không nên hiểu là.** Mô hình không phải bản sao của [dữ liệu huấn luyện](#training-data). Mô hình lưu các mẫu và quy luật dưới dạng tham số. Dù vậy, một số mô hình vẫn tạo lại nguyên văn một phần dữ liệu huấn luyện ([ghi nhớ dữ liệu huấn luyện](09-bao-mat-rieng-tu-xac-thuc.md#memorization)). Mô hình cũng không phải sản phẩm hoàn chỉnh. Người dùng tiếp cận mô hình qua một ứng dụng hoặc một [API](11-trien-khai-san-pham-kinh-te.md#api).

**Giới hạn.** Mô hình tính đầu ra theo các mẫu có trong dữ liệu huấn luyện. Với đầu vào khác xa dữ liệu đó, mô hình có thể trả về kết quả sai. Kết quả sai này có thể không kèm dấu hiệu báo lỗi.

**Liên quan.** [tham số](#parameter) · [huấn luyện](#training) · [chạy mô hình](#inference) · [hệ thống AI](#ai-system) · [thuật toán](#algorithm) · [LLM](04-llm-va-mo-hinh-sinh.md#llm)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] OECD, "Explanatory memorandum on the updated OECD definition of an AI system", 2024, https://doi.org/10.1787/623da898-en, truy cập 2/10/2026 (S102).

<a id="ai-system"></a>
### AI system — Hệ thống AI

*Mã: ai-system · Chương 1 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** hệ thống trí tuệ nhân tạo. Dạng chuẩn trong sách: hệ thống AI.

**Định nghĩa.** Hệ thống AI là một hệ thống máy tính tính ra đầu ra từ đầu vào nhận được. Hệ thống làm việc theo mục tiêu nêu rõ hoặc ngầm định. Đầu ra có thể là dự đoán, nội dung, khuyến nghị hoặc quyết định.

**Giải thích.** Một hệ thống AI gồm một hoặc nhiều [mô hình](#model) và các thành phần khác. Các thành phần khác có thể là giao diện, cơ sở dữ liệu, bộ lọc an toàn và quy tắc nghiệp vụ. Mô hình là phần tính ra đầu ra. Các thành phần khác nhận đầu vào, kiểm tra đầu ra và đưa đầu ra tới người dùng hoặc tới một hệ thống khác.

Các hệ thống AI khác nhau về [mức tự chủ](06-agent-va-tu-dong-hoa.md#autonomy-level) và về khả năng thích nghi sau khi [triển khai](11-trien-khai-san-pham-kinh-te.md#deployment). Một số hệ thống tiếp tục học từ dữ liệu mới. Phần lớn hệ thống giữ nguyên [tham số](#parameter) của mô hình sau khi triển khai.

Nhiều văn bản pháp luật về AI dùng hệ thống AI làm đối tượng điều chỉnh. Định nghĩa pháp lý của EU: xem [EU AI Act](10-phap-ly-quan-tri-chinh-sach.md#eu-ai-act).

**Ví dụ.** Công ty Bảo hiểm An Bình dùng một hệ thống AI để xử lý ảnh hóa đơn bồi thường. Một mô hình [OCR](04-llm-va-mo-hinh-sinh.md#ocr) đọc chữ trên ảnh. Một mô hình khác xếp hồ sơ theo mức rủi ro. Phần mềm của hệ thống chuyển hồ sơ rủi ro cao cho nhân viên kiểm tra.

**Phân biệt.** Mô hình là thành phần tính ra đầu ra. Hệ thống AI là mô hình cộng với các thành phần đưa mô hình vào hoạt động. Sản phẩm là thứ doanh nghiệp bán hoặc cho người dùng dùng, ví dụ: một ứng dụng [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot). Một sản phẩm có thể chứa nhiều hệ thống AI. Một mô hình có thể nằm trong nhiều sản phẩm.

**Không nên hiểu là.** Hệ thống AI không chỉ là mô hình. Lỗi của một hệ thống AI có thể nằm ở dữ liệu đầu vào, ở công cụ, ở cấu hình hoặc ở giao diện. Một phần mềm có chữ "AI" trong tên cũng không tự động là hệ thống AI theo một định nghĩa pháp lý.

**Thay đổi gần đây.** Tháng 11/2023, OECD cập nhật định nghĩa hệ thống AI trong các nguyên tắc AI của tổ chức này. Bản cập nhật thêm "nội dung" vào các loại đầu ra và thêm ý thích nghi sau khi triển khai.

> **CẢNH BÁO:** Kiểm tra định nghĩa hệ thống AI trong văn bản luật áp dụng. Định nghĩa trong sách này không quyết định nghĩa vụ pháp lý.

**Liên quan.** [mô hình](#model) · [AI](#ai) · [EU AI Act](10-phap-ly-quan-tri-chinh-sach.md#eu-ai-act) · [triển khai](11-trien-khai-san-pham-kinh-te.md#deployment) · [hệ thống AI rủi ro cao](10-phap-ly-quan-tri-chinh-sach.md#high-risk-ai-system) · [LLM](04-llm-va-mo-hinh-sinh.md#llm)

**Nguồn.** [1] OECD, "Explanatory memorandum on the updated OECD definition of an AI system", 2024, https://doi.org/10.1787/623da898-en, truy cập 2/10/2026 (S102). [2] NIST, "Artificial Intelligence Risk Management Framework (AI RMF 1.0)", 2023, https://doi.org/10.6028/NIST.AI.100-1, truy cập 2/10/2026 (S002).

<a id="machine-learning"></a>
### Machine learning (ML) — Học máy

*Mã: machine-learning · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** máy học. Dạng chuẩn trong sách: học máy.

**Định nghĩa.** Học máy là một nhóm phương pháp trong AI tạo ra [mô hình](#model) từ dữ liệu. Máy tính tìm quy luật trong dữ liệu, thay vì làm theo quy tắc do người viết sẵn.

**Giải thích.** Học máy cần dữ liệu và một [thuật toán](#algorithm) huấn luyện. Trong quá trình [huấn luyện](#training), thuật toán điều chỉnh [tham số](#parameter) của mô hình. Đầu ra của mô hình dần gần với đáp án hoặc mục tiêu đã đặt. Sau huấn luyện, mô hình xử lý được dữ liệu mới cùng loại với dữ liệu đã học.

Học máy có các cách học chính sau:

- [Học có giám sát](#supervised-learning): dữ liệu có sẵn đáp án đúng.
- [Học không giám sát](#unsupervised-learning): dữ liệu không có đáp án, mô hình tìm cấu trúc trong dữ liệu.
- [Học tự giám sát](#self-supervised-learning): thuật toán tự tạo đáp án từ chính dữ liệu.
- [Học tăng cường](#reinforcement-learning): mô hình học từ phần thưởng nhận được sau các hành động.

Một giáo trình học sâu dẫn định nghĩa sau. Một chương trình học từ kinh nghiệm khi kết quả của chương trình ở một nhiệm vụ tốt lên theo kinh nghiệm. Kết quả được đo bằng một thước đo cố định.

**Ví dụ.** Ví dụ giả định: Công ty An Bình muốn lọc thư rác. Theo cách lập trình theo quy tắc, kỹ sư viết luật "thư có chữ 'trúng thưởng' là thư rác". Theo cách học máy, kỹ sư đưa 10.000 thư đã đánh dấu "rác" hoặc "không rác" cho thuật toán huấn luyện. Mô hình sau huấn luyện dùng cả các dấu hiệu mà kỹ sư chưa liệt kê.

**Phân biệt.** AI là lĩnh vực rộng. Học máy là một phần của AI. [Học sâu](#deep-learning) là một phần của học máy. Trong lập trình theo quy tắc, người viết đặt sẵn các điều kiện và kết quả. Trong học máy, người viết chọn dữ liệu, mô hình và mục tiêu. Thuật toán huấn luyện chọn giá trị tham số.

**Không nên hiểu là.** Học máy không có nghĩa là mô hình tự [học liên tục](02-du-lieu-va-huan-luyen.md#continual-learning) sau khi đưa vào dùng. Phần lớn mô hình giữ nguyên tham số sau [triển khai](11-trien-khai-san-pham-kinh-te.md#deployment), cho đến khi nhà phát triển huấn luyện lại. Tên "học máy" là tên thuật ngữ, không mô tả việc học như ở người.

**Giới hạn.** Mô hình học máy phụ thuộc vào chất lượng của [dữ liệu huấn luyện](#training-data). Dữ liệu thiếu, sai hoặc lệch tạo ra mô hình sai hoặc lệch. Mô hình học máy tìm [tương quan](#correlation) trong dữ liệu, không tự xác định quan hệ nhân quả.

**Liên quan.** [AI](#ai) · [học sâu](#deep-learning) · [huấn luyện](#training) · [dữ liệu huấn luyện](#training-data) · [học có giám sát](#supervised-learning) · [quá khớp](#overfitting)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Goodfellow, Bengio, Courville, "Deep Learning", 2016, https://www.deeplearningbook.org/, truy cập 2/10/2026 (S104). [3] OECD, "Explanatory memorandum on the updated OECD definition of an AI system", 2024, https://doi.org/10.1787/623da898-en, truy cập 2/10/2026 (S102).

<a id="neural-network"></a>
### Neural network — Mạng nơ-ron

*Mã: neural-network · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mạng nơ-ron nhân tạo, mạng thần kinh nhân tạo. Dạng chuẩn trong sách: mạng nơ-ron.

**Định nghĩa.** Mạng nơ-ron là một loại [mô hình](#model) gồm nhiều đơn vị tính toán nhỏ xếp thành lớp. Mỗi đơn vị nhận các số từ lớp trước, nhân với các [trọng số](#weight), cộng lại và chuyển kết quả sang lớp sau.

**Giải thích.** Mạng nơ-ron có 3 loại [lớp](#layer). Lớp đầu vào nhận dữ liệu. Các lớp ẩn biến đổi dữ liệu. Lớp đầu ra trả về kết quả, ví dụ: [xác suất](#probability) để một ảnh chứa con mèo.

Mỗi đơn vị (nơ-ron nhân tạo) tính tổng có trọng số của các đầu vào. Sau đó, đơn vị này đưa tổng qua một [hàm kích hoạt](#activation-function). Hàm kích hoạt cho phép mạng biểu diễn các quan hệ không phải đường thẳng giữa đầu vào và đầu ra.

Trong [huấn luyện](#training), [lan truyền ngược](#backpropagation) tính xem mỗi trọng số cần tăng hay giảm để giảm sai số. Mạng có hơn một lớp ẩn là mạng nơ-ron sâu. Học bằng mạng nơ-ron sâu là [học sâu](#deep-learning).

**Ví dụ.** Ví dụ giả định: Ngân hàng An Bình dùng một mạng nơ-ron nhỏ để đọc chữ số viết tay trên phiếu nộp tiền. Đầu vào là ảnh của một chữ số, gồm 28 × 28 = 784 điểm ảnh. Mạng có 2 lớp ẩn và một lớp đầu ra 10 đơn vị, ứng với 10 chữ số từ 0 đến 9. Phần mềm chọn chữ số có xác suất cao nhất.

**Phân biệt.** Mạng nơ-ron là một loại mô hình. Học sâu là cách học dùng mạng nơ-ron có nhiều lớp. Không phải mô hình [học máy](#machine-learning) nào cũng là mạng nơ-ron. Ví dụ: [cây quyết định](#decision-tree) và [hồi quy logistic](#logistic-regression) không phải mạng nơ-ron.

**Không nên hiểu là.** Mạng nơ-ron nhân tạo không mô phỏng bộ não người. Tên "nơ-ron" lấy cảm hứng từ tế bào thần kinh. Nhưng một nơ-ron nhân tạo chỉ là một phép tính: nhân, cộng và đưa qua một hàm.

**Giới hạn.** Người đọc không xem trực tiếp các trọng số để biết vì sao mạng cho một kết quả. Một mạng lớn có hàng triệu đến hàng tỷ trọng số. Giải thích hành vi của mạng là một lĩnh vực nghiên cứu riêng ([khả năng giải thích mô hình](08-an-toan-va-alignment.md#interpretability)).

**Liên quan.** [học sâu](#deep-learning) · [lớp](#layer) · [trọng số](#weight) · [lan truyền ngược](#backpropagation) · [hàm kích hoạt](#activation-function) · [transformer](03-kien-truc-mo-hinh.md#transformer)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] LeCun, Bengio, Hinton, "Deep learning", 2015, https://www.nature.com/articles/nature14539, truy cập 2/10/2026 (S105).

<a id="deep-learning"></a>
### Deep learning — Học sâu

*Mã: deep-learning · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học sâu là một nhóm phương pháp [học máy](#machine-learning) dùng [mạng nơ-ron](#neural-network) có nhiều lớp. Mỗi lớp biến đổi kết quả của lớp trước thành một biểu diễn trừu tượng hơn của dữ liệu.

**Giải thích.** Trong học máy truyền thống, kỹ sư phải tự chọn và tự tính các [đặc trưng](#feature) của dữ liệu. Ví dụ: để tìm ô tô trong ảnh, kỹ sư phải mô tả bánh xe bằng các điểm ảnh. Mô tả này khó, vì bóng và ánh sáng làm hình bánh xe thay đổi. Trong học sâu, mạng nơ-ron học các đặc trưng trực tiếp từ dữ liệu thô, ví dụ từ điểm ảnh.

Các [lớp](#layer) đầu của mạng biểu diễn chi tiết đơn giản, ví dụ cạnh và góc. Các lớp sau ghép các chi tiết đó thành khái niệm phức tạp hơn, ví dụ khuôn mặt. Từ đầu thập niên 2010, học sâu cho kết quả tốt hơn các phương pháp trước. Ví dụ: [nhận dạng giọng nói](04-llm-va-mo-hinh-sinh.md#speech-recognition), nhận dạng vật thể trong ảnh.

Các [mô hình](#model) [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai), ví dụ [LLM](04-llm-va-mo-hinh-sinh.md#llm), là mô hình học sâu. Kiến trúc [transformer](03-kien-truc-mo-hinh.md#transformer) là một loại mạng nơ-ron sâu.

**Ví dụ.** Ứng dụng của Công ty An Bình đọc biển số từ ảnh chụp xe ở bãi đỗ. Các lớp đầu của mạng phát hiện cạnh và góc. Các lớp sau phát hiện hình chữ và số. Lớp đầu ra trả về chuỗi biển số.

**Phân biệt.** AI là lĩnh vực. Học máy là một nhóm phương pháp trong AI. Học sâu là một nhóm phương pháp trong học máy. Các mô hình học sâu đều là mô hình học máy. Nhưng nhiều mô hình học máy không dùng học sâu, ví dụ: [rừng ngẫu nhiên](#random-forest).

**Không nên hiểu là.** Chữ "sâu" chỉ số lượng lớp trong mạng. Chữ này không nói về độ sâu của tư duy hay về chất lượng kết quả.

**Giới hạn.** Học sâu cần nhiều dữ liệu và nhiều [năng lực tính toán](#compute). Mô hình học sâu cũng khó giải thích hơn các mô hình đơn giản như [cây quyết định](#decision-tree).

**Liên quan.** [học máy](#machine-learning) · [mạng nơ-ron](#neural-network) · [lan truyền ngược](#backpropagation) · [GPU](#gpu) · [transformer](03-kien-truc-mo-hinh.md#transformer) · [LLM](04-llm-va-mo-hinh-sinh.md#llm)

**Nguồn.** [1] LeCun, Bengio, Hinton, "Deep learning", 2015, https://www.nature.com/articles/nature14539, truy cập 2/10/2026 (S105). [2] Goodfellow, Bengio, Courville, "Deep Learning", 2016, https://www.deeplearningbook.org/, truy cập 2/10/2026 (S104).

<a id="nlp"></a>
### Natural language processing (NLP) — Xử lý ngôn ngữ tự nhiên

*Mã: nlp · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** xử lý ngôn ngữ tự nhiên. Dạng chuẩn trong sách: NLP.

**Định nghĩa.** NLP là một lĩnh vực của AI xử lý ngôn ngữ của con người ở dạng văn bản hoặc lời nói. Ví dụ: dịch máy, tóm tắt văn bản, phân tích bình luận của khách hàng.

**Phân biệt.** [LLM](04-llm-va-mo-hinh-sinh.md#llm) là một loại [mô hình](#model) dùng trong NLP, không phải tên khác của NLP.

**Liên quan.** [LLM](04-llm-va-mo-hinh-sinh.md#llm) · [nhận dạng giọng nói](04-llm-va-mo-hinh-sinh.md#speech-recognition) · [AI](#ai)

<a id="layer"></a>
### Layer — Lớp

*Mã: layer · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Lớp là một nhóm đơn vị tính toán trong [mạng nơ-ron](#neural-network) cùng xử lý một bước. Lớp nhận đầu ra của lớp trước và chuyển kết quả sang lớp sau. Các lớp ẩn nằm giữa lớp đầu vào và lớp đầu ra.

**Liên quan.** [mạng nơ-ron](#neural-network) · [học sâu](#deep-learning) · [lớp truyền thẳng](03-kien-truc-mo-hinh.md#feed-forward-layer)

<a id="activation-function"></a>
### Activation function — Hàm kích hoạt

*Mã: activation-function · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Hàm kích hoạt là một phép tính mà mỗi đơn vị trong [mạng nơ-ron](#neural-network) áp dụng lên tổng có [trọng số](#weight) của đầu vào. Hàm này giúp mạng biểu diễn quan hệ không phải đường thẳng. Ví dụ: hàm ReLU đổi số âm thành 0.

**Liên quan.** [mạng nơ-ron](#neural-network) · [lớp](#layer) · [softmax](#softmax)

<a id="parameter"></a>
### Parameter — Tham số

*Mã: parameter · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tham số là một con số bên trong [mô hình](#model) mà quá trình [huấn luyện](#training) điều chỉnh. Các tham số cùng quyết định mô hình tính ra đầu ra nào cho một đầu vào.

**Giải thích.** Trong công thức "giá nhà = a × diện tích + b", a và b là 2 tham số. Huấn luyện tìm giá trị của a và b để công thức khớp với dữ liệu giá nhà đã có. Một [mạng nơ-ron](#neural-network) dùng cùng nguyên tắc, nhưng có hàng triệu đến hàng tỷ tham số.

Tham số gồm [trọng số](#weight) và [hệ số lệch](#bias-he-so). Trong tài liệu kỹ thuật, số tham số là một thước đo [kích thước mô hình](03-kien-truc-mo-hinh.md#model-size). Ví dụ: "mô hình 7B" là mô hình có 7 tỷ (billion) tham số.

Sau huấn luyện, tham số giữ nguyên cho đến lần huấn luyện tiếp theo. Khi phần mềm [chạy mô hình](#inference), mô hình dùng tham số nhưng không thay đổi tham số.

**Ví dụ.** Ví dụ giả định: Công ty An Bình xây một mô hình dự đoán tiền điện hằng tháng. Công thức là: tiền điện = a × số kWh + b. Sau huấn luyện trên 1.000 hóa đơn cũ, a = 2.500 và b = 30.000. Với 200 kWh, mô hình dự đoán 2.500 × 200 + 30.000 = 530.000 đồng.

**Phân biệt.** [Siêu tham số](#hyperparameter) là giá trị do kỹ sư đặt để điều khiển huấn luyện, ví dụ: [tốc độ học](#learning-rate). Tham số là giá trị do huấn luyện tìm ra. Trọng số là loại tham số chiếm phần lớn trong một mạng nơ-ron.

**Không nên hiểu là.** Mỗi tham số không lưu một sự kiện hay một câu cụ thể. Thông tin mà mô hình học được phân tán trên nhiều tham số. Dù vậy, mô hình vẫn có thể tạo lại nguyên văn một phần [dữ liệu huấn luyện](#training-data) ([ghi nhớ dữ liệu huấn luyện](09-bao-mat-rieng-tu-xac-thuc.md#memorization)).

**Giới hạn.** Số tham số lớn hơn không mặc định cho mô hình tốt hơn. Dữ liệu, cách huấn luyện và [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training) cũng quyết định chất lượng.

**Liên quan.** [trọng số](#weight) · [siêu tham số](#hyperparameter) · [huấn luyện](#training) · [kích thước mô hình](03-kien-truc-mo-hinh.md#model-size) · [tham số hoạt động](03-kien-truc-mo-hinh.md#active-parameters)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] OECD, "Explanatory memorandum on the updated OECD definition of an AI system", 2024, https://doi.org/10.1787/623da898-en, truy cập 2/10/2026 (S102).

<a id="weight"></a>
### Weight — Trọng số

*Mã: weight · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Trọng số là một [tham số](#parameter) mà [mô hình](#model) nhân với một giá trị đầu vào. Trọng số càng xa 0, giá trị đầu vào đó càng ảnh hưởng nhiều tới đầu ra.

**Giải thích.** Trong một [mạng nơ-ron](#neural-network), mỗi kết nối giữa 2 đơn vị có một trọng số. [Huấn luyện](#training) là quá trình tìm giá trị phù hợp cho các trọng số. [Chạy mô hình](#inference) là quá trình dùng các trọng số đã học để tính đầu ra. Khi nhà phát triển công bố trọng số, người khác tải được tệp chứa các con số này ([mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights)).

**Phân biệt.** Tham số gồm trọng số và [hệ số lệch](#bias-he-so). Trong tài liệu về mô hình mở, từ "trọng số" thường chỉ toàn bộ tham số của mô hình.

**Liên quan.** [tham số](#parameter) · [hệ số lệch](#bias-he-so) · [mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights) · [bảo mật trọng số mô hình](09-bao-mat-rieng-tu-xac-thuc.md#model-weights-security)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="bias-he-so"></a>
### Bias (hệ số lệch) — Hệ số lệch

*Mã: bias-he-so · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Hệ số lệch là một [tham số](#parameter) cộng thêm vào tổng có [trọng số](#weight), không nhân với đầu vào nào. Trong công thức y = b + w × x, b là hệ số lệch.

**Phân biệt.** Hệ số lệch là một con số trong [mô hình](#model), khác [thiên lệch thuật toán](08-an-toan-va-alignment.md#bias-thien-lech) là kết quả bất lợi cho một nhóm người.

**Liên quan.** [tham số](#parameter) · [trọng số](#weight) · [thiên lệch thuật toán](08-an-toan-va-alignment.md#bias-thien-lech)

<a id="hyperparameter"></a>
### Hyperparameter — Siêu tham số

*Mã: hyperparameter · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Siêu tham số là một giá trị do kỹ sư đặt để điều khiển quá trình [huấn luyện](#training), ví dụ: [tốc độ học](#learning-rate). Quá trình huấn luyện không tự thay đổi siêu tham số.

**Phân biệt.** [Tham số](#parameter) do huấn luyện tìm ra, còn siêu tham số do kỹ sư chọn trước hoặc giữa các lần huấn luyện.

**Liên quan.** [tham số](#parameter) · [tốc độ học](#learning-rate) · [epoch](#epoch) · [batch](#batch)

<a id="vector"></a>
### Vector — Vector

*Mã: vector · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Vector là một dãy số có thứ tự, ví dụ: (2, 5, 7). Trong [học máy](#machine-learning), một [mô hình](#model) biểu diễn một đối tượng bằng vector. Ví dụ: một căn nhà là (diện tích, số phòng, tuổi nhà).

**Phân biệt.** [Embedding](03-kien-truc-mo-hinh.md#embedding) là một loại vector do mô hình tạo ra để biểu diễn nội dung của văn bản, ảnh hoặc âm thanh.

**Liên quan.** [tensor](#tensor) · [embedding](03-kien-truc-mo-hinh.md#embedding) · [cơ sở dữ liệu vector](05-prompt-ngu-canh-tri-thuc.md#vector-database)

<a id="tensor"></a>
### Tensor — Tensor

*Mã: tensor · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tensor là một khối số xếp theo một hoặc nhiều chiều. Một số đơn lẻ là tensor 0 chiều. Một [vector](#vector) là tensor 1 chiều. Một bảng số là tensor 2 chiều. [Mạng nơ-ron](#neural-network) xử lý dữ liệu dưới dạng tensor.

**Liên quan.** [vector](#vector) · [TPU](#tpu) · [mạng nơ-ron](#neural-network)

<a id="probability"></a>
### Probability — Xác suất

*Mã: probability · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Xác suất là một con số từ 0 đến 1 đo mức chắc chắn của một sự kiện. Xác suất 0 nghĩa là sự kiện không xảy ra. Xác suất 1 nghĩa là sự kiện chắc chắn xảy ra.

**Phân biệt.** Xác suất mà một [mô hình](#model) gán cho đầu ra không phải độ tin cậy về sự thật ([hiệu chuẩn](07-danh-gia-va-chat-luong.md#calibration)).

**Liên quan.** [softmax](#softmax) · [hồi quy logistic](#logistic-regression) · [hiệu chuẩn](07-danh-gia-va-chat-luong.md#calibration)

<a id="softmax"></a>
### Softmax — Hàm softmax

*Mã: softmax · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** hàm softmax. Dạng chuẩn trong sách: softmax.

**Định nghĩa.** Softmax là một hàm toán học biến một dãy điểm số thành một dãy [xác suất](#probability) có tổng bằng 1. Ví dụ: điểm số của 3 nhãn "chó", "mèo", "thỏ" thành 0,85, 0,13 và 0,02.

**Phân biệt.** Điểm số thô trước khi qua softmax có tên là [logit](03-kien-truc-mo-hinh.md#logit).

**Liên quan.** [xác suất](#probability) · [logit](03-kien-truc-mo-hinh.md#logit) · [phân loại](#classification)

## 1.2 Cách máy học

<a id="dataset"></a>
### Dataset — Tập dữ liệu

*Mã: dataset · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tập dữ liệu là một tập hợp dữ liệu sắp xếp theo một cấu trúc chung. Ví dụ: một bảng tính, một thư mục ảnh hoặc một kho văn bản.

**Giải thích.** Trong [học máy](#machine-learning), mỗi phần tử của tập dữ liệu là một mẫu. Mỗi mẫu gồm các [đặc trưng](#feature) và, khi có, một [nhãn dữ liệu](#label). Kỹ sư thường chia tập dữ liệu thành 3 phần riêng:

- Phần huấn luyện: dùng để [huấn luyện](#training) mô hình ([dữ liệu huấn luyện](#training-data)).
- Phần kiểm định: dùng để chọn [siêu tham số](#hyperparameter) ([tập kiểm định](02-du-lieu-va-huan-luyen.md#validation-set)).
- Phần kiểm tra: dùng một lần ở cuối để đo kết quả trên dữ liệu mới.

Phần kiểm tra không được dùng để chọn thiết lập của [mô hình](#model). Khi phần kiểm tra ảnh hưởng tới các lựa chọn đó, kết quả đo cao hơn kết quả thật.

**Phân biệt.** Dữ liệu huấn luyện là phần của tập dữ liệu dùng để huấn luyện. Một tập dữ liệu có thể chỉ dùng để kiểm tra mô hình, ví dụ: một [benchmark](07-danh-gia-va-chat-luong.md#benchmark).

**Liên quan.** [dữ liệu huấn luyện](#training-data) · [nhãn dữ liệu](#label) · [tập kiểm định](02-du-lieu-va-huan-luyen.md#validation-set) · [nguồn gốc dữ liệu](02-du-lieu-va-huan-luyen.md#data-provenance)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Goodfellow, Bengio, Courville, "Deep Learning", 2016, https://www.deeplearningbook.org/, truy cập 2/10/2026 (S104).

<a id="training-data"></a>
### Training data — Dữ liệu huấn luyện

*Mã: training-data · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Dữ liệu huấn luyện là tập dữ liệu mà quá trình [huấn luyện](#training) dùng để điều chỉnh tham số của một [mô hình](#model). Mô hình học các mẫu và quy luật từ dữ liệu này.

**Giải thích.** Dữ liệu huấn luyện ảnh hưởng trực tiếp tới năng lực và lỗi của mô hình. Mô hình xử lý tốt các trường hợp có nhiều trong dữ liệu. Mô hình xử lý kém các trường hợp ít gặp hoặc không có trong dữ liệu.

Loại dữ liệu huấn luyện phụ thuộc vào nhiệm vụ. Một mô hình lọc thư rác cần các thư có [nhãn dữ liệu](#label) "rác" hoặc "không rác". Một [LLM](04-llm-va-mo-hinh-sinh.md#llm) trong giai đoạn [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining) cần lượng văn bản lớn, phần lớn không có nhãn.

Sau huấn luyện, mô hình chỉ giữ các [tham số](#parameter) đã học. Phần lớn [hệ thống AI](#ai-system) không truy cập dữ liệu huấn luyện khi đã [triển khai](11-trien-khai-san-pham-kinh-te.md#deployment). Nguồn gốc và quyền dùng dữ liệu huấn luyện là một vấn đề pháp lý lớn ([bản quyền và dữ liệu huấn luyện](10-phap-ly-quan-tri-chinh-sach.md#copyright-training-data)).

**Ví dụ.** Ví dụ giả định: Công ty Tài chính An Bình huấn luyện một mô hình chấm điểm tín dụng. Dữ liệu huấn luyện là 50.000 hồ sơ vay từ năm 2020 đến năm 2024. Mỗi hồ sơ có thu nhập, nghề nghiệp, lịch sử trả nợ và nhãn "trả đúng hạn" hoặc "quá hạn". Năm 2025, công ty mở thêm sản phẩm cho sinh viên. Dữ liệu huấn luyện gần như không có hồ sơ sinh viên, nên mô hình có thể chấm điểm nhóm này kém chính xác.

**Phân biệt.** [Tập dữ liệu](#dataset) là khái niệm chung. Dữ liệu huấn luyện là phần dùng để huấn luyện. Dữ liệu dùng để kiểm tra mô hình phải tách riêng khỏi dữ liệu huấn luyện. Khi dữ liệu kiểm tra lọt vào dữ liệu huấn luyện, kết quả kiểm tra cao hơn thực tế ([nhiễm dữ liệu kiểm tra](02-du-lieu-va-huan-luyen.md#data-contamination)).

**Không nên hiểu là.** Nội dung người dùng nhập vào một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) không tự động trở thành dữ liệu huấn luyện. Nội dung đó chỉ thành dữ liệu huấn luyện khi công ty vận hành dịch vụ dùng nội dung đó để huấn luyện lại mô hình. Chính sách của công ty quyết định việc này ([lưu giữ dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-retention)).

**Giới hạn.** Dữ liệu huấn luyện lệch tạo ra mô hình lệch ([thiên lệch thuật toán](08-an-toan-va-alignment.md#bias-thien-lech)). Dữ liệu cũ tạo ra mô hình không phản ánh các thay đổi sau thời điểm thu thập ([ngày giới hạn kiến thức](04-llm-va-mo-hinh-sinh.md#knowledge-cutoff)).

> **CẢNH BÁO:** Kiểm tra quyền dùng dữ liệu trước khi huấn luyện. Dữ liệu cá nhân hoặc dữ liệu có bản quyền có thể gây rủi ro pháp lý.

**Liên quan.** [tập dữ liệu](#dataset) · [huấn luyện](#training) · [nhãn dữ liệu](#label) · [nhiễm dữ liệu kiểm tra](02-du-lieu-va-huan-luyen.md#data-contamination) · [bản quyền và dữ liệu huấn luyện](10-phap-ly-quan-tri-chinh-sach.md#copyright-training-data) · [dữ liệu tổng hợp](02-du-lieu-va-huan-luyen.md#synthetic-data)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] OECD, "Explanatory memorandum on the updated OECD definition of an AI system", 2024, https://doi.org/10.1787/623da898-en, truy cập 2/10/2026 (S102). [3] Goodfellow, Bengio, Courville, "Deep Learning", 2016, https://www.deeplearningbook.org/, truy cập 2/10/2026 (S104).

<a id="label"></a>
### Label — Nhãn dữ liệu

*Mã: label · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** nhãn. Dạng chuẩn trong sách: nhãn dữ liệu.

**Định nghĩa.** Nhãn dữ liệu là phần đáp án của một mẫu dữ liệu trong [học có giám sát](#supervised-learning). [Mô hình](#model) học cách dự đoán nhãn từ các thông tin đầu vào của mẫu.

**Giải thích.** Trong một tập thư điện tử, nhãn của mỗi thư là "rác" hoặc "không rác". Trong một tập hồ sơ nhà đất, nhãn có thể là giá bán, tức là một con số. Người gán nhãn có thể làm bằng tay. Phần mềm cũng có thể gán nhãn tự động ([gán nhãn dữ liệu](02-du-lieu-va-huan-luyen.md#data-labeling)). Nhãn sai làm mô hình học sai.

**Phân biệt.** [Đặc trưng](#feature) là thông tin đầu vào của mẫu. Nhãn là đầu ra đúng của mẫu đó. Nhãn dữ liệu cũng khác [nhãn nội dung do AI tạo](09-bao-mat-rieng-tu-xac-thuc.md#ai-content-label). Nhãn nội dung báo cho người xem rằng AI tạo ra nội dung đó.

**Liên quan.** [học có giám sát](#supervised-learning) · [đặc trưng](#feature) · [gán nhãn dữ liệu](02-du-lieu-va-huan-luyen.md#data-labeling) · [ground truth](07-danh-gia-va-chat-luong.md#ground-truth)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="feature"></a>
### Feature — Đặc trưng

*Mã: feature · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Đặc trưng là một biến đầu vào của một [mô hình](#model) [học máy](#machine-learning). Ví dụ: diện tích và số phòng là 2 đặc trưng khi mô hình dự đoán giá nhà.

**Phân biệt.** Đặc trưng ở đây khác [đặc trưng nội bộ](08-an-toan-va-alignment.md#feature-noi-bo), là một mẫu hoạt động bên trong [mạng nơ-ron](#neural-network).

**Liên quan.** [nhãn dữ liệu](#label) · [tập dữ liệu](#dataset) · [vector](#vector)

<a id="training"></a>
### Training — Huấn luyện

*Mã: training · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** đào tạo mô hình, train. Dạng chuẩn trong sách: huấn luyện.

**Định nghĩa.** Huấn luyện là quá trình điều chỉnh các con số bên trong một [mô hình](#model) dựa trên một [tập dữ liệu](#dataset). Mục tiêu là đầu ra của mô hình gần với đáp án đúng hoặc đạt mục tiêu đã đặt.

**Giải thích.** Huấn luyện lặp lại một chu trình 4 bước:

- Mô hình nhận một [batch](#batch) dữ liệu và tính đầu ra.
- [Hàm mất mát](#loss-function) đo khoảng cách giữa đầu ra và đáp án.
- [Lan truyền ngược](#backpropagation) tính hướng thay đổi cho từng [tham số](#parameter).
- [Bộ tối ưu](#optimizer) cập nhật tham số theo hướng giảm sai số.

Chu trình này lặp lại nhiều lần. Mỗi lần mô hình xử lý hết [dữ liệu huấn luyện](#training-data) là một [epoch](#epoch). Kỹ sư dừng huấn luyện khi sai số không giảm thêm hoặc khi hết ngân sách tính toán.

Với mô hình lớn, huấn luyện chia thành nhiều giai đoạn: [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining), [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training) và [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning). Huấn luyện một mô hình lớn cần nhiều [năng lực tính toán](#compute), điện và tiền.

**Ví dụ.** Ví dụ giả định: Một mô hình đọc chữ số trên phiếu thu bắt đầu với tham số ngẫu nhiên. Ở bước đầu, mô hình đọc đúng khoảng 10% ảnh, ngang với đoán bừa giữa 10 chữ số. Sau 5 epoch trên 60.000 ảnh có nhãn, mô hình đọc đúng 98% ảnh của tập kiểm tra. Các con số này chỉ minh họa xu hướng, không phải kết quả đo thật.

**Phân biệt.** Huấn luyện thay đổi tham số. [Chạy mô hình](#inference) dùng tham số đã có để tạo đầu ra và không thay đổi tham số. Tinh chỉnh là huấn luyện thêm một mô hình đã có trên dữ liệu hẹp hơn. Viết [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) hoặc đưa tài liệu vào prompt không phải huấn luyện.

**Không nên hiểu là.** Huấn luyện không giống học thuộc. Mục tiêu của huấn luyện là mô hình xử lý tốt dữ liệu mới, không chỉ dữ liệu đã thấy ([tổng quát hóa](#generalization)). Trò chuyện với một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot) trong một phiên cũng không huấn luyện mô hình.

**Giới hạn.** Huấn luyện chỉ tối ưu theo mục tiêu mà hàm mất mát đo được. Mục tiêu đo được có thể khác mục tiêu thật của người dùng. Ví dụ: một mô hình đúng với phần lớn khách hàng vẫn có thể sai nhiều với một nhóm khách hàng nhỏ.

**Liên quan.** [chạy mô hình](#inference) · [dữ liệu huấn luyện](#training-data) · [hàm mất mát](#loss-function) · [lan truyền ngược](#backpropagation) · [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining) · [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] OECD, "Explanatory memorandum on the updated OECD definition of an AI system", 2024, https://doi.org/10.1787/623da898-en, truy cập 2/10/2026 (S102).

<a id="loss-function"></a>
### Loss function — Hàm mất mát

*Mã: loss-function · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** hàm tổn thất, loss. Dạng chuẩn trong sách: hàm mất mát.

**Định nghĩa.** Hàm mất mát là một công thức tính mức sai của đầu ra so với đáp án đúng trong quá trình [huấn luyện](#training). Giá trị càng nhỏ, đầu ra của [mô hình](#model) càng gần đáp án.

**Giải thích.** Huấn luyện tìm các [tham số](#parameter) làm giá trị của hàm mất mát nhỏ nhất. [Gradient descent](#gradient-descent) dùng hàm mất mát để chọn hướng thay đổi tham số. Mỗi loại bài toán dùng một loại hàm mất mát riêng. Bài toán dự đoán giá nhà có thể dùng sai số bình phương trung bình. Bài toán [phân loại](#classification) có thể dùng log loss.

**Phân biệt.** Hàm mất mát phục vụ quá trình huấn luyện. Các chỉ số [đánh giá](07-danh-gia-va-chat-luong.md#evaluation) như [tỷ lệ dự đoán đúng](07-danh-gia-va-chat-luong.md#accuracy) đo kết quả cho người đọc báo cáo. Hai loại con số này không luôn thay đổi cùng chiều.

**Liên quan.** [huấn luyện](#training) · [gradient descent](#gradient-descent) · [tỷ lệ dự đoán đúng](07-danh-gia-va-chat-luong.md#accuracy)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="gradient-descent"></a>
### Gradient descent — Hạ gradient

*Mã: gradient-descent · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** hạ gradient. Dạng chuẩn trong sách: gradient descent.

**Định nghĩa.** Gradient descent là một phương pháp toán học giảm giá trị của [hàm mất mát](#loss-function). Phương pháp này điều chỉnh từng [tham số](#parameter) từng bước nhỏ, theo hướng làm hàm mất mát giảm nhanh nhất.

**Phân biệt.** [Lan truyền ngược](#backpropagation) tính hướng thay đổi trong [mạng nơ-ron](#neural-network), còn gradient descent dùng hướng đó để cập nhật tham số.

**Liên quan.** [lan truyền ngược](#backpropagation) · [bộ tối ưu](#optimizer) · [tốc độ học](#learning-rate)

<a id="backpropagation"></a>
### Backpropagation — Lan truyền ngược

*Mã: backpropagation · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** backprop. Dạng chuẩn trong sách: lan truyền ngược.

**Định nghĩa.** Lan truyền ngược là một phương pháp tính mức ảnh hưởng của từng [trọng số](#weight) trong [mạng nơ-ron](#neural-network) lên sai số của đầu ra. Phép tính đi từ đầu ra ngược về đầu vào.

**Phân biệt.** Lan truyền ngược chỉ tính hướng điều chỉnh, còn [gradient descent](#gradient-descent) dùng kết quả đó để cập nhật trọng số.

**Liên quan.** [gradient descent](#gradient-descent) · [mạng nơ-ron](#neural-network) · [huấn luyện](#training)

<a id="optimizer"></a>
### Optimizer — Bộ tối ưu

*Mã: optimizer · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Bộ tối ưu là một phiên bản cụ thể của [gradient descent](#gradient-descent). Bộ tối ưu quyết định mỗi [tham số](#parameter) thay đổi bao nhiêu ở mỗi bước. Ví dụ: Adam, AdaGrad.

**Liên quan.** [gradient descent](#gradient-descent) · [tốc độ học](#learning-rate) · [huấn luyện](#training)

<a id="learning-rate"></a>
### Learning rate — Tốc độ học

*Mã: learning-rate · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tốc độ học là một [siêu tham số](#hyperparameter) quyết định độ lớn của mỗi bước [gradient descent](#gradient-descent). Tốc độ học quá nhỏ làm quá trình học chậm. Tốc độ học quá lớn có thể làm quá trình học không tìm được giá trị tốt.

**Phân biệt.** Tốc độ học không phải thời gian [huấn luyện](#training) tính theo giờ, và không phải một [tham số](#parameter).

**Liên quan.** [siêu tham số](#hyperparameter) · [gradient descent](#gradient-descent) · [bộ tối ưu](#optimizer)

<a id="batch"></a>
### Batch — Lô dữ liệu huấn luyện

*Mã: batch · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** lô dữ liệu huấn luyện. Dạng chuẩn trong sách: batch.

**Định nghĩa.** Batch là một nhóm mẫu dữ liệu mà [mô hình](#model) xử lý trong một bước [huấn luyện](#training). Ví dụ: tập 1.000 mẫu chia thành 20 batch, mỗi batch 50 mẫu.

**Phân biệt.** Batch ở đây khác [xử lý theo lô](11-trien-khai-san-pham-kinh-te.md#batch-processing), là cách gửi nhiều yêu cầu cùng lúc khi [chạy mô hình](#inference).

**Liên quan.** [epoch](#epoch) · [huấn luyện](#training) · [siêu tham số](#hyperparameter)

<a id="epoch"></a>
### Epoch — Lượt duyệt dữ liệu

*Mã: epoch · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** lượt duyệt dữ liệu. Dạng chuẩn trong sách: epoch.

**Định nghĩa.** Epoch là một lượt [huấn luyện](#training) trong đó mỗi mẫu của [dữ liệu huấn luyện](#training-data) được xử lý đúng một lần. Ví dụ: với 1.000 mẫu và mỗi batch 50 mẫu, một epoch gồm 20 bước.

**Phân biệt.** Một epoch gồm nhiều [batch](#batch).

**Liên quan.** [batch](#batch) · [huấn luyện](#training) · [quá khớp](#overfitting)

<a id="inference"></a>
### Inference — Chạy mô hình

*Mã: inference · Chương 1 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** suy luận (inference), suy diễn. Dạng chuẩn trong sách: chạy mô hình.

**Định nghĩa.** Chạy mô hình là một bước dùng một [mô hình](#model) đã [huấn luyện](#training) để tạo đầu ra cho một đầu vào mới. Ví dụ: tạo câu trả lời cho một câu hỏi, hoặc đọc chữ trong một ảnh.

**Giải thích.** Vòng đời của một mô hình có 2 giai đoạn. Giai đoạn xây dựng là huấn luyện. Giai đoạn dùng là chạy mô hình. Trong lúc chạy, [tham số](#parameter) của mô hình giữ nguyên. Với [LLM](04-llm-va-mo-hinh-sinh.md#llm), một câu trả lời cần nhiều bước tính, mỗi bước tạo một [token](03-kien-truc-mo-hinh.md#token) đầu ra.

Chạy mô hình tốn tiền và điện ở mỗi lần dùng. Huấn luyện tốn chi phí lớn, chủ yếu trả một lần khi tạo mô hình. Chạy mô hình tốn chi phí nhỏ mỗi lần, nhưng chi phí này lặp lại theo số yêu cầu ([chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost)).

Chạy mô hình có 2 cách. Theo cách thứ nhất, hệ thống tính đầu ra ngay khi người dùng gửi đầu vào. Theo cách thứ hai, hệ thống tính sẵn nhiều đầu ra, lưu lại và trả về khi cần.

**Ví dụ.** Chị Lan chụp ảnh một hóa đơn và gửi vào ứng dụng kế toán của Công ty An Bình. Máy chủ của ứng dụng chạy một mô hình [OCR](04-llm-va-mo-hinh-sinh.md#ocr) trên ảnh này. Mô hình trả về số hóa đơn, ngày và tổng tiền. Tham số của mô hình không thay đổi sau lần chạy này.

**Phân biệt.** Chạy mô hình (inference) khác suy luận (reasoning). Chạy mô hình là bước tính toán kỹ thuật của các mô hình. Suy luận là việc mô hình tạo các bước trung gian để giải một bài toán nhiều bước ([mô hình suy luận](04-llm-va-mo-hinh-sinh.md#reasoning-model)). Một mô hình suy luận vẫn cần chạy mô hình để tạo ra các bước đó. Chạy mô hình cũng khác huấn luyện: huấn luyện thay đổi tham số, chạy mô hình không thay đổi tham số.

**Không nên hiểu là.** Tên khác "suy luận" của inference không có nghĩa là mô hình lập luận như con người. Từ "inference" trong thống kê và trong logic cũng có nghĩa khác. Sách này dùng "chạy mô hình" để tránh nhầm.

**Giới hạn.** Chạy mô hình không cập nhật kiến thức trong tham số của mô hình. Thông tin mới trong một cuộc trò chuyện nằm trong [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) của lần chạy đó, không nằm trong tham số. Ứng dụng có thể lưu thông tin này vào [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) bên ngoài mô hình.

**Liên quan.** [huấn luyện](#training) · [mô hình suy luận](04-llm-va-mo-hinh-sinh.md#reasoning-model) · [chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost) · [độ trễ](11-trien-khai-san-pham-kinh-te.md#latency) · [token](03-kien-truc-mo-hinh.md#token) · [triển khai](11-trien-khai-san-pham-kinh-te.md#deployment)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] OECD, "Explanatory memorandum on the updated OECD definition of an AI system", 2024, https://doi.org/10.1787/623da898-en, truy cập 2/10/2026 (S102).

<a id="online-learning"></a>
### Online learning — Học trực tuyến

*Mã: online-learning · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** huấn luyện động (dynamic training), online training. Dạng chuẩn trong sách: học trực tuyến.

**Định nghĩa.** Học trực tuyến là một kiểu [huấn luyện](#training) cập nhật [mô hình](#model) liên tục hoặc thường xuyên theo dữ liệu mới. Cách ngược lại là huấn luyện một lần rồi dùng mô hình đó trong một thời gian dài.

**Phân biệt.** Chữ "trực tuyến" ở đây chỉ cách cập nhật mô hình, không chỉ việc mô hình truy cập Internet khi trả lời.

**Liên quan.** [học liên tục](02-du-lieu-va-huan-luyen.md#continual-learning) · [huấn luyện](#training) · [trôi mô hình](07-danh-gia-va-chat-luong.md#model-drift)

## 1.3 Phương pháp học máy hay gặp

<a id="supervised-learning"></a>
### Supervised learning — Học có giám sát

*Mã: supervised-learning · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học có giám sát là một phương pháp [học máy](#machine-learning) dùng các mẫu dữ liệu đã có đáp án đúng ([nhãn dữ liệu](#label)).

**Giải thích.** Mỗi mẫu [huấn luyện](#training) gồm đầu vào và nhãn. [Mô hình](#model) học quan hệ giữa đầu vào và nhãn. Sau đó, mô hình dự đoán nhãn cho đầu vào mới. Có 2 loại bài toán chính. [Phân loại](#classification) dự đoán một nhóm, ví dụ: thư rác. Hồi quy dự đoán một con số, ví dụ: giá nhà.

**Phân biệt.** [Học không giám sát](#unsupervised-learning) không dùng nhãn. [Học tự giám sát](#self-supervised-learning) tạo nhãn tự động từ chính dữ liệu, không cần người gán nhãn. [SFT](02-du-lieu-va-huan-luyen.md#sft) là học có giám sát áp dụng cho [LLM](04-llm-va-mo-hinh-sinh.md#llm) sau giai đoạn [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining).

**Liên quan.** [nhãn dữ liệu](#label) · [phân loại](#classification) · [học không giám sát](#unsupervised-learning) · [SFT](02-du-lieu-va-huan-luyen.md#sft)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Stanford HAI (Christopher Manning), "Artificial Intelligence Definitions", 2022, https://hai.stanford.edu/sites/default/files/2023-03/AI-Key-Terms-Glossary-Definition.pdf, truy cập 2/10/2026 (S101).

<a id="unsupervised-learning"></a>
### Unsupervised learning — Học không giám sát

*Mã: unsupervised-learning · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học không giám sát là một phương pháp [học máy](#machine-learning) tìm cấu trúc trong dữ liệu không có [nhãn dữ liệu](#label).

**Giải thích.** Ứng dụng hay gặp nhất là [phân cụm](#clustering): chia dữ liệu thành các nhóm giống nhau. Ví dụ: một chuỗi siêu thị chia khách hàng thành các nhóm theo thói quen mua sắm. Sau đó, nhân viên xem từng nhóm và đặt tên cho nhóm. Học không giám sát cũng dùng để [phát hiện bất thường](#anomaly-detection).

**Phân biệt.** [Học có giám sát](#supervised-learning) học từ đáp án có sẵn. Học không giám sát không có đáp án, nên con người phải diễn giải kết quả. [Học tự giám sát](#self-supervised-learning) dùng dữ liệu không nhãn nhưng tự tạo đáp án cho từng bước.

**Liên quan.** [phân cụm](#clustering) · [học có giám sát](#supervised-learning) · [phát hiện bất thường](#anomaly-detection)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Goodfellow, Bengio, Courville, "Deep Learning", 2016, https://www.deeplearningbook.org/, truy cập 2/10/2026 (S104).

<a id="self-supervised-learning"></a>
### Self-supervised learning — Học tự giám sát

*Mã: self-supervised-learning · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học tự giám sát là một phương pháp [học máy](#machine-learning) dùng dữ liệu không có nhãn do người gán. [Thuật toán](#algorithm) tự tạo đáp án từ chính dữ liệu. Ví dụ: che một phần văn bản và lấy phần đã che làm đáp án.

**Giải thích.** Học tự giám sát biến dữ liệu không nhãn thành bài toán có đáp án. Với văn bản, [mô hình](#model) dự đoán [token](03-kien-truc-mo-hinh.md#token) đã che hoặc token đứng tiếp theo ([dự đoán token tiếp theo](04-llm-va-mo-hinh-sinh.md#next-token-prediction)). Cách này cho phép [huấn luyện](#training) trên lượng văn bản lớn mà không cần người gán nhãn. [Huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining) của [LLM](04-llm-va-mo-hinh-sinh.md#llm) dùng học tự giám sát.

**Phân biệt.** Học tự giám sát khác [học không giám sát](#unsupervised-learning) vì có đáp án tự tạo cho từng bước. Học tự giám sát khác [học có giám sát](#supervised-learning) vì không cần [nhãn dữ liệu](#label) do người gán. Các tài liệu xếp học tự giám sát vào các nhóm khác nhau.

**Liên quan.** [huấn luyện trước](02-du-lieu-va-huan-luyen.md#pretraining) · [dự đoán token tiếp theo](04-llm-va-mo-hinh-sinh.md#next-token-prediction) · [học không giám sát](#unsupervised-learning)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Stanford HAI (Christopher Manning), "Artificial Intelligence Definitions", 2022, https://hai.stanford.edu/sites/default/files/2023-03/AI-Key-Terms-Glossary-Definition.pdf, truy cập 2/10/2026 (S101).

<a id="semi-supervised-learning"></a>
### Semi-supervised learning — Học bán giám sát

*Mã: semi-supervised-learning · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học bán giám sát là một phương pháp [học máy](#machine-learning) dùng dữ liệu có nhãn ở một phần mẫu. Phần mẫu còn lại không có nhãn. Phương pháp này hữu ích khi gán nhãn tốn kém nhưng dữ liệu không nhãn có nhiều.

**Phân biệt.** [Học tự giám sát](#self-supervised-learning) không cần mẫu nào có nhãn do người gán.

**Liên quan.** [học có giám sát](#supervised-learning) · [học không giám sát](#unsupervised-learning) · [nhãn dữ liệu](#label)

<a id="reinforcement-learning"></a>
### Reinforcement learning (RL) — Học tăng cường

*Mã: reinforcement-learning · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Học tăng cường là một phương pháp [học máy](#machine-learning) trong đó một chương trình học qua thử và sai trong một [môi trường](06-agent-va-tu-dong-hoa.md#environment). Chương trình chọn hành động, nhận phần thưởng và điều chỉnh cách chọn để tổng phần thưởng cao nhất.

**Giải thích.** Học tăng cường không có đáp án đúng cho từng bước. Chương trình chỉ nhận một con số phần thưởng, có khi chỉ ở cuối một chuỗi hành động. Quy tắc chọn hành động trong mỗi trạng thái có tên là [policy](#policy-rl). Ví dụ: một chương trình chơi cờ nhận +1 điểm khi thắng và −1 điểm khi thua. Qua nhiều ván, chương trình chọn các nước đi dẫn tới thắng nhiều hơn.

Học tăng cường là nền của [RLHF](02-du-lieu-va-huan-luyen.md#rlhf) và [RLVR](02-du-lieu-va-huan-luyen.md#rlvr), 2 phương pháp dùng trong [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training) [LLM](04-llm-va-mo-hinh-sinh.md#llm).

**Phân biệt.** [Học có giám sát](#supervised-learning) cho đáp án đúng của từng mẫu. Học tăng cường chỉ cho tín hiệu tốt hay xấu, và chương trình phải tự tìm hành động tốt. RLHF là một ứng dụng của học tăng cường, không phải tên khác của học tăng cường.

**Liên quan.** [policy](#policy-rl) · [RLHF](02-du-lieu-va-huan-luyen.md#rlhf) · [RLVR](02-du-lieu-va-huan-luyen.md#rlvr) · [lách phần thưởng](08-an-toan-va-alignment.md#reward-hacking)

**Nguồn.** [1] Sutton, Barto, "Reinforcement Learning: An Introduction", 2nd ed., 2018, http://incompleteideas.net/book/RLbook2020.pdf, truy cập 2/10/2026 (S107). [2] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="policy-rl"></a>
### Policy (chính sách trong học tăng cường) — Chính sách (học tăng cường)

*Mã: policy-rl · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** chính sách (trong học tăng cường). Dạng chuẩn trong sách: policy.

**Định nghĩa.** Policy là quy tắc chọn hành động ứng với mỗi trạng thái của [môi trường](06-agent-va-tu-dong-hoa.md#environment) trong [học tăng cường](#reinforcement-learning). Policy có thể chọn một hành động cố định hoặc chọn ngẫu nhiên theo tỷ lệ cho từng hành động.

**Phân biệt.** Policy ở đây là một quy tắc tính toán, khác chính sách trong [quản trị AI](10-phap-ly-quan-tri-chinh-sach.md#ai-governance) là quy định do con người ban hành.

**Liên quan.** [học tăng cường](#reinforcement-learning) · [RLHF](02-du-lieu-va-huan-luyen.md#rlhf) · [GRPO](02-du-lieu-va-huan-luyen.md#grpo)

<a id="classification"></a>
### Classification — Phân loại

*Mã: classification · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Phân loại là một bài toán [học máy](#machine-learning) trong đó [mô hình](#model) xếp mỗi đầu vào vào một nhóm. Danh sách nhóm có sẵn trước.

**Giải thích.** Phân loại nhị phân có 2 nhóm, ví dụ: thư rác hoặc không rác. Phân loại nhiều nhóm có từ 3 nhóm trở lên, ví dụ: ngôn ngữ của một câu. Nhiều mô hình phân loại trả về [xác suất](#probability) cho từng nhóm. Phần mềm chọn nhóm khi xác suất vượt một ngưỡng. Kỹ sư chọn ngưỡng theo chi phí của từng loại lỗi, ví dụ: bỏ sót gian lận tốn hơn báo nhầm.

**Phân biệt.** Hồi quy (regression) dự đoán một con số, ví dụ: giá nhà 3,2 tỷ đồng. Phân loại dự đoán một nhóm. [Hồi quy logistic](#logistic-regression) có chữ "hồi quy" trong tên nhưng là một phương pháp phân loại. [Phân cụm](#clustering) tự tạo nhóm từ dữ liệu không nhãn. Phân loại dùng danh sách nhóm có sẵn.

**Liên quan.** [học có giám sát](#supervised-learning) · [hồi quy logistic](#logistic-regression) · [precision](07-danh-gia-va-chat-luong.md#precision) · [ma trận nhầm lẫn](07-danh-gia-va-chat-luong.md#confusion-matrix)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="clustering"></a>
### Clustering — Phân cụm

*Mã: clustering · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Phân cụm là một phương pháp [học không giám sát](#unsupervised-learning) chia các mẫu dữ liệu thành các nhóm mẫu giống nhau. Phương pháp này không đặt tên cho nhóm. Con người xem từng nhóm và quyết định ý nghĩa của nhóm.

**Phân biệt.** [Phân loại](#classification) dùng danh sách nhóm có sẵn, khác phân cụm tự tạo nhóm từ dữ liệu.

**Liên quan.** [học không giám sát](#unsupervised-learning) · [phân loại](#classification) · [phát hiện bất thường](#anomaly-detection)

<a id="anomaly-detection"></a>
### Anomaly detection — Phát hiện bất thường

*Mã: anomaly-detection · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Phát hiện bất thường là một nhiệm vụ [học máy](#machine-learning) tìm các mẫu dữ liệu khác xa phần lớn dữ liệu còn lại. Ví dụ: một giao dịch 200 triệu đồng lúc 3 giờ sáng ở một tài khoản chỉ chi tiêu nhỏ.

**Phân biệt.** Một điểm bất thường là tín hiệu cần kiểm tra, không phải bằng chứng gian lận.

**Liên quan.** [học không giám sát](#unsupervised-learning) · [phân loại](#classification) · [phân cụm](#clustering)

<a id="logistic-regression"></a>
### Logistic regression — Hồi quy logistic

*Mã: logistic-regression · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Hồi quy logistic là một phương pháp [học máy](#machine-learning) tính [xác suất](#probability) để một đầu vào thuộc một trong 2 nhóm. Ví dụ: xác suất một khách hàng trả nợ quá hạn. Kết quả của phương pháp này dễ giải thích.

**Phân biệt.** Dù tên có chữ "hồi quy", hồi quy logistic là một phương pháp [phân loại](#classification).

**Liên quan.** [phân loại](#classification) · [xác suất](#probability) · [cây quyết định](#decision-tree)

<a id="decision-tree"></a>
### Decision tree — Cây quyết định

*Mã: decision-tree · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Cây quyết định là một [mô hình](#model) dự đoán bằng một chuỗi điều kiện có hoặc không, xếp theo dạng cây. Ví dụ: "Thu nhập trên 15 triệu đồng?", rồi "Có nợ quá hạn?", rồi tới kết luận ở cuối nhánh.

**Phân biệt.** [Rừng ngẫu nhiên](#random-forest) gộp kết quả của nhiều cây quyết định.

**Liên quan.** [rừng ngẫu nhiên](#random-forest) · [gradient boosting](#gradient-boosting) · [hồi quy logistic](#logistic-regression)

<a id="random-forest"></a>
### Random forest — Rừng ngẫu nhiên

*Mã: random-forest · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Rừng ngẫu nhiên là một [mô hình](#model) gồm nhiều [cây quyết định](#decision-tree). Mỗi cây học từ một phần dữ liệu chọn ngẫu nhiên. Kết quả cuối là kết quả chung của các cây, ví dụ: nhóm mà nhiều cây chọn nhất.

**Phân biệt.** Rừng ngẫu nhiên xây các cây độc lập với nhau, khác [gradient boosting](#gradient-boosting) xây các cây nối tiếp.

**Liên quan.** [cây quyết định](#decision-tree) · [gradient boosting](#gradient-boosting)

<a id="gradient-boosting"></a>
### Gradient boosting — Tăng cường gradient

*Mã: gradient-boosting · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tăng cường gradient. Dạng chuẩn trong sách: gradient boosting.

**Định nghĩa.** Gradient boosting là một phương pháp xây [mô hình](#model) bằng cách thêm lần lượt nhiều mô hình nhỏ, phần lớn là [cây quyết định](#decision-tree). Mỗi mô hình nhỏ mới sửa phần sai còn lại của tổng các mô hình trước.

**Phân biệt.** Gradient boosting khác [rừng ngẫu nhiên](#random-forest) vì các cây phụ thuộc nhau theo thứ tự.

**Liên quan.** [cây quyết định](#decision-tree) · [rừng ngẫu nhiên](#random-forest)

<a id="cnn"></a>
### Convolutional neural network (CNN) — Mạng nơ-ron tích chập

*Mã: cnn · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mạng nơ-ron tích chập, ConvNet. Dạng chuẩn trong sách: CNN.

**Định nghĩa.** CNN là một loại [mạng nơ-ron](#neural-network) có ít nhất một [lớp](#layer) tích chập. Lớp tích chập quét một bộ lọc nhỏ trên dữ liệu để tìm mẫu cục bộ, ví dụ: cạnh và góc trong ảnh. CNN phổ biến trong nhận dạng ảnh.

**Liên quan.** [mạng nơ-ron](#neural-network) · [học sâu](#deep-learning) · [thị giác máy tính](04-llm-va-mo-hinh-sinh.md#computer-vision)

<a id="rnn"></a>
### Recurrent neural network (RNN) — Mạng nơ-ron hồi quy

*Mã: rnn · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mạng nơ-ron hồi quy. Dạng chuẩn trong sách: RNN.

**Định nghĩa.** RNN là một loại [mạng nơ-ron](#neural-network) xử lý dữ liệu dạng chuỗi theo từng phần tử. Ở mỗi bước, mạng dùng cả đầu vào mới và trạng thái giữ lại từ bước trước.

**Phân biệt.** [Transformer](03-kien-truc-mo-hinh.md#transformer) xử lý các vị trí của chuỗi song song và là kiến trúc của phần lớn [LLM](04-llm-va-mo-hinh-sinh.md#llm), thay cho RNN.

**Liên quan.** [LSTM](#lstm) · [mạng nơ-ron](#neural-network) · [transformer](03-kien-truc-mo-hinh.md#transformer)

<a id="lstm"></a>
### Long short-term memory (LSTM) — Bộ nhớ ngắn hạn dài

*Mã: lstm · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ nhớ ngắn hạn dài. Dạng chuẩn trong sách: LSTM.

**Định nghĩa.** LSTM là một loại [RNN](#rnn) có thêm các cổng điều khiển việc giữ hoặc bỏ thông tin. Thiết kế này giúp mạng giữ thông tin qua chuỗi dài hơn so với RNN thông thường.

**Phân biệt.** Chữ "bộ nhớ" trong tên chỉ trạng thái bên trong mạng, không phải [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) của trợ lý AI.

**Liên quan.** [RNN](#rnn) · [mạng nơ-ron](#neural-network) · [transformer](03-kien-truc-mo-hinh.md#transformer)

## 1.4 Lỗi và chất lượng học

<a id="overfitting"></a>
### Overfitting — Quá khớp

*Mã: overfitting · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** overfitting, học quá khớp. Dạng chuẩn trong sách: quá khớp.

**Định nghĩa.** Quá khớp là một lỗi của quá trình [huấn luyện](#training). Khi quá khớp, [mô hình](#model) khớp quá sát với dữ liệu huấn luyện và dự đoán sai trên dữ liệu mới.

**Giải thích.** Mô hình quá khớp học cả chi tiết ngẫu nhiên và lỗi của [dữ liệu huấn luyện](#training-data), như thể đó là quy luật. Dấu hiệu là sai số thấp trên dữ liệu huấn luyện nhưng cao trên dữ liệu kiểm tra. Quá khớp hay xảy ra khi mô hình có nhiều [tham số](#parameter) so với lượng dữ liệu, hoặc khi huấn luyện quá lâu.

Các cách giảm quá khớp gồm thêm dữ liệu đa dạng, [chính quy hóa](#regularization) và [dừng sớm](#early-stopping).

**Ví dụ.** Ví dụ giả định: Công ty An Bình huấn luyện một mô hình dự đoán giá nhà trên 500 căn nhà. Trên 500 căn nhà này, sai số là 1%. Trên 100 căn nhà mới, sai số là 25%. Khoảng cách lớn giữa 2 con số là dấu hiệu quá khớp.

**Phân biệt.** Chưa khớp (underfitting) là lỗi ngược lại. Mô hình chưa khớp quá đơn giản và sai nhiều ngay trên dữ liệu huấn luyện. Quá khớp là tình trạng [tổng quát hóa](#generalization) kém. Quá khớp cũng khác [ghi nhớ dữ liệu huấn luyện](09-bao-mat-rieng-tu-xac-thuc.md#memorization), là việc mô hình tạo lại nguyên văn một phần dữ liệu.

**Liên quan.** [tổng quát hóa](#generalization) · [chính quy hóa](#regularization) · [dừng sớm](#early-stopping) · [tập kiểm định](02-du-lieu-va-huan-luyen.md#validation-set)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Goodfellow, Bengio, Courville, "Deep Learning", 2016, https://www.deeplearningbook.org/, truy cập 2/10/2026 (S104).

<a id="generalization"></a>
### Generalization — Tổng quát hóa

*Mã: generalization · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tổng quát hóa là năng lực của một [mô hình](#model) dự đoán đúng trên dữ liệu mới, không có trong [dữ liệu huấn luyện](#training-data).

**Giải thích.** Tổng quát hóa là mục tiêu chính của [học máy](#machine-learning). Một mô hình chỉ đúng trên dữ liệu đã thấy không dùng được trong thực tế. Kỹ sư đo tổng quát hóa trên dữ liệu giữ lại, không dùng khi [huấn luyện](#training) ([kiểm tra trên dữ liệu giữ lại](07-danh-gia-va-chat-luong.md#held-out-test)).

Mô hình tổng quát hóa tốt khi dữ liệu mới giống dữ liệu huấn luyện. Khi dữ liệu mới khác xa, kết quả có thể giảm nhiều ([OOD](07-danh-gia-va-chat-luong.md#ood)). Ví dụ: mô hình học từ khách hàng thành thị có thể dự đoán kém cho khách hàng nông thôn.

**Phân biệt.** [Quá khớp](#overfitting) là tình trạng tổng quát hóa kém. Tổng quát hóa trong học máy là một kết quả đo được trên dữ liệu kiểm tra.

**Liên quan.** [quá khớp](#overfitting) · [OOD](07-danh-gia-va-chat-luong.md#ood) · [kiểm tra trên dữ liệu giữ lại](07-danh-gia-va-chat-luong.md#held-out-test)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Goodfellow, Bengio, Courville, "Deep Learning", 2016, https://www.deeplearningbook.org/, truy cập 2/10/2026 (S104).

<a id="regularization"></a>
### Regularization — Chính quy hóa

*Mã: regularization · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Chính quy hóa là một nhóm kỹ thuật giảm [quá khớp](#overfitting) khi [huấn luyện](#training). Các kỹ thuật này ngăn kết quả huấn luyện khớp quá sát với từng chi tiết của dữ liệu. Ví dụ: phạt các giá trị lớn.

**Liên quan.** [quá khớp](#overfitting) · [dừng sớm](#early-stopping) · [dropout](03-kien-truc-mo-hinh.md#dropout)

<a id="early-stopping"></a>
### Early stopping — Dừng sớm

*Mã: early-stopping · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Dừng sớm là một kỹ thuật giảm [quá khớp](#overfitting). Kỹ sư dừng [huấn luyện](#training) khi sai số trên dữ liệu kiểm tra riêng bắt đầu tăng. Lúc đó, sai số trên dữ liệu dùng để huấn luyện có thể vẫn giảm.

**Liên quan.** [quá khớp](#overfitting) · [chính quy hóa](#regularization) · [tập kiểm định](02-du-lieu-va-huan-luyen.md#validation-set)

<a id="correlation"></a>
### Correlation — Tương quan

*Mã: correlation · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tương quan là một quan hệ thống kê trong đó 2 đại lượng thay đổi cùng nhau. Ví dụ: số giờ học và điểm thi cùng tăng. Một [mô hình](#model) [học máy](#machine-learning) học tương quan trong dữ liệu, không tự xác định nguyên nhân.

**Phân biệt.** Tương quan không đủ để chứng minh nhân quả (causation): thay đổi đại lượng này gây ra thay đổi ở đại lượng kia.

**Liên quan.** [học máy](#machine-learning) · [thiên lệch thuật toán](08-an-toan-va-alignment.md#bias-thien-lech) · [ý nghĩa thống kê](07-danh-gia-va-chat-luong.md#statistical-significance)

## 1.5 Phần cứng và tính toán

<a id="compute"></a>
### Compute — Năng lực tính toán

*Mã: compute · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** compute, tài nguyên tính toán. Dạng chuẩn trong sách: năng lực tính toán.

**Định nghĩa.** Năng lực tính toán là lượng tài nguyên máy tính dùng để [huấn luyện](#training) hoặc [chạy mô hình](#inference). Tài nguyên này gồm số phép tính, chip xử lý và thời gian chạy.

**Giải thích.** Tài liệu AI đo năng lực tính toán theo 2 cách. Cách thứ nhất đếm tổng số phép tính theo đơn vị [FLOP](#flop). Cách thứ hai đo phần cứng, ví dụ: số [GPU](#gpu) và số giờ chạy.

Theo một nghiên cứu công bố năm 2022, lượng tính toán để huấn luyện các [mô hình](#model) tiêu biểu tăng nhanh. Trước năm 2010, lượng này tăng gấp đôi khoảng mỗi 20 tháng. Từ đầu thập niên 2010, lượng này tăng gấp đôi khoảng mỗi 6 tháng. Một số văn bản pháp luật dùng ngưỡng FLOP để xếp loại mô hình ([ngưỡng tính toán](10-phap-ly-quan-tri-chinh-sach.md#compute-threshold)).

**Phân biệt.** Năng lực tính toán là lượng dùng. GPU và [chip tăng tốc AI](#accelerator-chip) là phần cứng tạo ra lượng đó. Thêm tính toán không mặc định cho mô hình tốt hơn ([quy luật mở rộng](02-du-lieu-va-huan-luyen.md#scaling-laws)).

**Liên quan.** [FLOP](#flop) · [GPU](#gpu) · [quy luật mở rộng](02-du-lieu-va-huan-luyen.md#scaling-laws) · [ngưỡng tính toán](10-phap-ly-quan-tri-chinh-sach.md#compute-threshold)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Sevilla et al., "Compute Trends Across Three Eras of Machine Learning", 2022, https://arxiv.org/abs/2202.05924, truy cập 2/10/2026 (S110). [3] Epoch AI (Sevilla et al.), "Estimating Training Compute of Deep Learning Models", 2022, https://epoch.ai/blog/estimating-training-compute, truy cập 2/10/2026 (S111).

<a id="gpu"></a>
### Graphics processing unit (GPU) — Bộ xử lý đồ họa

*Mã: gpu · Chương 1 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ xử lý đồ họa, card đồ họa. Dạng chuẩn trong sách: GPU.

**Định nghĩa.** GPU là một loại chip xử lý chạy hàng nghìn luồng tính cùng lúc. GPU ban đầu dùng để vẽ hình 3D. Sau đó, GPU trở thành phần cứng chính của [học sâu](#deep-learning).

**Giải thích.** CPU là bộ xử lý chính của máy tính. CPU chạy nhanh từng chuỗi lệnh nối tiếp. GPU dành nhiều mạch hơn cho xử lý dữ liệu và chạy nhiều phép tính song song. [Mạng nơ-ron](#neural-network) gồm chủ yếu các phép nhân ma trận. Các phép nhân này chia được thành nhiều phần độc lập, nên chạy nhanh trên GPU. [Huấn luyện](#training) một [mô hình](#model) lớn cần nhiều GPU nối với nhau trong một [trung tâm dữ liệu](11-trien-khai-san-pham-kinh-te.md#data-center).

**Phân biệt.** [TPU](#tpu) là chip chuyên cho tính toán AI, không có nguồn gốc đồ họa. GPU và TPU đều thuộc nhóm [chip tăng tốc AI](#accelerator-chip). Tên "card đồ họa" chỉ bảng mạch có gắn GPU, không chỉ con chip.

**Liên quan.** [chip tăng tốc AI](#accelerator-chip) · [TPU](#tpu) · [năng lực tính toán](#compute) · [học sâu](#deep-learning) · [kiểm soát xuất khẩu chip AI](10-phap-ly-quan-tri-chinh-sach.md#ai-chip-export-controls)

**Nguồn.** [1] NVIDIA, "CUDA Programming Guide: Introduction", 2026, https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/introduction.html, truy cập 2/10/2026 (S108). [2] Google for Developers, "Machine Learning Glossary", 2026, https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012).

<a id="tpu"></a>
### Tensor processing unit (TPU) — Bộ xử lý tensor

*Mã: tpu · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ xử lý tensor. Dạng chuẩn trong sách: TPU.

**Định nghĩa.** TPU là một loại [chip tăng tốc AI](#accelerator-chip) do Google thiết kế riêng cho tính toán của [mạng nơ-ron](#neural-network). Từ năm 2015, Google dùng TPU trong hạ tầng máy chủ của công ty.

**Phân biệt.** TPU khác [GPU](#gpu) vì TPU chỉ phục vụ tính toán AI, không phục vụ đồ họa.

**Liên quan.** [GPU](#gpu) · [chip tăng tốc AI](#accelerator-chip) · [tensor](#tensor)

<a id="accelerator-chip"></a>
### Accelerator chip — Chip tăng tốc AI

*Mã: accelerator-chip · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** chip AI, bộ tăng tốc. Dạng chuẩn trong sách: chip tăng tốc AI.

**Định nghĩa.** Chip tăng tốc AI là một loại chip chuyên dụng làm nhanh các phép tính chính của [học sâu](#deep-learning). Với loại phép tính này, chip tăng tốc chạy nhanh hơn và tốn ít điện hơn CPU thông thường.

**Phân biệt.** [GPU](#gpu) và [TPU](#tpu) là 2 loại chip tăng tốc AI cho máy chủ, khác NPU trong điện thoại ([AI tại biên](11-trien-khai-san-pham-kinh-te.md#edge-ai)).

**Liên quan.** [GPU](#gpu) · [TPU](#tpu) · [năng lực tính toán](#compute)

<a id="flop"></a>
### Floating-point operation (FLOP) — Phép tính dấu phẩy động

*Mã: flop · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** phép tính dấu phẩy động. Dạng chuẩn trong sách: FLOP.

**Định nghĩa.** FLOP là một phép tính số học, ví dụ phép cộng hoặc phép nhân, trên số thực dạng dấu phẩy động. Tài liệu AI dùng tổng số FLOP để đo lượng tính toán của một lần [huấn luyện](#training), ví dụ: 10^25 FLOP.

**Phân biệt.** FLOP là đơn vị đếm số phép tính, khác FLOP/s là đơn vị đo tốc độ của chip theo số phép tính mỗi giây.

**Liên quan.** [năng lực tính toán](#compute) · [ngưỡng tính toán](10-phap-ly-quan-tri-chinh-sach.md#compute-threshold) · [GPU](#gpu)

## 1.6 Lịch sử và khái niệm cũ

<a id="symbolic-ai"></a>
### Symbolic AI — AI biểu tượng

*Mã: symbolic-ai · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** AI dựa trên tri thức, GOFAI. Dạng chuẩn trong sách: AI biểu tượng.

**Định nghĩa.** AI biểu tượng là một hướng tiếp cận AI dùng ký hiệu, logic và quy tắc do con người viết rõ. Máy tính áp dụng các quy tắc đó để rút ra kết luận.

**Phân biệt.** AI biểu tượng dựa vào quy tắc do người viết, khác [học máy](#machine-learning) dựa vào mẫu học từ dữ liệu.

**Liên quan.** [hệ chuyên gia](#expert-system) · [học máy](#machine-learning) · [mùa đông AI](#ai-winter)

<a id="expert-system"></a>
### Expert system — Hệ chuyên gia

*Mã: expert-system · Chương 1 · Mức 3 · Trạng thái: lịch sử · Xác minh: 10/2026*

**Định nghĩa.** Hệ chuyên gia là một chương trình [AI biểu tượng](#symbolic-ai) giải bài toán trong một lĩnh vực hẹp, ví dụ chẩn đoán bệnh. Chương trình áp dụng một tập quy tắc dạng "nếu A thì B" do chuyên gia cung cấp.

**Phân biệt.** Hệ chuyên gia khác các hệ thống [học máy](#machine-learning) vì người viết đặt sẵn từng quy tắc, không học quy tắc từ dữ liệu.

**Liên quan.** [AI biểu tượng](#symbolic-ai) · [mùa đông AI](#ai-winter) · [học máy](#machine-learning)

<a id="turing-test"></a>
### Turing test — Phép thử Turing

*Mã: turing-test · Chương 1 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Phép thử Turing là một phép thử do Alan Turing đề xuất năm 1950. Người hỏi trò chuyện bằng chữ với một người và một máy, rồi đoán bên nào là máy. Máy qua phép thử khi người hỏi không phân biệt được.

**Phân biệt.** Qua phép thử Turing chỉ cho thấy máy tạo văn bản giống người, không chứng minh máy có ý thức hay đạt [AGI](12-xa-hoi-va-tuong-lai.md#agi).

**Liên quan.** [AI](#ai) · [AGI](12-xa-hoi-va-tuong-lai.md#agi) · [căn phòng tiếng Trung](12-xa-hoi-va-tuong-lai.md#chinese-room)

<a id="ai-winter"></a>
### AI winter — Mùa đông AI

*Mã: ai-winter · Chương 1 · Mức 3 · Trạng thái: lịch sử · Xác minh: 10/2026*

**Định nghĩa.** Mùa đông AI là tên của các giai đoạn khi tiền tài trợ cho nghiên cứu AI giảm nhiều. Một giai đoạn như vậy bắt đầu từ giữa thập niên 1980, khi các hệ thống dựa trên quy tắc không đạt kỳ vọng.

**Phân biệt.** Mùa đông AI là sự kiện lịch sử, khác [bong bóng AI](12-xa-hoi-va-tuong-lai.md#ai-bubble) là một tranh luận về giá trị thị trường.

**Liên quan.** [AI biểu tượng](#symbolic-ai) · [hệ chuyên gia](#expert-system) · [bong bóng AI](12-xa-hoi-va-tuong-lai.md#ai-bubble)
