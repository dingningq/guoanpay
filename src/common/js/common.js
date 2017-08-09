/**
 * Created by jh on 2017-06-30.
 */
import md5 from 'js-md5';
export default {
  formatDate(date) {
    var that=date;
    var y = that.getFullYear();
    var m = that.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = that.getDate();
    d = d < 10 ? ('0' + d) : d;

    return y + '-' + m + '-' + d;
  },
  passwordByRsa(val){
    let md5newPass=md5((val).toString());
    let md5newPass2=md5(md5newPass);
    let encrypt1 = new JSEncrypt();
    encrypt1.setPublicKey("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx4HIR4G8FyLgpgyLNUcI9GYhQTozrrB77jiaOShJjqlQZKWY2nOoon6YUBPySRIHZO/cua2bIhP2LTE2buGMofo+mvB6zB5nlgpkPo2JQRdeeYa523fmrI4npnvjA7WiZGaSxTh4ortp8xPWCtd+sZaqTk9H7xqLTU7mY5aHn2mAITbzLpwoWJ4osJt2WggclIit3DmyzVSfV5eBq5b6Suzeaxl52kyVTZFP3EMCfwvaad2tHikl87EaS7h8oUx+bLYGbFoxMjRKHnWQnGnYnaJCZsxvw1YycOdn6+JyyIHioN+4FBSRqlCTCibwnAUT8X3PtnGDKUYDMoisXlqcMwIDAQAB");
    var encrypted1 = encrypt1.encrypt(md5newPass2);
    return encrypted1;
  },
  byRsa(val){
    let encrypt1 = new JSEncrypt();
    encrypt1.setPublicKey("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx4HIR4G8FyLgpgyLNUcI9GYhQTozrrB77jiaOShJjqlQZKWY2nOoon6YUBPySRIHZO/cua2bIhP2LTE2buGMofo+mvB6zB5nlgpkPo2JQRdeeYa523fmrI4npnvjA7WiZGaSxTh4ortp8xPWCtd+sZaqTk9H7xqLTU7mY5aHn2mAITbzLpwoWJ4osJt2WggclIit3DmyzVSfV5eBq5b6Suzeaxl52kyVTZFP3EMCfwvaad2tHikl87EaS7h8oUx+bLYGbFoxMjRKHnWQnGnYnaJCZsxvw1YycOdn6+JyyIHioN+4FBSRqlCTCibwnAUT8X3PtnGDKUYDMoisXlqcMwIDAQAB");
    var encrypted1 = encrypt1.encrypt(val);
    return encrypted1;

  },
  byteToString(arr) {
    if(typeof arr === 'string') {
      return arr;
    }
    var str = '',
      _arr = arr;
    for(var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
      if(v && one.length == 8) {
        var bytesLength = v[0].length;
        var store = _arr[i].toString(2).slice(7 - bytesLength);
        for(var st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2);
        }
        str += String.fromCharCode(parseInt(store, 2));
        i += bytesLength - 1;
      } else {
        str += String.fromCharCode(_arr[i]);
      }
    }
    return str;
  }

}
