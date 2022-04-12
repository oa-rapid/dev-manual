# 程式碼片段

## 資料表

### Create View

```sql
Create VIEW [viewname]
As
Select *
From [tablename]
```

### Drop table

```sql
Drop Table [tablename]
```

### Drop view

```sql
Drop View [talename]
```

## 欄位操作

### 添加異動紀錄欄位

```sql
ALTER TABLE [tablename]
ADD
  crtuserid varchar(20) DEFAULT NULL,
  crtdtm datetime NULL DEFAULT NULL,
  upduserid varchar(20) DEFAULT NULL,
  upddtm datetime NULL DEFAULT NULL
```

### 修改欄位

```sql
ALTER TABLE [tablename] ALTER COLUMN [fieldname] [fieldtype];
-- ex.
ALTER TABLE oa_users ALTER COLUMN depno varchar(20) DEFAULT NULL;
```

### 刪除欄位

```sql
ALTER TABLE [tablename] DROP COLUMN [fieldname];
```

### 解析JSON字串

使用 OPENJSON 解析，加上 With 可定義 Path

```sql
  Select *
  from OPENJSON(
    (
      Select json
      From oa_files
      Where keyval='0508.500MXP'
      And tablename='ap_prod'
    )
  )
  With ( -- path
    item varchar(3) '$.item',
    atttype varchar(3) '$.atttype',
    flna varchar(20) '$.flna'
  )
```
