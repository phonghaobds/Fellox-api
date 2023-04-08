import express from "express";
import { HttpStatusCode } from "*/utilities/constants";
import { boardRoutes } from "./board.route";
import { columnRoutes } from "./column.route";
import { cardRoutes } from "./card.route";
const router = express.Router();

/*
  Get v1/Status
*/
router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({
    status: "OK!",
  })
);

/** Board Apis*/
router.use("/boards", boardRoutes);
/** Column Apis*/
router.use("/columns", columnRoutes);
/** card Apis*/
router.use("/cards", cardRoutes);
export const apiV1 = router;
