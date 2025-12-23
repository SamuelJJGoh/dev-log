import { Resource } from "../models/resource.model.js";

const createResource = async (req, res) => {
    try {
        const { title, category, topic, status, notes } = req.body

        if (!title || !category || !topic ||!status || !notes) {
            return res.status(400).json({
                message: "One of the required fields is missing!"
            })
        }

        const resource = await Resource.create({
            title,
            category, 
            topic,
            status,
            notes
        })

        res.status(201).json({
            message: "Resource created successfully", resource
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}

const getResources = async (req, res) => {
    try {
        const resources = await Resource.find()

        res.status(200).json(resources)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}

const getResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id)

        if (!resource) return res.status(404).json({
            message: "Resource not found"
        })

        res.status(200).json(resource)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}

const updateResource = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0){
            return res.status(400).json({
                message: "No data provided for update"
            })
        }

        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if (!resource) return res.status(404).json({
            message: "Resource not found"
        })

        res.status(200).json({
            message: "Resource updated successfully", resource
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}

const deleteResource = async (req, res) => {
    try {
        const deleted = await Resource.findByIdAndDelete(req.params.id) 

        if (!deleted) return res.status(404).json({
            message: "Resource not found"
        })

        res.status(200).json({
            message: "Resource deleted successfully"
        })
    } catch (error) {
       res.status(500).json({
            message: "Internal server error", error
        }) 
    }
}

export {
    createResource, 
    getResources,
    getResource, 
    updateResource,
    deleteResource
}