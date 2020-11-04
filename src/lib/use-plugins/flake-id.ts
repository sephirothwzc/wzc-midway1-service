import FlakeId = require('flake-idgen');
import { init, provide, scope, ScopeEnum } from 'midway';
import { toString } from 'lodash';
import intformat = require('biguint-format');

@scope(ScopeEnum.Singleton)
@provide()
export class SnowFlake {
  private flakeIdgen: FlakeId;

  @init()
  init() {
    this.flakeIdgen = new FlakeId({ epoch: 1300000000000 });
  }

  /**
   * 获取id
   */
  next() {
    return toString(intformat(this.flakeIdgen.next(), 'dec'));
  }
}
