import mongoose from 'mongoose';
const ComplianceSchema=new mongoose.Schema({
  farm:{type:mongoose.Schema.Types.ObjectId,ref:'Farm'},
  check:String,
  status:String,
  date:{type:Date,default:Date.now}
});
export default mongoose.model('Compliance',ComplianceSchema);
