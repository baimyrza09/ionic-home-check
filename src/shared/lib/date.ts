import dayjs from 'dayjs';

type ArbitraryObject = { [p: string]: any };
export type DateTimeFormats = 'iso' | 'standard' | string;

export function convertDateString(dateString: string, format: DateTimeFormats) {
  const momentDate = getDayDateFromString(dateString);
  if (!momentDate.isValid() || !dateString.match(/\D/g)) {
    throw new Error('Невалидная дата');
  }

  if (!isDateTime(dateString) && format === 'iso') {
    return momentDate.format('YYYY-MM-DD');
  }

  if (isDateTime(dateString) && format === 'standard') {
    return momentDate.format('DD.MM.YYYY HH:mm:ss');
  }

  if (!isDateTime(dateString) && format === 'standard') {
    return momentDate.format('DD.MM.YYYY');
  }

  return momentDate.toISOString();
}

export function convertObjectDates<T extends ArbitraryObject>(obj: T, format: DateTimeFormats): T {
  if (!isObject(obj)) {
    throw new Error('convertObjectDates ожидает объект');
  }

  return Object.keys(obj).reduce((acc, prop) => {
    const propValue = obj[prop];
    if (propValue instanceof Date) {
      const dateFormat = format === 'iso' ? 'YYYY-MM-DD' : 'DD.MM.YYYY';
      acc[prop] = dayjs(propValue).format(dateFormat);

      return acc;
    }

    if (isObject(propValue)) {
      acc[prop] = convertObjectDates(propValue, format);
      return acc;
    }

    if (Array.isArray(propValue)) {
      acc[prop] = propValue.map((value) => (isObject(value) ? convertObjectDates(value, format) : value));
      return acc;
    }

    if (typeof propValue === 'string') {
      try {
        acc[prop] = convertDateString(propValue, format);
      } catch (e) {
        acc[prop] = propValue;
      }

      return acc;
    }

    acc[prop] = propValue;

    return acc;
  }, {} as ArbitraryObject) as T;
}

function getDayDateFromString(dateString: string) {
  const standardDate = /^\d{2}\.\d{2}\.\d{4}$/g;
  const standardDateTime = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2}$/g;

  if (dateString.match(standardDate)) {
    return dayjs(dateString, 'DD.MM.YYYY');
  }

  if (dateString.match(standardDateTime)) {
    return dayjs(dateString, 'DD.MM.YYYY HH:mm:ss');
  }

  return dayjs(dateString);
}

function isDateTime(dateString: string): boolean {
  return dateString.length > 10;
}

function isObject(val: any): val is ArbitraryObject {
  return typeof val === 'object' && !Array.isArray(val) && val !== null;
}
