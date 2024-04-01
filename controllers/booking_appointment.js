const user = require('../models/user');



exports.postAddUser = async (req, res, next) => {
  try{
    console.log(req.body);
const name=req.body.name;
const email=req.body.email;
const phonenumber=req.body.phonenumber;

const data=await user.create({name:name,email:email,phonenumber:phonenumber});
console.log(data);
res.status(201).json({newUserDetail:data});
} catch(err){
    res.status(500).json({
        error:err
    })
}

};

exports.getusers=async(req,res,next)=>{

  try{
  const users=await user.findAll();
  res.status(200).json({allusers:users});
  }catch(error){
      console.log('Get user is failing', JSON.stringify(error))
      res.status(500).json({
          error:error
      }) 
  }
}


exports.deleteUser=async(req,res)=>{
  try{
  if(req.params.id=='undefined'){
      console.log('id is missing')
      return res.status(400).json({err:'id is missing'})
  }
  const uid=req.params.id;
  await user.destroy({where:{id:uid}});
  res.sendStatus(200);
} catch(err){
  console.log(err);
  res.status(500).json(err)
}
}



