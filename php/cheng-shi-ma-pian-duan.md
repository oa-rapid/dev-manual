# 程式碼片段

## 事件

### beforepost

存檔前

```php
public function beforepost($masrow)
{
  $res  = array();
  //code
  return $res;
}
```

> 參數說明
> masrow - Master Edit 的資料

### afterpost

存檔後

```php
public function afterpost($masrow)
{
  $res  = array();
  //code
  return $res;
}
```

> 參數說明
> masrow - Master Edit 的資料

### afterScroll

取得一份 Master-Detail 紀錄時

```php
public function afterScroll($masrow)
{
  $res  = array();
  //code
  return $res;
}
```

> 參數說明
> masrow - Master Edit 的資料

## 維護資料

### myfunc::execsql($param)

```php
$res['affected'] = myfunc::execsql([
  'sql' => "
    Insert Into oa_reppivot 
    (repno, pvno, def, datetime) 
    Values 
    (?,  ?,  ?, ?)",
  'param' => [$repno, $pvno, $def, \Carbon\Carbon::now()],
  'dbconn' => $this->ut['dbconn'],
]);
```

> 參數說明
>
> * sql - sql 語句
> * param - 輸入要載入的參數
> * dbconn - 資料庫連線

?> \Carbon\Carbon::now()
會自動抓取當前 Timestamp 資料

### myfunc::execsql(String|Array $sql, \[$transaction], \[$dbconn])

_範例一_
```php
myfunc::execsql("
  Insert Into oa_reppivot 
  (repno, pvno, def ) 
  Values 
  ('{$repno}',  '{$pvno}',  '{$def}')
", false, $this->ut['dbconn']);
```

> 參數說明
>
> * sql - sql 語句
> * transaction - 錯誤回傳
> * dbconn - 資料庫連線

_範例二_
```php
$arrsql = [];

$arrsql[] = "
  Insert Into oa_reppivot 
  (repno, pvno, def ) 
  Values 
  ('{$repno}',  '{$pvno}',  '{$def}')
";

$res['affected'] = myfunc::execsql($arrsql, true, $this->ut['dbconn']);
```

> 參數說明
>
> * sql - sql 語句
> * transaction - 錯誤回傳
> * dbconn - 資料庫連線

## 擷取資料

### myfunc::select($param)

```php
myfunc::select([
  'sql' => "
    Select repno, pvno, def 
    From oa_reppivot 
    Where repno=?
    And item=?
  ",
  'param' => [$repno, $item],
  'dbconn' => $this->ut['dbconn'],
]);
```

> 參數說明
>
> * sql - sql 語句
> * param - 輸入要載入的參數
> * dbconn - 資料庫連線

### myfunc::select($sql, \[$dbconn])

擷取資料

```php
myfunc::select("
  Select *
  From table
", $this->ut['dbconn']);
```

> 參數說明
>
> * sql - sql 語句
> * dbconn - 資料庫連線

### myfunc::selectOne($sql, \[$dbconn])

擷取一筆資料

```php
myfunc::selectOne("
  Select *
  From table
", $this->ut['dbconn']);
```

> 參數說明
>
> * sql - sql 語句
> * dbconn - 資料庫連線

### myfunc::selectValue($sql, \[$dbconn])

擷取一個欄位值

!> 只能設定一個欄位

```php
myfunc::selectValue("
  Select val
  From table
", $this->ut['dbconn']);
```

> 參數說明
>
> * sql - sql 語句
> * dbconn - 資料庫連線 select 只能選一個欄位, 並回傳取到的欄位 值

## 狀態

### myfunc::checkStus($stus, $part\_stus)

檢查狀態

```php
myfunc::checkStus('CV', 'V');
```

> 結果: true

### myfunc::addStus($stus, $part\_stus)

增加狀態

```php
myfunc::addStus('CV', 'A');
```

> 結果: 'CVA'

### myfunc::delStue($stus, $part\_stus)

減少狀態

```php
myfunc::delStue('CVA', 'V');
```

> 結果: 'CA'

## 其他

### myfunc::getAutoNumber($trnno, $table, $dlvdt, $compno='', $validdt=true, \[$dbconn])

取得單據字軌編號

```php
myfunc::getAutonumber('20BO', 'chd', '20220101', '', true, $this->ut['dbconn']);
```

> 結果 BO220101001 參數說明
>
> * trnno - 字軌編號
> * table - SQL 資料表
> * dlvdt - 日期
> * compno - 公司別(多公司用)
> * validdt -
> * dbconn - 資料庫連線

### myfunc::response($res);

