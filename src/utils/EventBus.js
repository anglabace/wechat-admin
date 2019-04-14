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
 *   onEventBus(type, params) {
 *
 *   }
 *
 *   在需要通讯的时候调用
 *   EventBus.post(type, params, activity);
 *   EventBus.postSate(state, activity);
 */
export default class EventBus {

  static containerMap = new Map();

  static register(activity: any) {
    if (!activity) return;
    if (typeof activity != 'object') return;
    if (typeof activity.setState != 'function') return;
    if (typeof activity.render != 'function') return;

    let constructor = Object.getPrototypeOf(activity).constructor;
    if (!constructor) return;
    let key = constructor.name;

    this.containerMap.set(key, activity);
  }

  static unregister(activity: any) {
    this.containerMap.delete(activity);
  }

  /* onEventBus(type, params) */
  static post(type: any, params: any, activity: string = 'any') {
    if ('any' === activity) {
      this.containerMap.forEach((activity, key, map) => {
        activity && activity.onEventBus && activity.onEventBus(type, params);
      });
    } else {
      let activity = this.containerMap.get(key);
      activity && activity.onEventBus && activity.onEventBus(type, params);
    }
  }

  /* setState({}) */
  static postSate(state: Object = {}, activity: string = 'any') {
    if ('any' === activity) {
      this.containerMap.forEach((activity, key, map) => {
        activity && activity.setState(state);
      });
    } else {
      let activity = this.containerMap.get(activity);
      activity && activity.setState(state);
    }
  }
}