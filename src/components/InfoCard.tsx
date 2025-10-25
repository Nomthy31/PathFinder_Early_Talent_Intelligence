import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: ReactNode;
}

export const InfoCard = ({ title, description, icon: Icon, children }: InfoCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-card-hover transition-shadow duration-300 border-border">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
