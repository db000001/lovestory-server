import express from "express";

import { requireUserAuth } from "../middleware/authMiddleware.js";
import { getMiscellaneous, upsertMiscellaneous } from "../controllers/miscellaneous.controller.js";

const miscellaneousRouter = express.Router();

miscellaneousRouter.use(requireUserAuth);

// Route to create or update a Miscellaneous entry  
miscellaneousRouter.post('/', upsertMiscellaneous); // We can still use POST for both create or update  

// Route to get the Miscellaneous entry  
miscellaneousRouter.get('/', getMiscellaneous);

export default miscellaneousRouter;
