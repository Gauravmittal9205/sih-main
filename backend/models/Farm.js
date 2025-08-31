import mongoose from 'mongoose';
const FarmSchema=new mongoose.Schema({
  name:String,
  location:String,
  type:{type:String,enum:['poultry','pig']},
  size:Number,
  sensors:[{name:String,value:String}],
  owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true});
export default mongoose.model('Farm',FarmSchema);
