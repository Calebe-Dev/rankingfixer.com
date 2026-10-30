<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { aboutPage, guides, guidesPage, industries, markets, person, services, type Email } from '$lib/site';

	const path = '/';
	const title = 'Technical SEO Fixes Done by a Developer | Ranking Fixer';
	const description =
		'Technical SEO consultant and developer who finds and fixes what keeps your site off Google: indexing, Core Web Vitals and migrations.';
	const email: Email = { subject: 'Website fix request (from the home page)', label: 'Email me your site' };

	const problems = [
		{
			href: guides.notShowing.path,
			tag: 'Not on Google',
			title: 'My website is not showing up on Google',
			text: 'The site is live, but searching for the business name or the service brings nothing, or only some pages.'
		},
		{
			href: services.indexing.path,
			tag: 'Indexing',
			title: 'Search Console says pages are not indexed',
			text: 'Crawled or discovered but not indexed, page with redirect, duplicate canonical, soft 404 or 5xx errors.'
		},
		{
			href: services.coreWebVitals.path,
			tag: 'Speed',
			title: 'Core Web Vitals assessment failed',
			text: 'LCP, INP or CLS in red on mobile, a slow site that loses visitors before the page even loads.'
		},
		{
			href: services.migration.path,
			tag: 'Traffic drop',
			title: 'Traffic dropped after a redesign or migration',
			text: 'New site, new platform or new domain, and organic traffic fell. Usually redirects, canonicals or lost content.'
		},
		{
			href: services.audit.path,
			tag: 'Not sure',
			title: 'I do not know what is wrong',
			text: 'Rankings stalled or fell and nobody can say why. A technical SEO audit finds the cause before anyone guesses.'
		}
	];

	const faqs: FaqItem[] = [
		{
			question: 'What is considered technical SEO?',
			answer:
				'Technical SEO is everything that decides whether Google can crawl, render, index and understand a website: server responses, redirects, canonical tags, sitemaps and robots rules, page speed and Core Web Vitals, structured data, internal links and how JavaScript content is delivered. Content and links only count after this layer works.'
		},
		{
			question: 'Why is my SEO not working?',
			answer:
				'When good content does not rank, the cause is often technical: pages that are not indexed, a noindex tag left from development, canonicals pointing to the wrong URL, redirects lost in a migration or a site too slow on mobile. The first step is checking Google Search Console to see which of these is happening.'
		},
		{
			question: 'Do you only send a report, or do you fix the issues?',
			answer:
				'Both. I am a developer, so after the audit I can implement the fixes myself in the code, the theme or the CMS. If your team prefers to do the work, you get developer-ready tasks with the exact change, the reason and how to check it.'
		},
		{
			question: 'Is it worth hiring someone for technical SEO?',
			answer:
				'It is worth it when the problem is technical and costs traffic or leads: a site that is not indexed, a migration that lost rankings or pages that fail Core Web Vitals. In those cases, fixing the cause is faster and cheaper than producing more content that Google still cannot see.'
		},
		{
			question: 'Where are you based, and do you work with US companies?',
			answer:
				'I work remotely from Sorocaba, Brazil, in a time zone one to two hours ahead of US Eastern time, so working hours overlap with the US. Ranking Fixer takes projects from businesses and agencies in the United States and other English-speaking countries.'
		}
	];

	const jsonLd = pageGraph({ path, title, description, crumbs: [], faqs });
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero with-gauge">
		<p class="eyebrow">Technical SEO consultant and developer</p>
		<h1>Technical SEO fixes for sites that should be <em>ranking</em></h1>
		<p>
			Ranking Fixer finds the technical problems that keep a website out of Google, like pages that are
			not indexed, failing Core Web Vitals or a migration that broke redirects, and fixes them in the code.
			The diagnosis and the fix come from the same person.
		</p>
		<p>
			I am {person.name}, a full-stack developer and tech lead who has been building websites for more
			than ten years. I write production code every day, so the fixes I recommend are the fixes I can ship.
		</p>
		<div class="cta-row">
			<EmailCta {...email} />
			<a href={services.audit.path}>What a technical SEO audit covers</a>
		</div>
	</header>

	<section id="problems" aria-labelledby="problems-title">
		<h2 id="problems-title">What is keeping your site off Google?</h2>
		<p class="lead">Start with the symptom. Each page explains the usual causes and how I fix them.</p>
		<ul class="cards">
			{#each problems as problem (problem.href)}
				<li>
					<span class="tag">{problem.tag}</span>
					<h3><a href={problem.href}>{problem.title}</a></h3>
					<p>{problem.text}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section id="services" class="band" aria-labelledby="services-title">
		<h2 id="services-title">Technical SEO services</h2>
		<ul class="cards">
			<li>
				<h3><a href={services.audit.path}>{services.audit.name}</a></h3>
				<p>Crawl, Search Console data, rendering and speed, turned into a list of fixes ranked by impact.</p>
			</li>
			<li>
				<h3><a href={services.coreWebVitals.path}>{services.coreWebVitals.name}</a></h3>
				<p>LCP, INP and CLS fixed at the source: images, fonts, scripts, server response and layout.</p>
			</li>
			<li>
				<h3><a href={services.indexing.path}>{services.indexing.name}</a></h3>
				<p>Pages that Google crawls but will not index, redirect and canonical errors, soft 404s and 5xx.</p>
			</li>
			<li>
				<h3><a href={services.migration.path}>{services.migration.name}</a></h3>
				<p>Redirect maps and launch checks for redesigns, new platforms and domain changes, plus recovery.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="developer-title">
		<h2 id="developer-title">Why a developer, and not just a report</h2>
		<p>
			Most technical SEO audits end as a long document. Then the findings wait in a developer's queue,
			get misread, or are implemented halfway. Months later the same errors are still in Search Console.
		</p>
		<p>
			Ranking Fixer closes that gap. I audit the site, decide what matters for search and implement the
			fixes in the code, the theme or the CMS. When your team owns the code, I write the changes as
			tasks a developer can ship without guessing.
		</p>
		<ul class="checks">
			<li><strong>One person from diagnosis to fix:</strong> nothing is lost between the SEO and the developer.</li>
			<li><strong>Fixes ranked by impact:</strong> the first changes are the ones that move indexing and traffic.</li>
			<li><strong>Checked after launch:</strong> every fix is validated in Search Console and in real speed data.</li>
			<li><strong>No long contract:</strong> fix what is broken first, then decide if you need more.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="process-title">
		<h2 id="process-title">How it works</h2>
		<ol class="steps">
			<li><strong>Send the URL.</strong> Email the site and a line about what is wrong. I check it before replying.</li>
			<li><strong>Audit.</strong> With read access to Search Console, I find the technical causes and rank them by impact.</li>
			<li><strong>Fix.</strong> I implement the changes, or hand your developers tasks that are ready to ship.</li>
			<li><strong>Verify.</strong> Fixes are validated in Search Console, and speed is checked in field data.</li>
		</ol>
		<EmailCta {...email} />
	</section>

	<section id="industries" aria-labelledby="industries-title">
		<h2 id="industries-title">Who it is for</h2>
		<ul class="cards">
			<li>
				<span class="tag">Agencies</span>
				<h3><a href={industries.agencies.path}>{industries.agencies.name}</a></h3>
				<p>Technical audits and code-level fixes delivered under your agency's brand.</p>
			</li>
			<li>
				<span class="tag">Law firms</span>
				<h3><a href={industries.lawFirms.path}>{industries.lawFirms.name}</a></h3>
				<p>Practice area pages, multiple offices, attorney schema and redesigns that keep rankings.</p>
			</li>
			<li>
				<span class="tag">Online stores</span>
				<h3><a href={industries.ecommerce.path}>{industries.ecommerce.name}</a></h3>
				<p>Faceted navigation, product variants, unindexed collections and platform migrations.</p>
			</li>
			<li>
				<span class="tag">United Kingdom</span>
				<h3><a href={markets.uk.path}>{markets.uk.name}</a></h3>
				<p>Cookie banners that slow pages, UK and Ireland versions, VAT in product data, the British afternoon.</p>
			</li>
			<li>
				<span class="tag">Canada</span>
				<h3><a href={markets.canada.path}>{markets.canada.name}</a></h3>
				<p>Bilingual English and French sites, Canada and US targeting, Eastern time working hours.</p>
			</li>
			<li>
				<span class="tag">New Zealand</span>
				<h3><a href={markets.newZealand.path}>{markets.newZealand.name}</a></h3>
				<p>Sites serving New Zealand and Australia, slow overseas hosting, launches during NZ night.</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="proof-title">
		<h2 id="proof-title">The experience behind the fixes</h2>
		<p>
			Ranking Fixer is run by a developer who has built websites since 2015, first as a freelancer and today
			as a tech lead maintaining production platforms, not by a marketing team that outsources the code.
		</p>
		<ul class="cards">
			<li>
				<h3>CMS integrations across many sites</h3>
				<p>Headless CMS platforms and APIs that publish content to many websites at once, with the structure Google needs.</p>
			</li>
			<li>
				<h3>Performance optimization</h3>
				<p>Legacy systems rebuilt on modern frameworks, with images, scripts and servers tuned until pages load fast on phones.</p>
			</li>
			<li>
				<h3>Technical leadership</h3>
				<p>Coordinating an IT team through architecture, code review and releases, so fixes ship safely in real codebases.</p>
			</li>
			<li>
				<h3>Technical SEO built in</h3>
				<p>Indexing, structured data and Core Web Vitals planned from the first template, not patched in at the end.</p>
			</li>
		</ul>
		<p>
			More about the person behind the work on the <a href={aboutPage.path}>about page</a>.
		</p>
	</section>

	<section aria-labelledby="guides-title">
		<h2 id="guides-title">Technical SEO guides</h2>
		<p>Fix it yourself first, if you prefer. These guides explain the most common problems step by step.</p>
		<ul>
			<li><a href={guides.notShowing.path}>Why is my website not showing up on Google?</a></li>
			<li><a href={guides.crawledNotIndexed.path}>How to fix "Crawled - currently not indexed"</a></li>
			<li><a href={guides.cwvFailed.path}>How to fix "Core Web Vitals assessment failed"</a></li>
			<li><a href={guidesPage.path}>All technical SEO guides</a></li>
		</ul>
	</section>

	<Faq {faqs} />

	<Contact {email} />
</main>
