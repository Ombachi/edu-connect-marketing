-- Remove the role policy that depended on the internal helper and keep users able to read their own roles.
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Blog post policies
DROP POLICY IF EXISTS "Admins can view all posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.blog_posts;

CREATE POLICY "Admins can view all posts"
  ON public.blog_posts FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can insert posts"
  ON public.blog_posts FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can update posts"
  ON public.blog_posts FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

-- Case study policies
DROP POLICY IF EXISTS "Published case studies viewable by everyone" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can view all case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can insert case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can update case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can delete case studies" ON public.case_studies;

CREATE POLICY "Published case studies viewable by everyone"
  ON public.case_studies FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can view all case studies"
  ON public.case_studies FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can insert case studies"
  ON public.case_studies FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can update case studies"
  ON public.case_studies FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can delete case studies"
  ON public.case_studies FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

-- Demo request policies
DROP POLICY IF EXISTS "Anyone can submit a demo request" ON public.demo_requests;
DROP POLICY IF EXISTS "Admins can view demo requests" ON public.demo_requests;
DROP POLICY IF EXISTS "Admins can update demo requests" ON public.demo_requests;
DROP POLICY IF EXISTS "Admins can delete demo requests" ON public.demo_requests;

CREATE POLICY "Anyone can submit a demo request"
  ON public.demo_requests FOR INSERT TO anon, authenticated
  WITH CHECK (
    status = 'new'
    AND admin_notes IS NULL
    AND length(btrim(name)) > 0
    AND length(btrim(email)) > 0
    AND length(btrim(institution)) > 0
    AND length(btrim(role)) > 0
    AND length(btrim(students)) > 0
  );

CREATE POLICY "Admins can view demo requests"
  ON public.demo_requests FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can update demo requests"
  ON public.demo_requests FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can delete demo requests"
  ON public.demo_requests FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

-- Help article policies
DROP POLICY IF EXISTS "Published articles viewable by everyone" ON public.help_articles;
DROP POLICY IF EXISTS "Admins can view all help articles" ON public.help_articles;
DROP POLICY IF EXISTS "Admins insert help articles" ON public.help_articles;
DROP POLICY IF EXISTS "Admins update help articles" ON public.help_articles;
DROP POLICY IF EXISTS "Admins delete help articles" ON public.help_articles;

CREATE POLICY "Published articles viewable by everyone"
  ON public.help_articles FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can view all help articles"
  ON public.help_articles FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins insert help articles"
  ON public.help_articles FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins update help articles"
  ON public.help_articles FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins delete help articles"
  ON public.help_articles FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

-- Testimonial policies
DROP POLICY IF EXISTS "Published testimonials viewable by everyone" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can view all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can delete testimonials" ON public.testimonials;

CREATE POLICY "Published testimonials viewable by everyone"
  ON public.testimonials FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can view all testimonials"
  ON public.testimonials FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can insert testimonials"
  ON public.testimonials FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
  ));

-- Blog image storage policies
DROP POLICY IF EXISTS "Admins can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete blog images" ON storage.objects;

CREATE POLICY "Admins can upload blog images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'blog-images'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
    )
  );

CREATE POLICY "Admins can update blog images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'blog-images'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
    )
  )
  WITH CHECK (
    bucket_id = 'blog-images'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
    )
  );

CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'blog-images'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'::public.app_role
    )
  );

-- The internal helper is no longer needed by app-facing RLS policies.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;