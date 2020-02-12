const ts2date = function(ts) {
    var d = new Date(ts * 1000);
    var yr = d.getFullYear();
    var dy = d.getDate();
    var mn = d.getMonth() + 1;
    var hr = ( '0' + d.getHours()).slice(-2);
    var mi = ( '0' + d.getMinutes()).slice(-2);
    var se = ( '0' + d.getSeconds()).slice(-2);
    return yr + '/' + mn + '/' + dy + ' ' + hr + ':' + mi + ':' + se;
}


export default({}, inject) => {
    inject('ts2date', ts2date);
}
