
-- 1. Lock down profiles: remove public SELECT, scope to owner only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- 2. Allow anonymous read of blog images (bucket is private; blog posts are public)
CREATE POLICY "Blog images are publicly readable"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-images');

-- 3. Revoke direct EXECUTE on has_role from app roles.
-- It's SECURITY DEFINER and only needs to be callable by Postgres when evaluating RLS policies.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO postgres, service_role;
