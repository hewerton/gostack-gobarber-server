import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();

    const user = await authenticateUser.execute({ email, password });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

sessionsRouter.get('/', async (request, response) => {
  return response.send();
});

export default sessionsRouter;
