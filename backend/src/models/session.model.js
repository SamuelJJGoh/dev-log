import {Schema} from "mongoose";
import { sessionDB } from "../config/database.js";

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
            min: 1,
        },
        type: {            
            type: String,
            required: true,
            enum: [
                "Project",
                "Work",
                "Tutorial", 
                "Interview Prep",
                "DSA", 
                "Research", 
                "System Design"
            ]
        },
        techStack: {        // ["React", "Node.js", "MongoDB"]
            type: [{type: String, trim: true, required: true}],
            validate: {
                validator: v => Array.isArray(v) && v.length > 0,
                message: "techStack must have at least one item"
            }
        }, 
        notes: {            // "Lessons learned", "Challenges", "Outcomes"
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

export const Session = sessionDB.model("Session", sessionSchema);