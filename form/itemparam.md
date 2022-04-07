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
