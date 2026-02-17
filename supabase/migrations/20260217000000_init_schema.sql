-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Set up Storage for avatars
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true);

-- Set up access controls for storage
-- Allow public access to all files in the "avatars" bucket
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

-- Allow authenticated users to upload files to the "avatars" bucket
create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Allow users to update/delete their own files in the "avatars" bucket
create policy "Users can update their own avatar." on storage.objects
  for update using (auth.uid() = owner AND bucket_id = 'avatars');

create policy "Users can delete their own avatar." on storage.objects
  for delete using (auth.uid() = owner AND bucket_id = 'avatars');
