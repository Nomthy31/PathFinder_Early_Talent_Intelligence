import { GraduationCap } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <header className="bg-gradient-hero text-primary-foreground py-8 px-6 rounded-xl shadow-card mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="h-10 w-10" />
          <h1 className="text-4xl font-bold">Teacher's Dashboard</h1>
        </div>
        <p className="text-lg opacity-90">
          Resources and insights for effective teaching in South African classrooms
        </p>
      </div>
    </header>
  );
};
