import mongoose, {Schema} from "mongoose"

const resourceSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        url: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        topic: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            trim: true,
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

export const Resource = mongoose.model("Resource", resourceSchema)