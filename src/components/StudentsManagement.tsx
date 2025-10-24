import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserPlus, User, Briefcase, TrendingUp, Trash2, Edit, GraduationCap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Student {
  id: string;
  name: string;
  grade: string;
  strengths: string[];
  interests: string[];
}

const careerSuggestions: Record<string, string[]> = {
  "visual": ["Software Developer", "Graphic Designer", "Architect", "UI/UX Designer", "Photographer"],
  "auditory": ["Teacher", "Musician", "Lawyer", "Radio Presenter", "Speech Therapist"],
  "kinesthetic": ["Engineer", "Medical Doctor", "Chef", "Physiotherapist", "Athlete"],
  "reading": ["Writer", "Researcher", "Data Analyst", "Journalist", "Librarian"],
};

const grades = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const learningStyles = ["visual", "auditory", "kinesthetic", "reading"];

export default function StudentsManagement() {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Thabo Mthembu",
      grade: "Grade 10",
      strengths: ["visual", "kinesthetic"],
      interests: ["science", "technology"],
    },
    {
      id: "2",
      name: "Naledi Khumalo",
      grade: "Grade 11",
      strengths: ["auditory", "reading"],
      interests: ["languages", "music"],
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", grade: "", strengths: [] as string[], interests: "" });

  const addStudent = () => {
    if (!newStudent.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a student name",
        variant: "destructive",
      });
      return;
    }
    if (!newStudent.grade) {
      toast({
        title: "Grade required",
        description: "Please select a grade",
        variant: "destructive",
      });
      return;
    }
    if (newStudent.strengths.length === 0) {
      toast({
        title: "Learning styles required",
        description: "Please select at least one learning style",
        variant: "destructive",
      });
      return;
    }

    if (isEditMode && selectedStudent) {
      setStudents(students.map(s => 
        s.id === selectedStudent.id 
          ? { 
              ...s, 
              name: newStudent.name.trim(), 
              grade: newStudent.grade,
              strengths: newStudent.strengths,
              interests: newStudent.interests.split(",").map(i => i.trim()).filter(i => i),
            }
          : s
      ));
      toast({
        title: "Student updated",
        description: `${newStudent.name}'s profile has been updated successfully`,
      });
      setIsEditMode(false);
      setSelectedStudent(null);
    } else {
      const student: Student = {
        id: Date.now().toString(),
        name: newStudent.name.trim(),
        grade: newStudent.grade,
        strengths: newStudent.strengths,
        interests: newStudent.interests.split(",").map(i => i.trim()).filter(i => i),
      };
      setStudents([...students, student]);
      toast({
        title: "Student added",
        description: `${newStudent.name} has been added successfully`,
      });
    }
    
    setNewStudent({ name: "", grade: "", strengths: [], interests: "" });
    setIsAddDialogOpen(false);
  };

  const deleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    setStudents(students.filter(s => s.id !== id));
    toast({
      title: "Student removed",
      description: `${student?.name} has been removed from your list`,
    });
    setSelectedStudent(null);
  };

  const editStudent = (student: Student) => {
    setNewStudent({
      name: student.name,
      grade: student.grade,
      strengths: student.strengths,
      interests: student.interests.join(", "),
    });
    setIsEditMode(true);
    setSelectedStudent(student);
    setIsAddDialogOpen(true);
  };

  const getCareerPaths = (strengths: string[]) => {
    const careers = new Set<string>();
    strengths.forEach(strength => {
      const suggestions = careerSuggestions[strength] || [];
      suggestions.forEach(career => careers.add(career));
    });
    return Array.from(careers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">Manage student profiles and career recommendations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            setIsEditMode(false);
            setNewStudent({ name: "", grade: "", strengths: [], interests: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Student" : "Add New Student"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Enter student name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade *</Label>
                <Select value={newStudent.grade} onValueChange={(value) => setNewStudent({ ...newStudent, grade: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Learning Styles * (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {learningStyles.map((style) => (
                    <Button
                      key={style}
                      type="button"
                      variant={newStudent.strengths.includes(style) ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => {
                        setNewStudent({
                          ...newStudent,
                          strengths: newStudent.strengths.includes(style)
                            ? newStudent.strengths.filter(s => s !== style)
                            : [...newStudent.strengths, style]
                        });
                      }}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input
                  id="interests"
                  value={newStudent.interests}
                  onChange={(e) => setNewStudent({ ...newStudent, interests: e.target.value })}
                  placeholder="e.g., science, technology, sports"
                />
              </div>
              <Button onClick={addStudent} className="w-full">
                {isEditMode ? "Update Student" : "Add Student"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {students.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">No students yet</h3>
              <p className="text-muted-foreground">Add your first student to get started</p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-all hover:scale-[1.02] group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => setSelectedStudent(student)}>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>{student.grade}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        editStudent(student);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStudent(student.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="cursor-pointer" onClick={() => setSelectedStudent(student)}>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Learning Styles</p>
                    <div className="flex flex-wrap gap-2">
                      {student.strengths.map((strength) => (
                        <Badge key={strength} variant="secondary">{strength}</Badge>
                      ))}
                    </div>
                  </div>
                  {student.interests.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {student.interests.map((interest) => (
                          <Badge key={interest} variant="outline">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <User className="h-6 w-6" />
                  {selectedStudent.name}
                </DialogTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      editStudent(selectedStudent);
                      setSelectedStudent(null);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteStudent(selectedStudent.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Profile Information
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="font-medium text-sm text-muted-foreground">Grade</span>
                    <p className="text-lg">{selectedStudent.grade}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm text-muted-foreground">Learning Styles</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedStudent.strengths.map((strength) => (
                        <Badge key={strength} variant="secondary" className="text-sm">
                          {strength.charAt(0).toUpperCase() + strength.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {selectedStudent.interests.length > 0 && (
                    <div>
                      <span className="font-medium text-sm text-muted-foreground">Interests</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedStudent.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="text-sm">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Recommended Career Paths
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on {selectedStudent.name}'s learning style preferences
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getCareerPaths(selectedStudent.strengths).map((career) => (
                    <Card key={career} className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{career}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Aligns with learning strengths
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
