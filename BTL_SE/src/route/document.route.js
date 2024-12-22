import express from 'express'
import { documentController } from '../controller/document.controller.js'
import { handlerError } from '~/utils/handlerError.js'
import { uploadMiddleware } from '../middleware/upload.middleware.js'
import { authentication, checkRoleAdmin } from '~/utils/authUtils.js'
import { documentValidation } from '~/validation/document.validation.js'

const documentRouter = express.Router(handlerError(documentController.get))

documentRouter.use(authentication)
documentRouter.post('/generateOtpForUser', handlerError(documentController.generateOTPForUser));
documentRouter.post('/create', (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.message
      })
    }
    return documentController.createDocument(req, res, next)
  })
});
documentRouter.get('/getDocumentOfUser', handlerError(documentController.getDocumentOfUser));
documentRouter.get('/', checkRoleAdmin, handlerError(documentController.getAllDocuments));
documentRouter.get('/:documentId', handlerError(documentController.getDocumentById));
// documentRouter.get('/user', handlerError(documentController.getUserDocuments))
documentRouter.patch('/:documentId',
  handlerError(documentController.updateDocument)
);
documentRouter.delete('/:documentId',
  handlerError(documentController.deleteDocument)
);
documentRouter.post('/:documentId/cancel', handlerError(documentController.cancelPrintJob));
documentRouter.get('/queue', handlerError(documentController.getPrintQueue));
documentRouter.post('/estimate-cost', handlerError(documentController.estimateCost));
// documentRouter.get('/:documentId/preview', handlerError(documentController.previewDocument)) // bỏ route này


export default documentRouter 