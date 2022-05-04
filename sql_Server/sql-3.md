# 自定函數

## 時間

### oa_addDay(dt, qty)
時間加一天

> 範例:

```sql
oa_addDay('20220101', '10')
```

>結果: 20220111

### oa_addMonth(dt, qty)
時間加一個月

> 範例:

```sql
oa_addMonth('20220101', '2')
```

>結果: 20220301

### oa_addYear(dt, qty)
時間加一年

> 範例:

```sql
oa_addYear('20220101', '1')
```

>結果: 20230101

### oa_getWeekna(dt)
星期幾

> 範例:

```sql
oa_getWeekna('20220101')
```

> 結果: 六

### oa_getWeekno(dt)
星期幾

> 範例:

```sql
oa_getWeekno('20220101')
```

> 結果: 6

### oa_ServerDt()
server 的日期

```sql
oa_ServerDt()
```

> 結果: 20220101

### oa_ServerDtm()
server 的日期時間

```sql
oa_ServerDtm()
```

> 結果: 20220101201005

?> 代表 2022/01/01 20:10:05

### oa_ServerTm()
server 的時間

```sql
oa_ServerTm()
```

> 結果: 201005

?> 代表 20:10:05

### oa_ServerYm()
server 的年月

```sql
oa_ServerYm()
```

> 結果: 202201

## 格式化

### oa_formatDateStr(dt)

日期格式化

> 範例:

```sql
oa_formatDateStr('20220101')
```

>結果: 2022/01/01


### oa_formatDateStr2(dt, dv)
日期格式化

> 範例:

```sql
oa_formatDateStr2('20220101','-')
```

>結果: 2022-01-01


### oa_formatDateTimeStr(dtm)
將日期轉化成 DateTime 格式

> 範例一:

```sql
oa_formatDateTimeStr('20220101201005')
```

> 結果一: 2022/01/01 20:10:05

> 範例二:

```sql
oa_formatDateTimeStr('20220101')
```

> 結果二: 2022/01/01 00:00:00

### oa_formatTimeStr(tm)
將時間格式化

> 範例一:

```sql
oa_formatTimeStr('201005')
```

> 結果一: 20:10:05

> 範例二:

```sql
oa_formatTimeStr('2010')
```

> 結果二: 20:10

## 其他
### X chnum(money)
轉換成中文錢幣敘述

```sql
oa_chnum('500')
```

> 結果: 伍佰圓整

### X getAcc_pn(para)
用字軌取得 進/銷貨比 異動比值

```sql
oa_getAcc_pn('22')
```

> 結果: 1

### X getInv_pn(para)
用字軌取得 存貨比 異動比值

### oa_getAge(birth, prision)
計算年齡

> 範例一:

```sql
oa_getAge('500101', '1')
```

> 結果一: 61.10

> 範例二:

```sql
oa_getAge('500101', '2')
```

> 結果二: 61.18

### oa_getCodena(codeno, fieldname)
參考代碼(系統) 資料

> 範例:

```sql
oa_getCodena('Y', 'select_yn')
```

> 結果: 是

### oa_getMonqty(dt)
取得月份最大天數

> 範例:

```sql
oa_getMonqty('202201')
```
> 結果: 31

### oa_getMonqty2(dt)
計算年齡(月)

> 範例:

```sql
oa_getMonqty2('19500101')
```

> 結果: 865.00

### oa_getStusna(stus)
取得狀態名稱

### oa_getTypena(codno, typno)
取得分類名稱

### X getTypenas(codno, typno)
取得分類名稱串列

### oa_halfHr(H)
取半小時

### oa_int05(num)
四捨五入取0.5

### oa_split(str, delim, pos)
分割字串

### oa_tranCaption(caption, lang)
多國語言翻譯

### oa_trim0(num)
把小數點以後的 0 結掉