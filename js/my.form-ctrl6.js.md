# my.FormCtrl6.js
?>
紀錄維護表單

## FormCtrl6 的方法

### this.fnAfterScroll(res)
刷新Master(按刷新鈕 或 儲存)
Master View 移動

```javascript
this.fnAfterScroll = function(res) {
  //code
}
```

>[!tip] res 的資料 是透過 撰寫 [menuid]Event.php 裡的 function afterScroll 回傳的資料

### this.fnBeforePost(callback)

儲存前

```javascript
this.fnBeforePost = function(callback) {
  var canSave = true;
  //code
  callback(canSave);
}
```
> 參數說明
> * callback - 這是一個 function
> 最後要回傳 callback 來決定時否確定要儲存

### this.fnAfterPost()

儲存後

```javascript
this.fnAfterPost = function() {
  //code
}
```

### objM.setInputValue(String|Element field, val)
更改Master Edit 資料

```javascript
objM.setInputValue("rem","文字更改");
```

### objM.getInputValue(String field)
取得Master Edit 資料

```javascript
objM.getInputValue("rem");
```

## detail 開啟(連結)到不同表單

寫 js code

```javascript
//init bind grid cell
this.init = function() {
  //...

  objD.bindGridCell({
    idxGrd: 0,
    field: 'ordno',
    //可bind 多個 event
    events:[{
      event: 'dblclick',
      fn: (val, row, idx, cell) => {
        var menuid, param;
        if (val.substr(0,2)=='PO') {
          menuid = 'MAHA030030';
          param = 'qryfld=ordno|qryval='+val;
        } else if (val.substr(0,2)=='YS') {
          menuid = 'MAHA040030';
          param = 'qryfld=dlvno|qryval='+val;
        }

        if (menuid) openFormById(menuid, false, param);
      }
    }],
  });
}
```

或寫

```javascript
this.linkto = (val, row, index) => {
  if(isEmpty(row) || !val) return;

  var span = `<span ondblclick="$g.ctrlCustom${obj.name}.goto('${val}')" style="cursor:pointer">
      ${val}
    </span>`;
  return span
}

//呼叫

this.goto = function(val) {
  var menuid, param;
  if (val.substr(0,2)=='PO') {
    menuid = 'MAHA030030';
    param = 'qryfld=ordno|qryval='+val;
  } else if (val.substr(0,2)=='YS') {
    menuid = 'MAHA040030';
    param = 'qryfld=dlvno|qryval='+val;
  }

  if (menuid) openFormById(menuid, false, param);
}
```

## 表單快速樣式

>[!tip] 必須有相關欄位以供判斷，相關欄位可以隱藏

### objM.formatStusna

> 狀態轉換成說明文字

```html
<th data-options="field:'stus',width:60,hidden:true"><span data-i18n='狀態'></span></th>
<th data-options="field:'stus_ref',width:60,userFormatter:'formatStusna'"><span data-i18n='狀態'></span></th>
```

### objM.formatStusv

> 單據作廢呈灰色

```html
<th data-options="field:'invono2',width:100,userFormatter:'formatStusv'"><span data-i18n='發票號碼'></span></th>
<th data-options="field:'stus',width:60,hidden:true"><span data-i18n='狀態'></span></th>
```

### objM.formatStop_y

> 停用呈灰色

```html
<th data-options="field:'empna',width:140,userFormatter:'formatStop_y'"><span data-i18n='員工姓名'></span></th>
<th data-options="field:'stop_y',width:60,hidden:true"><span data-i18n='停用'></span></th>
```

### objM.formatCommas

> 數字樣式

```html
<th data-options="field:'saleamt',width:140,userFormatter:'formatCommas'"><span data-i18n='金額'></span></th>
```

