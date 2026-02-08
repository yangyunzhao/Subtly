# UI 框架集成指南（Vant Weapp）

> 目标：提供简单易用、组件丰富、文档完善的 UI 框架。推荐使用 **Vant Weapp**。

## 1) 为什么选 Vant Weapp

- 组件丰富：按钮、表单、列表、空状态、弹层、日期选择等常用组件齐全。
- 上手简单：按需引入组件，语义清晰，适合快速搭建。
- 社区成熟：文档完善，案例多，维护稳定。

## 2) 安装与构建（小程序 npm）

1. 在项目根目录安装依赖：

```bash
npm install
```

2. 在微信开发者工具中：

- 工具 -> 构建 npm
- 勾选 “使用 npm 模块”

> 之后会生成 `miniprogram_npm/` 目录。

### 常见问题：npm install 提示 “No matching version found”

如果出现类似报错：`No matching version found for vant-weapp@^1.11.6`，通常是版本号超出当前 npm 源的可用范围。此仓库已经改为使用 `vant-weapp: "latest"` 来避免该问题。你可以按以下步骤修复：

1. 更新 `package.json`（已在仓库中修复为 `latest`）。
2. 删除 lock 文件与缓存后重装：

```bash
rm package-lock.json
npm cache clean --force
npm install
```

3. 若仍失败，请确认 npm 源可用（例如设置为官方源）：

```bash
npm config set registry https://registry.npmjs.org/
```

### 常见问题：模拟器提示找不到组件路径

如果报错类似：`component not found in the path ... @vant/weapp/button/index`，说明当前构建输出的目录是 `miniprogram_npm/vant-weapp/...`。请确保 `usingComponents` 使用 `vant-weapp/xxx/index` 路径（本仓库已统一为该写法），并重新 **构建 npm**。

### 常见问题：找不到 `vant-weapp/empty/index`

如果 `miniprogram_npm/vant-weapp` 目录下没有 `empty` 组件（你提供的目录结构中确实缺失），请移除 `van-empty` 的引用，使用自定义空状态布局替代（本仓库已切换为自定义空状态）。

## 3) 页面组件引入方式

每个页面在 `index.json` 中声明组件，例如：

```json
{
  "usingComponents": {
    "van-button": "vant-weapp/button/index",
    "van-field": "vant-weapp/field/index",
    "van-cell-group": "vant-weapp/cell-group/index"
  }
}
```

## 4) 已集成页面

- Home：按钮
- Log：表单字段 + 按钮
- History：列表 + 空状态 + 按钮
- Detail：列表展示

## 5) 常用组件推荐

- `van-button`：按钮
- `van-field`：输入框
- `van-cell` / `van-cell-group`：列表项
- 空状态：部分版本可能未提供 `empty` 组件，可用自定义空状态容器替代
- `van-dialog` / `van-popup`：弹层
- `van-datetime-picker`：日期选择

### 注意事项：tabs 组件加载失败

如果控制台提示 `vant-weapp/tabs` 被代码依赖分析忽略，可先用自定义切换按钮替代（例如两个 `van-button` 切换表单），或在开发者工具中关闭 **过滤无依赖文件** 再重新构建 npm。

## 6) 后续建议

- 如果你希望更强的视觉风格，可以加主题色与字号变量统一。
- 日期选择可从原生 picker 升级为 `van-datetime-picker`。
