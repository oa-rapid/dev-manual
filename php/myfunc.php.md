# MyFunc.php
>[!tip]
專案的後端公用函數/方法

## 引用

```php
use App\Util\MyFunc as myfunc;
```

## static function

### myfunc::myUt()

系統參數

```php
$this->ut = myfunc::myUt();
// 取得系統日期
$this->ut['sysdt'];
```

> 可使用參數
>
> * dbconna - 資料庫名稱
> * dbconn - 資料庫連線
> * dbtype - 查看 sql 是什麼類型(mysql,mssql ...)
> * prefix - 系統 table 前綴
> * sysdt - 系統日期
> * systm - 系統時間
> * sysdtm - 系統日期時間
> * timestamp - 時間戳記
> * sitePath - 網站路徑
> * tplPath - 報表樣板路徑
> * imgPath - 圖檔路徑
> * tmpPath - 暫存檔路徑
> * userid - 使用者ID
> * uuid - 使用者UUID

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

### myfunc::getAutoNumber($trnno, $table, $dlvdt, $compno='', $validdt=true, \[$dbconn])

取得單據字軌編號

> 單據字軌設定畫面

![](../images/form/php/MyFunc.php/單據字軌.png)

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
> * dbconn - 資料庫參數

### myfunc::getAutoSn($tablename, $dbconn=null)

取得自動序號

### myfunc::request($name, \[$defval])

取得 post/get 傳輸過來的資料 _範例一_

```php
$prdno = myfunc::request('prdno');
```

> 取得傳輸過的 prdno 值

_範例二_

```php
$prdno = myfunc::request('prdno','test');
```

> 取得傳輸過的 prdno 值 假如prdno 是空的 就會回傳 test

### myfunc::response($data, $code = Response::HTTP\_OK)

整理回傳資料給請求者 _範例 在Event or Controller 實作_

```php
public function method(Request $request)
{
  $res  = array();
  $res['error'] = false;
  $res['msg'] = '';
  $res['affected'] = 0;
  $rows = myfunc::request('rows');

  // code ...

  return myfunc::response($res);
}
```

### myfunc::responseData($data, $key='data', $code = Response::HTTP\_OK)

略

### myfunc::responseRow($data, $code = Response::HTTP\_OK)

略

### myfunc::responseRows($data, $code = Response::HTTP\_OK)

略

### myfunc::responseError($message, $code=200)

回應錯誤訊息

### myfunc::isJSON($str)

檢查是否為 Json 檔案

### myfunc::array2json($arr)

將陣列轉成json格式

### myfunc::rowsToJson($rows, $cols\_def)

將取得的資料列轉成json格式

### myfunc::getFieldParams($params, $prop, $div)

取得參數組其中的一個參數值

### myfunc::getTableFields($table\_or\_script, $dbconn=null)

取得資料表欄位

### myfunc::getTableKeys($table\_name, $dbconn=null)

取得資料表鍵值欄位

### myfunc::getFieldsDefine($table\_name, $menu\_id='', $rule\_table='', $dbconn=null)

取得資料表欄位定義

## SQL

### myfunc::execsql($sql, \[$transaction], \[$dbconn])

SQL 執行更動指令

_範例一_

```php
$res['affected'] = myfunc::execsql([
  'sql' => "Insert Into oa_reppivot (repno, pvno, def ) Values (?,  ?,  ?)",
  'param' => [$repno, $pvno, $def],
  'dbconn' => $this->ut['dbconn'],
]);
```

> 參數說明
>
> * sql - sql 相關參數
>   * 'sql' - sql 語法
>   * 'param' - 輸入要載入的參數
>   * 'dbconn' - 資料庫參數

_範例二_ 舊版做法

```php
myfunc::execsql("
  Insert Into oa_reppivot 
  (repno, pvno, def ) 
  Values 
  ('{$repno}',  '{$pvno}',  '{$def}')
", true, myfunc::myUt()['dbconn']);
```

> 參數說明
>
> * sql - 完整SQL語法
> * transaction - 錯誤回傳
> * dbconn - 資料庫參數

### myfunc::select($sql, \[$dbconn])

下SQL 的 select 指令用

```php
myfunc::select("
  Select *
  From table
", myfunc::myUt()['dbconn']);
```

> 參數說明
>
> * sql - 完整SQL語法
> * dbconn - 資料庫參數

### myfunc::selectOne($sql, \[$dbconn])

下SQL 的 select 指令用 但只會取一筆

```php
myfunc::selectOne("
  Select *
  From table
", myfunc::myUt()['dbconn']);
```

> 參數說明
>
> * sql - 完整SQL語法
> * dbconn - 資料庫參數

### myfunc::selectValue($sql, \[$dbconn])

下SQL 的 select 指令用

```php
myfunc::selectValue("
  Select val
  From table
", myfunc::myUt()['dbconn']);
```

> 參數說明
>
> * sql - 完整SQL語法
> * dbconn - 資料庫參數 select 只能選一個欄位, 並回傳取到的欄位 值

### myfunc::getFieldType($sql, \[$dbconn])

取得資料欄位定義

### myfunc::fixDataType($rows, $fieldType)

修正資料型態

## 通訊

### myfunc::sendEmail($mail)

傳送電子郵件

### myfunc::sendSms($sms)

傳送簡訊

## 時間

### myfunc::calMonthDays($yymm)

### myfunc::formatDateStr($str, $dv)

### myfunc::strToDate($str)

### myfunc::getWeekName($str)

取得中文星期名稱

```php
myfunc::getWeekName('20220101')
```

> 結果 六

### myfunc::getWeekNo($str)

取得星期序號 (0\~6)

```php
myfunc::getWeekNo('20220101')
```

> 結果 6

### myfunc::getServerDt()

取得伺服器時間

```php
myfunc::getServerDt()
```

> 結果 '20220101'

### myfunc::getServerCdt()

取得伺服器時間(用民國表示)

```php
myfunc::getServerCdt()
```

> 結果 '1110101'

### myfunc::addYymm($yymm, $cnt)

增加年

### myfunc::addYear($dt, $cnt)

_範例一_

```php
$dt = myfunc::addYear('20211201', 1);
```

> 將2021/12/01 加一年 會得到 2022/12/01

_範例二_

```php
$dt = myfunc::addYear('202112', 1);
```

> 將2021/12 加一年 會得到 2022/12

_範例三_

```php
$dt = myfunc::addYear('2021', 1);
```

> 將2021 加一年 會得到 2022

### myfunc::addMonth($dt, $cnt)

_範例一_

```php
$dt = myfunc::addMonth('20211201', 1);
```

> 將2021/12/01 加一個月 會得到 2022/01/01

_範例二_

```php
$dt = myfunc::addMonth('202112', 1);
```

> 將2021/12 加一個月 會得到 2022/01

### myfunc::addDay($dt, $cnt)

```php
$dt = myfunc::addDay('20211231', 1);
```

> 將2021/12/31 加一個月 會得到 202201/01

### myfunc::addTime($tm, $cnt)

```php
$tm = myfunc::addTime('0800', 20);
```

> 將 08:00 加 20分鐘 會得到 08:20

### myfunc::diffDays( $date1, $date2 )

取得兩時間相差幾天

```php
myfunc::diffDays( '20210101', '20210131' );
```

> 結果: 30

### myfunc::getTmDiff($tm1, $tm2)

取得兩時間差(小時)

```php
myfunc::getTmDiff('0800', '1200');
```

> 結果 4

### myfunc::validDate($str)

檢查日期格式

```php
myfunc::validDate('20220132')
```

> 結果 false

### myfunc::validCDate($str)

檢查民國日期格式

```php
myfunc::validCDate('1110132')
```

> 結果 false

### myfunc::incDtm($dtm, $inc)

略

### myfunc::dateTimeDiff( $date1, $date2 )

略

### myfunc::getPrePaydt($dlvdt, $payterm)

取的預計付款日

### myfunc::getPaydt($dlvdt, $payterm, $billdt, $param=\[])

取的實際付款日
