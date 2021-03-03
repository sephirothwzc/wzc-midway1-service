import FlakeId = require('flake-idgen');
import { init, provide } from 'midway';
import { toString } from 'lodash';
import intformat = require('biguint-format');

@provide()
export class SnowFlake {
  private flakeIdgen: FlakeId;

  @init()
  init() {
    const a = Number(
      process.pid.toString().substring(process.pid.toString().length - 3)
    );
    this.flakeIdgen = new FlakeId({ id: 23 + a, epoch: 1300000000000 });
  }

  /**
   * 获取id
   */
  next() {
    return toString(intformat(this.flakeIdgen.next(), 'dec'));
  }
}
