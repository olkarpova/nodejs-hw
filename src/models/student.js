import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const studentSchema =  new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
//готуємо модель
export const Student = mongoose.model('Student', studentSchema);
// 'Student' - назва моделі
