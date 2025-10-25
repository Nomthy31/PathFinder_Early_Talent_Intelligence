import { Briefcase, Heart, Stethoscope, Code, Gavel, FlaskConical, Camera, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CareerPaths = () => {
  const careers = [
    {
      icon: Stethoscope,
      title: "Healthcare & Medicine",
      description: "Doctors, nurses, pharmacists, therapists",
      skills: ["Science", "Empathy", "Problem-solving"],
      subjects: ["Life Sciences", "Physical Sciences", "Mathematics"],
    },
    {
      icon: Code,
      title: "Technology & Engineering",
      description: "Software developers, engineers, data scientists",
      skills: ["Analytical thinking", "Creativity", "Logic"],
      subjects: ["Mathematics", "Physical Sciences", "IT"],
    },
    {
      icon: Briefcase,
      title: "Business & Finance",
      description: "Accountants, entrepreneurs, economists",
      skills: ["Numeracy", "Communication", "Leadership"],
      subjects: ["Mathematics", "Accounting", "Economics"],
    },
    {
      icon: Heart,
      title: "Education & Social Work",
      description: "Teachers, counselors, social workers",
      skills: ["Patience", "Empathy", "Communication"],
      subjects: ["Languages", "Life Orientation", "Psychology"],
    },
    {
      icon: Gavel,
      title: "Law & Justice",
      description: "Lawyers, judges, legal advisors",
      skills: ["Critical thinking", "Writing", "Debate"],
      subjects: ["Languages", "History", "Life Orientation"],
    },
    {
      icon: FlaskConical,
      title: "Research & Science",
      description: "Scientists, researchers, lab technicians",
      skills: ["Curiosity", "Precision", "Analysis"],
      subjects: ["Life Sciences", "Physical Sciences", "Mathematics"],
    },
    {
      icon: Camera,
      title: "Creative Arts & Media",
      description: "Artists, designers, journalists, filmmakers",
      skills: ["Creativity", "Expression", "Innovation"],
      subjects: ["Visual Arts", "Languages", "Drama"],
    },
    {
      icon: Wrench,
      title: "Trades & Technical Skills",
      description: "Electricians, plumbers, mechanics, builders",
      skills: ["Practical skills", "Problem-solving", "Attention to detail"],
      subjects: ["Mathematics", "Physical Sciences", "Technical subjects"],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Career Path Guidance</h2>
        <p className="text-muted-foreground">
          Help students explore diverse career opportunities aligned with South African needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {careers.map((career, index) => (
          <Card 
            key={career.title}
            className="shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <CardHeader>
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <career.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{career.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">{career.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Key Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {career.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Relevant Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {career.subjects.map((subject) => (
                    <Badge key={subject} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
