import instance from '@/utils/axios';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';
import {
  getHome,
  getComicInfo,
  getChapter,
  getChapters,
  getSearch
} from '@/shared/api';
import { AXIOS_REQUEST_METHOD } from '@/constants/api';
import { buildExtraHeader } from '@/common/buildHeaders';
import { SOURCES } from '@/constants/index';

type MiddlewareProps = {
  _page?: string | null,
  _source?: string | null,
  _type?: string | null;
  _slug?: string | null;
  _chapSlug?: string | null;
  _id?: string | null;
  _keyword?: string | null;
};

class Middleware {
  _url: string;
  _page?: number;
  _source: string;
  _type: string;
  _slug: string;
  _chapSlug: string;
  _id: string;
  _keyword: string;
  _sourceObj?: any;

  _checkBodyType = (data: any) => {
    return ['string', 'number', 'object'].includes(typeof data);
  };

  _ignoreToken(payload: any) {
    const { token, ...rest } = payload;

    return rest;
  }

  _checkParameters(payload: any) {
    const { method = AXIOS_REQUEST_METHOD.GET, data = {}, params = {}, ...rest } = payload;

    return {
      method,
      data: this._checkBodyType(data) ? data : this._ignoreToken(data),
      params: this._checkBodyType(data) ? params : this._ignoreToken(params),
      ...rest,
    };
  }

  constructor(config: MiddlewareProps) {
    let { _page, _source, _type, _slug, _chapSlug, _id, _keyword } = config;

    const source = SOURCES.find(item => item.source == _source);
    const _url = source?.url;

    this._url = _url as string;
    this._page = Number(_page);
    this._source = _source as string;
    this._type = _type as string;
    this._slug = _slug as string;
    this._chapSlug = _chapSlug as string;
    this._id = _id as string;
    this._keyword = _keyword as string;
    this._sourceObj = source;

    instance.defaults.baseURL = _url;
    instance.defaults.adapter = fetchAdapter;
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess(res: any) {
    return res;
  }

  handleError(err: any) {
    if (err.response) {
      return err.response;
    }

    if (err.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log('err.request', err.request);
      return err.request;
    }

    if (err.message) {
      console.log('err.message:', err.message);
      return err.message;
    }

    return Promise.reject(err);
  }

  async publicAPI(payload: any) {
    const { extraHeaders, configs, ...rest } = this._checkParameters(payload);

    const params = {
      ...rest,
      ...configs,
      headers: buildExtraHeader(extraHeaders),
    };

    try {
      const res = await instance(params);
      return res;
    } catch (error) {
      return error;
    }
  }

  async getHome() {
    try {
      const data = await getHome(this._page, this._source, this._type, this._url);

      return data;
    } catch (error) {
      return error;
    }
  }

  async getComic() {
    try {
      const data = await getComicInfo(this._sourceObj, this._slug);

      return data;
    } catch (error) {
      return error;
    }
  }

  async getChapters() {
    try {
      const data = await getChapters(this._sourceObj, this._slug, this._chapSlug, this._id);

      return data;
    } catch (error) {
      return error;
    }
  }

  async getChapter() {
    try {
      const data = await getChapter(this._sourceObj, this._slug, this._chapSlug, this._id);

      return data;
    } catch (error) {
      return error;
    }
  }

  async getSearch() {
    try {
      const data = await getSearch(this._page, this._source, this._url, this._keyword);

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default Middleware;