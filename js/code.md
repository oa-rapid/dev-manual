# 程式碼片段

## 設定多項追隨

> 範例:開啟不同的表單編號

### html

```html
<th data-options="field:'ordlvno',width:80,userFormatter:'todlvno20'">
   <span data-i18n='採購訂單'></span>
</th>
```

### javascript

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
## 檔案匯入(excel)

> 範例:
> 設定一個檔案匯入的操作

### javaScript

```javascript
this.init = function() {
  var opt = {
    name: obj.name,
    title: i18nTag('{匯入明細}'),
    iconCls: 'icon-excel',
    width: 300,
    height: 200,
    accept: ".xls,.xlsx",
    handler: obj.importexcel,
  }
  obj.dlgUpload = createDlgImport(opt);
}

this.setToolbar = function () {
  objM.addToolButton('btnimportexcel', '匯入', 'icon-import', (e) => {
    obj.dlgUpload.dialog('open')
  });
}

this.importexcel = (e) => {
  const inpFiles = obj.dlgUpload.find('input[textboxname=file]'); //? why filename not file
  var files = inpFiles.filebox('files');

  if (!files.length) {
    msgBoxi('{請選擇上傳檔案}')
    return
  }

  var url = getApi('import-excel', obj);
  var param = {
    files: files,
  }
  ajaxUpload(url, param, function (res) {
    hideProgress();
    obj.dlgUpload.dialog('close');
    if (res && res.data) {
      con(res.data);
      // 取得資料
    }
  });
}
```

### PHP

```php
public function importexcel(Request $request) {
  $res  = array();
  $res['error'] = false;
  $res['affected'] = 0;
  $res['dd'] = [];
  $res['data'] = array();

  $file = $request->file('file');
  $res['file'] = $file;
  if ($file) {
    $flna = $file->getClientOriginalName();
    $destPath = storage_path('app/tmp/');
    $filePath = $destPath.'/'.$flna;
    $file->move($destPath, $flna);
    if ( !file_exists($filePath) ) {
      $res['error'] = true;
      $res['msg'] = '上傳失敗';
      return myfunc::response($res);
    }

    //欄位標題轉換
    $arrFdna = [];
    $arrFdna['料號'] = 'prdno';
    $arrFdna['數量'] = 'qty';
    $arrFdna['單價'] = 'prc';
    $arrFdna['備註'] = 'rem';

    $fileType = IOFactory::identify($filePath);
    $res['fileType'] = $fileType;
    /**  Create a new Reader of the type that has been identified  **/
    $reader = IOFactory::createReader($fileType); //實例化閱讀器對象。
    $reader->setReadDataOnly(TRUE);

    $spreadsheet = $reader->load($filePath);  //將文件讀取到到$電子表格對象中
    $sheetAllCount = $spreadsheet->getSheetCount(); // 工作表總數
    $sheets = array();
    try {
      for ($i = 0; $i < $sheetAllCount; $i++) {   //工作表標題
        $sheet = $spreadsheet->getSheet($i);
        $highest_row = (int)$sheet->getHighestRow(); //取得總Row
        $highest_column = $sheet->getHighestColumn(); ///取得Column數
        $highestColumnIndex = Coordinate::columnIndexFromString($highest_column);  //轉化為數字

        $columns = array();
        for ($jCol = 1; $jCol <= $highestColumnIndex; $jCol++) {
          $title = trim($sheet->getCellByColumnAndRow($jCol, 1)->getValue());
          $field = isset($arrFdna[$title]) ? $arrFdna[$title] : $title;

          if ($field) {
            $columns[] = array(
              'field' => isset($field) ? $field : $title,
              'title' => $title,
            );
          }
        }

        $rows = array();
        for ($iRow = 2; $iRow <= $highest_row; $iRow++) {
          $row = array();
          for ($jCol = 1; $jCol <= $highestColumnIndex; $jCol++) {
            $title = trim($sheet->getCellByColumnAndRow($jCol, 1)->getValue());
            $field = isset($arrFdna[$title]) ? $arrFdna[$title] : ''; //$title;
            if ($field) {
              $fdna = isset($field) ? $field : $title;
              $val = $sheet->getCellByColumnAndRow($jCol, $iRow)->getValue();
              $row[$fdna] = Trim($val);
            }
          }

          $rows[] = $row;
        }
        $data = array();
        $data['columns'] = $columns;
        $data['rows'] = $rows;
        $res['data'][] = $data;
      }

      $res['msg'] = '{匯入完成}';
    } catch (Exception $e) {
      $res['error'] = true;
      $res['msg'] = $e->getMessage();
      return myfunc::response($res);
    }

    return myfunc::response($res);
  }
}
```

## 重排項次

> 當明細的項次不連續時可以幫助快速排序

```javascript
this.reitem = () => {
  if (in_array(objM.getState(), ['Browse'])) {
    objM.modify();
  }

  var rows = objD.getRows(0);
  _.each(rows, (r, i) => {
    r.item = String((i+1)*1+1000).substr(1,3);
  });
  objD.setRows(0,rows);
}
```

## 開啟表單

```js
openFormById(menuid, modal, parameter);
ex.
var params = '參數字串';
openFormById('MAHA030010', false, params);
```

參數說明：
> autoInsert=Y 開啟表單後，自動新增紀錄 \
> notrigger=orditem  orditem 欄位不觸發onChange \
> field=value 開啟表單後 field 自動帶入value
> qryfld=field|qryval=value 開啟表單後自動查詢

新增範例

```js
var orditem = objM.getInputValue('item');
var ordno = objM.getInputValue('quano');
var prdno = objM.getInputValue('prdno');
var params = `autoInsert=Y|orditem=${orditem}|ordno=${ordno}|prdno=${prdno}|notrigger=orditem`;
openFormById('MAHA030010', false, params);
```

查詢範例

```js
var value = objM.getInputValue('quano');
var param = `qryfld=ordno|qryval=${value}`
openFormById('MAHA030010', false, params);
```

## 開啟 windows 報表

> 設定查詢條件並開啟報表工具/列印

```javascript
var repno = 'BSI030010';
var params = {
  repno: repno,
  tplitem: '010',
  repmode: 'print', //none, preview, print
  keyval: {
    quano: objM.getInputValue('quano'),
    new_y: '',
  },
};
openWinReport(params);
```

## web報表列印

```javascript
var repno = 'BSI030020';
var params = {
  repno: repno,
  tplitem: '010',
  keyval: {
    dlvno: objM.getInputValue('dlvno'),
    item: n==1 ? objD.getRow(1).item : '',
  },
};
objM.mrtPreview(params);
```

## 開啟報表表單

```javascript
var params = {
  _repno: 'REP030070',
  query: true,
  keyval: {
    dlvno: objM.getInputValue('dlvno'),
    item: row ? row.item : '',
  },
};
openFormByRepId(params._repno, false, params)
```

## 格式儲存格 userFormatter

### html

```html
<th data-options="field:'prc',width:80,userFormatter:'formatdarkblue'">
   <span data-i18n='數量'></span>
</th>
```

### javascript

```javascript
this.formatdarkblue = (value, row, index) => {
  if(!row || !value) return;

  var span = `<span style="color:darkblue">${value}</span>`;

  return span;
}
```

## 在Master Edit 製作按鈕

```javascript
objM.makeButton({
  id: 'btnUpdPrc',
  iconCls: 'icon-edit',
  onClick: () => {
    msgBoxy('{確定回寫圖號單價}', (r) => {
      var url = getApi('upd-prc', obj)
      var param = {
        dlvno: objM.getInputValue('dlvno'),
      }
      showProgress('{處理中}');
      ajaxPost(url, param, (res) => {
        hideProgress();
      });
    })
  }
});
```

## 取得資料傳輸查詢資料

```javascript
var param = {
  dlvno: objM.getInputValue('dlvno')
}
getDtrnRows('get-wkmin', param, (res) => {
  if (res && res.length) {
    // code
  }
});
```

## 表單結案控制

```javascript
this.addStusClose = function (e) {
  var stus = objM.getInputValue('stus');
  if (isEmpty(stus) || stus.indexOf('C') < 0) objM.addStus('C');
  else objM.delStus('C');
}
```

## 檢查用戶表單權限

> 有權限 才會跑function

```javascript
menuidIsAuth(menuid, function (res) {
  //code
});
```

## setToolbar
### 在工具列新增按鈕

```javascript
objM.addToolButton('btnId', '按鈕', 'icon-print', obj.print7Click);
```

### 工具按鈕 enable 控制

```javascript
this.fnAfterScroll = (res) => {
  if (!objM.tabEdit) return;

  objM.setButtonEnable('btnId', !checkStus(objM.getInputValue('stus'), 'V'));

}
```

### 新增下拉功能表按鈕

```javascript
objM.addToolButton('btnId', '目錄', 'icon-menu-b', 'menubutton');
objM.addMenuButton('btnId2', '按鈕1', 'icon-print', () => {
    // code
});
//加上其他按鈕
```

>[!tip] objM.addMenuButton 會自動依附在 objM.addToolButton

### 下拉按鈕 enable 控制

```javascript
this.fnAfterScroll = (res) => {
  if (!objM.tabEdit) return;

  // setBtnMenuItem = ({ menuBtn, menuItem, enabled = false })
  _.each(['btnId2','btnId3','btnId4','btnId5'], (b) =>{
    objM.setBtnMenuItem({
      menuBtn: 'btnId',
      menuItem: b,
      enabled: !checkStus(objM.getInputValue('stus'), 'V'),
    });
  });
}
```

### 修改按鈕優先控制

>[!tip] 使用 objM.markBtnCtrl 可優先取的修改按鈕控制，避免按鈕因狀態切換閃爍

>objM.markBtnCtrl('按鈕名稱', 參數：-1 disabled, 1：enabled, 0：不控制);

```js
this.init = function () {
  tabEdit = objM.tabEdit;
  //初始化設定為false
  objM.markBtnCtrl('btnModify', -1);
}

this.fnAfterScroll = function(e) {
  //根據用戶帳號切換
  var fuserid = objM.getInputValue('fuserid');
  var val = fuserid==$g.login_user.userid ? 1 : -1;
  objM.markBtnCtrl('btnModify', val, true);
}
```

## 參考查詢

```javascript
var refCtrl;
showProgress('顯示中');
//_refno - 參考查詢
ajaxGet($g['ref_data_url'] + '?_refno=quad2', {}, function (ref_data) {
  hideProgress();
  if (!isEmpty(ref_data) && !isEmpty(ref_data[0]) &&
    !isEmpty(ref_data[0].items)) {
    var row = objD.getRow(0);
    refCtrl = new RefCtrl(ref_data, objM.reBindKeydown);
    refCtrl.filterFlds = {
      prdno: row && row.prdno ? row.prdno : '',
    }

    //在視窗右下角新增按鈕
    ref_data[0].udfButtons = [{
      text: '查詢成交單',
      iconCls: 'icon-search',
      handler: () => {
        var r = refCtrl.selectRows ? refCtrl.selectRows[0] : '';
        refCtrl.closeWinRef();
        if (r && r.quano) {
          openFormById('BSI030010', false, {
            qryfld: 'quano',
            qryval: r.quano
          });
        }
      }
    }];

    refCtrl.ini({})
    //宣告回傳處理函數
    refCtrl.onClose = () => {
      //con (refCtrl.selectRows)
    };

    refCtrl.open();
    //或用
    // refCtrl.clickIconButton();

  }
});
```

>[!tip] _refno - 參考查詢ID

## ajax

### ajaxPost

```javascript
var url = objM.getApi('cal-next-avgprc','inv');
var params = {
  yymm: '202201'
}

ajaxPost(url, params,
(res) => {
    //code1
},
(res) => {
    //code2
});

```
>[!tip] 成功時執行code1，失敗時執行code2

### ajaxGet

```javascript
var url = objM.getApi('cal-next-avgprc','inv');
var params = {
  yymm: '202201'
}

ajaxGet(url, params,
(res) => {
    //code1
},
(res) => {
    //code2
});

```
>[!tip] 成功時執行code1，失敗時執行code2

## this.fnAfterScroll(res)
刷新Master(按刷新鈕 或 儲存)
Master View 移動

```javascript
this.fnAfterScroll = function(res) {
  //code
}
```

>[!tip] res 的資料 是透過 撰寫 [menuid]Event.php 裡的 function afterScroll 回傳的資料

## this.fnBeforePost(callback)

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

## this.fnAfterPost()

儲存後

```javascript
this.fnAfterPost = function() {
  //code
}
```

## objM.setInputValue(String|Element field, val)
更改Master Edit 資料

```javascript
objM.setInputValue("rem","文字更改");
```

## objM.getInputValue()
取得Master Edit 資料

```javascript
objM.getInputValue("rem");
```

## detail 開啟(連結)到不同表單

html 使用 userFormatter

```html
<tr>
  <th data-options="field:'ordno',width:128,userFormatter:'linkto'"><span data-i18n='採購單編號(PO#)'></span></th>
  ...
```

再寫 js code

```javascript
this.linkto = function(val, row, idx) {
  if(isEmpty(row) || !val) return;

  var span = `<span class="cell-ordno" style="cursor:pointer">${val}</span>`;
  return span;
}


//init bind grid cell
this.init = function() {
  //...

  objD.bindGridCell({
    idxGrd: 0,
    field: 'ordno',
    // class: 'cell-ordno',
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

