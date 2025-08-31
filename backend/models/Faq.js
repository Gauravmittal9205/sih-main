import mongoose from 'mongoose';
const FaqSchema=new mongoose.Schema({
  question:String,
  answer:String
});
export default mongoose.model('Faq',FaqSchema);
