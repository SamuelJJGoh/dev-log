export const WeeklyActivity = ({ weeklyData}) => {
    const d = new Date()
    const today = weeklyData[d.getDay()]

    return (
        <div className="glass-card p-6">
            <div>
                <h3 className="font-mono text-lg font-semibold">Weekly Activity</h3>
                <p className="text-sm text-muted-foreground mt-1">Hours coded per day</p>
            </div>

            <div className="flex items-end gap-3 h-24">
                {weeklyData.map((data) => {
                    const isToday = data.day === today["day"]

                    return (
                        <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">
                                {data.hours.toFixed(2).replace(/[.,]00$/, "")}h
                            </span>
                            <div
                                className={`w-full rounded-lg min-h-2 
                                            ${isToday ? "bg-primary glow-primary" : "bg-secondary"}`
                                            }
                            />
                            <span className={`text-xs font-medium ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                                {data.day}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}