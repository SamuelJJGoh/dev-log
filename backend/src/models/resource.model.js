import mongoose, {Schema} from "mongoose"

const resourceSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        category: {         // "Video", "Article", "Documentation"
            type: String,
            required: true,
            trim: true
        },
        topic: {            // "React", "DSA"
            type: String,
            required: true,
            trim: true
        },
        status: {           // "To watch", "In progress", "Completed"
            type: String,
            required: true,
            trim: true,
        },
        notes: {            // "url link to resource", "why the resource is useful"
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