import { ColumnModel } from "*/models/column.model";
import { BoardModel } from "*/models/board.model";
import { CardModel } from "*/models/card.model";
const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data);
    newColumn.cards = [];

    const getNewColumn = await ColumnModel.findOneById(
      newColumn.insertedId.toString()
    );

    //update columnOrder Array in board collsection
    await BoardModel.pushColumnOrder(
      getNewColumn.boardId.toString(),
      getNewColumn._id.toString()
      //  vaan chay nhung thong  bao loi ben postman
      // newColumn.boardId,
      // newColumn._id
    );
    return getNewColumn;
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };
    if (updateData._id) delete updateData._id;
    if (updateData.cards) delete updateData.cards;
    const updatedColumn = await ColumnModel.update(id, updateData);
    if (updatedColumn._destroy) {
      //delete many card in this column
      CardModel.deleteMany(updatedColumn.cardOrder);
    }
    return updatedColumn;
  } catch (error) {
    throw new Error(error);
  }
};
export const ColumnSerVice = { createNew, update };
