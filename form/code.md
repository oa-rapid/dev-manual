# 表單語法片段

## 參考查詢

### 參考回傳

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

### 欄位預篩

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

```html
<input name="saleamt" class="w110" formula="expr:'[saleprc]*[saleqty]'">
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