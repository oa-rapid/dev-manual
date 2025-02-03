# my.FormCtrl7.js

> 第七代表單底層 \
> 建構中
>

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