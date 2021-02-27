import fs from 'fs';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/uploadConfig';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
  fileName: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, fileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not exist!', 404);
    }

    if (user.avatar) {
      const filePath = path.join(uploadConfig.destination, user.avatar);
      const fileExists = await fs.promises.stat(filePath);
      if (fileExists) {
        await fs.promises.unlink(filePath);
      }
    }

    user.avatar = fileName;
    this.usersRepository.update(user);

    return user;
  }
}

export default UpdateAvatarService;
