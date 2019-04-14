import CookieUtils from "./CookieUtils";

export default class User {


  static getToken() {
    return CookieUtils.getLocal('token', '');
  }

  static setToken(value) {
    CookieUtils.setLocal('token', value);
  }

  static getUserID() {
    return CookieUtils.getLocal('userId', '');
  }

  static setUserID(value) {
    CookieUtils.setLocal('userId', value);
  }

  static isLogin() {
    return !!this.getToken();
  }

  static getUser(){
    let userJson = CookieUtils.getLocal('user', '{}');
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
    CookieUtils.setLocal('user', userJson);
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
  }

}