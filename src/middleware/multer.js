//отримаємо http запит (file)
//вщяти цей файл і завантажити його в памʼять
//multer > req.file
import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(), //зберігає файл у пам’яті сервера (не на диску)
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Only images allowed',
        ),
        false,
      );
    }
  },
});
