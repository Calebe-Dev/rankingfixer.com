<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { industries, person, services, type Email } from '$lib/site';

	const path = services.migration.path;
	const title = 'SEO Website Migration and Traffic Drop Recovery | Ranking Fixer';
	const description =
		'SEO website migration services for redesigns, new platforms and domain changes, plus recovery when traffic dropped after a migration.';
	const email: Email = { subject: 'SEO website migration', label: 'Plan or rescue a migration' };

	const crumbs = [{ name: services.migration.name, path }];

	const steps: Step[] = [
		{ name: 'Inventory', text: 'List every URL that has traffic, rankings or backlinks, from Search Console, analytics, a crawl and the old sitemap.' },
		{ name: 'Redirect map', text: 'Map each old URL to its closest new equivalent with a single 301 redirect, without chains and without sending everything to the home page.' },
		{ name: 'Pre-launch check', text: 'Crawl the staging site for noindex tags, blocked robots.txt, canonicals, internal links, titles, structured data and speed.' },
		{ name: 'Launch day', text: 'Turn on redirects, test them in bulk, submit the new sitemap and, for domain changes, use the Change of Address tool.' },
		{ name: 'Monitor', text: 'Watch crawl errors, indexing and rankings daily for the first weeks and fix any broken redirect at once.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'Why did my traffic drop after a website redesign?',
			answer:
				'The most common causes are old URLs without redirects, content removed or shortened on pages that ranked, internal links that now point to redirects or 404s, a noindex tag left from staging, changed titles and headings, and a slower new site. A crawl of the old URLs against the new site shows which of these happened.'
		},
		{
			question: 'How long does it take to recover traffic after a migration?',
			answer:
				'A well-planned migration usually settles within a few weeks, with some fluctuation while Google recrawls. After a broken migration, recovery starts when the redirects and missing content are fixed, and often takes one to three months, depending on the size of the site and how long the errors stayed live.'
		},
		{
			question: 'Does changing the domain name affect SEO?',
			answer:
				'Yes, temporarily. Google has to recrawl the site and transfer signals from the old domain through 301 redirects. With complete redirects, the Change of Address tool in Search Console and the old domain kept active, most sites recover their positions. Without redirects, the rankings stay with the old domain.'
		},
		{
			question: 'How do I redesign a website without losing SEO?',
			answer:
				'Keep the URLs that rank, or redirect each one to its new equivalent. Keep the content and headings that earned the rankings, test the staging site before launch for noindex and robots.txt blocks, and monitor Search Console daily after launch.'
		},
		{
			question: 'Can you help if the migration already happened?',
			answer:
				'Yes. I compare the old URLs, recovered from Search Console, analytics, backlinks and archived sitemaps, against the live site, then fix missing redirects, lost content and technical errors. The sooner it is done, the faster the recovery.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		howTo: { name: 'How to migrate a website without losing SEO', steps },
		service: {
			name: services.migration.name,
			serviceType: 'SEO website migration and traffic recovery',
			description
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>SEO Website Migration and Traffic Drop Recovery</h1>
		<p>
			Redesigns, new platforms and domain changes are when most sites lose organic traffic. I plan the
			migration so Google can follow every old URL to its new home, test the new site before it goes
			live, and watch the launch. If the migration already happened and traffic fell, I find what broke
			and fix it.
		</p>
		<p>
			I plan migrations from a developer's chair: redirect rules, server configuration and the new
			templates are part of the work, not something to hand over and hope.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="types-title">
		<h2 id="types-title">Migrations I handle</h2>
		<ul class="cards">
			<li>
				<h3>Redesign</h3>
				<p>New design and structure on the same domain. The risk is changed URLs and removed content.</p>
			</li>
			<li>
				<h3>Replatforming</h3>
				<p>WordPress to Shopify, Wix to WordPress, CMS to a JavaScript framework. URL patterns and rendering change.</p>
			</li>
			<li>
				<h3>Domain change</h3>
				<p>Rebrand or merging sites. Every signal must be redirected and the change reported to Google.</p>
			</li>
			<li>
				<h3>HTTPS, www and URL structure</h3>
				<p>Smaller moves that still break rankings when redirects and canonicals disagree.</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="checklist-title">
		<h2 id="checklist-title">The SEO migration plan</h2>
		<Steps {steps} />
		<EmailCta {...email} />
	</section>

	<section aria-labelledby="recovery-title">
		<h2 id="recovery-title">Traffic dropped after the migration: what I check</h2>
		<ul class="checks">
			<li><strong>Redirects:</strong> old URLs that return 404, chains of several redirects, or everything sent to the home page.</li>
			<li><strong>Indexing:</strong> noindex or robots.txt rules copied from the staging site, and canonicals pointing to old URLs.</li>
			<li><strong>Content:</strong> pages that ranked and were removed, merged or cut to a few lines in the new design.</li>
			<li><strong>Internal links and sitemap:</strong> menus, footers and sitemaps still listing old or redirected URLs.</li>
			<li><strong>Rendering and speed:</strong> a new theme or framework that hides content from Google or fails Core Web Vitals.</li>
		</ul>
		<p>
			A drop that started on a Google core update date, with no changes on the site, is a different
			problem. The <a href={services.audit.path}>technical SEO audit</a> separates the two.
		</p>
	</section>

	<section class="band" aria-labelledby="dev-title">
		<h2 id="dev-title">Migration experience</h2>
		<p>
			As a full-stack developer and tech lead, I have led migrations of legacy systems to modern frameworks
			and built CMS integrations that publish to many websites from one platform. Redirect rules on
			servers, CDNs and Cloudflare are everyday work, not a ticket for someone else.
			More on the <a href={person.homepage}>work behind Ranking Fixer</a>.
		</p>
	</section>

	<Faq {faqs} title="SEO migration questions" />

	<Related
		links={[
			{ href: services.audit.path, text: 'Audit before a redesign' },
			{ href: industries.ecommerce.path, text: 'Ecommerce platform migrations' },
			{ href: industries.lawFirms.path, text: 'Law firm website redesigns' },
			{ href: services.indexing.path, text: 'Fix pages lost from the index' }
		]}
	/>

	<Contact {email} title="Planning a migration, or recovering from one?" intro="Email the site, the launch date and what is changing. If traffic already dropped, include the date it started." />
</main>
