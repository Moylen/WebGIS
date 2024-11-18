import api from '../api/api.ts';
import { ICoordinate, IPaginate, IPoint } from '../interfaces';

class PointService {
  async getMany(query?: string): Promise<IPaginate<IPoint>> {
    const response = await api.get<IPaginate<IPoint>>('/point', {
      params: {
        query,
      },
    });
    return response.data;
  }

  async save(title: string, coordinate: ICoordinate): Promise<IPoint> {
    const response = await api.post<IPoint>('/point', {
      title,
      coordinate,
    });
    return response.data;
  }

  async uploadPhoto(pointId: number, file: File): Promise<IPoint> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<IPoint>(`/point/${pointId}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const pointService = new PointService();
