import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { getProfile, updateProfile, uploadAvatar, deleteAvatar, type Profile } from "@/lib/profile-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Trash2, Upload } from "lucide-react"

export default function ProfilePage() {
  const { user, refreshProfile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      if (user) {
        try {
          const data = await getProfile(user.id)
          setProfile(data || { id: user.id })
        } catch (e: any) {
          setError(e.message)
        } finally {
          setLoading(false)
        }
      }
    }
    loadProfile()
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setUpdating(true)
    setError(null)
    setSuccess(null)

    try {
      await updateProfile(profile)
      await refreshProfile()
      setSuccess("Profile updated successfully")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setUpdating(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user || !profile) return

    setUpdating(true)
    setError(null)

    try {
      if (profile.avatar_url) {
        await deleteAvatar(profile.avatar_url)
      }
      const publicUrl = await uploadAvatar(user.id, file)
      const updatedProfile = { ...profile, avatar_url: publicUrl }
      await updateProfile(updatedProfile)
      await refreshProfile()
      setProfile(updatedProfile)
      setSuccess("Avatar updated successfully")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setUpdating(false)
    }
  }

  const handleAvatarDelete = async () => {
    if (!profile?.avatar_url || !user) return

    setUpdating(true)
    setError(null)

    try {
      await deleteAvatar(profile.avatar_url)
      const updatedProfile = { ...profile, avatar_url: "" }
      await updateProfile(updatedProfile)
      await refreshProfile()
      setProfile(updatedProfile)
      setSuccess("Avatar deleted successfully")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  const userInitial = user?.email?.[0].toUpperCase() ?? "U"

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile</h1>
      </div>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Profile Information</CardTitle>
          <CardDescription className="text-muted-foreground">Update your personal details and avatar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="text-2xl bg-muted text-muted-foreground">{userInitial}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Label
                htmlFor="avatar-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Label>
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={updating}
              />
              {profile?.avatar_url && (
                <Button variant="outline" size="icon" onClick={handleAvatarDelete} disabled={updating}>
                  <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                </Button>
              )}
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {error && <div className="p-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-md border border-red-200 dark:border-red-800/50">{error}</div>}
            {success && <div className="p-3 text-sm font-medium text-primary bg-primary/10 rounded-md border border-primary/20">{success}</div>}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input id="email" value={user?.email} disabled className="bg-muted text-muted-foreground cursor-not-allowed" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <Input
                id="username"
                value={profile?.username || ""}
                onChange={(e) => setProfile({ ...profile!, username: e.target.value })}
                placeholder="username"
                className="bg-background text-foreground border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-foreground">Full Name</Label>
              <Input
                id="full_name"
                value={profile?.full_name || ""}
                onChange={(e) => setProfile({ ...profile!, full_name: e.target.value })}
                placeholder="Full Name"
                className="bg-background text-foreground border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-foreground">Website</Label>
              <Input
                id="website"
                value={profile?.website || ""}
                onChange={(e) => setProfile({ ...profile!, website: e.target.value })}
                placeholder="Your website URL"
                className="bg-background text-foreground border-input"
              />
            </div>

            <Button type="submit" className="w-full" disabled={updating}>
              {updating ? "Updating..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
