# Contributing / 投稿指南

[中文](#中文投稿指南) · [English](#english-guide)

## 中文投稿指南

本仓库是 Hana **Global 市场目录**。PR 用于登记作者的 GitHub 仓库，不用于上传扩展源码或安装包。中国大陆市场独立审核和发布，不会自动同步此处的收录。

支持 `app`、`skill`、`recipe`、`connector`、`role`、`bundle` 六种扩展。新 App 必须使用 manifestVersion 2；v1 是冻结的兼容层，不接受新的市场投稿。

### 1. 准备可安装的发布包

在 Hana 源码仓库中使用官方打包命令。例如：

```bash
npm run pack:extension -- --kind app --dir /path/to/my-app \
  --publisher "Example Author" --out ./dist-extensions
```

将示例路径和发布者换成自己的值。其他扩展使用对应的 `--kind`。App 需要先完成自己的构建，运行入口不能是未编译的 `.ts` 文件。Connector 包不能包含令牌或其他凭据。

保留打包器生成的 **`.entry.json` 和对应 `.zip`**，不要手动改写大小或 SHA-256，也不要用 GitHub 自动生成的源码归档代替安装包。完整的清单和打包要求见 [Hana App 文档](https://github.com/liliMozi/openhanako/blob/main/APPS.md)。

### 2. 在自己的仓库发布正式 Release

在登记的 GitHub 仓库创建正式 Release，并将上述两个文件同时上传为 Release 附件。仓库和附件必须可供市场自动化及用户访问。

- Release 不能是草稿或预发布版本。
- 市场只按 `approvals.json` 中登记的 tag 读取 Release，不会自动选用 latest Release。
- Release tag 只能使用字母、数字、`.`、`_`、`+`、`-`，例如 `v1.2.0`。
- App、Connector、Role、Bundle 的条目附件名为 `<kind>-<id>-<version>.entry.json`。
- Skill、Recipe 的条目附件名为 `<kind>-<id>.entry.json`，ZIP 使用打包器生成的内容寻址文件名。
- 每个登记项必须能匹配唯一的条目附件，且对应 ZIP 必须属于同一 Release。

### 3. 提交登记 PR

Fork 本仓库，同一个 PR 修改两个文件，保留现有条目。

在 `registry.json` 的 `entries` 数组中追加登记记录，例如：

```json
{
  "schemaVersion": 1,
  "entries": [
    {
      "kind": "app",
      "id": "example-app",
      "repository": "author/example-app",
      "publisher": "Example Author"
    }
  ]
}
```

在 `approvals.json` 的 `approvals` 数组中追加要上架的安装包，例如：

```json
{
  "schemaVersion": 1,
  "approvals": [
    {
      "kind": "app",
      "id": "example-app",
      "tag": "v1.0.0",
      "sha256": "<条目 JSON 中 archive.sha256 的值>"
    }
  ]
}
```

这里的 `entries` 和 `approvals` 仅为示例，不要覆盖真实目录。

- `kind`、`id` 和 `publisher` 必须与打包生成的条目一致。
- `tag` 是包含条目 JSON 和 ZIP 的 Release tag；`sha256` 照抄条目 JSON 中的 `archive.sha256`，不要自行计算或修改。
- `repository` 使用 `owner/repository`，不是完整 URL。
- 除非维护者要求批量变更，一个 PR 只登记一个扩展。
- **不要手工编辑 `index.v2.json`**，也不要为投稿修改同步器或工作流。
- 按 [PR 模板](.github/PULL_REQUEST_TEMPLATE.md)填写下面的审阅材料，便于维护者在 PR 正文中直接查看。

#### PR 审阅材料

可以用中文或英文填写。请提供：

- **基本信息**：扩展名称、类型与 ID、发布者、用途、作者仓库及正式 Release 链接；登记信息变更时说明改动。
- **图标预览**：在正文中展示实际扩展图标；没有图标请注明。
- **截图或演示**：有界面的扩展提供主要界面或操作结果截图，并配简短说明。纯工具类可以用调用输入与结果示例代替截图，也可补充录屏。
- **自测报告**：Hana 版本、操作系统及版本、安装测试使用的 Release、测试步骤和实际结果，以及已知问题或未测试部分。
- **权限与外部服务**：说明声明的能力、需要它们的原因，以及访问的外部服务和用途；没有则注明“无”，不要附上凭据。

可直接把图标和截图拖入 GitHub 的 PR 正文编辑框，或插入可访问的图片链接，再预览确认图片能显示。无需将图片文件提交到市场仓库。上传前请遮盖个人信息、令牌和其他敏感内容。

维护者打开 PR 正文即可查看这些图片；GitHub 的 PR 列表不会自动把 App 图标显示为投稿缩略图。这些材料是作者提供的审阅说明，并非自动生成或独立验证的报告。未测试或不适用的部分请如实标注；模板本身不新增自动化准入检查。

### 4. 检查、审核与上架

可在市场仓库使用 Node.js 24.15.0 或兼容的 Node 24 运行只读检查，无需安装依赖：

```bash
# 下载 approvals.json 中登记的安装包，核对 SHA-256、身份和版本。
node scripts/extension-market-sync.mjs --registry registry.json --approvals approvals.json --previous index.v2.json --out index.v2.json --check

# 读取 latest 正式 Release，输出可直接填入 approvals.json 的记录。
node scripts/extension-market-sync.mjs --discover --registry registry.json --approvals approvals.json --previous index.v2.json
```

检查需要联网读取 Release 和附件。可选的只读 `GITHUB_TOKEN` 可提高 GitHub API 限额；不要提交令牌。

PR 检查使用基线分支的同步器读取候选文件，不执行投稿代码。检查通过不等于审核通过，也不等于已经上架。

**上架绑定到具体安装包。** 目录只发布与 `approvals.json` 记录完全一致的安装包：按登记的 tag 读取 Release，ZIP 的 SHA-256 必须一致。维护者审核的就是这份安装包，合并 PR 即表示批准。合并后发布工作流生成新的 `index.v2.json`，客户端才可发现新条目。没有批准记录的登记不会上架。

### 5. 后续更新

**每次更新都需要提交 PR 并经维护者审核**，市场不会自动发现或上架新版本：

1. 在同一仓库发布新的正式 Release，同时上传新生成的条目和 ZIP。
2. 提交 PR，把 `approvals.json` 中本扩展的 `tag` 和 `sha256` 改为新 Release 的值。
3. 在 PR 中说明本次更新的内容和权限变化，并附上自测结果。
4. 维护者审核并合并后，新版本才会上架；合并前用户看到的仍是旧版本。

- 登记信息（如仓库或发布者）变化时，同样在 PR 中修改 `registry.json`。
- 对有语义化版本的扩展，请发布更高版本；不要降级，也不要用新安装包替换已发布的同一版本。
- Skill / Recipe 按内容哈希更新，条目中的 `0.0.0` 不需要人为递增。
- 上架后修改、替换或删除 Release 附件，不会改变用户安装到的内容：客户端按批准的 SHA-256 校验下载，不一致或附件缺失时安装直接失败。
- 目录更新**不会自动替用户安装或更新扩展**。

### 常见失败

| 现象 | 应检查的内容 |
| --- | --- |
| 找不到可用 Release | `approvals.json` 中的 tag 是否存在；是否仍为草稿或预发布；tag 是否只含允许的字符 |
| 找不到条目或 ZIP | 是否同时上传两个打包产物；附件名称和登记身份是否一致 |
| 身份或完整性校验失败 | `kind`、`id`、发布者、大小和 SHA-256 是否与原始打包产物一致；`approvals.json` 中的 `sha256` 是否照抄自条目 JSON |
| 版本更新被拒绝 | 是否版本倒退，或替换了同一版本的安装包 |
| 登记已合并但目录没有条目 | `approvals.json` 中是否已有对应记录 |
| 已批准但目录没更新 | 查看发布 Actions 是否成功；合并本身不是发布成功的证明 |

发布采用**整批原子更新**：本次新批准的安装包任一校验失败，整批都不会发布，原索引保持不变。批准记录未变的已上架条目不会重新下载，作者删除旧附件不会阻断其他条目。根据日志定位具体失败项，修复 Release 或调整批准记录，再由维护者重跑；不要删除无关条目来绕过检查。

## English guide

This repository is the Hana **Global market catalog**. Enrollment PRs register an author's GitHub repository; they do not upload extension source code or installation packages. The mainland China catalog is reviewed and published independently.

Supported kinds are `app`, `skill`, `recipe`, `connector`, `role`, and `bundle`. New Apps must use manifestVersion 2. The frozen v1 compatibility line does not accept new market submissions.

### 1. Package your extension

Use the official packer from a Hana source checkout:

```bash
npm run pack:extension -- --kind app --dir /path/to/my-app \
  --publisher "Example Author" --out ./dist-extensions
```

Replace the path, publisher, and kind as appropriate. Build Apps before packaging; their runtime entry must not be uncompiled TypeScript. Connector packages must not contain tokens or other credentials. See the [Hana App documentation](https://github.com/liliMozi/openhanako/blob/main/APPS_EN.md) for manifest and packaging requirements.

Keep the generated `.entry.json` and matching `.zip` together. Do not alter their byte count or SHA-256 metadata, or substitute GitHub's automatically generated source archives.

### 2. Publish a stable GitHub Release

Upload both generated files as assets of a stable Release in the repository you will register. The repository and assets must be accessible to market automation and users. Drafts and prereleases are not eligible.

The market reads only the Release tag recorded in `approvals.json`; it never selects the latest Release automatically. Release tags may contain only letters, digits, `.`, `_`, `+`, and `-`, for example `v1.2.0`.

- Apps, connectors, roles, and bundles: `<kind>-<id>-<version>.entry.json`.
- Skills and recipes: `<kind>-<id>.entry.json`, with the packer-generated content-addressed ZIP filename.
- Each enrollment must match exactly one entry asset. Its ZIP must belong to the same Release.

### 3. Open an enrollment PR

Fork this repository and change two files in the same PR, preserving existing records.

Append an enrollment to the `entries` array in `registry.json`. Example record:

```json
{
  "kind": "app",
  "id": "example-app",
  "repository": "author/example-app",
  "publisher": "Example Author"
}
```

Append the package to publish to the `approvals` array in `approvals.json`. Example record:

```json
{
  "kind": "app",
  "id": "example-app",
  "tag": "v1.0.0",
  "sha256": "<archive.sha256 from the entry JSON>"
}
```

Both files keep `schemaVersion: 1`. The kind, id, and publisher must match the packer output. Use `owner/repository`, not a full URL. `tag` is the Release that contains the entry JSON and ZIP; copy `sha256` from `archive.sha256` in the entry JSON instead of computing or editing it. Submit one enrollment per PR unless maintainers request a batch.

Complete the review materials in the [PR template](.github/PULL_REQUEST_TEMPLATE.md). **Do not edit `index.v2.json` manually** or change the synchronizer or workflows as part of an enrollment.

#### PR review materials

You may write in Chinese or English. Include:

- **Basic information:** extension name, kind and ID, publisher, purpose, author repository, and stable Release link. Explain any registration changes.
- **Icon preview:** embed the actual extension icon in the PR body, or state that the extension has no icon.
- **Screenshots or demo:** for extensions with a UI, show the main interface or results with short captions. Tool-only extensions may provide example inputs and outputs instead. A screen recording is optional.
- **Author test report:** Hana version, OS and version, Release used for installation testing, test steps and actual results, and known issues or untested areas.
- **Permissions and external services:** describe declared capabilities, why they are needed, and external services used. Write “None” where applicable; do not include credentials.

Drag icons and screenshots into GitHub's PR body editor, or embed accessible image URLs, then use preview to check that they display. Do not commit these images to the catalog. Redact personal information, tokens, and other sensitive content before uploading.

Maintainers can see the images in the PR body; GitHub's PR list does not automatically display App icons as submission thumbnails. These are author-provided review materials, not automatically generated or independently verified reports. Mark untested or inapplicable areas honestly. The template does not add automated admission checks.

### 4. Validate and wait for review

With Node.js 24.15.0 or a compatible Node 24 release, run this read-only check from the market repository. No dependency installation is required:

```bash
# Download the packages recorded in approvals.json and verify SHA-256, identity, and version.
node scripts/extension-market-sync.mjs --registry registry.json --approvals approvals.json --previous index.v2.json --out index.v2.json --check

# Read the latest stable Release and print a record ready for approvals.json.
node scripts/extension-market-sync.mjs --discover --registry registry.json --approvals approvals.json --previous index.v2.json
```

The check needs network access to releases and assets. An optional read-only `GITHUB_TOKEN` raises the API rate limit; never commit it.

PR validation uses the base branch's synchronizer and does not execute submitted code. Passing checks does not replace maintainer review.

**Publication is bound to an exact package.** The catalog publishes only packages that match a record in `approvals.json` exactly: the recorded Release tag is read and the ZIP SHA-256 must match. Maintainers review that package, and merging the PR approves it. The publishing workflow must then update `index.v2.json` before clients can discover the extension. Enrollments without an approval record are not listed.

### 5. Publish updates

**Every update requires a PR and maintainer review.** The market does not discover or publish new versions automatically:

1. Publish a new stable Release in the same repository with both newly generated assets.
2. Open a PR that changes this extension's `tag` and `sha256` in `approvals.json` to the new Release.
3. Describe the changes and any permission changes in the PR, and include your test results.
4. The new version is published only after maintainers review and merge the PR. Until then, users keep seeing the published version.

- To change registration details, such as repository or publisher, edit `registry.json` in the PR as well.
- Versioned extensions must not downgrade or replace an existing version's archive. Skills and recipes update by content hash and retain `0.0.0` in their entry metadata.
- Changing, replacing, or deleting Release assets after publication does not change what users install. Clients verify downloads against the approved SHA-256; a mismatched or missing asset fails installation.
- Catalog updates never install or update extensions automatically for users.

### Troubleshooting

Check that the tag in `approvals.json` exists and is stable, the tag characters, asset names, matching identity and publisher, byte count, SHA-256 copied from the entry JSON, and version progression. An enrollment is listed only when `approvals.json` has its record. A merged PR is not proof of a successful publication; inspect publishing Actions when an entry does not appear.

Publication is **atomic across the entire batch**. If any newly approved package fails validation, the new index is not published and the previous index stays unchanged. Published entries whose approval did not change are not downloaded again, so a deleted old asset does not block other entries. Identify the failing record in the logs, fix its Release or the approval, then ask a maintainer to rerun publication. Do not remove unrelated entries to bypass validation.
