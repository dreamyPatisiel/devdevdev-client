/** 서버에서 주는 YYYY-MM-DD 형식을 YYYY.MM.DD로 바꾸는 함수 */

export const formatDate = (dateString: string) => {
  if (!dateString?.trim()) return null;

  const trimmedString = dateString.trim();
  if (!trimmedString.includes('-')) return null;

  const [year, month, day] = trimmedString.split('-');
  if (!year || !month || !day) return null;

  return `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
};

/** 서버에서 주는 YYYY-MM-DD HH:mm:ss 형식을 YYYY.MM.DD HH:mm로 바꾸는 함수 */
export const formatISOtoDate = (dateString: string) => {
  if (!dateString?.trim()) return null;

  const trimmedString = dateString.trim();
  const [date, time] = trimmedString.split(' ');

  if (!time) {
    if (trimmedString.includes(':')) {
      const [hours, minutes] = trimmedString.split(':');
      if (!hours || !minutes) return null;
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }
    return formatDate(trimmedString);
  }

  const formattedDate = formatDate(date);
  if (!formattedDate) return null;

  const [hours, minutes] = time.split(':');
  if (!hours || !minutes) return formattedDate;

  return `${formattedDate} ${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};
