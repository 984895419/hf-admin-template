export function stateFormat(row, column) {
  let num = Number(row[column["property"]]);
  let n = 2;
  let symbol = ",";
  if (typeof num !== 'number') throw new TypeError('num参数应该是一个number类型');
  if (n < 0) throw new Error('参数n不应该小于0');
  var hasDot = parseInt(num) != num; //这里检测num是否为小数，true表示小数
  var m = (n != undefined && n != null) ? n : 1;
  num = m == 0 ? num.toFixed(m) + '.' : hasDot ? (n ? num.toFixed(n) : num) : num.toFixed(m);
  symbol = symbol || ',';
  num = num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function (match, p1, p2) {
    return p1 + symbol;
  });
  if (n == 0 || (!hasDot && !n)) { //如果n为0或者传入的num是整数并且没有指定整数的保留位数，则去掉前面操作中的小数位
    num = num.substring(0, num.indexOf('.'));
  }
  return num;
}
