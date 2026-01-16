import { Video, FileText, BookOpen, Code2, GraduationCap, ScrollText, SquarePen, Trash2, ExternalLink } from 'lucide-react';

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

export const ResourceList = ({ resources = [], loading = false, onDelete, onEdit, filteredResources = [] }) => {
    return (
        <div className="mt-4">
            {loading ? (
                <div>Loading resources...</div>
            ) : resources.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map((resource) => {
                        const key=resource._id;
                        const Icon = categoryIcons[resource.category];
                        return (
                            <div
                                key={key}
                                className="resource-card group animate-fade-up"
                            >
                                 <div className="flex items-start justify-between gap-3">
                                    <div className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-accent/90 border-accent/30 bg-accent/5"}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            className="icon-button hover:text-accent hover:bg-accent/10"
                                            onClick={() => onEdit && onEdit(resource)}
                                        >
                                            <SquarePen className="h-5 w-5" />
                                        </button>
                                        <button 
                                            className="icon-button hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => onDelete && onDelete(resource)}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {Array.isArray(resource.topics) && resource.topics.length > 0
                                                ? resource.topics.map((topic) => {
                                                    return (
                                                        <span 
                                                            key={topic} 
                                                            className={"tech-chip text-primary/90 border-primary/30 bg-primary/5"}
                                                        >
                                                            {topic}
                                                        </span>
                                                    );
                                                })
                                                : "—"
                                        }
                                        <span className={`status-badge border ${statusStyles[resource.status]}`}>
                                        {resource.status}
                                        </span>
                                    </div>

                                    <h3 className="mt-3 font-mono text-base font-semibold leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                                        {resource.title}
                                    </h3>

                                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                        {resource.notes}
                                    </p>
                                </div>

                                {resource.url && (
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                                    >
                                        Open Resource
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="glass-card p-12 text-center">
                    <h3 className="font-mono text-lg font-semibold">No resources found</h3>
                    <p className="mt-2 text-muted-foreground">
                        Try adding a new learning resource to get started!
                    </p>
                </div>
            )}
        </div>
    );
};