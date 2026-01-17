import { AppDataSource } from '@/lib/data-source';
import { Users } from '@/entities/Users';

export class UserRepository {
  private readonly repo = AppDataSource.getRepository(Users);

  findTop(limit = 10) {
    return this.repo.find({ take: limit });
  }

  findById(userId: number) {
    return this.repo.findOneBy({ userId: userId });
  }
}
