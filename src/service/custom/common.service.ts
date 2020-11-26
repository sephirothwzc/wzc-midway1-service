import { Context, inject, provide } from 'midway';
import { IBaseModel } from '../../lib/base/model.base';
// import { AppUserModel, APP_USER } from '../../lib/models/app-user.model';
import { ISequelizeQuery } from '../../lib/utils/sequelize-query';

export interface ICommonService extends CommonService {}

export type Include = {
  model: string;
  as: string;
  where: any;
  attributes: any[];
  required: boolean;
  right: boolean;
  limit: number;
  include: Include[];
};

type FindAllOptions = {
  where: {};
  attributes: string[];
  include: Include[];
  order: string[];
  limit: number;
  offset: number;
  raw: boolean;
  having: {};
  group: string[];
};

@provide()
export class CommonService {
  @inject()
  sequelizeQuery: ISequelizeQuery;

  /**
   * 单表聚合
   * @param ctx graphql 上下文
   * @param modelName modelName
   * @param field
   * @param aggregateFunction
   * @param options
   */
  async aggregate(
    ctx: Context,
    modelName: string,
    field: any,
    aggregateFunction: string,
    options: any
  ): Promise<any> {
    const model: IBaseModel = await ctx.requestContext.getAsync(
      `${modelName}Model`
    );
    const where = options?.where && this.sequelizeQuery.where(options.where);
    const result = await model.aggregate(field, aggregateFunction, {
      ...options,
      where,
    });
    return {
      value: result,
    };
  }

  /**
   * findAll
   * @param ctx
   * @param modelName
   * @param options
   */
  async findAll(
    ctx: Context,
    modelName: string,
    options: FindAllOptions
  ): Promise<any[]> {
    const model: IBaseModel = await ctx.requestContext.getAsync(
      `${modelName}Model`
    );
    const paramOptions = {
      where: options?.where && this.sequelizeQuery.where(options.where),
      attributes:
        options?.attributes &&
        this.sequelizeQuery.attributes(options.attributes),
      include: options?.include && this.sequelizeQuery.include(options.include),
      order: options?.order,
      limit: options?.limit,
      offset: options?.offset,
      raw: options?.raw,
      having: options?.having && this.sequelizeQuery.where(options.having),
      group: options?.group,
    };
    return model.findAll(paramOptions);
  }
}
