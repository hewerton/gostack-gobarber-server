import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: Request): Promise<User> {
    const foundUser = await this.userRepository.findByEmail(email);

    if (foundUser) {
      throw new AppError('This email is already registred.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
