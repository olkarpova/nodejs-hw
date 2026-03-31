import { Note } from "../models/note.js";
import createHttpError from "http-errors";

//get/notes?page=1&perPage=10&tag=Todo&search=hello - query parametres
export const getAllNotes = async (req, res) => {

  const { page = 1, perPage = 10, tag, search} = req.query;

  console.log(req.query);

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();
  //щоб не було дублювання коду,
  // без await, бо
  //з await автоматично виконується запит, а без - передає посилання на себе
  if (tag) {
    notesQuery.where('tag').equals(tag);
  }

  // текстовий пошук через точне співпадіння:
  if (search) {
    notesQuery.where({$text: {$search: search}});
  }

// пошук через regex повільний і не використовує індекси:
  // if (search) {
  //   notesQuery.where({
  //     $or: [ // без or search має бути і в title і в content
  //       {title: { $regex: search, $options: "i" }},
  //       {content: {$regex: search, $options: "i"}},
  //     ],
  //   });
  // }

  // querю оригінальну запустити можна лише 1 раз - проблема тому clone
  // clone клонує всі налаштування
  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);
  // const notes = await Note.find();
  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  console.log(req.body);
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);//повертаємо видалений обʼєкт
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId },
    req.body,
    { returnDocument: "after" }, // повертаємо оновлений документ
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

