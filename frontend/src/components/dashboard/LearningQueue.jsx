import { Video, FileText, BookOpen, Code2, GraduationCap, ScrollText, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from "react-router-dom";

const categoryIcons = {
    "Video": Video,
    "Article": FileText,
    "Documentation": BookOpen,
    "Repo / Code Sample": Code2,
    "Course": GraduationCap,
    "Cheat Sheet": ScrollText
}
const statusStyles = {
  "To watch": "bg-status-toWatch/10 text-status-toWatch border-status-toWatch/30",
  "In progress": "bg-status-inProgress/10 text-status-inProgress border-status-inProgress/30",
  "Completed": "bg-status-completed/10 text-status-completed border-status-completed/30",
};

export const LearningQueue = ({ loading, resources }) => {

    if (loading) {
        return <div className="glass-card p-6">Loading resources to review... </div>
    }
    return (
        <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-mono text-lg font-semibold">Learning Queue</h3>
                    <p className="text-sm text-muted-foreground mt-1">Resources to review</p>
                </div>
                <Link 
                    to="/resources" 
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                    <span className="flex items-center gap-2">
                        View all <ArrowRight className="h-4 w-4"/>
                    </span>
                </Link>
            </div>
            
            <div className="space-y-3">
                {resources.map((resource) => {
                    const key=resource._id;
                    const Icon = categoryIcons[resource.category];
                    
                    return (
                        <div 
                            key={key} 
                            className="group flex items-center gap-4 p-3 rounded-lg bg-secondary/50"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-accent/90 border-accent/30 bg-accent/5 ">
                                <Icon className="h-5 w-5" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">
                                    {resource.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {Array.isArray(resource.topics) ? resource.topics.join(", ") : ""}
                                </p>
                            </div>
                            
                            <span className={`status-badge border ${statusStyles[resource.status]}`}>
                                {resource.status}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}