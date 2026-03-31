import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";
import { TAGS } from "../constants/tags.js";

//validation for pagination parametrs:
//GET /notes
export const getAllNotesSchema = {
  //query для ?page=1&perPage=10
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(3).max(50).default(10),
    tag: Joi.string().valid(...TAGS).optional(),
    search: Joi.string().trim().allow(''),
  }),
};

//GET /notes/:noteId

// кастомний валідатор:
//isValidObjectId(someId)
// Якщо ok > true
// якщо не ок > false

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom((value, helpers) => {
      //якщо id не валідний повернути результат виклику helpers.message("Bad id")
      //якщо валідний то повернути value (value це noteID який ми валідуємо)
      return isValidObjectId(value)
        ? value
        : helpers.message("Bad id format");
    }).required(),
  }),
};


//POST/notes
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(''),
    tag: Joi.string()
      .valid(...TAGS)
    .optional(),
  })
};

//PUTCH/notes/:noteId
export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom((value, helpers) => {
      //якщо id не валідний повернути результат виклику helpers.message("Bad id")
      //якщо валідний то повернути value (value це noteID який ми валідуємо)
      return isValidObjectId(value)
        ? value
        : helpers.message("Bad id format");
    }).required(),
  }),
};
//або [SEgments.PARAMS] : ...noteIdSchema, розпиляємо обʼєкт
