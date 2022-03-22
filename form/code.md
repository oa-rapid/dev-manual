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