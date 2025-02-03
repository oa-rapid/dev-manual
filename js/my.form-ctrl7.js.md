# my.FormCtrl7.js

> 第七代表單底層 \
> 建構中
>

## Master Edit 操作

### objM.checkEdit([callback], [errorCallback])

> 檢查是否可以編輯
> 
> 可以編輯時: 進入編輯模式並執行 callback
> 
> 無法編輯時: 顯示無法編輯並執行 errorCallback

```javascript
objM.checkEdit(() => {
  // success callback
  // code...
}, () => {
  // error callback 
  // code...
})
```

### objM.getInputValue(String field)

取得 input 欄位 值

```javascript
objM.getInputValue('dlvno')
```

## Detial Data 修改

### 當detail 被編輯時

![](../images/js/JS開發文件/Detial%20Edit-ctrl7.png)

### objD.setEditData(Object row)

設定 當前正在修改的那一列 值

```javascript
objD.setEditData({prdno: 'ABC'});
```
> 將當前那一列的 prdno 這個欄位直 改成 ABC

## Detail事件

### this.fnDetailOnChange(Int idxGrd, String fldna, Object row)

當資料被修改時

```javascript
this.fnDetailOnChange = (idxGrd, fldna, row) => {
  var masrow = objM.getMasterData();
  var rowidx = objD.getSelectIndex(idxGrd);
  //code...

  objD.setEditData({prdno: 'ABC'});
}
```