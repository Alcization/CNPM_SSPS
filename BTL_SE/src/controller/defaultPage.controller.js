import { defaultPageModel } from "~/model/defaultPage.model";
import { defaultPageService } from "~/service/defaultPage.service";
export const defaultPageController = {
  getAll: async (req, res) => {
    try {
      const reqObj = await defaultPageModel.find();
      return res.status(200).json(reqObj);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      // const { _id, ...reqObj } = req.body;
      // await defaultPageModel.findOneAndUpdate({ _id: process.env.ID_DEFAULT_PAGE }, req.body, { new: true });
      const result = await defaultPageService.createDefaultPage(req.body)
      //dùng 1 lần khởi tạo only 1 record ban đầu
      // await reqObj.save();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updatBody: async (req, res) => {
    try {
      // const { _id, ...reqObj } = req.body;
      // await defaultPageModel.findOneAndUpdate({ _id: process.env.ID_DEFAULT_PAGE }, req.body, { new: true });
      const result = await defaultPageService.updateBody(req.body)
      //dùng 1 lần khởi tạo only 1 record ban đầu
      // await reqObj.save();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};

