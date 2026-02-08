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

## 3) 页面组件引入方式

每个页面在 `index.json` 中声明组件，例如：

```json
{
  "usingComponents": {
    "van-button": "@vant/weapp/button/index",
    "van-field": "@vant/weapp/field/index",
    "van-cell-group": "@vant/weapp/cell-group/index",
    "van-empty": "@vant/weapp/empty/index"
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
- `van-empty`：空状态
- `van-dialog` / `van-popup`：弹层
- `van-datetime-picker`：日期选择

## 6) 后续建议

- 如果你希望更强的视觉风格，可以加主题色与字号变量统一。
- 日期选择可从原生 picker 升级为 `van-datetime-picker`。
