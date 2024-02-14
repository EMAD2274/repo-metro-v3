

export function validation (Schema){
  return (req,res,next)=>{
    let {error} = Schema.validate(req.body,{abortEarly:false})
    if(!error){
        next();
    }else{
        res.json({message:"error",error:error.details})
    }
  }


}