import mongoose from "mongoose"

const messageSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:["ai","user"],
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const websiteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        default:"Untitled website"

    },
    latestCode:{
    type:String,
    required:true
    },
    conversation:[
        messageSchema
    ],
    deployed:{
        type:Boolean,
        default:false
    },
    deployurl:{
        type:String,
    },
    slug:{
        type:String,
        unique:true
    }
},{timestamps:true})

websiteSchema.pre('save', async function() {  
  if (!this.slug) {
    let baseSlug = this.title.toLowerCase().trim()
      .replace(/[^a-z0-9\\s-]/g, '')
      .replace(/\\s+/g, '-')
      .replace(/-+/g, '-');
    
    if (!baseSlug || baseSlug === 'untitled-website') {
      baseSlug = 'website';
    }
    
   
    let attempt = 0;
    while (attempt < 10) {
      const randomSuffix = Math.random().toString(36).slice(-6);
      this.slug = baseSlug + '-' + randomSuffix;
      
      const count = await this.constructor.countDocuments({ slug: this.slug });
      if (count === 0) {
        break;
      }
      attempt++;
    }
    
    if (attempt >= 10) {
      this.slug = 'website-' + Date.now().toString(36);
    }
  }
});

const Website =mongoose.model("Website",websiteSchema)
export default Website;
