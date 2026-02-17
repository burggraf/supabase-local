import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"

export default function RecoveryPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess("Check your email for a password reset link.")
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Recovery</CardTitle>
          <CardDescription>Reset your password by entering your email.</CardDescription>
        </CardHeader>
        <form onSubmit={handleRecovery}>
          <CardContent className="space-y-4">
            {error && <div className="p-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-md border border-red-200 dark:border-red-800/50">{error}</div>}
            {success && <div className="p-3 text-sm font-medium text-primary bg-primary/10 rounded-md border border-primary/20">{success}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Back to{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
