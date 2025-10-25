import { BookOpen, Pencil, Calculator, Globe, Music, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const StudentActivities = () => {
  const activities = [
    { name: "Reading Comprehension", icon: BookOpen, progress: 75, color: "bg-primary" },
    { name: "Creative Writing", icon: Pencil, progress: 60, color: "bg-secondary" },
    { name: "Mathematics", icon: Calculator, progress: 85, color: "bg-accent" },
    { name: "Social Studies", icon: Globe, progress: 70, color: "bg-primary" },
    { name: "Music & Arts", icon: Music, progress: 90, color: "bg-secondary" },
    { name: "Visual Arts", icon: Palette, progress: 80, color: "bg-accent" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Student Activity Overview</h2>
        <p className="text-muted-foreground">
          Track your students' engagement and progress across different subjects
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity, index) => (
          <Card 
            key={activity.name} 
            className="shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${activity.color}/10`}>
                  <activity.icon className={`h-5 w-5 ${activity.color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                  <CardTitle className="text-base">{activity.name}</CardTitle>
                  <CardDescription className="text-xs">Last updated today</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{activity.progress}%</span>
                </div>
                <Progress value={activity.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
