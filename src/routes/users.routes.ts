import { Router } from 'express';

import CreateUserService from '../services/CreateUserSevice';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json();
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRouter.get('/', async (request, response) => {
  return response.send();
});

export default usersRouter;
