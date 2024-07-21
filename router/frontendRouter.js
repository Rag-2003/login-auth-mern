const router = require("express").Router()
 const Emp = require("../models/emp.js")
 const Reg = require("../models/Reg")
 router.get("/home", (req,res)=>{
   res.render("home.ejs")
  })
//  router.get("/about", (req,res)=>{
//     res.send("Hello coders")
//  })

// router.get("/insert" , (req,res)=>{
//    const record = new Emp({
//     name : "salman khan" , 
//     department : "cse",
//     salary : 100, 
    
//   })
  //record.save()
   
   
//})

function handleLogin(req,res,next){
  if(req.session.isAuth){
    next()
  }else{
    res.redirect("/Login")
  }
}

router.get("/insertform",(req,res)=>{
  res.render("form.ejs")
})
   router.post("/insertform", (req,res)=>{
       const {ename, edept,esal,edoj} =  req.body
        const record = new Emp ({name : ename , 
        department : edept,
        salary : esal, 
        doj : edoj,})    //mapping method
        record.save()
        res.redirect("/multiselection")
       
   })

   router.get("/singleselection", async(req,res)=>{
         const record =  await Emp.findOne()         
         //console.log(record)
             //database ka 1st record
          res.render("singleselection.ejs", {record})
   })
   
   router.get("/multiselection", handleLogin, async(req,res)=>{
    const record  = await Emp.find()
      res.render("multiselection.ejs", {record})  ///1plus database more then 1 activity assync promice concept javascript sync  ayegi read chalejyegi  same loop 

   })

   router.get("/Delete/:abc", async(req,res)=>{
    const id  = req.params.abc;    
    await Emp.findByIdAndDelete(id)
    res.redirect("/multiselection")


   })

   router.get("/update/:id", async(req,res)=>{
    const id  = req.params.id;
    const record  = await Emp.findById(id)
    res.render("update.ejs" , {record})
   })

   router.post("/update/:xyz" , async(req,res)=>{
    const id  = req.params.xyz;
    const {ename,edept,esal,edoj} = req.body
     await Emp.findByIdAndUpdate(id, { name : ename  , 
      department : edept ,
      salary : esal, 
      doj : edoj,})    //mapping 
      res.redirect("/multiselection")
   })

   router.get("/register", (req,res) =>{
    res.render("register.ejs")
   })
   
   router.post("/regformrecord" , (req,res)=>{
       const {UserName , Password} =  req.body;
       const record = new Reg({
        userName  : UserName,
        password : Password
       })
       record.save()
   })
   router.get("/Login", (req,res)=>{
    res.render("login.ejs")
   })
   router.post("/Loginrecord", async (req, res) => {
    const { UserName, password } = req.body
    const record = await Reg.findOne({ userName: UserName }); // Ensure 'userName' matches your schema or database field name
    
    if (record!==null) {
        if (record.Password===password) {
          req.session.isAuth = true
            res.redirect("/multiselection")
        } else {
            res.redirect("/Login");
        }
    } else {
        res.redirect("/Login");
    }
});

router.get("/Logout" , (req,res)=>{
  req.session.isAuth = false;
  res.redirect("/Login")
})




module.exports = router