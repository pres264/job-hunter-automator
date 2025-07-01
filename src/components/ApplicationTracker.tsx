
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Send, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  TrendingUp,
  Search,
  Filter
} from "lucide-react";

const ApplicationTracker = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock application data with different statuses
  const applications = [
    {
      id: 1,
      job: {
        title: "Senior React Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA"
      },
      status: "interview-scheduled",
      appliedDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      nextAction: "Technical Interview",
      nextActionDate: "2024-01-22",
      notes: "HR called to schedule technical interview. Seems very interested.",
      timeline: [
        { date: "2024-01-15", event: "Application Submitted", type: "submitted" },
        { date: "2024-01-16", event: "Application Viewed", type: "viewed" },
        { date: "2024-01-17", event: "HR Review", type: "review" },
        { date: "2024-01-18", event: "Interview Scheduled", type: "interview" }
      ]
    },
    {
      id: 2,
      job: {
        title: "Frontend Engineer",
        company: "StartupXYZ",
        location: "Remote"
      },
      status: "response-received",
      appliedDate: "2024-01-12",
      lastUpdate: "2024-01-19",
      nextAction: "Follow up call",
      nextActionDate: "2024-01-21",
      notes: "Positive response from hiring manager. Moving to next round.",
      timeline: [
        { date: "2024-01-12", event: "Application Submitted", type: "submitted" },
        { date: "2024-01-14", event: "Automated Confirmation", type: "confirmed" },
        { date: "2024-01-19", event: "Positive Response", type: "response" }
      ]
    },
    {
      id: 3,
      job: {
        title: "Full Stack Developer",
        company: "Digital Solutions",
        location: "New York, NY"
      },
      status: "applied",
      appliedDate: "2024-01-14",
      lastUpdate: "2024-01-14",
      nextAction: "Wait for response",
      nextActionDate: "2024-01-21",
      notes: "Application submitted successfully via company portal.",
      timeline: [
        { date: "2024-01-14", event: "Application Submitted", type: "submitted" }
      ]
    },
    {
      id: 4,
      job: {
        title: "React Developer",
        company: "WebTech Co",
        location: "Austin, TX"
      },
      status: "rejected",
      appliedDate: "2024-01-10",
      lastUpdate: "2024-01-16",
      nextAction: "None",
      nextActionDate: null,
      notes: "Position filled internally. Encouraging feedback for future roles.",
      timeline: [
        { date: "2024-01-10", event: "Application Submitted", type: "submitted" },
        { date: "2024-01-12", event: "Application Reviewed", type: "review" },
        { date: "2024-01-16", event: "Rejection Email", type: "rejected" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "response-received": return "bg-green-100 text-green-800";
      case "interview-scheduled": return "bg-purple-100 text-purple-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied": return <Send className="w-4 h-4" />;
      case "response-received": return <Mail className="w-4 h-4" />;
      case "interview-scheduled": return <Calendar className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "submitted": return <Send className="w-3 h-3 text-blue-600" />;
      case "viewed": return <CheckCircle className="w-3 h-3 text-green-600" />;
      case "review": return <Clock className="w-3 h-3 text-yellow-600" />;
      case "interview": return <Calendar className="w-3 h-3 text-purple-600" />;
      case "response": return <Mail className="w-3 h-3 text-green-600" />;
      case "rejected": return <XCircle className="w-3 h-3 text-red-600" />;
      default: return <Clock className="w-3 h-3 text-gray-600" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === "applied").length,
    responses: applications.filter(app => app.status === "response-received").length,
    interviews: applications.filter(app => app.status === "interview-scheduled").length,
    rejected: applications.filter(app => app.status === "rejected").length
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Application Tracking & Analytics
          </CardTitle>
          <CardDescription>
            Monitor application status and track your job hunting progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
              <div className="text-sm text-slate-600">Total Applied</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
              <div className="text-sm text-slate-600">Pending</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-600">{stats.responses}</div>
              <div className="text-sm text-slate-600">Responses</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600">{stats.interviews}</div>
              <div className="text-sm text-slate-600">Interviews</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-slate-600">Rejected</div>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="response-received">Response Received</SelectItem>
                <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">Application List</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredApplications.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-slate-800">{app.job.title}</h3>
                          <Badge className={getStatusColor(app.status)}>
                            {getStatusIcon(app.status)}
                            <span className="ml-2">{app.status.replace('-', ' ')}</span>
                          </Badge>
                        </div>
                        <div className="text-slate-600 mb-3">
                          <span className="font-medium">{app.job.company}</span>
                          <span className="mx-2">•</span>
                          <span>{app.job.location}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Applied:</span>
                            <span className="ml-2 font-medium">{app.appliedDate}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Last Update:</span>
                            <span className="ml-2 font-medium">{app.lastUpdate}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Next Action:</span>
                            <span className="ml-2 font-medium">{app.nextAction}</span>
                          </div>
                        </div>
                        
                        {app.notes && (
                          <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                            <p className="text-sm text-slate-700">{app.notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-6">
                        <Button size="sm" variant="outline">
                          <Mail className="w-4 h-4 mr-2" />
                          Follow Up
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="timeline">
              <div className="space-y-6">
                {filteredApplications.map((app) => (
                  <Card key={app.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{app.job.title} - {app.job.company}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {app.timeline.map((event, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full">
                              {getTimelineIcon(event.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-slate-800">{event.event}</span>
                                <span className="text-sm text-slate-500">{event.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Success Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Response Rate</span>
                      <span className="font-bold text-green-600">50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Interview Rate</span>
                      <span className="font-bold text-purple-600">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Response Time</span>
                      <span className="font-bold text-blue-600">3.2 days</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>This Week</span>
                        <span className="font-semibold">2 applications</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>This Month</span>
                        <span className="font-semibold">{applications.length} applications</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average per week</span>
                        <span className="font-semibold">1.2 applications</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationTracker;
