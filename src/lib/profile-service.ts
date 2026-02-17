import { supabase } from "@/lib/supabase"

export type Profile = {
  id: string
  updated_at?: string
  username?: string
  full_name?: string
  avatar_url?: string
  website?: string
  metadata?: any
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  if (error && error.code !== "PGRST116") {
    throw error
  }

  return data as Profile | null
}

export async function updateProfile(profile: Profile) {
  const { error } = await supabase
    .from("profiles")
    .upsert({
      ...profile,
      updated_at: new Date().toISOString(),
    })

  if (error) {
    throw error
  }
}

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split(".").pop()
  const filePath = `${userId}/${Math.random()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file)

  if (uploadError) {
    throw uploadError
  }

  const { data: { publicUrl } } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath)

  return publicUrl
}

export async function deleteAvatar(url: string) {
  const parts = url.split("/")
  const fileName = parts.pop()
  const userId = parts.pop()
  if (!fileName || !userId) return

  const { error } = await supabase.storage
    .from("avatars")
    .remove([`${userId}/${fileName}`])

  if (error) {
    throw error
  }
}
