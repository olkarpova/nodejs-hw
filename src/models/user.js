import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    }
  },
  { timestamps: true },
);

// хук в mongoose - pre - дозволяє виконати функцію перед збереженнням
// потрібно бо username не обовʼязковий
userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});
//перевизначимо як саме приводити до JSON:
//toJSON — це метод, який викликається, коли Mongoose‑документ
// перетворюється в JSON (наприклад, при res.json(newUser) v authController)
userSchema.methods.toJSON = function () {
  const obj = this.toObject(); //this - newUser, toObject приводе до нормального Jscript обʼєкта
  delete obj.password; //password в DB є, а користувачу не повертається
  return obj;
};
export const User = model('User', userSchema);
