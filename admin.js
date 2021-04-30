var mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb://localhost/bs', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

// 创建数据库组织结构Schema
var Schema = mongoose.Schema

// 创建管理员数据信息结构
let adminSchma = new Schema({
  loginName: {
    required: true,
    type: String,
    default: "admin"
  },
  loginPassword: {
    required: true,
    type: String,
    default: 'admin'
  },
  // 身份id
  roleId: {
    type: Number,
    default: 1
  }
})

// var admin = mongoose.model('Admin' , adminSchma)
// let admin1 = new admin({
//   loginName : 'admin',
//   loginPassword :'admin'
// })
// admin1.save(function(err,ret){
//     if(err){
//         console.log('error');
//     }else{
//         console.log('保存成功');
//     }
// })

// 向外暴露出该管理员数据关系结构
module.exports = mongoose.model('Admin', adminSchma)