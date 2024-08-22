/** 서버에서 주는 YYYY-MM-DD 형식을 YYYY.MM.DD로 바꾸는 함수 */
export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${year}.${month}.${day}`;
};
