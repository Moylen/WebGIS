import { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import { ICoordinate } from '../interfaces';
import dayjs from 'dayjs';
import 'dayjs/locale/ru.js';

export const getCoordinatesFromFeatures = (features: FeatureLike[]): ICoordinate | undefined => {
  const geometry = features[0].getGeometry();
  if (geometry?.getType() === 'Point') {
    return (geometry as Point).getCoordinates();
  }
};

export const processViewDate = (date: Date): string => {
  const dayNow = dayjs().startOf('day');
  const yearNow = dayjs().startOf('year');

  const res = dayjs(date).locale('ru');

  if (dayNow.isSame(dayjs(date).startOf('day'))) {
    return res.format('сегодня в HH:mm');
  }

  if (dayNow.subtract(1, 'day').isSame(dayjs(date).startOf('day'))) {
    return res.format('вчера в HH:mm');
  }

  if (yearNow.isSame(dayjs(date).startOf('year'))) {
    return res.format('DD MMM в HH:mm');
  }

  return res.format('DD MMM YYYY в HH:mm');
};