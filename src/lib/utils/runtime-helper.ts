/**
 * 非生产环境判断
 */
const devShowError = (errorMsg: string) => {
  return !process.env.EGG_SERVER_ENV && process.env.NODE_ENV === 'production'
    ? ''
    : errorMsg;
};
export { devShowError };
