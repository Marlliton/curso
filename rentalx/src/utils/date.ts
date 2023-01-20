function addDays(dateRef: Date, qtde: number) {
  return new Date(
    dateRef.getFullYear(),
    dateRef.getMonth(),
    dateRef.getDate() + qtde,
    dateRef.getHours(),
    dateRef.getMinutes(),
    dateRef.getSeconds(),
    dateRef.getMilliseconds()
  );
}

function diffInHours(startDate: Date, endDate: Date) {
  let toCompare = endDate;
  if (!(endDate instanceof Date)) {
    toCompare = new Date(endDate);
  }

  const result = (toCompare.getTime() / 1000 - startDate.getTime() / 1000) / 3600;
  return Math.ceil(result);
}

function diffInDays(startDate: Date, endDate: Date) {
  if (!startDate || !endDate) return -1;
  return Math.abs(endDate.getDate() - startDate.getDate());
}

export { addDays, diffInHours, diffInDays };
