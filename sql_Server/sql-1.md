# 常用語句

## 關聯

兩個資料表關聯查詢

> Join [關聯資料表] [別名] \
> On [主資料別名].[鍵值]=[關聯資料表別名].[鍵值]

## 群組

> Group by [群組欄位1], [群組欄位2]

?>
Select 後可使用聚合函數 \
例如：sum, count, max, min 等

## 限制筆數

只取部分資料

> Select Top [筆數]

```sql
Select Top 50 *
From oa_lang
```

## 排序

> Order by [群組欄位1], [群組欄位2]

```sql
Select *
From oa_lang
Order By langno
```

> 子查詢

!> 子查詢 Order By 參考以下兩種做法

*方法一*
> 限制資料筆數

```sql
Select *
From (
  Select Top 50 *
  From oa_lang
  Order By langno
)
Order By langno
```

*方法二*
> 在 Order By 後面加上 OffSet 0 Rows

```sql
Select *
From (
  Select *
  From oa_lang
  Order By langno OffSet 0 Rows
)
Order By langno
```

>[!tip] 方法二僅適用於 SQL Server 2012(含)以上 版本