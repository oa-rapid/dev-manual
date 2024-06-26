# my.func.js
?>
專案的公共函數

## 工具

### addDebug(str, color)

略

### menuidIsAuth(menuid, callback, \[callback2])

檢查用戶是否有該表單編號的權限

### openWindow(param, callback)

開啟獨佔視窗

_範例_

```javascript
let html = `
  <div id="dlg${objM.name}">
    <p>內部文字</p>
  </div>
`;

// buttons 第一種
let buttons = [{
  text:i18nTag('{關閉}'),
  iconCls:'icon-close',
  handler: function(){
    obj.win.dialog('close')
  }
}];

// buttons 第二種
// var customButtonHtml = `
// <table cellpadding="0" cellspacing="0" style="width:100%">
//   <tr>
//     <td style="text-align:left">
//       <span data-i18n='自訂下半部分'></span>
//     </td>
//     <td style="text-align:right">
//       <a id="dlg_buttons_success${objM.name}"><span data-i18n='確認'></span></a>
//       <a id="dlg_buttons_close${objM.name}"><span data-i18n='關閉'></span></a>
//     </td>
//   </tr>
// </table>`;

var param = {
  title: '視窗',
  w: 500,
  h: 300,
  body: html,
  border: $g.winBorder,
  buttons: buttons,
  // buttons: customButtonHtml,
  modal: false,
  onClose: function() {
  }
}
openWindow(param, function(win) {
  obj.win = win
  obj.dlgTestDlg = win.dialog('body') //取得內層 el

  // buttons 第二種
  // $(`#dlg_buttons_success${objM.name}`).linkbutton({
  //   iconCls:'icon-success',
  //   onClick: function(){
  //     con('確認')
  //   }
  // });

  // $(`#dlg_buttons_close${objM.name}`).linkbutton({
  //   iconCls:'icon-close',
  //   onClick: function(){
  //     obj.win.dialog('close');
  //   }
  // });
})
```

![](../images/js/my.func.js/openWindow.png)

> 參數說明
>
> * param - 將所需資訊一次傳入
>   * title - 視窗的名稱
>   * w - 寬度
>   * h - 高度
>   * body - 內部的 html
>   * border - 設定 border 樣式
>   * buttons - 下方工具列
>     * 第一種 (資料型態 Array)
>       ``` javascript
>       let buttons = [{
>         text:i18nTag('{關閉}'),
>         iconCls:'icon-close',
>         handler: function(){
>           obj.win.dialog('close')
>         }
>       }];
>       ```
>     * 第二種 (資料型態 String)
>       ``` javascript
>       var customButtonHtml = `
>       <table cellpadding="0" cellspacing="0" style="width:100%">
>         <tr>
>           <td style="text-align:left">
>             <span data-i18n='自訂下半部分'></span>
>           </td>
>           <td style="text-align:right">
>             <a id="dlg_buttons_success${objM.name}"><span data-i18n='確認'></span></a>
>             <a id="dlg_buttons_close${objM.name}"><span data-i18n='關閉'></span></a>
>           </td>
>         </tr>
>       </table>`;
>       ```
>       ![](../images/js/my.func.js/openWindow_buttons_2.png)
>   * modal - 是否為獨佔視窗
>   * onClose - 關閉時

### getApi(route, path)

_範例一_

```javascript
// 在 任何地方 呼叫
getApi('get-prdno','bsi010010')
```

> 結果: http://api2.oa-rapid.com/bsi010010/get-prdno

_範例二_

```javascript
// 在 任何地方 呼叫
getApi('get','pub')
```

> 結果: http://api2.oa-rapid.com/pub/get-server-date

### myInputMask(inp, mask)

```javascript
myInputMask(objM.getInput('dt'), '9999/99/99');
```

> 更改Master Data 的 dt 欄位做遮罩

### createDlgImport(opt)

匯入資料的畫面

```javascript
var opt = {
  name: obj.name,
  title: i18nTag('{文字說明}'),
  iconCls: 'icon-excel',
  width: 300,
  height: 200,
  accept: ".xls,.xlsx",
  handler: obj.dlgfunc,
}
dlgUpload = createDlgImport(opt);

//開啟對話框
dlgUpload.open();

//關閉對話框
dlgUpload.close();

//釋放對話框
dlgUpload.destroy();
//如果 繼承FormCtrl6 關閉表單時，會自動釋放

//取得上傳檔案
dlgUpload.getFiles();

//清除上傳檔案
dlgUpload.clear();
```

> 參數說明
>
> * opt - 將所需資訊一次傳入
>   * name - 請放當前表單名稱
>   * title - 彈出畫面的文字敘述
>   * iconCls - 圖示
>   * width - 視窗寬度
>   * height - 視窗高度
>   * accept - 限制所選的檔案副檔名，用逗號隔開
>   * handler - 匯入檔案後所執行的程式
>   * autoFree - 關閉對話框時，自動釋放
>   * multiple - 多個檔案(預設false)

> dlgfunc 創建

```javascript
this.dlgfunc = (e) => {
  const inpFiles =   obj.dlgUpload.find('input[textboxname=file]');
  var files = inpFiles.filebox('files');

  if (!files.length) {
  msgBoxi('{請選擇上傳檔案}')
  return
}
```

### i18nTag(str)

多國語言轉換

```javascript
i18nTag('{蘋果}{書本}')
```

> 本系統多國語言翻譯是以中文字作為ID 參數說明
>
> * str - 輸入要翻譯的文字並用{}包起來做個別翻譯

### openWinReport(params)

開啟 Windows 報表工具

```javascript
var params = {
  repno: 'BSI015010',
  tplitem: '010',
  repmode: 'preview', //preview, print
  keyval: {
    quano: objM.getInputValue('quano'),
  }
}

openWinReport(params)
```

> 參數說明
>
> * repno - 報表ID
> * tplitem - 選擇樣板編號
> * repmode - 選擇列印模式
>   * preview - 預覽
>   * print - 直接列印
> * keyval - 用 Object 來指定 傳入查詢的資料

### openFormById(id, isModal, params)

表單開啟及追隨

```javascript
var menuid = 'bsi020010';
var modal = false;
var qryfld = 'dlvno';
var qryval = 'BQ211109001';
var params = `qryfld=${qryfld}|qryval=${qryval}`;
openFormById(menuid, modal, params);
```

> 參數說明
>
> * menuid - 表單ID
> * modal - 是否用彈出視窗開啟
> * qryfld - 追隨欄位
> * qryval - 搜尋值
> * params - 用 | 整理qryfld,qryval成一個參數

### openFormByRepId(repno, isModal, params)

表單開啟及追隨

```javascript
var repno = 'REP030070';
var modal = false;
var params = {
  query: true,
  keyval: {
    dlvno: objM.getInputValue('dlvno'),
    item: row ? row.item : '',
  },
};
openFormByRepId(repno, modal, params)
```

> 參數說明
>
> * repno - 報表ID
> * modal - 是否用彈出視窗開啟
> * params
>   * query - 開啟報表時 要不要順便查詢
>   * keyval - 用 Object 來指定 傳入查詢的資料

## 對話框

![](../images/js/my.func.js/Progress.png)

### showProgress(msg, callback)

顯示等候對話框

```javascript
showProgress('{查詢中}', () => {
  //code
})
```

### hideProgress()

關閉等候對話框

```javascript
showProgress('{查詢中}', () => {
  //code
  hideProgress();
})
```

### msgBox(msg)

確認對話框

```javascript
msgBox("文字訊息")
```

![](../images/js/my.func.js/msgBox.png)

### msgBoxi(msg)

確認對話框(帶圖示)

```javascript
msgBoxi("文字訊息")
```

![](../images/js/my.func.js/msgBoxi.png)

### msgBoxe(msg)

確認對話框(帶錯誤圖示)

```javascript
msgBoxe("文字訊息")
```

![](../images/js/my.func.js/msgBoxe.png)

### msgBoxw(msg)

確認對話框(帶警告圖示)

```javascript
msgBoxw("文字訊息")
```

![](../images/js/my.func.js/msgBoxw.png)

### msgBoxq(msg, callback, \[callback2])

確認對話框(帶問號圖示)

```javascript
msgBoxq("文字訊息",
(e) => {
  //code
},
(e) => {
  //code
})
```

> 按 確定 會執行 callback\
> 按 取消 會執行 callback2

![](../images/js/my.func.js/msgBoxq.png)

### msgBoxy(msg, callback, \[callback2])

```javascript
msgBoxy("文字訊息",
(e) => {
  //code
},
(e) => {
  //code
})
```

> 按 是 會執行 callback\
> 按 否 會執行 callback2

![](../images/js/my.func.js/msgBoxy.png)

### msgBoxp(msg, opt, callback)

以下程式為 新版 用法:
```javascript
let wgno = objM.getInputValue('wgno');
var option = {
  width: 400,
  editors: [{
    label: '{製令}',
    editor: 'textbox',
    refno: 'mawno',       // 參考查詢編號
  },{
    label: '{工序}',
    editor: 'textbox',
    refno: 'mawno-wpno',  // 參考查詢編號
    width: 132,           // 欄位大小
  },{
    label: '{機台}',
    editor: 'textbox',
    refno: 'mach',
    refret: 'whno=whno',  //回寫欄位
    reffilter: `machtype_wgno=${wgno}`,   //篩選欄位
    charcase: 'U',        //大小寫 切換 U:大寫 L:小寫
  },{
    field: 'whno',        //給 refret 回寫參考用
    label: '{倉位}',
    editor: 'textbox',
    refno: 'whse',
    charcase: 'U',
  },{
    label: '{數量}',
    editor: 'numberbox',  // 型態
    precision: 0,         // 小數位數
    groupSeparator: ',',  // EX : 1234 顯示會變成 1,234
    width: 132,           // 欄位大小
  },{
    label: '{轉換率}',
    editor: 'numberbox',
    inival: 1,            // 初始值
    precision: 2,         // 小數位數
    refno: 'trnrat',      // 參考查詢編號
  }],
}
msgBoxp('{時間} / {文字}', option, (mawno, wpno, machno, whno, qty, rat) => {
//code
})
```
> 新版參數說明:
> * editor: 有以下型態
>   * textbox
>   * numberbox
>   * datebox

圖示:

<img decoding="async" src="../dev-manual/images/js/my.func.js/msgBoxp3.png" width="48%">

以下程式為 舊版 用法:
```javascript
var opt = {
  inival: '20220101',
  label: '{時間}',
  edtwidth: 110,
  mask: '9999/99/99',
  editor: 'datebox',
  inival2: '初始值',
  label2: '{文字}',
  mask2: '',
  edtwidth2: 300,
  editor2: 'textbox',

  // 外框寬度
  width: 350,
}
msgBoxp('{時間} / {文字}', opt, (r, r2) => {
//code
})
```

> 參數說明
>
> * opt - 將所需資訊一次傳入
>   * name - 請放當前表單名稱
>   * title - 彈出畫面的文字敘述
>   * iconCls - 圖示
>   * require: false - 可以空白 (預設不可空白)

![](../images/js/my.func.js/msgBoxp2.png)

## 訊息

![](../images/js/my.func.js/addMsgNotice.png)

### notice(str, color)

在右上顯示訊息

```javascript
notice('訊息顯示', 'success')
```

> 參數說明
>
> * str - 文字
> * color - 狀態
>   * error
>   * success
>   * warning
>   * notice

### addMessage(str, color)

在下方顯示訊息

```javascript
addMessage('異常顯示', 'warning')
```

> 參數說明
>
> * str - 文字
> * color - 狀態
>   * error
>   * success
>   * warning
>   * notice

### addMsgNotice(str, color)

在右上及下方顯示訊息

```javascript
addMsgNotice('錯誤訊息', 'error')
```

> 參數說明
>
> * str - 文字
> * color - 狀態
>   * error
>   * success
>   * warning
>   * notice

### clearMessage()

清除 下方訊息欄 的文字

## 時間

### getToday()

```javascript
var dt = getToday();
```

> 取得當天日期

### getWeekName(dt)

取得指定日期是星期幾

```javascript
var weekname = getWeekName('20220101')
```

> 結果: 回傳「六」

### dateToStr(date)

時間轉換

```javascript
dateToStr(new Date())
```

> 參數說明
>
> * date - Data物件
>
> 結果: 將Data 物件轉換成我們系統用的時間規則

### strToDate(str)

時間轉換

```javascript
strToDate('20220101')
```

> 參數說明
>
> * str - 我們系統用的時間規則
>
> 結果: 將我們系統用的時間規則轉換成Data 物件

### isDateStr(value)
略

### isYymmStr(value)
略

### setCalendarToday()
略

### getServerCDate(fmt)
略

### getServerTime(fmt)
略

### getServerDate(fmt, act, opts)
略

## ajax

### ajaxUpload(url, uplFile, successCallback, \[errorCallback])

### ajaxPost(url, params, successCallback, \[errorCallback])

用post 去取得資料

```javascript
var url = objM.getApi('cal-next-avgprc','inv');
var params = {
  yymm: '202201'
}

ajaxPost(url, params,
(res) => {
    //code
},
(res) => {
    //code
});
```

> 參數說明
>
> * url - 要Post的位置
> * params - 輸入要傳輸的參數
> * sucessCallback - 當成功取得資料時執行
>   * res - 回傳資料
> * errorCallback - 當取得資料失敗
>   * res - 回傳資料
>   * 注意 res.error = true 跟 res.error.msg 有資料時 會執行

### ajaxGet(url, params, successCallback, \[errorCallback])

用Get 去取得資料

```javascript
var url = objM.getApi('cal-next-avgprc','inv');
var params = {
  yymm: '202201'
}

ajaxGet(url, params,
(res) => {
    //code
}, (res) => {
    //code
});
```

> 參數說明
>
> * url - 要Get的位置
> * params - 輸入要傳輸的參數
> * sucessCallback - 當成功取得資料時執行
>   * res - 回傳資料
> * errorCallback - 當取得資料失敗
>   * res - 回傳資料
>   * 注意 res.error = true 跟 res.error.msg 有資料時 會執行

## 資料傳輸設定

### getDtrnRow(dtrnno, params, successCallback, \[errorCallback])

### getDtrnRows(dtrnno, params, successCallback, \[errorCallback])
