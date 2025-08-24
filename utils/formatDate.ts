/** 서버에서 주는 YYYY-MM-DD 형식을 YYYY.MM.DD로 바꾸는 함수 */
export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${year}.${month}.${day}`;
};

/** 서버에서 주는 YYYY-MM-DD HH:mm:ss 형식을 YYYY.MM.DD HH:mm로 바꾸는 함수 */
export const formatISOtoDate = (dateString: string): string | null => {
  if (dateString === '') {
    console.error('YYYY-MM-DD HH:mm:ss 형식인 파라미터가 존재하지 않습니다.');
    return null;
  }

  const [date, time] = dateString.split(' ');

  const [year, month, day] = date.split('-');

  const timeArray = time.split(':');
  const [hour, min, sec] = timeArray;

  if (year === '0' || month === '0' || day === '0' || hour === '0' || min === '0' || sec === '0') {
    console.error('파라미터에 0이 포함되어 있습니다.');
    return null;
  }

  const formattedDate = `${year}.${formatTwoDigit(month)}.${formatTwoDigit(day)}`;
  const formattedTime = `${formatTwoDigit(hour)}:${formatTwoDigit(min)}`;

  return formattedDate + ' ' + formattedTime;
};

const formatTwoDigit = (padString: string) => padString.padStart(2, '0');
