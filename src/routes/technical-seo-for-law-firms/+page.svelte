<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { guides, industries, services, type Email } from '$lib/site';

	const path = industries.lawFirms.path;
	const title = 'Technical SEO for Law Firms: Audit and Fixes | Ranking Fixer';
	const description =
		'Technical SEO for law firms: practice area pages, multiple offices, attorney schema, speed and redesigns, audited and fixed by a developer.';
	const email: Email = { subject: 'Technical SEO for our law firm', label: 'Send your firm’s website' };

	const crumbs = [{ name: industries.lawFirms.name, path }];

	const faqs: FaqItem[] = [
		{
			question: 'Does SEO work for law firms?',
			answer:
				'Yes, and it is one of the most competitive areas in search, which is why technical problems cost law firms more than most businesses. When two firms have similar content and reviews, the one whose pages are indexed, fast and clearly structured has the edge.'
		},
		{
			question: 'How long does a law firm SEO audit take?',
			answer:
				'For a typical firm website with practice area, attorney and location pages, the technical audit usually takes about a week after I get access to Google Search Console. Firms with many offices or thousands of blog posts take longer.'
		},
		{
			question: 'What schema markup should a law firm use?',
			answer:
				'LegalService or a more specific LocalBusiness type for each office, with the exact name, address and phone shown on the page; Person for each attorney profile, with job title and education; BreadcrumbList for navigation; and FAQPage only where the questions and answers are visible on the page. The markup must match the visible content.'
		},
		{
			question: 'Can you work on a site built by a legal marketing platform?',
			answer:
				'Usually yes, within the limits the platform allows. Some platforms give full access to templates and redirects, others only to page content. The audit shows what can be fixed in place and what would require the provider or a move to another platform.'
		},
		{
			question: "Will a redesign hurt my firm's rankings?",
			answer:
				'It can, if practice area URLs change without redirects, content is cut or the new theme is slower. With a redirect map, a pre-launch check and monitoring after launch, a redesign keeps the rankings and often improves them.'
		},
		{
			question: 'Do you write legal content or build links?',
			answer:
				'No. I work on the technical layer: indexing, structure, speed, structured data and migrations. Legal content should come from the attorneys or a legal writer, and that work performs better once the technical base is fixed.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		service: {
			name: industries.lawFirms.name,
			serviceType: 'Technical SEO for law firm websites',
			description,
			audience: 'Law firms and attorneys'
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Technical SEO for Law Firms: Audit and Fixes</h1>
		<p>
			Law firm websites lose rankings in technical ways: practice area pages that compete with each other,
			office pages Google treats as duplicates, attorney schema with errors, chat and tracking scripts that
			make mobile pages slow. I audit the firm's website and fix those problems in the code.
		</p>
		<p>
			For firms and legal marketing agencies who already have content and reviews, and need the site
			itself to stop holding them back.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="problems-title">
		<h2 id="problems-title">Technical SEO problems common on law firm websites</h2>
		<ul class="cards">
			<li>
				<h3>Practice area pages that compete</h3>
				<p>A car accident page, a blog post and a city page all targeting the same search split the signals between them.</p>
			</li>
			<li>
				<h3>Office pages treated as duplicates</h3>
				<p>Location pages that only change the city name end up in "Crawled - currently not indexed".</p>
			</li>
			<li>
				<h3>Phone numbers that do not match</h3>
				<p>Call tracking scripts swap numbers, so the page, the schema and the Business Profile disagree.</p>
			</li>
			<li>
				<h3>Heavy chat and intake widgets</h3>
				<p>Live chat, video backgrounds and form scripts loaded on every page fail Core Web Vitals on mobile.</p>
			</li>
			<li>
				<h3>Thin attorney profiles</h3>
				<p>Bios with a photo and two lines miss the experience signals Google looks for in legal topics.</p>
			</li>
			<li>
				<h3>Years of blog posts</h3>
				<p>Hundreds of short news posts dilute crawling and outrank the practice pages that bring clients.</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="schema-title">
		<h2 id="schema-title">Schema markup for law firms</h2>
		<div class="table-wrap">
			<table>
				<caption>Structured data by page type on a law firm website</caption>
				<thead>
					<tr>
						<th scope="col">Page</th>
						<th scope="col">Schema type</th>
						<th scope="col">What matters</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Each office</th>
						<td>LegalService (a LocalBusiness type)</td>
						<td>Name, address and phone exactly as on the page and the Business Profile</td>
					</tr>
					<tr>
						<th scope="row">Attorney profile</th>
						<td>Person</td>
						<td>Job title, education, bar admissions shown on the page, link to the firm</td>
					</tr>
					<tr>
						<th scope="row">Practice area</th>
						<td>Service, linked to the firm</td>
						<td>One practice per page, with the area served</td>
					</tr>
					<tr>
						<th scope="row">All pages</th>
						<td>BreadcrumbList, WebPage</td>
						<td>Clear hierarchy from home to practice and office</td>
					</tr>
					<tr>
						<th scope="row">Questions</th>
						<td>FAQPage</td>
						<td>Only for questions and answers visible on the page</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			Bar advertising rules apply to markup too. Structured data repeats what the page says, so words
			like "specialist" or "expert" follow the same rules your state bar sets for the page itself.
		</p>
	</section>

	<section aria-labelledby="audit-title">
		<h2 id="audit-title">What the law firm SEO audit checks</h2>
		<ul class="checks">
			<li><strong>Indexing</strong> of practice area, attorney and office pages in Search Console.</li>
			<li><strong>Cannibalization</strong> between practice pages, city pages and blog posts.</li>
			<li><strong>Office data</strong> consistency across pages, schema, Business Profile and call tracking.</li>
			<li><strong>Core Web Vitals</strong> on mobile, including chat, video and intake form scripts.</li>
			<li><strong>Structured data</strong> errors and markup that does not match the page.</li>
			<li><strong>Site structure</strong>: how many clicks from the home page to each practice and office.</li>
		</ul>
		<EmailCta {...email} />
	</section>

	<section class="band" aria-labelledby="redesign-title">
		<h2 id="redesign-title">Law firm website redesign without losing rankings</h2>
		<p>
			Redesigns are when firms lose the most traffic: practice area URLs change, long pages are cut to fit
			a new layout, and redirects are left for later. I map every ranking URL to its new address, check
			the new site before launch and monitor the weeks after. Details on the
			<a href={services.migration.path}>SEO website migration</a> page.
		</p>
	</section>

	<Faq {faqs} title="Law firm technical SEO questions" />

	<Related
		links={[
			{ href: services.audit.path, text: 'Technical SEO audit' },
			{ href: services.coreWebVitals.path, text: 'Speed up a slow firm website' },
			{ href: guides.crawledNotIndexed.path, text: 'Office pages not indexed' },
			{ href: industries.agencies.path, text: 'For legal marketing agencies' }
		]}
	/>

	<Contact {email} title="Send your firm's website" intro="Email the site and the practice areas that matter most. I reply with the technical issues I see and how I would fix them." />
</main>
