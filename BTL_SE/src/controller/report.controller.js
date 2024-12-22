import { reportModel } from "~/model/report.model";

const reportController = {
  filter: async (req, res) => {
    try {
      const { month, year, ...reqObj } = req.body;
      //ktra input
      if (year < 2024 || month < 1 || month > 12)
        return res.status(400).json(req.body);

      const result = await reportModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $or: [
                    { $eq: [year, undefined] }, // Nếu `year` không được cung cấp
                    { $eq: [{ $year: "$startDate" }, year] } // Nếu có `year`, kiểm tra
                  ]
                },
                {
                  $or: [
                    { $eq: [month, undefined] }, // Nếu `month` không được cung cấp
                    { $eq: [{ $month: "$startDate" }, month] } // Nếu có `month`, kiểm tra
                  ]
                }
              ]
            }
          }
        }
      ]);

      console.log(result);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const reqObj = await reportModel.find();
      return res.status(200).json(reqObj);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  update: async (req, res) => {
    try {
      const { _id, startDate, endDate, ...reqObject } = req.body;
      const reqObj = {
        printEachBuilding:
          { H1: reqObject.printEachBuilding['H1'] || 0, H2: reqObject.printEachBuilding['H2'] || 0, H3: reqObject.printEachBuilding['H3'] || 0, H6: reqObject.printEachBuilding['H6'] || 0 },
        pageEachType: { A1: reqObject.pageEachType['A1'] || 0, A2: reqObject.pageEachType['A2'] || 0, A3: reqObject.pageEachType['A3'] || 0, A4: reqObject.pageEachType['A4'] || 0 },
        numberPrinterDamage: reqObject.numberPrinterDamage || 0,
        numberPrintError: reqObject.numberPrintError || 0
      }
      //todo chỉ được cập nhật báo cáo hiện tại
      const nameReport = (new Date().getMonth()).toString() + '/' + (new Date().getFullYear()).toString();
      const reports = await reportModel.findOneAndUpdate(
        { name: nameReport },
        {
          $inc: {
            numberPrintError: reqObj.numberPrintError,
            numberPrinterDamage: reqObj.numberPrinterDamage,
            "printEachBuilding.H1": reqObj.printEachBuilding['H1'],
            "printEachBuilding.H2": reqObj.printEachBuilding['H2'],
            "printEachBuilding.H3": reqObj.printEachBuilding['H3'],
            "printEachBuilding.H6": reqObj.printEachBuilding['H6'],
            "pageEachType.A1": reqObj.pageEachType['A1'],
            "pageEachType.A2": reqObj.pageEachType['A2'],
            "pageEachType.A3": reqObj.pageEachType['A3'],
            "pageEachType.A4": reqObj.pageEachType['A4']
          }
        },
        { new: true } // Trả về tài liệu sau khi cập nhật       
      );

      // Kiểm tra xem báo cáo có tồn tại không
      if (!reports) {
        return res.status(404).json({ message: "No reports found for the current month." });
      }

      return res.status(200).json(reports);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  //not delete report
  //create report automatic by cron has been executed above
};

export default reportController


