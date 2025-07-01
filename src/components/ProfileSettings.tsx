
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  Bot, 
  Search, 
  Bell, 
  Shield, 
  FileText,
  Plus,
  X,
  Save
} from "lucide-react";

const ProfileSettings = () => {
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "Python", "AWS"]);
  const [newSkill, setNewSkill] = useState("");
  const [jobPreferences, setJobPreferences] = useState({
    minSalary: "80000",
    maxSalary: "150000",
    locations: ["San Francisco", "Remote", "New York"],
    jobTypes: ["Full-time"],
    remoteOnly: false
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-600" />
            Profile & System Settings
          </CardTitle>
          <CardDescription>
            Configure your profile, job preferences, and AI automation settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Job Preferences
              </TabsTrigger>
              <TabsTrigger value="ai-settings" className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                AI Settings
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                  <CardDescription>
                    Basic information used in your job applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@email.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input id="linkedin" defaultValue="https://linkedin.com/in/johndoe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio Website</Label>
                    <Input id="portfolio" defaultValue="https://johndoe.dev" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Summary</CardTitle>
                  <CardDescription>
                    Brief overview of your professional background
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-32"
                    defaultValue="Experienced software engineer with 5+ years of expertise in React, TypeScript, and full-stack development. Passionate about building scalable web applications and leading technical teams."
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Skills & Technologies
                    <Button size="sm" onClick={addSkill} disabled={!newSkill.trim()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-2">
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-slate-500 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Salary Expectations</CardTitle>
                  <CardDescription>
                    Set your desired salary range for job filtering
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minSalary">Minimum Salary</Label>
                      <Input
                        id="minSalary"
                        type="number"
                        value={jobPreferences.minSalary}
                        onChange={(e) => setJobPreferences({
                          ...jobPreferences,
                          minSalary: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxSalary">Maximum Salary</Label>
                      <Input
                        id="maxSalary"
                        type="number"
                        value={jobPreferences.maxSalary}
                        onChange={(e) => setJobPreferences({
                          ...jobPreferences,
                          maxSalary: e.target.value
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location Preferences</CardTitle>
                  <CardDescription>
                    Specify your preferred work locations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Remote Work Only</Label>
                      <p className="text-sm text-slate-600">Only show remote job opportunities</p>
                    </div>
                    <Switch
                      checked={jobPreferences.remoteOnly}
                      onCheckedChange={(checked) => setJobPreferences({
                        ...jobPreferences,
                        remoteOnly: checked
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preferred Locations</Label>
                    <div className="flex flex-wrap gap-2">
                      {jobPreferences.locations.map((location, index) => (
                        <Badge key={index} variant="outline">
                          {location}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Location
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Type Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {["Full-time", "Part-time", "Contract", "Freelance"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={type}
                          defaultChecked={type === "Full-time"}
                          className="rounded"
                        />
                        <Label htmlFor={type}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    AI Automation Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how the AI agent processes and applies to jobs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Auto-apply to high-confidence matches</Label>
                      <p className="text-sm text-slate-600">Automatically apply to jobs with 95%+ AI confidence</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Generate custom cover letters</Label>
                      <p className="text-sm text-slate-600">Create personalized cover letters for each application</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Tailor CV for each job</Label>
                      <p className="text-sm text-slate-600">Automatically adjust CV to highlight relevant skills</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Minimum AI confidence for review queue</Label>
                    <p className="text-sm text-slate-600">Jobs below this threshold won't be shown for review</p>
                    <Input type="number" defaultValue="75" min="0" max="100" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Daily application limit</Label>
                    <p className="text-sm text-slate-600">Maximum number of applications to send per day</p>
                    <Input type="number" defaultValue="5" min="1" max="20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Generation Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Writing tone</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Professional</option>
                      <option>Enthusiastic</option>
                      <option>Conversational</option>
                      <option>Formal</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Cover letter length</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Concise (150-250 words)</option>
                      <option>Standard (250-400 words)</option>
                      <option>Detailed (400-600 words)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>New job matches found</Label>
                      <p className="text-sm text-slate-600">Get notified when new relevant jobs are discovered</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Applications submitted</Label>
                      <p className="text-sm text-slate-600">Confirmation when applications are sent</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Employer responses</Label>
                      <p className="text-sm text-slate-600">Alert when employers respond to applications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Daily summary</Label>
                      <p className="text-sm text-slate-600">Daily report of agent activity and results</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Weekly analytics</Label>
                      <p className="text-sm text-slate-600">Weekly performance and success metrics</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end pt-6 border-t">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
