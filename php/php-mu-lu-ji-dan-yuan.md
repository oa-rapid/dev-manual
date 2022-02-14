# PHP目錄及單元
>[!tip]
檔案結構，控制單元，事件單元

## Routes
路徑: api/routes/

> web.php 代碼結構

_範例一_

```php
//bsi020020
Route::group([
  'prefix' => 'bsi020020',
  'middleware' => 'auth'
], function () use ($router) {
  Route::get('get-method', 'Bsi020020Controller@method');
  Route::post('post-method2', 'Bsi020020Controller@method2');
});
```

> Url :
>
> * http://host/bsi020020/get-method
> * http://host/bsi020020/post-method2
>
> 參數說明
>
> * 'middleware' => 'auth' 登入驗證

_範例二_

```php
Route::group([
  'prefix' => 'pub',
], function () use ($router) {
  Route::get('get-server-date', 'PublicController@getServerDate');
});
```

> Url :
>
> * http://host/pub/get-server-date

## Controller 單元

> 路徑: api/app/Http/Controllers

> 代碼結構

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Util\MyFunc As myfunc;

class Bsi020020Controller extends Controller
{
  private $ut;

  public function __construct()
  {
    $this->middleware(function ($request, $next) {
      $this->ut = myfunc::myUt();
      //...
      return $next($request);
    });
  }

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

  public function method2(Request $request)
  {
    $res  = array();
    $res['error'] = false;
    $res['msg'] = '';
    $res['affected'] = 0;
    $rows = myfunc::request('rows');

    // code ...

    return myfunc::response($res);
  }

  private function privatemethod()
  {
      // code ...
  }
}
```

## Event 單元

> 路徑: api/app/Http/Event

```php
<?php
namespace App\Http\Event;

use App\Util\MyFunc As myfunc;

class Bsi020020Event
{
  private $ut;

  public function __construct()
  {
    $this->ut = myfunc::myUt();
  }

  public function beforePost($masrow)
  {
    $res  = array();
    $res['error'] = false;
    $res['affected'] = 0;

    return $res;
  }

  public function afterPost($masrow)
  {
    $res  = array();
    $res['error'] = false;
    $res['affected'] = 0;

    return $res;
  }

}
```

> 保留函式

### beforePost($masrow)

存檔之前

```php
public function beforePost($masrow)
{
  $res  = array();
  $res['error'] = false;
  $res['affected'] = 0;

  return $res;
}
```

> 參數說明
>
> * masrow - 表單的 Master Data 資料 (資料型態: Array)

### afterPost($masrow)

存檔之後

```php
public function afterPost($masrow)
{
  $res  = array();
  $res['error'] = false;
  $res['affected'] = 0;

  return $res;
}
```

> 參數說明
>
> * masrow - 表單的 master Data 資料

### afterScroll($masrow)

取得一份 Master-Detail 紀錄時

```php
public function afterScroll($masrow)
{
  $res  = array();
  $res['error'] = false;
  $res['affected'] = 0;

  return $res;
}
```

> 參數說明
>
> * masrow - 表單的 master Data 資料 回傳的資料拋轉到 js 裡的 fnAfterScroll

## Repsrc

> 後端報表路徑: api/app/Http/Repsrc
>
> 寫法：略

## Util 公用函數庫

> 路徑: api/app/Util
