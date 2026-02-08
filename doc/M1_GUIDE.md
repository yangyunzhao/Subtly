# M1 开发指导 / M1 Step-by-Step Guide

> 目标：完成 **项目骨架 + UI 打底**。你不需要任何前端经验，照步骤操作即可。

## 0) 你需要准备的工具

- 微信开发者工具（你已安装 ✅）
- VS Code（可选，但推荐）
- WSL + Ubuntu（可选，用于后端；本阶段可先不启用）

---

## 1) 新建小程序项目（在微信开发者工具）

1. 打开微信开发者工具。
2. 点击 **“新建项目”**。
3. 填写：
   - 项目名称：`Subtly`
   - 目录：选择你的仓库根目录（含 `Readme.md` 的那个目录）
   - AppID：如果没有就选 **测试号** / **无 AppID**
4. 点击创建，工具会生成基础小程序目录结构。

> 说明：微信开发者工具会自动生成 `app.js` / `app.json` / `app.wxss` 等文件，这是正常的。

---

## 2) 创建页面目录结构

在项目根目录下创建以下页面（可在开发者工具里操作，或手动创建文件夹）：

```
pages/
  home/
  log/
  history/
  detail/
```

每个页面需要 4 个文件：

```
index.wxml
index.wxss
index.js
index.json
```

你可以在微信开发者工具中：
1. 右键 `pages` → 新建文件夹
2. 右键页面目录 → 新建文件

---

## 3) 配置 app.json

在 `app.json` 中设置页面路由（按顺序）：

```json
{
  "pages": [
    "pages/home/index",
    "pages/log/index",
    "pages/history/index",
    "pages/detail/index"
  ]
}
```

---

## 4) 搭建页面骨架（占位 UI）

每个页面先放一个标题，确保能正常渲染。示例（`pages/home/index.wxml`）：

```xml
<view class="page">
  <text class="title">Home</text>
</view>
```

并在 `index.wxss` 加上基础样式：

```css
.page {
  padding: 24rpx;
}
.title {
  font-size: 36rpx;
  font-weight: 600;
}
```

同样给 `log` / `history` / `detail` 页面加简单标题。

---

## 5) 验证

在开发者工具中切换预览页面，确认页面能加载且不报错。

---

## ✅ 完成标准（本阶段）

- 项目可在开发者工具中正常运行
- 4 个页面都能打开并显示标题
- `app.json` 路由正确

---

## 下一步

如果以上都完成，告诉我：**“M1 已完成”**  
我就进入 M1 的下一部分（统一样式 + 表单 UI 打底）。
