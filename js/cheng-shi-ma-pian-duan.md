# 程式碼片段

### 設定多項追隨

> 範例:開啟不同的表單編號

html

```html
<th data-options="field:'ordlvno',width:80,userFormatter:'todlvno20'">
   <span data-i18n='採購訂單'></span>
</th>
```

javascript

```javascript
this.todlvno20 = (value, row, index) => {
  if(isEmpty(row) || !value) return;

  var span = `<span ondblclick="$g.ctrlCustom${obj.name}.gotodlvno20('${value}')" style="cursor:pointer">
      ${value}
    </span>`;
  return span
}

this.gotodlvno20 = (dlvno) => {
  if (!dlvno) return
  var param = {
    dlvno: dlvno,
  }
  getDtrnRow('get-chd-dlvtype20', param, function (res) {
    if (res && res.dlvtype) {
      var menuid = "";
      if (res.dlvtype=='1') menuid ='BSI020012';
      else if (res.dlvtype=='2') menuid ='BSI020014';
      else if (res.dlvtype=='3') menuid ='BSI020010';

      var qryfld = 'dlvno';
      var qryval = dlvno;
      var modal = false;
      var params = `qryfld=${qryfld}|qryval=${qryval}`;
      openFormById(menuid, modal, params);
    }
  });
}
```
