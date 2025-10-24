import { Eye, Ear, Hand, BookOpen } from "lucide-react";
import { InfoCard } from "./InfoCard";
import { Badge } from "@/components/ui/badge";

export const LearningStyles = () => {
  const styles = [
    {
      icon: Eye,
      title: "Visual Learners",
      description: "Learn best through seeing",
      strategies: [
        "Use diagrams, charts, and mind maps",
        "Color-code information",
        "Provide written instructions",
        "Show videos and demonstrations",
      ],
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Ear,
      title: "Auditory Learners",
      description: "Learn best through listening",
      strategies: [
        "Encourage group discussions",
        "Use storytelling and verbal explanations",
        "Allow students to read aloud",
        "Incorporate music and rhymes",
      ],
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: Hand,
      title: "Kinesthetic Learners",
      description: "Learn best through doing",
      strategies: [
        "Hands-on activities and experiments",
        "Movement breaks during lessons",
        "Role-playing and simulations",
        "Use of manipulatives and tools",
      ],
      color: "bg-accent/10 text-accent",
    },
    {
      icon: BookOpen,
      title: "Reading/Writing Learners",
      description: "Learn best through words",
      strategies: [
        "Note-taking and summarizing",
        "Written assignments and essays",
        "Reading textbooks and articles",
        "Lists, definitions, and handouts",
      ],
      color: "bg-muted-foreground/10 text-muted-foreground",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {styles.map((style, index) => (
        <InfoCard
          key={style.title}
          title={style.title}
          description={style.description}
          icon={style.icon}
        >
          <div className="space-y-2">
            {style.strategies.map((strategy, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className={`${style.color} block text-left py-2 px-3 font-normal`}
              >
                {strategy}
              </Badge>
            ))}
          </div>
        </InfoCard>
      ))}
    </div>
  );
};
