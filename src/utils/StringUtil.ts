export const formatPhone = (phone: string) => {
  let trim = phone.replace(/\s+/g, '');
  const result = [trim.slice(0, 3), trim.slice(3, 7), trim.slice(7)].filter(
    item => !!item,
  );
  return result.join(' ');
};
export const replaceBlank = (phone: string) => {
  let trim = phone.replace(/\s+/g, '');

  return trim;
};
