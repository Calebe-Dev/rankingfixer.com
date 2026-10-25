<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, industries, services, type Email } from '$lib/site';

	const path = services.audit.path;
	const title = 'Technical SEO Audit Service with Fixes | Ranking Fixer';
	const description =
		'Technical SEO audit service: crawling, indexing, rendering and Core Web Vitals, ranked by impact and then fixed in the code by a developer.';
	const email: Email = { subject: 'Technical SEO audit request', label: 'Request a technical SEO audit' };

	const crumbs = [{ name: services.audit.name, path }];

	const steps: Step[] = [
		{ name: 'Collect the data', text: 'Read access to Google Search Console, plus analytics and server logs when available, shows what Google actually sees.' },
		{ name: 'Crawl the site', text: 'A full crawl maps every URL, status code, redirect, canonical, internal link and duplicate.' },
		{ name: 'Check rendering', text: 'Key templates are rendered like Googlebot does, to confirm that content and links exist without user interaction.' },
		{ name: 'Measure speed', text: 'Core Web Vitals are checked in field data from real visitors, then traced to the code that causes them.' },
		{ name: 'Rank the issues', text: 'Each problem gets an impact, an effort and the exact fix, so the first changes are the ones that matter.' },
		{ name: 'Fix and verify', text: 'I implement the fixes or hand them to your developers, then validate them in Search Console.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What does a technical SEO audit include?',
			answer:
				'It covers crawling, indexing, rendering of JavaScript content, status codes and redirects, canonical tags and duplicate pages, sitemaps and robots rules, internal linking and site architecture, Core Web Vitals and page speed, structured data, mobile usability and, for international sites, hreflang. Each finding comes with the affected URLs, the cause and the fix.'
		},
		{
			question: 'How long does a technical SEO audit take?',
			answer:
				'A site with up to a few hundred pages usually takes about a week from the moment I have access. Large online stores, sites with complex JavaScript rendering or several languages take longer. You get the timeline before the work starts.'
		},
		{
			question: 'How much does a technical SEO audit cost?',
			answer:
				'The price depends on the size of the site, the platform and whether you want the fixes implemented. I look at the site first and send a quote before any work starts.'
		},
		{
			question: 'Is technical SEO part of on-page SEO?',
			answer:
				'They overlap but are not the same. On-page SEO is about the content of each page, like titles, headings and text. Technical SEO is about the site as a system: whether Google can crawl, render and index the pages at all, and how fast they load. A technical audit checks on-page elements only where they break indexing, such as missing titles or duplicate pages.'
		},
		{
			question: 'Can a free SEO audit tool replace a technical audit?',
			answer:
				'Free tools are useful to spot obvious errors, but they flag hundreds of warnings without saying which ones cost traffic. They also do not see Search Console data or how Google renders your pages. An audit decides what matters for your site and what can be ignored.'
		},
		{
			question: 'What access do you need?',
			answer:
				'Read access to Google Search Console is the minimum. Analytics, server logs and access to the CMS or the code repository help, and are needed if you want me to implement the fixes.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		howTo: { name: 'How a technical SEO audit is done', steps },
		service: {
			name: services.audit.name,
			serviceType: 'Technical SEO audit',
			description
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Technical SEO Audit Service with Fixes</h1>
		<p>
			A technical SEO audit finds what stops Google from crawling, indexing and ranking your pages. Mine
			does not end in a PDF: every issue comes with its impact and the exact fix, and I can implement the
			fixes myself as the developer who wrote the audit.
		</p>
		<p>
			It is the right first step when traffic dropped and nobody knows why, when Search Console keeps
			reporting errors, or before investing more in content and links.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="includes-title">
		<h2 id="includes-title">What the technical SEO audit includes</h2>
		<div class="table-wrap">
			<table>
				<caption>Areas checked in the audit and the problems they usually reveal</caption>
				<thead>
					<tr>
						<th scope="col">Area</th>
						<th scope="col">What is checked</th>
						<th scope="col">Common problem found</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Indexing</th>
						<td>Search Console page indexing report, noindex, robots.txt</td>
						<td>Important pages excluded or "crawled - currently not indexed"</td>
					</tr>
					<tr>
						<th scope="row">Crawling</th>
						<td>Status codes, redirect chains, crawl traps, parameters</td>
						<td>Budget wasted on filters, duplicates and old URLs</td>
					</tr>
					<tr>
						<th scope="row">Rendering</th>
						<td>Content and links in the HTML Google renders</td>
						<td>JavaScript sites that show Google an empty page</td>
					</tr>
					<tr>
						<th scope="row">Duplicates</th>
						<td>Canonical tags, HTTP and HTTPS, www, trailing slashes</td>
						<td>Google choosing a different canonical than yours</td>
					</tr>
					<tr>
						<th scope="row">Architecture</th>
						<td>Internal links, click depth, orphan pages, sitemaps</td>
						<td>Service pages buried five clicks deep or not linked at all</td>
					</tr>
					<tr>
						<th scope="row">Speed</th>
						<td>Core Web Vitals in field data: LCP, INP and CLS</td>
						<td>Hero images, fonts and third-party scripts slowing mobile</td>
					</tr>
					<tr>
						<th scope="row">Structured data</th>
						<td>Schema markup validity and match with visible content</td>
						<td>Errors that block rich results or markup that misleads</td>
					</tr>
					<tr>
						<th scope="row">International</th>
						<td>hreflang, language and country targeting</td>
						<td>Wrong language version ranking in each country</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="how-title">
		<h2 id="how-title">How the audit is done</h2>
		<Steps {steps} />
	</section>

	<section aria-labelledby="deliverables-title">
		<h2 id="deliverables-title">What you get</h2>
		<ul class="checks">
			<li><strong>A written report</strong> with every issue, example URLs, the cause and the fix, in plain English.</li>
			<li><strong>A plan ranked by impact and effort</strong>, so the first week of work moves the needle.</li>
			<li><strong>Developer-ready tasks</strong> for your team, or the fixes implemented by me in the code, theme or CMS.</li>
			<li><strong>Verification</strong> of every fix in Search Console, and Core Web Vitals checked in real-user data.</li>
		</ul>
		<p>
			The audit looks at the technical layer. Content and links are reviewed only where they break
			indexing, such as thin duplicate pages or internal links that point to redirects.
		</p>
	</section>

	<section class="band" aria-labelledby="when-title">
		<h2 id="when-title">When you need a technical SEO audit</h2>
		<ul class="cards">
			<li>
				<h3>Traffic dropped</h3>
				<p>Organic traffic fell and there was no obvious change in content or links.</p>
			</li>
			<li>
				<h3>Before or after a migration</h3>
				<p>A redesign, new platform or new domain. See the <a href={services.migration.path}>SEO migration service</a>.</p>
			</li>
			<li>
				<h3>Search Console errors keep growing</h3>
				<p>More pages excluded every month. See <a href={services.indexing.path}>Google indexing fixes</a>.</p>
			</li>
			<li>
				<h3>Before spending on content</h3>
				<p>New articles and links do not help pages that Google cannot index or load.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="js-title">
		<h2 id="js-title">Technical SEO audits for JavaScript websites</h2>
		<p>
			Sites built with Angular, React, Vue or Svelte can look perfect in a browser and still show Google
			an almost empty page. The audit compares the HTML that Google renders with what visitors see and
			checks server-side rendering or prerendering. I build Angular and Svelte applications in production, so the
			fix goes beyond "add SSR" to the change that works in your codebase.
		</p>
	</section>

	<Faq {faqs} title="Technical SEO audit questions" />

	<Related
		links={[
			{ href: services.coreWebVitals.path, text: 'Core Web Vitals optimization' },
			{ href: services.indexing.path, text: 'Fix pages not indexed by Google' },
			{ href: industries.agencies.path, text: 'White label audits for agencies' },
			{ href: guides.notShowing.path, text: 'Website not showing up on Google' }
		]}
	/>

	<Contact {email} title="Request a technical SEO audit" />
</main>
