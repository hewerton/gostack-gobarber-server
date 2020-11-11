import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import authConfig from '../config/authConfig';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private userRepository = getRepository(User);

  public async execute({ email, password }: Request): Promise<Response> {
    const foundUser = await this.userRepository.findOne({ where: { email } });

    if (!foundUser) {
      throw new Error('The email/password combination is invalid!');
    }

    const passwordMatched = await compare(password, foundUser.password);

    if (!passwordMatched) {
      throw new Error('The email/password combination is invalid!');
    }

    const token = sign({ oi: 'oi' }, authConfig.jwt.secret, {
      subject: foundUser.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user: foundUser, token };
  }
}

export default AuthenticateUserService;
