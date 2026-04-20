import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate, //перевіряє чи користувач залогінений
  upload.single('avatar'), //викликаємо multer,
  // avatar - назва властивості,
  //req.file маємо доступ
  updateUserAvatar,
);

export default router;
//Метод single(fieldname) обробляє рівно один файл.
//  У запиті очікується поле з іменем, яке ви вказали ("avatar"),
// і Multer прикріплює цей файл до req.file.
