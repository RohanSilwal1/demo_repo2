const express=require('express');
const app=express();


let users=[];
const jwt=require('jsonwebtoken');
JWT_SECRECT="helloilovekiara"


app.use(express.json());
app.post("/signup",function(req,res)
{
  const username=req.body.username;
  const password=req.body.password;

  users.push({username,password,});
  res.send({message:"signup sucessfully ",});
});


app.post("/signin",function(req,res)
{

  const username=req.body.username;
  const password=req.body.password;

  const user=users.find((user) => user.username === username && user.password === password);

  if(user){
    const token=jwt.sign({username:username},JWT_SECRECT);

    res.send({token,});
    console.log(users);
  }

  else{
    res.status(403).send({message:"invalid username or password"})
  }
})
  
function auth(req,res,next)
{
  const token=req.headers.token;
   const decodedInformation=jwt.verify(token,JWT_SECRECT);

   if(decodedInformation.username){
    req.username=decodedInformation.username
    next();

   }
   else{
    res.json({message:"you are not logedin"})
   }
}

app.get("/me",auth,function(req,res)
{
  let foundUser=null;
  for(let i=0;i<users.length;i++)
  {
    if(users[i].username===req.username)
    {
      foundUser=users[i]
    }
  }
  if(foundUser)
  {
    res.json({
      username:foundUser.username,
      password:foundUser.password
    })
  }
  else{
    res.json("message:invalid token")
  }
})
app.listen(3000)
