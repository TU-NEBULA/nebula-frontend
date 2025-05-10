export const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return "유효하지 않은 날짜";
    }
    return formatter.format(dateObj);
  } catch (error) {
    console.error("날짜 형식 변환 중 오류 발생:", error);
    return "유효하지 않은 날짜";
  }
};

export const formatTime = (date: number) => {
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatter.format(date);
};
