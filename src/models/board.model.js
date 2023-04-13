import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";

//Define Board collection
const boardCollectionName = "board";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};
const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
    };
    const updatedBoard = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
      );
    return updatedBoard.value;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
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
const getFullBoard = async (boardId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(boardId),
            _destroy: false,
          },
        },
        // {
        //   $addFields: {
        //     _id: { $toString: "$_id" },
        //   },
        // },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, //collection name
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName, //collection name
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();
    // console.log(result);
    // console.log(result.ops[0]);
    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = { createNew, pushColumnOrder, getFullBoard, update };
