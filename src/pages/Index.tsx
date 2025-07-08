import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  Bot, 
  Eye, 
  Send, 
  CheckCircle, 
  Clock, 
  Target,
  TrendingUp,
  FileText,
  User,
  Settings,
  MessageCircle
} from "lucide-react";
import JobQueue from "@/components/JobQueue";
import AIContentGenerator from "@/components/AIContentGenerator";
import ReviewInterface from "@/components/ReviewInterface";
import ApplicationTracker from "@/components/ApplicationTracker";
import ProfileSettings from "@/components/ProfileSettings";
import WhatsAppBot from "@/components/WhatsAppBot";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock data for dashboard stats
  const stats = {
    jobsFound: 247,
    aiMatched: 89,
    pendingReview: 23,
    applied: 45,
    responses: 12,
    interviews: 3
  };

  const pipelineSteps = [
    { name: "Job Discovery", count: stats.jobsFound, icon: Briefcase, color: "bg-blue-500" },
    { name: "AI Matching", count: stats.aiMatched, icon: Bot, color: "bg-purple-500" },
    { name: "Human Review", count: stats.pendingReview, icon: Eye, color: "bg-orange-500" },
    { name: "Applications", count: stats.applied, icon: Send, color: "bg-green-500" },
    { name: "Responses", count: stats.responses, icon: CheckCircle, color: "bg-emerald-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            AI Job Hunter Agent
          </h1>
          <p className="text-lg text-slate-600">
            Your intelligent job application automation system
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Bot
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Queue
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              AI Content
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Review
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Tracking
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Pipeline Overview */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Job Application Pipeline
                </CardTitle>
                <CardDescription>
                  Real-time overview of your job hunting process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  {pipelineSteps.map((step, index) => (
                    <div key={step.name} className="text-center">
                      <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-700 mb-1">{step.name}</h3>
                      <div className="text-2xl font-bold text-slate-800">{step.count}</div>
                      {index < pipelineSteps.length - 1 && (
                        <div className="hidden md:block absolute transform translate-x-20 -translate-y-8">
                          <div className="w-8 h-0.5 bg-slate-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Pipeline Efficiency</span>
                    <span className="font-semibold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Jobs Today</p>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Success Rate</p>
                      <p className="text-3xl font-bold">26.7%</p>
                    </div>
                    <Target className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">AI Confidence</p>
                      <p className="text-3xl font-bold">94%</p>
                    </div>
                    <Bot className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your job hunting agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "2 mins ago", action: "Applied to Senior React Developer at TechCorp", status: "success" },
                    { time: "15 mins ago", action: "Generated cover letter for Product Manager role", status: "info" },
                    { time: "1 hour ago", action: "Found 12 new job matches", status: "info" },
                    { time: "3 hours ago", action: "Received response from StartupXYZ", status: "success" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                      <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp">
            <WhatsAppBot />
          </TabsContent>

          <TabsContent value="jobs">
            <JobQueue />
          </TabsContent>

          <TabsContent value="content">
            <AIContentGenerator />
          </TabsContent>

          <TabsContent value="review">
            <ReviewInterface />
          </TabsContent>

          <TabsContent value="tracking">
            <ApplicationTracker />
          </TabsContent>

          <TabsContent value="settings">
            <ProfileSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
