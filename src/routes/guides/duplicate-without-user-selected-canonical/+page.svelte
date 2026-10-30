<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.duplicateCanonical.path;
	const title = 'Duplicate Without User-Selected Canonical: How to Fix It | Ranking Fixer';
	const description =
		'Duplicate without user-selected canonical means Google found copies of a page and you never named the main URL. Find the copies and fix them at the source.';
	const email: Email = { subject: 'Duplicate without user-selected canonical', label: 'Have me check the duplicates' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.duplicateCanonical.name, path }
	];

	// Os três status de canonical do relatório de indexação, lado a lado
	const statuses = [
		[
			'Duplicate without user-selected canonical',
			'Copies of the page exist, none declares a canonical, and Google chose another URL',
			'Only if Google chose the wrong URL or the copies keep multiplying',
			'Declare the main URL and remove the copies at the source'
		],
		[
			'Duplicate, Google chose different canonical than user',
			'The page declares a canonical, but Google picked another URL',
			'Yes: your signals disagree',
			'Align canonical tags, redirects, internal links and the sitemap on one URL'
		],
		[
			'Alternate page with proper canonical tag',
			'The page points to a canonical that is indexed',
			'Usually not; Google says there is nothing to do',
			'Confirm the canonical is the page you want to rank'
		]
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Pick the main URL', text: 'One protocol, one host, one trailing slash rule and no parameters. Every other signal has to match this exact address.' },
		{ name: 'Redirect the copies that have no reason to exist', text: 'Send http to https, one host to the other (www or not) and old paths to the main URL with permanent 301 redirects. Google treats a redirect as a strong canonical signal.' },
		{ name: 'Add a self-referencing canonical tag', text: 'Every indexable page declares its own main URL with <link rel="canonical">. Copies that must stay reachable, like filtered or tracked URLs, point to the main one.' },
		{ name: 'Link only to the main URL', text: 'Menus, breadcrumbs, related links and buttons should use the canonical address, including the trailing slash rule.' },
		{ name: 'List only main URLs in the sitemap', text: 'The sitemap is a weak signal on its own, but a sitemap that lists the copies contradicts the canonical tag.' },
		{ name: 'Remove copies at the source', text: 'Strip tracking parameters from internal links, put staging behind a password and stop the CMS from generating archive pages nobody needs.' },
		{ name: 'Validate the fix', text: 'Click Validate fix in Search Console. The count falls as Google recrawls both the copies and the main URLs.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What does "Duplicate without user-selected canonical" mean?',
			answer:
				'It means Google found several URLs with the same content, the page in the report does not declare which version is the main one, and Google chose another URL as the canonical. The reported URL is left out of search results, and the version Google picked is shown instead.'
		},
		{
			question: 'Is "Duplicate without user-selected canonical" bad for SEO?',
			answer:
				'Not always. If Google chose the URL you would have chosen, the copy is simply left out. It costs you when Google picks the wrong version, such as an http or parameter URL, when links are split between copies, or when thousands of copies take crawling away from real pages.'
		},
		{
			question: 'Should every page have a canonical tag?',
			answer:
				'A self-referencing canonical tag on every indexable page is cheap insurance. It tells Google which version you prefer when parameters, tracking links or another host create copies you did not plan for.'
		},
		{
			question: 'Should I use a canonical tag or a 301 redirect?',
			answer:
				'Redirect when the copy has no reason to exist for visitors, like the http version or an old path. Use a canonical tag when the copy must stay reachable, like a tracking URL or a filtered list. Google treats both as strong signals; a sitemap alone is a weak one.'
		},
		{
			question: 'How long does it take for the status to clear?',
			answer:
				'Google has to recrawl the copies and the main URLs. On a small site that can take days; on a large site with many copies, weeks or months. Validation in Search Console typically takes up to about two weeks.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Duplicate Without User-Selected Canonical: How to Fix It' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Duplicate Without User-Selected Canonical: How to Fix It</h1>
		<p>
			"Duplicate without user-selected canonical" means Google found several URLs with the same content,
			none of them says which one is the main version, and Google picked another URL as the canonical. The
			page in the report is not shown in search. To fix it, name one main URL and make every signal point
			to it.
		</p>
		<p>
			Often nothing is lost, because Google chose a sensible version. It becomes a problem when Google keeps
			the wrong URL or the copies multiply by the thousand, which is where
			<a href={services.indexing.path}>indexing fixes in the code</a> come in.
		</p>
	</header>

	<section aria-labelledby="statuses-title">
		<h2 id="statuses-title">The three canonical statuses in Search Console</h2>
		<div class="table-wrap">
			<table>
				<caption>Canonical-related statuses in the Page indexing report</caption>
				<thead>
					<tr>
						<th scope="col">Status</th>
						<th scope="col">What happened</th>
						<th scope="col">Is it a problem?</th>
						<th scope="col">What to do</th>
					</tr>
				</thead>
				<tbody>
					{#each statuses as [status, happened, problem, todo] (status)}
						<tr>
							<th scope="row">{status}</th>
							<td>{happened}</td>
							<td>{problem}</td>
							<td>{todo}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p>
			Google's documentation describes the first status as a page that "is a duplicate of another page,
			although it doesn't indicate a preferred canonical page. Google has chosen the other page as the
			canonical for this page, and so will not serve this page in Search."
		</p>
	</section>

	<section class="band" aria-labelledby="sources-title">
		<h2 id="sources-title">Where the duplicate URLs come from</h2>
		<ul class="cards">
			<li>
				<h3>http and https, www and non-www</h3>
				<p>If more than one version answers with the page instead of redirecting, every page on the site exists two or four times.</p>
			</li>
			<li>
				<h3>Trailing slashes and letter case</h3>
				<p><code>/services</code> and <code>/services/</code> are different URLs to Google when both return the page.</p>
			</li>
			<li>
				<h3>Tracking and sort parameters</h3>
				<p>Campaign tags, referral codes and sort orders create a new address for the same content every time someone shares or sorts.</p>
			</li>
			<li>
				<h3>Filters on category pages</h3>
				<p>Each combination of color, size and price becomes a URL listing almost the same products.</p>
			</li>
			<li>
				<h3>Several paths to the same page</h3>
				<p>Print versions, tag and category paths, and pages reachable from more than one folder publish the same content twice.</p>
			</li>
			<li>
				<h3>Staging and extra hostnames</h3>
				<p>A staging site or a CDN hostname that Google can reach is a full copy of your site.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="inspect-title">
		<h2 id="inspect-title">How to see which URL Google chose</h2>
		<ul class="checks">
			<li><strong>Open URL Inspection</strong> for one of the example URLs in the report.</li>
			<li><strong>Compare the two canonical fields.</strong> "User-declared canonical" shows None for this status, which confirms the page declares no canonical. "Google-selected canonical" shows the URL Google kept.</li>
			<li><strong>If Google kept the right URL,</strong> the report is only telling you a copy exists. Remove the copy when you can; nothing is lost in the meantime.</li>
			<li><strong>If Google kept the wrong one,</strong> such as the http, parameter or staging version, follow the steps below.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix "Duplicate without user-selected canonical"</h2>
		<Steps {steps} />
	</section>

	<section aria-labelledby="ignored-title">
		<h2 id="ignored-title">When Google ignores your canonical tag</h2>
		<p>
			"Duplicate, Google chose different canonical than user" means the page declares a canonical but Google
			decided another URL is the better one. A canonical tag is a strong hint, not a command, and Google
			overrides it when other signals point elsewhere. The usual reasons:
		</p>
		<ul class="checks">
			<li>The canonical points to a page with different content, so Google does not treat them as the same.</li>
			<li>Internal links, redirects or the sitemap use another version of the URL.</li>
			<li>The canonical URL redirects, returns an error or is blocked from crawling.</li>
			<li>The page has two canonical tags, or JavaScript changes the one in the HTML.</li>
		</ul>
		<p>
			Line them up on one URL and the status usually clears after Google recrawls the pages. Google's own
			advice is not to point to different URLs with different methods, such as one URL in the sitemap and
			another in the canonical tag.
		</p>
	</section>

	<section class="band" aria-labelledby="context-title">
		<h2 id="context-title">Duplicates after a migration and on online stores</h2>
		<p>
			A move to https, a new domain or a new URL structure creates a full set of copies until the redirects
			and canonicals are right. That cleanup is part of every <a href={services.migration.path}>SEO website
			migration</a>. On online stores, filters, variants and product paths are the largest source of
			duplicate URLs, covered in <a href={industries.ecommerce.path}>ecommerce technical SEO</a>.
		</p>
		<p>
			Thousands of copies also slow down crawling of the pages that matter, which shows up in Search
			Console as <a href={guides.discoveredNotIndexed.path}>"Discovered - currently not indexed"</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about duplicate URLs and canonicals" />

	<Related
		links={[
			{ href: services.indexing.path, text: 'Google indexing fixes' },
			{ href: guides.discoveredNotIndexed.path, text: 'Discovered - currently not indexed' },
			{ href: guides.soft404.path, text: 'Soft 404 errors' },
			{ href: industries.ecommerce.path, text: 'Filters and variants on online stores' },
			{ href: services.migration.path, text: 'Canonicals and redirects in a migration' }
		]}
	/>

	<Contact {email} title="Google picked the wrong URL?" intro="Email the site and one example URL from the report. I reply with where the copies come from and how I would consolidate them." />
</main>
