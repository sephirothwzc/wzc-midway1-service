import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import {
  DATA_DICTIONARY,
  DataDictionaryModel,
} from '../models/data-dictionary.model';
import * as Bb from 'bluebird';

@provide('DataDictionaryHook')
export class DataDictionaryHook {
  async beforeDestroy(
    model: DataDictionaryModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { dataDictionaryIbfk2 } = await Bb.props({
      dataDictionaryIbfk2: DataDictionaryModel.findOne({
        where: {
          [DATA_DICTIONARY.PARENT_ID]: model.get('id'),
        },
      }),
    });
    if (dataDictionaryIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }
}
