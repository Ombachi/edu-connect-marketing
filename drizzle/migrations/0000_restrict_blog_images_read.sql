DROP POLICY IF EXISTS "Authenticated can read blog images" ON storage.objects;
DROP POLICY IF EXISTS "Blog images are publicly readable" ON storage.objects;
CREATE POLICY "Admins can read blog images" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'blog-images' AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'::public.app_role));