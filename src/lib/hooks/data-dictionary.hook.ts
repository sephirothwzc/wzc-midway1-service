import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { CONTRACT_COLLECTION_PAYMENT, ContractCollectionPaymentModel } from '../models/contract-collection-payment.model';
import { CONTRACT_COLLECTION_PAYMENT_PLAN, ContractCollectionPaymentPlanModel } from '../models/contract-collection-payment-plan.model';
import { CONTRACT, ContractModel } from '../models/contract.model';
import { DATA_DICTIONARY, DataDictionaryModel } from '../models/data-dictionary.model';
import { ENTERPRISE, EnterpriseModel } from '../models/enterprise.model';
import { PROJECT_HIS, ProjectHisModel } from '../models/project-his.model';
import { PROJECT, ProjectModel } from '../models/project.model';
import * as Bb from 'bluebird';

@provide('DataDictionaryHook')
export class DataDictionaryHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { contractCollectionPaymentIbfk5, contractCollectionPaymentIbfk6, contractCollectionPaymentPlanIbfk2, contractCollectionPaymentPlanIbfk3, contractIbfk3, contractIbfk4, contractIbfk5, dataDictionaryIbfk1, enterpriseIbfk1, projectHisIbfk3, projectHisIbfk4, projectHisIbfk6, projectHisIbfk7, projectIbfk2, projectIbfk3, projectIbfk5, projectIbfk6 } = await Bb.props({
        contractCollectionPaymentIbfk5: ContractCollectionPaymentModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT.MODE]: _.get(model, 'where.id'),
          },
        }),
        contractCollectionPaymentIbfk6: ContractCollectionPaymentModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT.TYPE]: _.get(model, 'where.id'),
          },
        }),
        contractCollectionPaymentPlanIbfk2: ContractCollectionPaymentPlanModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT_PLAN.MODE]: _.get(model, 'where.id'),
          },
        }),
        contractCollectionPaymentPlanIbfk3: ContractCollectionPaymentPlanModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT_PLAN.TYPE]: _.get(model, 'where.id'),
          },
        }),
        contractIbfk3: ContractModel.findOne({
          where: {
            [CONTRACT.CONTRACT_TYPE_ID]: _.get(model, 'where.id'),
          },
        }),
        contractIbfk4: ContractModel.findOne({
          where: {
            [CONTRACT.CONTRACT_STATUS_ID]: _.get(model, 'where.id'),
          },
        }),
        contractIbfk5: ContractModel.findOne({
          where: {
            [CONTRACT.CONTRACT_NATURE_ID]: _.get(model, 'where.id'),
          },
        }),
        dataDictionaryIbfk1: DataDictionaryModel.findOne({
          where: {
            [DATA_DICTIONARY.PARENT_ID]: _.get(model, 'where.id'),
          },
        }),
        enterpriseIbfk1: EnterpriseModel.findOne({
          where: {
            [ENTERPRISE.ENTERPRISE_TYPE_ID]: _.get(model, 'where.id'),
          },
        }),
        projectHisIbfk3: ProjectHisModel.findOne({
          where: {
            [PROJECT_HIS.PROJECT_TYPE_ID]: _.get(model, 'where.id'),
          },
        }),
        projectHisIbfk4: ProjectHisModel.findOne({
          where: {
            [PROJECT_HIS.PROJECT_SUBJECT_ID]: _.get(model, 'where.id'),
          },
        }),
        projectHisIbfk6: ProjectHisModel.findOne({
          where: {
            [PROJECT_HIS.PROJECT_STATUS_ID]: _.get(model, 'where.id'),
          },
        }),
        projectHisIbfk7: ProjectHisModel.findOne({
          where: {
            [PROJECT_HIS.BUILD_NATURE_ID]: _.get(model, 'where.id'),
          },
        }),
        projectIbfk2: ProjectModel.findOne({
          where: {
            [PROJECT.PROJECT_TYPE_ID]: _.get(model, 'where.id'),
          },
        }),
        projectIbfk3: ProjectModel.findOne({
          where: {
            [PROJECT.PROJECT_SUBJECT_ID]: _.get(model, 'where.id'),
          },
        }),
        projectIbfk5: ProjectModel.findOne({
          where: {
            [PROJECT.PROJECT_STATUS_ID]: _.get(model, 'where.id'),
          },
        }),
        projectIbfk6: ProjectModel.findOne({
          where: {
            [PROJECT.BUILD_NATURE_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (contractCollectionPaymentIbfk5 || contractCollectionPaymentIbfk6 || contractCollectionPaymentPlanIbfk2 || contractCollectionPaymentPlanIbfk3 || contractIbfk3 || contractIbfk4 || contractIbfk5 || dataDictionaryIbfk1 || enterpriseIbfk1 || projectHisIbfk3 || projectHisIbfk4 || projectHisIbfk6 || projectHisIbfk7 || projectIbfk2 || projectIbfk3 || projectIbfk5 || projectIbfk6) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
