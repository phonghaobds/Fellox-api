import { HttpStatusCode } from "*/utilities/constants";
import { BoardSerVice } from "*/services/board.service";

const createNew = async (req, res) => {
  try {
    const result = await BoardSerVice.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};
const getFullBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BoardSerVice.getFullBoard(id);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};
export const BoardController = { createNew, getFullBoard };
