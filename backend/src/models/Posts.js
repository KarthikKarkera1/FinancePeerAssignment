var mongoose=require("mongoose");

var PostSchema=new mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    title: {
        type:String,
        required: true,
    },
    body: {
        type:String,
        required: true
    }
},{ timestamps: true });
module.exports=mongoose.model("Post", PostSchema);