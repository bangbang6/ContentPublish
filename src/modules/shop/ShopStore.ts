import {action, observable} from 'mobx';
import {request} from '../../utils/request';
import {load} from '../../utils/storage';

const Size = 10;

export default class ShopStore {
  page: number = 1;
  @observable goodsList: GoodsSimple[] = [];
  @observable refreshing: boolean = false;
  @observable top10Category: GoodsCategory[] = [];
  @action
  resetPage = () => {
    this.page = 1;
  };
  @action
  requestGoodsList = async () => {
    if (this.refreshing) {
      return;
    }
    try {
      this.refreshing = true;
      const {data} = await request('goodslist', {
        page: this.page,
        size: Size,
      });
      if (data?.length) {
        if (this.page === 1) {
          this.goodsList = data;
        } else {
          this.goodsList = [...this.goodsList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.goodsList = [];
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
  getTop10CategoryList = async () => {
    try {
      const {data} = await request('top10Category', {});
      this.top10Category = data;
    } catch (e) {}
  };
}
