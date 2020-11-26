export enum AppSettingCode {
  /**
   * 每天每人抽奖次数
   */
  appUserLaunchNumber = 'appUserLaunchNumber',
  /**
   * 投放奖励勋章数量
   */
  launchMedalFraction = 'launchMedalFraction',
  /**
   * 每天每人值守次数限制
   */
  fixedNumber = 'fixedNumber',
  /**
   * 每天每人投放次数限制
   */
  launchNumber = 'launchNumber',
  /**
   * 桶站可值守时间表
   */
  bucketFixedTime = 'bucketFixedTime',
  /**
   * 绑定居民证件验证码
   */
  smsIdcode = 'sms-idcode',
  /**
   * 石分回收订单接单
   */
  smsOrderreceiving = 'sms-orderreceiving',
  /**
   * 石分回收订单转派
   */
  smsOrderreceivingTo = 'sms-orderreceivingTo',
  /**
   * 石分回收订单提醒
   */
  smsOrderrecyclingAppuser = 'sms-orderrecyclingAppuser',
  /**
   * 客服电话
   */
  custmerServiceHotline = 'Custmer-Service-Hotline',
}
