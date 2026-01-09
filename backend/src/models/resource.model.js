import {Schema} from "mongoose";
import { resourceDB } from "../config/database.js";

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
            enum: [
                "Video",
                "Article",
                "Documentation",
                "Repo / Code Sample",
                "Course",
                "Cheat Sheet"
            ]
        },
        topic: {            // "React", "DSA"
            type: String,
            required: true,
            trim: true
        },
        status: {          
            type: String,
            required: true,
            enum: [
                "To watch",
                "In progress",
                "Completed"
            ],
            default: "To watch"
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

export const Resource = resourceDB.model("Resource", resourceSchema);