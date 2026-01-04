function formatDate(dateString) {
    if (!dateString) {
        return "—";
    }

    const date = new Date(dateString);
    const time = date.getTime();
    if (isNaN(time)) {
        return "—";
    }

    const formattedDate = date.toLocaleDateString();
    return formattedDate;
}

function formatDuration(minutes) {  
    if (typeof minutes !== "number" || minutes < 0) {
        return "—";
    }
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    let result = "";
    if (hrs > 0) {
        result += `${hrs} hr`;
    }
    if (mins > 0) {
        result += `${mins} min`;
    }
    return result.trim() || "0 min";
}
export const SessionList = ({ sessions = [], loading = false }) => {
    const safeSessions = Array.isArray(sessions) ? sessions : [];
    return (
        <div className="max-w-7xl mx-auto">

            <p className="text-muted-foreground font-sans">{`Showing ${safeSessions.length} of ${safeSessions.length} sessions`}</p>
            
            <div className="mt-3">
                {loading ? (
                    <div>Loading sessions...</div>
                ) : safeSessions.length > 0 ? (
                    <ul>
                        {safeSessions.map((session) => {
                            const key = session._id;
                            const techStack = Array.isArray(session.techStack)
                                ? session.techStack.join(", ")
                                : "—";
                            return (
                                <li key={key}>
                                    <div>
                                        {session.type}
                                        {formatDate(session.date)}
                                        {formatDuration(session.durationMinutes)}
                                        {session.title}
                                        {session.notes}
                                        {techStack}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div>
                        No sessions found.
                    </div>
                )}
            </div>
        </div>
    );
}
