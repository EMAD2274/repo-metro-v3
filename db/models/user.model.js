// import pkg from 'joi';
// import { string } from 'joi';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
   
   firstName:{
      type: String,
      required:true
   },
   lastName :{
      type :String,
      required:true

   },
  userName:{
     type : String,
     minLength:[3,"name is too short"],
     required: true,
     unique: true
  },
  email:{
     type: String,
     required:true,
     unique:true,
     lowercase: true

  },
  password:{
     type: String,
     required:true,
   //   minLength:[8,"password too short"],
   //   maxlength:[50,"password too long"]
  },
//   phone:{
//      type:String,
//      required:true
//   },
  ssn:{
     type:String,
     required:true,
     unique:true
  },
  verified:{
     type:Boolean,
     default:false
  },
  forgetCode:{
   type:String
  }
  
  

},
{timestamps:true});


export const userModel = model("User", userSchema)