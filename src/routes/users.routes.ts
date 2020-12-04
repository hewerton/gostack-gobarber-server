import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserSevice';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/uploadConfig';
import UpdateAvatarService from '../services/UpdateAvatarService';

const usersRouter = Router();
const upload = multer({ storage: uploadConfig.storage });

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.bodddy;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json();
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatar = new UpdateAvatarService();
    const user = await updateAvatar.execute({
      userId: request.user.id,
      fileName: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  },
);

export default usersRouter;
