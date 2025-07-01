
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  MapPin, 
  DollarSign, 
  FileText,
  Send,
  Edit,
  AlertCircle
} from "lucide-react";

const ReviewInterface = () => {
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const [currentReview, setCurrentReview] = useState(0);

  // Mock applications ready for review
  const pendingApplications = [
    {
      id: 1,
      job: {
        title: "Senior React Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        salary: "$120k - $160k",
        aiScore: 92
      },
      generatedAt: "2 hours ago",
      status: "ready",
      cv: "Tailored CV highlighting React, TypeScript, and GraphQL experience...",
      coverLetter: "Dear Hiring Manager, I am excited to apply for the Senior React Developer position...",
      aiConfidence: 94,
      estimatedTime: "5 min"
    },
    {
      id: 2,
      job: {
        title: "Frontend Engineer",
        company: "StartupXYZ",
        location: "Remote",
        salary: "$100k - $140k",
        aiScore: 88
      },
      generatedAt: "1 hour ago",
      status: "ready",
      cv: "Customized CV emphasizing frontend expertise and remote work experience...",
      coverLetter: "Dear StartupXYZ Team, Your Frontend Engineer position caught my attention...",
      aiConfidence: 91,
      estimatedTime: "4 min"
    },
    {
      id: 3,
      job: {
        title: "Full Stack Developer",
        company: "Digital Solutions",
        location: "New York, NY",
        salary: "$90k - $130k",
        aiScore: 76
      },
      generatedAt: "3 hours ago",
      status: "needs-attention",
      cv: "Full stack CV with Python and React experience highlighted...",
      coverLetter: "Dear Digital Solutions, I am writing to express my interest...",
      aiConfidence: 78,
      estimatedTime: "7 min"
    }
  ];

  const toggleSelection = (id: number) => {
    setSelectedApplications(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    );
  };

  const handleBatchAction = (action: 'approve' | 'reject') => {
    console.log(`${action} applications:`, selectedApplications);
    setSelectedApplications([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-800";
      case "needs-attention": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-orange-600" />
            Human Review Queue
          </CardTitle>
          <CardDescription>
            Review and approve AI-generated applications before submission
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">
                {pendingApplications.length} applications pending review
              </span>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Est. 16 min total
              </Badge>
            </div>
            
            {selectedApplications.length > 0 && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBatchAction('reject')}
                  className="text-red-600 hover:text-red-700"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject ({selectedApplications.length})
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleBatchAction('approve')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve ({selectedApplications.length})
                </Button>
              </div>
            )}
          </div>

          <Tabs defaultValue="queue" className="space-y-4">
            <TabsList>
              <TabsTrigger value="queue">Review Queue</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Review</TabsTrigger>
            </TabsList>

            <TabsContent value="queue" className="space-y-4">
              {pendingApplications.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={selectedApplications.includes(app.id)}
                        onCheckedChange={() => toggleSelection(app.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-slate-800">
                              {app.job.title}
                            </h3>
                            <Badge className={getStatusColor(app.status)}>
                              {app.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">AI Confidence:</span>
                            <span className={`font-semibold ${getConfidenceColor(app.aiConfidence)}`}>
                              {app.aiConfidence}%
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span className="font-medium">{app.job.company}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {app.job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {app.job.salary}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>Job Match: {app.job.aiScore}%</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Clock className="w-3 h-3" />
                              <span>Review time: {app.estimatedTime}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Generated CV
                            </h4>
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {app.cv}
                            </p>
                          </div>
                          
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <Edit className="w-4 h-4" />
                              Cover Letter
                            </h4>
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {app.coverLetter}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Generated {app.generatedAt}
                          </span>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setCurrentReview(app.id)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Detailed Review
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Send className="w-4 h-4 mr-2" />
                              Approve & Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="detailed">
              {pendingApplications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Detailed Review: {pendingApplications[0].job.title}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Application
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700" size="sm">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve & Send
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Tailored CV Preview
                          </h4>
                          <div className="bg-slate-50 p-4 rounded-lg min-h-64 text-sm">
                            {pendingApplications[0].cv}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Cover Letter Preview
                          </h4>
                          <div className="bg-slate-50 p-4 rounded-lg min-h-64 text-sm">
                            {pendingApplications[0].coverLetter}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-blue-900 mb-1">AI Recommendations</h5>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Strong match for React and TypeScript requirements</li>
                            <li>• Consider emphasizing GraphQL experience more prominently</li>
                            <li>• Cover letter tone matches company culture well</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewInterface;
