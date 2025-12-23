import mongoose, {Schema} from "mongoose";

const sessionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        durationMinutes: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
            trim: true
        },
        techStack: {
            type: [{type: String, trim: true, required: true}],
            validate: {
                validator: v => Array.isArray && v.length > 0,
                message: "techStack must have at least one item"
            }
        }, 
        notes: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 1000
        }
    }, 

    {
        timestamps: true
    }
)  

export const Session = mongoose.model("Session", sessionSchema)