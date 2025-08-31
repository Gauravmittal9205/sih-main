import Faq from '../models/Faq.js';
export const getFaqs=async(req,res)=>{try{const faqs=await Faq.find();res.json(faqs);}catch(err){res.status(500).json({error:err.message});}};
