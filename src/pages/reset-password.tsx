import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess("Password updated successfully.")
      setTimeout(() => navigate("/login"), 2000)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">New Password</CardTitle>
          <CardDescription>Enter your new password.</CardDescription>
        </CardHeader>
        <form onSubmit={handleUpdate}>
          <CardContent className="space-y-4">
            {error && <div className="p-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-md border border-red-200 dark:border-red-800/50">{error}</div>}
            {success && <div className="p-3 text-sm font-medium text-primary bg-primary/10 rounded-md border border-primary/20">{success}</div>}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
