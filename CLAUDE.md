# 球星卡 (Collectible Card)

## 项目简介

人才盘点与球星卡工具：用 5 大类 20 项子维度给每个人建卡，支持 160 题自评测评、团队互补性分析、智能组队与 PK 对比。纯前端单文件应用，数据存储在 localStorage。面向使用者的完整说明见 `README.md`。

## 项目结构

```
collectible-card/
├── src/
│   ├── index.html         # 应用本体（HTML + CSS + JS 单文件，约 10,700 行）
│   ├── question-bank.js   # 160 题题库（20 项子维度 × 8 题）
│   └── assets/avatars/    # 三张演示头像（可替换）
├── docs/screenshots/      # README 使用的界面截图
├── README.md              # 对外项目说明（面向使用者的文档以它为准）
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
- 不要随意改动 localStorage 键名（`star-card-data-v2`、`star-card-groups-v1`）与导出文件的 `version` 字段，以免破坏老数据兼容。
- 改动后请手动走通主要链路：新建卡片 → 打分 / 测评 → 卡组 → 团队分析 → PK。
