# 自定函數 

## 時間

### addDay
時間加一天

> 範例:

```sql
addDay('20220101', '10')
```

>結果: 20220111

### addMonth
時間加一個月

> 範例:

```sql
addMonth('20220101', '2')
```

>結果: 20220301

### addYear
時間加一年

> 範例:

```sql
addYear('20220101', '1')
```

>結果: 20230101

### 格式化

#### formatDateStr
日期格式化

> 範例:

```sql
formatDateStr('20220101')
```

>結果: 2022/01/01

#### formatDateStr2
日期格式化

> 範例:

```sql
formatDateStr2('20220101','-')
```

>結果: 2022-01-01

#### formatDateTimeStr
將日期轉化成 DateTime 格式

> 範例一:

```sql
formatDateTimeStr('20220101201005')
```

> 結果一: 2022/01/01 20:10:05

> 範例二:

```sql
formatDateTimeStr('20220101')
```

> 結果二: 2022/01/01 00:00:00

#### formatTimeStr
將時間格式化

> 範例一:

```sql
formatTimeStr('201005')
```

> 結果一: 20:10:05

> 範例二:

```sql
formatTimeStr('2010')
```

> 結果二: 20:10

### getWeekna
星期幾

> 範例:

```sql
getWeekna('20220101')
```

> 結果: 六

### getWeekno
星期幾

> 範例:

```sql
getWeekno('20220101')
```

> 結果: 6

### ServerDt
server 的日期

```sql
ServerDt()
```

> 結果: 20220101

### ServerDtm
server 的日期時間

```sql
ServerDtm()
```

> 結果: 20220101201005

?> 代表 2022/01/01 20:10:05

### ServerTm
server 的時間

```sql
ServerTm()
```

> 結果: 201005

?> 代表 20:10:05

### ServerYm
server 的年月

```sql
ServerYm()
```

> 結果: 202201

## 其他
### chnum
轉換成中文錢幣敘述

```sql
chnum('500')
```

> 結果: 伍佰圓整

### getAcc_pn
用字軌取得 進/銷貨比 異動比值

```sql
getAcc_pn('22')
```

> 結果: 1

### getInv_pn
用字軌取得 存貨比 異動比值

### getAge(birth, prision)
計算年齡

> 範例一:

```sql
getAge('500101', '1')
```

> 結果一: 61.10

> 範例二:

```sql
getAge('500101', '2')
```

> 結果二: 61.18

### getCodena(codeno, fieldname)
參考代碼(系統) 資料

> 範例:

```sql
getCodena('Y', 'select_yn')
```

> 結果: 是

### getMonqty
取得月份最大天數

> 範例:

```sql
getMonqty('202201')
```
> 結果: 31

### getMonqty2
計算年齡(月)

> 範例:

```sql
getMonqty2('19500101')
```

> 結果: 865.00

### getStusna
取得狀態名稱

### getTypena
取得分類名稱

### getTypenas
取得分類名稱串列

### halfHr
取半小時

### int05
四捨五入取0.5

### split
分割字串

### StrIn
比對包含字串

### tranCaption
多國語言翻譯

### trim0
把小數點以後的 0 結掉