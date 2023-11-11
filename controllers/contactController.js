const AsyncHandler = require("express-async-handler");
const User = require('../models/userModel')
const sendEmail = require('../utility/sendMail')


const  contactUs = AsyncHandler(async(req,res) =>{
    const {subject, message} =req.body
    const user = await User.findById(req.user._id)

    if(!user){
res.status(400)
throw new Error('User not found, please login') 
    }

    //validate
    if (!subject || !message){
        res.status(400)
throw new Error('please add subject and message') 
    }
    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = user.email;
    try {
      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500);
      throw new Error("Email not sent, please try again");
    }
}
)

module.exports ={
    contactUs
}