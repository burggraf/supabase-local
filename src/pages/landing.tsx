import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Supabase Dashboard Scaffold
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        A high-quality React dashboard scaffold built with Vite, Tailwind CSS, shadcn/ui, and Supabase.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </div>
  )
}
