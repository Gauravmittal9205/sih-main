import mongoose from 'mongoose';
const AlertSchema=new mongoose.Schema({
  farm:{type:mongoose.Schema.Types.ObjectId,ref:'Farm'},
  message:String,
  severity:{type:String,enum:['low','medium','high']},
  date:{type:Date,default:Date.now}
});
export default mongoose.model('Alert',AlertSchema);
