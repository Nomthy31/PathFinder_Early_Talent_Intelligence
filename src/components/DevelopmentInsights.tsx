import { Brain, Heart, Users, Lightbulb } from "lucide-react";
import { InfoCard } from "./InfoCard";

export const DevelopmentInsights = () => {
  const insights = [
    {
      icon: Brain,
      title: "Cognitive Development",
      facts: [
        "Children learn best through active engagement and hands-on experiences",
        "Piaget's stages show concrete operational thinking develops around age 7-11",
        "Executive functions like planning and self-control develop throughout childhood",
      ],
    },
    {
      icon: Heart,
      title: "Emotional Development",
      facts: [
        "Emotional regulation skills are crucial for academic success",
        "Creating a safe, supportive environment enhances learning",
        "Children need consistent routines to feel secure and ready to learn",
      ],
    },
    {
      icon: Users,
      title: "Social Development",
      facts: [
        "Cooperative learning builds both social skills and academic understanding",
        "Peer interactions are vital for developing empathy and communication",
        "Ubuntu philosophy emphasizes collective learning and community support",
      ],
    },
    {
      icon: Lightbulb,
      title: "South African Context",
      facts: [
        "Multilingual classrooms require code-switching strategies and mother-tongue support",
        "Culturally responsive teaching acknowledges diverse backgrounds and experiences",
        "Understanding socioeconomic challenges helps create equitable learning opportunities",
      ],
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 mb-8">
      {insights.map((insight) => (
        <InfoCard
          key={insight.title}
          title={insight.title}
          icon={insight.icon}
        >
          <ul className="space-y-3">
            {insight.facts.map((fact, index) => (
              <li key={index} className="flex gap-2 text-sm text-foreground/80">
                <span className="text-accent font-bold">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </InfoCard>
      ))}
    </div>
  );
};
