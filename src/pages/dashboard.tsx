import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome, {user?.email}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Total Users</CardTitle>
            <CardDescription className="text-muted-foreground">All-time users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">1,234</p>
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Active Subscriptions</CardTitle>
            <CardDescription className="text-muted-foreground">Active billing cycles</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">567</p>
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Open Issues</CardTitle>
            <CardDescription className="text-muted-foreground">Pending tasks and bugs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">12</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
