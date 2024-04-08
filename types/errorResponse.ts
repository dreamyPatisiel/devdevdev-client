export interface ErrorRespone {
  response: {
    data: {
      resultType: 'FAIL';
      message: string;
      errorCode: number;
    };
  };
}
