# my.repCtrl3.js

> 第三代報表底層 \
> 建構中
>
### 腳本樣板

```javascript
//create form control
createRepCtrl();

/**
 * Custom Control
 */
function RepCtrlC(objM){
  this.name = objM.name;
  this.objM = objM;
  var obj = this;
  var tabEdit;

  this.init = function() {
    tabEdit = objM.tabEdit;
  }

  this.setToolbar = function() {
    //
  }
}
```

> obM - Master controller 使用 objM.method 呼叫&#x20;

## 初始設定

### this.init()

```javascript
  this.init = function() {
    tabEdit = objM.tabEdit;
  }
```

> 說明

## 函式說明

### this.fnFormatItem(grid, e)

調整欄位樣式

```javascript
  this.fnFormatItem = (grid, e) => {
    let row = grid.rows[e.row], col = grid.columns[e.col];
    let fd = col.binding; //欄位名稱
    let val = grid.getCellData(e.row, e.col, false); // 欄位資料
    let cell = e.cell; // 欄位的 element
    if ($(cell).hasClass('wj-header')) { // 在欄位header

    } else if (row instanceof wijmo.grid.Row) { // 在資料上面
      
      // 時間提早 用 綠色 延後 用 紅色
      // if (in_array(fd, ['delay_yn'])) {
      //   if (val && val.includes('提早')) {  // 提早
      //     cell.style.color = 'green';
      //   } else if (val && val.includes('延後')) {  // 延後
      //     cell.style.color = 'red';
      //   }
      // }
    } else if (row instanceof wijmo.grid.GroupRow) { // 在群組 header 上面
        
    }
  }
```

> 調整欄位樣式
> 參數說明
>
> * grid - grid 的所有資料
> * e

### this.fnAfterQuery()

執行完查詢後

```javascript
  this.fnAfterQuery = function() {
    if (objM.grdSelects && objM.grdSelects[0]) {

      // 設定 欄位可以換行 並且 整個 row 會 autoRowHeight
      // objM.grdSelects[0].autoRowHeights = true
      // objM.grdSelects[0].columns.find((col) => col.binding=='wkitem').wordWrap = true
      // objM.grdSelects[0].columns.find((col) => col.binding=='wkitem').multiLine = true
    }
  }
```

> 執行完查詢後
