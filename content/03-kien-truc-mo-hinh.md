---
chapter: 3
title: "Kiến trúc mô hình"
file: 03-kien-truc-mo-hinh.md
terms: 43
bible_version: "0.2"
version: "0.1"
updated: 2026-10-02
status: review
---

# Chương 3 — Kiến trúc mô hình

Chương này mô tả các bộ phận bên trong một mô hình AI. Người đọc gặp các tên này trong tin tức kỹ thuật và trong tài liệu của nhà phát triển.

Chương bắt đầu với token và cách mô hình đổi văn bản thành số. Tiếp theo là transformer, kiến trúc của phần lớn LLM. Sau đó là các kiến trúc khác và các cách làm mô hình nhỏ hơn, rẻ hơn. Cụm cuối phân biệt mô hình mở trọng số với AI mã nguồn mở.

Chương không dùng công thức. Mỗi mục nêu bộ phận đó làm gì và không bảo đảm điều gì.

## 3.1 Token và biểu diễn

<a id="token"></a>
### Token — Token

*Mã: token · Chương 3 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Token là một đơn vị văn bản mà một [mô hình](01-nen-tang.md#model) AI xử lý. Một token có thể là một từ, một phần của từ, một ký tự hoặc một dấu câu.

**Giải thích.** Trước khi xử lý, [bộ tách token](#tokenizer) chia văn bản đầu vào thành các token. Mỗi token có một mã số trong [bộ từ vựng token](#vocabulary). Mô hình chỉ tính toán trên các mã số này, không tính toán trên chữ. Phần lớn [LLM](04-llm-va-mo-hinh-sinh.md#llm) tạo câu trả lời từng token một. Ứng dụng ghép các token thành chữ để hiển thị cho người dùng.

Token cũng là đơn vị đo trong vận hành. Nhiều dịch vụ AI tính tiền theo số [token đầu vào](04-llm-va-mo-hinh-sinh.md#input-token) và token đầu ra. Giới hạn đầu vào của một lần chạy là [cửa sổ ngữ cảnh](#context-window), cũng đo bằng token.

Cùng một nội dung có số token khác nhau theo ngôn ngữ và theo bộ tách token. Một nghiên cứu năm 2023 đo một văn bản đã dịch sang nhiều ngôn ngữ. Số token của cùng nội dung chênh nhau tới 15 lần giữa một số ngôn ngữ.

**Ví dụ.** Ví dụ giả định: chị Lan đếm token của câu "Hợp đồng có hiệu lực từ ngày ký." bằng 2 bộ tách token. Bộ thứ nhất trả về 10 token. Bộ thứ hai trả về 15 token. Câu này có 8 tiếng, nhưng số token khác 8 và khác nhau giữa 2 bộ.

**Phân biệt.** Token khác từ. Một từ dài hoặc ít gặp có thể gồm nhiều token. Một token có thể gồm một khoảng trắng và vài chữ cái. Token cũng khác [embedding](#embedding): token là đơn vị văn bản, embedding là dãy số đại diện cho token đó.

**Không nên hiểu là.** Không nên hiểu số token là số từ hoặc số tiếng. Không có tỷ lệ token trên từ cố định cho tiếng Việt. Tỷ lệ này thay đổi theo bộ tách token và theo từng phiên bản. Một con số ước lượng cho tiếng Anh không áp dụng cho tiếng Việt.

> **THẬN TRỌNG:** Đếm token bằng bộ tách token của chính mô hình đang dùng. Một tỷ lệ ước lượng chung có thể làm sai dự toán chi phí và độ dài đầu vào.

**Liên quan.** [bộ tách token](#tokenizer) · [bộ từ vựng token](#vocabulary) · [embedding](#embedding) · [cửa sổ ngữ cảnh](#context-window) · [giá theo token](11-trien-khai-san-pham-kinh-te.md#token-pricing)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] OpenAI, "What are tokens and how to count them", https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them, truy cập 2/10/2026 (S302). [3] Petrov et al., "Language Model Tokenizers Introduce Unfairness Between Languages", 2023, https://arxiv.org/abs/2305.15425, truy cập 2/10/2026 (S301).

<a id="tokenizer"></a>
### Tokenizer — Bộ tách token

*Mã: tokenizer · Chương 3 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tokenizer. Dạng chuẩn trong sách: bộ tách token.

**Định nghĩa.** Bộ tách token là một chương trình chia văn bản thành các [token](#token) và đổi mỗi token thành một mã số. Bộ tách token cũng làm bước ngược lại: đổi dãy mã số thành văn bản.

**Giải thích.** Nhà phát triển tạo bộ tách token trước khi [huấn luyện](01-nen-tang.md#training) mô hình. Nhà phát triển chạy một [thuật toán](01-nen-tang.md#algorithm) trên một lượng văn bản lớn để chọn các đoạn chữ hay gặp. Các đoạn này tạo thành [bộ từ vựng token](#vocabulary). [BPE](#bpe) là một thuật toán cho bước này.

Bộ tách token cắt đoạn chữ hay gặp thành ít token và cắt đoạn chữ ít gặp thành nhiều token nhỏ. Nhờ cách cắt này, [mô hình](01-nen-tang.md#model) xử lý được từ mới, tên riêng và lỗi chính tả. Mô hình không cần một danh sách đủ các từ.

Mỗi họ mô hình có thể có bộ tách token riêng. Cùng một văn bản có thể cho số token và dãy mã số khác nhau ở 2 mô hình.

**Ví dụ.** Ví dụ giả định: Công ty An Bình gửi tên sản phẩm mới "Bình An Phát" vào một mô hình. Bộ tách token tìm thấy "Bình" và "An" trong bộ từ vựng token, nên mỗi phần thành 1 token. "Phát" không có trong bộ từ vựng, nên bộ tách token cắt phần này thành 2 token nhỏ hơn. Mô hình nhận một dãy 4 mã số, không nhận chữ.

**Phân biệt.** Bộ tách token khác [embedding](#embedding). Bộ tách token đổi văn bản thành mã số theo một bảng cố định. Embedding đổi mỗi mã số thành một [vector](01-nen-tang.md#vector) mà mô hình học được khi huấn luyện.

**Không nên hiểu là.** Không nên hiểu bộ tách token là một bộ phân tích ngữ pháp. Bộ tách token không tìm ranh giới từ theo nghĩa. Bộ tách token chia văn bản theo tần suất của các đoạn chữ trong dữ liệu mẫu. Với tiếng Việt, từ "hợp đồng" có thể thành 1, 2 hoặc nhiều token, tùy bộ tách token.

**Giới hạn.** Một bộ tách token tạo từ dữ liệu có ít tiếng Việt có thể cắt văn bản tiếng Việt thành nhiều token hơn. Nhiều token hơn làm tăng chi phí và làm giảm lượng nội dung vừa trong một [cửa sổ ngữ cảnh](#context-window).

**Liên quan.** [token](#token) · [bộ từ vựng token](#vocabulary) · [BPE](#bpe) · [embedding](#embedding) · [bộ đếm token](11-trien-khai-san-pham-kinh-te.md#token-counter)

**Nguồn.** [1] Sennrich, Haddow, Birch, "Neural Machine Translation of Rare Words with Subword Units", 2016, https://arxiv.org/abs/1508.07909, truy cập 2/10/2026 (S303). [2] Kudo, Richardson, "SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing", 2018, https://arxiv.org/abs/1808.06226, truy cập 2/10/2026 (S304). [3] OpenAI, "What are tokens and how to count them", https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them, truy cập 2/10/2026 (S302). [4] Petrov et al., "Language Model Tokenizers Introduce Unfairness Between Languages", 2023, https://arxiv.org/abs/2305.15425, truy cập 2/10/2026 (S301).

<a id="vocabulary"></a>
### Vocabulary — Bộ từ vựng token

*Mã: vocabulary · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** vocabulary, từ vựng của mô hình. Dạng chuẩn trong sách: bộ từ vựng token.

**Định nghĩa.** Bộ từ vựng token là một danh sách cố định các [token](#token) mà một [bộ tách token](#tokenizer) dùng. Mỗi token trong danh sách có một mã số riêng.

**Phân biệt.** Bộ từ vựng token khác từ điển tiếng Việt, vì bộ này chứa cả mảnh từ, ký tự và dấu câu.

**Liên quan.** [bộ tách token](#tokenizer) · [BPE](#bpe) · [logit](#logit)

<a id="bpe"></a>
### Byte-pair encoding (BPE) — Mã hóa cặp byte

*Mã: bpe · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mã hóa cặp byte. Dạng chuẩn trong sách: BPE.

**Định nghĩa.** BPE là một [thuật toán](01-nen-tang.md#algorithm) tạo [bộ từ vựng token](#vocabulary) bằng cách ghép dần các cặp ký hiệu hay đứng cạnh nhau nhất. Kết quả là đơn vị lớn cho đoạn chữ hay gặp và mảnh nhỏ cho từ ít gặp.

**Phân biệt.** BPE gốc là một thuật toán nén dữ liệu, nhưng trong [LLM](04-llm-va-mo-hinh-sinh.md#llm) BPE dùng để tách văn bản, không dùng để nén file.

**Liên quan.** [bộ tách token](#tokenizer) · [bộ từ vựng token](#vocabulary)

<a id="embedding"></a>
### Embedding — Biểu diễn nhúng

*Mã: embedding · Chương 3 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** biểu diễn nhúng, vector nhúng. Dạng chuẩn trong sách: embedding.

**Định nghĩa.** Embedding là một dãy số mà một [mô hình](01-nen-tang.md#model) dùng để biểu diễn một [token](#token), một câu, một ảnh hoặc một mẩu dữ liệu khác. Các nội dung có cách dùng giống nhau thường có embedding gần nhau.

**Giải thích.** Mô hình không tính toán trực tiếp trên chữ. Ở bước đầu, mô hình đổi mỗi mã số token thành một [vector](01-nen-tang.md#vector). Vector này là một dãy gồm hàng trăm hoặc hàng nghìn số. Mô hình học các số này trong lúc [huấn luyện](01-nen-tang.md#training).

Có 2 cách dùng embedding chính. Cách thứ nhất: embedding là bước đầu vào bên trong một [LLM](04-llm-va-mo-hinh-sinh.md#llm). Cách thứ hai: một [mô hình embedding](04-llm-va-mo-hinh-sinh.md#embedding-model) riêng tạo embedding cho cả đoạn văn. Ứng dụng dùng các embedding này cho [tìm kiếm ngữ nghĩa](05-prompt-ngu-canh-tri-thuc.md#semantic-search) và [RAG](05-prompt-ngu-canh-tri-thuc.md#rag).

**Ví dụ.** Một hệ thống tra cứu văn bản pháp luật đổi câu hỏi "thủ tục ly hôn" thành một embedding. Hệ thống so embedding này với embedding của các điều luật. Điều luật về giải quyết việc ly hôn có embedding gần nhất, dù 2 câu không trùng nhau từng chữ.

**Phân biệt.** Embedding khác token: token là đơn vị văn bản, embedding là dãy số đại diện. Embedding cũng khác [tham số](01-nen-tang.md#parameter). Trong một LLM, bảng embedding của các token là một phần tham số. Embedding của một câu là đầu ra của một lần [chạy mô hình](01-nen-tang.md#inference).

**Không nên hiểu là.** Không nên hiểu 2 embedding gần nhau là 2 nội dung cùng nghĩa hoặc cùng đúng. Embedding gần nhau chỉ cho thấy 2 nội dung có cách dùng giống nhau trong [dữ liệu huấn luyện](01-nen-tang.md#training-data). Hai câu trái nghĩa nhưng gần như cùng chữ có thể có embedding gần nhau.

**Giới hạn.** Embedding của 2 mô hình khác nhau không so sánh trực tiếp với nhau. Khi đổi mô hình embedding, ứng dụng phải tạo lại embedding cho toàn bộ tài liệu.

**Liên quan.** [token](#token) · [mô hình embedding](04-llm-va-mo-hinh-sinh.md#embedding-model) · [không gian ẩn](#latent-space) · [tìm kiếm ngữ nghĩa](05-prompt-ngu-canh-tri-thuc.md#semantic-search) · [số chiều embedding](11-trien-khai-san-pham-kinh-te.md#embedding-dimension)

**Nguồn.** [1] Google for Developers, "Machine Learning Glossary", https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [2] Mikolov et al., "Efficient Estimation of Word Representations in Vector Space", 2013, https://arxiv.org/abs/1301.3781, truy cập 2/10/2026 (S305).

<a id="latent-space"></a>
### Latent space — Không gian ẩn

*Mã: latent-space · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** latent space, không gian tiềm ẩn. Dạng chuẩn trong sách: không gian ẩn.

**Định nghĩa.** Không gian ẩn là một không gian nhiều chiều trong đó một [mô hình](01-nen-tang.md#model) biểu diễn dữ liệu bằng các dãy số rút gọn. Mỗi điểm ứng với biểu diễn bên trong của một ảnh, một câu hoặc một đoạn âm thanh.

**Giải thích.** Một [autoencoder](#autoencoder) nén ảnh thành một điểm trong không gian ẩn, rồi dựng lại ảnh từ điểm đó. Một nhóm [mô hình khuếch tán](#diffusion-model) tạo ảnh trong không gian ẩn của một autoencoder. Nhóm này không tạo ảnh trực tiếp trên từng điểm ảnh. Cách này giảm lượng tính toán cho ảnh độ phân giải cao.

**Phân biệt.** Không gian ẩn và [embedding](#embedding) giao nhau về nghĩa. Embedding thường chỉ dãy số đại diện cho một [token](#token) hoặc một đoạn văn. Không gian ẩn thường chỉ cả không gian biểu diễn bên trong của một mô hình sinh ảnh, âm thanh hoặc video. [Trạng thái ẩn](#hidden-state) là giá trị tại một [lớp](01-nen-tang.md#layer) trong một lần chạy, không phải cả không gian.

**Liên quan.** [autoencoder](#autoencoder) · [mô hình khuếch tán](#diffusion-model) · [embedding](#embedding)

**Nguồn.** [1] Rombach et al., "High-Resolution Image Synthesis with Latent Diffusion Models", 2022, https://arxiv.org/abs/2112.10752, truy cập 2/10/2026 (S327).

<a id="positional-encoding"></a>
### Positional encoding — Mã hóa vị trí

*Mã: positional-encoding · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** positional encoding, positional embedding. Dạng chuẩn trong sách: mã hóa vị trí.

**Định nghĩa.** Mã hóa vị trí là một kỹ thuật đưa thông tin về thứ tự của các [token](#token) vào một [transformer](#transformer). Mã hóa vị trí gắn thông tin vị trí vào biểu diễn của từng token.

**Giải thích.** Phép [attention](#attention) cơ bản xử lý các token cùng lúc và không chứa thông tin thứ tự. Thiếu thông tin vị trí, câu "A kiện B" và câu "B kiện A" có cùng một tập token. Bài báo gốc về transformer năm 2017 cộng vào mỗi vị trí một dãy số tạo từ các hàm sin và cos. Các [mô hình](01-nen-tang.md#model) sau dùng thêm cách khác, ví dụ: [RoPE](#rope).

**Phân biệt.** Mã hóa vị trí khác [embedding](#embedding) của token. Embedding mang thông tin về việc token là gì. Mã hóa vị trí mang thông tin về việc token đứng ở đâu.

**Liên quan.** [RoPE](#rope) · [transformer](#transformer) · [kiến trúc ngữ cảnh dài](#long-context-architecture)

**Nguồn.** [1] Vaswani et al., "Attention Is All You Need", 2017, https://arxiv.org/abs/1706.03762, truy cập 2/10/2026 (S004).

<a id="rope"></a>
### Rotary positional embedding (RoPE) — Mã hóa vị trí xoay

*Mã: rope · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mã hóa vị trí xoay. Dạng chuẩn trong sách: RoPE.

**Định nghĩa.** RoPE là một kỹ thuật [mã hóa vị trí](#positional-encoding) xoay biểu diễn của mỗi [token](#token) một góc theo vị trí của token đó. Kết quả so sánh giữa 2 token phụ thuộc vào khoảng cách giữa 2 token.

**Phân biệt.** RoPE khác cách cộng dãy số vị trí cố định của bài báo [transformer](#transformer) gốc.

**Liên quan.** [mã hóa vị trí](#positional-encoding) · [kiến trúc ngữ cảnh dài](#long-context-architecture)

<a id="logit"></a>
### Logit — Logit

*Mã: logit · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Logit là một điểm số thô mà một [mô hình](01-nen-tang.md#model) tính cho mỗi lựa chọn đầu ra. Ví dụ: mô hình tính một logit cho mỗi [token](#token) có thể đứng tiếp theo.

**Phân biệt.** Logit khác [xác suất](01-nen-tang.md#probability), vì hàm [softmax](01-nen-tang.md#softmax) phải đổi các logit thành xác suất có tổng bằng 1.

**Liên quan.** [softmax](01-nen-tang.md#softmax) · [bộ từ vựng token](#vocabulary) · [logprobs](04-llm-va-mo-hinh-sinh.md#logprobs)

<a id="hidden-state"></a>
### Hidden state — Trạng thái ẩn

*Mã: hidden-state · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Trạng thái ẩn là một dãy số mà một [mạng nơ-ron](01-nen-tang.md#neural-network) tính ra ở một [lớp](01-nen-tang.md#layer) bên trong cho một đầu vào. Mỗi vị trí của đầu vào có một trạng thái ẩn ở mỗi lớp.

**Phân biệt.** Trạng thái ẩn chỉ tồn tại trong một lần [chạy mô hình](01-nen-tang.md#inference), khác [tham số](01-nen-tang.md#parameter) được lưu cố định sau khi [huấn luyện](01-nen-tang.md#training).

**Liên quan.** [residual stream](#residual-stream) · [KV cache](#kv-cache)

## 3.2 Transformer

<a id="transformer"></a>
### Transformer — Transformer

*Mã: transformer · Chương 3 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** kiến trúc transformer. Dạng chuẩn trong sách: transformer.

**Định nghĩa.** Transformer là một kiến trúc [mạng nơ-ron](01-nen-tang.md#neural-network) xử lý một chuỗi [token](#token) chủ yếu bằng cơ chế attention. Kiến trúc này xử lý các token của chuỗi song song, không xử lý lần lượt từng token.

**Giải thích.** Transformer là tên riêng của kiến trúc. Năm 2017, 8 tác giả công bố kiến trúc này trong bài báo "Attention Is All You Need". Tên bài báo nhắc tới [attention](#attention), cơ chế chính của kiến trúc. Bài báo dùng transformer cho dịch máy.

Một transformer gồm nhiều [lớp](01-nen-tang.md#layer) giống nhau xếp chồng. Mỗi lớp có 2 phần chính. Phần thứ nhất là [self-attention](#self-attention): mỗi token lấy thông tin từ các token khác trong chuỗi. Phần thứ hai là một [lớp truyền thẳng](#feed-forward-layer) xử lý riêng từng vị trí. Vì không xử lý lần lượt, transformer cần [mã hóa vị trí](#positional-encoding) để có thông tin về thứ tự token.

Có 3 dạng transformer: chỉ có [encoder](#encoder), chỉ có decoder, và có cả hai. Tính đến tháng 10/2026, phần lớn [LLM](04-llm-va-mo-hinh-sinh.md#llm) là [mô hình chỉ có decoder](#decoder-only-model) hoặc biến thể của dạng này.

**Ví dụ.** Một ứng dụng dịch câu "Tôi ký hợp đồng" sang tiếng Anh. Transformer đổi các token của câu thành [embedding](#embedding) và gắn thông tin vị trí. Qua mỗi lớp, biểu diễn của token "ký" nhận thêm thông tin từ các token của "hợp đồng". Lớp cuối cho ra [logit](#logit) để chọn từng token của câu tiếng Anh.

**Phân biệt.** Transformer là một kiến trúc, không phải một [mô hình](01-nen-tang.md#model) cụ thể. Nhiều LLM cùng dùng kiến trúc transformer nhưng khác [tham số](01-nen-tang.md#parameter), dữ liệu và cách [huấn luyện](01-nen-tang.md#training). Transformer cũng khác [SSM](#ssm), một kiến trúc nén phần chuỗi đã xử lý vào một trạng thái cố định.

**Không nên hiểu là.** Không nên hiểu transformer là tên một sản phẩm hoặc một công ty. Xử lý song song cũng không có nghĩa là LLM tạo cả câu trả lời cùng lúc. Mô hình chỉ có decoder vẫn tạo đầu ra từng token một. Cũng không nên hiểu các mô hình [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai) đều là transformer. Một số mô hình dùng [kiến trúc lai](#hybrid-architecture), [mô hình khuếch tán](#diffusion-model) hoặc kiến trúc khác.

**Giới hạn.** Chi phí tính self-attention tăng theo bình phương độ dài chuỗi. Chuỗi dài gấp 2 lần cần khoảng 4 lần phép tính cho phần này. Giới hạn này là lý do của các nghiên cứu về [sparse attention](#sparse-attention) và [kiến trúc ngữ cảnh dài](#long-context-architecture).

**Liên quan.** [attention](#attention) · [self-attention](#self-attention) · [mô hình chỉ có decoder](#decoder-only-model) · [encoder](#encoder) · [LLM](04-llm-va-mo-hinh-sinh.md#llm) · [SSM](#ssm)

**Nguồn.** [1] Vaswani et al., "Attention Is All You Need", 2017, https://arxiv.org/abs/1706.03762, truy cập 2/10/2026 (S004). [2] Google for Developers, "Machine Learning Glossary", https://developers.google.com/machine-learning/glossary, truy cập 2/10/2026 (S012). [3] Hugging Face, "LLM Course, Chương 1.6: Transformer Architectures", https://huggingface.co/learn/llm-course/chapter1/6, truy cập 2/10/2026 (S310).

<a id="attention"></a>
### Attention — Cơ chế chú ý

*Mã: attention · Chương 3 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** cơ chế chú ý, cơ chế attention. Dạng chuẩn trong sách: attention.

**Định nghĩa.** Attention là một cơ chế trong [mạng nơ-ron](01-nen-tang.md#neural-network) tính mức liên quan giữa các vị trí của đầu vào. Mạng dùng các mức liên quan này làm hệ số để trộn thông tin từ các vị trí đó.

**Giải thích.** Trong một [LLM](04-llm-va-mo-hinh-sinh.md#llm), [mô hình](01-nen-tang.md#model) tính cho mỗi [token](#token) 3 dãy số: truy vấn (query), khóa (key) và giá trị (value). Mô hình so truy vấn của token đang xét với khóa của các token khác. Kết quả so sánh cho ra các hệ số attention có tổng bằng 1. Token đang xét nhận tổng các giá trị, mỗi giá trị nhân với hệ số của giá trị đó.

Phạm vi của attention phụ thuộc kiến trúc. Trong [mô hình chỉ có decoder](#decoder-only-model), mỗi token chỉ lấy thông tin từ các token đứng trước. Trong [sparse attention](#sparse-attention), mỗi token chỉ lấy thông tin từ một phần chuỗi. Một [transformer](#transformer) chạy nhiều phép attention song song trong mỗi [lớp](01-nen-tang.md#layer), theo cách [multi-head attention](#multi-head-attention).

**Ví dụ.** Câu đầu vào là "Công ty An Bình thuê chị Lan vì công ty cần tư vấn". Khi xử lý các token của "công ty" thứ hai, attention có thể cho hệ số cao với các token của "An Bình". Mô hình trộn thông tin của "An Bình" vào biểu diễn của "công ty" thứ hai.

**Phân biệt.** Attention là cơ chế chung. [Self-attention](#self-attention) là attention trong cùng một chuỗi. [Cross-attention](#cross-attention) là attention giữa 2 chuỗi khác nhau.

**Không nên hiểu là.** Không nên hiểu attention là sự chú ý của con người. Hệ số attention cũng không phải lời giải thích nhân quả cho đầu ra. Các nhà nghiên cứu chưa thống nhất về giá trị giải thích của attention. Một bên cho rằng hệ số attention thường không khớp với các phép đo mức quan trọng khác. Bên kia cho rằng kết luận phụ thuộc vào cách định nghĩa "giải thích".

> **THẬN TRỌNG:** Không dùng biểu đồ hệ số attention làm bằng chứng duy nhất về lý do của một đầu ra. Dùng thêm phương pháp của [khả năng giải thích mô hình](08-an-toan-va-alignment.md#interpretability).

**Liên quan.** [self-attention](#self-attention) · [multi-head attention](#multi-head-attention) · [transformer](#transformer) · [KV cache](#kv-cache) · [khả năng giải thích mô hình](08-an-toan-va-alignment.md#interpretability)

**Nguồn.** [1] Vaswani et al., "Attention Is All You Need", 2017, https://arxiv.org/abs/1706.03762, truy cập 2/10/2026 (S004). [2] Jain, Wallace, "Attention is not Explanation", 2019, https://arxiv.org/abs/1902.10186, truy cập 2/10/2026 (S306). [3] Wiegreffe, Pinter, "Attention is not not Explanation", 2019, https://arxiv.org/abs/1908.04626, truy cập 2/10/2026 (S307).

<a id="self-attention"></a>
### Self-attention — Tự chú ý

*Mã: self-attention · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tự chú ý. Dạng chuẩn trong sách: self-attention.

**Định nghĩa.** Self-attention là một dạng [attention](#attention) trong đó mỗi vị trí của một chuỗi lấy thông tin từ các vị trí khác của cùng chuỗi đó. Self-attention là phần chính của mỗi lớp trong một [transformer](#transformer).

**Giải thích.** Trong mỗi [lớp](01-nen-tang.md#layer), self-attention cập nhật biểu diễn của từng [token](#token) theo nội dung của cả chuỗi. Có 2 dạng hay gặp. Dạng hai chiều cho mỗi token lấy thông tin từ token đứng trước và token đứng sau, ví dụ trong [encoder](#encoder). Dạng có che (masked) chỉ cho lấy thông tin từ token đứng trước, ví dụ trong [mô hình chỉ có decoder](#decoder-only-model). Chi phí của self-attention tăng theo bình phương độ dài chuỗi.

**Phân biệt.** Self-attention khác [cross-attention](#cross-attention). Self-attention làm việc trong một chuỗi. Cross-attention lấy truy vấn từ một chuỗi và lấy thông tin từ một chuỗi khác.

**Liên quan.** [attention](#attention) · [multi-head attention](#multi-head-attention) · [cross-attention](#cross-attention)

**Nguồn.** [1] Vaswani et al., "Attention Is All You Need", 2017, https://arxiv.org/abs/1706.03762, truy cập 2/10/2026 (S004).

<a id="multi-head-attention"></a>
### Multi-head attention — Attention nhiều đầu

*Mã: multi-head-attention · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** attention nhiều đầu. Dạng chuẩn trong sách: multi-head attention.

**Định nghĩa.** Multi-head attention là một kỹ thuật chạy song song nhiều [attention head](#attention-head) trong cùng một [lớp](01-nen-tang.md#layer). Kết quả của các head được ghép lại thành một đầu ra.

**Phân biệt.** Multi-head attention khác [MoE](#moe), vì các [attention](#attention) head luôn cùng chạy và không có bộ chọn head.

**Liên quan.** [attention head](#attention-head) · [self-attention](#self-attention)

<a id="attention-head"></a>
### Attention head — Đầu attention

*Mã: attention-head · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** đầu attention. Dạng chuẩn trong sách: attention head.

**Định nghĩa.** Attention head là một phép [attention](#attention) độc lập trong một [lớp](01-nen-tang.md#layer) có nhiều phép attention chạy song song. Mỗi head tính hệ số theo cách riêng, nên các head có thể bắt các kiểu quan hệ khác nhau giữa các vị trí.

**Phân biệt.** Attention head là một phần của [multi-head attention](#multi-head-attention), không phải một mạng riêng hay một [agent](06-agent-va-tu-dong-hoa.md#ai-agent).

**Liên quan.** [multi-head attention](#multi-head-attention) · [mechanistic interpretability](08-an-toan-va-alignment.md#mechanistic-interpretability)

<a id="cross-attention"></a>
### Cross-attention — Chú ý chéo

*Mã: cross-attention · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** chú ý chéo. Dạng chuẩn trong sách: cross-attention.

**Định nghĩa.** Cross-attention là một dạng [attention](#attention) trong đó một chuỗi lấy thông tin từ một chuỗi khác. Ví dụ: trong dịch máy, phần tạo câu đích lấy thông tin từ biểu diễn của câu nguồn.

**Phân biệt.** Cross-attention khác [self-attention](#self-attention), vì self-attention chỉ làm việc trong một chuỗi.

**Liên quan.** [self-attention](#self-attention) · [encoder](#encoder) · [mô hình khuếch tán](#diffusion-model)

<a id="feed-forward-layer"></a>
### Feed-forward layer — Lớp truyền thẳng

*Mã: feed-forward-layer · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** feed-forward layer, mạng truyền thẳng. Dạng chuẩn trong sách: lớp truyền thẳng.

**Định nghĩa.** Lớp truyền thẳng là một [lớp](01-nen-tang.md#layer) trong mỗi khối của [transformer](#transformer) xử lý riêng biểu diễn của từng vị trí trong chuỗi. Thông tin chỉ đi một chiều, từ đầu vào đến đầu ra của lớp.

**Phân biệt.** Lớp truyền thẳng khác [self-attention](#self-attention), vì lớp truyền thẳng không trộn thông tin giữa các vị trí.

**Liên quan.** [transformer](#transformer) · [MoE](#moe)

<a id="residual-stream"></a>
### Residual stream — Dòng phần dư

*Mã: residual-stream · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** dòng phần dư. Dạng chuẩn trong sách: residual stream.

**Định nghĩa.** Residual stream là dãy số đi qua các [lớp](01-nen-tang.md#layer) của một [transformer](#transformer) tại mỗi vị trí. Mỗi lớp đọc từ dãy số này và cộng kết quả của lớp vào lại dãy số đó.

**Phân biệt.** Residual stream là đường đi chung nối các lớp, còn [trạng thái ẩn](#hidden-state) là giá trị tại một lớp cụ thể.

**Liên quan.** [trạng thái ẩn](#hidden-state) · [mechanistic interpretability](08-an-toan-va-alignment.md#mechanistic-interpretability)

<a id="dropout"></a>
### Dropout — Dropout

*Mã: dropout · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Dropout là một kỹ thuật [chính quy hóa](01-nen-tang.md#regularization) tắt ngẫu nhiên một phần nơ-ron trong mỗi bước [huấn luyện](01-nen-tang.md#training). Kỹ thuật này giảm mức phụ thuộc của mạng vào một vài nơ-ron riêng lẻ.

**Phân biệt.** Dropout chỉ áp dụng khi huấn luyện và không xóa phần nào của mạng, khác [cắt tỉa mô hình](#pruning).

**Liên quan.** [chính quy hóa](01-nen-tang.md#regularization) · [quá khớp](01-nen-tang.md#overfitting) · [cắt tỉa mô hình](#pruning)

<a id="encoder"></a>
### Encoder — Bộ mã hóa

*Mã: encoder · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ mã hóa. Dạng chuẩn trong sách: encoder.

**Định nghĩa.** Encoder là một phần của [mạng nơ-ron](01-nen-tang.md#neural-network) đổi đầu vào thành một biểu diễn bên trong dạng dãy số. Trong một [transformer](#transformer), encoder đọc cả chuỗi đầu vào và cho mỗi vị trí lấy thông tin từ cả 2 phía.

**Giải thích.** Encoder dùng [self-attention](#self-attention) hai chiều. Biểu diễn do encoder tạo ra phù hợp cho các việc cần đọc cả câu. Ví dụ: [phân loại](01-nen-tang.md#classification) văn bản, tìm tên riêng, tìm câu trả lời trong một đoạn có sẵn. Một [mô hình](01-nen-tang.md#model) chỉ có encoder không tạo văn bản dài từng token. Trong mô hình dịch máy kiểu gốc, encoder đọc câu nguồn và decoder tạo câu đích.

**Phân biệt.** Encoder khác decoder. Decoder là phần tạo đầu ra từng [token](#token). Trong decoder, mỗi token chỉ lấy thông tin từ các token đứng trước. Một mô hình có thể chỉ có encoder, chỉ có decoder, hoặc có cả hai. Xem thêm [mô hình chỉ có decoder](#decoder-only-model).

**Không nên hiểu là.** Không nên hiểu encoder là bộ mã hóa để bảo mật dữ liệu. Encoder không giữ bí mật cho dữ liệu.

**Liên quan.** [mô hình chỉ có decoder](#decoder-only-model) · [self-attention](#self-attention) · [cross-attention](#cross-attention) · [mô hình embedding](04-llm-va-mo-hinh-sinh.md#embedding-model)

**Nguồn.** [1] Vaswani et al., "Attention Is All You Need", 2017, https://arxiv.org/abs/1706.03762, truy cập 2/10/2026 (S004). [2] Hugging Face, "LLM Course, Chương 1.6: Transformer Architectures", https://huggingface.co/learn/llm-course/chapter1/6, truy cập 2/10/2026 (S310). [3] Devlin et al., "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", 2018, https://arxiv.org/abs/1810.04805, truy cập 2/10/2026 (S318).

<a id="decoder-only-model"></a>
### Decoder-only model — Mô hình chỉ có decoder

*Mã: decoder-only-model · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** decoder-only model, mô hình decoder. Dạng chuẩn trong sách: mô hình chỉ có decoder.

**Định nghĩa.** Mô hình chỉ có decoder là một [transformer](#transformer) chỉ gồm các khối decoder. Mỗi [token](#token) chỉ lấy thông tin từ các token đứng trước, và mô hình tạo đầu ra từng token một.

**Giải thích.** Mô hình chỉ có decoder dùng [self-attention](#self-attention) có che. Khi [huấn luyện](01-nen-tang.md#training), mô hình học [dự đoán token tiếp theo](04-llm-va-mo-hinh-sinh.md#next-token-prediction) trên lượng văn bản lớn. Khi [chạy mô hình](01-nen-tang.md#inference), [mô hình](01-nen-tang.md#model) thêm token vừa tạo vào chuỗi rồi tính token kế tiếp. Tên của cách tạo này là [tự hồi quy](04-llm-va-mo-hinh-sinh.md#autoregressive). Tính đến tháng 10/2026, phần lớn [LLM](04-llm-va-mo-hinh-sinh.md#llm) dùng kiến trúc chỉ có decoder hoặc biến thể của kiến trúc này.

**Phân biệt.** Mô hình chỉ có decoder khác mô hình chỉ có [encoder](#encoder). Mô hình chỉ có encoder đọc cả 2 phía của chuỗi và không tạo văn bản từng token. Mô hình chỉ có decoder cũng khác [mô hình ngôn ngữ khuếch tán](#diffusion-language-model). Loại mô hình này sửa nhiều token song song qua nhiều bước.

**Liên quan.** [encoder](#encoder) · [tự hồi quy](04-llm-va-mo-hinh-sinh.md#autoregressive) · [KV cache](#kv-cache) · [LLM](04-llm-va-mo-hinh-sinh.md#llm)

**Nguồn.** [1] Hugging Face, "LLM Course, Chương 1.6: Transformer Architectures", https://huggingface.co/learn/llm-course/chapter1/6, truy cập 2/10/2026 (S310). [2] Vaswani et al., "Attention Is All You Need", 2017, https://arxiv.org/abs/1706.03762, truy cập 2/10/2026 (S004).

<a id="context-window"></a>
### Context window — Cửa sổ ngữ cảnh

*Mã: context-window · Chương 3 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** context window, độ dài ngữ cảnh, context length. Dạng chuẩn trong sách: cửa sổ ngữ cảnh.

**Định nghĩa.** Cửa sổ ngữ cảnh là số [token](#token) tối đa mà một [mô hình](01-nen-tang.md#model) xử lý được trong một lần chạy. Con số này thường gồm cả đầu vào và đầu ra mà mô hình tạo ra.

**Giải thích.** Đầu vào của một lần chạy có nhiều phần. Ví dụ: [system prompt](05-prompt-ngu-canh-tri-thuc.md#system-prompt), các lượt hội thoại trước, tài liệu đính kèm, mô tả công cụ, câu hỏi mới. Các phần này phải nằm trong cửa sổ ngữ cảnh. Khi nội dung dài hơn cửa sổ, ứng dụng phải [cắt bớt ngữ cảnh](05-prompt-ngu-canh-tri-thuc.md#truncation), tóm tắt hoặc báo lỗi.

Cửa sổ ngữ cảnh là phần làm việc tạm thời của một lần chạy. Nội dung trong cửa sổ không làm thay đổi [tham số](01-nen-tang.md#parameter) của mô hình. Sau lần chạy, mô hình không giữ nội dung này. Một ứng dụng có tính năng [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) có thể lưu nội dung và gửi lại ở lần sau.

Tính đến tháng 10/2026, một số mô hình thương mại và một số [mô hình mở trọng số](#open-weights) có cửa sổ ngữ cảnh 1 triệu token. Kích thước cửa sổ khác nhau giữa các mô hình, kể cả các mô hình của cùng một nhà phát triển.

**Ví dụ.** Ví dụ giả định: một mô hình có cửa sổ ngữ cảnh 200.000 token. Anh Minh gửi bộ hồ sơ dài 150.000 token và yêu cầu bản tóm tắt dài 10.000 token. Tổng 160.000 token nằm trong cửa sổ. Thêm 50.000 token tài liệu thì tổng là 210.000 token và vượt cửa sổ.

**Phân biệt.** Cửa sổ ngữ cảnh đo sức chứa, không đo khả năng dùng tốt nội dung. Một mô hình nhận được 1 triệu token chưa chắc tìm đúng một chi tiết nằm giữa tài liệu. Tên của hiện tượng bỏ sót thông tin ở giữa là [lost in the middle](05-prompt-ngu-canh-tri-thuc.md#lost-in-the-middle). Tên của hiện tượng chất lượng giảm khi đầu vào dài ra là [context rot](05-prompt-ngu-canh-tri-thuc.md#context-rot).

**Không nên hiểu là.** Không nên hiểu cửa sổ ngữ cảnh là bộ nhớ dài hạn của mô hình. Cửa sổ lớn hơn cũng không có nghĩa là câu trả lời đúng hơn. Không nên quy đổi cửa sổ ngữ cảnh ra số trang theo một tỷ lệ cố định. Số token của một trang phụ thuộc vào ngôn ngữ và [bộ tách token](#tokenizer).

> **THẬN TRỌNG:** Kiểm tra câu trả lời khi gửi tài liệu dài. Mô hình có thể bỏ sót chi tiết dù tài liệu nằm trong cửa sổ ngữ cảnh.

**Liên quan.** [token](#token) · [lost in the middle](05-prompt-ngu-canh-tri-thuc.md#lost-in-the-middle) · [context rot](05-prompt-ngu-canh-tri-thuc.md#context-rot) · [ngữ cảnh dài](05-prompt-ngu-canh-tri-thuc.md#long-context) · [KV cache](#kv-cache) · [kiến trúc ngữ cảnh dài](#long-context-architecture)

**Nguồn.** [1] Anthropic, "Context windows", tài liệu cho nhà phát triển, https://platform.claude.com/docs/en/build-with-claude/context-windows, truy cập 2/10/2026 (S308). [2] Liu et al., "Lost in the Middle: How Language Models Use Long Contexts", 2023, https://arxiv.org/abs/2307.03172, truy cập 2/10/2026 (S309). [3] OpenAI, "What are tokens and how to count them", https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them, truy cập 2/10/2026 (S302). [4] NVIDIA, "Nemotron 3 Super: Open, Efficient Mixture-of-Experts Hybrid Mamba-Transformer Model for Agentic Reasoning", 2026, https://arxiv.org/abs/2604.12374, truy cập 2/10/2026 (S324).

<a id="kv-cache"></a>
### KV cache — Bộ nhớ đệm KV

*Mã: kv-cache · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ nhớ đệm KV, key-value cache. Dạng chuẩn trong sách: KV cache.

**Định nghĩa.** KV cache là một vùng lưu tạm các khóa và giá trị của [attention](#attention) cho các [token](#token) đã xử lý trong một lần chạy. Mô hình dùng lại các giá trị này để không phải tính lại khi tạo token tiếp theo.

**Giải thích.** Một [mô hình chỉ có decoder](#decoder-only-model) tạo đầu ra từng token. Không có KV cache, ở mỗi bước [mô hình](01-nen-tang.md#model) phải tính lại khóa và giá trị cho cả chuỗi trước đó. Có KV cache, mỗi bước chỉ tính phần của token mới. Đổi lại, KV cache chiếm dung lượng nhớ của [GPU](01-nen-tang.md#gpu). Dung lượng này tăng theo độ dài chuỗi và theo số yêu cầu chạy cùng lúc. Dung lượng KV cache là một lý do làm đầu vào dài tăng [chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost).

**Phân biệt.** KV cache khác [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) của trợ lý AI. KV cache là dữ liệu kỹ thuật tạm thời của một lần chạy. KV cache không lưu thông tin về người dùng qua các phiên. KV cache cũng khác [prompt caching](05-prompt-ngu-canh-tri-thuc.md#prompt-caching). Prompt caching là một tính năng của dịch vụ. Tính năng này lưu kết quả xử lý phần đầu của [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) để dùng lại giữa các yêu cầu.

**Liên quan.** [attention](#attention) · [prompt caching](05-prompt-ngu-canh-tri-thuc.md#prompt-caching) · [cửa sổ ngữ cảnh](#context-window) · [chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost)

**Nguồn.** [1] Hugging Face, "Transformers documentation v5.17.0: Caching", https://huggingface.co/docs/transformers/en/cache_explanation, truy cập 2/10/2026 (S311). [2] Pope et al., "Efficiently Scaling Transformer Inference", 2022, https://arxiv.org/abs/2211.05102, truy cập 2/10/2026 (S312).

<a id="sparse-attention"></a>
### Sparse attention — Attention thưa

*Mã: sparse-attention · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** attention thưa. Dạng chuẩn trong sách: sparse attention.

**Định nghĩa.** Sparse attention là một dạng [attention](#attention) trong đó mỗi vị trí chỉ lấy thông tin từ một phần các vị trí khác. Phần này được chọn theo một mẫu cố định hoặc theo nội dung. Cách này giảm lượng tính toán khi chuỗi dài.

**Phân biệt.** "Thưa" ở đây nói về các cặp vị trí được so sánh, khác "thưa" trong [MoE](#moe) nói về các [tham số](01-nen-tang.md#parameter) được bật.

**Liên quan.** [sliding window attention](#sliding-window-attention) · [kiến trúc ngữ cảnh dài](#long-context-architecture)

<a id="sliding-window-attention"></a>
### Sliding window attention — Attention cửa sổ trượt

*Mã: sliding-window-attention · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** attention cửa sổ trượt. Dạng chuẩn trong sách: sliding window attention.

**Định nghĩa.** Sliding window attention là một dạng [sparse attention](#sparse-attention) trong đó mỗi [token](#token) chỉ lấy thông tin từ một số token đứng gần nhất. Cửa sổ này trượt theo vị trí của token đang xét.

**Phân biệt.** Cửa sổ attention khác [cửa sổ ngữ cảnh](#context-window), vì một [mô hình](01-nen-tang.md#model) có thể dùng cửa sổ [attention](#attention) nhỏ ở một số [lớp](01-nen-tang.md#layer).

**Liên quan.** [sparse attention](#sparse-attention) · [kiến trúc ngữ cảnh dài](#long-context-architecture)

<a id="long-context-architecture"></a>
### Long-context architecture — Kiến trúc ngữ cảnh dài

*Mã: long-context-architecture · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Kiến trúc ngữ cảnh dài là tên chung cho các thay đổi trong thiết kế của một [mô hình](01-nen-tang.md#model) để xử lý chuỗi dài. Mục tiêu là xử lý hàng trăm nghìn [token](#token) trở lên với chi phí thấp hơn.

**Phân biệt.** Kiến trúc này cho phép [cửa sổ ngữ cảnh](#context-window) lớn hơn và hỗ trợ cách dùng [ngữ cảnh dài](05-prompt-ngu-canh-tri-thuc.md#long-context), nhưng không chống được [context rot](05-prompt-ngu-canh-tri-thuc.md#context-rot).

**Liên quan.** [RoPE](#rope) · [sparse attention](#sparse-attention) · [kiến trúc lai](#hybrid-architecture)

## 3.3 Kiến trúc khác

<a id="moe"></a>
### Mixture of experts (MoE) — Hỗn hợp chuyên gia

*Mã: moe · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** hỗn hợp chuyên gia, mixture of experts. Dạng chuẩn trong sách: MoE.

**Định nghĩa.** MoE là một kiến trúc trong đó một [lớp](01-nen-tang.md#layer) gồm nhiều mạng con song song. Một bộ định tuyến chọn vài mạng con cho mỗi [token](#token).

**Giải thích.** Tên của mỗi mạng con là expert. Trong một [transformer](#transformer) dùng MoE, các expert thay cho [lớp truyền thẳng](#feed-forward-layer). Bộ định tuyến là một mạng nhỏ, được [huấn luyện](01-nen-tang.md#training) cùng mô hình. Với mỗi token, bộ định tuyến chọn một số expert, ví dụ: 2 trong 64 expert. Các expert còn lại không chạy cho token đó.

Nhờ cách này, [mô hình](01-nen-tang.md#model) có tổng số [tham số](01-nen-tang.md#parameter) lớn nhưng chỉ dùng một phần tham số cho mỗi token. Xem thêm [tham số hoạt động](#active-parameters).

**Phân biệt.** Một expert trong MoE không phải một [agent](06-agent-va-tu-dong-hoa.md#ai-agent). Expert cũng không phải chuyên gia về một lĩnh vực như luật hay y tế. Expert là một mạng con. Việc chia việc giữa các expert do huấn luyện tạo ra, không do con người gán theo lĩnh vực. Bộ định tuyến trong MoE cũng khác [định tuyến mô hình](11-trien-khai-san-pham-kinh-te.md#model-routing). Định tuyến mô hình chọn giữa các mô hình riêng biệt.

**Liên quan.** [tham số hoạt động](#active-parameters) · [mô hình dày đặc](#dense-model) · [lớp truyền thẳng](#feed-forward-layer) · [định tuyến mô hình](11-trien-khai-san-pham-kinh-te.md#model-routing)

**Nguồn.** [1] Shazeer et al., "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer", 2017, https://arxiv.org/abs/1701.06538, truy cập 2/10/2026 (S319). [2] Fedus, Zoph, Shazeer, "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity", 2021, https://arxiv.org/abs/2101.03961, truy cập 2/10/2026 (S320).

<a id="active-parameters"></a>
### Active parameters — Tham số hoạt động

*Mã: active-parameters · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** active parameters, tham số kích hoạt. Dạng chuẩn trong sách: tham số hoạt động.

**Định nghĩa.** Tham số hoạt động là số [tham số](01-nen-tang.md#parameter) mà một [mô hình](01-nen-tang.md#model) dùng để xử lý một token. Trong mô hình MoE, số này nhỏ hơn tổng số tham số.

**Giải thích.** Trong một [mô hình dày đặc](#dense-model), tham số hoạt động bằng tổng tham số. Trong [MoE](#moe), mỗi [token](#token) chỉ đi qua vài expert, nên tham số hoạt động chỉ là một phần của tổng. Tham số hoạt động quyết định phần lớn lượng tính toán cho mỗi token. Tổng tham số quyết định dung lượng nhớ cần để nạp mô hình. Lý do: các expert phải nạp sẵn để bộ định tuyến chọn.

**Ví dụ.** Tháng 4/2026, NVIDIA công bố mô hình Nemotron 3 Super có 120 tỷ tham số tổng và 12 tỷ tham số hoạt động.

**Phân biệt.** Tham số hoạt động khác [kích thước mô hình](#model-size). Kích thước mô hình thường chỉ tổng tham số. Hai mô hình MoE có cùng tổng tham số có thể có số tham số hoạt động khác nhau.

**Liên quan.** [MoE](#moe) · [kích thước mô hình](#model-size) · [mô hình dày đặc](#dense-model)

**Nguồn.** [1] Fedus, Zoph, Shazeer, "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity", 2021, https://arxiv.org/abs/2101.03961, truy cập 2/10/2026 (S320). [2] NVIDIA, "Nemotron 3 Super: Open, Efficient Mixture-of-Experts Hybrid Mamba-Transformer Model for Agentic Reasoning", 2026, https://arxiv.org/abs/2604.12374, truy cập 2/10/2026 (S324).

<a id="dense-model"></a>
### Dense model — Mô hình dày đặc

*Mã: dense-model · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** dense model. Dạng chuẩn trong sách: mô hình dày đặc.

**Định nghĩa.** Mô hình dày đặc là một [mô hình](01-nen-tang.md#model) dùng toàn bộ [tham số](01-nen-tang.md#parameter) của mô hình ở mỗi bước tính.

**Phân biệt.** Mô hình dày đặc khác mô hình thưa như [MoE](#moe), vì mô hình thưa chỉ bật một phần tham số cho mỗi [token](#token).

**Liên quan.** [MoE](#moe) · [tham số hoạt động](#active-parameters)

<a id="ssm"></a>
### State space model (SSM) — Mô hình không gian trạng thái

*Mã: ssm · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mô hình không gian trạng thái. Dạng chuẩn trong sách: SSM.

**Định nghĩa.** SSM là một kiến trúc [mạng nơ-ron](01-nen-tang.md#neural-network) xử lý chuỗi qua một trạng thái có kích thước cố định. Tại mỗi vị trí, mạng cập nhật trạng thái này để tóm tắt phần chuỗi đã đi qua.

**Giải thích.** Một [transformer](#transformer) so mỗi [token](#token) với các token trước, nên chi phí tăng theo bình phương độ dài chuỗi. Một SSM chỉ mang theo trạng thái cố định, nên chi phí tăng theo độ dài chuỗi. Năm 2023, một bài báo công bố dạng SSM có chọn lọc. Ở dạng này, trạng thái thay đổi theo nội dung đầu vào. Theo bài báo, dạng này đạt kết quả bằng hoặc hơn transformer cùng kích thước trên một số [benchmark](07-danh-gia-va-chat-luong.md#benchmark) ngôn ngữ.

**Phân biệt.** SSM khác transformer. SSM nén phần chuỗi đã qua vào một trạng thái cố định. Transformer giữ biểu diễn của từng token, ví dụ trong [KV cache](#kv-cache). Trạng thái cố định có thể không giữ đủ chi tiết của các token ở xa. Một số nhà phát triển kết hợp 2 loại trong [kiến trúc lai](#hybrid-architecture).

**Liên quan.** [kiến trúc lai](#hybrid-architecture) · [transformer](#transformer) · [kiến trúc ngữ cảnh dài](#long-context-architecture)

**Nguồn.** [1] Gu, Dao, "Mamba: Linear-Time Sequence Modeling with Selective State Spaces", 2023, https://arxiv.org/abs/2312.00752, truy cập 2/10/2026 (S321).

<a id="hybrid-architecture"></a>
### Hybrid architecture — Kiến trúc lai

*Mã: hybrid-architecture · Chương 3 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Kiến trúc lai là một kiến trúc mạng xen kẽ các khối [attention](#attention) với các khối loại khác, thường là khối [SSM](#ssm). Mục tiêu là giảm chi phí với chuỗi dài.

**Phân biệt.** Kiến trúc lai nói về cách trộn các loại khối và khác [MoE](#moe), nhưng một mô hình có thể dùng cả hai.

**Thay đổi gần đây.** Tính đến tháng 10/2026, ít nhất 8 nhà phát triển công bố [mô hình](01-nen-tang.md#model) lai attention và SSM, có cả [mô hình mở trọng số](#open-weights).

**Liên quan.** [SSM](#ssm) · [MoE](#moe) · [kiến trúc ngữ cảnh dài](#long-context-architecture)

<a id="diffusion-model"></a>
### Diffusion model — Mô hình khuếch tán

*Mã: diffusion-model · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** diffusion model. Dạng chuẩn trong sách: mô hình khuếch tán.

**Định nghĩa.** Mô hình khuếch tán là một [mô hình](01-nen-tang.md#model) tạo dữ liệu mới từ nhiễu ngẫu nhiên qua nhiều bước khử nhiễu. Mô hình học bước khử nhiễu từ các mẫu thật đã thêm nhiễu có kiểm soát.

**Giải thích.** Khi [huấn luyện](01-nen-tang.md#training), kỹ sư thêm nhiễu vào ảnh thật theo nhiều mức, rồi dạy mô hình dự đoán phần nhiễu. Khi tạo ảnh, mô hình bắt đầu từ một ảnh toàn nhiễu. Mô hình bỏ nhiễu qua nhiều bước cho đến khi ra ảnh rõ. Văn bản mô tả đi vào mô hình qua [cross-attention](#cross-attention) hoặc cách khác, để ảnh khớp với mô tả. Một nhóm mô hình khuếch tán làm việc trong [không gian ẩn](#latent-space) để giảm lượng tính toán.

**Phân biệt.** Mô hình khuếch tán khác [GAN](#gan). GAN tạo ảnh trong một lần chạy mạng sinh. Mô hình khuếch tán tạo ảnh qua nhiều bước khử nhiễu. [Flow matching](#flow-matching) là một phương pháp huấn luyện gần với mô hình khuếch tán.

**Liên quan.** [mô hình tạo ảnh từ văn bản](04-llm-va-mo-hinh-sinh.md#text-to-image-model) · [không gian ẩn](#latent-space) · [flow matching](#flow-matching) · [mô hình ngôn ngữ khuếch tán](#diffusion-language-model)

**Nguồn.** [1] Ho, Jain, Abbeel, "Denoising Diffusion Probabilistic Models", 2020, https://arxiv.org/abs/2006.11239, truy cập 2/10/2026 (S326). [2] Rombach et al., "High-Resolution Image Synthesis with Latent Diffusion Models", 2022, https://arxiv.org/abs/2112.10752, truy cập 2/10/2026 (S327).

<a id="flow-matching"></a>
### Flow matching — Khớp dòng

*Mã: flow-matching · Chương 3 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** khớp dòng. Dạng chuẩn trong sách: flow matching.

**Định nghĩa.** Flow matching là một phương pháp [huấn luyện](01-nen-tang.md#training) [mô hình](01-nen-tang.md#model) sinh. Mô hình học cách biến nhiễu ngẫu nhiên thành dữ liệu thật theo một đường đi chọn trước.

**Phân biệt.** Đường đi của [mô hình khuếch tán](#diffusion-model) là một lựa chọn trong flow matching, và đường thẳng là một lựa chọn khác.

**Thay đổi gần đây.** Tính đến tháng 10/2026, flow matching và mô hình khuếch tán là nền của nhiều mô hình tạo ảnh, âm thanh và video.

**Liên quan.** [mô hình khuếch tán](#diffusion-model) · [mô hình tạo ảnh từ văn bản](04-llm-va-mo-hinh-sinh.md#text-to-image-model)

<a id="diffusion-language-model"></a>
### Diffusion language model — Mô hình ngôn ngữ khuếch tán

*Mã: diffusion-language-model · Chương 3 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** diffusion LLM, dLLM. Dạng chuẩn trong sách: mô hình ngôn ngữ khuếch tán.

**Định nghĩa.** Mô hình ngôn ngữ khuếch tán là một [mô hình ngôn ngữ](04-llm-va-mo-hinh-sinh.md#language-model) tạo văn bản qua nhiều bước sửa. Mô hình bắt đầu từ một chuỗi [token](#token) đã che hoặc một bản nháp, rồi sửa nhiều token cùng lúc.

**Phân biệt.** Loại này khác các [mô hình](01-nen-tang.md#model) [tự hồi quy](04-llm-va-mo-hinh-sinh.md#autoregressive), loại tạo từng token theo thứ tự.

**Thay đổi gần đây.** Tính đến tháng 10/2026, có mô hình ngôn ngữ khuếch tán mở và có mô hình thương mại qua [API](11-trien-khai-san-pham-kinh-te.md#api).

**Liên quan.** [mô hình khuếch tán](#diffusion-model) · [mô hình chỉ có decoder](#decoder-only-model)

<a id="gan"></a>
### Generative adversarial network (GAN) — Mạng đối sinh

*Mã: gan · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** mạng đối sinh, mạng đối nghịch tạo sinh. Dạng chuẩn trong sách: GAN.

**Định nghĩa.** GAN là một kiến trúc gồm 2 [mạng nơ-ron](01-nen-tang.md#neural-network) [huấn luyện](01-nen-tang.md#training) cùng nhau: một mạng sinh dữ liệu giả, một mạng phân biệt thật và giả. Mạng sinh học cách làm mạng phân biệt đoán sai.

**Phân biệt.** GAN tạo kết quả trong một lần chạy, khác [mô hình khuếch tán](#diffusion-model) cần nhiều bước khử nhiễu.

**Liên quan.** [mô hình khuếch tán](#diffusion-model) · [deepfake](09-bao-mat-rieng-tu-xac-thuc.md#deepfake)

<a id="autoencoder"></a>
### Autoencoder — Bộ tự mã hóa

*Mã: autoencoder · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ tự mã hóa. VAE (variational autoencoder) là một loại autoencoder. Dạng chuẩn trong sách: autoencoder.

**Định nghĩa.** Autoencoder là một [mạng nơ-ron](01-nen-tang.md#neural-network) nén đầu vào thành một biểu diễn ngắn, rồi dựng lại đầu vào từ biểu diễn đó. Mạng học bằng cách so đầu ra với chính đầu vào.

**Phân biệt.** VAE là một loại autoencoder có thể tạo mẫu mới từ [không gian ẩn](#latent-space).

**Liên quan.** [không gian ẩn](#latent-space) · [mô hình khuếch tán](#diffusion-model)

## 3.4 Làm mô hình nhỏ và rẻ hơn

<a id="model-size"></a>
### Model size — Kích thước mô hình

*Mã: model-size · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** model size, số tham số. Dạng chuẩn trong sách: kích thước mô hình.

**Định nghĩa.** Kích thước mô hình là số [tham số](01-nen-tang.md#parameter) của một [mô hình](01-nen-tang.md#model), thường ghi theo đơn vị tỷ. Ví dụ: "7B" nghĩa là khoảng 7 tỷ tham số.

**Giải thích.** Kích thước mô hình quyết định dung lượng nhớ cần để nạp mô hình và một phần chi phí [chạy mô hình](01-nen-tang.md#inference). Dung lượng còn phụ thuộc số bit cho mỗi tham số, xem [lượng tử hóa](#quantization). Với mô hình [MoE](#moe), tài liệu thường ghi cả [tham số hoạt động](#active-parameters).

**Ví dụ.** Ví dụ giả định: một mô hình có 7 tỷ tham số, mỗi tham số lưu bằng 2 byte. File của mô hình cần khoảng 14 GB.

**Phân biệt.** Kích thước mô hình là số tham số, khác dung lượng file và khác [cửa sổ ngữ cảnh](#context-window).

**Không nên hiểu là.** Không nên hiểu mô hình lớn hơn là mô hình tốt hơn. Chất lượng còn phụ thuộc [dữ liệu huấn luyện](01-nen-tang.md#training-data), [hậu huấn luyện](02-du-lieu-va-huan-luyen.md#post-training) và nhiệm vụ. Năm 2022, một nghiên cứu so 2 mô hình có cùng chi phí [huấn luyện](01-nen-tang.md#training). Mô hình 70 tỷ tham số học trên lượng dữ liệu gấp 4 lần. Mô hình này đạt kết quả tốt hơn mô hình 280 tỷ tham số.

Cũng không nên hiểu mỗi tham số là một ô chứa một sự kiện. Dù vậy, mô hình có thể nhớ nguyên văn một phần dữ liệu huấn luyện, và mô hình lớn hơn dễ nhớ hơn. Xem [ghi nhớ dữ liệu huấn luyện](09-bao-mat-rieng-tu-xac-thuc.md#memorization).

**Liên quan.** [tham số](01-nen-tang.md#parameter) · [tham số hoạt động](#active-parameters) · [lượng tử hóa](#quantization) · [quy luật mở rộng](02-du-lieu-va-huan-luyen.md#scaling-laws)

**Nguồn.** [1] Hoffmann et al., "Training Compute-Optimal Large Language Models", 2022, https://arxiv.org/abs/2203.15556, truy cập 2/10/2026 (S337). [2] Carlini et al., "Extracting Training Data from Large Language Models", 2020, https://arxiv.org/abs/2012.07805, truy cập 2/10/2026 (S343).

<a id="quantization"></a>
### Quantization — Lượng tử hóa

*Mã: quantization · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** quantization. Dạng chuẩn trong sách: lượng tử hóa.

**Định nghĩa.** Lượng tử hóa là một kỹ thuật lưu và tính [tham số](01-nen-tang.md#parameter) của một [mô hình](01-nen-tang.md#model) bằng ít bit hơn. Mô hình sau lượng tử hóa nhỏ hơn và thường chạy nhanh hơn.

**Giải thích.** Ví dụ: mỗi số giảm từ 16 bit xuống 8 bit hoặc 4 bit. Một tham số dạng 16 bit chiếm 2 byte. Ở dạng 4 bit, tham số đó chiếm nửa byte.

Bản 4 bit cần khoảng một phần tư dung lượng nhớ của bản 16 bit. Bản 4 bit có thể chạy trên [GPU](01-nen-tang.md#gpu) nhỏ hơn hoặc trên máy tính cá nhân. Lượng tử hóa sau [huấn luyện](01-nen-tang.md#training) không cần huấn luyện lại từ đầu. Đổi lại, mỗi số mất một phần độ chính xác. Chất lượng đầu ra có thể giảm, nhất là ở mức bit thấp.

**Phân biệt.** Lượng tử hóa không liên quan đến điện toán lượng tử. Tên gọi đến từ việc làm tròn một giá trị liên tục về một số mức rời rạc. Lượng tử hóa cũng khác [chưng cất tri thức](02-du-lieu-va-huan-luyen.md#distillation). Chưng cất tri thức huấn luyện một mô hình nhỏ mới học theo một mô hình lớn. Lượng tử hóa giữ cấu trúc mô hình và chỉ đổi cách lưu số.

> **THẬN TRỌNG:** Kiểm tra lại chất lượng trên nhiệm vụ thật sau khi lượng tử hóa. Điểm [benchmark](07-danh-gia-va-chat-luong.md#benchmark) của bản gốc không áp dụng nguyên cho bản lượng tử hóa.

**Liên quan.** [kích thước mô hình](#model-size) · [cắt tỉa mô hình](#pruning) · [chưng cất tri thức](02-du-lieu-va-huan-luyen.md#distillation) · [AI tại biên](11-trien-khai-san-pham-kinh-te.md#edge-ai)

**Nguồn.** [1] Frantar et al., "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers", 2022, https://arxiv.org/abs/2210.17323, truy cập 2/10/2026 (S338).

<a id="pruning"></a>
### Pruning — Cắt tỉa mô hình

*Mã: pruning · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** pruning. Dạng chuẩn trong sách: cắt tỉa mô hình.

**Định nghĩa.** Cắt tỉa mô hình là một kỹ thuật bỏ bớt các [trọng số](01-nen-tang.md#weight) ít quan trọng của một [mạng nơ-ron](01-nen-tang.md#neural-network) để mạng nhỏ hơn. Sau khi cắt, kỹ sư thường cho mạng học thêm để lấy lại chất lượng.

**Phân biệt.** Cắt tỉa bỏ hẳn một phần của [mô hình](01-nen-tang.md#model), còn [lượng tử hóa](#quantization) chỉ lưu mỗi số bằng ít bit hơn.

**Liên quan.** [lượng tử hóa](#quantization) · [chưng cất tri thức](02-du-lieu-va-huan-luyen.md#distillation)

<a id="lora"></a>
### Low-rank adaptation (LoRA) — Thích ứng hạng thấp

*Mã: lora · Chương 3 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** thích ứng hạng thấp, low-rank adaptation. Dạng chuẩn trong sách: LoRA.

**Định nghĩa.** LoRA là một phương pháp [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning) chỉ huấn luyện các bảng số nhỏ gắn thêm vào mô hình. [Trọng số](01-nen-tang.md#weight) ban đầu của mô hình giữ nguyên.

**Giải thích.** LoRA thuộc nhóm [PEFT](02-du-lieu-va-huan-luyen.md#peft). Các bảng số nhỏ gắn vào một số [lớp](01-nen-tang.md#layer) của [mô hình](01-nen-tang.md#model). Kỹ sư chỉ [huấn luyện](01-nen-tang.md#training) phần gắn thêm, không sửa các [tham số](01-nen-tang.md#parameter) ban đầu.

Bài báo gốc năm 2021 so LoRA với tinh chỉnh toàn bộ một mô hình 175 tỷ tham số. Số tham số cần huấn luyện giảm tới 10.000 lần. Dung lượng nhớ [GPU](01-nen-tang.md#gpu) cần dùng giảm 3 lần. Sau khi huấn luyện, kỹ sư có thể gộp phần gắn thêm vào trọng số gốc. Khi đó, mô hình không chạy chậm hơn.

**Phân biệt.** LoRA khác [adapter](#adapter): phần thêm của LoRA có thể gộp vào trọng số gốc, còn adapter thêm khối mới vào đường xử lý. LoRA cũng khác [RAG](05-prompt-ngu-canh-tri-thuc.md#rag). LoRA đổi cách mô hình trả lời. LoRA không cho mô hình truy cập tài liệu mới khi chạy.

**Liên quan.** [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning) · [PEFT](02-du-lieu-va-huan-luyen.md#peft) · [adapter](#adapter) · [lượng tử hóa](#quantization)

**Nguồn.** [1] Hu et al., "LoRA: Low-Rank Adaptation of Large Language Models", 2021, https://arxiv.org/abs/2106.09685, truy cập 2/10/2026 (S340).

<a id="adapter"></a>
### Adapter — Bộ chuyển đổi

*Mã: adapter · Chương 3 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ chuyển đổi. Dạng chuẩn trong sách: adapter.

**Định nghĩa.** Adapter là một khối mạng nhỏ được chèn vào giữa các [lớp](01-nen-tang.md#layer) của một mô hình có sẵn. Khi [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning), kỹ sư chỉ cập nhật adapter và giữ nguyên phần còn lại.

**Phân biệt.** Adapter thêm khối mới vào đường xử lý của [mô hình](01-nen-tang.md#model), khác [LoRA](#lora) có thể gộp phần thêm vào [trọng số](01-nen-tang.md#weight) gốc.

**Liên quan.** [LoRA](#lora) · [PEFT](02-du-lieu-va-huan-luyen.md#peft)

## 3.5 Mở hay đóng

<a id="open-weights"></a>
### Open weights — Mô hình mở trọng số

*Mã: open-weights · Chương 3 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** open weights, open-weight model, mô hình trọng số mở. Dạng chuẩn trong sách: mô hình mở trọng số.

**Định nghĩa.** Mô hình mở trọng số là một [mô hình](01-nen-tang.md#model) mà nhà phát triển cho người ngoài tải về [trọng số](01-nen-tang.md#weight) đã huấn luyện. Người tải về có thể dùng mô hình trên máy của mình, trong phạm vi giấy phép cho phép.

**Giải thích.** Mở trọng số chỉ nói về việc công bố trọng số. Nhà phát triển có thể không công bố mã [huấn luyện](01-nen-tang.md#training), [dữ liệu huấn luyện](01-nen-tang.md#training-data) hoặc thông tin chi tiết về dữ liệu. Quyền dùng thương mại, quyền sửa và quyền phân phối lại do [giấy phép mô hình](11-trien-khai-san-pham-kinh-te.md#model-license) quyết định. Một số giấy phép đặt giới hạn về mục đích dùng.

**Phân biệt.** Mô hình mở trọng số khác [AI mã nguồn mở](#open-source-ai). Theo định nghĩa của OSI, AI mã nguồn mở cần trọng số, mã nguồn và thông tin đủ chi tiết về dữ liệu. AI mã nguồn mở cũng cần các quyền dùng, nghiên cứu, sửa và chia sẻ. Mô hình mở trọng số cũng khác mô hình đóng: người dùng mô hình đóng chỉ gọi mô hình qua [API](11-trien-khai-san-pham-kinh-te.md#api) hoặc ứng dụng và không nhận trọng số.

**Thay đổi gần đây.** Tính đến tháng 10/2026, có mô hình mở trọng số với hơn 100 tỷ [tham số](01-nen-tang.md#parameter). Năm 2024, một cơ quan của chính phủ Mỹ khuyến nghị theo dõi rủi ro của mô hình mở trọng số, chưa hạn chế ngay.

> **CẢNH BÁO:** Đọc giấy phép mô hình trước khi dùng cho mục đích thương mại. Dùng sai điều kiện giấy phép có thể gây rủi ro pháp lý.

**Liên quan.** [AI mã nguồn mở](#open-source-ai) · [giấy phép mô hình](11-trien-khai-san-pham-kinh-te.md#model-license) · [kinh tế của mô hình mở](11-trien-khai-san-pham-kinh-te.md#open-model-economics) · [bảo mật trọng số mô hình](09-bao-mat-rieng-tu-xac-thuc.md#model-weights-security)

**Nguồn.** [1] Open Source Initiative, "The Open Source AI Definition 1.0", 2024, https://opensource.org/ai/open-source-ai-definition, truy cập 2/10/2026 (S003). [2] NTIA, "Dual-Use Foundation Models with Widely Available Model Weights", 2024, https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report, truy cập 2/10/2026 (S342).

<a id="open-source-ai"></a>
### Open-source AI — AI mã nguồn mở

*Mã: open-source-ai · Chương 3 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** open-source AI, AI nguồn mở. Dạng chuẩn trong sách: AI mã nguồn mở.

**Định nghĩa.** Theo định nghĩa của OSI, AI mã nguồn mở là một [hệ thống AI](01-nen-tang.md#ai-system) cho người nhận quyền dùng, nghiên cứu, sửa và chia sẻ với mục đích bất kỳ. Người nhận có đủ [trọng số](01-nen-tang.md#weight), mã nguồn và thông tin về dữ liệu.

**Giải thích.** OSI (Open Source Initiative) công bố bản 1.0 của định nghĩa ngày 28/10/2024. Định nghĩa yêu cầu 3 thành phần:

- Thông tin về dữ liệu: đủ chi tiết để người có chuyên môn dựng được hệ thống tương đương.
- Mã nguồn: mã để xử lý dữ liệu, [huấn luyện](01-nen-tang.md#training) và chạy hệ thống.
- [Tham số](01-nen-tang.md#parameter): trọng số và các thiết lập khác.

Mã nguồn và tham số phải đi kèm điều khoản được OSI duyệt. Định nghĩa không yêu cầu công bố toàn bộ [dữ liệu huấn luyện](01-nen-tang.md#training-data) gốc.

**Phân biệt.** AI mã nguồn mở theo OSI khác [mô hình mở trọng số](#open-weights). Mô hình mở trọng số chỉ cần công bố trọng số. Định nghĩa của OSI là chuẩn của một tổ chức, không phải quy định pháp luật. Một văn bản luật có thể dùng cụm "nguồn mở" theo nghĩa riêng, ví dụ: [EU AI Act](10-phap-ly-quan-tri-chinh-sach.md#eu-ai-act).

**Không nên hiểu là.** Không nên coi nhãn "nguồn mở" trong tài liệu tiếp thị là bằng chứng một [mô hình](01-nen-tang.md#model) đạt định nghĩa của OSI.

**Thay đổi gần đây.** Tính đến tháng 10/2026, bản định nghĩa đang áp dụng là 1.0.

**Liên quan.** [mô hình mở trọng số](#open-weights) · [giấy phép mô hình](11-trien-khai-san-pham-kinh-te.md#model-license) · [phong trào AI mã nguồn mở](12-xa-hoi-va-tuong-lai.md#open-source-ai-movement)

**Nguồn.** [1] Open Source Initiative, "The Open Source AI Definition 1.0", 2024, https://opensource.org/ai/open-source-ai-definition, truy cập 2/10/2026 (S003).
