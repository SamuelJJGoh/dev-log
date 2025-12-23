import { Session } from "../models/session.model.js";

// Create a session
const createSession = async (req, res) => {
    try {
        const { title, date, durationMinutes, type, techStack, notes} = req.body

        if (!title || !date || !durationMinutes || !type || !notes){
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        if (!Array.isArray(techStack) || techStack.length === 0) {
            return res.status(400).json({
                message: "techStack must have at least one item"
            })
        }

        const session = await Session.create({
            title,
            date,
            durationMinutes,
            type,
            techStack,
            notes
        });

        res.status(201).json({
            message: "Session created successfully", session
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}

// Get all sessions
const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find();

        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}

// Get session by id
const getSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        
        if (!session) return res.status(404).json({
            message: "Session not found"
        })

        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}
// Update a session
const updateSession = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const session = await Session.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        if (!session) return res.status(404).json({
            message: "Session not found"
        })

        res.status(200).json({
            message: "Session updated successfully", session
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}

// Delete a session
const deleteSession = async (req, res) => {
    try {
        const deleted = await Session.findByIdAndDelete(req.params.id)

        if (!deleted) return res.status(404).json({
            message: "Session not found"
        })

        res.status(200).json({
            message: "Session deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}


export {
    createSession,
    getSessions,
    getSession,
    updateSession,
    deleteSession
}