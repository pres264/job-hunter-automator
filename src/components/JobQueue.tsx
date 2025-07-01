
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, DollarSign, Clock, Star, Briefcase, Bot } from "lucide-react";

const JobQueue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      type: "Full-time",
      aiScore: 92,
      status: "discovered",
      postedTime: "2 hours ago",
      requirements: ["React", "TypeScript", "Node.js", "GraphQL"],
      description: "We're looking for a Senior React Developer to join our growing team..."
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$100k - $140k",
      type: "Full-time",
      aiScore: 88,
      status: "ai-matched",
      postedTime: "5 hours ago",
      requirements: ["React", "JavaScript", "CSS", "REST APIs"],
      description: "Join our innovative team building the next generation of web applications..."
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Digital Solutions",
      location: "New York, NY",
      salary: "$90k - $130k",
      type: "Full-time",
      aiScore: 76,
      status: "filtered",
      postedTime: "1 day ago",
      requirements: ["React", "Python", "PostgreSQL", "AWS"],
      description: "Seeking a versatile Full Stack Developer to work on exciting projects..."
    },
    {
      id: 4,
      title: "Product Manager",
      company: "InnovateCo",
      location: "Austin, TX",
      salary: "$110k - $150k",
      type: "Full-time",
      aiScore: 45,
      status: "rejected",
      postedTime: "3 days ago",
      requirements: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      description: "Lead product development for our flagship SaaS platform..."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "discovered": return "bg-blue-100 text-blue-800";
      case "ai-matched": return "bg-purple-100 text-purple-800";
      case "filtered": return "bg-orange-100 text-orange-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || job.status === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Job Discovery & Processing
          </CardTitle>
          <CardDescription>
            AI-powered job collection and filtering system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="discovered">Discovered</SelectItem>
                <SelectItem value="ai-matched">AI Matched</SelectItem>
                <SelectItem value="filtered">Filtered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-slate-800">{job.title}</h3>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                          <span className="font-medium">{job.company}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.postedTime}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-center ml-6">
                        <div className="flex items-center gap-1 mb-2">
                          <Bot className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium">AI Score</span>
                        </div>
                        <div className={`text-2xl font-bold ${getScoreColor(job.aiScore)}`}>
                          {job.aiScore}%
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Process
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pipeline">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["discovered", "ai-matched", "filtered", "rejected"].map((status) => (
                  <Card key={status} className="min-h-96">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm capitalize flex items-center justify-between">
                        {status.replace('-', ' ')}
                        <Badge variant="outline">
                          {jobs.filter(job => job.status === status).length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {jobs
                        .filter(job => job.status === status)
                        .map((job) => (
                          <Card key={job.id} className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                            <h4 className="font-medium text-sm mb-1">{job.title}</h4>
                            <p className="text-xs text-slate-600 mb-2">{job.company}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-500">{job.aiScore}% match</span>
                              <Star className="w-3 h-3 text-yellow-500" />
                            </div>
                          </Card>
                        ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobQueue;
