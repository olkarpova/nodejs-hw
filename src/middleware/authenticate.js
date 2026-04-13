// 1. Перевірити наявність accessToken кукі (якщо немає то 401)
// 2. Знаходим сесію з цим accessToken (якщо немає то 401)
// 3. Перевіряємо строк діі токена (якщо строк вийшов то 401)
// 4. Шукаємо користувача (якшо користувача не існує то 401)
// 5. Додаємо на гед властивість user (req.user = user) і викликаємо next.

// RBAC (role based access control) для вводу ролей
import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {

  const { accessToken } = req.cookies; //accesstoken у нас в куках
  if (!accessToken) {
    throw createHttpError(401, 'Missing access token');
  }

  const session = await Session.findOne({ accessToken }); //шукаємо саме по accessToken
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
  if (isTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401);
  }

  req.user = user;
  //на обʼєкті запиту створюємо додаткову властивість user
  //якої там не існувало і туди записуємо знайденого користувача
  //щоб у контроллерах після виклику middleware була властивість req.user
  // i ми з неї могли брати властивості

  next(); //передаємо управління даними
};
