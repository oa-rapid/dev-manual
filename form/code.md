# 表單語法片段

## 參考查詢

Master 範例

> 對應的欄位敘述 請往下看

```html
<input name="cusno" class="w100" reffilter="cusno" refret="salesman;salesman2">
```

Detail 範例

> 對應的欄位敘述 請往下看

```html
<th data-options="
  field:'dlvno',
  width:140,
  reffilter:'facno=fomMaster0.facno;salesman;',
  refret:'baltrn;payamt;postamt;pdamt=unpayamt',
  refmulti:true,
  sumfld:'unpayamt'">
```

### 參考回傳(refret)

> refret 回傳參考視窗其他欄位 \
> refret="field;field2" \
> 如果來源與目的欄位名不同時 \
> 目的=來源，ex. salesman=empno

Master
```html
<input name="cusno" class="w100" refret="salesman;salesman2">
```

Detail
```html
<th data-options="refret:'salesman;salesman2'">
```

### 欄位預篩(reffilter)

> reffilter 預篩參考條件 \
> reffilter="field"

Master
```html
<input name="cuscontno" class="w100" reffilter="cusno">
```

## 其他欄位

### Rich Edit 編輯器

> rich-editor 欄位中增加編輯器 \
> name="task_assign" type="hidden" rich-editor
>

Master
```html
<input name="task_assign" type="hidden" width="450" height="150" rich-editor>
```

Detail \
功能表管理 > 明細資料表規則 > 編輯器 > 設定 richeditor

### 計算公式

> 使用 formula 屬性，可設定自動計算，在相關欄位 onChange 時觸發

Master
```html
<input name="saleamt" class="w110" formula="expr:'[saleprc]*[saleqty]'">
```

Detail
```html
<th data-options="field:'saleamt',width:100,formula:{expr:'round([saleqty]*[saleprc],[fomMaster0.decim])'}"><span data-i18n='小計'></span></th>
```

### 計算欄位

> 使用 caculate 屬性，可設定計算欄位，可在 fnModelChange 和 fnAfterScroll 事件更新該欄位內容

範例

```html
<input name="usd_saleprc" class="w80 al-right" caculate>

<input name="usd_saleamt" class="w226 al-right" caculate>
```

```js
this.fnModelChange = (field, value) => {
    if (in_array(field, ['saleprc', 'exrate', 'saleqty', 'costprc', 'exrate2'])) {
      obj.calUsd();
    }
  }

  this.fnAfterScroll = () => {
    obj.calUsd();
  }

  this.calUsd = () => {
    try {
      var saleqty = objM.getInputValue('saleqty');
      var usd_costprc = myRound(objM.getInputValue('costprc')/objM.getInputValue('exrate2'),4);
      var usd_saleprc = myRound(objM.getInputValue('saleprc')/objM.getInputValue('exrate'),4);
    } catch (error) {
      var usd_costprc = null;
    }
    objM.setInputValue('usd_saleprc', usd_saleprc);
    objM.setInputValue('usd_saleamt', formatCommas(myRound(usd_costprc*saleqty,2)));
  }
```

### 計算欄位(數字欄位格式)

> 使用 number 屬性，可設定計算欄位，設定成數字欄位，可以搭配 caculate 使用

範例

```html
  <input name="totsalear" class="w100" caculate number>
```

## datagrid 樣式

### rowStyler - row樣式

範例：依照條件，設定row顏色

```html
  <table id="tbl-chd22" grd-select data-options="rowStyler:'styleRow'">
```

```js
this.styleRow = function(index, row) {
  if (in_array(row.trn ,['21','55','32'])){
    return {class:'red'}
    // return 'background-color:#6293BB;color:#fff;'; //inline style
    // return {style: 'background-color:#6293BB;', class:'red'}
  }
}
```

### colStyle - cell樣式

範例：cell背景色

```html
  <th data-options="field:'org_dbamt',width:110,header:'color:blue',colStyle:'background:#BEEDFF;color:blue'"><span data-i18n='借方原幣金額'></span></th>
```
?> tag 為 td

### colCellStyle - cell內容樣式

範例： 內容自動換行

```html
<table grd-detail data-options="autoRowHeight:true">
  ...
  <th data-options="field:'quarem',width:300,colCellStyle:'white-space:pre-line;'"><span data-i18n='問題內容'></span></th>
  ...
```
?> tag 為 td > div

### aggregate - 聚合欄位 設定(FormCtrl7)

範例： 數量用 sum 加總合計

```html
  <th data-options="field:'saleqty',width:80,aggregate:'Sum'"><span data-i18n='數量'></span></th>
```

![](../images/form/表單語法片段/aggregate.png)

?> [參數參考網址](https://developer.mescius.com/wijmo/api/enums/Wijmo.Aggregate.html)