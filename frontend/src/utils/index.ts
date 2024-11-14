import { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import { ICoordinate } from '../interfaces';

export const getCoordinatesFromFeatures = (features: FeatureLike[]): ICoordinate | undefined => {
  const geometry = features[0].getGeometry();
  if (geometry?.getType() === 'Point') {
    return (geometry as Point).getCoordinates();
  }
};
