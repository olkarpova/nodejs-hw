import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

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
      default: '',
    },
    tag: {
      type: String,
      default: 'Todo',
      enum: TAGS,
    },
  },
  {
    timestamps: true,
  },
);
// noteSchema.index({ title: "text", content: "text" });
//готуємо модель
export const Note = mongoose.model('Note', noteSchema);
// 'Note' - назва моделі
