import { ChevronDown } from 'lucide-react';
import { useState } from 'react';   
const categoryTypes = [
    "Video",
    "Article",
    "Documentation",
    "Repo / Code Sample",
    "Course",
    "Cheat Sheet"
];

const statusTypes = [ 
    "To watch",
    "In progress",
    "Completed"
];

export const ResourceForm = ({ onClose }) => {
    const [formValues, setFormValues] = useState({
        title: '',
        category: "Video",
        topics: '',
        status: "To watch",
        notes: '',
        url: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);  
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-2xl rounded-2xl border border-border/60 bg-card/90 p-6 shadow-xl">
               <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">Create New Resource</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Log your resource details.
                        </p>
                    </div>
                </div>
                
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="flex flex-col gap-2 text-sm font-medium">
                            Title
                            <input 
                                className="rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                                type="text"
                                name="title"
                                value={formValues.title}
                                onChange={handleChange}
                                placeholder="MongoDB Aggregation Basics"
                                required
                            />
                        </label>

                        <label className="styled-select flex flex-col gap-2 text-sm font-medium">
                            Category
                            <div className="relative">
                                <select
                                    className="w-full rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                                    name="category"
                                    value={formValues.category}
                                    onChange={handleChange}
                                    required
                                >
                                    {categoryTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
                            </div>
                        </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="flex flex-col gap-2 text-sm font-medium">
                            Topics
                            <input 
                                className="rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                                type="text"
                                name="topics"
                                value={formValues.topics}
                                onChange={handleChange}
                                placeholder="MongoDB"
                                required
                            />
                        </label>
                        
                        <label className="styled-select flex flex-col gap-2 text-sm font-medium">
                            Status
                            <div className="relative">
                                <select
                                    className="w-full rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                                    name="status"
                                    value={formValues.status}
                                    onChange={handleChange}
                                    required
                                >
                                    {statusTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
                            </div>
                        </label>
                    </div>
                    
                    <div>
                        <label className='flex flex-col gap-2 text-sm font-medium'>
                            URL
                            <input 
                                className="rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                                type="url"
                                name="url"
                                value={formValues.url}
                                onChange={handleChange}
                                placeholder="https://www.youtube.com"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="flex flex-col gap-2 text-sm font-medium">
                            Notes
                            <textarea
                                className="min-h-[150px] rounded-lg border border-border/70 bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                                type="text"
                                name="notes"
                                value={formValues.notes}
                                onChange={handleChange}
                                placeholder="Add notes about the resource, such as a short description and why it's useful."
                                required
                            />
                        </label>
                    </div>
                </form>
                
                <div className="flex flex-wrap mt-2 justify-end gap-3">
                    <button 
                        type="button"
                        className="rounded-lg border border-border/70 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
                        disabled={isSubmitting}
                        >
                        Create Resource
                    </button>
                </div>
            </div>

        
        </div>
    );
} 