# my.UserCtrl.js
?>
用戶自訂義表單

## 設定 Input

若未設定，預設是 textbox

### textbox

> refno: 參考編號(自動做成參考查詢) \
> retret: 回傳參考顯示 \
> ucase: 大寫英文 \
> lcase: 小寫英文

```html

<input name="fielname" class="w100" textbox="refno:'rfq_status',refret:'rfq_statusna=codena',ucase:true">

```

### datebox

> mask: 遮罩, ex. 9999/99/99 (default)

```html

<input name="qdt1" class="w110" required="required" datebox>

```

### numberbox

> precision: 小數位

```html

<input name="sr" class="w120" numberbox="precision:4">

```


## 開啟(連結)到不同表單

寫 js code

```javascript
//init bind grid cell
this.init = function() {
  //...

  objM.bindGridCell({
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

