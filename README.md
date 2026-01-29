# 算命擂台 - 前端

四大流派命理大師同台較勁，看誰能算準你的命。

## 功能

- 🔮 輸入問題和出生資訊
- 📖 四位大師各自解讀（西洋占星、紫微斗數、八字、塔羅）
- ⚔️ 大師們激烈辯論
- 🤝 最終形成共識（或保留分歧）

## 開發

```bash
# 安裝依賴
npm install

# 本地開發
npm run dev

# 建置
npm run build
```

## 環境變數

```
VITE_API_URL=http://localhost:8080/api/v1
```

## 部署

使用 Terraform 部署到 GCP Cloud Run。

```bash
cd ../selfkit-infra
terraform apply
```
