import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";
//Define card collection
const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(), //also objectiD when crete new
  columnId: Joi.string().required(), //also objectiD when crete new
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};
const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: new ObjectId(id) });
    // console.log(result.ops[0]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const createNew = async (data) => {
  try {
    const validateValue = await validateSchema(data);
    const insertValue = {
      ...validateValue,
      boardId: new ObjectId(validateValue.boardId),
      columnId: new ObjectId(validateValue.columnId),
    };
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);
    // console.log(result.ops[0]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardModel = { cardCollectionName, createNew, findOneById };
