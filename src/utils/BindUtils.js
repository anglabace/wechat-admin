/**
 * 自动bind组件Component的所有方法
 */
export default class BindUtils {
  /* 去除的react默认不需要bind的方法 */
  static except = [
    'constructor',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount',
    'render',
  ];

  /**
   * bind 对象的所有方法,component的生命周期方法除外
   * @param thiz bind的对象
   */
  static bindFun (thiz: this) {
    if (!thiz) return;
    let proto = Object.getPrototypeOf(thiz);
    if (!proto) return;
    let names = Object.getOwnPropertyNames(proto);
    if (!names) return;
    for (let index in names) {
      let name = names[index];
      if (typeof thiz[name] != 'function') continue;
      if (this.except.indexOf(name) > -1) continue;
      thiz[name] = thiz[name].bind(thiz);
      // console.log(name);
    }
  }
}