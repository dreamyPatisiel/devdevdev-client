export const formatElapsedTime = (localDatetime: string) => {
  const now = new Date();
  const past = new Date(localDatetime);

  const diffMs = now.getTime() - past.getTime(); // 밀리초 차이
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay < 1) {
    if (diffHour >= 1) {
      return `${diffHour}시간 전`;
    }
    if (diffMin >= 1) {
      return `${diffMin}분 전`;
    }
    return '방금 전';
  }

  if (diffDay <= 7) {
    return `${diffDay}일 전`;
  }

  if (diffDay <= 30) {
    const weeks = Math.floor(diffDay / 7);
    return `${weeks}주 전`;
  }

  if (diffDay <= 365) {
    const months = Math.floor(diffDay / 30);
    return `${months}달 전`;
  }

  const years = Math.floor(diffDay / 365);
  return `${years}년 전`;
};
