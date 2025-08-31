+++import mongoose from 'mongoose';
const FeedbackSchema=new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  message:String,
  date:{type:Date,default:Date.now}
});
export default mongoose.model('Feedback',FeedbackSchema);
