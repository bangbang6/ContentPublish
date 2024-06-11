import {action, observable} from 'mobx';
import {request} from '../../utils/request';
import {load} from '../../utils/storage';

const Size = 10;

export default class ArticleDetailStore {
  @observable detail: Article = {} as Article;

  requestArticledetail = async (id: number) => {
    try {
      const {data} = await request('articleDetail', {
        id,
      });
      this.detail = data || {};
    } catch (e) {
      console.log('e', e);
    }
  };
}
