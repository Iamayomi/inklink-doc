import {
  Connection,
  FilterQuery,
  Model,
  SaveOptions,
  Types,
  UpdateQuery,
  trusted,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  public async createDocument(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ) {
    const newDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await newDocument.save(options)).toJSON() as unknown as TDocument;
  }

  public async findOne(
    filterQuery: FilterQuery<TDocument>,
    _p0?: {},
    _p1?: { lean: boolean },
  ): Promise<TDocument> {
    const doc = await this.findOne(filterQuery, {}, { lean: true });

    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    return doc;
  }

  public async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    _p0: { lean: boolean; upsert?: boolean; new: boolean },
  ): Promise<TDocument> {
    const doc = await this.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    return doc;
  }

  public async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ): Promise<TDocument> {
    const doc = await this.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });

    return doc;
  }

  public async find(
    filterQuery: FilterQuery<TDocument>,
    _p0?: {},
    _p1?: { lean: boolean },
  ): Promise<TDocument> {
    return await this.find(filterQuery, {}, { lean: true });
  }

  public async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
