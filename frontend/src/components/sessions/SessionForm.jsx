import { useEffect, useState } from "react";
import { ChevronDown } from 'lucide-react';

const sessionTypes = [
    "Project",
    "Work",
    "Tutorial",
    "Interview Prep",
    "DSA",
    "Research",
    "System Design",
];

const getDateValue = (value) => {
    if (!value) return "";

    const date = new Date(value); // value returned from API might be in string format so we normalize it into Date object 

    if (Number.isNaN(date.getTime())) {
        return "";
    }
    return date.toISOString().slice(0, 10); // date is now in YYYY-MM-DD format which the date input accepts
};

export const SessionForm = ({ onClose, onCreate, initialValues, onUpdate }) => {
    const [formValues, setFormValues] = useState({
        title: "",
        date: "",
        durationMinutes: "",
        type: "Project",
        techStack: "",
        notes: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);    
    const isEditing = Boolean(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            ...formValues,
            durationMinutes: parseInt(formValues.durationMinutes, 10),
            techStack: formValues.techStack
                        .split(",")
                        .map(tech => tech.trim())
                        .filter(Boolean) // Remove empty strings
        };

        try {
            setIsSubmitting(true);
        
            let result;
            if (isEditing && onUpdate) {
                result = await onUpdate({
                    ...payload,
                    _id: initialValues._id
                });
            } else if (onCreate) { 
                result = await onCreate(payload);   
            } else {
                result = null;
            }

            if (result) {
                setFormValues({
                    title: "",
                    date: "",
                    durationMinutes: "",
                    type: "Project",
                    techStack: "",
                    notes: "",
                });
                onClose();
            }
        } catch (error) {
            if (isEditing) {
                console.error("Error updating session:", error);
            } else {
                console.error("Error creating session:", error);
            }           
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (initialValues) {
            setFormValues({
                title: initialValues.title || "",
                date: getDateValue(initialValues.date),
                durationMinutes: initialValues.durationMinutes || "",
                type: initialValues.type || "Project",
                techStack: initialValues.techStack.join(", ") || "",
                notes: initialValues.notes || "",
            });
        } else { // Reset form if no initial values
            setFormValues({
                title: "",
                date: "",
                durationMinutes: "",
                type: "Project",
                techStack: "",
                notes: "",
            });
        }
    }, [initialValues]);

    return (
        // Full screen container
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            {/* Dimmed blurred backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Card */}
            <div className="relative w-full max-w-2xl rounded-2xl border border-border/60 bg-card/90 p-6 shadow-xl">
                {/* Headers */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">Create New Session</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Log your session details.
                        </p>
                    </div>
                </div>
                
                {/* Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="flex flex-col gap-2 text-sm font-medium">
                            Title
                            <input 
                                className="rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                type="text"
                                name="title"
                                value={formValues.title}
                                onChange={handleChange}
                                placeholder="API refactor"
                                required
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-medium">
                            Date
                            <input 
                                className="rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                type="date"
                                name="date"
                                value={formValues.date}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="flex flex-col gap-2 text-sm font-medium">
                            Duration (minutes)
                            <input 
                                className="remove-arrow rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                type="number"
                                name="durationMinutes"
                                value={formValues.durationMinutes}
                                onChange={handleChange}
                                placeholder="90"
                                required
                            />
                        </label>

                        <label className="styled-select flex flex-col gap-2 text-sm font-medium">
                            Type
                            <div className="relative">
                                <select
                                    className="w-full rounded-lg border border-border/70 bg-input/60 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    name="type"
                                    value={formValues.type}
                                    onChange={handleChange}
                                    required
                                >
                                    {sessionTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                            </div>
                        </label>
                    </div>

                    <label className="flex flex-col gap-2 text-sm font-medium">
                        Tech Stack 
                        <input 
                            className="rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            type="text"
                            name="techStack"
                            value={formValues.techStack}
                            onChange={handleChange}
                            placeholder="React, Node.js, PostgreSQL"
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium">
                        Notes
                        <textarea 
                            className="min-h-[120px] rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            type="text"
                            name="notes"
                            value={formValues.notes}
                            onChange={handleChange}
                            placeholder="What did you learn? Challenges faced? Outcomes?"
                            maxLength={1000}
                        />
                    </label>

                    <div className="flex flex-wrap gap-3 justify-end mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-border/70 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            {isEditing ? "Save Session" : "Create Session"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
