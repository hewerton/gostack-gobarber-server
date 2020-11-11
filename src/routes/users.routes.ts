import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserSevice';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/uploadConfig';
import UpdateAvatarService from '../services/UpdateAvatarService';

const usersRouter = Router();
const upload = multer({ storage: uploadConfig.storage });

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatar = new UpdateAvatarService();
      const user = await updateAvatar.execute({
        userId: request.user.id,
        fileName: request.file.filename,
      });
      delete user.password;
      return response.json(user);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  },
);

export default usersRouter;
