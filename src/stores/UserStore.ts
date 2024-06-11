import {request} from '../utils/request';
import {action, flow, observable} from 'mobx';
import {save} from '../utils/storage';
import Loading from '../modules/home/components/widget/Loading';

class UserStore {
  @observable userInfo: any;
  @action
  setUserInfo = (info: any) => {
    this.userInfo = info;
  };
  requestLogin = flow(function* (
    this: UserStore,
    phone: string,
    pwd: string,
    cb: (success: boolean) => void,
  ) {
    try {
      Loading.show();
      const {data} = yield request('login', {name: phone, pwd: pwd});
      if (data) {
        this.userInfo = data;
        save('userInfo', JSON.stringify(data));
        cb?.(true);
      } else {
        cb(false);
      }
    } catch (e) {
      cb?.(false);
    } finally {
      Loading.hide();
    }
  });
}
//esm的单例导出
export default new UserStore();
