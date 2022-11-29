export function ExchangeRatesDataDateFormat(date: Date | string) {
  if (typeof date === 'string') {
    const dateStr = date.split('-');
    return `${dateStr[2]}-${dateStr[1]}-${dateStr[0]}`;
  }
  if (date instanceof Date)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  return '';
}
