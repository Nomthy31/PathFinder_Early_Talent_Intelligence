import { DashboardHeader } from "@/components/DashboardHeader";
import { OverviewTab } from "@/components/OverviewTab";
import { LearningStyles } from "@/components/LearningStyles";
import StudentsManagement from "@/components/StudentsManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Users, Lightbulb } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <Brain className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2 py-3">
              <Users className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2 py-3">
              <Lightbulb className="h-4 w-4" />
              <span>Learning Styles</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="students">
            <StudentsManagement />
          </TabsContent>

          <TabsContent value="learning">
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Learning Styles Guide</h2>
                <p className="text-muted-foreground">
                  Understand and adapt to different ways students learn best
                </p>
              </div>
              <LearningStyles />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
