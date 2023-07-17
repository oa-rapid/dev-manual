# 功能表參數

> [!tip] 各參數以導向符號"|"分隔

## 工具列按鈕


### 隱藏按鈕

```
隱藏新增
MasterInsert=N

隱藏修改
MasterModify=N

隱藏刪除
MasterDelete=N

隱藏複製
MasterCopy=N

取消 key 的特殊文字輸入
keyFieldRegex=N

將 tab 隱藏
hidetab=tab英文標籤
```


### 按鈕名稱

> btnInsert 新增 \
> btnModifyCtrl 修改 \
> btnDeleteCtrl 刪除/或作廢 \
> btnCopy 複製 \
> btnStusFilter 篩選

### 狀態代碼

> V 作廢 \
> C 結案 \
> U 使用 \
> A 核准

> [!tip] 其他可參考 設計中心 > 工具 > 參考代碼維護 > stus

### 按鈕狀態控制

範例：結案、作廢、核准，不可修改；其他同理
```
btnModifyCtrl=CVA

btnDeleteCtrl=CVA
```

### 可篩選狀態
範例：可使用結案、作廢篩選單據
```
btnStusFilter=CV
```

## 其他參數

### 表單圖片管理

使用圖片/檔案當做附件，附屬於表單資料列鍵值欄位

```
btnImgMgr=1|
```

### 掛鉤報表

自動產生列印按鈕，關聯報表編號

```
repno=REP010010
```

> [!tip] 複雜的列印控制請使用js plugin