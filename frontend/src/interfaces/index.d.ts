export interface IPaginate<T> {
  total: number;
  items: T[];
}

export interface IAutocomplete {
  id: number;
  title: string;
}

export interface IAccessToken {
  accessToken: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  createTime: Date;
  updateTime: Date;
}

export type ICoordinate = number[];

export interface IFile {
  id: number;
  filePath: string;
  mimeType: string;
}

export interface IPoint {
  id: number;
  title: string;
  coordinate: ICoordinate;
  creator: Omit<IUser, 'createTime' | 'updateTime'>;
  photo: IFile | null;
  createTime: Date;
  updateTime: Date;
}

export interface IComment {
  id: number;
  text: string;
  score: number;
  creator: Pick<IUser, 'id' | 'username'>;
  createTime: Date;
  updateTime: Date;
}
