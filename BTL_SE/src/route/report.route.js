const reportRouter = require("express").Router();
import reportController from "~/controller/report.controller";
import { authentication, checkRoleAdmin } from '~/utils/authUtils.js';

reportRouter.use(authentication)
reportRouter.use(checkRoleAdmin)
reportRouter.get("/", reportController.getAll);

reportRouter.put("/filter", reportController.filter);
// curl -X PUT http://localhost:3000/report/filter -H "Content-Type: application/json" -d "{\"month\":11,\"year\":2024 }"

reportRouter.put("/", reportController.update);
// curl -X PUT http://localhost:3000/report -H "Content-Type: application/json" -d "{\"printEachBuilding\": { \"H1\": 0, \"H2\": 0, \"H3\": 0, \"H6\": 2 }, \"pageEachType\": { \"A1\": 10, \"A2\": 10, \"A3\": 10, \"A4\": 10}, \"numberPrinterDamage\": 5, \"numberPrintError\": 2}"

export default reportRouter;