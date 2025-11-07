export interface DbMessage<T> {
  type: string;
  payload?: T;
  id: string;
}
