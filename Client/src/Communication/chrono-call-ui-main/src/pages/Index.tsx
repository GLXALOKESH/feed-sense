import { Link } from "react-router-dom"
import { Bot, ArrowRight, Phone, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl gradient-electric flex items-center justify-center glow-accent">
              <Bot className="w-10 h-10 text-accent-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            AI Assistant
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience the future of communication with intelligent AI calls. 
            Your personal assistant that calls you when it matters most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="electric" size="lg" className="text-lg px-8 py-6">
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Intelligent Communication</h2>
            <p className="text-xl text-muted-foreground">
              Powered by advanced AI to enhance your productivity and communication
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="gradient-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-electric flex items-center justify-center glow-accent">
                  <Phone className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle>Smart Calling</CardTitle>
                <CardDescription>
                  AI assistant calls you at the perfect time with important updates and reminders
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-electric flex items-center justify-center glow-accent">
                  <Sparkles className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle>Intelligent Conversations</CardTitle>
                <CardDescription>
                  Natural language processing ensures meaningful and productive conversations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-electric flex items-center justify-center glow-accent">
                  <Bot className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle>Complete History</CardTitle>
                <CardDescription>
                  Full transcripts and summaries of all your AI conversations, searchable and exportable
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="gradient-card">
            <CardContent className="p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-electric flex items-center justify-center glow-accent">
                <Bot className="w-8 h-8 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users who trust AI Assistant for their communication needs
              </p>
              <Button asChild variant="electric" size="lg" className="text-lg px-8 py-4">
                <Link to="/signup">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
