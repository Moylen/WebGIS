import api from '../api/api.ts';
import { IComment, IPaginate } from '../interfaces';

class CommentService {
  async getMany(pointId: number): Promise<IPaginate<IComment>> {
    const response = await api.get<IPaginate<IComment>>('/comment', {
      params: {
        pointId,
      },
    });
    return response.data;
  }

  async save(pointId: number, text: string, score: number): Promise<IComment> {
    const response = await api.post<IComment>('/comment', {
      pointId,
      text,
      score,
    });
    return response.data;
  }
}

export const commentService = new CommentService();
