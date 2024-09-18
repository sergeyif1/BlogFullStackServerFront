import mongoose from 'mongoose';

const PostModel = new mongoose.Schema({

    title: {
       type: String,
       required: true, 
    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {
        type: Array,
        dafault: [],
    },
    viewsCount: {
        type: Number,
        dafault: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    imageUrl: String,   
}, 
   {
    timestamps: true,
   },
);

export default mongoose.model('Post', PostModel);