import { reportModel } from '~/model/report.model';
const cron = require('node-cron');

// Cron job, tạo báo cáo vào đầu mỗi tháng
// * * * * * 
// | | | | |
// | | | | +----> Day of week (0 - 6) (Sunday = 0 or 7)
// | | | +------> Month (1 - 12)
// | | +--------> Day of month (1 - 31 || 0 là ngày cuối tháng trước) 
// | +----------> Hour (0 - 23)
// +------------> Minute (0 - 59)
cron.schedule('0 0 1 * *', async () => {
  try {
    const newData = new reportModel({
      name: (new Date().getMonth()).toString() + '/' + (new Date().getFullYear()).toString(),
      startDate: new Date(),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // Ngày cuối tháng
      printEachBuilding: { 'H1': 0, 'H2': 0, 'H3': 0, 'H6': 0 }, // Khởi tạo dữ liệu cho các tòa nhà
      pageEachType: { 'A1': 0, 'A2': 0, 'A3': 0, 'A4': 0 }, // Khởi tạo số trang in cho mỗi loại tài liệu
      numberPrinterDamage: 0,
      numberPrintError: 0
    });
    await newData.save();
    console.log(`Tạo dữ liệu đầu tháng thành công ${newData}`);
  } catch (error) {
    console.error('Lỗi khi tạo dữ liệu đầu tháng:', error);
  }
});

//tạo báo cáo hàng năm và tổng hợp báo cáo
cron.schedule('0 0 1 1 *', async () => {
  try {
    // Tính toán ngày đầu và ngày cuối năm
    const startYear = new Date(new Date().getFullYear() - 1, 0, 1, 0 + 7, 0, 0); // Đầu năm, - +7 là múi h ở VN
    const endYear = new Date(new Date().getFullYear() - 1, 11, 31, 23 + 7, 59, 59); // Cuối năm, 23:59:59

    const newData = new reportModel({
      name: (new Date().getFullYear() - 1).toString(),
      startDate: startYear,
      endDate: endYear,
      printEachBuilding: { 'H1': 0, 'H2': 0, 'H3': 0, 'H6': 0 }, // Khởi tạo dữ liệu cho các tòa nhà
      pageEachType: { 'A1': 0, 'A2': 0, 'A3': 0, 'A4': 0 }, // Khởi tạo số trang in cho mỗi loại tài liệu
      numberPrinterDamage: 0,
      numberPrintError: 0
    });
    await newData.save();

    // Tìm tất cả các báo cáo hàng tháng trong năm
    const reports = await reportModel.find({
      name: { $regex: newData.name, $options: "i" }
    }).lean(); //report là một Plain JavaScript Object, view, read, ko sài method document như save

    // Cộng dồn dữ liệu từ các báo cáo hàng tháng
    const updates = reports.map(report => {
      return reportModel.updateOne(
        { _id: newData._id }, // Tìm theo _id của báo cáo
        {
          $inc: {
            'numberPrintError': report.numberPrintError,
            'numberPrinterDamage': report.numberPrinterDamage,
            'printEachBuilding.H1': report.printEachBuilding['H1'],
            'printEachBuilding.H2': report.printEachBuilding['H2'],
            'printEachBuilding.H3': report.printEachBuilding['H3'],
            'printEachBuilding.H6': report.printEachBuilding['H6'],
            'pageEachType.A1': report.pageEachType['A1'],
            'pageEachType.A2': report.pageEachType['A2'],
            'pageEachType.A3': report.pageEachType['A3'],
            'pageEachType.A4': report.pageEachType['A4']
          }
        }
      );
    });
    await Promise.all(updates);

    console.log(`Tạo báo cáo tong hợp năm ${newData.name} thành công`);
    return res.status(200).json(reports);
  } catch (err) {
    return res.status(500).json(err);
  }
});


const updateReport = async (reqObject) => {
  const reqObj = {
    printEachBuilding: {
      H1: reqObject.printEachBuilding?.H1 ?? 0,
      H2: reqObject.printEachBuilding?.H2 ?? 0,
      H3: reqObject.printEachBuilding?.H3 ?? 0,
      H6: reqObject.printEachBuilding?.H6 ?? 0
    },
    pageEachType: {
      A1: reqObject.pageEachType?.A1 ?? 0,
      A2: reqObject.pageEachType?.A2 ?? 0,
      A3: reqObject.pageEachType?.A3 ?? 0,
      A4: reqObject.pageEachType?.A4 ?? 0
    },
    numberPrinterDamage: reqObject.numberPrinterDamage ?? 0,
    numberPrintError: reqObject.numberPrintError ?? 0
  };
  //todo chỉ được cập nhật báo cáo hiện tại
  const nameReport = (new Date().getMonth() + 1).toString() + '/' + (new Date().getFullYear()).toString();
  console.log("nameReport----", nameReport)
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
  return reports
}

export const reportService = {
  updateReport
}