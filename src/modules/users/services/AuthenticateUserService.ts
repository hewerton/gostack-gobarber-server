import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/authConfig';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const foundUser = await this.usersRepository.findByEmail(email);

    if (!foundUser) {
      throw new AppError('The email/password combination is invalid!');
    }

    const passwordMatched = await compare(password, foundUser.password);

    if (!passwordMatched) {
      throw new AppError('The email/password combination is invalid!');
    }

    const token = sign({ oi: 'oi' }, authConfig.jwt.secret, {
      subject: foundUser.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user: foundUser, token };
  }
}

export default AuthenticateUserService;
