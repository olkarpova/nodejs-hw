import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  // console.log(req.file);

  const result = await saveFileToCloudinary(req.file.buffer, req.user._id);
  //оновити user avatar
  const updateUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: 'after' },
  );
  res.status(200).json({ url: updateUser.avatar });
};
// У req.file зберігається не файл, а такий об'єкт
// (для multer.memoryStorage()):
//{
  //fieldname: 'avatar',            // назва поля у формі
  //originalname: 'download.jpeg',  // оригінальне ім’я файлу на клієнті
  //encoding: '7bit',               // тип кодування передавання
  //mimetype: 'image/jpeg',         // MIME-тип файлу
  //size: 12345,                    // розмір у байтах
  //buffer: <Buffer ff d8 ff ...>   // вміст файлу (Buffer)
//}
