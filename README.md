# Hana Global Market

This repository publishes the reviewed global Hana App market index. It does
not run submitted code or build submitted projects. The generated
`index.v2.json` only points Hana clients at ZIP files whose release tag and
SHA-256 are recorded in `approvals.json` through a reviewed pull request.
Clients verify every download against that SHA-256, so a changed or deleted
Release asset makes installation fail instead of installing different bytes.

## Contributing / 投稿

See [CONTRIBUTING.md](CONTRIBUTING.md) for the Chinese and English submission
guide: packaging, stable Releases, enrollment PRs, review, updates, and troubleshooting.

投稿前请阅读[中英双语贡献指南](CONTRIBUTING.md)。本仓库收录发布登记，不接收安装包或扩展源码的直接上传。

## Enroll an App release

1. Upload both the packer-produced `.entry.json` and its matching `.zip` to a
   stable GitHub Release in that repository. The release must be neither a
   draft nor a prerelease.
2. Make a pull request that adds one record to `registry.json` and one record
   to `approvals.json`. The enrollment contains the extension kind, safe id,
   `owner/repository`, and publisher name. The approval contains the kind, id,
   release tag, and the ZIP SHA-256 from the entry metadata; it may also carry
   `readme`, the reviewed Markdown introduction shown in the store.
3. Maintainers review that exact package and merge the pull request. The
   market workflow publishes only approved packages and atomically updates the
   index when every changed approval validates. Enrollments without an
   approval are not listed.

Every update follows the same review: the author publishes a new stable
release and opens a pull request that changes the tag and SHA-256 in
`approvals.json`. Nothing is discovered or published automatically. Changing
only the introduction is also a reviewed change: edit the approval's `readme`
in a pull request. The index copies that text and never fetches an author URL,
so the storefront cannot change without a merged PR; an item without a snapshot
shows no reviewed introduction, and market READMEs never load remote images.

Authors can keep the standard version-submission flow. A maintainer may instead
collect and review the introduction text and images from an approved release and
write `readme` on the author's behalf, so authors do not need to submit the
snapshot themselves; the reviewed copy is the submission source and is never
fetched live after review. When an update changes the introduction, the existing
`readme` must be confirmed to still match or be re-reviewed. Authors may still
submit `readme` themselves if they prefer.

作者可继续按标准版本投稿流程提交。维护者也可以从已批准的 Release 收集并审核介绍正文与配图后代作者写入 `readme`，作者无需重复提交快照；采审副本即为提交来源，审核后不再活取。版本更新时，既有 `readme` 须确认仍对应当前介绍，否则重新审核。作者仍可自行提交 `readme`。

For apps, connectors, roles, bundles, and sticker packs the entry asset is named
`<kind>-<id>-<version>.entry.json`, with a matching `<kind>-<id>-<version>.zip`.
Skills and recipes use `<kind>-<id>.entry.json` and content-addressed ZIP files.
Build both files with Hana's `extension-pack` command before uploading them.
Sticker packs need a semantic version and at least one image; their cover (or
first sticker) is the market icon, and optional `description` is the market
summary. Role avatars are used as market icons. Image formats and limits are
listed in the [submission guide](CONTRIBUTING.md).

App、Connector、Role、Bundle 和表情包的条目附件名为
`<kind>-<id>-<version>.entry.json`，对应 ZIP 为 `<kind>-<id>-<version>.zip`；
Skill 和 Recipe 使用 `<kind>-<id>.entry.json` 与内容寻址 ZIP。上传前请用
Hana 的 `extension-pack` 命令生成两个文件。表情包版本须为语义化版本，至少
包含一张图片；封面（未指定时为第一张贴纸）用作市场图标，可选的
`description` 用作市场简介。角色卡头像用作市场图标。图片格式和限制见[投稿指南](CONTRIBUTING.md)。

The sync batch fails without changing the published index if any enrollment
or approval is invalid, or a newly approved release is unavailable,
downgraded, or does not match its approved SHA-256. Published entries whose
approval did not change are reused without downloading them again. Fix the
reported enrollment, approval, or release, then rerun the workflow.

Each published item carries `stats.downloads`: the total GitHub download
count of its published ZIP files, read from release metadata, and `listedAt`:
the timestamp when the extension was first listed under that repository (kept
across version updates). A daily scheduled run refreshes download counts
without downloading packages again. Hana uses them only to sort the market. If
a count cannot be read, the workflow keeps the previous value and prints a
warning.

Catalog updates never install updates automatically in Hana. The mainland
China catalog is reviewed and hosted independently; this repository publishes
only the Global catalog.

## Local checks

Use Node.js 24.15.0 or a compatible Node 24 release. The synchronizer is bundled
with its dependencies; no npm install or Hana checkout is required here.

```bash
# Validate the registry, approvals, and changed approved releases without changing any files.
node scripts/extension-market-sync.mjs --registry registry.json --approvals approvals.json --previous index.v2.json --out index.v2.json --check

# Print approvals.json records for latest stable releases that are not approved yet.
node scripts/extension-market-sync.mjs --discover --registry registry.json --approvals approvals.json --previous index.v2.json

# Generate the next index locally from approved releases.
node scripts/extension-market-sync.mjs --registry registry.json --approvals approvals.json --previous index.v2.json --out index.v2.json
```

An optional read-only `GITHUB_TOKEN` raises the GitHub API rate limit. It is
sent only to api.github.com, never to installation-package hosts or redirects.
Do not commit tokens. The initial registry is empty; submitting a valid
enrollment is what makes the first App discoverable.

## Review and publication

Only maintainers merge enrollment and update PRs. `.github/CODEOWNERS`
requests their review for registry, approvals, and maintenance code changes;
the file alone does not enforce approval. Contributor validation executes the
base branch's bundled tool against the proposed registry and approvals,
without executing code from the PR. For a new or changed enrollment, it also
prints the latest stable release when that differs from the proposed approval.

The generation job has read-only repository access. A separate publisher job
receives the generated index and has `contents: write`; that GitHub permission
is repository-wide, while the trusted workflow stages only `index.v2.json`.
It fails if main changed during generation and never force-pushes.

If enabling rules that require all changes to go through a PR, configure an
approved publisher/bypass compatible with unattended index updates first;
the default GitHub Actions token cannot be assumed to bypass protected-branch
requirements. Do not grant write access to the generation or PR jobs.

The included Apache-2.0 license covers these catalog tools. Individual Apps
retain the licenses declared by their authors. `market-export.json` identifies
the Hana version used to export the bundled tool. This repository maintains its
own documents, templates and workflows. To update the tool, run
`npm run export:extension-market -- --update <path-to-this-checkout>` from a Hana
checkout; it replaces only `scripts/extension-market-sync.mjs` and
`market-export.json`. Review the resulting changes before committing them.

## Review scope and responsibility / 审核范围与责任说明

本市场收录第三方扩展。上架审核主要检查提交规范、基本可加载性及明显的安全与公开内容风险，不构成全面的功能、代码安全或法律合规认证。

收录、审核通过或合并 PR，不代表市场维护者认同或支持扩展及其介绍、文档、素材中表达的观点，也不代表推荐或担保其质量。

扩展作者应确保其代码、文档、图片及其他素材具有合法使用和分发依据，并遵守适用法律及相关服务条款。各扩展适用其自身声明的许可证。

如发现涉嫌侵权、违法违规或其他重大风险，请通过本仓库 Issue 联系维护者，提供相关条目、具体问题及必要证据。请勿公开提交个人敏感信息或凭据。维护者将根据情况核实，并采取要求整改、暂停收录或下架等措施；紧急风险可先暂停收录。

本说明不排除或限制适用法律规定不得排除或限制的责任。

This market lists third-party extensions. Admission review mainly checks
submission conformance, basic loadability, and obvious security or public-content
risks; it is not a comprehensive functional, code-security, or legal-compliance
certification.

Listing, passing review, or merging a pull request does not mean the market
maintainers endorse or support any views expressed in an extension or its
introduction, documentation, or assets, nor does it recommend or warrant their
quality.

Extension authors are responsible for ensuring that their code, documentation,
images, and other assets have a lawful basis for use and distribution, and for
complying with applicable laws and relevant terms of service. Each extension is
governed by the license it declares.

To report suspected infringement, illegality, or other significant risk, contact
the maintainers through this repository's Issues with the relevant entry, the
specific problem, and necessary evidence. Do not post personal sensitive
information or credentials publicly. Maintainers will verify as appropriate and
take measures such as requesting fixes, pausing listing, or removal; urgent
risks may be paused first.

This notice does not exclude or limit any liability that applicable law does not
allow to be excluded or limited.

https://github.com/liliMozi/hana-marketplace/issues
