const defaultPagerouter = require("express").Router();

import { defaultPageController } from "~/controller/defaultPage.controller";


import { authentication, checkRoleAdmin } from "~/utils/authUtils";
defaultPagerouter.use(authentication)
defaultPagerouter.use(checkRoleAdmin)
defaultPagerouter.get('/', defaultPageController.getAll);

defaultPagerouter.post('/', defaultPageController.update);
// defaultPagerouter.patch('/', defaultPageController.updatBody);
//curl -X PUT http://localhost:3000/dfpage -H "Content-Type: application/json" -d "{\"defaultPage\": 50, \"startDateHK1\": \"2024-08-01T00:00:00.000Z\", \"startDateHK2\": \"2025-01-01T00:00:00.000Z\", \"limitNumberPages\": 500, \"priceA4\": 500}"    

export default defaultPagerouter;