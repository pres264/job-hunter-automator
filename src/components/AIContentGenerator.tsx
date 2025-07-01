
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Bot, Wand2, Download, Edit, RefreshCw, CheckCircle } from "lucide-react";

const AIContentGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Mock job for demonstration
  const mockJob = {
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    requirements: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    description: "We're looking for a Senior React Developer to join our growing team. You'll work on cutting-edge web applications using modern technologies..."
  };

  const [cvContent, setCvContent] = useState(`John Doe
Senior Software Engineer

EXPERIENCE
• 5+ years of React development experience
• Built scalable web applications serving 100k+ users
• Expert in TypeScript, JavaScript, and modern frontend frameworks
• Experience with Node.js backend development
• Cloud deployment experience with AWS

SKILLS
React, TypeScript, JavaScript, Node.js, GraphQL, PostgreSQL, AWS, Docker`);

  const [coverLetter, setCoverLetter] = useState(`Dear Hiring Manager,

I am excited to apply for the Senior React Developer position at TechCorp Inc. With over 5 years of experience in React development and a strong background in TypeScript and Node.js, I am confident I would be a valuable addition to your team.

In my current role, I have built scalable web applications that serve over 100,000 users, utilizing modern technologies including React, TypeScript, and GraphQL. My experience with AWS cloud services aligns perfectly with your technical requirements.

I am particularly drawn to TechCorp Inc. because of your commitment to innovation and cutting-edge technology. I would welcome the opportunity to contribute to your growing team and help build the next generation of web applications.

Thank you for considering my application. I look forward to discussing how my skills and experience can benefit your team.

Best regards,
John Doe`);

  const generateContent = async (type: 'cv' | 'cover-letter') => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (type === 'cv') {
      setCvContent(cvContent + "\n\n• Updated with job-specific keywords and requirements");
    } else {
      setCoverLetter(coverLetter.replace("TechCorp Inc.", mockJob.company));
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            AI Content Generation
          </CardTitle>
          <CardDescription>
            Automatically generate and customize CVs and cover letters for each job application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job Context */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Job Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">{mockJob.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">{mockJob.company}</p>
                  <p className="text-sm text-slate-700 mb-4">{mockJob.description}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-slate-700 mb-2">Key Requirements:</h5>
                  <div className="flex flex-wrap gap-2">
                    {mockJob.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium text-slate-700 mb-2">AI Analysis:</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Match</span>
                      <span className="font-semibold text-green-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Skill Overlap</span>
                      <span className="font-semibold text-blue-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Generation */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="cv" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cv" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    CV Generation
                  </TabsTrigger>
                  <TabsTrigger value="cover-letter" className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Cover Letter
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cv" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Tailored CV</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => generateContent('cv')}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Wand2 className="w-4 h-4 mr-2" />
                            )}
                            {isGenerating ? 'Generating...' : 'AI Enhance'}
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Download className="w-4 h-4 mr-2" />
                            Export PDF
                          </Button>
                        </div>
                      </div>
                      {isGenerating && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Analyzing job requirements...</span>
                            <span>67%</span>
                          </div>
                          <Progress value={67} className="h-1" />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={cvContent}
                        onChange={(e) => setCvContent(e.target.value)}
                        className="min-h-96 font-mono text-sm"
                        placeholder="Your CV content will appear here..."
                      />
                      
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>5 keywords optimized</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>ATS-friendly format</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Job-matched highlights</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="cover-letter" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Personalized Cover Letter</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => generateContent('cover-letter')}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Wand2 className="w-4 h-4 mr-2" />
                            )}
                            {isGenerating ? 'Generating...' : 'AI Generate'}
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Download className="w-4 h-4 mr-2" />
                            Export PDF
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="min-h-96 text-sm"
                        placeholder="Your personalized cover letter will appear here..."
                      />
                      
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Company research included</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Role-specific examples</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Professional tone optimized</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentGenerator;
