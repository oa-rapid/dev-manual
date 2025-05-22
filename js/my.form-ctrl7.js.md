# my.FormCtrl7.js

> 第七代表單底層 \
> 建構中
>
### 腳本樣板

```javascript
//create form control
createFormCtrl7();

/**
 * Custom Control
 */
function FormCtrl7C(objM, objD){
  this.name = objM.name;
  this.objM = objM;
  this.objD = objD;
  var obj = this;
  var tabEdit;

  this.init = function() {
    tabEdit = objM.tabEdit;
  }

  this.setToolbar = function() {
    //
  }
}
```

> obM - Master controller 使用 objM.method 呼叫&#x20;
>
> objD - Detail controller 使用 objD.method 呼叫&#x20;

## 初始設定

### this.init()
_範例一_

```javascript
  this.init = function() {
    objM.copyEmpty['mas'] = [];               // 複製時       Master 要刪除資料的欄位
    objM.copyEmpty['det'] = ['rem','rem2'];   // 複製時 第0個 Detail 要刪除資料的欄位
    objM.copyEmpty['det1'] = ['rem','rem2'];  // 複製時 第1個 Detail 要刪除資料的欄位
    objM.copyEmpty['det2'] = ['rem','rem2'];  // 複製時 第2個 Detail 要刪除資料的欄位
    objM.copyEmpty['det3'] = ['*'] // 當輸入 ['*'] or ['_all_'] 時 複製時刪除所有欄位資料 
  }
```

> 說明
> * objM.copyEmpty 設定 複製時需要刪除的欄位
>   * objM.copyEmpty['mas']      複製時       Master 要刪除資料的欄位
>   * objM.copyEmpty['det']      複製時 第0個 Detail 要刪除資料的欄位
>   * objM.copyEmpty['det{n}']   複製時 第n個 Detail 要刪除資料的欄位 P.S. = ['*'] or ['_all_'] 時 刪除所有欄位

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