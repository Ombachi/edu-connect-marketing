
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.help_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft','published')),
  order_index INT NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.help_articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.help_articles TO authenticated;
GRANT ALL ON public.help_articles TO service_role;

ALTER TABLE public.help_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles viewable by everyone"
  ON public.help_articles FOR SELECT
  USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert help articles"
  ON public.help_articles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update help articles"
  ON public.help_articles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete help articles"
  ON public.help_articles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER help_articles_set_updated_at
  BEFORE UPDATE ON public.help_articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_help_articles_category ON public.help_articles(category);
CREATE INDEX idx_help_articles_status ON public.help_articles(status);

INSERT INTO public.help_articles (title, slug, category, excerpt, content, order_index) VALUES
('Creating your Litu Hub account', 'creating-your-account', 'Getting Started',
 'Sign up, verify your email, and set up your school profile in under five minutes.',
 '<p>Welcome to Litu Hub, Kenya''s premier learning management system. This guide walks you through creating your account and getting your institution online.</p><h2>1. Sign up</h2><p>Visit your school''s Litu Hub URL and click <strong>Sign up</strong>. Enter your name, school email, and a secure password.</p><h2>2. Verify your email</h2><p>Check your inbox for a verification link from Litu Hub. Click the link to activate your account. The link expires after 24 hours.</p><h2>3. Complete your school profile</h2><p>On first login, add your institution''s name, logo, and primary contact. This information appears on student and parent dashboards.</p><h2>4. Invite your team</h2><p>From <strong>Settings → Members</strong>, invite tutors and admin staff. We recommend onboarding tutors before bulk-importing students.</p>', 1),
('Inviting students, tutors and parents', 'inviting-users', 'Getting Started',
 'Bulk-import users from a CSV file or send individual invitations from the admin panel.',
 '<p>Litu Hub supports three ways to add people to your institution: individual invites, bulk CSV import, and self-signup with a school code.</p><h2>Individual invitations</h2><p>Go to <strong>Members → Invite</strong>, enter the email, choose a role (Student, Tutor, Parent, Admin), and click <strong>Send</strong>.</p><h2>Bulk CSV import</h2><p>Upload a CSV with columns: <code>full_name, email, role, class</code>. Litu Hub validates the file, flags duplicates, and sends branded invitations to each address.</p><h2>Self-signup with school code</h2><p>Enable <strong>Settings → Self-signup</strong> and share your six-digit school code with students. They register themselves and you approve them in one click.</p>', 2),
('Setting up your school subdomain and branding', 'branding-and-subdomain', 'Getting Started',
 'Personalise Litu Hub with your school colours, logo, and a custom subdomain like yourschool.lituhub.app.',
 '<p>Under <strong>Settings → Branding</strong>, upload your school logo (SVG or PNG, max 2 MB), pick a primary colour, and choose a subdomain. Changes propagate within 5 minutes and apply to dashboards, emails, and parent notifications.</p><h2>Custom domain</h2><p>School and Enterprise plans can map their own domain (e.g. <code>learn.yourschool.ac.ke</code>). Add a CNAME record pointing to <code>cname.lituhub.app</code> and we''ll issue an SSL certificate automatically.</p>', 3),
('Creating your first course', 'creating-your-first-course', 'Courses & Content',
 'Build a course, add lessons, attach resources, and publish it to a class.',
 '<p>From the tutor dashboard, click <strong>Courses → New course</strong>. Enter a title, subject (e.g. Mathematics, KCSE), and grade level.</p><h2>Add modules and lessons</h2><p>Inside the course, create modules to group related lessons. Each lesson can contain rich text, video (YouTube or upload), PDFs, and downloadable resources.</p><h2>Publish to a class</h2><p>When the course is ready, click <strong>Publish</strong> and select the classes that should see it. Students get an in-app notification immediately.</p>', 1),
('Uploading lesson videos and PDFs', 'uploading-videos-and-pdfs', 'Courses & Content',
 'Supported formats, file size limits, and tips for fast upload over Kenyan internet connections.',
 '<p>Litu Hub accepts MP4, MOV, and WebM video up to 500 MB per file on the School plan (2 GB on Enterprise). PDFs, DOCX, PPTX and images are also supported.</p><h2>Video tips</h2><ul><li>Compress to 720p before upload to save bandwidth.</li><li>Use the <strong>YouTube embed</strong> option if your video is already online — no upload needed.</li><li>Resumable uploads handle dropped connections automatically.</li></ul><h2>Storage limits</h2><p>Storage is included in your plan. Track usage under <strong>Settings → Storage</strong>.</p>', 2),
('Creating assignments and rubrics', 'creating-assignments', 'Courses & Content',
 'Set assignments, attach rubrics, and choose between manual or AI-assisted grading.',
 '<p>Inside any course, open the <strong>Assignments</strong> tab and click <strong>New assignment</strong>. Set a title, instructions, due date, and total marks.</p><h2>Rubrics</h2><p>Add a rubric to break down marking into clear criteria (e.g. accuracy, presentation, originality). Students see the rubric in advance, which boosts submission quality.</p><h2>AI-assisted grading</h2><p>Toggle <strong>AI grading suggestions</strong> to get a first-pass score and feedback. Tutors review and approve every grade before publication.</p>', 3),
('Building and running quizzes', 'building-quizzes', 'Courses & Content',
 'Multiple-choice, short answer, and timed quizzes with automatic marking.',
 '<p>Litu Hub quizzes support multiple-choice, true/false, short answer, and matching questions. Tutors can set time limits, randomise question order, and lock results until a class deadline.</p><h2>Question bank</h2><p>Save questions to a reusable bank, tagged by topic and difficulty. Generate new quizzes by drawing random questions from the bank.</p><h2>Auto-grading</h2><p>Objective questions are graded instantly. Short-answer questions are queued for tutor review.</p>', 4),
('Tracking student progress and grades', 'tracking-progress', 'Courses & Content',
 'Use the gradebook and analytics dashboard to spot students who need support.',
 '<p>The <strong>Gradebook</strong> shows every student''s scores across courses, assignments, and quizzes. Filter by class, subject, or term.</p><h2>At-risk alerts</h2><p>Litu Hub flags students whose attendance drops below 70% or whose recent grades drop by more than 15%. Alerts appear in the tutor dashboard and (optionally) email parents.</p><h2>Export reports</h2><p>Export a class gradebook to CSV or PDF for end-of-term reporting.</p>', 5),
('Understanding user roles', 'user-roles', 'Roles & Permissions',
 'Admins, Tutors, Students, and Parents — what each role can see and do.',
 '<p>Litu Hub has four built-in roles:</p><ul><li><strong>Admin</strong> — full access to settings, billing, members, and all content.</li><li><strong>Tutor</strong> — manage their own courses, assignments, and gradebook.</li><li><strong>Student</strong> — view enrolled courses, submit work, see their grades.</li><li><strong>Parent</strong> — view linked children''s progress, attendance, and fee statements.</li></ul><p>A user can hold multiple roles (e.g. a tutor who is also a parent).</p>', 1),
('Linking parents to their children', 'linking-parents', 'Roles & Permissions',
 'Connect parent accounts to one or more students so they see only their own children.',
 '<p>From <strong>Members → Parents</strong>, open a parent profile and click <strong>Link student</strong>. Search for the student by name or admission number and confirm.</p><h2>Bulk linking</h2><p>Include a <code>parent_email</code> column in your student CSV import. Litu Hub creates parent accounts automatically and links them to the right child.</p><h2>Privacy</h2><p>Parents only see records for the students they are linked to. They never see classmates'' grades or contact details.</p>', 2),
('Granting admin access to a colleague', 'granting-admin-access', 'Roles & Permissions',
 'Promote a trusted staff member to admin from the Members page.',
 '<p>Open <strong>Members</strong>, find the user, click the three-dot menu, and choose <strong>Make admin</strong>. The change takes effect immediately and is logged in the audit trail.</p><p>We recommend keeping the number of admins small (3-5 for most schools). To revoke, choose <strong>Remove admin</strong> from the same menu.</p>', 3),
('Choosing the right plan', 'choosing-a-plan', 'Billing & Plans',
 'Compare Starter, School, and Enterprise plans, and find out which fits your institution.',
 '<p>Litu Hub offers three pricing tiers:</p><ul><li><strong>Starter</strong> — up to 100 students, core LMS features.</li><li><strong>School</strong> — unlimited students, parent portal, AI grading, integrations.</li><li><strong>Enterprise</strong> — multi-campus, SSO, custom SLA, dedicated success manager.</li></ul><p>See the <a href="/pricing">pricing page</a> for full feature comparison and Kenyan-shilling pricing.</p>', 1),
('Paying with M-Pesa, card or bank transfer', 'payment-methods', 'Billing & Plans',
 'How to settle invoices using the payment method your finance office prefers.',
 '<p>Litu Hub accepts <strong>M-Pesa Paybill</strong> (recommended for most Kenyan schools), Visa/Mastercard, and direct bank transfer. Set your preferred method under <strong>Settings → Billing</strong>.</p><h2>M-Pesa</h2><p>Use Paybill <code>4144111</code> with your school code as the account number. Confirmation is automatic within 60 seconds.</p><h2>Bank transfer</h2><p>Invoices include our KCB account details. Email the swift confirmation to <code>finance@lituhub.com</code> to speed up reconciliation.</p>', 2),
('Changing or cancelling your subscription', 'changing-subscription', 'Billing & Plans',
 'Upgrade, downgrade, or pause your plan with no penalty.',
 '<p>From <strong>Settings → Billing → Change plan</strong>, pick a new tier. Upgrades are pro-rated and take effect immediately; downgrades apply at the next renewal. You can pause your subscription for up to 60 days (e.g. school holidays) — your data is preserved.</p>', 3),
('Connecting your school information system', 'connecting-sis', 'Integrations',
 'Sync student rosters and grades with Sycamore, OpenSIS, or a custom SIS via API.',
 '<p>Litu Hub integrates with major school information systems out of the box. Go to <strong>Settings → Integrations → SIS</strong> and choose your provider. For custom systems, use our REST API (see the developer docs).</p><h2>What syncs</h2><ul><li>Student roster (one-way, SIS → Litu Hub)</li><li>Class assignments and timetables</li><li>Final grades (one-way, Litu Hub → SIS, on demand)</li></ul>', 1),
('Setting up M-Pesa Daraja for fee collection', 'mpesa-daraja-setup', 'Integrations',
 'Collect school fees directly through Litu Hub using your own M-Pesa Paybill.',
 '<p>If your school has its own M-Pesa Paybill, you can collect fees through Litu Hub. Under <strong>Settings → Payments → M-Pesa</strong>, enter your Paybill number, consumer key, and consumer secret from the Safaricom Daraja portal.</p><h2>Reconciliation</h2><p>Payments appear in the fee statement within 30 seconds, automatically matched to the correct student by reference number.</p>', 2),
('Single Sign-On with Google or Microsoft', 'sso-google-microsoft', 'Integrations',
 'Enterprise customers can let staff and students sign in with school Google or Microsoft accounts.',
 '<p>Available on the Enterprise plan. Under <strong>Settings → SSO</strong>, choose Google Workspace or Microsoft 365, paste your tenant ID, and authorise Litu Hub. Users matching your school domain are auto-provisioned on first login.</p>', 3),
('How Litu Hub protects student data', 'data-protection', 'Privacy & Security',
 'Encryption, hosting, and compliance with Kenya''s Data Protection Act.',
 '<p>Litu Hub is registered with the Office of the Data Protection Commissioner of Kenya. All data is encrypted in transit (TLS 1.3) and at rest (AES-256), and hosted in regional data centres.</p><h2>Backups</h2><p>We take encrypted backups every 6 hours with 30-day retention. Schools on the Enterprise plan can request on-demand exports at any time.</p><h2>Data subject rights</h2><p>Parents, students, and staff can request a copy of their data or deletion through <strong>Settings → Privacy</strong>. We respond within 30 days as required by law.</p>', 1),
('Resetting your password', 'reset-password', 'Privacy & Security',
 'Use the Forgot Password link, or ask an admin to send a reset.',
 '<p>On the sign-in screen, click <strong>Forgot your password?</strong> and enter your email. You''ll get a reset link valid for 1 hour.</p><p>If you don''t receive the email, check your spam folder. Admins can also trigger a reset for any user from <strong>Members</strong>.</p>', 2),
('Enabling two-factor authentication', 'enable-2fa', 'Privacy & Security',
 'Add an extra layer of security to admin and tutor accounts.',
 '<p>Under <strong>Settings → Security → Two-factor authentication</strong>, scan the QR code with Google Authenticator, Authy, or any TOTP app. Enter the 6-digit code to confirm.</p><p>Admins can require 2FA for all staff accounts from the same page. Students are not required to use 2FA by default.</p>', 3);
