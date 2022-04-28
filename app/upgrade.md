# app 線上更新

> 步驟一：打包更新檔案

- 安裝 7z 壓縮軟體
- 執行 app/c.bat 製作 [xxx]-app-patch.zip

> 步驟二：修改更新資訊檔

- 修改 app\update\upgrade.json

```js
{
  "version": "2022.04.27.03", <= 異動這一行更版檔案的版本
  "apkVersion": "2022.03.15.01",
  "patch": "xxx-app-patch.zip",
  "basePath": "www/",
  "stylesheet": [
    {
      "file": "{dataDir}css/style.css"
    }
  ],
  "script": [
    {
      "file": "{dataDir}js/pub.func.js"
    },{
      ...
    },{
      "file": "{dataDir}js/Amaha020080.js" <= 有新增表單必須將js在加這一行
    }
  ]
}
```

> 步驟三：上傳更新檔案

- 使用 FileZilla 連接 ftp 服務
- 上傳 [xxx]-app-patch.zip, upgrade.json 到 update 目錄下