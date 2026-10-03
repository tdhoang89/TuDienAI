---
chapter: 11
title: "Triển khai, sản phẩm và kinh tế"
file: 11-trien-khai-san-pham-kinh-te.md
terms: 46
bible_version: "0.2"
version: "0.1"
updated: 2026-10-02
status: review
---

# Chương 11 — Triển khai, sản phẩm và kinh tế

Chương này giải thích các thuật ngữ mà một tổ chức gặp khi mua, dùng, trả tiền và vận hành AI. Người đọc gặp các thuật ngữ này trong báo giá, hợp đồng dịch vụ và tài liệu kỹ thuật của nhà cung cấp.

Chương có 6 cụm:

- 11.1: các cách tiếp cận một mô hình,
- 11.2: chi phí và tốc độ,
- 11.3: vận hành hằng ngày,
- 11.4: hạ tầng phần cứng và năng lượng,
- 11.5: các loại sản phẩm,
- 11.6: các câu hỏi kinh tế, ví dụ tự xây hay mua.

Chương này không so sánh sản phẩm và không đưa bảng giá.

## 11.1 Cách tiếp cận mô hình

<a id="api"></a>
### Application programming interface (API) — Giao diện lập trình ứng dụng

*Mã: api · Chương 11 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** giao diện lập trình ứng dụng. Dạng chuẩn trong sách: API.

**Định nghĩa.** API là một điểm truy cập có quy tắc xác định, qua đó một chương trình gọi chức năng của một chương trình khác. Trong AI, phần mềm dùng API để gửi yêu cầu tới một [mô hình](01-nen-tang.md#model) và nhận kết quả qua mạng.

**Giải thích.** Một lần gọi API của dịch vụ AI có 3 bước. Phần mềm gửi một yêu cầu qua Internet. Yêu cầu gồm [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt), tên mô hình và các thiết lập. Máy chủ của nhà cung cấp [chạy mô hình](01-nen-tang.md#inference) và trả kết quả về phần mềm. Yêu cầu và kết quả là văn bản có cấu trúc để máy đọc, ví dụ định dạng JSON.

Mỗi yêu cầu kèm một khóa API. Khóa API là một chuỗi ký tự bí mật để nhà cung cấp xác định bên gọi và tính tiền. Nhà cung cấp đếm số [token](03-kien-truc-mo-hinh.md#token) của mỗi yêu cầu để tính [giá theo token](#token-pricing). Nhà cung cấp cũng đặt [giới hạn tần suất](#rate-limit) cho mỗi tài khoản.

Lập trình viên có thể gọi API trực tiếp hoặc qua một [SDK](#sdk). Một ứng dụng như [chatbot](#chatbot) chăm sóc khách hàng có thể dùng API thay vì tự chạy mô hình trên máy chủ riêng.

**Ví dụ.** Ví dụ giả định: Công ty An Bình nhận 200 email khiếu nại mỗi ngày. Kỹ sư viết một chương trình gửi nội dung từng email qua API tới một [LLM](04-llm-va-mo-hinh-sinh.md#llm). API trả về một đoạn tóm tắt 3 câu cho mỗi email. Chương trình lưu đoạn tóm tắt vào hệ thống quản lý khách hàng.

**Phân biệt.** API là cách phần mềm gọi mô hình. Giao diện trò chuyện trên web là cách con người gọi mô hình. Cùng một mô hình có thể có cả 2 cách truy cập, với điều khoản và giá khác nhau. API cũng khác một giao thức chung như [MCP](06-agent-va-tu-dong-hoa.md#mcp). Một API do nhà cung cấp tự định nghĩa. Giao thức chung là quy ước mà nhiều bên cùng theo.

**Không nên hiểu là.** API không phải là mô hình. API chỉ là cổng vào. Cùng một tên gọi trong API có thể dẫn tới [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version) khác khi có bản mới. Doanh nghiệp tránh việc này bằng cách [ghim phiên bản](#version-pinning). Gửi dữ liệu qua API cũng không tự động có nghĩa là nhà cung cấp dùng dữ liệu đó để [huấn luyện](01-nen-tang.md#training). Điều khoản dịch vụ và chính sách [lưu giữ dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-retention) quyết định việc này.

**Giới hạn.** API phụ thuộc vào mạng và máy chủ của nhà cung cấp. Khi nhà cung cấp gặp sự cố hoặc ngừng một mô hình, ứng dụng của doanh nghiệp cũng dừng theo. Ứng dụng cần phương án dự phòng cho trường hợp này.

> **CẢNH BÁO:** Giữ khóa API bí mật. Người có khóa API có thể gọi mô hình và làm phát sinh chi phí trên tài khoản của doanh nghiệp.

**Liên quan.** [SDK](#sdk) · [giá theo token](#token-pricing) · [giới hạn tần suất](#rate-limit) · [triển khai](#deployment) · [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use)

**Nguồn.** [1] NIST Computer Security Resource Center, "Glossary: application programming interface (API)", https://csrc.nist.gov/glossary/term/application_programming_interface, truy cập 2/10/2026 (S1101). [2] Anthropic, "API overview" (Claude Platform Docs), https://platform.claude.com/docs/en/api/overview, truy cập 2/10/2026 (S1102).

<a id="sdk"></a>
### Software development kit (SDK) — Bộ công cụ phát triển phần mềm

*Mã: sdk · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** bộ công cụ phát triển phần mềm. Dạng chuẩn trong sách: SDK.

**Định nghĩa.** SDK là một bộ thư viện và tài liệu giúp lập trình viên gọi một [API](#api) bằng một ngôn ngữ lập trình cụ thể. SDK tự làm các việc lặp lại, ví dụ xác thực và xử lý lỗi.

**Phân biệt.** SDK không thêm năng lực cho [mô hình](01-nen-tang.md#model), SDK chỉ làm việc gọi API dễ hơn.

**Liên quan.** [API](#api) · [webhook](#webhook)

<a id="deployment"></a>
### Deployment — Triển khai

*Mã: deployment · Chương 11 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Triển khai là một giai đoạn trong vòng đời của [hệ thống AI](01-nen-tang.md#ai-system), trong đó tổ chức đưa hệ thống vào dùng thật. Triển khai gồm cài đặt, kết nối với hệ thống sẵn có và phân công người vận hành.

**Giải thích.** Các khung quản lý rủi ro AI tách giai đoạn triển khai khỏi giai đoạn xây dựng [mô hình](01-nen-tang.md#model). Các việc chính khi triển khai gồm:

- chạy thử với một nhóm người dùng nhỏ,
- kiểm tra hệ thống mới có chạy được với hệ thống cũ không,
- kiểm tra yêu cầu pháp lý,
- hướng dẫn nhân viên thay đổi cách làm việc,
- đo trải nghiệm của người dùng.

Doanh nghiệp có thể chọn 1 trong 3 cách sau để [chạy mô hình](01-nen-tang.md#inference):

- Gọi mô hình qua [API](#api) của nhà cung cấp.
- Chạy mô hình trên [đám mây](#cloud) hoặc trong [triển khai riêng](#private-deployment) của doanh nghiệp.
- Chạy mô hình trên máy của người dùng, theo cách [AI tại biên](#edge-ai).

Sau khi triển khai, hệ thống cần [khả năng quan sát](#observability) để đội vận hành theo dõi chất lượng và chi phí. Chất lượng đầu ra có thể giảm khi dữ liệu thật khác dữ liệu lúc thử. Tên của hiện tượng này là [trôi mô hình](07-danh-gia-va-chat-luong.md#model-drift).

**Ví dụ.** Ví dụ giả định: Ngân hàng Sông Hồng xây một trợ lý trả lời câu hỏi nội bộ về thủ tục vay. Ngân hàng chạy thử trợ lý với 50 nhân viên trong 1 tháng. Sau đó, ngân hàng kết nối trợ lý với cổng thông tin nội bộ và mở cho 2.000 nhân viên. Đội vận hành ghi lại các câu trả lời sai mỗi tuần để sửa [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt).

**Phân biệt.** Triển khai khác [huấn luyện](01-nen-tang.md#training). Huấn luyện tạo ra mô hình. Triển khai đưa mô hình hoặc hệ thống vào dùng. Một doanh nghiệp có thể triển khai AI mà không huấn luyện mô hình nào. Trong pháp luật EU, tên của tổ chức dùng một hệ thống AI dưới quyền của mình là bên triển khai. Xem [nhà cung cấp](10-phap-ly-quan-tri-chinh-sach.md#provider).

**Không nên hiểu là.** Triển khai không phải là bước cuối cùng. Sau khi triển khai, hệ thống vẫn cần theo dõi, cập nhật và có lúc ngừng dùng. Một bản thử chạy tốt cũng chưa chứng minh hệ thống sẵn sàng triển khai. Bản thử chưa gặp tải thật, dữ liệu thật và yêu cầu pháp lý thật.

**Liên quan.** [API](#api) · [đám mây](#cloud) · [LLMOps](#llmops) · [khả năng quan sát](#observability) · [AI tại biên](#edge-ai)

**Nguồn.** [1] NIST, "Artificial Intelligence Risk Management Framework (AI RMF 1.0)", NIST AI 100-1, 2023, https://doi.org/10.6028/NIST.AI.100-1, mục 1 và Hình 2 (giai đoạn Deploy and Use, Operate and Monitor), truy cập 2/10/2026 (S002). [2] Google Cloud, "MLOps: Continuous delivery and automation pipelines in machine learning", cập nhật 28/8/2024, https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning, truy cập 2/10/2026 (S1106).

<a id="cloud"></a>
### Cloud — Đám mây

*Mã: cloud · Chương 11 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** điện toán đám mây (cloud computing). Dạng chuẩn trong sách: đám mây.

**Định nghĩa.** Đám mây là một loại dịch vụ cho thuê tài nguyên máy tính qua mạng, ví dụ máy chủ, chỗ lưu trữ và phần mềm. Khách hàng lấy thêm hoặc trả lại tài nguyên theo nhu cầu và trả tiền theo mức dùng.

**Giải thích.** Nhà cung cấp đám mây phục vụ nhiều khách hàng trên cùng một kho máy chủ. Tên của cách tổ chức này là [multi-tenancy](#multi-tenancy). Hệ thống tự đo mức dùng của mỗi khách hàng để tính tiền.

Đám mây có nhiều dạng theo đối tượng được dùng. Đám mây công cộng mở cho các khách hàng. Đám mây riêng chỉ phục vụ một tổ chức. Đám mây lai kết hợp 2 dạng trên.

Với AI, đám mây cho thuê [GPU](01-nen-tang.md#gpu) để [huấn luyện](01-nen-tang.md#training) và [chạy mô hình](01-nen-tang.md#inference). Nhà cung cấp đám mây cũng bán quyền gọi [mô hình](01-nen-tang.md#model) qua [API](#api). Doanh nghiệp không cần mua phần cứng đắt tiền trước khi rõ nhu cầu thật. Một số [mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights) nhỏ có thể chạy ngay trên máy tính xách tay, không cần đám mây.

**Ví dụ.** Ví dụ giả định: Công ty Phú Gia cần chạy một mô hình đọc hóa đơn trong 3 tháng mùa quyết toán thuế. Công ty thuê 4 GPU trên đám mây trong 3 tháng đó. Hết mùa, công ty trả lại GPU và ngừng trả tiền.

**Phân biệt.** Tại chỗ (on-premises) là cách doanh nghiệp tự mua máy chủ và đặt máy chủ trong cơ sở của mình. Doanh nghiệp tự vận hành, tự bảo trì và trả chi phí đầu tư trước. Đám mây riêng khác tại chỗ. Đám mây riêng chỉ phục vụ một tổ chức. Máy chủ của đám mây riêng có thể nằm trong cơ sở của tổ chức hoặc trong [trung tâm dữ liệu](#data-center) của bên thứ ba. Câu hỏi "dữ liệu nằm ở đâu" cần câu trả lời bằng địa điểm máy chủ, không bằng tên gọi của dịch vụ.

**Không nên hiểu là.** Đám mây không có nghĩa là dữ liệu nằm ở một nơi không xác định. Dữ liệu nằm trên máy chủ thật, ở một [vùng lưu trữ](#region) cụ thể. Nơi đặt máy chủ ảnh hưởng tới nghĩa vụ pháp lý về dữ liệu, xem [nơi lưu trú dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-residency).

**Giới hạn.** Đám mây không tự bảo đảm an toàn cho dữ liệu của khách hàng. Cấu hình quyền truy cập sai ở phía khách hàng vẫn có thể làm lộ dữ liệu.

**Liên quan.** [triển khai riêng](#private-deployment) · [trung tâm dữ liệu](#data-center) · [hyperscaler](#hyperscaler) · [vùng lưu trữ](#region) · [phụ thuộc nhà cung cấp](#vendor-lock-in)

**Nguồn.** [1] P. Mell, T. Grance (NIST), "The NIST Definition of Cloud Computing", SP 800-145, 2011, https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf, mục 2 (đặc điểm cốt lõi, mô hình triển khai), truy cập 2/10/2026 (S1107). [2] NTIA, "Dual-Use Foundation Models with Widely Available Model Weights", 2024, https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report/risks-benefits-of-dual-use-foundation-models-with-widely-available-model-weights/competition-innovation-research, phần Competition, Innovation, and Research, truy cập 2/10/2026 (S1108).

<a id="private-deployment"></a>
### Private deployment — Triển khai riêng

*Mã: private-deployment · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** triển khai trong VPC, triển khai trong đám mây riêng. Dạng chuẩn trong sách: triển khai riêng.

**Định nghĩa.** Triển khai riêng là một dạng [triển khai](#deployment) trên hạ tầng chỉ dành cho một tổ chức. Hạ tầng này có thể là máy chủ tại chỗ hoặc một mạng riêng trên [đám mây](#cloud).

**Giải thích.** VPC (virtual private cloud) là một mạng ảo tách riêng bên trong đám mây công cộng. Doanh nghiệp đặt [hệ thống AI](01-nen-tang.md#ai-system), hoặc điểm kết nối tới [mô hình](01-nen-tang.md#model), bên trong VPC. Dữ liệu giữa ứng dụng và mô hình đi trong mạng của nhà cung cấp đám mây, không đi qua Internet công cộng. Doanh nghiệp tự đặt quy tắc ai được truy cập.

Triển khai riêng tăng quyền kiểm soát, nhưng tăng chi phí và việc vận hành. Doanh nghiệp có thể phải trả cho năng lực máy chủ dành riêng, kể cả lúc không dùng hết.

**Phân biệt.** Triển khai riêng khác tại chỗ. Tại chỗ là máy chủ nằm trong cơ sở của doanh nghiệp. Triển khai riêng có thể nằm trong cơ sở của doanh nghiệp hoặc trong [trung tâm dữ liệu](#data-center) của nhà cung cấp đám mây. Triển khai riêng cũng khác [zero data retention](09-bao-mat-rieng-tu-xac-thuc.md#zero-data-retention), là cam kết không lưu dữ liệu sau khi xử lý.

**Không nên hiểu là.** Chữ "riêng" không có nghĩa là dữ liệu nằm ở Việt Nam. Vị trí của dữ liệu do [vùng lưu trữ](#region) quyết định.

**Liên quan.** [đám mây](#cloud) · [ranh giới dữ liệu doanh nghiệp](#enterprise-data-boundary) · [nơi lưu trú dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-residency)

**Nguồn.** [1] P. Mell, T. Grance (NIST), "The NIST Definition of Cloud Computing", SP 800-145, 2011, https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf, mục 2 (Private cloud), truy cập 2/10/2026 (S1107).

<a id="inference-provider"></a>
### Inference provider — Nhà cung cấp dịch vụ chạy mô hình

*Mã: inference-provider · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Nhà cung cấp dịch vụ chạy mô hình là một doanh nghiệp bán dịch vụ [chạy mô hình](01-nen-tang.md#inference) qua [API](#api). Mô hình có thể do bên khác phát triển.

**Phân biệt.** Bên phát triển tạo ra [trọng số](01-nen-tang.md#weight) của [mô hình](01-nen-tang.md#model). Nhà cung cấp dịch vụ chạy mô hình vận hành máy chủ và tính tiền theo mức dùng.

**Liên quan.** [chợ mô hình](#model-marketplace) · [kinh tế của mô hình mở](#open-model-economics)

<a id="model-marketplace"></a>
### Model marketplace — Chợ mô hình

*Mã: model-marketplace · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Chợ mô hình là một danh mục trực tuyến của [mô hình](01-nen-tang.md#model) từ nhiều nhà phát triển. Khách hàng tìm, thử và đăng ký dùng mô hình trên cùng một nền tảng.

**Phân biệt.** Có mặt trong chợ mô hình không có nghĩa là mô hình đã qua kiểm tra. Bên vận hành chợ có thể không kiểm tra chất lượng hoặc tính pháp lý.

**Liên quan.** [nhà cung cấp dịch vụ chạy mô hình](#inference-provider) · [giấy phép mô hình](#model-license) · [nền tảng AI doanh nghiệp](#enterprise-ai-platform)

<a id="model-license"></a>
### Model license — Giấy phép mô hình

*Mã: model-license · Chương 11 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Giấy phép mô hình là một văn bản pháp lý nêu điều kiện để người khác dùng, sửa và phân phối lại [trọng số](01-nen-tang.md#weight) hoặc mã của một [mô hình](01-nen-tang.md#model).

**Giải thích.** Có 3 nhóm giấy phép chính:

- Giấy phép mã nguồn mở dễ dãi, ví dụ Apache 2.0 và MIT. Người nhận được dùng, sửa và bán lại, với điều kiện giữ thông báo bản quyền.
- Giấy phép riêng của hãng. Giấy phép loại này cho dùng miễn phí nhưng kèm điều kiện riêng.
- Giấy phép OpenRAIL. Giấy phép loại này kèm danh sách mục đích không được dùng. Bên phân phối lại phải giữ danh sách này.

**Ví dụ.** Theo giấy phép cộng đồng Llama 4 (hiệu lực từ ngày 5/4/2025), bên có hơn 700 triệu người dùng hằng tháng phải xin giấy phép riêng từ hãng.

**Phân biệt.** Giấy phép mô hình áp dụng khi doanh nghiệp nhận trọng số và tự [chạy mô hình](01-nen-tang.md#inference). Điều khoản dịch vụ API áp dụng khi doanh nghiệp gọi mô hình qua [API](#api). Điều khoản dịch vụ quy định cả quyền với đầu ra, xem [quyền sở hữu đầu ra](10-phap-ly-quan-tri-chinh-sach.md#output-ownership).

**Không nên hiểu là.** Chữ "mở" không cho biết giấy phép thuộc nhóm nào, xem [AI mã nguồn mở](03-kien-truc-mo-hinh.md#open-source-ai).

**Thay đổi gần đây.** Tháng 8/2025, OpenAI phát hành 2 [mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights) theo giấy phép Apache 2.0.

> **CẢNH BÁO:** Đọc toàn văn giấy phép trước khi dùng mô hình trong sản phẩm thương mại. Vi phạm điều kiện của giấy phép có thể gây trách nhiệm pháp lý.

**Liên quan.** [mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights) · [kinh tế của mô hình mở](#open-model-economics) · [quyền sở hữu đầu ra](10-phap-ly-quan-tri-chinh-sach.md#output-ownership) · [điều khoản AI trong hợp đồng](10-phap-ly-quan-tri-chinh-sach.md#ai-clause)

**Nguồn.** [1] Apache Software Foundation, "Apache License, Version 2.0", 2004, https://www.apache.org/licenses/LICENSE-2.0, mục 2, 3, 4, truy cập 2/10/2026 (S1128). [2] Open Source Initiative, "The MIT License", https://opensource.org/license/mit, truy cập 2/10/2026 (S1129). [3] Meta, "Llama 4 Community License Agreement", 2025, https://dev.meta.ai/llama/llama4/license, truy cập 2/10/2026 (S1110). [4] C. Muñoz Ferrandis (Hugging Face), "OpenRAIL: Towards open and responsible AI licensing frameworks", 2022, https://huggingface.co/blog/open_rail, truy cập 2/10/2026 (S1130). [5] OpenAI, "gpt-oss-120b" (thẻ mô hình trên Hugging Face), 2025, https://huggingface.co/openai/gpt-oss-120b, truy cập 2/10/2026 (S1147).

## 11.2 Chi phí và hiệu năng

<a id="inference-cost"></a>
### Inference cost — Chi phí chạy mô hình

*Mã: inference-cost · Chương 11 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** chi phí suy luận (inference cost). Dạng chuẩn trong sách: chi phí chạy mô hình.

**Định nghĩa.** Chi phí chạy mô hình là một khoản chi phát sinh mỗi lần một [mô hình](01-nen-tang.md#model) xử lý đầu vào và tạo ra đầu ra. Khoản này khác chi phí [huấn luyện](01-nen-tang.md#training), là khoản chi để tạo ra mô hình trước khi dùng.

**Giải thích.** Chi phí chạy mô hình gồm tiền phần cứng, điện, làm mát, mạng và nhân sự vận hành. Khi doanh nghiệp gọi mô hình qua [API](#api), nhà cung cấp gộp các khoản này vào [giá theo token](#token-pricing). Khi doanh nghiệp tự [chạy mô hình](01-nen-tang.md#inference), doanh nghiệp trả trực tiếp cho [GPU](01-nen-tang.md#gpu), điện và người vận hành.

Chi phí chạy mô hình tăng theo các yếu tố sau:

- số yêu cầu,
- số [token](03-kien-truc-mo-hinh.md#token) đầu vào và đầu ra của mỗi yêu cầu,
- kích thước và loại mô hình.

Một [mô hình suy luận](04-llm-va-mo-hinh-sinh.md#reasoning-model) tạo thêm các token trung gian trước câu trả lời. Theo tài liệu của một nhà cung cấp, các token này được tính tiền như token đầu ra.

Chi phí huấn luyện phát sinh một lần cho mỗi mô hình. Chi phí chạy mô hình lặp lại với mỗi yêu cầu, trong suốt thời gian dùng. Với một sản phẩm có nhiều người dùng, tổng chi phí chạy mô hình theo thời gian có thể lớn hơn chi phí huấn luyện.

**Ví dụ.** Ví dụ giả định: Công ty Minh Long dùng một mô hình để trả lời 10.000 câu hỏi mỗi ngày. Mỗi câu hỏi dùng 2.000 [token đầu vào](04-llm-va-mo-hinh-sinh.md#input-token) và 500 token đầu ra. Giá là 1 USD cho 1 triệu token đầu vào và 5 USD cho 1 triệu token đầu ra. Chi phí mỗi ngày là 20 USD cho đầu vào cộng 25 USD cho đầu ra, tổng 45 USD.

**Phân biệt.** Chi phí chạy mô hình khác [chi phí đầu tư năng lực tính toán](#compute-capex). Chi phí đầu tư là tiền mua hoặc xây hạ tầng trước khi dùng. Chi phí chạy mô hình phát sinh theo mức dùng.

**Không nên hiểu là.** Giá mỗi token thấp không có nghĩa là chi phí cho một việc thấp. Một mô hình rẻ hơn có thể cần nhiều lượt gọi hoặc nhiều token hơn để làm xong cùng một việc. Số đo [chi phí mỗi nhiệm vụ](#cost-per-task) cho kết quả sát với thực tế hơn.

**Thay đổi gần đây.** Tháng 3/2025, nhóm nghiên cứu Epoch AI công bố một phân tích về giá. Giá để đạt một mức năng lực cố định giảm từ 9 lần đến 900 lần mỗi năm, tùy nhiệm vụ. Nhóm tác giả lưu ý rằng mức giảm nhanh nhất nằm trong năm trước đó và có thể không kéo dài.

> **THẬN TRỌNG:** Đặt giới hạn chi tiêu hằng tháng cho tài khoản API. Một [agent](06-agent-va-tu-dong-hoa.md#ai-agent) hoặc một vòng lặp lỗi có thể gọi mô hình liên tục và làm chi phí tăng nhanh.

**Liên quan.** [giá theo token](#token-pricing) · [chi phí mỗi nhiệm vụ](#cost-per-task) · [định tuyến mô hình](#model-routing) · [xử lý theo lô](#batch-processing) · [lượng tử hóa](03-kien-truc-mo-hinh.md#quantization)

**Nguồn.** [1] Anthropic, "Pricing" (Claude Platform Docs), https://platform.claude.com/docs/en/about-claude/pricing, truy cập 2/10/2026 (S1103). [2] OpenAI, "API Pricing", https://openai.com/api/pricing/, truy cập 2/10/2026 (S1104). [3] B. Cottier, B. Snodin, D. Owen, T. Adamczewski (Epoch AI), "LLM inference prices have fallen rapidly but unequally across tasks", 2025, https://epoch.ai/data-insights/llm-inference-price-trends, truy cập 2/10/2026 (S1105). [4] Anthropic, "Extended thinking" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/extended-thinking, truy cập 2/10/2026 (S1145).

<a id="token-pricing"></a>
### Token pricing — Giá theo token

*Mã: token-pricing · Chương 11 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Giá theo token là một phương thức tính tiền dịch vụ AI theo số [token](03-kien-truc-mo-hinh.md#token) mà [mô hình](01-nen-tang.md#model) nhận vào và tạo ra.

**Giải thích.** Nhà cung cấp tách giá [token đầu vào](04-llm-va-mo-hinh-sinh.md#input-token) và giá token đầu ra. Giá ghi theo đơn vị 1 triệu token. Ở các bảng giá mà sách này dẫn, token đầu ra có giá cao hơn token đầu vào. Mô hình xử lý token đầu vào cùng lúc, nhưng tạo token đầu ra lần lượt từng token. Token đầu vào lặp lại trong [prompt caching](05-prompt-ngu-canh-tri-thuc.md#prompt-caching) có giá thấp hơn token đầu vào thường.

**Phân biệt.** Token đầu vào gồm văn bản, hình ảnh hoặc tài liệu gửi tới mô hình, kể cả [system prompt](05-prompt-ngu-canh-tri-thuc.md#system-prompt) và lịch sử hội thoại. Token đầu ra là nội dung mô hình tạo ra. Một câu hỏi ngắn kèm tài liệu dài tốn chủ yếu tiền đầu vào. Một yêu cầu viết báo cáo dài tốn chủ yếu tiền đầu ra.

**Không nên hiểu là.** Không nên so giá 2 mô hình chỉ bằng giá mỗi token. Cùng một văn bản tiếng Việt có thể thành số token khác nhau với 2 [bộ tách token](03-kien-truc-mo-hinh.md#tokenizer) khác nhau.

**Thay đổi gần đây.** Tính đến tháng 10/2026, bảng giá công khai của 2 nhà cung cấp API lớn ghi giá token đầu ra gấp 5 đến 6 lần giá token đầu vào. Cả 2 bảng giá áp dụng cho các lần gọi qua [API](#api).

**Liên quan.** [chi phí chạy mô hình](#inference-cost) · [bộ đếm token](#token-counter) · [cách tính giá dịch vụ AI](#pricing-models) · [xử lý theo lô](#batch-processing)

**Nguồn.** [1] Anthropic, "Pricing" (Claude Platform Docs), https://platform.claude.com/docs/en/about-claude/pricing, truy cập 2/10/2026 (S1103). [2] OpenAI, "API Pricing", https://openai.com/api/pricing/, truy cập 2/10/2026 (S1104). [3] V. Nguyen và cộng sự (NVIDIA), "LLM Inference Benchmarking: Fundamental Concepts", 2025, https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts, truy cập 2/10/2026 (S1112).

<a id="token-counter"></a>
### Token counter — Bộ đếm token

*Mã: token-counter · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Bộ đếm token là một công cụ đếm số [token](03-kien-truc-mo-hinh.md#token) của một đầu vào trước khi gửi đầu vào tới [mô hình](01-nen-tang.md#model). Doanh nghiệp dùng kết quả để ước tính chi phí, kiểm tra giới hạn và chọn mô hình.

**Phân biệt.** Kết quả của bộ đếm token là ước tính và chỉ đúng với [bộ tách token](03-kien-truc-mo-hinh.md#tokenizer) của chính mô hình đó.

**Liên quan.** [giá theo token](#token-pricing) · [giới hạn tần suất](#rate-limit)

<a id="embedding-dimension"></a>
### Embedding dimension — Số chiều embedding

*Mã: embedding-dimension · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Số chiều embedding là số lượng con số trong một [embedding](03-kien-truc-mo-hinh.md#embedding), tức một [vector](01-nen-tang.md#vector) biểu diễn văn bản hoặc hình ảnh. Số chiều lớn hơn cần nhiều chỗ lưu trữ và nhiều phép tính hơn.

**Phân biệt.** Số chiều lớn hơn không tự động cho kết quả tìm kiếm tốt hơn. Một số [mô hình embedding](04-llm-va-mo-hinh-sinh.md#embedding-model) cho phép cắt bớt số chiều để giảm chi phí.

**Liên quan.** [embedding](03-kien-truc-mo-hinh.md#embedding) · [cơ sở dữ liệu vector](05-prompt-ngu-canh-tri-thuc.md#vector-database)

<a id="latency"></a>
### Latency — Độ trễ

*Mã: latency · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Độ trễ là một số đo thời gian từ lúc gửi yêu cầu tới lúc nhận được phản hồi. Đơn vị là giây hoặc mili giây.

**Cách tính.** Độ trễ đầu cuối của một yêu cầu bằng [TTFT](#time-to-first-token) cộng thời gian tạo các [token](03-kien-truc-mo-hinh.md#token) còn lại. Ví dụ giả định: TTFT là 0,4 giây. [Mô hình](01-nen-tang.md#model) tạo thêm 300 token sau token đầu tiên, mỗi token mất 0,02 giây. Độ trễ đầu cuối là 0,4 + 300 × 0,02 = 6,4 giây.

**Phân biệt.** Độ trễ đo tốc độ phục vụ một yêu cầu. Thông lượng (throughput) đo số token hoặc số yêu cầu mà hệ thống xử lý xong trong 1 giây. Số này cộng trên các yêu cầu chạy cùng lúc. Khi số yêu cầu cùng lúc tăng, thông lượng tăng tới một mức trần. Cùng lúc đó, độ trễ của từng người dùng tăng.

**Giới hạn.** Chỉ số này không đo chất lượng câu trả lời. Độ trễ phụ thuộc vào độ dài [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt), độ dài đầu ra, số yêu cầu cùng lúc và mạng. Hai số đo ở 2 điều kiện khác nhau không so sánh được.

**Liên quan.** [TTFT](#time-to-first-token) · [streaming](#streaming) · [giải mã suy đoán](#speculative-decoding) · [khởi động nguội](#cold-start)

**Nguồn.** [1] V. Nguyen và cộng sự (NVIDIA), "LLM Inference Benchmarking: Fundamental Concepts", 2025, https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts, truy cập 2/10/2026 (S1112).

<a id="time-to-first-token"></a>
### Time to first token (TTFT) — Thời gian đến token đầu tiên

*Mã: time-to-first-token · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** thời gian đến token đầu tiên. Dạng chuẩn trong sách: TTFT.

**Định nghĩa.** TTFT là một số đo thời gian từ lúc gửi yêu cầu tới lúc nhận được [token](03-kien-truc-mo-hinh.md#token) đầu tiên của câu trả lời. TTFT gồm thời gian chờ, thời gian xử lý toàn bộ [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) và thời gian truyền qua mạng.

**Phân biệt.** Khi xử lý prompt, [mô hình](01-nen-tang.md#model) tính [KV cache](03-kien-truc-mo-hinh.md#kv-cache). KV cache là dữ liệu tạm của một yêu cầu, khác [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) lưu thông tin người dùng giữa các phiên.

**Liên quan.** [độ trễ](#latency) · [streaming](#streaming)

<a id="streaming"></a>
### Streaming — Truyền phát

*Mã: streaming · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** truyền phát. Dạng chuẩn trong sách: streaming.

**Định nghĩa.** Streaming là một phương thức trả kết quả qua [API](#api) theo từng phần. Máy chủ gửi mỗi phần ngay khi [mô hình](01-nen-tang.md#model) tạo ra phần đó.

**Giải thích.** Ứng dụng nhận từng phần qua một kết nối mở và hiển thị dần lên màn hình. Người dùng thấy chữ đầu tiên sau khoảng [TTFT](#time-to-first-token), không phải sau toàn bộ [độ trễ](#latency). Với câu trả lời dài, streaming còn giúp tránh lỗi hết thời gian chờ của kết nối. Một nhà cung cấp yêu cầu streaming khi giá trị [số token đầu ra tối đa](04-llm-va-mo-hinh-sinh.md#max-output-tokens) lớn.

**Không nên hiểu là.** Streaming không làm mô hình chạy nhanh hơn. Streaming chỉ đổi thời điểm người dùng bắt đầu thấy kết quả.

**Liên quan.** [độ trễ](#latency) · [TTFT](#time-to-first-token) · [xử lý theo lô](#batch-processing)

**Nguồn.** [1] Anthropic, "Streaming Messages" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/streaming, truy cập 2/10/2026 (S1113).

<a id="batch-processing"></a>
### Batch processing — Xử lý theo lô

*Mã: batch-processing · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Xử lý theo lô là một phương thức gửi nhiều yêu cầu tới [mô hình](01-nen-tang.md#model) trong một lần. Kết quả về sau, không về ngay.

**Giải thích.** Doanh nghiệp gom nhiều yêu cầu vào một lô và gửi qua [API](#api). Nhà cung cấp xử lý lô trong một thời hạn, ví dụ 24 giờ, và tính giá thấp hơn gọi tức thời. Tính đến tháng 10/2026, 2 nhà cung cấp API lớn giảm 50% giá cho xử lý theo lô. Kết quả có thể về theo thứ tự khác thứ tự gửi. Mỗi yêu cầu cần một mã riêng để ghép kết quả với yêu cầu.

**Ví dụ.** Ví dụ giả định: Văn phòng luật Hòa Bình cần gắn chủ đề cho 20.000 văn bản lưu trữ. Văn phòng không cần kết quả ngay. Văn phòng gửi các văn bản thành một lô vào buổi tối và nhận kết quả sáng hôm sau. Giá bằng một nửa giá gọi tức thời.

**Phân biệt.** Xử lý theo lô trong dịch vụ API khác [batch](01-nen-tang.md#batch) trong [huấn luyện](01-nen-tang.md#training). Batch trong huấn luyện là nhóm mẫu dữ liệu mà mô hình học trong một bước.

**Liên quan.** [giá theo token](#token-pricing) · [streaming](#streaming) · [webhook](#webhook)

**Nguồn.** [1] Anthropic, "Batch processing" (Claude Platform Docs), https://platform.claude.com/docs/en/build-with-claude/batch-processing, truy cập 2/10/2026 (S1114). [2] OpenAI, "API Pricing", https://openai.com/api/pricing/, truy cập 2/10/2026 (S1104).

<a id="speculative-decoding"></a>
### Speculative decoding — Giải mã suy đoán

*Mã: speculative-decoding · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Giải mã suy đoán là một kỹ thuật tăng tốc [chạy mô hình](01-nen-tang.md#inference), trong đó một mô hình nhỏ đề xuất trước vài [token](03-kien-truc-mo-hinh.md#token) tiếp theo. Mô hình lớn kiểm tra các token này trong cùng một lượt tính.

**Phân biệt.** Theo bài báo gốc, kỹ thuật này cho đầu ra giống như khi chỉ dùng [mô hình](01-nen-tang.md#model) lớn. [Lượng tử hóa](03-kien-truc-mo-hinh.md#quantization) thì khác, vì lượng tử hóa sửa chính mô hình.

**Liên quan.** [độ trễ](#latency) · [chạy mô hình](01-nen-tang.md#inference)

<a id="cold-start"></a>
### Cold start — Khởi động nguội

*Mã: cold-start · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Khởi động nguội là một khoảng chờ thêm khi hệ thống phải bật máy chủ hoặc nạp [mô hình](01-nen-tang.md#model) trước khi xử lý yêu cầu đầu tiên. Khoảng chờ này làm tăng [độ trễ](#latency) của yêu cầu đó.

**Phân biệt.** Doanh nghiệp có thể giữ sẵn máy chủ để tránh khởi động nguội, nhưng phải trả tiền cho máy chủ cả lúc không dùng.

**Liên quan.** [độ trễ](#latency) · [đám mây](#cloud)

<a id="cost-per-task"></a>
### Cost per task — Chi phí mỗi nhiệm vụ

*Mã: cost-per-task · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** unit economics (kinh tế đơn vị). Dạng chuẩn trong sách: chi phí mỗi nhiệm vụ.

**Định nghĩa.** Chi phí mỗi nhiệm vụ là một số đo tổng chi phí để một [hệ thống AI](01-nen-tang.md#ai-system) làm xong một đơn vị công việc đạt yêu cầu. Ví dụ, đơn vị công việc là một hồ sơ hoặc một yêu cầu của khách hàng.

**Cách tính.** Chi phí mỗi nhiệm vụ bằng tổng chi phí trong kỳ chia cho số nhiệm vụ làm xong đạt yêu cầu. Tổng chi phí gồm [chi phí chạy mô hình](#inference-cost), phí công cụ và giờ công của người kiểm tra lại.

Ví dụ giả định: trong 1 tháng, một [agent](06-agent-va-tu-dong-hoa.md#ai-agent) xử lý 1.000 hồ sơ. Chi phí cho [chạy mô hình](01-nen-tang.md#inference) là 300 USD và giờ công kiểm tra lại là 700 USD. Có 800 hồ sơ đạt yêu cầu. Chi phí mỗi nhiệm vụ là 1.000 USD chia cho 800, bằng 1,25 USD.

**Phân biệt.** Chi phí mỗi nhiệm vụ khác [giá theo token](#token-pricing). Giá theo token đo giá của đầu vào và đầu ra. Chi phí mỗi nhiệm vụ đo giá của kết quả có ích. Một [mô hình](01-nen-tang.md#model) có giá mỗi [token](03-kien-truc-mo-hinh.md#token) thấp vẫn có thể có chi phí mỗi nhiệm vụ cao nếu mô hình cần nhiều lượt thử.

**Giới hạn.** Chỉ số này không đo thiệt hại của các lỗi lọt qua khâu kiểm tra. Chỉ số này cũng phụ thuộc vào định nghĩa "đạt yêu cầu" của từng doanh nghiệp.

**Liên quan.** [chi phí chạy mô hình](#inference-cost) · [ROI của AI](#ai-roi) · [tỷ lệ hoàn thành nhiệm vụ](07-danh-gia-va-chat-luong.md#task-success-rate) · [định tuyến mô hình](#model-routing)

**Nguồn.** [1] S. Kapoor, B. Stroebl, Z. S. Siegel, N. Nadgir, A. Narayanan, "AI Agents That Matter", 2024, https://arxiv.org/abs/2407.01502, truy cập 2/10/2026 (S1120).

## 11.3 Vận hành

<a id="llmops"></a>
### LLMOps — LLMOps

*Mã: llmops · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** MLOps (nghĩa rộng hơn, cho học máy nói chung). Dạng chuẩn trong sách: LLMOps.

**Định nghĩa.** LLMOps là một tập quy trình và công cụ để vận hành ứng dụng dùng [LLM](04-llm-va-mo-hinh-sinh.md#llm). LLMOps gồm đưa ứng dụng vào dùng, theo dõi, cập nhật và kiểm soát chi phí theo quy trình lặp lại được.

**Giải thích.** LLMOps mở rộng MLOps. MLOps là cách làm gộp việc phát triển và việc vận hành hệ thống [học máy](01-nen-tang.md#machine-learning). Mã của [mô hình](01-nen-tang.md#model) chỉ là một phần nhỏ của một hệ thống học máy thật. Phần còn lại gồm thu thập dữ liệu, kiểm thử, theo dõi và hạ tầng phục vụ.

Với LLM, các việc chính gồm:

- quản lý phiên bản của [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt), mô hình và tài liệu nguồn,
- chạy [kiểm thử hồi quy](07-danh-gia-va-chat-luong.md#regression-test) trước mỗi thay đổi,
- theo dõi chất lượng, chi phí và [độ trễ](#latency),
- chuyển yêu cầu sang mô hình dự phòng khi có lỗi.

**Phân biệt.** LLMOps khác [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning). Một đội LLMOps có thể không [huấn luyện](01-nen-tang.md#training) mô hình nào. Đội đó vận hành mô hình mua qua [API](#api).

**Liên quan.** [khả năng quan sát](#observability) · [đánh giá trong vận hành](#production-evaluation) · [ghim phiên bản](#version-pinning) · [triển khai](#deployment)

**Nguồn.** [1] Google Cloud, "MLOps: Continuous delivery and automation pipelines in machine learning", cập nhật 28/8/2024, https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning, truy cập 2/10/2026 (S1106).

<a id="observability"></a>
### Observability — Khả năng quan sát

*Mã: observability · Chương 11 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** tracing (truy vết), logging (ghi nhật ký). Dạng chuẩn trong sách: khả năng quan sát.

**Định nghĩa.** Khả năng quan sát là một đặc tính của hệ thống phần mềm. Đặc tính này cho phép đội vận hành tìm nguyên nhân của một vấn đề từ dữ liệu mà hệ thống ghi ra.

**Giải thích.** Hệ thống ghi ra 3 loại dữ liệu chính:

- Nhật ký (log) ghi từng sự kiện kèm thời gian.
- Số đo (metric) ghi các con số theo thời gian, ví dụ [độ trễ](#latency), số [token](03-kien-truc-mo-hinh.md#token) và chi phí.
- Vết (trace) ghi đường đi của một yêu cầu qua các bước.

Với một [agent](06-agent-va-tu-dong-hoa.md#ai-agent), một vết ghi [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt), các lần [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use) và câu trả lời của từng bước.

**Phân biệt.** Theo dõi (monitoring) là xem các số đo đã chọn trước và báo động khi số đo vượt ngưỡng. Khả năng quan sát rộng hơn. Dữ liệu ghi ra đủ để trả lời cả câu hỏi chưa đặt trước. Cả 2 đều không tự sửa lỗi. Sửa lỗi cần con người hoặc một quy trình tự động riêng, có kiểm soát.

**Thay đổi gần đây.** Tính đến tháng 10/2026, dự án mã nguồn mở OpenTelemetry duy trì một bộ quy ước riêng để ghi dữ liệu theo dõi cho [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai). Bộ quy ước này có phần cho [MCP](06-agent-va-tu-dong-hoa.md#mcp).

> **THẬN TRỌNG:** Che hoặc lọc dữ liệu cá nhân trước khi lưu vết và nhật ký. Vết của ứng dụng AI có thể chứa toàn văn prompt và tài liệu của khách hàng.

**Liên quan.** [LLMOps](#llmops) · [đánh giá trong vận hành](#production-evaluation) · [cổng mô hình](#model-gateway)

**Nguồn.** [1] OpenTelemetry, "Observability primer", https://opentelemetry.io/docs/concepts/observability-primer/, truy cập 2/10/2026 (S1118). [2] OpenTelemetry, "Semantic Conventions for Generative AI" (kho semantic-conventions-genai), https://github.com/open-telemetry/semantic-conventions-genai, truy cập 2/10/2026 (S1119).

<a id="production-evaluation"></a>
### Production evaluation — Đánh giá trong vận hành

*Mã: production-evaluation · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Đánh giá trong vận hành là một hoạt động [đánh giá](07-danh-gia-va-chat-luong.md#evaluation) chất lượng đầu ra sau khi [triển khai](#deployment). Hoạt động này dùng yêu cầu thật của người dùng.

**Phân biệt.** Một [benchmark](07-danh-gia-va-chat-luong.md#benchmark) dùng bộ câu hỏi cố định trước khi triển khai. Đánh giá trong vận hành dùng yêu cầu thật, vốn thay đổi theo thời gian.

**Liên quan.** [khả năng quan sát](#observability) · [thử nghiệm A/B](07-danh-gia-va-chat-luong.md#ab-test) · [trôi mô hình](07-danh-gia-va-chat-luong.md#model-drift)

<a id="model-routing"></a>
### Model routing — Định tuyến mô hình

*Mã: model-routing · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** fallback (chuyển sang mô hình dự phòng). Dạng chuẩn trong sách: định tuyến mô hình.

**Định nghĩa.** Định tuyến mô hình là một cơ chế chọn [mô hình](01-nen-tang.md#model) để xử lý mỗi yêu cầu. Cơ chế này dựa trên độ khó, chi phí, [độ trễ](#latency) hoặc tình trạng của các mô hình.

**Giải thích.** Một bộ định tuyến gửi câu hỏi đơn giản tới một mô hình nhỏ và rẻ. Bộ định tuyến gửi câu hỏi khó tới một mô hình lớn hơn. Trên bộ thử của mình, 2 nghiên cứu năm 2023 và 2024 báo cáo chi phí giảm hơn một nửa khi giữ chất lượng tương đương. Một nghiên cứu báo cáo mức giảm tới 98%.

Fallback là một dạng định tuyến đơn giản. Khi mô hình chính lỗi hoặc quá tải, hệ thống gửi yêu cầu sang một mô hình dự phòng.

**Phân biệt.** Định tuyến mô hình khác [định tuyến trong agent](06-agent-va-tu-dong-hoa.md#routing-agent). Định tuyến mô hình chọn mô hình. Loại định tuyến kia chọn bước hoặc nhánh công việc tiếp theo.

**Giới hạn.** Bộ định tuyến cũng có thể chọn sai. Khi bộ định tuyến gửi một câu hỏi khó tới mô hình nhỏ, câu trả lời có thể kém. Đội vận hành cần đo chất lượng trên từng nhánh.

**Liên quan.** [cổng mô hình](#model-gateway) · [chi phí mỗi nhiệm vụ](#cost-per-task) · [SLM](04-llm-va-mo-hinh-sinh.md#slm) · [định tuyến trong agent](06-agent-va-tu-dong-hoa.md#routing-agent)

**Nguồn.** [1] I. Ong và cộng sự, "RouteLLM: Learning to Route LLMs with Preference Data", 2024, https://arxiv.org/abs/2406.18665, truy cập 2/10/2026 (S1115). [2] L. Chen, M. Zaharia, J. Zou, "FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance", 2023, https://arxiv.org/abs/2305.05176, truy cập 2/10/2026 (S1116).

<a id="model-gateway"></a>
### Model gateway — Cổng mô hình

*Mã: model-gateway · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Cổng mô hình là một phần mềm trung gian đứng giữa ứng dụng và [API](#api) của các [mô hình](01-nen-tang.md#model). Cổng mô hình gom việc ghi nhật ký, đếm chi phí, lưu đệm và chuyển sang mô hình dự phòng vào một chỗ.

**Phân biệt.** Cổng là nơi đặt các quy tắc, còn [định tuyến mô hình](#model-routing) là một trong các quy tắc đó.

**Liên quan.** [định tuyến mô hình](#model-routing) · [khả năng quan sát](#observability) · [giới hạn tần suất](#rate-limit)

<a id="rate-limit"></a>
### Rate limit — Giới hạn tần suất

*Mã: rate-limit · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Giới hạn tần suất là một mức trần do nhà cung cấp [API](#api) đặt cho mỗi tài khoản. Mức trần này áp dụng cho số yêu cầu hoặc số [token](03-kien-truc-mo-hinh.md#token) gửi trong một khoảng thời gian, ví dụ mỗi phút.

**Giải thích.** Một nhà cung cấp đo giới hạn theo 3 số: số yêu cầu mỗi phút, số [token đầu vào](04-llm-va-mo-hinh-sinh.md#input-token) mỗi phút và số token đầu ra mỗi phút. Khi tài khoản vượt giới hạn, API trả về mã lỗi HTTP 429. Mã lỗi này kèm thời gian cần chờ trước khi gửi lại. Mức giới hạn tăng theo hạng tài khoản, và hạng tài khoản phụ thuộc vào mức chi tiêu.

**Phân biệt.** Giới hạn tần suất khác giới hạn chi tiêu. Giới hạn tần suất đặt trần cho tốc độ gọi. Giới hạn chi tiêu đặt trần cho số tiền mỗi tháng.

> **THẬN TRỌNG:** Chờ đúng thời gian mà API báo trước khi [thử lại](06-agent-va-tu-dong-hoa.md#retry). Gửi lại liên tục khi gặp lỗi 429 có thể làm ứng dụng ngừng phục vụ lâu hơn.

**Liên quan.** [API](#api) · [SLA](#sla) · [cổng mô hình](#model-gateway) · [bộ đếm token](#token-counter)

**Nguồn.** [1] Anthropic, "Rate limits" (Claude Platform Docs), https://platform.claude.com/docs/en/api/rate-limits, truy cập 2/10/2026 (S1111).

<a id="version-pinning"></a>
### Version pinning — Ghim phiên bản

*Mã: version-pinning · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Ghim phiên bản là một thao tác chỉ định một [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version) cố định khi gọi [API](#api). Thao tác này giữ hành vi của ứng dụng khi có bản mới.

**Cách dùng.**

1. Ghi mã phiên bản đầy đủ trong cấu hình.
2. Chạy [kiểm thử hồi quy](07-danh-gia-va-chat-luong.md#regression-test) trước khi đổi phiên bản.
3. Đổi phiên bản trước ngày nhà cung cấp ngừng hỗ trợ.

**Phân biệt.** Dùng tên gọi tắt (alias) không phải là ghim phiên bản, vì tên gọi tắt có thể trỏ sang bản sau.

**Liên quan.** [phiên bản mô hình](04-llm-va-mo-hinh-sinh.md#model-version) · [kiểm thử hồi quy](07-danh-gia-va-chat-luong.md#regression-test) · [LLMOps](#llmops)

<a id="sla"></a>
### Service level agreement (SLA) — Cam kết mức dịch vụ

*Mã: sla · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** cam kết mức dịch vụ. Dạng chuẩn trong sách: SLA.

**Định nghĩa.** SLA là một cam kết trong hợp đồng dịch vụ về mức phục vụ tối thiểu, ví dụ tỷ lệ thời gian hoạt động (uptime) hoặc [độ trễ](#latency). SLA nêu khoản giảm phí khi nhà cung cấp không đạt mức đó.

**Phân biệt.** SLA đo dịch vụ có chạy và chạy nhanh không, SLA không đo câu trả lời của [mô hình](01-nen-tang.md#model) có đúng không.

**Liên quan.** [điều khoản AI trong hợp đồng](10-phap-ly-quan-tri-chinh-sach.md#ai-clause) · [giới hạn tần suất](#rate-limit) · [vùng lưu trữ](#region)

<a id="webhook"></a>
### Webhook — Webhook

*Mã: webhook · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Webhook là một cơ chế trong đó một dịch vụ tự gửi thông báo tới địa chỉ của ứng dụng khi một sự kiện xảy ra. Ví dụ, dịch vụ báo khi một lô trong [xử lý theo lô](#batch-processing) chạy xong.

**Phân biệt.** Với webhook, ứng dụng không phải hỏi lại dịch vụ nhiều lần để xem việc đã xong chưa.

**Liên quan.** [API](#api) · [xử lý theo lô](#batch-processing)

## 11.4 Hạ tầng

<a id="data-center"></a>
### Data center — Trung tâm dữ liệu

*Mã: data-center · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** cụm GPU (GPU cluster), theo nghĩa hẹp. Dạng chuẩn trong sách: trung tâm dữ liệu.

**Định nghĩa.** Trung tâm dữ liệu là một cơ sở chứa nhiều máy chủ, hệ thống lưu trữ, mạng, nguồn điện và hệ thống làm mát. Cơ sở này chạy dịch vụ máy tính liên tục.

**Giải thích.** Một cụm GPU là một nhóm máy chủ có [GPU](01-nen-tang.md#gpu), nối với nhau bằng mạng tốc độ cao. Cụm GPU chạy chung một việc lớn, ví dụ [huấn luyện](01-nen-tang.md#training) một [mô hình](01-nen-tang.md#model). Trong một trung tâm dữ liệu hiện đại, máy chủ dùng trung bình khoảng 60% lượng điện. Phần điện cho làm mát dao động từ khoảng 7% ở cơ sở hiệu quả tới hơn 30% ở cơ sở kém hiệu quả.

**Phân biệt.** Trung tâm dữ liệu là cơ sở vật chất. [Đám mây](#cloud) là dịch vụ cho thuê tài nguyên nằm trong các trung tâm dữ liệu. [AI factory](#ai-factory) là tên tiếp thị cho trung tâm dữ liệu chuyên cho AI.

**Liên quan.** [hyperscaler](#hyperscaler) · [tiêu thụ năng lượng của AI](#ai-energy-use) · [chi phí đầu tư năng lực tính toán](#compute-capex) · [vùng lưu trữ](#region)

**Nguồn.** [1] IEA, "Energy and AI", phần "Energy demand from AI", 2025, https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai, truy cập 2/10/2026 (S1124).

<a id="hyperscaler"></a>
### Hyperscaler — Nhà cung cấp đám mây siêu quy mô

*Mã: hyperscaler · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** nhà cung cấp đám mây siêu quy mô. Dạng chuẩn trong sách: hyperscaler.

**Định nghĩa.** Hyperscaler là một nhà cung cấp [đám mây](#cloud) vận hành nhiều [trung tâm dữ liệu](#data-center) quy mô lớn ở nhiều nước. Khách hàng của hyperscaler có thể tăng hoặc giảm tài nguyên trong vài phút.

**Phân biệt.** Hyperscaler là một loại doanh nghiệp, không phải một loại công nghệ.

**Liên quan.** [đám mây](#cloud) · [chi phí đầu tư năng lực tính toán](#compute-capex)

<a id="compute-capex"></a>
### Compute capex — Chi phí đầu tư năng lực tính toán

*Mã: compute-capex · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Chi phí đầu tư năng lực tính toán là một khoản chi để mua hoặc xây tài sản dài hạn cho [năng lực tính toán](01-nen-tang.md#compute). Ví dụ, tài sản đó là chip, máy chủ, [trung tâm dữ liệu](#data-center) và đường điện.

**Phân biệt.** Khoản này khác [chi phí chạy mô hình](#inference-cost), là khoản chi phát sinh theo mức dùng hằng ngày.

**Liên quan.** [hyperscaler](#hyperscaler) · [trung tâm dữ liệu](#data-center) · [bong bóng AI](12-xa-hoi-va-tuong-lai.md#ai-bubble)

<a id="ai-factory"></a>
### AI factory (thuật ngữ tiếp thị) — Nhà máy AI

*Mã: ai-factory · Chương 11 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** nhà máy AI. Dạng chuẩn trong sách: AI factory.

**Định nghĩa.** AI factory là một tên tiếp thị cho [trung tâm dữ liệu](#data-center) thiết kế riêng cho các việc AI, từ [huấn luyện](01-nen-tang.md#training) tới trả lời yêu cầu.

**Phân biệt.** Bên dùng tên này đo đầu ra bằng số [token](03-kien-truc-mo-hinh.md#token) tạo ra. Về kỹ thuật, AI factory vẫn là một trung tâm dữ liệu có nhiều [GPU](01-nen-tang.md#gpu).

**Thay đổi gần đây.** Tính đến tháng 10/2026, một nhà sản xuất chip lớn dùng tên này trong tài liệu của hãng.

**Liên quan.** [trung tâm dữ liệu](#data-center) · [hyperscaler](#hyperscaler)

<a id="region"></a>
### Region — Vùng lưu trữ

*Mã: region · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Vùng lưu trữ là một khu vực địa lý mà nhà cung cấp [đám mây](#cloud) đặt một nhóm [trung tâm dữ liệu](#data-center). Khách hàng chọn vùng để quyết định nơi lưu và xử lý dữ liệu.

**Phân biệt.** Nơi lưu dữ liệu và nơi [mô hình](01-nen-tang.md#model) xử lý yêu cầu có thể khác nhau. Nghĩa vụ pháp lý về vị trí dữ liệu thuộc [nơi lưu trú dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-residency) và [bản địa hóa dữ liệu](10-phap-ly-quan-tri-chinh-sach.md#data-localization).

**Liên quan.** [đám mây](#cloud) · [ranh giới dữ liệu doanh nghiệp](#enterprise-data-boundary) · [SLA](#sla)

<a id="multi-tenancy"></a>
### Multi-tenancy — Đa thuê bao

*Mã: multi-tenancy · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** đa thuê bao. Dạng chuẩn trong sách: multi-tenancy.

**Định nghĩa.** Multi-tenancy là một kiểu tổ chức hệ thống, trong đó nhiều khách hàng dùng chung máy chủ và phần mềm của [đám mây](#cloud). Phần mềm tách dữ liệu của mỗi khách hàng.

**Phân biệt.** Multi-tenancy khác [triển khai riêng](#private-deployment), trong đó hạ tầng chỉ phục vụ một tổ chức.

**Liên quan.** [đám mây](#cloud) · [triển khai riêng](#private-deployment)

<a id="edge-ai"></a>
### Edge AI — AI tại biên

*Mã: edge-ai · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** AI trên máy (on-device AI). Dạng chuẩn trong sách: AI tại biên.

**Định nghĩa.** AI tại biên là một dạng [triển khai](#deployment) trong đó [mô hình](01-nen-tang.md#model) chạy ngay trên máy của người dùng hoặc máy đặt gần nơi tạo dữ liệu. Ví dụ, máy đó là điện thoại, máy tính hoặc camera.

**Giải thích.** AI tại biên cho [độ trễ](#latency) thấp. Dữ liệu không phải rời khỏi máy. Tính năng vẫn chạy khi mất mạng. Đổi lại, máy của người dùng có ít [năng lực tính toán](01-nen-tang.md#compute) và ít điện hơn máy chủ. Mô hình chạy tại biên cần nhỏ, ví dụ một [SLM](04-llm-va-mo-hinh-sinh.md#slm) hoặc một mô hình đã [lượng tử hóa](03-kien-truc-mo-hinh.md#quantization).

Nhiều máy mới có NPU (neural processing unit). NPU là một chip chuyên cho phép tính của [mạng nơ-ron](01-nen-tang.md#neural-network) và tốn ít điện hơn CPU hoặc [GPU](01-nen-tang.md#gpu) cho cùng việc AI.

**Phân biệt.** AI tại biên khác [học liên kết](09-bao-mat-rieng-tu-xac-thuc.md#federated-learning). AI tại biên nói về nơi [chạy mô hình](01-nen-tang.md#inference). Học liên kết nói về cách [huấn luyện](01-nen-tang.md#training) mô hình trên dữ liệu nằm ở nhiều máy.

**Không nên hiểu là.** Nhãn "AI trên máy" không bảo đảm các bước xử lý đều nằm trên máy. Một tính năng có thể gửi phần việc khó lên [đám mây](#cloud). Kiểm tra tài liệu của sản phẩm để biết dữ liệu đi đâu.

**Liên quan.** [AI PC](#ai-pc) · [SLM](04-llm-va-mo-hinh-sinh.md#slm) · [lượng tử hóa](03-kien-truc-mo-hinh.md#quantization) · [triển khai](#deployment)

**Nguồn.** [1] Microsoft, "Copilot+ PCs developer guide" (Microsoft Learn), cập nhật 17/11/2025, https://learn.microsoft.com/en-us/windows/ai/npu-devices/, truy cập 2/10/2026 (S1123). [2] NTIA, "Dual-Use Foundation Models with Widely Available Model Weights", 2024, https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report/risks-benefits-of-dual-use-foundation-models-with-widely-available-model-weights/competition-innovation-research, truy cập 2/10/2026 (S1108).

<a id="ai-pc"></a>
### AI PC — Máy tính AI

*Mã: ai-pc · Chương 11 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** máy tính AI. Dạng chuẩn trong sách: AI PC.

**Định nghĩa.** AI PC là một tên gọi cho máy tính cá nhân có NPU, tức chip chuyên chạy [mạng nơ-ron](01-nen-tang.md#neural-network) tốn ít điện. Máy này chạy tính năng AI ngay trên máy, theo cách [AI tại biên](#edge-ai).

**Thay đổi gần đây.** Tính đến tháng 10/2026, tài liệu của một hãng hệ điều hành ghi một yêu cầu cho nhiều tính năng AI mới. NPU cần đạt từ 40 nghìn tỷ phép tính mỗi giây (40 TOPS) trở lên.

**Liên quan.** [AI tại biên](#edge-ai) · [chip tăng tốc AI](01-nen-tang.md#accelerator-chip)

<a id="ai-energy-use"></a>
### Energy use of AI — Tiêu thụ năng lượng của AI

*Mã: ai-energy-use · Chương 11 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Tiêu thụ năng lượng của AI là một tổng lượng điện và nước dùng cho các việc AI, gồm [huấn luyện](01-nen-tang.md#training) mô hình và trả lời yêu cầu. Lượng này tính ở các [trung tâm dữ liệu](#data-center) và trên máy của người dùng.

**Giải thích.** Tính đến tháng 10/2026, số liệu của IEA (Cơ quan Năng lượng Quốc tế) như sau:

- Năm 2024, các trung tâm dữ liệu dùng khoảng 415 TWh điện, bằng khoảng 1,5% điện toàn cầu.
- IEA dự báo con số này lên khoảng 950 TWh vào năm 2030, bằng khoảng 3% điện toàn cầu.

Các số này tính cả việc không liên quan tới AI. Số liệu về nước kém thống nhất hơn. Một ước tính có thể chỉ tính nước làm mát, hoặc tính cả nước của nhà máy điện.

**Ví dụ.** Tháng 8/2025, Google công bố số đo cho một [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) văn bản ở mức trung vị trong ứng dụng Gemini. Mỗi prompt như vậy dùng 0,24 Wh điện và 0,26 ml nước. Đây là số do chính hãng tự đo trên hạ tầng của hãng. Số này không đại diện cho hãng khác hoặc cho việc AI nặng hơn.

**Phân biệt.** Năng lượng cho huấn luyện tính một lần cho mỗi [mô hình](01-nen-tang.md#model). Năng lượng cho [chạy mô hình](01-nen-tang.md#inference) lặp lại với mỗi yêu cầu.

**Thay đổi gần đây.** Tháng 4/2026, IEA cập nhật số liệu. Điện của các trung tâm dữ liệu tăng 17% trong năm 2025, lên khoảng 485 TWh.

**Liên quan.** [trung tâm dữ liệu](#data-center) · [chi phí chạy mô hình](#inference-cost) · [AI tại biên](#edge-ai)

**Nguồn.** [1] IEA, "Energy and AI", 2025, https://www.iea.org/reports/energy-and-ai/executive-summary, truy cập 2/10/2026 (S1124). [2] IEA, "Key Questions on Energy and AI", 16/4/2026, https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary, truy cập 2/10/2026 (S1125). [3] P. Li, J. Yang, M. A. Islam, S. Ren, "Making AI Less 'Thirsty': Uncovering and Addressing the Secret Water Footprint of AI Models", bản v5 năm 2025, https://arxiv.org/abs/2304.03271, truy cập 2/10/2026 (S1126). [4] C. Elsworth và cộng sự (Google), "Measuring the environmental impact of delivering AI at Google Scale", 2025, https://arxiv.org/abs/2508.15734, truy cập 2/10/2026 (S1127). [5] R. Kenny (GDSA), "Water use in AI and Data Centres", 2025, https://assets.publishing.service.gov.uk/media/688cb407dc6688ed50878367/Water_use_in_data_centre_and_AI_report.pdf, truy cập 2/10/2026 (S1146).

## 11.5 Loại sản phẩm

<a id="chatbot"></a>
### Chatbot — Chatbot

*Mã: chatbot · Chương 11 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** trợ lý ảo, trợ lý AI (assistant). Dạng chuẩn trong sách: chatbot.

**Định nghĩa.** Chatbot là một ứng dụng trò chuyện với người dùng bằng ngôn ngữ tự nhiên, qua văn bản hoặc giọng nói. Chatbot dựa trên [AI tạo sinh](04-llm-va-mo-hinh-sinh.md#generative-ai) dùng một [LLM](04-llm-va-mo-hinh-sinh.md#llm) để tạo câu trả lời.

**Giải thích.** Một chatbot gồm LLM và các thành phần khác. Ví dụ: [system prompt](05-prompt-ngu-canh-tri-thuc.md#system-prompt), kho tài liệu, bộ lọc an toàn và giao diện. Thị trường dùng 3 tên cho 3 mức sản phẩm:

- Chatbot trả lời trong phạm vi cuộc trò chuyện.
- Trợ lý AI trả lời và làm việc nhỏ cho người dùng, ví dụ soạn email hoặc đặt lịch. Trợ lý AI có thể có [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) về người dùng.
- Sản phẩm [agent](06-agent-va-tu-dong-hoa.md#ai-agent) nhận một mục tiêu, tự chọn các bước và [gọi công cụ](06-agent-va-tu-dong-hoa.md#tool-use) để làm xong việc.

Ba tên này không có định nghĩa chuẩn. Một sản phẩm có thể có cả 3 chế độ.

**Phân biệt.** Chatbot là ứng dụng. LLM là [mô hình](01-nen-tang.md#model) bên trong ứng dụng. Chatbot trả lời, còn agent hành động trong hệ thống khác.

**Không nên hiểu là.** Giọng văn tự tin của chatbot không cho thấy câu trả lời đúng. Câu trả lời có thể sai, xem [ảo giác](04-llm-va-mo-hinh-sinh.md#hallucination).

**Thay đổi gần đây.** Tính đến tháng 10/2026, một số nhà cung cấp [API](#api) bán cả dịch vụ agent được quản lý, không chỉ quyền gọi mô hình.

> **CẢNH BÁO:** Thông báo cho khách hàng rằng khách hàng đang trò chuyện với AI. Một số nơi có luật bắt buộc việc này, xem [luật công khai chatbot](10-phap-ly-quan-tri-chinh-sach.md#chatbot-disclosure-laws).

**Liên quan.** [copilot](#copilot) · [agent](06-agent-va-tu-dong-hoa.md#ai-agent) · [LLM](04-llm-va-mo-hinh-sinh.md#llm) · [luật công khai chatbot](10-phap-ly-quan-tri-chinh-sach.md#chatbot-disclosure-laws)

**Nguồn.** [1] Anthropic, "Building effective agents", 19/12/2024, https://www.anthropic.com/engineering/building-effective-agents, truy cập 2/10/2026 (S013). [2] Anthropic, "API overview" (Claude Platform Docs), https://platform.claude.com/docs/en/api/overview, truy cập 2/10/2026 (S1102).

<a id="copilot"></a>
### Copilot — Trợ lý tích hợp

*Mã: copilot · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** trợ lý tích hợp. Dạng chuẩn trong sách: copilot.

**Định nghĩa.** Copilot là một loại sản phẩm AI gắn vào phần mềm mà người dùng đang dùng để làm việc, ví dụ trình soạn thảo hoặc công cụ lập trình. Copilot gợi ý và làm từng phần việc, còn người dùng quyết định.

**Giải thích.** Copilot lấy nội dung đang mở làm đầu vào, ví dụ đoạn văn hoặc tệp mã. Copilot đưa gợi ý ngay trong giao diện. Người dùng chấp nhận, sửa hoặc bỏ gợi ý. Tên "copilot" (phi công phụ) mô tả vai trò hỗ trợ. Phép so sánh này có giới hạn: phi công phụ có trách nhiệm riêng, còn copilot không chịu trách nhiệm cho kết quả.

**Ví dụ.** Năm 2023, một thử nghiệm có đối chứng giao cho lập trình viên viết một máy chủ web nhỏ. Nhóm dùng GitHub Copilot làm xong nhanh hơn 55,8% so với nhóm không dùng. Kết quả này đo trên một bài tập cụ thể, không đo chất lượng dài hạn của mã.

**Phân biệt.** Copilot khác [agent](06-agent-va-tu-dong-hoa.md#ai-agent). Với copilot, người dùng duyệt từng gợi ý. Agent nhận một mục tiêu và tự làm nhiều bước liên tiếp. Trong lập trình, xem thêm [trợ lý lập trình AI](06-agent-va-tu-dong-hoa.md#ai-pair-programmer) và [agent lập trình](06-agent-va-tu-dong-hoa.md#coding-agent).

**Không nên hiểu là.** "Copilot" là tên một loại sản phẩm và cũng là tên thương mại của một số sản phẩm. Khi đọc hợp đồng hoặc tin tức, xác định văn bản nói về loại sản phẩm hay về một sản phẩm cụ thể.

**Liên quan.** [chatbot](#chatbot) · [agent](06-agent-va-tu-dong-hoa.md#ai-agent) · [trợ lý lập trình AI](06-agent-va-tu-dong-hoa.md#ai-pair-programmer)

**Nguồn.** [1] S. Peng, E. Kalliamvakou, P. Cihon, M. Demirer, "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot", 2023, https://arxiv.org/abs/2302.06590, truy cập 2/10/2026 (S1121).

<a id="enterprise-ai-platform"></a>
### Enterprise AI platform — Nền tảng AI doanh nghiệp

*Mã: enterprise-ai-platform · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Nền tảng AI doanh nghiệp là một bộ dịch vụ trên [đám mây](#cloud) hoặc tại chỗ. Doanh nghiệp truy cập nhiều [mô hình](01-nen-tang.md#model), kết nối dữ liệu nội bộ và xây ứng dụng ở một chỗ.

**Phân biệt.** Một [chợ mô hình](#model-marketplace) chỉ là danh mục để chọn mô hình, còn nền tảng gồm cả công cụ xây và vận hành ứng dụng.

**Liên quan.** [chợ mô hình](#model-marketplace) · [cổng mô hình](#model-gateway) · [ranh giới dữ liệu doanh nghiệp](#enterprise-data-boundary)

<a id="enterprise-data-boundary"></a>
### Enterprise data boundary — Ranh giới dữ liệu doanh nghiệp

*Mã: enterprise-data-boundary · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Ranh giới dữ liệu doanh nghiệp là một cam kết của nhà cung cấp dịch vụ AI. Dữ liệu của doanh nghiệp ở lại trong một phạm vi dịch vụ xác định. Dữ liệu này không dùng để [huấn luyện](01-nen-tang.md#training) [mô hình nền tảng](04-llm-va-mo-hinh-sinh.md#foundation-model).

**Phân biệt.** Đây là cam kết theo hợp đồng, khác nghĩa vụ pháp lý về [nơi lưu trú dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-residency) và [bản địa hóa dữ liệu](10-phap-ly-quan-tri-chinh-sach.md#data-localization).

**Liên quan.** [zero data retention](09-bao-mat-rieng-tu-xac-thuc.md#zero-data-retention) · [triển khai riêng](#private-deployment) · [điều khoản AI trong hợp đồng](10-phap-ly-quan-tri-chinh-sach.md#ai-clause)

## 11.6 Kinh tế AI trong doanh nghiệp

<a id="open-model-economics"></a>
### Open model economics — Kinh tế của mô hình mở và mô hình đóng

*Mã: open-model-economics · Chương 11 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** mô hình mở so với mô hình đóng. Dạng chuẩn trong sách: kinh tế của mô hình mở.

**Định nghĩa.** Kinh tế của mô hình mở là một phép so sánh giữa 2 lựa chọn về chi phí, quyền kiểm soát và rủi ro. Doanh nghiệp tự chạy một [mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights), hoặc trả tiền gọi một mô hình đóng qua [API](#api).

**Giải thích.** Với mô hình mở trọng số, doanh nghiệp tải [trọng số](01-nen-tang.md#weight) về theo [giấy phép mô hình](#model-license). Doanh nghiệp vẫn trả tiền để [chạy mô hình](01-nen-tang.md#inference): phần cứng, điện, kỹ sư và việc cập nhật. Với mô hình đóng, doanh nghiệp không nhận trọng số. Doanh nghiệp trả [giá theo token](#token-pricing), còn nhà cung cấp lo hạ tầng.

| Yếu tố | Tự chạy mô hình mở | Gọi mô hình đóng qua API |
|---|---|---|
| Chi phí ban đầu | Cao: phần cứng, kỹ sư | Thấp: trả theo mức dùng |
| Chi phí khi tải lớn, ổn định | Có thể thấp hơn | Tăng theo số [token](03-kien-truc-mo-hinh.md#token) |
| Dữ liệu | Ở lại hạ tầng của mình | Theo điều khoản của nhà cung cấp |
| Tùy biến | [Tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning) sâu | Theo tính năng của dịch vụ |
| Phiên bản | Tự quyết khi nào đổi | Nhà cung cấp có thể ngừng [mô hình](01-nen-tang.md#model) |

Một doanh nghiệp cũng có thể dùng mô hình mở mà không tự vận hành máy chủ. Doanh nghiệp gọi mô hình mở qua một [nhà cung cấp dịch vụ chạy mô hình](#inference-provider).

**Ví dụ.** Ví dụ giả định: Công ty bảo hiểm Thái Sơn xử lý 50 triệu token hồ sơ mỗi ngày, gồm nhiều dữ liệu cá nhân. Gọi API của một mô hình đóng tốn khoảng 300 triệu đồng mỗi tháng. Tự chạy một mô hình mở tốn khoảng 200 triệu đồng mỗi tháng cho thuê máy chủ [GPU](01-nen-tang.md#gpu), điện và 1 kỹ sư. Công ty kiểm tra chất lượng trên 500 hồ sơ mẫu. Sau đó, công ty chọn mô hình mở để dữ liệu ở lại hạ tầng của công ty.

**Phân biệt.** Mô hình mở trọng số khác [AI mã nguồn mở](03-kien-truc-mo-hinh.md#open-source-ai). Mở trọng số chỉ cho tải trọng số. Theo định nghĩa của OSI, AI mã nguồn mở còn cần quyền dùng cho các mục đích. AI mã nguồn mở cũng cần thông tin về dữ liệu và mã [huấn luyện](01-nen-tang.md#training).

**Không nên hiểu là.** "Mở" không có nghĩa là miễn phí khi dùng. Chi phí chuyển từ tiền trả cho nhà cung cấp sang tiền phần cứng và nhân sự. "Đóng" cũng không có nghĩa là doanh nghiệp không kiểm soát được dữ liệu. Một số nhà cung cấp có [triển khai riêng](#private-deployment) và cam kết [zero data retention](09-bao-mat-rieng-tu-xac-thuc.md#zero-data-retention).

**Giới hạn.** Một phép so sánh chi phí chỉ đúng cho một mức tải và một mức chất lượng cụ thể. Khi giá API giảm hoặc mô hình mới ra đời, kết quả so sánh có thể đổi.

**Thay đổi gần đây.** Tính đến tháng 10/2026, một số dịch vụ cho gọi một mô hình mở trọng số qua nhiều nhà cung cấp dịch vụ. Người dùng có thể đặt dịch vụ chọn nhà cung cấp rẻ nhất hoặc nhanh nhất cho mỗi yêu cầu.

**Liên quan.** [mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights) · [giấy phép mô hình](#model-license) · [phụ thuộc nhà cung cấp](#vendor-lock-in) · [tự xây hay mua](#build-vs-buy) · [chi phí chạy mô hình](#inference-cost)

**Nguồn.** [1] NTIA, "Dual-Use Foundation Models with Widely Available Model Weights", 2024, https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report/risks-benefits-of-dual-use-foundation-models-with-widely-available-model-weights/competition-innovation-research, phần Competition, Innovation, and Research, truy cập 2/10/2026 (S1108). [2] Hugging Face, "Inference Providers" (tài liệu), https://huggingface.co/docs/inference-providers/index, truy cập 2/10/2026 (S1109). [3] Open Source Initiative, "The Open Source AI Definition 1.0", 2024, https://opensource.org/ai/open-source-ai-definition, truy cập 2/10/2026 (S003).

<a id="pricing-models"></a>
### Pricing models — Cách tính giá dịch vụ AI

*Mã: pricing-models · Chương 11 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Cách tính giá dịch vụ AI là một quy tắc mà nhà cung cấp dùng để tính tiền khách hàng. Ba quy tắc chính là tính theo người dùng (seat), theo mức dùng (usage) và theo kết quả (outcome).

**Giải thích.** Ba quy tắc có ưu điểm và nhược điểm khác nhau:

- Theo người dùng: khách hàng trả một khoản cố định cho mỗi tài khoản mỗi tháng. Chi phí dễ dự báo.
- Theo mức dùng: khách hàng trả theo số [token](03-kien-truc-mo-hinh.md#token), số yêu cầu hoặc số tín dụng. Chi phí khớp mức dùng thật nhưng khó dự báo.
- Theo kết quả: khách hàng trả cho mỗi kết quả đã định nghĩa trước. Chi phí phụ thuộc vào định nghĩa "kết quả".

Một sản phẩm có thể kết hợp các quy tắc trên.

**Ví dụ.** Ví dụ giả định: một [agent](06-agent-va-tu-dong-hoa.md#ai-agent) chăm sóc khách hàng có giá 1 USD cho mỗi yêu cầu giải quyết xong. Tháng có 30.000 yêu cầu và agent giải quyết xong 40%, chi phí là 12.000 USD.

**Phân biệt.** [Giá theo token](#token-pricing) là một dạng tính theo mức dùng khi gọi [API](#api). Gói sản phẩm cho người dùng cuối có thể dùng quy tắc khác.

**Thay đổi gần đây.** Tính đến tháng 10/2026, một số sản phẩm agent chăm sóc khách hàng tính giá theo mỗi kết quả, cộng phí theo người dùng cho nhân viên.

> **THẬN TRỌNG:** Đọc định nghĩa "kết quả" và "mức dùng" trong hợp đồng trước khi ký. Định nghĩa rộng có thể làm chi phí cao hơn dự kiến.

**Liên quan.** [giá theo token](#token-pricing) · [chi phí mỗi nhiệm vụ](#cost-per-task) · [ROI của AI](#ai-roi) · [điều khoản AI trong hợp đồng](10-phap-ly-quan-tri-chinh-sach.md#ai-clause)

**Nguồn.** [1] Intercom, "Pricing", https://www.intercom.com/pricing, truy cập 2/10/2026 (S1131). [2] Microsoft, "Microsoft 365 Copilot for enterprise" (trang giá), https://www.microsoft.com/en-us/microsoft-365/copilot/enterprise, truy cập 2/10/2026 (S1132). [3] Anthropic, "Pricing" (Claude Platform Docs), https://platform.claude.com/docs/en/about-claude/pricing, truy cập 2/10/2026 (S1103).

<a id="vendor-lock-in"></a>
### Vendor lock-in — Phụ thuộc nhà cung cấp

*Mã: vendor-lock-in · Chương 11 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Phụ thuộc nhà cung cấp là một tình trạng trong đó doanh nghiệp khó chuyển sang nhà cung cấp khác. Lý do là chi phí, thời gian hoặc rủi ro của việc chuyển quá cao.

**Giải thích.** Với AI, sự phụ thuộc có thể đến từ các nguồn sau:

- [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) và quy trình viết riêng cho một [mô hình](01-nen-tang.md#model),
- [embedding](03-kien-truc-mo-hinh.md#embedding) tạo bằng một mô hình, phải tạo lại khi đổi mô hình,
- mô hình đã [tinh chỉnh](02-du-lieu-va-huan-luyen.md#fine-tuning) chỉ chạy được trong dịch vụ của một nhà cung cấp,
- hợp đồng cam kết chi tiêu dài hạn.

[Mô hình mở trọng số](03-kien-truc-mo-hinh.md#open-weights) giảm một phần rủi ro này, vì doanh nghiệp có thể đổi nơi [chạy mô hình](01-nen-tang.md#inference).

**Giới hạn.** Một [cổng mô hình](#model-gateway) giảm công sức đổi mô hình, nhưng không làm 2 mô hình cho cùng kết quả. Doanh nghiệp vẫn cần [đánh giá](07-danh-gia-va-chat-luong.md#evaluation) lại trước khi đổi.

**Liên quan.** [kinh tế của mô hình mở](#open-model-economics) · [cổng mô hình](#model-gateway) · [tự xây hay mua](#build-vs-buy)

**Nguồn.** [1] NTIA, "Dual-Use Foundation Models with Widely Available Model Weights", 2024, https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report/risks-benefits-of-dual-use-foundation-models-with-widely-available-model-weights/competition-innovation-research, truy cập 2/10/2026 (S1108).

<a id="build-vs-buy"></a>
### Build vs buy — Tự xây hay mua

*Mã: build-vs-buy · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tự xây hay mua là một quyết định giữa 2 lựa chọn. Doanh nghiệp tự phát triển một [hệ thống AI](01-nen-tang.md#ai-system), hoặc mua một sản phẩm AI có sẵn.

**Phân biệt.** Tự xây không có nghĩa là tự [huấn luyện](01-nen-tang.md#training) [mô hình](01-nen-tang.md#model). Một dự án tự xây có thể vẫn gọi mô hình qua [API](#api).

**Liên quan.** [phụ thuộc nhà cung cấp](#vendor-lock-in) · [ROI của AI](#ai-roi) · [kinh tế của mô hình mở](#open-model-economics)

<a id="ai-roi"></a>
### AI return on investment (ROI) — Lợi tức đầu tư vào AI

*Mã: ai-roi · Chương 11 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** lợi tức đầu tư vào AI. Dạng chuẩn trong sách: ROI của AI.

**Định nghĩa.** ROI của AI là một tỷ lệ giữa lợi ích đo được của một dự án AI và tổng chi phí của dự án đó. Chi phí gồm phần mềm, [chi phí chạy mô hình](#inference-cost), nhân sự, đào tạo và thay đổi quy trình.

**Phân biệt.** Số người dùng AI không phải ROI của AI. Một tổ chức có nhiều người dùng vẫn có thể chưa ghi nhận lợi nhuận tăng thêm.

**Liên quan.** [chi phí mỗi nhiệm vụ](#cost-per-task) · [tự xây hay mua](#build-vs-buy) · [bong bóng AI](12-xa-hoi-va-tuong-lai.md#ai-bubble)
