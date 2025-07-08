
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Briefcase, 
  Eye, 
  CheckCircle, 
  XCircle,
  FileText,
  Clock,
  Phone
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'job' | 'cv' | 'cover-letter';
    data: any;
  }[];
}

const WhatsAppBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Hi! I'm your AI Job Hunter Assistant. I can help you find jobs, generate applications, and manage your job search. Type 'help' to see what I can do!",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (duration = 1500) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  const addMessage = (type: 'user' | 'bot', content: string, attachments?: any[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      attachments
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleBotResponse = async (userMessage: string) => {
    await simulateTyping();
    
    const message = userMessage.toLowerCase();
    
    if (message.includes('help') || message === '/help') {
      addMessage('bot', `🤖 Here's what I can help you with:

📋 *Job Commands:*
• /findjobs - Search for new job opportunities
• /showqueue - View pending job applications
• /stats - Show your job hunting statistics

📝 *Application Commands:*
• /review - Review pending applications
• /generate [job-id] - Generate CV & cover letter
• /approve [job-id] - Approve and submit application

⚙️ *Settings:*
• /profile - Update your profile preferences
• /preferences - Set job search criteria

Just type any command or ask me anything about your job search! 🚀`);
    } else if (message.includes('/findjobs') || message.includes('find jobs')) {
      addMessage('bot', "🔍 Searching for new job opportunities...");
      await simulateTyping(2000);
      addMessage('bot', `Found 12 new jobs matching your profile! Here are the top matches:

🏢 *Senior React Developer* - TechCorp Inc.
💰 $120k - $160k | 📍 San Francisco, CA
🤖 AI Match: 92%
React, TypeScript, Node.js

🏢 *Frontend Engineer* - StartupXYZ  
💰 $100k - $140k | 📍 Remote
🤖 AI Match: 88%
React, JavaScript, CSS

🏢 *Full Stack Developer* - Digital Solutions
💰 $90k - $130k | 📍 New York, NY
🤖 AI Match: 76%
React, Python, PostgreSQL

Type /review to see all jobs or /generate [1/2/3] to create applications!`, [
        { type: 'job', data: { count: 12, topMatch: 92 } }
      ]);
    } else if (message.includes('/review') || message.includes('review')) {
      addMessage('bot', `👀 *Review Queue* - 3 applications ready

*Job #1: Senior React Developer*
🤖 AI Confidence: 94%
✅ CV Generated ✅ Cover Letter Ready
React, TypeScript, GraphQL experience highlighted

*Job #2: Frontend Engineer*  
🤖 AI Confidence: 91%
✅ CV Generated ✅ Cover Letter Ready
Remote work experience emphasized

*Job #3: Full Stack Developer*
🤖 AI Confidence: 78%
⚠️ Needs attention - Lower confidence score

Reply with:
• ✅ 1 - Approve Job #1
• ❌ 1 - Reject Job #1  
• 👁️ 1 - View full details for Job #1`);
    } else if (message.includes('/stats') || message.includes('statistics')) {
      addMessage('bot', `📊 *Your Job Hunt Stats*

🎯 *This Week:*
• Jobs Found: 47
• Applications Sent: 8
• Responses: 3
• Interviews: 1

📈 *Overall Performance:*
• Success Rate: 26.7%
• AI Accuracy: 94%
• Average Response Time: 3.2 days

🔥 *Hot Streak:* 5 days active
⭐ *Top Skill Match:* React Development

Keep up the great work! 🚀`);
    } else if (message.includes('✅') || message.includes('approve')) {
      const jobNum = message.match(/\d+/)?.[0] || '1';
      addMessage('bot', `✅ *Application Approved!*

Job #${jobNum} has been submitted successfully!

📧 Application sent to: hr@techcorp.com
📎 Attachments: Custom CV + Cover Letter
⏰ Submitted: ${new Date().toLocaleTimeString()}

I'll monitor for responses and notify you of any updates. Good luck! 🍀

Type /track to monitor this application's status.`);
    } else if (message.includes('❌') || message.includes('reject')) {
      const jobNum = message.match(/\d+/)?.[0] || '1';
      addMessage('bot', `❌ Application rejected and removed from queue.

Job #${jobNum} won't be submitted. I'll look for better matches! 🎯`);
    } else if (message.includes('/generate')) {
      const jobNum = message.match(/\d+/)?.[0] || '1';
      addMessage('bot', `⚡ Generating application materials for Job #${jobNum}...`);
      await simulateTyping(3000);
      addMessage('bot', `✨ *Application Generated!*

📄 *CV Updates:*
• Highlighted React & TypeScript experience
• Added relevant project examples  
• Optimized for ATS scanning

💌 *Cover Letter:*
• Personalized for TechCorp Inc.
• Mentioned specific job requirements
• Professional tone matched to company culture

🎯 *Optimization Score:* 94%

Ready to review? Type /review to approve or make edits!`, [
        { type: 'cv', data: { optimized: true, score: 94 } },
        { type: 'cover-letter', data: { personalized: true } }
      ]);
    } else if (message.includes('/profile') || message.includes('profile')) {
      addMessage('bot', `👤 *Your Profile Settings*

🎯 *Job Preferences:*
• Role: Senior Frontend Developer
• Location: San Francisco Bay Area, Remote
• Salary: $100k - $180k
• Type: Full-time

💻 *Key Skills:*
React, TypeScript, JavaScript, Node.js, GraphQL

📧 *Contact:* john.doe@email.com
📱 *Phone:* +1 (555) 123-4567

Want to update anything? Just tell me what you'd like to change!`);
    } else if (message.includes('thank') || message.includes('thanks')) {
      addMessage('bot', "You're welcome! 😊 I'm here to help make your job search easier. Feel free to ask me anything or use /help to see all commands!");
    } else {
      // Generic AI response
      addMessage('bot', `I understand you're asking about "${userMessage}". 

I can help you with job searching, application generation, and managing your job hunt process. 

Try these commands:
• /findjobs - Find new opportunities
• /review - Check pending applications  
• /stats - View your progress
• /help - See all available commands

What would you like to do next? 🚀`);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    addMessage('user', inputMessage);
    const userMsg = inputMessage;
    setInputMessage("");
    
    await handleBotResponse(userMsg);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-white shadow-xl">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Job Hunter Bot</h1>
                <p className="text-green-100 text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  Online - Ready to help
                </p>
              </div>
              <div className="ml-auto">
                <Phone className="w-5 h-5" />
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto bg-gray-50 p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={`rounded-lg p-3 shadow-sm ${
                      message.type === 'user'
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      
                      {message.attachments && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((attachment, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {attachment.type === 'job' && <Briefcase className="w-3 h-3 mr-1" />}
                              {attachment.type === 'cv' && <FileText className="w-3 h-3 mr-1" />}
                              {attachment.type === 'cover-letter' && <FileText className="w-3 h-3 mr-1" />}
                              {attachment.type}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 max-w-xs">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white rounded-lg rounded-bl-none p-3 border shadow-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-4">
              <div className="flex items-center gap-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message or command..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setInputMessage('/findjobs')}
                  className="text-xs"
                >
                  🔍 Find Jobs
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setInputMessage('/review')}
                  className="text-xs"
                >
                  👀 Review Queue
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setInputMessage('/stats')}
                  className="text-xs"
                >
                  📊 Stats
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setInputMessage('/help')}
                  className="text-xs"
                >
                  ❓ Help
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhatsAppBot;
