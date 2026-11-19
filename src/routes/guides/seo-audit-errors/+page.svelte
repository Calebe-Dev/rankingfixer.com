<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.auditErrors.path;
	const title = 'SEO Audit Errors: Which to Fix First (Semrush, Ahrefs) | Ranking Fixer';
	const description =
		'Your SEO audit tool lists hundreds of errors. Which ones cost rankings, which can wait and which to ignore, with the order to fix them in.';
	const email: Email = { subject: 'Fixing my SEO audit errors', label: 'Send me your audit report' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.auditErrors.name, path }
	];

	// [aviso da ferramenta, prioridade, por quê]
	const fixNow = [
		['5xx server errors', 'Googlebot gets the same errors; enough of them and Google slows down crawling the whole site.'],
		['Redirect loops and redirects to 4xx', 'The page cannot be reached at all, by visitors or by Google.'],
		['Canonical pointing to a redirect, a 404 or a noindex page', 'Google ignores the canonical or drops the page you meant to keep.'],
		['Important pages with noindex or blocked by robots.txt', 'Those pages cannot rank. Check each one is meant to be hidden.'],
		['Broken internal links to pages that matter', 'Visitors hit dead ends and the linked pages lose the signal.'],
		['Hreflang errors on international sites', 'The wrong country or language version ranks.']
	];
	const fixSoon = [
		['Duplicate title tags and meta descriptions', 'Usually a template or parameter problem; one fix solves hundreds.'],
		['Redirect chains', 'Each hop adds delay and risk; point links straight to the final URL.'],
		['Orphan pages', 'Pages no link points to are found late and judged unimportant.'],
		['Sitemap with redirects, 404s or noindex URLs', 'It weakens the trust Google gives the sitemap.'],
		['Invalid structured data', 'Loses rich results and confuses what the page is about.'],
		['HTTP pages or mixed content', 'Browsers warn visitors; duplicates appear between http and https.']
	];
	const ignore = [
		['Low text-to-HTML ratio', 'Not a Google signal.'],
		['Low word count', 'Length is not a ranking factor; whether the page answers the search is.'],
		['Multiple H1 tags', 'Google handles several H1s without a problem.'],
		['Title or meta description slightly too long', 'Google shortens or rewrites them; fix only the important pages.'],
		['Too many on-page links', 'An old guideline Google dropped years ago.'],
		['Unminified CSS or JavaScript', 'Matters only if field Core Web Vitals fail; check those instead.']
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Export the issues with their URLs', text: 'Every tool lets you export each warning with the affected pages. Work from the list, not from the health score.' },
		{ name: 'Cross it with Search Console', text: 'Keep the pages that get impressions or clicks, plus the ones meant to rank. An error on a page nobody can find costs nothing today.' },
		{ name: 'Group by template', text: 'Product pages, articles, categories, filters. Ninety duplicate titles on product pages are one template fix, not ninety edits.' },
		{ name: 'Fix in the order of the tables', text: 'First what blocks crawling and indexing, then what splits signals, then the cosmetic warnings if there is time.' },
		{ name: 'Confirm with Google, not with the tool', text: 'Run URL Inspection on a fixed page and watch the Page indexing report. The tool saying "fixed" does not mean Google saw it yet.' },
		{ name: 'Recrawl and compare', text: 'Run the same audit again after the fixes and compare issue counts by type, not the overall score.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'Do I need to fix every error in an SEO audit?',
			answer:
				'No. Audit tools flag everything they can measure, and many warnings have no effect on Google. Fix what blocks crawling and indexing first, then what creates duplicate or conflicting signals, and treat cosmetic warnings like text-to-HTML ratio or multiple H1 tags as optional.'
		},
		{
			question: 'Does the Semrush or Ahrefs site health score affect rankings?',
			answer:
				'No. The health score is the tool\'s own metric, built from the warnings it counts. Google never sees it. A site can score 95 and have its main pages blocked, or score 70 and rank well. Use the score to track progress on the same site, not as a goal.'
		},
		{
			question: 'Why does Search Console show different errors than my audit tool?',
			answer:
				'Search Console reports what Google actually found when it crawled and tried to index your pages. Audit tools crawl the site with their own bot and rules. When the two disagree about indexing, Search Console is the source of truth; the tools are better at finding site-wide patterns like broken links and duplicate titles.'
		},
		{
			question: 'How often should I run an SEO audit?',
			answer:
				'A full audit once or twice a year, and a crawl before and after any redesign, migration or platform change. A scheduled monthly crawl catches new broken links and redirects before they pile up.'
		},
		{
			question: 'Can I fix SEO audit errors myself?',
			answer:
				'Many, yes: titles, meta descriptions, broken links and sitemap settings are usually changes in the CMS. Errors in templates, redirects, rendering, server responses and structured data often need a developer, which is where audits tend to stall.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'SEO Audit Errors: Which to Fix First' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>SEO Audit Errors: Which to Fix First</h1>
		<p>
			Semrush, Ahrefs and Screaming Frog flag hundreds of issues on almost any site, and only a few of them
			cost rankings. Fix first what stops Google from crawling and indexing your important pages, then what
			sends Google conflicting signals, and leave cosmetic warnings for last or ignore them.
		</p>
		<p>The tables below sort the most common warnings into those three groups.</p>
	</header>

	<section aria-labelledby="now-title">
		<h2 id="now-title">Fix now: errors that block crawling or indexing</h2>
		<div class="table-wrap">
			<table>
				<caption>Audit issues that cost rankings directly</caption>
				<thead>
					<tr>
						<th scope="col">Issue in the tool</th>
						<th scope="col">Why it matters</th>
					</tr>
				</thead>
				<tbody>
					{#each fixNow as [issue, why] (issue)}
						<tr>
							<th scope="row">{issue}</th>
							<td>{why}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="soon-title">
		<h2 id="soon-title">Fix soon: issues that split or weaken signals</h2>
		<div class="table-wrap">
			<table>
				<caption>Audit issues worth fixing after the blocking ones</caption>
				<thead>
					<tr>
						<th scope="col">Issue in the tool</th>
						<th scope="col">Why it matters</th>
					</tr>
				</thead>
				<tbody>
					{#each fixSoon as [issue, why] (issue)}
						<tr>
							<th scope="row">{issue}</th>
							<td>{why}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="ignore-title">
		<h2 id="ignore-title">Usually safe to ignore</h2>
		<div class="table-wrap">
			<table>
				<caption>Audit warnings with little or no effect on Google rankings</caption>
				<thead>
					<tr>
						<th scope="col">Warning in the tool</th>
						<th scope="col">Why it can wait</th>
					</tr>
				</thead>
				<tbody>
					{#each ignore as [issue, why] (issue)}
						<tr>
							<th scope="row">{issue}</th>
							<td>{why}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="steps-title">
		<h2 id="steps-title">How to work through an audit report</h2>
		<Steps {steps} />
	</section>

	<section aria-labelledby="tools-title">
		<h2 id="tools-title">Semrush, Ahrefs and Screaming Frog: what each is good at</h2>
		<ul class="checks">
			<li><strong>Semrush Site Audit:</strong> clear grouping into errors, warnings and notices, and good for tracking a site over time. Its thresholds for "too long" and "too few words" are conservative.</li>
			<li><strong>Ahrefs Site Audit:</strong> strong on internal links, redirects and orphan pages, and shows which issues are new since the last crawl.</li>
			<li><strong>Screaming Frog SEO Spider:</strong> runs on your computer and shows the raw data for every URL, which makes it the best tool for finding the template behind an issue. Free up to 500 URLs.</li>
		</ul>
		<p>
			None of them knows what Google decided about your pages. That is in Search Console, starting with the
			Page indexing report and guides like <a href={guides.crawledNotIndexed.path}>crawled but not indexed</a>
			and <a href={guides.duplicateCanonical.path}>duplicate without user-selected canonical</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about SEO audit errors" />

	<Related
		links={[
			{ href: services.audit.path, text: 'Technical SEO audit with the fixes done' },
			{ href: industries.agencies.path, text: 'Audit fixes for agencies, white label' },
			{ href: guides.rankHigher.path, text: 'How to rank higher on Google' },
			{ href: guides.cwvFailed.path, text: 'Core Web Vitals assessment failed' },
			{ href: services.indexing.path, text: 'Google indexing fixes' }
		]}
	/>

	<Contact {email} title="Have an audit report and no one to fix it?" intro="Email the site and the report or a screenshot of the issue list. I reply with which errors matter for your site and what fixing them involves." />
</main>
