import { UserRepository } from '@/repositories/user.repository';

export class UserService {
  private repo = new UserRepository();

  getUsers() {
    return this.repo.findTop(10);
  }

  getUserDetail(userId: number) {
    return this.repo.findById(userId);
  }
}
