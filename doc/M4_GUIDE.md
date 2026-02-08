# M4 开发指导 / M4 Step-by-Step Guide

> 目标：完成 **后端服务 + SQLite 实现**，并通过 API 接入小程序。
> 关键：应用层只依赖 Repository 接口；小程序通过 `services/api` 调用后端。

---

## 0) 前置准备

- Node.js 18+（推荐）
- SQLite3（或 `better-sqlite3`）
- Postman / Insomnia / curl（用于调试 API）
- 微信开发者工具

---

## 1) 设计后端项目结构

建议在仓库根目录新增 `server/`：

```
server/
  src/
    app.js
    routes/
      fitness.js
      bodyMetrics.js
    services/
      fitnessService.js
      bodyMetricsService.js
    repositories/
      fitnessRepository.js
      bodyMetricsRepository.js
    db/
      sqlite.js
      migrations/
        001_init.sql
  package.json
```

> 说明：后端分层结构与小程序一致：**路由 → 服务(用例) → Repository**。

---

## 2) 初始化 SQLite 数据库与迁移

在 `server/src/db/migrations/001_init.sql` 中创建表：

```sql
CREATE TABLE IF NOT EXISTS fitness_entries (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  type TEXT NOT NULL,
  duration INTEGER DEFAULT 0,
  count INTEGER DEFAULT 0,
  calories INTEGER DEFAULT 0,
  notes TEXT DEFAULT ""
);

CREATE TABLE IF NOT EXISTS body_metrics (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  weight REAL DEFAULT 0,
  waistline REAL DEFAULT 0
);
```

在 `server/src/db/sqlite.js` 中：
- 初始化 SQLite 连接
- 运行 migrations（启动时执行）
- 导出 `db` 实例

> 推荐：启动时检查 `migrations` 文件并依序执行。

---

## 3) Repository 接口与实现（SQLite 版）

保持与 M3 接口一致：

```ts
interface FitnessRepository {
  create(entry)
  listByDateRange(start, end)
  listAll()
  getById(id)
  update(id, patch)
  delete(id)
}
```

`server/src/repositories/fitnessRepository.js` 示例：
- `create`：INSERT
- `listAll`：SELECT * ORDER BY date DESC
- `listByDateRange`：WHERE date BETWEEN ? AND ?
- `getById`：SELECT * WHERE id = ?
- `update`：UPDATE SET ... WHERE id = ?
- `delete`：DELETE WHERE id = ?

`bodyMetricsRepository.js` 同理。

> 说明：Repository 只负责数据读写，不做业务规则。

---

## 4) 服务层（Use Case / Service）

在 `server/src/services/` 中实现：

- `fitnessService.js`
  - `createFitnessEntry(payload)`
  - `listFitnessEntries({ range })`
  - `getFitnessEntry(id)`
  - `updateFitnessEntry(id, patch)`
  - `deleteFitnessEntry(id)`
- `bodyMetricsService.js` 同理

> 说明：服务层可复用 M3 的日期范围逻辑（7d / month / all）。

---

## 5) API 路由设计

### Fitness API

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | /api/fitness | 新增健身记录 |
| GET | /api/fitness?range=7d | 查询记录（范围） |
| GET | /api/fitness/:id | 单条详情 |
| PATCH | /api/fitness/:id | 更新 |
| DELETE | /api/fitness/:id | 删除 |

### BodyMetrics API

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | /api/body-metrics | 新增身体数据 |
| GET | /api/body-metrics?range=7d | 查询记录（范围） |
| GET | /api/body-metrics/:id | 单条详情 |
| PATCH | /api/body-metrics/:id | 更新 |
| DELETE | /api/body-metrics/:id | 删除 |

> 统一返回 JSON：

```json
{ "data": ..., "error": null }
```

发生错误时：

```json
{ "data": null, "error": "message" }
```

---

## 6) 前端（小程序）接入 API

在 `services/api/` 目录新增文件：

```
services/api/
  http.js
  fitnessApi.js
  bodyMetricsApi.js
```

示例（伪代码）：

```js
// http.js
const request = ({ url, method = "GET", data }) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      success: (res) => resolve(res.data),
      fail: reject
    });
  });
};

module.exports = { request };
```

然后在 `services/usecases/` 中改成调用 API（而非本地 repository）。

> 说明：**页面仍然只调用用例**，只是用例内部从本地 repo 切换为 API。

---

## 7) 回归检查清单

- [ ] 小程序 `log` 页面：新增成功
- [ ] `history` 列表：查询范围正常（7d / month / all）
- [ ] `detail` 页面：读取 / 更新 / 删除正常
- [ ] 服务端日志无报错
- [ ] SQLite 数据落盘正确

---

## 8) M4 完成标准（Done）

✅ 以下都满足即可认为 M4 完成：

1. 后端服务已创建并可运行。
2. SQLite 表结构与迁移脚本已完成。
3. Repository + Service + Route 分层完整。
4. 小程序通过 API 访问数据（不再直接读本地 storage）。
5. 完成 M2 功能回归。

---

## 9) 常见问题

- **为什么还需要 Repository 层？**
  因为 M6 需要切换到 MongoDB，Repository 是隔离层。

- **API 为什么返回统一结构？**
  方便前端统一错误处理。

---

## 10) 本地与 NAS 部署（HTTP）

### 本地验证（开发机）

1. 进入后端目录并安装依赖：
   ```bash
   cd server
   npm install
   ```
2. 启动服务：
   ```bash
   npm run dev
   ```
3. 在小程序 `app.js` 中设置 API：
   ```js
   apiBaseUrl: "http://localhost:3000"
   ```

> 小程序本地调试时，可在微信开发者工具「详情 → 本地设置」勾选 **不校验合法域名**，否则 HTTP 请求会失败。

### NAS 部署（HTTP）

1. 将代码同步到 NAS（git clone 或手动拷贝）。\n
2. 在 NAS 上安装 Node.js 18+。\n
3. 在 NAS 上执行：
   ```bash
   cd /path/to/Subtly/server
   npm install
   npm run start
   ```
4. 路由器端口映射：将公网端口（如 3000）映射到 NAS 内网 IP 的 3000 端口。\n
5. 使用 DDNS 域名访问：\n
   - `http://your-domain:3000/health` 返回 `{ data: "ok", error: null }` 即成功。\n
6. 在小程序 `app.js` 中设置：
   ```js
   apiBaseUrl: "http://your-domain:3000"
   ```

> 这是 M4 的 HTTP 版本，方便快速打通流程。

---

## 11) HTTPS 方案（M5/M6 使用）

当进入 M5/M6，建议切换到 HTTPS：\n

### 方案 A：NAS 自带反向代理（推荐）

1. 在 NAS 的反向代理（如 Nginx/Caddy）配置：\n
   - 外部域名：`https://your-domain`\n
   - 证书：使用你已有的 HTTPS 证书\n
   - 反向代理到：`http://127.0.0.1:3000`\n
2. 保证 443 端口对外开放。\n
3. 小程序 `app.js` 更新为：
   ```js
   apiBaseUrl: "https://your-domain"
   ```

### 方案 B：直接让服务监听 HTTPS

1. 在 Node 服务中引入 `https` 模块，加载证书文件。\n
2. 监听 443 端口（或反向代理到 3000）。\n

> 实际部署更推荐 **方案 A**，对证书与续期管理更友好。

---

## 12) 微信管理后台配置

### 开发阶段（HTTP）

1. 打开微信开发者工具 → 详情 → 本地设置。\n
2. 勾选 **不校验合法域名**。\n

### 上线或 HTTPS 阶段

1. 登录 **微信公众平台** → 小程序 → 开发 → 开发管理 → 开发设置。\n
2. 配置以下域名（需 HTTPS）：\n
   - request 合法域名：`https://your-domain`\n
   - socket/upload/download 视需求填写\n
3. 重新上传小程序代码并发布。\n

> 微信正式环境 **必须使用 HTTPS**，HTTP 仅用于本地调试或开发工具阶段。

---

完成后告诉我：**“M4 已完成”**，进入 M5（统计与趋势）。
