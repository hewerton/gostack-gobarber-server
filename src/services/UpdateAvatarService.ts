import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';

import User from '../models/User';
import uploadConfig from '../config/uploadConfig';
import AppError from '../errors/AppError';

interface Request {
  userId: string;
  fileName: string;
}

class UpdateAvatarService {
  private userRepository = getRepository(User);

  public async execute({ userId, fileName }: Request): Promise<User> {
    const user = await this.userRepository.findOne(userId);

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
    this.userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
