export interface Options {
  /**
   * 缓存过期时间，单位是秒，当其为0时永远不会过期
   */
  ttl: number;
  /**
   * 当无法从数据源获取数据时，是否用已过期缓存来作为返回结果
   */
  keep: boolean;
  /**
   * 每次从缓存获取数据时，是不是同时更新缓存的过期时间
   */
  autoRenew: boolean;
  /**
   * 批量获取数据时，那些数据源没有返回的数据是否作为null写入缓存
   */
  cacheUndefined: boolean;
  /**
   * 一个函数，在批量缓存中用于计算对象对应的子键
   */
  getKey: {};
  /**
   * 本次是否禁用缓存，直接从数据源获取数据
   */
  disable: boolean;
  /**
   * 本次直接从数据源获取数据，并将其存入缓存
   */
  update: boolean;
  /**
   * 读写缓存数据的时候，不使用JSON.stringify和JSON.parse对数据进行处理
   */
  raw: boolean;
}

export interface Cache9 {
  /**
   * 更新或者获取缓存
   * @param key
   * @param func
   * @param options
   */
  get(key: string, func: () => {}, options?: Options): Promise<any>;

  /**
   * 设置数据到缓存
   */
  setCache(): void;

  /**
   * 获取缓存内容
   * @param key
   * @param options
   */
  getCache(key: string, options?: Options): Promise<any>;

  /**
   * 批量更新或者获取缓存
   * @param key
   * @param list
   * @param saveKey
   * @param func
   * @param options
   */
  getM(
    key: string,
    list: any[],
    saveKey: string,
    func: () => {},
    options?: Options
  ): Promise<any>;
  /**
   * 批量存储数据中的储存单个数据
   */
  setCacheM(): void;
  /**
   * 仅从缓存中批量获取数据
   * @param key
   * @param list
   * @param options
   */
  getCacheM(key: string, list: any[], options?: Options): Promise<any>;
  /**
   * 更新时间戳
   */
  renew(): /* key, options*/ void;
  /**
   * 批量更新时间戳
   * @param key
   * @param list
   * @param options
   */
  renewM(key: string, list: any[], options?: Options): void;
  /**
   * 清除缓存
   */
  clear(): /* key*/ Promise<void>;
  /**
   * 批量清除缓存
   * @param key
   * @param list
   * @param options
   */
  clearM(key: string, list: any[], options?: Options): Promise<void>;
  /**
   * 销毁
   */
  destroy(): void;
  /**
   * 从配置或者选项中获取选项
   * @param options
   * @param key
   * @param value
   */
  _getCfg(options?: {}, key?: string, value?: any): any;
  /**
   * 获取缓存内容
   */
  _getCache(): /* key, options*/ Promise<void>;
  /**
   * 获取源数据
   * @param func
   */
  _getRaw(func: () => {} /* , options */): Promise<any>;
  /**
   * 获取键组
   * @param list
   * @param param1
   */
  _getKeys(list: any[], { getKey }: any): any;
  /**
   * 批量获取数据
   * @param key
   * @param keys
   * @param list
   * @param saveKey
   * @param func
   * @param options
   */
  _getRawM(
    key: string,
    keys: string[],
    list: any[],
    saveKey: any,
    func: () => {},
    options?: Options
  ): Promise<any[]>;

  // 批量更新缓存时间
  _renewM(): /* key, keys, ttl*/ void;
  // 清除缓存
  _clearM(): /* key, [keys]*/ Promise<void>;
  // 批量获取缓存
  _getCacheM(): /* key, keys, options*/ Promise<void>;
  // 根据缓存获取结果和待获取键值的对比来获取需求列表
  _getNeedList(list: any[], keys: string[], datas: any): Promise<any>;
  // 合并结果数据并返回合并后的数据
  _mergeDatas(keys: string[], cache: any, raw: any, options?: Options): any;
}
