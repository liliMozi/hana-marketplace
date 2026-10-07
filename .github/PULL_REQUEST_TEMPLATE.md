## 投稿信息 / Submission

<!-- 可用中文或英文填写。登记变更请说明改了什么；不适用的项目请注明原因。
     Fill in Chinese or English. For registration changes, explain what changed.
     Mark inapplicable sections with a short reason. -->

- 扩展名称 / Extension name:
- 类型与 ID / Kind and ID:
- 发布者 / Publisher:
- 用途与主要功能 / Purpose and main features:
- 作者仓库 / Author repository:
- 正式 Release / Stable Release:
- 本次登记或变更说明 / Enrollment or registration change:

## 图标预览 / Icon preview

<!-- 将实际扩展图标拖入正文编辑框，或插入可访问的图片链接。没有图标请注明。
     Drag the actual extension icon into this editor, or embed an accessible image URL.
     State if the extension has no icon. -->

## 截图或演示 / Screenshots or demo

<!-- 有界面的扩展请附主要界面或操作结果截图，并简述展示内容。
     纯工具类可提供调用输入与结果示例；录屏可作为补充。
     图片可直接拖入 PR 正文，不必提交到市场仓库。
     请遮盖个人信息、令牌和其他敏感内容。

     For extensions with a UI, include screenshots of the main interface or results
     with short captions. Tool-only extensions may show example inputs and outputs.
     A screen recording is optional. Drag images into the PR body; do not commit them
     to this catalog. Redact personal information, tokens, and other sensitive data. -->

## 自测报告 / Author test report

<!-- 填写实际执行情况，未测试的项目如实注明。这是作者报告，不是自动验证结果。
     Report what you actually tested and mark anything untested.
     This is an author report, not automated verification. -->

- Hana 版本 / Hana version:
- 操作系统及版本 / OS and version:
- 安装测试使用的 Release / Release used for installation testing:
- 测试步骤与实际结果 / Test steps and actual results:
- 已知问题或未测试部分 / Known issues or untested areas:

## 权限与外部服务 / Permissions and external services

<!-- 说明声明了哪些能力、为什么需要，以及访问的外部服务和用途。
     如不需要额外权限或外部服务，请注明“无”。不要附上凭据。
     Describe declared capabilities, why they are needed, and external services used.
     Write “None” where applicable. Do not include credentials. -->

## 投稿检查 / Enrollment checklist

- [ ] 本 PR 仅修改登记数据；未提交源码、安装包或截图文件。 / This PR changes enrollment data only; no source code, packages, or screenshot files are committed.
- [ ] 作者仓库已有正式 Release，包含匹配的条目 JSON 和 ZIP。 / The repository has a stable Release with matching entry JSON and ZIP assets.
- [ ] 登记的 kind、id、publisher 与条目一致。 / The registered kind, id, and publisher match the entry.
- [ ] `approvals.json` 中的 tag 指向该 Release，sha256 照抄自条目 JSON 的 `archive.sha256`。 / The tag in `approvals.json` names that Release, and sha256 is copied from `archive.sha256` in the entry JSON.
- [ ] 未手动编辑生成的 `index.v2.json`。 / I did not edit the generated `index.v2.json`.
- [ ] 已填写审阅材料，不适用或未测试的部分已注明，图片已检查敏感信息。 / I completed the review materials, marked inapplicable or untested areas, and checked images for sensitive information.
