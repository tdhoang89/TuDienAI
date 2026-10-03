---
chapter: 6
title: "Agent và tự động hóa"
file: 06-agent-va-tu-dong-hoa.md
terms: 43
bible_version: "0.2"
version: "0.1"
updated: 2026-10-02
status: review
---

# Chương 6 — Agent và tự động hóa

Chương này giải thích các thuật ngữ về [agent](#ai-agent). Agent là phần mềm dùng LLM để chọn bước làm việc, gọi công cụ và hành động thay người dùng. Người đọc gặp các thuật ngữ này trong tài liệu sản phẩm, hợp đồng dịch vụ và tin tức. Sau chương này, người đọc phân biệt được 3 nhóm vấn đề:

- Agent khác chatbot, quy trình tự động và RPA ở điểm nào.
- Agent làm việc qua các bước nào, với công cụ và giao thức nào.
- Ai cấp quyền, ai kiểm soát và ai chịu trách nhiệm khi agent hành động.

## 6.1 Agent là gì

<a id="ai-agent"></a>
### AI agent — Agent AI

*Mã: ai-agent · Chương 6 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** tác nhân AI, tác tử AI, AI agent. Dạng chuẩn trong sách: agent.

**Định nghĩa.** Agent là một hệ thống phần mềm dùng [LLM](04-llm-va-mo-hinh-sinh.md#llm) để tự chọn bước làm việc và [gọi công cụ](#tool-use) qua nhiều lượt cho đến khi xong một nhiệm vụ. Người dùng giao mục tiêu, không giao từng bước.

**Giải thích.** Các nhà nghiên cứu và nhà phát triển chưa thống nhất về nghĩa của từ "agent". Tài liệu dùng từ này theo 3 cách chính:

- Trong giáo trình AI và [học tăng cường](01-nen-tang.md#reinforcement-learning), agent là thực thể quan sát một [môi trường](#environment) và chọn hành động trong môi trường đó.
- Trong tài liệu kỹ thuật về LLM, agent là hệ thống trong đó LLM tự điều khiển quá trình làm việc và tự chọn công cụ.
- Trong quảng cáo, "agent" có thể chỉ một [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot), một trợ lý AI hoặc một phần mềm tự động hóa cũ được đổi tên.

Sách này dùng nghĩa: một hệ thống trong đó LLM tự chọn bước tiếp theo và công cụ trong một vòng lặp.

Agent chạy theo [vòng lặp agent](#agent-loop) bên trong một [agent harness](#agent-harness). Ở mỗi lượt, LLM chọn gọi một công cụ hoặc trả lời. Vòng lặp dừng khi nhiệm vụ xong, khi gặp lỗi hoặc khi chạm giới hạn số lượt.

**Ví dụ.** Ví dụ giả định. Chị Lan ở Công ty An Bình giao cho một agent việc "Tìm 3 cửa hàng bán giấy in ở Hà Nội và so sánh giá". Agent tự chọn và mở 8 trang web, ghi giá vào bảng tính, rồi gửi bảng cho chị Lan.

**Phân biệt.** Một chatbot trả lời từng câu hỏi. Một agent làm nhiều bước và có thể thay đổi dữ liệu bên ngoài, ví dụ: gửi thư, sửa tệp. Agent cũng khác một quy trình có các bước cố định do kỹ sư viết sẵn (xem [AI có tính agent](#agentic-ai)). Agent khác [RPA](#rpa), vì RPA chạy theo quy tắc cố định.

**Không nên hiểu là.** Agent không phải một [mô hình](01-nen-tang.md#model) riêng. Agent là LLM cộng với công cụ, hướng dẫn và phần mềm điều khiển. "Tự chủ" ở đây chỉ việc phần mềm tự chọn bước, không chỉ ý chí hay tư cách pháp lý. Ai chịu trách nhiệm khi agent hành động là câu hỏi pháp luật, xem [trách nhiệm pháp lý với AI](10-phap-ly-quan-tri-chinh-sach.md#ai-liability).

**Giới hạn.** Agent có thể chọn sai công cụ, lặp vô ích hoặc dừng trước khi xong việc. Một hãng phát triển AI ghi nhận agent của họ dùng khoảng 4 lần số [token](03-kien-truc-mo-hinh.md#token) của một cuộc trò chuyện.

**Thay đổi gần đây.** Tháng 6/2025, Gartner cảnh báo hiện tượng "agent washing". Hiện tượng này là đổi tên chatbot, trợ lý AI và RPA thành agent mà không thêm năng lực agent.

> **CẢNH BÁO:** Cấp cho agent [quyền tối thiểu](09-bao-mat-rieng-tu-xac-thuc.md#least-privilege) cần cho nhiệm vụ. Agent có thể làm sai thao tác trên dữ liệu thật, ví dụ: xóa tệp hoặc gửi thư nhầm người.

**Liên quan.** [AI có tính agent](#agentic-ai) · [gọi công cụ](#tool-use) · [vòng lặp agent](#agent-loop) · [con người trong vòng lặp](#human-in-the-loop) · [MCP](#mcp) · [trách nhiệm pháp lý với AI](10-phap-ly-quan-tri-chinh-sach.md#ai-liability)

**Nguồn.** [1] Anthropic, "Building effective agents", 2024, https://www.anthropic.com/engineering/building-effective-agents, truy cập 2/10/2026 (S013). [2] OpenAI, "A practical guide to building agents", https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf, truy cập 2/10/2026 (S615). [3] Gartner, "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027", 2025, https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027, truy cập 2/10/2026 (S618). [4] Anthropic, "How we built our multi-agent research system", 2025, https://www.anthropic.com/engineering/multi-agent-research-system, truy cập 2/10/2026 (S621).

<a id="agentic-ai"></a>
### Agentic AI — AI có tính agent

*Mã: agentic-ai · Chương 6 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** agentic AI, AI tác tử, hệ thống có tính agent. Dạng chuẩn trong sách: AI có tính agent.

**Định nghĩa.** AI có tính agent là một kiểu thiết kế [hệ thống AI](01-nen-tang.md#ai-system) trong đó [LLM](04-llm-va-mo-hinh-sinh.md#llm) tự chọn bước tiếp theo và công cụ trong lúc chạy. Hệ thống không chỉ làm theo các bước cố định.

**Giải thích.** Tài liệu kỹ thuật dùng cụm từ này theo 2 phạm vi. Ở phạm vi rộng, "hệ thống có tính agent" chỉ các hệ thống kết hợp LLM với công cụ. Ở phạm vi hẹp, cụm từ này chỉ hệ thống mà LLM điều khiển quá trình làm việc. Tính agent là một thang có nhiều mức, không phải một đặc điểm có hoặc không. Sách này dùng nghĩa hẹp, như trong Định nghĩa.

Phạm vi rộng gồm 2 loại. Một quy trình công việc (workflow) chạy theo đường đi do kỹ sư viết sẵn trong mã. LLM chỉ làm một số bước trên đường đi đó. Một [agent](#ai-agent) để LLM tự quyết định số bước, thứ tự bước và công cụ cho từng bước. Agent hợp với bài toán mở, khi không biết trước cần bao nhiêu bước.

Một hướng dẫn của hãng phát triển AI khuyên chọn giải pháp đơn giản nhất trước. Theo hướng dẫn này, nhà phát triển chỉ thêm tính agent khi quy trình cố định không đủ.

**Ví dụ.** Ví dụ giả định. Công ty An Bình nhận thư hỏi của khách hàng. Cách 1 là quy trình công việc. Mã luôn gửi thư cho LLM tóm tắt, rồi luôn lưu bản tóm tắt vào phần mềm quản lý khách hàng. Cách 2 là agent. LLM tự chọn tra đơn hàng, hỏi kho hoặc chuyển thư cho nhân viên, tùy nội dung thư.

**Phân biệt.** Tự động khác tự chủ. Tự động nghĩa là máy chạy các bước mà không cần người bấm từng bước. Tự chủ nghĩa là hệ thống tự chọn bước. Một quy trình có thể tự động hoàn toàn mà không tự chủ. [Chuỗi prompt](05-prompt-ngu-canh-tri-thuc.md#prompt-chaining) là một quy trình công việc, không phải agent.

**Không nên hiểu là.** Không gọi một phần mềm tự động hóa có AI là agent khi phần mềm đó chỉ chạy các bước cố định. Hệ thống có nhiều tính agent hơn không mặc định tốt hơn. Với việc lặp lại, quy trình cố định dễ kiểm thử và dễ dự đoán chi phí hơn.

**Giới hạn.** Tính agent làm tăng số lượt gọi [mô hình](01-nen-tang.md#model), [chi phí chạy mô hình](11-trien-khai-san-pham-kinh-te.md#inference-cost) và [độ trễ](11-trien-khai-san-pham-kinh-te.md#latency). Đường đi của agent thay đổi giữa các lần chạy, nên kiểm thử agent khó hơn kiểm thử quy trình cố định.

**Thay đổi gần đây.** Tháng 6/2025, Gartner ước tính chỉ khoảng 130 trong hàng nghìn nhà bán giải pháp "agentic AI" có năng lực agent thật. Cùng nguồn này dự báo các tổ chức hủy hơn 40% dự án agentic AI trước cuối năm 2027.

**Liên quan.** [agent](#ai-agent) · [mức tự chủ](#autonomy-level) · [điều phối](#orchestration) · [RPA](#rpa) · [chuỗi prompt](05-prompt-ngu-canh-tri-thuc.md#prompt-chaining)

**Nguồn.** [1] Anthropic, "Building effective agents", 2024, https://www.anthropic.com/engineering/building-effective-agents, truy cập 2/10/2026 (S013). [2] OpenAI, "A practical guide to building agents", https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf, truy cập 2/10/2026 (S615). [3] Gartner, "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027", 2025, https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027, truy cập 2/10/2026 (S618).

<a id="agent-loop"></a>
### Agent loop — Vòng lặp agent

*Mã: agent-loop · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** agent loop, run loop. Dạng chuẩn trong sách: vòng lặp agent.

**Định nghĩa.** Vòng lặp agent là một chu trình lặp lại nhiều lần bên trong một [agent](#ai-agent). Ở mỗi vòng, [LLM](04-llm-va-mo-hinh-sinh.md#llm) chọn một hành động, phần mềm chạy hành động đó, rồi trả kết quả cho LLM.

**Giải thích.** Mỗi vòng có 3 bước. [Mô hình](01-nen-tang.md#model) nhận ngữ cảnh gồm mục tiêu và kết quả trước đó. Mô hình tạo ra một yêu cầu [gọi công cụ](#tool-use) hoặc một câu trả lời cuối. [Agent harness](#agent-harness) chạy công cụ và thêm kết quả vào ngữ cảnh.

Vòng lặp dừng khi mô hình trả về câu trả lời cuối, khi xảy ra lỗi, hoặc khi chạm số lượt tối đa. Nhà phát triển đặt số lượt tối đa để giới hạn chi phí và tránh lặp vô hạn. Kết quả thật từ [môi trường](#environment) ở mỗi bước, ví dụ kết quả chạy kiểm thử, cho agent căn cứ để sửa hướng đi.

**Phân biệt.** [ReAct](05-prompt-ngu-canh-tri-thuc.md#react-pattern) là một kỹ thuật [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) xen kẽ bước suy luận và bước hành động. Vòng lặp agent là cơ chế chạy của phần mềm. Một vòng lặp agent có thể dùng mẫu ReAct hoặc không.

**Liên quan.** [agent](#ai-agent) · [gọi công cụ](#tool-use) · [agent harness](#agent-harness) · [thử lại](#retry)

**Nguồn.** [1] OpenAI, "A practical guide to building agents", https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf, truy cập 2/10/2026 (S615). [2] Anthropic, "Building effective agents", 2024, https://www.anthropic.com/engineering/building-effective-agents, truy cập 2/10/2026 (S013).

<a id="environment"></a>
### Environment — Môi trường của agent

*Mã: environment · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Môi trường là phần bên ngoài mà một [agent](#ai-agent) quan sát và tác động tới. Ví dụ: thư mục mã, trình duyệt, cơ sở dữ liệu. Môi trường nhận hành động của agent và trả về trạng thái mới.

**Phân biệt.** Trong [học tăng cường](01-nen-tang.md#reinforcement-learning), môi trường còn trả về phần thưởng cho mỗi hành động.

**Liên quan.** [không gian hành động](#action-space) · [episode](#episode) · [sandbox](#sandbox-co-lap)

<a id="action-space"></a>
### Action space — Không gian hành động

*Mã: action-space · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Không gian hành động là tập hợp các hành động mà một [agent](#ai-agent) được phép chọn trong một [môi trường](#environment). Với agent trong sách này, không gian hành động gồm các công cụ có sẵn và giá trị đầu vào hợp lệ.

**Phân biệt.** Không gian hành động rộng cho agent làm được nhiều việc hơn, và cũng mở rộng phạm vi rủi ro.

**Liên quan.** [môi trường](#environment) · [gọi công cụ](#tool-use) · [quyền tối thiểu](09-bao-mat-rieng-tu-xac-thuc.md#least-privilege)

<a id="episode"></a>
### Episode — Lượt tương tác

*Mã: episode · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** lượt chạy, trial. Dạng chuẩn trong sách: episode.

**Định nghĩa.** Episode là một lượt chạy trọn vẹn của một [agent](#ai-agent) trong một [môi trường](#environment). Episode bắt đầu từ trạng thái đầu và kết thúc khi nhiệm vụ xong, thất bại hoặc chạm giới hạn số bước.

**Phân biệt.** Episode là lượt chạy. [Quỹ đạo agent](#trajectory) là bản ghi các bước trong lượt chạy đó.

**Liên quan.** [môi trường](#environment) · [quỹ đạo agent](#trajectory) · [đánh giá agent](#agent-evaluation)

<a id="trajectory"></a>
### Trajectory — Quỹ đạo agent

*Mã: trajectory · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** trajectory, transcript, trace. Dạng chuẩn trong sách: quỹ đạo agent.

**Định nghĩa.** Quỹ đạo agent là bản ghi đầy đủ một lượt chạy của một [agent](#ai-agent). Bản ghi gồm các yêu cầu [gọi công cụ](#tool-use), kết quả công cụ, kết quả trung gian và câu trả lời cuối.

**Phân biệt.** Quỹ đạo agent ghi đường đi. Kết quả cuối là trạng thái của [môi trường](#environment) sau lượt chạy.

**Liên quan.** [episode](#episode) · [đánh giá agent](#agent-evaluation) · [khả năng quan sát](11-trien-khai-san-pham-kinh-te.md#observability)

<a id="planning"></a>
### Planning — Lập kế hoạch

*Mã: planning · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** task decomposition, chia nhỏ nhiệm vụ. Dạng chuẩn trong sách: lập kế hoạch.

**Định nghĩa.** Lập kế hoạch là bước trong đó một [agent](#ai-agent) chia một mục tiêu lớn thành các bước nhỏ. Agent cũng chọn thứ tự làm các bước, trước hoặc trong lúc làm việc.

**Giải thích.** Một khảo sát năm 2024 chia nghiên cứu về lập kế hoạch của agent dùng [LLM](04-llm-va-mo-hinh-sinh.md#llm) thành 5 hướng:

- chia nhỏ nhiệm vụ
- chọn kế hoạch
- dùng mô-đun bên ngoài
- [tự rà soát](05-prompt-ngu-canh-tri-thuc.md#reflection)
- dùng [bộ nhớ của agent](#agent-memory).

Kế hoạch có thể nằm trong văn bản [mô hình](01-nen-tang.md#model) tạo ra, hoặc trong một tệp danh sách việc mà agent cập nhật. Agent có thể sửa kế hoạch khi kết quả của một bước khác dự kiến.

**Phân biệt.** Lập kế hoạch khác [điều phối](#orchestration). Lập kế hoạch quyết định cần làm bước nào. Điều phối quyết định thành phần nào làm bước đó và chuyển kết quả giữa các thành phần.

**Không nên hiểu là.** Một kế hoạch trông hợp lý không bảo đảm kế hoạch đúng, và không bảo đảm agent làm đúng kế hoạch.

**Liên quan.** [agent](#ai-agent) · [điều phối](#orchestration) · [tự rà soát](05-prompt-ngu-canh-tri-thuc.md#reflection) · [nhiệm vụ dài hạn](#long-horizon-task)

**Nguồn.** [1] Huang et al., "Understanding the planning of LLM agents: A survey", 2024, https://arxiv.org/abs/2402.02716, truy cập 2/10/2026 (S644).

<a id="agent-memory"></a>
### Agent memory — Bộ nhớ của agent

*Mã: agent-memory · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** agent memory, state, trạng thái của agent. Dạng chuẩn trong sách: bộ nhớ của agent.

**Định nghĩa.** Bộ nhớ của agent là thông tin một [agent](#ai-agent) lưu ngoài [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) để dùng lại ở bước sau hoặc phiên sau. Ví dụ: ghi chú tiến độ, danh sách việc, trạng thái nhiệm vụ.

**Giải thích.** Bộ nhớ của agent gồm 2 phần. Trạng thái (state) là dữ liệu của lượt chạy đang diễn ra: các bước đã xong, kết quả công cụ, giá trị trung gian. Bộ nhớ lâu hơn là tệp hoặc cơ sở dữ liệu mà agent đọc lại ở phiên sau.

Agent ghi bộ nhớ bằng công cụ, ví dụ: ghi một tệp ghi chú. Ở phiên sau, [agent harness](#agent-harness) đưa nội dung tệp vào ngữ cảnh. [Mô hình](01-nen-tang.md#model) không tự giữ thông tin giữa các phiên. [Trọng số](01-nen-tang.md#weight) của mô hình không đổi khi agent ghi bộ nhớ.

**Phân biệt.** [Bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) của trợ lý AI lưu thông tin về người dùng qua nhiều cuộc trò chuyện. Bộ nhớ của agent lưu thông tin về nhiệm vụ. Cả hai khác kiến thức nằm trong [tham số](01-nen-tang.md#parameter) của mô hình.

**Liên quan.** [bộ nhớ](05-prompt-ngu-canh-tri-thuc.md#memory) · [nén ngữ cảnh](05-prompt-ngu-canh-tri-thuc.md#context-compaction) · [agent harness](#agent-harness) · [nhiệm vụ dài hạn](#long-horizon-task)

**Nguồn.** [1] Anthropic, "Effective context engineering for AI agents", 2025, https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, truy cập 2/10/2026 (S623). [2] Anthropic, "Effective harnesses for long-running agents", 2025, https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents, truy cập 2/10/2026 (S625).

<a id="agent-harness"></a>
### Agent harness — Khung chạy agent

*Mã: agent-harness · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** scaffold, khung chạy agent. Dạng chuẩn trong sách: agent harness.

**Định nghĩa.** Agent harness là phần mềm bao quanh một [LLM](04-llm-va-mo-hinh-sinh.md#llm) để LLM làm việc như một [agent](#ai-agent). Harness nhận đầu vào, chạy công cụ, quản lý ngữ cảnh và trả kết quả về cho LLM.

**Giải thích.** [Mô hình](01-nen-tang.md#model) chỉ tạo ra văn bản. Harness làm các việc còn lại. Harness giữ danh sách công cụ, chạy công cụ, kiểm tra quyền, lưu trạng thái và dừng vòng lặp. Với nhiệm vụ dài, harness có thể [nén ngữ cảnh](05-prompt-ngu-canh-tri-thuc.md#context-compaction) hoặc ghi tệp tiến độ để phiên sau làm tiếp.

Thiết kế harness ảnh hưởng tới kết quả. Một nghiên cứu năm 2024 thiết kế một bộ công cụ riêng cho [agent lập trình](#coding-agent). Trên một [benchmark](07-danh-gia-va-chat-luong.md#benchmark) sửa lỗi, bộ công cụ này làm tăng tỷ lệ sửa lỗi thành công so với khi agent chỉ dùng cửa sổ dòng lệnh thông thường.

**Phân biệt.** Agent harness chạy agent để làm việc. [Eval harness](07-danh-gia-va-chat-luong.md#eval-harness) chạy nhiều nhiệm vụ thử để chấm điểm agent hoặc mô hình.

**Liên quan.** [vòng lặp agent](#agent-loop) · [bộ nhớ của agent](#agent-memory) · [cổng phê duyệt](#permission) · [eval harness](07-danh-gia-va-chat-luong.md#eval-harness)

**Nguồn.** [1] Anthropic, "Demystifying evals for AI agents", 2026, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, truy cập 2/10/2026 (S633). [2] Anthropic, "Effective harnesses for long-running agents", 2025, https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents, truy cập 2/10/2026 (S625). [3] Yang et al., "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering", 2024, https://arxiv.org/abs/2405.15793, truy cập 2/10/2026 (S631).

<a id="autonomy-level"></a>
### Autonomy level — Mức tự chủ

*Mã: autonomy-level · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Mức tự chủ là mức độ một [agent](#ai-agent) được hành động mà không cần con người quyết định từng bước.

**Giải thích.** Một đề xuất năm 2025 chia mức tự chủ theo vai trò của người dùng, từ thấp đến cao:

- Người vận hành: người dùng điều khiển, agent hỗ trợ khi được yêu cầu.
- Người cộng tác: người dùng và agent cùng [lập kế hoạch](#planning) và cùng làm.
- Người tư vấn: agent dẫn việc, người dùng góp ý và đổi hướng qua tin nhắn.
- Người phê duyệt: agent tự làm, người dùng chỉ xử lý điểm vướng và duyệt thao tác quan trọng.
- Người quan sát: agent tự làm, người dùng theo dõi nhật ký và giữ [công tắc ngắt](08-an-toan-va-alignment.md#kill-switch).

Các tác giả xem mức tự chủ là một lựa chọn thiết kế, tách khỏi năng lực của agent.

**Phân biệt.** Mức tự chủ khác năng lực. Một agent có năng lực cao vẫn có thể chạy ở mức tự chủ thấp, khi người dùng duyệt từng bước. [Con người trong vòng lặp](#human-in-the-loop) là cách thiết kế giữ người ở các mức thấp và trung bình.

**Không nên hiểu là.** Mức tự chủ cao hơn không có nghĩa là agent tốt hơn hay đáng tin hơn.

**Liên quan.** [con người trong vòng lặp](#human-in-the-loop) · [cổng phê duyệt](#permission) · [AI có tính agent](#agentic-ai)

**Nguồn.** [1] Feng, McDonald, Zhang, "Levels of Autonomy for AI Agents", 2025, https://arxiv.org/abs/2506.12469, truy cập 2/10/2026 (S627).

<a id="long-horizon-task"></a>
### Long-horizon task — Nhiệm vụ dài hạn

*Mã: long-horizon-task · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Nhiệm vụ dài hạn là một nhiệm vụ cần nhiều bước nối tiếp. Một người có chuyên môn cần nhiều giờ để làm nhiệm vụ này. Một [agent](#ai-agent) làm nhiệm vụ này phải giữ mục tiêu và tiến độ qua nhiều lượt và nhiều phiên.

**Phân biệt.** Nhiệm vụ dài hạn nói về độ dài của việc, không nói về việc agent [chạy nền](#background-agent) hay chạy trước mặt người dùng.

**Liên quan.** [bộ nhớ của agent](#agent-memory) · [agent harness](#agent-harness) · [nén ngữ cảnh](05-prompt-ngu-canh-tri-thuc.md#context-compaction)

<a id="rpa"></a>
### Robotic process automation (RPA) — Tự động hóa quy trình bằng robot phần mềm

*Mã: rpa · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** robotic process automation, robot phần mềm. Dạng chuẩn trong sách: RPA.

**Định nghĩa.** RPA là một loại phần mềm tự động hóa làm lại các thao tác của người trên máy tính theo kịch bản viết sẵn. Ví dụ: nhập dữ liệu, điền biểu mẫu, chuyển tệp.

**Phân biệt.** RPA làm theo kịch bản cố định. [Agent](#ai-agent) dùng [LLM](04-llm-va-mo-hinh-sinh.md#llm) để chọn bước và xử lý được đầu vào không theo mẫu.

**Liên quan.** [agent](#ai-agent) · [AI có tính agent](#agentic-ai) · [computer use](#computer-use)

<a id="digital-worker"></a>
### Digital worker (thuật ngữ tiếp thị) — Nhân viên số

*Mã: digital-worker · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** nhân viên số, lao động số, digital labor. Dạng chuẩn trong sách: digital worker.

**Định nghĩa.** Digital worker là một thuật ngữ tiếp thị chỉ một [agent](#ai-agent) hoặc một phần mềm tự động hóa được giới thiệu như một nhân viên. Thuật ngữ này mô tả cách bán sản phẩm, không mô tả một kỹ thuật riêng.

**Phân biệt.** Một digital worker có thể là agent, [RPA](#rpa) hoặc [chatbot](11-trien-khai-san-pham-kinh-te.md#chatbot). Người mua cần hỏi phần mềm làm các bước nào và với quyền nào.

**Liên quan.** [agent](#ai-agent) · [RPA](#rpa) · [AI có tính agent](#agentic-ai)

## 6.2 Công cụ và giao thức

<a id="tool-use"></a>
### Tool use — Gọi công cụ

*Mã: tool-use · Chương 6 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** tool use, function calling, tool calling, gọi hàm. Dạng chuẩn trong sách: gọi công cụ.

**Định nghĩa.** Gọi công cụ là một cơ chế trong đó [LLM](04-llm-va-mo-hinh-sinh.md#llm) tạo ra một yêu cầu có cấu trúc để ứng dụng chạy một chức năng bên ngoài. Ứng dụng chạy chức năng đó rồi gửi kết quả lại cho LLM.

**Giải thích.** Gọi công cụ có 4 bước:

- Nhà phát triển mô tả từng công cụ cho mô hình: tên, mục đích và các trường đầu vào.
- Mô hình chọn công cụ hợp với yêu cầu và trả về tên công cụ cùng giá trị đầu vào.
- Ứng dụng kiểm tra yêu cầu, chạy công cụ và gửi kết quả lại cho mô hình.
- Mô hình dùng kết quả để trả lời, hoặc tạo yêu cầu gọi công cụ tiếp theo.

[Mô hình](01-nen-tang.md#model) không tự chạy công cụ. Mô hình chỉ tạo ra văn bản mô tả lời gọi. Với công cụ do nhà phát triển tự định nghĩa, ứng dụng của nhà phát triển chạy công cụ. Một số hãng phát triển AI chạy sẵn vài công cụ trên máy chủ của họ, ví dụ: tìm kiếm web.

Công cụ có thể đọc dữ liệu, ví dụ: tra tỷ giá. Công cụ cũng có thể thay đổi dữ liệu, ví dụ: gửi thư, tạo đơn hàng. Công cụ thay đổi dữ liệu cần kiểm soát chặt hơn.

**Ví dụ.** Ví dụ giả định. Anh Minh hỏi trợ lý AI của một ngân hàng: "Tỷ giá USD hôm nay là bao nhiêu?". Mô hình trả về lời gọi công cụ "lay_ty_gia" với đầu vào "USD". Ứng dụng của ngân hàng tra hệ thống tỷ giá và gửi con số về cho mô hình. Mô hình tạo câu trả lời có con số đó.

**Phân biệt.** Gọi công cụ có 3 vai trò riêng. Mô hình đề xuất lời gọi. Ứng dụng hoặc [agent harness](#agent-harness) chạy lời gọi. Cấu hình quyền quyết định lời gọi nào được chạy. Gọi công cụ cũng khác [đầu ra có cấu trúc](05-prompt-ngu-canh-tri-thuc.md#structured-output). Đầu ra có cấu trúc chỉ quy định dạng câu trả lời, không chạy chức năng nào.

**Không nên hiểu là.** Công cụ có trong danh sách hoặc trong [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) không có nghĩa là công cụ đó được phép chạy. Quyền chạy với từng đầu vào nằm ở cấu hình của ứng dụng. Một công cụ cũng khác một [kỹ năng agent](#agent-skill) và khác một [agent](#ai-agent). Công cụ làm một thao tác. Kỹ năng agent hướng dẫn cả một loại việc. Agent chọn và kết hợp nhiều công cụ.

**Giới hạn.** Mô hình có thể chọn sai công cụ, điền sai giá trị đầu vào, hoặc gọi công cụ khi không cần. Kết quả công cụ có thể chứa lệnh độc hại do bên thứ ba cài vào. Tên của kiểu tấn công này là [prompt injection gián tiếp](09-bao-mat-rieng-tu-xac-thuc.md#indirect-prompt-injection).

> **THẬN TRỌNG:** Kiểm tra giá trị đầu vào trước khi ứng dụng chạy công cụ. Mô hình có thể tạo ra giá trị sai hoặc nguy hiểm.

**Liên quan.** [agent](#ai-agent) · [vòng lặp agent](#agent-loop) · [MCP](#mcp) · [chạy mã](#code-execution) · [đầu ra có cấu trúc](05-prompt-ngu-canh-tri-thuc.md#structured-output) · [API](11-trien-khai-san-pham-kinh-te.md#api)

**Nguồn.** [1] Anthropic, "Tool use with Claude", https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, truy cập 2/10/2026 (S616). [2] OpenAI, "Function calling", https://developers.openai.com/api/docs/guides/function-calling, truy cập 2/10/2026 (S617).

<a id="mcp"></a>
### Model Context Protocol (MCP) — Giao thức ngữ cảnh mô hình

*Mã: mcp · Chương 6 · Mức 1 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** Model Context Protocol, giao thức ngữ cảnh mô hình. Dạng chuẩn trong sách: MCP.

**Định nghĩa.** MCP là một giao thức mở quy định cách một ứng dụng dùng [LLM](04-llm-va-mo-hinh-sinh.md#llm) kết nối với nguồn dữ liệu và công cụ bên ngoài theo một chuẩn chung.

**Giải thích.** MCP có 3 bên:

- Host là ứng dụng AI mà người dùng làm việc trực tiếp.
- Client là thành phần trong host, và mỗi client kết nối với đúng một server.
- Server là chương trình cho dữ liệu và công cụ, chạy trên máy người dùng hoặc trên Internet.

Server cho 3 loại nội dung: tài nguyên (dữ liệu và ngữ cảnh), [mẫu prompt](05-prompt-ngu-canh-tri-thuc.md#prompt-template) và công cụ. [Mô hình](01-nen-tang.md#model) dùng công cụ qua cơ chế [gọi công cụ](#tool-use). Server có thể đề nghị host hỏi thêm thông tin của người dùng.

MCP không tự cấp quyền. Đặc tả yêu cầu host xin đồng ý rõ ràng của người dùng trước khi chia sẻ dữ liệu và trước khi gọi công cụ. Đặc tả cũng ghi rõ giao thức không tự cưỡng chế các nguyên tắc này. Ứng dụng phải tự xây bước xin đồng ý và kiểm soát truy cập. Theo thiết kế, server không đọc được toàn bộ cuộc trò chuyện.

**Ví dụ.** Ví dụ giả định. Công ty An Bình cài một MCP server nối với phần mềm hóa đơn. Chị Lan hỏi trợ lý AI: "Tháng 9 có bao nhiêu hóa đơn quá hạn?". Trợ lý gọi công cụ của server qua client, nhận danh sách và tóm tắt cho chị Lan.

**Phân biệt.** Một [API](11-trien-khai-san-pham-kinh-te.md#api) là cửa giao tiếp của một phần mềm cụ thể. MCP là quy ước chung để ứng dụng AI dùng nhiều nguồn dữ liệu và API khác nhau. Một MCP server có thể bọc một API có sẵn. MCP nối [agent](#ai-agent) với công cụ, còn [A2A](#a2a) nối các agent độc lập với nhau.

**Không nên hiểu là.** Một công cụ có trên MCP server không có nghĩa là ứng dụng đã cho phép dùng công cụ đó. Mô tả công cụ do server gửi có thể sai hoặc độc hại. Đặc tả coi mô tả này là không đáng tin, trừ khi server đáng tin.

**Giới hạn.** MCP chuẩn hóa cách kết nối, không bảo đảm server an toàn hay dữ liệu đúng. Mỗi server thêm vào mở thêm một đường cho [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection).

**Thay đổi gần đây.** Tháng 11/2024, Anthropic công bố MCP. Tháng 12/2025, MCP thành dự án của Agentic AI Foundation thuộc Linux Foundation. Ngày 28/7/2026, bản đặc tả 2026-07-28 chuyển lõi giao thức sang dạng không lưu trạng thái và đưa 3 tính năng Roots, Sampling, Logging vào diện ngừng dần.

> **CẢNH BÁO:** Chỉ cài MCP server từ nguồn tin cậy và kiểm tra quyền của từng server. Một server độc hại có thể [đánh cắp dữ liệu](09-bao-mat-rieng-tu-xac-thuc.md#data-exfiltration) hoặc chạy lệnh ngoài ý muốn.

**Liên quan.** [gọi công cụ](#tool-use) · [A2A](#a2a) · [connector](#connector) · [API](11-trien-khai-san-pham-kinh-te.md#api) · [ghim phiên bản](11-trien-khai-san-pham-kinh-te.md#version-pinning) · [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection)

**Nguồn.** [1] Model Context Protocol, "Specification" (phiên bản 2026-07-28), 2026, https://modelcontextprotocol.io/specification/2026-07-28, truy cập 2/10/2026 (S601). [2] Model Context Protocol, "Architecture" (phiên bản 2026-07-28), 2026, https://modelcontextprotocol.io/specification/2026-07-28/architecture, truy cập 2/10/2026 (S646). [3] Model Context Protocol, "Tools" (phiên bản 2026-07-28), 2026, https://modelcontextprotocol.io/specification/2026-07-28/server/tools, truy cập 2/10/2026 (S602). [4] Model Context Protocol, "MCP specification 2026-07-28 release", 2026, https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/blog/content/posts/2026-07-28-spec-ga/index.md, truy cập 2/10/2026 (S010). [5] Linux Foundation, "Linux Foundation Announces the Formation of the Agentic AI Foundation (AAIF)", 2025, https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation, truy cập 2/10/2026 (S605). [6] Anthropic, "Introducing the Model Context Protocol", 2024, https://www.anthropic.com/news/model-context-protocol, truy cập 2/10/2026 (S647).

<a id="a2a"></a>
### Agent2Agent protocol (A2A) — Giao thức Agent2Agent

*Mã: a2a · Chương 6 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** Agent2Agent protocol, Agent-to-Agent protocol, giao thức Agent2Agent. Dạng chuẩn trong sách: A2A.

**Định nghĩa.** A2A là một giao thức mở cho các [agent](#ai-agent) độc lập làm việc với nhau, kể cả khi các agent do các bên khác nhau xây dựng. Qua A2A, agent công bố năng lực, giao việc và trao đổi kết quả.

**Giải thích.** A2A có 2 bên. A2A client là ứng dụng hoặc agent gửi yêu cầu thay người dùng. A2A server, còn tên là agent từ xa, nhận và xử lý nhiệm vụ (task).

Mỗi A2A server công bố một Agent Card. Agent Card là tệp mô tả năng lực, địa chỉ dịch vụ và yêu cầu xác thực của agent. Agent từ xa trả về sản phẩm, ví dụ: tài liệu, dữ liệu có cấu trúc. Agent không cần cho agent khác xem trạng thái nội bộ hay công cụ của mình. Đặc tả có một phần riêng về xác thực và phân quyền.

**Phân biệt.** [MCP](#mcp) nối một agent với công cụ và dữ liệu. A2A nối các agent với nhau. 2 giao thức bổ sung cho nhau.

**Thay đổi gần đây.** Tháng 4/2025, Google công bố A2A. Tháng 8/2026, A2A thành dự án của Agentic AI Foundation, cùng nơi quản lý MCP. Tính đến tháng 10/2026, phiên bản phát hành sau cùng của đặc tả A2A là 1.0.0.

**Liên quan.** [MCP](#mcp) · [hệ thống nhiều agent](#multi-agent-system) · [agent con](#sub-agent)

**Nguồn.** [1] A2A Project, "Agent2Agent (A2A) Protocol Specification" (phiên bản 1.0.0), 2026, https://a2a-protocol.org/v1.0.0/specification/, truy cập 2/10/2026 (S603). [2] Google for Developers, "Announcing the Agent2Agent Protocol (A2A)", 2025, https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/, truy cập 2/10/2026 (S604). [3] Axios, "Google's A2A protocol gets a new home", 2026, https://www.axios.com/2026/08/17/a2a-agentic-ai-foundation-open-ai-standards, truy cập 2/10/2026 (S606).

<a id="connector"></a>
### Connector — Trình kết nối

*Mã: connector · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** trình kết nối. Dạng chuẩn trong sách: connector.

**Định nghĩa.** Connector là một thành phần nối một ứng dụng AI với một dịch vụ bên ngoài, ví dụ: hộp thư, lịch, kho tài liệu. Connector cho [agent](#ai-agent) đọc dữ liệu hoặc gọi chức năng của dịch vụ đó.

**Phân biệt.** Connector cho quyền truy cập dữ liệu. [Kỹ năng agent](#agent-skill) cho hướng dẫn làm việc. Trong đặc tả [MCP](#mcp), client là connector nằm trong ứng dụng host.

**Liên quan.** [MCP](#mcp) · [gọi công cụ](#tool-use) · [kỹ năng agent](#agent-skill)

<a id="agent-skill"></a>
### Agent skill — Kỹ năng của agent

*Mã: agent-skill · Chương 6 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** skill, skills file, kỹ năng của agent. Dạng chuẩn trong sách: kỹ năng agent.

**Định nghĩa.** Kỹ năng agent là một thư mục chứa hướng dẫn, tập lệnh và tài liệu cho một loại việc. [Agent](#ai-agent) chỉ nạp toàn bộ nội dung kỹ năng vào ngữ cảnh khi việc đó cần.

**Phân biệt.** Một công cụ làm một thao tác. Kỹ năng agent hướng dẫn agent làm cả một loại việc, có thể bằng nhiều công cụ.

**Thay đổi gần đây.** Tính đến tháng 10/2026, đặc tả mở Agent Skills quy định mỗi kỹ năng có một tệp SKILL.md, với tên và mô tả bắt buộc.

**Liên quan.** [gọi công cụ](#tool-use) · [connector](#connector) · [kỹ thuật ngữ cảnh](05-prompt-ngu-canh-tri-thuc.md#context-engineering)

<a id="tool-search"></a>
### Tool search — Tìm kiếm công cụ

*Mã: tool-search · Chương 6 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Định nghĩa.** Tìm kiếm công cụ là một cơ chế cho [agent](#ai-agent) tìm và nạp định nghĩa công cụ khi cần. Agent không phải đưa định nghĩa của tất cả công cụ vào [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) từ đầu.

**Phân biệt.** Tìm kiếm công cụ tìm công cụ để gọi, không tìm thông tin trên web.

**Thay đổi gần đây.** Tháng 11/2025, một hãng phát triển AI đưa tìm kiếm công cụ vào [API](11-trien-khai-san-pham-kinh-te.md#api) của họ, cho phép đặt tới 10.000 công cụ chờ tìm.

**Liên quan.** [gọi công cụ](#tool-use) · [MCP](#mcp) · [ngân sách token](05-prompt-ngu-canh-tri-thuc.md#token-budget)

<a id="code-execution"></a>
### Code execution — Chạy mã

*Mã: code-execution · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** code execution, code interpreter. Dạng chuẩn trong sách: chạy mã.

**Định nghĩa.** Chạy mã là một loại [gọi công cụ](#tool-use) trong đó mô hình viết một đoạn chương trình. Ứng dụng chạy đoạn chương trình đó và trả kết quả về cho mô hình.

**Giải thích.** Chạy mã giúp [mô hình](01-nen-tang.md#model) làm các việc cần tính toán chính xác. Ví dụ: cộng số liệu trong bảng, vẽ biểu đồ, đổi định dạng tệp. Mô hình tạo ra mã, còn một máy tính thật chạy mã. Nhà phát triển chạy mã trong [sandbox](#sandbox-co-lap) để giới hạn tệp và mạng mà mã chạm tới. Một số dịch vụ chặn hẳn truy cập Internet từ sandbox chạy mã.

**Phân biệt.** Chạy mã khác [mô hình sinh mã](04-llm-va-mo-hinh-sinh.md#code-model). Mô hình sinh mã chỉ tạo ra mã. Chạy mã là bước thực thi mã và nhận kết quả.

**Không nên hiểu là.** Kết quả chạy mã đúng với đoạn mã đã chạy. Kết quả này không bảo đảm đoạn mã đúng với yêu cầu.

> **THẬN TRỌNG:** Chạy mã do mô hình tạo ra bên trong sandbox. Mã có thể xóa tệp hoặc gửi dữ liệu ra ngoài.

**Liên quan.** [gọi công cụ](#tool-use) · [sandbox](#sandbox-co-lap) · [agent lập trình](#coding-agent)

**Nguồn.** [1] Anthropic, "Code execution tool", https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool, truy cập 2/10/2026 (S636).

<a id="idempotent-tool"></a>
### Idempotent tool — Công cụ lũy đẳng

*Mã: idempotent-tool · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Công cụ lũy đẳng là một công cụ cho cùng một kết quả cuối khi được gọi một lần hay nhiều lần với cùng đầu vào. Ví dụ: "đặt trạng thái đơn hàng là đã giao" là lũy đẳng, "gửi một thư" thì không.

**Phân biệt.** Gọi lại một công cụ không lũy đẳng có thể gửi thư hoặc trừ tiền 2 lần.

**Liên quan.** [thử lại](#retry) · [gọi công cụ](#tool-use) · [agent](#ai-agent)

<a id="retry"></a>
### Retry — Thử lại

*Mã: retry · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** retry, timeout, hết thời gian chờ. Dạng chuẩn trong sách: thử lại.

**Định nghĩa.** Thử lại là việc phần mềm gửi lại một yêu cầu, ví dụ một yêu cầu [gọi công cụ](#tool-use), sau một lần gọi lỗi. Lỗi có thể là hết thời gian chờ (timeout). Timeout là thời gian tối đa phần mềm chờ kết quả.

**Phân biệt.** Khi hết thời gian chờ, phần mềm không biết công cụ đã chạy hay chưa. Thử lại tự động an toàn nhất với [công cụ lũy đẳng](#idempotent-tool).

**Liên quan.** [công cụ lũy đẳng](#idempotent-tool) · [vòng lặp agent](#agent-loop) · [giới hạn tần suất](11-trien-khai-san-pham-kinh-te.md#rate-limit)

## 6.3 Loại agent

<a id="multi-agent-system"></a>
### Multi-agent system — Hệ thống nhiều agent

*Mã: multi-agent-system · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** multi-agent system, MAS, hệ đa agent. Dạng chuẩn trong sách: hệ thống nhiều agent.

**Định nghĩa.** Hệ thống nhiều agent là một hệ thống trong đó từ 2 [agent](#ai-agent) trở lên cùng làm một nhiệm vụ. Mỗi agent có hướng dẫn và công cụ riêng, và các agent trao đổi kết quả với nhau.

**Giải thích.** Một hướng dẫn của hãng phát triển AI mô tả 2 mẫu. Trong mẫu quản lý, một agent chính chia việc, giao cho các [agent con](#sub-agent), rồi gộp kết quả. Trong mẫu phân tán, các agent chuyển việc cho nhau theo chuyên môn.

Nhiều agent cho phép làm song song và tách ngữ cảnh của từng phần việc. Đổi lại, chi phí tăng. Một nhà phát triển ghi nhận hệ thống nhiều agent của họ dùng khoảng 15 lần số [token](03-kien-truc-mo-hinh.md#token) của một cuộc trò chuyện.

**Phân biệt.** Nhiều agent không mặc định tốt hơn một agent. Một nghiên cứu năm 2025 ghi nhận mức cải thiện so với một agent trên các [benchmark](07-danh-gia-va-chat-luong.md#benchmark) phổ biến thường nhỏ. Nghiên cứu này liệt kê 14 kiểu lỗi, ví dụ: lỗi phối hợp giữa các agent, lỗi kiểm tra kết quả. "Expert" trong [MoE](03-kien-truc-mo-hinh.md#moe) là một phần bên trong một mô hình, không phải một agent.

**Không nên hiểu là.** Nhiều lượt kiểm tra lẫn nhau giữa các agent dùng cùng một [mô hình](01-nen-tang.md#model) không phải kiểm tra độc lập. Việc cần chung ngữ cảnh, hoặc có nhiều phụ thuộc giữa các bước, ít hợp với nhiều agent.

**Liên quan.** [điều phối](#orchestration) · [agent con](#sub-agent) · [A2A](#a2a) · [chi phí mỗi nhiệm vụ](11-trien-khai-san-pham-kinh-te.md#cost-per-task)

**Nguồn.** [1] OpenAI, "A practical guide to building agents", https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf, truy cập 2/10/2026 (S615). [2] Anthropic, "How we built our multi-agent research system", 2025, https://www.anthropic.com/engineering/multi-agent-research-system, truy cập 2/10/2026 (S621). [3] Cemri et al., "Why Do Multi-Agent LLM Systems Fail?", 2025, https://arxiv.org/abs/2503.13657, truy cập 2/10/2026 (S622).

<a id="orchestration"></a>
### Orchestration — Điều phối

*Mã: orchestration · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** orchestration. Dạng chuẩn trong sách: điều phối.

**Định nghĩa.** Điều phối là việc quyết định thành phần nào làm bước nào trong một [hệ thống AI](01-nen-tang.md#ai-system) nhiều bước. Điều phối cũng chuyển dữ liệu giữa các thành phần đó.

**Giải thích.** Điều phối có 2 cách. Trong điều phối bằng mã, kỹ sư viết sẵn thứ tự các bước và điều kiện rẽ nhánh. Trong điều phối bằng mô hình, một [LLM](04-llm-va-mo-hinh-sinh.md#llm) điều phối tự chia việc và giao cho các LLM khác làm. Cách thứ 2 hợp với việc không biết trước cần các phần việc nào.

Phần mềm điều phối cũng xử lý lỗi, [thử lại](#retry), giới hạn số lượt và ghi nhật ký. Trong hệ thống có [agent](#ai-agent), điều phối có thể nằm trong [agent harness](#agent-harness).

**Phân biệt.** Điều phối khác [định tuyến mô hình](11-trien-khai-san-pham-kinh-te.md#model-routing). Định tuyến mô hình chọn [mô hình](01-nen-tang.md#model) nào trả lời một yêu cầu. Điều phối sắp xếp nhiều bước và nhiều thành phần.

**Liên quan.** [hệ thống nhiều agent](#multi-agent-system) · [lập kế hoạch](#planning) · [định tuyến trong agent](#routing-agent)

**Nguồn.** [1] Anthropic, "Building effective agents", 2024, https://www.anthropic.com/engineering/building-effective-agents, truy cập 2/10/2026 (S013). [2] OpenAI, "A practical guide to building agents", https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf, truy cập 2/10/2026 (S615).

<a id="sub-agent"></a>
### Sub-agent — Agent con

*Mã: sub-agent · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** subagent, agent phụ, delegation (giao việc), handoff (chuyển giao). Dạng chuẩn trong sách: agent con.

**Định nghĩa.** Agent con là một [agent](#ai-agent) do một agent khác tạo ra hoặc giao việc. Agent con chạy với ngữ cảnh riêng và trả kết quả về cho agent giao việc.

**Giải thích.** Agent chính giao việc kèm mô tả nhiệm vụ. Agent con bắt đầu với một [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window) mới, có hướng dẫn và danh sách công cụ riêng. Agent con làm việc rồi trả về một bản tóm tắt ngắn. Cách này giữ cho ngữ cảnh của agent chính không đầy kết quả tìm kiếm và nhật ký.

Giao việc (delegation) khác chuyển giao (handoff). Khi giao việc, agent chính chờ kết quả rồi làm tiếp. Khi chuyển giao, agent đầu chuyển hẳn cuộc làm việc cho agent sau.

**Phân biệt.** Agent con khác một phiên mới. Agent chính tạo agent con, giao việc và nhận kết quả về. Một phiên mới do người dùng mở, không nhận việc từ phiên cũ và không trả kết quả về phiên cũ. Agent con chỉ nhận thông tin mà agent chính gửi, không thấy toàn bộ cuộc trò chuyện của agent chính.

**Liên quan.** [hệ thống nhiều agent](#multi-agent-system) · [điều phối](#orchestration) · [cửa sổ ngữ cảnh](03-kien-truc-mo-hinh.md#context-window)

**Nguồn.** [1] Claude Code Docs, "Create custom subagents", https://code.claude.com/docs/en/sub-agents, truy cập 2/10/2026 (S624). [2] Anthropic, "Effective context engineering for AI agents", 2025, https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, truy cập 2/10/2026 (S623). [3] OpenAI, "A practical guide to building agents", https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf, truy cập 2/10/2026 (S615).

<a id="routing-agent"></a>
### Routing (agent) — Định tuyến trong agent

*Mã: routing-agent · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Định tuyến trong agent là bước xác định loại của một đầu vào. Sau đó hệ thống chuyển đầu vào tới quy trình, công cụ hoặc [agent](#ai-agent) chuyên trách phù hợp.

**Phân biệt.** Định tuyến trong agent chọn đường xử lý. [Định tuyến mô hình](11-trien-khai-san-pham-kinh-te.md#model-routing) chọn [mô hình](01-nen-tang.md#model) nào chạy yêu cầu.

**Liên quan.** [điều phối](#orchestration) · [định tuyến mô hình](11-trien-khai-san-pham-kinh-te.md#model-routing)

<a id="computer-use"></a>
### Computer use — Điều khiển máy tính

*Mã: computer-use · Chương 6 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** điều khiển máy tính, computer-using agent. Dạng chuẩn trong sách: computer use.

**Định nghĩa.** Computer use là một năng lực cho [agent](#ai-agent) điều khiển máy tính qua giao diện đồ họa. Agent xem ảnh chụp màn hình, rồi yêu cầu bấm chuột, gõ phím hoặc cuộn trang.

**Giải thích.** Computer use chạy theo [vòng lặp agent](#agent-loop). [Mô hình](01-nen-tang.md#model) nhận ảnh chụp màn hình và tạo ra lệnh, ví dụ: bấm tại một tọa độ. Ứng dụng của nhà phát triển chạy lệnh trên một máy ảo hoặc máy thật, rồi gửi ảnh chụp mới về. Mô hình phải là [mô hình đa phương thức](04-llm-va-mo-hinh-sinh.md#multimodal-model) để xử lý ảnh. Computer use dùng được với phần mềm không có [API](11-trien-khai-san-pham-kinh-te.md#api).

**Phân biệt.** Computer use thao tác trên giao diện như người. [RPA](#rpa) cũng thao tác trên giao diện, nhưng theo kịch bản cố định. [Agent trình duyệt](#browser-agent) chỉ làm việc trong trình duyệt web.

**Giới hạn.** Chữ và hình trên màn hình có thể chứa lệnh độc hại. Mô hình có thể làm theo các lệnh đó, xem [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection).

**Thay đổi gần đây.** Tính đến tháng 10/2026, tài liệu của một hãng phát triển AI khuyên chạy computer use trong máy ảo riêng có [quyền tối thiểu](09-bao-mat-rieng-tu-xac-thuc.md#least-privilege). Tài liệu này cũng khuyên có người xác nhận trước thao tác quan trọng, ví dụ: giao dịch tài chính.

> **CẢNH BÁO:** Chạy computer use trong máy ảo riêng, không chứa mật khẩu và dữ liệu nhạy cảm. Nội dung trên màn hình có thể điều khiển agent làm sai.

**Liên quan.** [agent trình duyệt](#browser-agent) · [RPA](#rpa) · [sandbox](#sandbox-co-lap) · [prompt injection](09-bao-mat-rieng-tu-xac-thuc.md#prompt-injection)

**Nguồn.** [1] Anthropic, "Computer use tool", https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool, truy cập 2/10/2026 (S628).

<a id="browser-agent"></a>
### Browser agent — Agent trình duyệt

*Mã: browser-agent · Chương 6 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** AI browser agent, trình duyệt AI. Dạng chuẩn trong sách: agent trình duyệt.

**Định nghĩa.** Agent trình duyệt là một [agent](#ai-agent) làm việc trong trình duyệt web thay người dùng. Agent mở trang, đọc nội dung, bấm nút và điền biểu mẫu.

**Giải thích.** Agent trình duyệt có thể chạy trong trình duyệt của người dùng, với các phiên đăng nhập sẵn có. Agent trình duyệt cũng có thể chạy trong một [trình duyệt không giao diện](#headless-browser) trên máy chủ. Khi chạy trong trình duyệt của người dùng, agent có cùng quyền với người dùng trên các trang đã đăng nhập. Quyền này là nguồn rủi ro chính.

**Phân biệt.** [Agent nghiên cứu chuyên sâu](#deep-research-agent) đọc và tổng hợp nguồn. Agent trình duyệt còn có thể hành động trên trang, ví dụ: đặt hàng, gửi biểu mẫu.

**Giới hạn.** Tháng 8/2025, một nhà phát triển thử 123 tình huống [prompt injection gián tiếp](09-bao-mat-rieng-tu-xac-thuc.md#indirect-prompt-injection) lên agent trình duyệt của họ. Tỷ lệ tấn công thành công giảm từ 23,6% xuống 11,2% sau khi thêm biện pháp phòng vệ. Biện pháp phòng vệ giảm rủi ro, không loại bỏ rủi ro.

**Thay đổi gần đây.** Tháng 8/2025, Anthropic thử nghiệm một agent trình duyệt dạng tiện ích mở rộng. Bản thử nghiệm có quyền theo từng trang web và bước xác nhận cho thao tác rủi ro cao, ví dụ: mua hàng.

> **CẢNH BÁO:** Chỉ cho agent trình duyệt truy cập các trang cần cho nhiệm vụ. Một trang độc hại có thể ra lệnh cho agent gửi dữ liệu hoặc thanh toán.

**Liên quan.** [computer use](#computer-use) · [trình duyệt không giao diện](#headless-browser) · [prompt injection gián tiếp](09-bao-mat-rieng-tu-xac-thuc.md#indirect-prompt-injection) · [cổng phê duyệt](#permission)

**Nguồn.** [1] Anthropic, "Piloting Claude in Chrome", 2025, https://claude.com/blog/claude-for-chrome, truy cập 2/10/2026 (S629).

<a id="headless-browser"></a>
### Headless browser — Trình duyệt không giao diện

*Mã: headless-browser · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** headless browser, trình duyệt chạy ẩn. Dạng chuẩn trong sách: trình duyệt không giao diện.

**Định nghĩa.** Trình duyệt không giao diện là một trình duyệt web chạy mà không hiện cửa sổ. Một chương trình điều khiển trình duyệt này để mở trang và thao tác trên trang. Ví dụ: kiểm thử phần mềm tự động.

**Phân biệt.** Trình duyệt không giao diện là công cụ. [Agent trình duyệt](#browser-agent) là một [agent](#ai-agent) có thể dùng công cụ này.

**Liên quan.** [agent trình duyệt](#browser-agent) · [computer use](#computer-use)

<a id="deep-research-agent"></a>
### Deep research agent — Agent nghiên cứu chuyên sâu

*Mã: deep-research-agent · Chương 6 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** deep research, nghiên cứu chuyên sâu. Dạng chuẩn trong sách: agent nghiên cứu chuyên sâu.

**Định nghĩa.** Agent nghiên cứu chuyên sâu là một [agent](#ai-agent) tự tìm kiếm, đọc và tổng hợp nhiều nguồn trên web qua nhiều bước. Kết quả là một báo cáo có [trích nguồn](05-prompt-ngu-canh-tri-thuc.md#citation).

**Giải thích.** Agent tự đặt câu tìm kiếm, mở trang, chọn nguồn và tìm tiếp dựa trên kết quả. Một lần chạy có thể kéo dài nhiều phút và dùng hàng trăm nguồn. Một số hệ thống dùng [hệ thống nhiều agent](#multi-agent-system), với nhiều [agent con](#sub-agent) tìm song song.

**Phân biệt.** Agent nghiên cứu chuyên sâu khác [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) cơ bản. RAG cơ bản truy xuất từ một kho tài liệu định trước. Agent nghiên cứu chuyên sâu tự chọn nguồn qua nhiều vòng tìm kiếm.

**Không nên hiểu là.** Báo cáo có trích nguồn không có nghĩa là nguồn hỗ trợ kết luận. Báo cáo vẫn có thể chứa [ảo giác](04-llm-va-mo-hinh-sinh.md#hallucination), hoặc dùng tin đồn như nguồn uy tín.

**Thay đổi gần đây.** Tháng 2/2025, OpenAI ra mắt deep research, một agent mất từ 5 đến 30 phút cho mỗi báo cáo. Nhà phát triển ghi rõ agent này có thể tạo ra sự kiện sai và khó tách nguồn uy tín khỏi tin đồn.

> **THẬN TRỌNG:** Mở và đọc các nguồn được trích trước khi dùng kết luận. Agent có thể trích một nguồn không hỗ trợ phát biểu.

**Liên quan.** [trích nguồn](05-prompt-ngu-canh-tri-thuc.md#citation) · [RAG](05-prompt-ngu-canh-tri-thuc.md#rag) · [agentic RAG](05-prompt-ngu-canh-tri-thuc.md#agentic-rag) · [hệ thống nhiều agent](#multi-agent-system)

**Nguồn.** [1] OpenAI, "Introducing deep research", 2025, https://openai.com/index/introducing-deep-research/, truy cập 2/10/2026 (S630). [2] Anthropic, "How we built our multi-agent research system", 2025, https://www.anthropic.com/engineering/multi-agent-research-system, truy cập 2/10/2026 (S621).

<a id="background-agent"></a>
### Background agent — Agent chạy nền

*Mã: background-agent · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** background agent, cloud agent, scheduled task (tác vụ định lịch). Dạng chuẩn trong sách: agent chạy nền.

**Định nghĩa.** Agent chạy nền là một [agent](#ai-agent) làm việc trong một [môi trường](#environment) riêng mà không cần người dùng theo dõi trực tiếp. Agent bắt đầu theo yêu cầu, theo sự kiện hoặc theo lịch, rồi báo kết quả khi xong.

**Phân biệt.** Agent chạy nền nói về cách chạy, không nói về [mức tự chủ](#autonomy-level). Kết quả vẫn có thể chờ người duyệt.

**Liên quan.** [agent lập trình](#coding-agent) · [mức tự chủ](#autonomy-level) · [nhiệm vụ dài hạn](#long-horizon-task)

<a id="agentic-commerce"></a>
### Agentic commerce — Thương mại qua agent

*Mã: agentic-commerce · Chương 6 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** thương mại qua agent, agentic payments. Dạng chuẩn trong sách: agentic commerce.

**Định nghĩa.** Agentic commerce là hoạt động mua bán trong đó một [agent](#ai-agent) tìm hàng, chọn hàng hoặc thanh toán thay người mua. Agent chỉ hành động trong phạm vi người mua cho phép.

**Phân biệt.** Thanh toán tự động định kỳ lặp lại một giao dịch đã chốt. Trong agentic commerce, agent tự chọn hàng và người bán.

**Thay đổi gần đây.** Tính đến tháng 10/2026, nhiều giao thức mở cho agentic commerce cùng tồn tại, do các nhóm doanh nghiệp khác nhau phát triển.

**Liên quan.** [agent trình duyệt](#browser-agent) · [cổng phê duyệt](#permission) · [trách nhiệm pháp lý với AI](10-phap-ly-quan-tri-chinh-sach.md#ai-liability)

## 6.4 Kiểm soát và an toàn vận hành

<a id="human-in-the-loop"></a>
### Human-in-the-loop (HITL) — Con người trong vòng lặp

*Mã: human-in-the-loop · Chương 6 · Mức 1 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** human-in-the-loop, HITL, có người duyệt. Dạng chuẩn trong sách: con người trong vòng lặp.

**Định nghĩa.** Con người trong vòng lặp là một kiểu thiết kế [hệ thống AI](01-nen-tang.md#ai-system) có điểm dừng định trước. Tại các điểm đó, một người xem, sửa hoặc duyệt kết quả trước khi kết quả có hiệu lực.

**Giải thích.** Với [agent](#ai-agent), con người trong vòng lặp có 3 dạng hay gặp:

- Người dùng duyệt từng yêu cầu [gọi công cụ](#tool-use) trước khi ứng dụng chạy yêu cầu đó.
- Agent dừng ở các điểm kiểm tra định trước, ví dụ: trước khi gửi thư cho khách hàng.
- Agent chuyển việc cho người khi lỗi lặp lại quá ngưỡng, hoặc khi gặp thao tác rủi ro cao.

Đặc tả [MCP](#mcp) khuyến nghị luôn có một người có quyền từ chối lời gọi công cụ. Một hướng dẫn của hãng phát triển AI khuyên chuyển việc cho người trước thao tác khó đảo ngược, ví dụ: thanh toán.

Số điểm cần người duyệt là một lựa chọn thiết kế. [Mức tự chủ](#autonomy-level) mô tả lựa chọn đó theo từng bậc.

**Ví dụ.** Ví dụ giả định. Agent của Công ty An Bình soạn thư nhắc nợ cho 20 khách hàng. Agent không tự gửi thư. Anh Hùng ở phòng kế toán đọc từng bản nháp, sửa 3 bản, rồi bấm gửi cả 20 thư.

**Phân biệt.** Con người trong vòng lặp là một kiểu thiết kế kỹ thuật. [Giám sát của con người](10-phap-ly-quan-tri-chinh-sach.md#human-oversight) là nghĩa vụ trong một số văn bản pháp luật. [Cổng phê duyệt](#permission) là một cơ chế cụ thể để đưa người vào vòng lặp.

**Không nên hiểu là.** Có người bấm nút duyệt không bảo đảm có giám sát thật. Người duyệt quá nhiều yêu cầu có thể bấm đồng ý mà không đọc. Một nhà phát triển gọi hiện tượng này là mệt mỏi phê duyệt (approval fatigue).

**Giới hạn.** Con người trong vòng lặp làm chậm hệ thống và tốn công người. Người duyệt chỉ kiểm tra được thông tin mà hệ thống trình bày. Một bước quan trọng không hiện trên màn hình duyệt thì người duyệt không kiểm tra được.

> **CẢNH BÁO:** Đặt bước duyệt của người trước thao tác khó đảo ngược. Thao tác này gồm thanh toán, xóa dữ liệu và gửi văn bản ra ngoài tổ chức.

**Liên quan.** [cổng phê duyệt](#permission) · [mức tự chủ](#autonomy-level) · [giám sát của con người](10-phap-ly-quan-tri-chinh-sach.md#human-oversight) · [agent](#ai-agent) · [sandbox](#sandbox-co-lap)

**Nguồn.** [1] Model Context Protocol, "Tools" (phiên bản 2026-07-28), 2026, https://modelcontextprotocol.io/specification/2026-07-28/server/tools, truy cập 2/10/2026 (S602). [2] OpenAI, "A practical guide to building agents", https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf, truy cập 2/10/2026 (S615). [3] Anthropic, "Building effective agents", 2024, https://www.anthropic.com/engineering/building-effective-agents, truy cập 2/10/2026 (S013). [4] Anthropic, "Beyond permission prompts: making Claude Code more secure and autonomous", 2025, https://www.anthropic.com/engineering/claude-code-sandboxing, truy cập 2/10/2026 (S626).

<a id="permission"></a>
### Permission — Cổng phê duyệt

*Mã: permission · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** permission, approval gate, quyền của agent. Dạng chuẩn trong sách: cổng phê duyệt.

**Định nghĩa.** Cổng phê duyệt là một điểm kiểm soát trong [agent harness](#agent-harness). Điểm này quyết định một hành động của [agent](#ai-agent) được chạy ngay, phải chờ người duyệt, hay không được chạy.

**Giải thích.** Nhà phát triển hoặc quản trị viên đặt quy tắc theo loại hành động. Ví dụ: đọc tệp không cần duyệt. Sửa tệp và chạy lệnh cần duyệt. Harness luôn từ chối đọc thư mục chứa khóa bí mật. Trong một công cụ lập trình, quy tắc từ chối được xét trước quy tắc hỏi và quy tắc cho phép.

Harness áp dụng quyền, không phải [mô hình](01-nen-tang.md#model). Mô hình chỉ đề xuất hành động. Quy tắc viết trong [prompt](05-prompt-ngu-canh-tri-thuc.md#prompt) không thay được quy tắc quyền trong harness.

**Phân biệt.** Cổng phê duyệt xét từng hành động theo quy tắc. [Sandbox](#sandbox-co-lap) giới hạn tệp và mạng mà mã chạm tới, kể cả sau khi hành động đã được duyệt. 2 cơ chế này bổ sung cho nhau.

**Liên quan.** [con người trong vòng lặp](#human-in-the-loop) · [sandbox](#sandbox-co-lap) · [quyền tối thiểu](09-bao-mat-rieng-tu-xac-thuc.md#least-privilege) · [agent harness](#agent-harness)

**Nguồn.** [1] Claude Code Docs, "Configure permissions", https://code.claude.com/docs/en/permissions, truy cập 2/10/2026 (S632). [2] Anthropic, "Beyond permission prompts: making Claude Code more secure and autonomous", 2025, https://www.anthropic.com/engineering/claude-code-sandboxing, truy cập 2/10/2026 (S626).

<a id="sandbox-co-lap"></a>
### Sandbox (môi trường cô lập) — Môi trường cô lập

*Mã: sandbox-co-lap · Chương 6 · Mức 2 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** môi trường cô lập, hộp cát. Dạng chuẩn trong sách: sandbox.

**Định nghĩa.** Sandbox là một vùng chạy phần mềm có ranh giới kỹ thuật. Ranh giới này giới hạn các tệp, kết nối mạng và tài nguyên mà chương trình bên trong được dùng.

**Giải thích.** Sandbox cho [agent](#ai-agent) có 2 phần chính. Cô lập tệp chỉ cho đọc và sửa trong các thư mục định trước. Cô lập mạng chỉ cho kết nối tới các máy chủ được duyệt. Thiếu cô lập mạng, mã độc có thể gửi khóa bí mật ra ngoài. Thiếu cô lập tệp, mã độc có thể sửa cấu hình để thoát khỏi sandbox.

Sandbox giúp giảm số lần hỏi người duyệt. Một nhà phát triển ghi nhận sandbox giảm 84% số lần hỏi quyền trong công cụ lập trình của họ.

**Phân biệt.** Sandbox trong chương này là một [môi trường](#environment) kỹ thuật. [Sandbox pháp lý](10-phap-ly-quan-tri-chinh-sach.md#sandbox-phap-ly) là cơ chế thử nghiệm có kiểm soát do cơ quan quản lý lập ra.

**Không nên hiểu là.** Sandbox giảm rủi ro, không loại bỏ rủi ro. Sandbox chỉ chặn hành động ra ngoài ranh giới đã cấu hình. Agent vẫn có thể làm hỏng dữ liệu trong thư mục được phép, hoặc gửi dữ liệu tới máy chủ được phép. Cấu hình sai làm mất tác dụng của sandbox.

> **THẬN TRỌNG:** Không đặt khóa bí mật và dữ liệu thật trong thư mục agent được đọc. Sandbox không bảo vệ dữ liệu bên trong ranh giới.

**Liên quan.** [cổng phê duyệt](#permission) · [chạy mã](#code-execution) · [quyền tối thiểu](09-bao-mat-rieng-tu-xac-thuc.md#least-privilege) · [sandbox pháp lý](10-phap-ly-quan-tri-chinh-sach.md#sandbox-phap-ly)

**Nguồn.** [1] Anthropic, "Beyond permission prompts: making Claude Code more secure and autonomous", 2025, https://www.anthropic.com/engineering/claude-code-sandboxing, truy cập 2/10/2026 (S626). [2] Anthropic, "Code execution tool", https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool, truy cập 2/10/2026 (S636).

<a id="verifier"></a>
### Verifier — Bộ kiểm chứng

*Mã: verifier · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Bộ kiểm chứng là một chương trình hoặc một [mô hình](01-nen-tang.md#model) kiểm tra đầu ra theo tiêu chí định trước. Đầu ra này có thể đến từ một mô hình hoặc một [agent](#ai-agent). Ví dụ: chạy kiểm thử, so với đáp án.

**Phân biệt.** Nhiều lượt tự kiểm tra của cùng một mô hình không phải kiểm chứng độc lập.

**Liên quan.** [LLM-as-a-judge](07-danh-gia-va-chat-luong.md#llm-as-a-judge) · [tiêu chí nghiệm thu](#acceptance-criteria) · [đánh giá agent](#agent-evaluation)

<a id="agent-evaluation"></a>
### Agent evaluation — Đánh giá agent

*Mã: agent-evaluation · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Đánh giá agent là việc chạy một [agent](#ai-agent) trên các nhiệm vụ thử có tiêu chí thành công. Người chấm xét kết quả cuối, [quỹ đạo agent](#trajectory), hoặc cả hai.

**Phân biệt.** Agent thay đổi [môi trường](#environment). Người chấm kiểm tra cả trạng thái môi trường sau lượt chạy, không chỉ câu trả lời như khi [đánh giá](07-danh-gia-va-chat-luong.md#evaluation) một [mô hình](01-nen-tang.md#model).

**Liên quan.** [benchmark cho agent](07-danh-gia-va-chat-luong.md#agentic-benchmark) · [bộ kiểm chứng](#verifier) · [episode](#episode)

## 6.5 Agent trong phát triển phần mềm

<a id="coding-agent"></a>
### Coding agent — Agent lập trình

*Mã: coding-agent · Chương 6 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** coding agent, AI coding agent. Dạng chuẩn trong sách: agent lập trình.

**Định nghĩa.** Agent lập trình là một [agent](#ai-agent) làm việc trên mã nguồn của một dự án phần mềm. Agent đọc tệp, sửa mã, chạy lệnh và chạy kiểm thử để hoàn thành một yêu cầu.

**Giải thích.** Agent lập trình chạy trong thư mục dự án, trên máy của lập trình viên hoặc trên một máy chủ riêng. Kết quả kiểm thử cho agent tín hiệu đúng hoặc sai ở mỗi bước. Agent có thể làm việc nhiều giờ, ghi tiến độ vào tệp và tạo đề xuất thay đổi mã để người xem xét.

**Phân biệt.** [Trợ lý lập trình AI](#ai-pair-programmer) gợi ý mã khi lập trình viên đang gõ. Agent lập trình nhận cả một nhiệm vụ và tự làm nhiều bước. [Mô hình sinh mã](04-llm-va-mo-hinh-sinh.md#code-model) là một [mô hình](01-nen-tang.md#model). Agent lập trình là mô hình cộng với công cụ và [agent harness](#agent-harness).

**Không nên hiểu là.** Mã chạy qua kiểm thử không bảo đảm mã đúng yêu cầu hay an toàn. Bộ kiểm thử chỉ kiểm tra các trường hợp có trong bộ kiểm thử.

**Thay đổi gần đây.** Tính đến tháng 10/2026, tài liệu của GitHub mô tả một agent lập trình chạy nền trong một [môi trường](#environment) tạm. Agent này nhận việc, sửa mã trên một nhánh riêng, và mỗi phiên chạy tối đa 59 phút.

**Liên quan.** [trợ lý lập trình AI](#ai-pair-programmer) · [vibe coding](#vibe-coding) · [phát triển theo đặc tả](#spec-driven-development) · [chạy mã](#code-execution)

**Nguồn.** [1] Yang et al., "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering", 2024, https://arxiv.org/abs/2405.15793, truy cập 2/10/2026 (S631). [2] GitHub Docs, "About GitHub Copilot cloud agent", https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent, truy cập 2/10/2026 (S640). [3] Anthropic, "Effective harnesses for long-running agents", 2025, https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents, truy cập 2/10/2026 (S625).

<a id="ai-pair-programmer"></a>
### AI pair programmer — Trợ lý lập trình AI

*Mã: ai-pair-programmer · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Tên khác:** AI pair programmer, AI coding assistant. Dạng chuẩn trong sách: trợ lý lập trình AI.

**Định nghĩa.** Trợ lý lập trình AI là một công cụ AI gắn trong trình soạn mã. Công cụ này gợi ý dòng mã hoặc cả hàm, dựa trên mã lập trình viên đang viết. Lập trình viên nhận, sửa hoặc bỏ từng gợi ý.

**Phân biệt.** [Copilot](11-trien-khai-san-pham-kinh-te.md#copilot) ở Chương 11 là tên một loại sản phẩm AI hỗ trợ người dùng trong nhiều ứng dụng, không chỉ trong lập trình.

**Liên quan.** [agent lập trình](#coding-agent) · [copilot](11-trien-khai-san-pham-kinh-te.md#copilot)

<a id="vibe-coding"></a>
### Vibe coding (từ lóng) — Lập trình theo cảm hứng

*Mã: vibe-coding · Chương 6 · Mức 2 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** lập trình theo cảm hứng, lập trình theo "vibe". Dạng chuẩn trong sách: vibe coding.

**Định nghĩa.** Vibe coding là một từ lóng chỉ cách làm phần mềm trong đó người dùng mô tả yêu cầu cho AI bằng ngôn ngữ thường. Người dùng nhận mã AI tạo ra mà không đọc, và chỉ xem chương trình có chạy hay không.

**Giải thích.** Từ này có 2 cách dùng. Theo nghĩa hẹp, vibe coding là nhận mã mà không đọc, rồi dán thông báo lỗi lại cho AI tự sửa. Theo nghĩa rộng trong báo chí và từ điển, vibe coding chỉ việc dùng AI viết mã theo yêu cầu bằng ngôn ngữ thường. Sách này dùng nghĩa hẹp, vì nghĩa hẹp tách được rủi ro riêng của cách làm này.

**Phân biệt.** Không phải lập trình nào có AI hỗ trợ cũng là vibe coding. Lập trình viên có thể đọc, kiểm thử và giải thích mã AI tạo ra. Khi đó, việc này là lập trình có AI hỗ trợ. [Phát triển theo đặc tả](#spec-driven-development) đi theo hướng ngược lại.

**Không nên hiểu là.** Vibe coding không phải tên một công cụ hay một phương pháp kỹ thuật.

**Thay đổi gần đây.** Tháng 2/2025, nhà nghiên cứu Andrej Karpathy dùng từ này trên mạng xã hội, cho các dự án thử nghiệm cuối tuần. Ngày 6/11/2025, từ điển Collins chọn "vibe coding" làm từ của năm 2025.

> **CẢNH BÁO:** Không đưa mã làm theo kiểu vibe coding vào hệ thống xử lý tiền hoặc dữ liệu cá nhân khi chưa có người kiểm tra. Mã chưa đọc có thể chứa lỗ hổng bảo mật.

**Liên quan.** [agent lập trình](#coding-agent) · [trợ lý lập trình AI](#ai-pair-programmer) · [phát triển theo đặc tả](#spec-driven-development)

**Nguồn.** [1] Collins Dictionary, "Collins' Word of the Year 2025: AI meets authenticity as society shifts", 2025, https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/, truy cập 2/10/2026 (S619). [2] Simon Willison (blog cá nhân, dẫn để ghi nhận cách dùng từ lóng), "Not all AI-assisted programming is vibe coding (but vibe coding rocks)", 2025, https://simonwillison.net/2025/Mar/19/vibe-coding/, truy cập 2/10/2026 (S620).

<a id="spec-driven-development"></a>
### Spec-driven development — Phát triển theo đặc tả

*Mã: spec-driven-development · Chương 6 · Mức 3 · Trạng thái: đang biến đổi · Xác minh: 10/2026*

**Tên khác:** spec-driven development, SDD. Dạng chuẩn trong sách: phát triển theo đặc tả.

**Định nghĩa.** Phát triển theo đặc tả là một phương pháp làm phần mềm với AI. Người làm viết đặc tả yêu cầu trước, rồi [agent lập trình](#coding-agent) [lập kế hoạch](#planning) và viết mã theo đặc tả.

**Phân biệt.** Khác [vibe coding](#vibe-coding), người làm kiểm tra kết quả ở từng bước.

**Thay đổi gần đây.** Tháng 9/2025, GitHub công bố bộ công cụ mã nguồn mở cho phương pháp này, gồm 4 bước: đặc tả, kế hoạch, danh sách việc, viết mã.

**Liên quan.** [agent lập trình](#coding-agent) · [tiêu chí nghiệm thu](#acceptance-criteria) · [lập kế hoạch](#planning)

<a id="acceptance-criteria"></a>
### Acceptance criteria — Tiêu chí nghiệm thu

*Mã: acceptance-criteria · Chương 6 · Mức 3 · Trạng thái: ổn định · Xác minh: 10/2026*

**Định nghĩa.** Tiêu chí nghiệm thu là danh sách điều kiện cụ thể và kiểm tra được. Kết quả phải đạt các điều kiện này thì nhiệm vụ mới xong. Với [agent](#ai-agent), các điều kiện này là căn cứ để [bộ kiểm chứng](#verifier) chấm.

**Phân biệt.** Tiêu chí nghiệm thu nêu điều kiện của kết quả, không nêu cách làm.

**Liên quan.** [bộ kiểm chứng](#verifier) · [phát triển theo đặc tả](#spec-driven-development) · [đánh giá agent](#agent-evaluation)
