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

### scrollview

設定 grid 是否使用 scrollview
```
scrollview=0,1
```

### changeview

設定 grid 使用 scrollview 時 changeview 預設是 0
changeview=1 時 編輯時 會取消 scrollview 模式
```
changeview=1
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
>

### 取消 key 的特殊文字輸入
PK 在表單輸入時 可以消 底層限制的 mask

```
keyFieldRegex=N
```

### 將 tab 隱藏
將 detail 的 特定 頁籤關閉

```
hidetab=tab英文標籤
```

## 將 detail 的 右鍵功能設定

> 多個Detail Grid用逗號分隔

### 設定Detail Grid唯讀 

```
disableGrd=0

disableGrd=0,1
```

### 設定Detail Grid 不能新增

```
disableGrdAppend=0
```

### 設定Detail Grid 不能編輯

```
disableGrdModify=0
```

### 設定Detail Grid 不能刪除

```
disableGrdRemove=0
```
