import { Bot, ArrowRight, Phone, Sparkles } from "lucide-react";

// Mock UI components for stand-alone functionality
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
const Card = ({ children, className }) => <div className={`border rounded-lg shadow-md bg-gray-800 border-gray-700 text-white ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`p-6 pb-4 text-center ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={`text-xl font-bold ${className}`}>{children}</h3>;
const CardDescription = ({ children, className }) => <p className={`text-sm text-gray-400 mt-2 ${className}`}>{children}</p>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;

// Mock Link component
const Link = ({ to, children }) => <a href={to}>{children}</a>;

const Index = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Bot className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            AI Assistant
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the future of communication with intelligent AI calls. 
            Your personal assistant that calls you when it matters most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-lg flex items-center justify-center gap-2">
              <Link to="/signup">
                Get Started
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-lg px-8 py-4 rounded-lg">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Intelligent Communication</h2>
            <p className="text-xl text-gray-400">
              Powered by advanced AI to enhance your productivity and communication
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Smart Calling</CardTitle>
                <CardDescription>
                  AI assistant calls you at the perfect time with important updates and reminders
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Intelligent Conversations</CardTitle>
                <CardDescription>
                  Natural language processing ensures meaningful and productive conversations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
                  <Bot className="w-8 h-8 text-white" />
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
          <Card>
            <CardContent className="p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of users who trust AI Assistant for their communication needs
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-lg flex items-center justify-center gap-2">
                <Link to="/signup">
                  Create Your Account
                  <ArrowRight className="inline-block ml-2 h-5 w-5" />
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
