import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "*/config/mongodb";

//Define column collection
const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(), //also objectiD when crete new
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: new ObjectId(id) });
    // console.log(result.ops[0]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 *
 * @param {string} columnId
 * @param {string} cardId
 */
const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(columnId) },
        { $push: { cardOrder: cardId } },
        { returnDocument: "after" }
      )
      .then((result) => {
        console.log(result);
      });
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
    };
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertValue);
    // console.log(result.ops[0]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (id, data) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: "after" }
      );
    // console.log(result.ops[0]);
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnModel = {
  columnCollectionName,
  findOneById,
  pushCardOrder,
  createNew,
  update,
};
