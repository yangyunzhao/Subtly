# 本地开发环境（WSL + Ubuntu）/ Local Dev Setup (WSL + Ubuntu)

> 微信开发者工具是 Windows/macOS 图形化应用。即使代码放在 WSL 中，也需要在 **Windows 侧** 安装并运行开发者工具。

## 1) 安装 WSL 与 Ubuntu / Install WSL & Ubuntu
- 按微软官方文档启用 WSL2 并安装 Ubuntu。
- 建议使用 **WSL2**，并开启与 Windows 的文件互通（默认已启用）。

## 2) 安装微信开发者工具 / Install WeChat DevTools (Windows)
- 在 Windows 下载并安装「微信开发者工具」。
- 登录微信开发者工具，并准备好小程序 AppID（或使用测试号）。

## 3) 选择项目目录 / Choose Project Directory
- **推荐**将项目放在 Windows 磁盘（如 `C:\Projects\Subtly`），避免 WSL 与 Windows 读写同一目录导致的性能问题。
- 如果你想在 WSL 中编辑：
  - 可在 WSL 中通过 `/mnt/c/Projects/Subtly` 访问该目录。
  - VS Code 安装 Remote - WSL 插件可直接在 WSL 中编辑。

## 4) 在开发者工具中导入 / Import in DevTools
- 打开微信开发者工具 → 导入项目 → 选择项目目录。
- 选择小程序类型，填写 AppID（或选择无 AppID 的测试模式）。

## 5) 常用开发流程 / Typical Workflow
- 在 VS Code（WSL）中编写代码。
- 在微信开发者工具中预览、调试、真机扫码。

> 可选：若需要命令行能力，可在微信开发者工具设置中开启 CLI 并配置 `cli` 路径。

---

> WeChat DevTools is a GUI app for Windows/macOS. Even if your code lives in WSL, you still run DevTools on **Windows**.

## 1) Install WSL & Ubuntu
- Enable WSL2 and install Ubuntu (per Microsoft docs).
- Use **WSL2** for best compatibility.

## 2) Install WeChat DevTools (Windows)
- Download and install WeChat DevTools on Windows.
- Sign in and prepare your Mini Program AppID (or use a test AppID).

## 3) Choose Project Directory
- **Recommended:** keep the repo on Windows disk (e.g. `C:\Projects\Subtly`) to avoid slow cross-filesystem IO.
- If you want to edit from WSL:
  - Access it via `/mnt/c/Projects/Subtly`.
  - Use VS Code Remote - WSL for a smoother workflow.

## 4) Import in DevTools
- Open WeChat DevTools → Import Project → select the repo folder.
- Choose Mini Program type and enter AppID (or use test mode).

## 5) Typical Workflow
- Code in VS Code (WSL).
- Preview/debug/scan in WeChat DevTools.

> Optional: enable CLI in DevTools settings if you want command-line integration.
