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

