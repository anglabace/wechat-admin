import TokenStatus from "./TokenStatus";

export class CookieUtils {

  static cookie(action, key, value, type) {
    if (action == 'set') {
      if (type == 'local' && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      } else if (type == 'session' && typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      } else if (type == 'cookie' && typeof document !== 'undefined') {
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + date.toGMTString() + '; path=/';
      }
    }
    if (action == 'get') {
      if (type == 'local' && typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      } else if (type == 'session' && typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      } else if (type == 'cookie' && typeof document !== 'undefined') {
        let arr1 = document.cookie.split(';');
        for (let i = 0; i < arr1.length; i++) {
          let arr2 = arr1[i].split('=');
          if ((arr2[0] && arr2[0].trim()) == key) {
            return arr2[1];
          }
        }
      }
      return null;
    }
    if (action == 'clear') {
      if (type == 'local' && typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.removeItem(key);
      } else if (type == 'session' && typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.removeItem(key);
      } else if (type == 'cookie' && typeof document !== 'undefined') {
        let date = new Date();
        date.setTime(date.getTime() - 1000);
        document.cookie = key + '=;expires=' + date.toGMTString() + '; path=/';
      }
    }
  }

  static getLocal(key, defaultValue = '') {
    let value = this.cookie('get', key, null, 'local');
    return value !== null ? value : defaultValue;
  }

  static setLocal(key, value) {
    this.cookie('set', key, value, 'local');
  }

  static clearLocal(key) {
    this.cookie('clear', key, null, 'local');
  }

  static getSession(key, defaultValue = '') {
    let value = this.cookie('get', key, null, 'session');
    return value !== null ? value : defaultValue;
  }

  static setSession(key, value) {
    this.cookie('set', key, value, 'session');
  }

  static clearSession(key) {
    this.cookie('clear', key, null, 'session');
  }

  static getCookie(key, defaultValue = '') {
    let value = this.cookie('get', key, null, 'cookie');
    return value !== null ? value : defaultValue;
  }

  static setCookie(key, value) {
    this.cookie('set', key, value, 'cookie');
  }

  static clearCookie(key) {
    this.cookie('clear', key, null, 'cookie');
  }

  //------------------我是一条美丽的分割线------------------

  static getToken() {
    return this.getLocal('token', '');
  }

  static setToken(value) {
    this.setLocal('token', value);
  }

  static getUserID() {
    return this.getLocal('userId', '');
  }

  static setUserID(value) {
    this.setLocal('userId', value);
  }

  static getUser(){
    let userJson = this.getLocal('user', '{}');
    try {
      let user = JSON.parse(userJson);
      return user;
    } catch (e) {
      console.log(e);
    }
    return {};
  }

  static setUser(user) {
    let userJson = JSON.stringify(user || {});
    this.setLocal('user', userJson);
  }

  static storageUser(user) {
    this.setUser(user || {});
    this.setToken(user.token || '');
    this.setUserID(user.userId || '');
  }

  static clearUser() {
    this.setUser({});
    this.setToken('');
    this.setUserID('');
    TokenStatus.notifyStatus();
  }

}

export default CookieUtils;
