const express=require("express");
const multer = require("multer");
const app=express();
// const multer=require("multer");
//The disk storage engine gives you full control on storing files to disk.
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads");//err dest
    },
    filename:function (req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
});
const upload=multer({storage});

app.use(express.urlencoded({extended:true}));
//setting view engine
app.set("view engine","ejs");
app.set("views","./myviews");

//this code will not allow us to display image
// const upload=multer({dest:"uploads/"});//multer middleware

app.get("/",(req,res)=>{
    res.render("upload");
})
// app.post("/upload",upload.single("userimage"),(req,res)=>{
//     console.log(req.body);
//     console.log(req.file);
//     res.redirect("/");
// })
// app.post("/upload",upload.fields([{name:"userimage"},{name:"resume"}]),(req,res)=>{
app.post("/upload",upload.array('userimage',5),(req,res)=>{
    // console.log(req.body);
    console.log(req.files);
    res.redirect("/");
})
app.listen(3000,(err)=>{
    if(!err)
    {
        console.log("running on port 3000")
;    }
})