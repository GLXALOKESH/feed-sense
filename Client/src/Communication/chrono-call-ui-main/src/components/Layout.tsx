import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Bot } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center px-4">
            <SidebarTrigger className="mr-4" />
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-electric flex items-center justify-center">
                <Bot className="w-5 h-5 text-accent-foreground" />
              </div>
              <h1 className="font-semibold">AI Assistant</h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}