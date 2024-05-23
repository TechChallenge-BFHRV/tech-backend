export abstract class Repository<TEntity> {
  abstract create(data: TEntity): Promise<TEntity>;
  abstract update(id: string, data: TEntity): Promise<TEntity>;
  abstract getById(id: string): Promise<TEntity>;
  abstract getAll(): Promise<TEntity[]>;
  abstract delete(id: string): Promise<void>;
}
