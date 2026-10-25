<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { industries, services, type Email } from '$lib/site';

	const path = industries.agencies.path;
	const title = 'White Label Technical SEO for Agencies | Ranking Fixer';
	const description =
		'White label technical SEO for agencies: audits, Core Web Vitals and indexing fixes implemented on client sites, under your brand, by a developer.';
	const email: Email = { subject: 'White label technical SEO for our agency', label: 'Talk about a partnership' };

	const crumbs = [{ name: industries.agencies.name, path }];

	const faqs: FaqItem[] = [
		{
			question: 'What is white label technical SEO?',
			answer:
				'It is technical SEO work, such as audits, Core Web Vitals optimization and indexing fixes, done by a specialist and delivered by your agency under your own brand. Your client sees your agency; the specialist works in the background.'
		},
		{
			question: 'How much does white label technical SEO cost?',
			answer:
				'Each project is quoted separately, based on the size of the site, the platform and whether the work ends at the audit or includes implementation. You get the price for each project before work starts, so you can set your own margin.'
		},
		{
			question: 'Will you contact our clients?',
			answer:
				'No, unless you ask me to. Reports, tasks and documents carry your brand, and all communication goes through your team. If it helps, I can join a call as part of your team, under your agency name.'
		},
		{
			question: "Can you work with our clients' developers?",
			answer:
				'Yes. As a developer, I write tickets the way developers expect them: the problem, the affected templates, the exact change and how to test it. I can also open pull requests or make the changes directly when the client gives access.'
		},
		{
			question: 'Do you do content and link building too?',
			answer:
				'No. Ranking Fixer covers the technical layer only: crawling, indexing, rendering, speed, structured data and migrations. That keeps the scope clear and leaves content and links with your team.'
		},
		{
			question: 'Which time zone do you work in?',
			answer:
				'I work from Brazil, one to two hours ahead of US Eastern time, so the working day overlaps with the US.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		service: {
			name: industries.agencies.name,
			serviceType: 'White label technical SEO',
			description,
			audience: 'Digital marketing and SEO agencies'
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>White Label Technical SEO for Agencies</h1>
		<p>
			Your agency sells SEO. Some client sites need work that is closer to development than to marketing:
			pages Google will not index, Core Web Vitals in red, a migration that went wrong. I do that part,
			under your brand, from the audit to the code change.
		</p>
		<p>
			You keep the client relationship and the strategy. I deliver the technical audit, the fixes and the
			proof that they worked.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="deliver-title">
		<h2 id="deliver-title">What I deliver under your brand</h2>
		<ul class="cards">
			<li>
				<span class="tag">Audit</span>
				<h3>White label technical SEO audits</h3>
				<p>Crawl, Search Console and rendering analysis, delivered as a report in your format, ranked by impact.</p>
			</li>
			<li>
				<span class="tag">Implementation</span>
				<h3>Fixes in the client's code</h3>
				<p>Redirects, canonicals, templates, structured data and rendering fixes made in the CMS, theme or repository.</p>
			</li>
			<li>
				<span class="tag">Speed</span>
				<h3>White label Core Web Vitals</h3>
				<p>LCP, INP and CLS fixed on the pages that fail, with before and after data for your client report.</p>
			</li>
			<li>
				<span class="tag">Migrations</span>
				<h3>Migration support</h3>
				<p>Redirect maps, staging checks and launch monitoring when a client changes design, platform or domain.</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="how-title">
		<h2 id="how-title">How it works with your agency</h2>
		<ol class="steps">
			<li><strong>Brief.</strong> You send the client site, the problem and the deadline. I reply with the scope and a quote.</li>
			<li><strong>Access.</strong> Read access to Search Console, and access to the CMS or repository if the fixes are included.</li>
			<li><strong>Audit.</strong> You receive the findings in your template, with a summary your account manager can present.</li>
			<li><strong>Fix.</strong> I implement the changes, or hand tickets to the client's developers and answer their questions.</li>
			<li><strong>Report.</strong> Validation in Search Console and speed data before and after, ready to go into your monthly report.</li>
		</ol>
		<EmailCta {...email} />
	</section>

	<section aria-labelledby="why-title">
		<h2 id="why-title">Why agencies outsource technical SEO</h2>
		<p>
			Strategy, content and links are what most agencies are built for. Technical fixes need someone who
			reads code and knows what each change does to crawling and indexing. Hiring that person full time
			is expensive when the work comes in waves, and audit tools alone produce lists of warnings that
			nobody ships.
		</p>
		<ul class="checks">
			<li><strong>No hiring:</strong> technical capacity when a client needs it, without a full-time salary.</li>
			<li><strong>Execution, not only findings:</strong> the same person who audits can ship the fix.</li>
			<li><strong>Developer to developer:</strong> client dev teams get precise tickets, not SEO jargon.</li>
			<li><strong>Your brand, your client:</strong> confidential by default, with work delivered in your name.</li>
		</ul>
	</section>

	<Faq {faqs} title="White label technical SEO questions" />

	<Related
		links={[
			{ href: services.audit.path, text: 'What the technical audit covers' },
			{ href: services.coreWebVitals.path, text: 'Core Web Vitals optimization' },
			{ href: services.migration.path, text: 'SEO migration support' },
			{ href: services.indexing.path, text: 'Indexing fixes' }
		]}
	/>

	<Contact {email} title="Add technical SEO to your agency" intro="Email your agency site and the kind of client work you have in mind. I reply with how a first project would run." />
</main>
