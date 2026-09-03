# 远宇宙魔法属性 PK

## 部署到 Netlify（不用命令行）

### 1. 上传到 GitHub

1. 登录 [GitHub](https://github.com)，点击右上角 **+** → **New repository**。
2. Repository name 填写 `magic-pk`，选择 **Public** 或 **Private**，然后点击 **Create repository**。
3. 在新仓库页面点击 **Add file** → **Upload files**。
4. 将本文件夹中的所有内容上传：`index.html`、`assets` 文件夹、`netlify` 文件夹、`package.json`。
5. 点击 **Commit changes**。

### 2. 连接 Netlify

1. 登录 [Netlify](https://app.netlify.com)。
2. 点击 **Add new project** → **Import an existing project** → **GitHub**。
3. 首次使用时，按提示授权 Netlify 访问 GitHub；随后选择刚刚创建的 `magic-pk` 仓库。
4. Build command 留空，Publish directory 留空，点击 **Deploy site**。

### 3. 首次生成销量数据

1. 等待首次部署完成，打开项目后台的 **Functions**。
2. 找到 `update-sales`，打开它并点击 **Run now**。
3. 等待片刻，刷新网站首页，即可看到「属性销量魔法榜」。

之后 Netlify 会每 15 分钟自动抓取一次公开商品页库存，并用 `99,999 - 库存` 计算销量。若商品页结构变化或抓取失败，可在 Functions 的 `update-sales` 页面查看日志。

## 项目文件

- `index.html`：活动页面与销量排行榜
- `assets/magic-castle.jpg`：首页背景图
- `netlify/functions/update-sales.mjs`：定时抓取并计算销量
- `netlify/functions/sales.mjs`：向网页提供最新销量数据
- `package.json`：Netlify 安装所需依赖
