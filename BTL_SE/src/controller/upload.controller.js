import fs from 'fs';
import { PDFDocument } from 'pdf-lib'
import path from 'path';
import mime from 'mime-types'
import AdmZ from "adm-zip"


let encode_image;
function extractFilesToArray(zipFilePath) {
  const zip = new AdmZ(zipFilePath);
  const zipEntries = zip.getEntries();
  const filesArray = [];

  zipEntries.forEach((entry) => {
    if (!entry.isDirectory) {
      const fileData = {
        fieldname: entry.entryName,                    // Tên file trong ZIP
        originalname: path.basename(entry.entryName),  // Tên file gốc
        mimetype: mime.lookup(entry.entryName) || 'application/octet-stream', // Loại MIME
        size: entry.header.size,                       // Kích thước file thực
        buffer: entry.getData()                        // Dữ liệu file dưới dạng Buffer
      };
      filesArray.push(fileData);
    }
  });

  return filesArray;
}
const postfile = async (req, res, next) => {
  try {

    console.log("file::", req.file)
    // Read the file from the request
    // const fileZip = new AdmZ(req.file.path)
    // const zipEntries = fileZip.getEntries();
    const extractedFiles = extractFilesToArray(req.file.path);
    extractedFiles.forEach(async (zipEntry) => {
      // console.log("zipEntry::", zipEntry)
      const isPdf = zipEntry.mimetype === 'application/pdf';
      if (isPdf) {
        const loadPdf = PDFDocument.load(zipEntry.buffer);
        //the PDFDocument above, is the pdf-lib imported
        const pdf = await loadPdf;
        const pagesCount = pdf.getPageCount(); // in ra số trang của file đó.
        console.log("pagesCount::", pagesCount)
      }
    })
    const img = fs.readFileSync(req.file.path);

    // Encode the image to base64
    encode_image = img.toString('base64');

    // Define a JSON object for the image attributes to save to the database
    const finalImg = {
      contentType: req.file.mimetype,
      image: Buffer.from(encode_image, 'base64') // 'new Buffer()' is deprecated, so use Buffer.from()
    };

    console.log("finalImg::", finalImg);
    // You can now save `finalImg` to your database or perform other operations
    res.status(200).json(finalImg)

  } catch (error) {
    console.error("Error while processing the image:", error);
    next(error); // Pass the error to the next middleware
  }
};
const getfile = async (req, res, next) => {

  const imgBuffer = Buffer.from(encode_image, 'base64');

  res.send(imgBuffer)
}
export const uploadController = {
  postfile,
  getfile
};
