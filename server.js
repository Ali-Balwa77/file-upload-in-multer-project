var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer')

var app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

var upload = multer({dest:'/uploads'})
   
app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  var upfile = req.file
  if(upfile === 'undefinde'){
    res.json({mesaage: 'file not uploaded'})
  }else{
    return res.json({
      name: upfile.originalname,
      type: upfile.mimetype,
      size: upfile.size
    })
  }
})

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});