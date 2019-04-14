export default class StringUtils {

  static isPhone(phone: string = '') {
    if (typeof phone !== 'string') phone += '';
    return phone.search(/^1\d{10}/) !== -1;
  }

  static inputString(str: string = '', length: number = -1) {
    if (length <= -1) return str;
    if (typeof str !== 'string') str += '';
    if (str.length <= length) return str;
    return str.substr(0, length - 1);
  }

  static inputPhone(phone: string = '') {
    if (typeof phone !== 'string') phone += '';
    phone = phone.trim().replace(/^[^1]/, '').replace(/[^\d]/g, '');
    if (phone.length > 11) phone = phone.substring(0, 11);
    return phone;
  }

  static inputVerifyCode(verifyCode: string = '') {
    if (typeof verifyCode !== 'string') verifyCode += '';
    return verifyCode.trim().replace(/[^\d]/g, '');
  }

  /** 数字 */
  static inputNumber(number: string = '', length: number = -1): string {
    if (typeof number !== 'string') number += '';
    number = number.trim().replace(/[^[\-\+\d\.]]/g, '');
    let symbol = number.match(/^[\-\+]/) || [];  // 正负号
    number = number.replace(/[\-\+]/g, '');
    number = number.replace(/^\./, '');
    let integer = number.match(/^\d+/) || [];    // 整数
    number = number.replace(/^\d+/, '');
    let decimals = number.match(/^\.\d*/) || []; // 小数

    let result = (symbol[0] || '') + (integer[0] || '') + (decimals[0] || '');
    if (length > 0 && result.length > length) result = result.substr(0, length);
    return result;
  }

  /** 整数 */
  static inputInteger(number: string = '', length: number = -1): string {
    let result = this.inputNumber(number, length) || '';
    return result.replace(/[^\d]/g, '');
  }

  /** 正数 */
  static inputPositiveNumber(number: string = '', length: number = -1): string {
    let result = this.inputNumber(number, length) || '';
    return result.replace(/[\-\+]/g, '');
  }


  static convertImageURL(object) {
    if (!__DEV__) return object;

    let host = 'http://192.168.1.109:8889';

    if (typeof object === 'string') {
      object = object.replace(/^\/static\//g, `${host}/static/`);
      // console.log(object);
      return object;
    } else if (typeof object === 'object') {
      try {
        object = JSON.stringify(object);
        object = object.replace(/\"\/static\//g, `\"${host}/static/`);
        // console.log(object);
        return JSON.parse(object);
      } catch (e) {
        // console.log(e);
      }
    }

    return object;
  }

};