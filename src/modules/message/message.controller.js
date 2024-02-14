// import { messageModel } from "../../../db/models/message.model.js";
// import { userModel } from "../../../db/models/user.model.js";
// import { handleError } from "../../middleware/handleAsyncError.js";

// const addMessage =handleError(async (req, res) => {
//     let { messageText, receivedId } = req.body;
//     let existUser = await userModel.findById(receivedId);
//     if(!existUser) return res.json({message:"user noy found"})
//    let addedMessage =  await messageModel.insertMany({ messageText,receivedId });
//     res.json({ message: "Success", addedMessage });
// })

// const getMessages =handleError( async (req, res) => {

//         let allMessages = await messageModel.find({ receivedId: req.userId });
//          res.json({ message: "Success", allMessages });

// })


// export {
//     addMessage,
// getMessages



// }