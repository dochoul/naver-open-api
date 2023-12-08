export function changeDateString(date) {
  var year = date.substr(0, 4);
  var month = date.substr(4, 2);
  var day = date.substr(6, 2);
  return year + "." + month + "." + day;
}
