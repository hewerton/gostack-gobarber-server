import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository = getRepository(User);

  async execute({ name, email, password }: Request): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (foundUser) {
      throw new AppError('This email is already registred.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
