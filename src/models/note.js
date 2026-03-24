import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const noteSchema =  new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    tag: {
      type: String,
      default: 'Todo',
      enum: ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'],
    },
  },
  {
    timestamps: true,
  },
);
//готуємо модель
export const Note = mongoose.model('Note', noteSchema);
// 'Note' - назва моделі
