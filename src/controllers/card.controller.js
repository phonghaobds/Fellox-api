import { HttpStatusCode } from "*/utilities/constants";
import { CardSerVice } from "*/services/card.service";

const createNew = async (req, res) => {
  try {
    const result = await CardSerVice.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};
export const CardController = { createNew };
