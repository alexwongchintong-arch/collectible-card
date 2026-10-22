# 球星卡 (Collectible Card)

## 项目简介

人才盘点与球星卡工具：用 5 大类 20 项子维度给每个人建卡，支持 160 题自评测评、团队互补性分析、智能组队与 PK 对比；另有「职业生态系统」五层金字塔。纯前端单文件应用，数据存储在 localStorage。面向使用者的完整说明见 `README.md`。

另含「自问清单」模块：把书籍笔记整理成 12 张清单 / 82 道题，支持逐题与全览填写、按年份轮次作答、跨轮回顾对照、甜蜜区工作表，中英双语。

## 项目结构

```
collectible-card/
├── index.html             # GitHub Pages 入口（跳转到 src/index.html）
├── src/
│   ├── index.html         # 应用本体（HTML + CSS + JS 单文件，约 11,700 行）
│   ├── question-bank.js   # 160 题题库（20 项子维度 × 8 题）
│   ├── checklist-data.js  # 自问清单数据（categories → groups → sections → items）
│   ├── checklist-i18n.js  # 自问清单英文内容（按 group / section / item 顺序覆盖中文数据）
│   ├── checklist.js       # 自问清单模块（卡墙、逐题/全览、轮次、回顾对照、甜蜜区工作表）
│   ├── i18n.js            # 中英文界面字典与语言切换逻辑
│   └── assets/avatars/    # 三张演示头像（可替换）
├── docs/screenshots/      # README 使用的界面截图
├── README.md              # 中文说明
├── README.en.md           # 英文说明
├── LICENSE                # MIT
└── CLAUDE.md              # 项目文档（本文件）
```

## 环境要求

无第三方依赖、无构建步骤。任意现代浏览器即可（需支持 ES6+ 与 Canvas）：Chrome / Edge / Safari / Firefox。

## 快速开始

直接双击打开 `src/index.html`；或起本地服务（推荐）：

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000/src/index.html
```

## 开发约定

- 直接编辑 `src/index.html`，刷新浏览器即可验证，没有构建流程。
- 不要随意改动 localStorage 键名（`star-card-data-v2`、`star-card-groups-v1`、`self-check-*`）与导出文件的 `version` 字段，以免破坏老数据兼容。
- 改动后请手动走通主要链路：新建卡片 → 打分 / 测评 → 卡组 → 团队分析 → PK，以及 Hub → 职业生态系统 / 自问清单（逐题 / 全览 / 新一轮 / 回顾对照）。
- 提交身份使用 GitHub noreply（`alexwongchintong-arch`），不要改成带本机主机名的邮箱。
