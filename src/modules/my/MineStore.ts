import {action, observable} from 'mobx';
import {request} from '../../utils/request';
import {load} from '../../utils/storage';
import Loading from '../home/components/widget/Loading';

const Size = 10;

export default class MineStore {
  @observable refreshing: boolean = false;
  @observable info: any = {};
  @observable noteList: ArticleSimple[] = [];
  @observable collectionList: ArticleSimple[] = [];
  @observable favorateList: ArticleSimple[] = [];

  requestAll = async () => {
    Loading.show();
    this.refreshing = true;
    Promise.all([
      this.requestInfo(),
      this.requestNoteList(),
      this.requestCollectionList(),
      this.requestFavorateList(),
    ]).then(arr => {
      this.refreshing = false;
      Loading.hide();
      console.log('arr', arr);
      // this.info = info;
      // this.noteList = noteList as any;
      // this.collectionList = collectionList as any;
      // this.favorateList = favorateList as any;
    });
  };
  requestInfo = async () => {
    try {
      const {data} = await request('accountInfo', {});
      console.log('data', data);
      this.info = data;
    } catch (e) {
      console.log('e', e);
    } finally {
    }
  };
  requestNoteList = async () => {
    try {
      const {data} = await request('noteList', {});
      console.log('data', data);
      this.noteList = data || [];
    } catch (e) {
      console.log('e', e);
    } finally {
    }
  };
  requestCollectionList = async () => {
    try {
      const {data} = await request('collectionList', {});
      console.log('data', data);
      this.collectionList = data || [];
    } catch (e) {
      console.log('e', e);
    } finally {
    }
  };
  requestFavorateList = async () => {
    try {
      const {data} = await request('favorateList', {});
      console.log('data', data);
      this.favorateList = data || [];
    } catch (e) {
      console.log('e', e);
    } finally {
    }
  };
}
