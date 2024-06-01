/**
 *
 * @param date The Created_Time of the code.
 *
 * @param expiredAt The Expired_time if exist in your system
 *
 * @param calcExpiredAt
 * If Expired_time isn't exist you can pass the 'SECONDS' of time need to calculate
 * @returns return is boolean 'false' or 'true', true means that code is expired
 */
export const checkExpiredTime = (
  date: Date,
  expiredAt?: Date,
  calcExpiredAt?: number,
): boolean => {
  const now = new Date();
  if (!expiredAt && !calcExpiredAt) return true;
  if (expiredAt) return expiredAt < now;
  if (calcExpiredAt) {
    const copiedDate = new Date(date.getTime());
    copiedDate.setSeconds(copiedDate.getSeconds() + calcExpiredAt);
    return copiedDate < now;
  }
  return true;
};
