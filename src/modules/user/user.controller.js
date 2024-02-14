import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../email/sendEmail.js";
import { handleError } from "../../middleware/handleAsyncError.js";
import { AppError } from "../../utils/AppError.js";
// import Joi from "joi";
import { signUpSchema,loginSchema } from "./user.vaildator.js";
import { emailTemplate } from "../../email/emailTemplate.js";
// import {string} from "Joi"
import pkg from 'bcrypt'
import { nanoid } from 'nanoid'
import { generateToken, verifyTokenN } from "../../utils/tokenFunctions.js";







export const signUp = handleError(async (req, res, next) => {
  let { firstName,lastName,userName, email, password,ssn } = req.body;
  
  
  let existUser = await userModel.findOne({ email });
  if (existUser) return next(new AppError(`email already exist`, 409));
  let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS));
  let addedUser = await userModel.insertMany({ firstName,lastName,userName, email, password: hashedPassword,ssn });
  let verifyToken = jwt.sign({ id: addedUser[0]._id }, process.env.VERIFY_SECRET);
  sendEmail({ email, api: `http://localhost:3000/api/v1/user/verfiy/${verifyToken}` });
  res.json({ message: "Success", addedUser });
});






export const logIn = handleError(async (req, res,next) => {
    let { email, password } = req.body;
    
    
    let existUser = await userModel.findOne({ email });
    if (existUser) {
      if (existUser.verified) {
        let matched = bcrypt.compareSync(password, existUser.password);
        if (matched) {
          let token = jwt.sign({ id: existUser._id }, process.env.SECRET_KEY);
          res.json({ message: "welcome", token });
        } else {
          // res.json({ message: "wrong password" });
          next(new AppError(`wrong password` ,400));
        }
      } else {
         next(new AppError(`please verify ur email first`, 401));
      }
    } else {
        next(new AppError(`u have to register first`, 400));
    
    }




})

export const verifyEmail = (req, res) => {
  let { token } = req.params;
  jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
    if (err) return res.json({ message: "err", err });
    console.log(decoded);
    let updatedUser = await userModel.findByIdAndUpdate(decoded.id, { verified: true }, { new: true });
    res.json({message:"Success", })
  });
};




export const forgetPassword = handleError( async (req,res,next)=> {
  const {email}= req.body
  const user = await userModel.findOne({email})
  if(!user){
    return next(new AppError(`invalid email`,400))
  }
  const code = nanoid()
  const hashedCode = pkg.hashSync(code,+process.env.SALTROUNDS)
  // const token = generateToken({
  //   payload:{
  //     email,
  //     sentCode : hashedCode
  //   },
  //   signature : process.env.resetToken,
  //   expiresIn: '1h',
  // })
  // const resetPasswordLink = `${req.protocol}://${req.headers.host}/api/v1/user/reset${token}`
  let verifyToken = jwt.sign({ id: email[0]._id }, process.env.VERIFY_SECRET);
  const isEmailSent = sendEmail({ email, api: `http://localhost:3000/api/v1/user/reset/${verifyToken}` });
  if(!isEmailSent){
    return next(new AppError(`fail to sent reset password email `, 400))
  }
  const userUpdates = await userModel.findOneAndUpdate(
    {email},
    {
      forgetCode : hashedCode,
    },
    {
      new: true
    },
  )
  res.status(200).json({message:'done',userUpdates})

})

export const resetPassword = handleError(async (req, res, next) => {
  const { verifyToken } = req.params
  const decoded = verifyTokenN({ verifyToken  })
  const user = await userModel.findOne({
    email: decoded.email,
    forgetCode: decoded.forgetCode,
  })
  if (!user) {
    return next(
      new AppError('your already reset your password once before , try to login', {
        cause: 400,
      }),
    )
  }

  const { newPassword } = req.body
  user.password = newPassword
  user.forgetCode = null

  const resetedPassData = await userModel.findOneAndUpdate()
  res.status(200).json({ message: 'Done', resetedPassData })
})
//reset have problem on line 



// try catch


// then ... catch















