import { userController } from '~/controller/user.controller';
import { handlerError } from '~/utils/handlerError.js';
import { authentication, checkRoleAdmin } from '~/utils/authUtils';
import { userValidation } from '~/validation/user.validation';
import express from 'express'
import { consumerRabbiMQ, subcribeFailedNOtification } from '~/utils/helper';
const userRouter = express.Router();


consumerRabbiMQ().catch(error => console.error(error))
subcribeFailedNOtification().catch(error => console.error(error))


userRouter.post('/verify_otp', handlerError(userValidation.verify_otp), handlerError(userController.verifyOtpSignUp))
userRouter.post('/login', handlerError(userValidation.login), handlerError(userController.login));
userRouter.post('/updateData', handlerError(userValidation.updateData), handlerError(userController.updateData)); // khi doi mat khau generate ra otp
userRouter.post('/update', handlerError(userValidation.update), handlerError(userController.update)); // này là verify otp khi mà gửi 

// ở đây sau khi mà login có thể để một api là get user by id chạy sau authentication là được
userRouter.post('/test1', (req, res, next) => {

  res.cookie("access_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(1)
  });
  res.cookie("refresh_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(1)
  });
  res.status(200).send({
    access_token: req.cookies["access_token"],
    refresh_token: req.cookies["refresh_token"]
  })
});
userRouter.use(authentication)
userRouter.post('/logout', handlerError(userController.logOut));
userRouter.get('/getUser', handlerError(userController.getUser));
userRouter.get('/getStudentInfo', handlerError(userController.getInfoStudent));
// router.delete('/:filename', fileController.deleteFile);
userRouter.use(checkRoleAdmin)
userRouter.post('/signUp', handlerError(userValidation.register), handlerError(userController.signUp));

export default userRouter