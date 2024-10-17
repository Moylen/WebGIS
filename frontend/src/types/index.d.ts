export interface Paginate<T> {
  total: number;
  items: T[];
}

export interface AccessToken {
  accessToken: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  createTime: Date;
  updateTime: Date;
}

export type Coordinate = number[];

export interface Point {
  id: number;
  title: string;
  coordinate: Coordinate;
  creator: Pick<User, 'id' | 'username'>;
  createTime: Date;
  updateTime: Date;
}