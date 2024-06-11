import {action, observable} from 'mobx';
import {request} from '../../utils/request';
import {load} from '../../utils/storage';

const Size = 10;

export default class MessageStore {
  page: number = 1;
  @observable messageList: MessageListItem[] = [];
  @observable refreshing: boolean = false;
  @observable unread: UnRead = {} as UnRead;
  @action
  resetPage = () => {
    this.page = 1;
  };
  requestMessageList = async () => {
    if (this.refreshing) {
      return;
    }
    try {
      this.refreshing = true;
      const {data} = await request('messageList', {
        page: this.page,
        size: Size,
      });
      if (data?.length) {
        if (this.page === 1) {
          this.messageList = data;
        } else {
          this.messageList = [...this.messageList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.messageList = [];
        } else {
          //已经加载完了
        }
      }
    } catch (e) {
    } finally {
      this.refreshing = false;
    }
  };
  @action
  getUnRead = async () => {
    try {
      const {data} = await request('unread', {});
      this.unread = data;
    } catch (e) {}
  };
}
