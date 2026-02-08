# M3 开发指导 / M3 Step-by-Step Guide

> 目标：完成 **应用层 / 数据层分离（接口优先）**。
> 页面只调用用例（Use Case），不直接读写本地存储。

## 0) 你需要准备的工具

- 微信开发者工具（已安装 ✅）
- VS Code（可选，但推荐）

---

## 1) 定义领域模型（Domain Model）

在 `domain/models.js` 中创建两个模型构造函数：

- `FitnessEntry`
- `BodyMetrics`

示例结构：

```js
const createFitnessEntry = ({
  id,
  date,
  type,
  duration = 0,
  count = 0,
  calories = 0,
  notes = ""
}) => ({
  id,
  date,
  type,
  duration,
  count,
  calories,
  notes
});

const createBodyMetricsEntry = ({
  id,
  date,
  weight = 0,
  waistline = 0
}) => ({
  id,
  date,
  weight,
  waistline
});
```

> 说明：M3 的关键是**让页面只拿到领域对象**，而不是散乱的字段。

---

## 2) 抽象 Repository 接口（接口优先）

为后续 SQLite/MongoDB 做准备，先把接口设计清楚。

建议接口能力（伪代码）：

```ts
interface FitnessRepository {
  create(entry): Promise<FitnessEntry>
  listByDateRange(start, end): Promise<FitnessEntry[]>
  listAll(): Promise<FitnessEntry[]>
  getById(id): Promise<FitnessEntry | null>
  update(id, patch): Promise<void>
  delete(id): Promise<void>
}

interface BodyMetricsRepository {
  create(entry): Promise<BodyMetrics>
  listByDateRange(start, end): Promise<BodyMetrics[]>
  listAll(): Promise<BodyMetrics[]>
  getById(id): Promise<BodyMetrics | null>
  update(id, patch): Promise<void>
  delete(id): Promise<void>
}
```

> 说明：JS 没有强制接口，可用文档 + 约定实现。后续 M4 直接替换实现即可。

---

## 3) 实现本地存储 Repository（M3 仍用本地）

在 `services/repositories/` 下实现：

- `fitnessRepository.js`
- `bodyMetricsRepository.js`

要求：
- 只能访问 `utils/storage`
- 对外只暴露 CRUD + 查询方法
- 页面**不允许**直接访问 `storage`

---

## 4) 定义应用层 Use Case

在 `services/usecases/` 下创建用例，页面只调用这些用例：

- `LogFitnessUseCase`
- `LogBodyMetricsUseCase`
- `GetHistoryUseCase`
- `UpdateEntryUseCase`
- `DeleteEntryUseCase`

可选（用于详情页）：
- `GetEntryUseCase`

> 用例内部只调用 Repository，不允许操作页面状态。

---

## 5) 页面接入应用层

修改 `pages/` 下所有页面逻辑：

- **Log**：提交时调用 `logFitnessUseCase` / `logBodyMetricsUseCase`
- **History**：列表读取调用 `getHistoryUseCase`
- **Detail**：编辑/删除调用 `updateEntryUseCase` / `deleteEntryUseCase`
- **Home**：摘要统计调用 `getHistoryUseCase`

> 页面不直接调用 `utils/storage` 或 Repository。

---

## 6) 完成标准（M3 Done）

✅ 以下都满足即可认为 M3 完成：

1. 领域模型已定义（`FitnessEntry`, `BodyMetrics`）。
2. Repository 接口能力清晰（CRUD + 查询 + 日期范围）。
3. 具体实现为本地存储，但已封装在 Repository。
4. 用例齐全并可被页面调用。
5. **页面只调用 Use Case，不直接读写数据层。**

---

## 下一步

完成后告诉我：**“M3 已完成”**，进入 M4（后端服务 + SQLite 实现）。
