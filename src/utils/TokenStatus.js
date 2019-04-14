import User from "./User";

/**
 * 在需要监听登录状态的Component中注册和解注
 *   componentDidMount() {
 *     TokenStatus.register(this);
 *   }
 *
 *   componentWillUnmount() {
 *     TokenStatus.unregister(this);
 *   }
 *
 * 并且实现监听方法
 *   onTokenStatus(token) {
 *
 *   }
 */
export default class TokenStatus {

  static containerArray = new Array();

  static register(activity) {
    if (!activity) return;
    if (typeof activity != 'object') return;

    let constructor = Object.getPrototypeOf(activity).constructor;
    if (!constructor) return;
    let name = constructor.name;
    this.containerArray.push(activity);
  }

  static unregister(activity) {
    let index = this.containerArray.indexOf(activity);
    if (-1 == index) return;
    this.containerArray.splice(index, 1);
  }

  static notifyStatus() {
    let length = this.containerArray.length;
    for (let i = 0; i < length; i++) {
      let any = this.containerArray[i];
      any.onTokenStatus && any.onTokenStatus(User.getToken());
    }
  }
}