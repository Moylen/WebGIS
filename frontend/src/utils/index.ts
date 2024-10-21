import { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import { Coordinate } from '../types';

export const getCoordinatesFromFeatures = (
  features: FeatureLike[],
): Coordinate | undefined => {
  const geometry = features[0].getGeometry();
  if (geometry?.getType() === 'Point') {
    return (geometry as Point).getCoordinates();
  }
};

export const arraysAreEqual = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}
