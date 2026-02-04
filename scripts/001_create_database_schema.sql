-- Create users profile table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create domains table
CREATE TABLE IF NOT EXISTS public.domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  domain TEXT NOT NULL UNIQUE,
  verified BOOLEAN DEFAULT FALSE,
  verification_method TEXT CHECK (verification_method IN ('dns', 'file')),
  verification_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for domains
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;

-- Domains policies
CREATE POLICY "domains_select_own" ON public.domains FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "domains_insert_own" ON public.domains FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "domains_update_own" ON public.domains FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "domains_delete_own" ON public.domains FOR DELETE USING (auth.uid() = user_id);

-- Create links table
CREATE TABLE IF NOT EXISTS public.links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  domain_id UUID NOT NULL REFERENCES public.domains(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(domain_id, slug)
);

-- Enable RLS for links
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Links policies
CREATE POLICY "links_select_own" ON public.links FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "links_insert_own" ON public.links FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "links_update_own" ON public.links FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "links_delete_own" ON public.links FOR DELETE USING (auth.uid() = user_id);

-- Create clicks table for analytics
CREATE TABLE IF NOT EXISTS public.clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id UUID NOT NULL REFERENCES public.links(id) ON DELETE CASCADE,
  ip_address INET,
  ip_hash TEXT, -- For privacy option
  user_agent TEXT,
  referer TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for clicks (users can only see clicks for their own links)
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;

-- Clicks policies - users can only see clicks for their own links
CREATE POLICY "clicks_select_own_links" ON public.clicks FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.links 
    WHERE links.id = clicks.link_id 
    AND links.user_id = auth.uid()
  )
);

CREATE POLICY "clicks_insert_public" ON public.clicks FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_domains_user_id ON public.domains(user_id);
CREATE INDEX IF NOT EXISTS idx_domains_domain ON public.domains(domain);
CREATE INDEX IF NOT EXISTS idx_links_user_id ON public.links(user_id);
CREATE INDEX IF NOT EXISTS idx_links_domain_slug ON public.links(domain_id, slug);
CREATE INDEX IF NOT EXISTS idx_clicks_link_id ON public.clicks(link_id);
CREATE INDEX IF NOT EXISTS idx_clicks_clicked_at ON public.clicks(clicked_at);
