import { CardModel } from "*/models/card.model";
import { ColumnModel } from "../models/column.model";
const createNew = async (data) => {
  try {
    const newcard = await CardModel.createNew(data);
    const getNewCard = await CardModel.findOneById(
      newcard.insertedId.toString()
    );
    await ColumnModel.pushCardOrder(
      getNewCard.columnId.toString(),
      getNewCard._id.toString()
    );
    console.log(getNewCard);
    return getNewCard;
  } catch (error) {
    throw new Error(error);
  }
};
export const CardSerVice = { createNew };
