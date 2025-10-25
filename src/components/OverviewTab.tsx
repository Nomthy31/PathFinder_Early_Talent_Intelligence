import { DevelopmentInsights } from "./DevelopmentInsights";

export const OverviewTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Child Development Insights</h2>
        <p className="text-muted-foreground">
          Essential psychological facts about children's learning and development
        </p>
      </div>
      <DevelopmentInsights />
    </div>
  );
};
