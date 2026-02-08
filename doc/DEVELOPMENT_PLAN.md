# 开发计划 / Implementation Plan

> 目标：在保持「应用层 / 数据层」清晰分离的前提下，先用 SQLite 开发，后续可无感迁移到 MongoDB。

## 0. 总体原则 / Principles

- **分层清晰**：UI（页面）→ 应用层（用例/服务）→ 数据层（Repository）。
- **数据层可替换**：应用层只依赖抽象接口，不依赖具体数据库。
- **接口优先**：先定义领域模型与仓储接口，再实现 SQLite 版本。
- **最小可用**：先完成最小闭环（新增记录 → 列表 → 查看/编辑）。

---

## 1. 里程碑 / Milestones（细化版）

### M1：项目骨架 + UI 打底
- 创建小程序项目结构（`pages/`, `components/`, `assets/`, `services/`）。
- 设计并搭建基础页面：`home` / `log` / `history` / `detail`。
- 统一基础样式（按钮、输入框、列表项、空状态）。
- 约定数据字段与交互规范（日期、单位、必填校验、默认值）。

### M2：本地存储 MVP（无后端）
- 表单页面完成：新增健身记录 + 身体数据（单日）。
- 历史列表展示：按日期分组，支持筛选（近 7 天 / 本月）。
- 详情页完成：查看 / 编辑 / 删除。
- 临时存储：`wx.setStorage` / `wx.getStorage` 持久化。
- 完成最小闭环：新增 → 列表 → 详情 → 编辑/删除。

### M3：应用层 / 数据层分离（接口优先）
- 定义领域模型（`FitnessEntry`, `BodyMetrics`）。
- 抽象 `Repository` 接口（CRUD + 查询 + 日期范围）。
- 定义应用层服务（Use Case）：\n  - `LogFitnessUseCase`\n  - `LogBodyMetricsUseCase`\n  - `GetHistoryUseCase`\n  - `UpdateEntryUseCase`\n  - `DeleteEntryUseCase`
- 小程序页面只调用应用层，不直接调用数据层。

### M4：后端服务 + SQLite 实现
- 建立后端项目结构（API 路由、服务层、Repository 实现）。
- 定义 REST API（新增/查询/更新/删除）。
- 实现 SQLite 数据库与迁移脚本（初始化表结构）。
- 接入小程序：用 `services/api` 调用后端。
- 回归测试：与 M2 的功能对齐。

### M5：统计与趋势
- 设计统计指标（训练次数、总时长、体重变化、腰围变化）。
- 提供统计 API（按日/周/月聚合）。
- 图表展示（ECharts 小程序版或简化列表）。

### M6：无感切换 MongoDB
- 实现 MongoDB Repository（保持接口不变）。
- 通过配置切换数据实现（SQLite ↔ MongoDB）。
- 回归测试：确保 API 和页面行为一致。

---

## 2. 领域模型 / Domain Model

### FitnessEntry
- id
- date
- type（running / cycling / strength / plank / pushups / custom）
- duration
- count
- notes

### BodyMetrics
- id
- date
- weight
- waistline

---

## 3. 核心接口设计 / Core Interfaces

```ts
// 应用层依赖的接口（伪代码）
interface FitnessRepository {
  create(entry: FitnessEntry): Promise<FitnessEntry>
  listByDateRange(start: string, end: string): Promise<FitnessEntry[]>
  getById(id: string): Promise<FitnessEntry | null>
  update(id: string, entry: Partial<FitnessEntry>): Promise<void>
  delete(id: string): Promise<void>
}

interface BodyMetricsRepository {
  create(entry: BodyMetrics): Promise<BodyMetrics>
  listByDateRange(start: string, end: string): Promise<BodyMetrics[]>
  getById(id: string): Promise<BodyMetrics | null>
  update(id: string, entry: Partial<BodyMetrics>): Promise<void>
  delete(id: string): Promise<void>
}
```

---

## 4. 小程序页面规划 / Pages

- `pages/home`：入口 + 今日摘要
- `pages/log`：新增记录（健身 + 身体数据）
- `pages/history`：历史列表
- `pages/detail`：详情 / 编辑
- `pages/stats`：统计图表

---

## 5. 后端服务规划（WSL）/ Backend Plan

- 提供 REST API（Node/Nest 或 Python/Flask）。
- 初期 SQLite 实现（通过 Repository 接口）。
- 后续切换 MongoDB（实现同一接口）。

---

## 6. 下一步 / Next Step

1. 初始化小程序项目结构。
2. 确定技术栈（原生小程序 + 后端框架）。
3. 从 UI 表单开始搭建（记录页面）。
