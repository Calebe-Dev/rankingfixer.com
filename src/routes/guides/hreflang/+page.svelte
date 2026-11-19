<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, markets, services, type Email } from '$lib/site';

	const path = guides.hreflang.path;
	const title = 'Hreflang Tags: How to Set Them Up and Fix Common Errors | Ranking Fixer';
	const description =
		'How hreflang tags work, the correct codes for US, UK, Canada and Australia, three ways to add them, and the errors that make the wrong version rank.';
	const email: Email = { subject: 'Hreflang setup', label: 'Have me check your hreflang' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.hreflang.name, path }
	];

	const tags = `<!-- The same block goes on all three pages -->
<link rel="alternate" hreflang="en-us" href="https://example.com/pricing" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/uk/pricing" />
<link rel="alternate" hreflang="fr-ca" href="https://example.com/fr-ca/pricing" />
<link rel="alternate" hreflang="x-default" href="https://example.com/pricing" />`;

	const sitemap = `<url>
  <loc>https://example.com/pricing</loc>
  <xhtml:link rel="alternate" hreflang="en-us" href="https://example.com/pricing" />
  <xhtml:link rel="alternate" hreflang="en-gb" href="https://example.com/uk/pricing" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/pricing" />
</url>
<!-- repeat a <url> entry for /uk/pricing with the same links -->`;

	// [erro, sintoma, correção]
	const errors = [
		['No return link', 'Page A lists page B, but B does not list A, so Google ignores the pair', 'Put the same complete block on every page of the set'],
		['Wrong codes', 'en-UK, en-EU or es-LA are not valid and are ignored', 'Language in ISO 639-1, region in ISO 3166-1: en-GB, es-MX'],
		['Region without language', 'hreflang="gb" is ignored', 'Always start with the language: en-gb'],
		['Pointing to redirects or 404s', 'The alternate URL is not a real page', 'Use the final, indexable 200 URL of each version'],
		['Canonical to another language', 'Each version declares the US page as canonical, so only one is indexed', 'Every version is canonical to itself'],
		['Missing self-reference', 'The page lists the others but not itself', 'Include the page\'s own URL in its block'],
		['Mixed methods that disagree', 'HTML says one thing, the sitemap another', 'Pick one method and generate it from one source']
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'List the sets of equivalent pages', text: 'Hreflang connects versions of the same page. The US pricing page, the UK pricing page and the French Canadian pricing page are one set.' },
		{ name: 'Choose the codes', text: 'Language alone (en, fr) when the page serves every country that speaks it; language plus region (en-gb, fr-ca) when prices, spelling or laws differ by country.' },
		{ name: 'Add x-default', text: 'The page for visitors who match no listed version, often the main English version or a country selector.' },
		{ name: 'Pick one method', text: 'HTML link tags for most sites, the XML sitemap for large sites, HTTP headers for PDFs and other files.' },
		{ name: 'Generate it from one source', text: 'Hreflang written by hand breaks as pages are added. The CMS, a plugin or the build should produce every block from the same list.' },
		{ name: 'Check with a crawler', text: 'Screaming Frog and the main audit tools report missing return links, invalid codes and non-200 alternates across the whole site.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What is hreflang used for?',
			answer:
				'Hreflang tells Google which version of a page to show to people in each language or country. It does not improve rankings by itself; it makes sure that someone in London gets the UK page with prices in pounds instead of the US page, when both exist.'
		},
		{
			question: 'Is it en-UK or en-GB in hreflang?',
			answer:
				'en-GB. Region codes follow ISO 3166-1, where the United Kingdom is GB. en-UK is not a valid code and Google ignores it. Codes are not case-sensitive, so en-gb works too.'
		},
		{
			question: 'Do I need hreflang for a site in one language?',
			answer:
				'No. Hreflang is only for pages that exist in several language or country versions. A site in English only, even with visitors in many countries, does not need it.'
		},
		{
			question: 'Does hreflang need to be on every page?',
			answer:
				'On every page that has alternate versions, yes, and each page must list all the versions, including itself. Pages with no equivalent in another language do not need it.'
		},
		{
			question: 'How do I check hreflang errors in Google Search Console?',
			answer:
				'Google retired the International Targeting report, which used to show hreflang errors, in 2022. Use a crawler like Screaming Frog or an audit tool to find missing return links and invalid codes, and URL Inspection to see which canonical Google chose for each version.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Hreflang Tags: How to Set Them Up and Fix Common Errors' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Hreflang Tags: How to Set Them Up and Fix Common Errors</h1>
		<p>
			Hreflang tags tell Google that several pages are versions of the same content for different languages
			or countries, so it can show each searcher the right one. They only work when every version lists all
			the others and itself, with valid codes, pointing to indexable pages.
		</p>
		<p>
			When hreflang is missing or broken, the symptom is the wrong version ranking: the US page showing in
			the UK, or the English page in Quebec.
		</p>
	</header>

	<section aria-labelledby="tags-title">
		<h2 id="tags-title">What hreflang tags look like</h2>
		<pre><code>{tags}</code></pre>
		<p>
			Each line names one version. The block is identical on every page of the set, which is what makes the
			links reciprocal. <code>x-default</code> is the fallback for anyone who matches none of the listed
			versions.
		</p>
	</section>

	<section class="band" aria-labelledby="codes-title">
		<h2 id="codes-title">Codes for the most common English and French markets</h2>
		<div class="table-wrap">
			<table>
				<caption>Valid hreflang values by market</caption>
				<thead>
					<tr>
						<th scope="col">Market</th>
						<th scope="col">hreflang</th>
						<th scope="col">Common mistake</th>
					</tr>
				</thead>
				<tbody>
					<tr><th scope="row">United States</th><td><code>en-us</code></td><td><code>us</code> alone</td></tr>
					<tr><th scope="row">United Kingdom</th><td><code>en-gb</code></td><td><code>en-uk</code></td></tr>
					<tr><th scope="row">Ireland</th><td><code>en-ie</code></td><td>Sharing the UK page without a tag</td></tr>
					<tr><th scope="row">Canada, English</th><td><code>en-ca</code></td><td>Only the French version tagged</td></tr>
					<tr><th scope="row">Canada, French</th><td><code>fr-ca</code></td><td><code>fr</code>, which also targets France</td></tr>
					<tr><th scope="row">Australia</th><td><code>en-au</code></td><td>Reusing the UK page for Australia</td></tr>
					<tr><th scope="row">New Zealand</th><td><code>en-nz</code></td><td>Sending NZ to the Australian page</td></tr>
					<tr><th scope="row">Any English speaker</th><td><code>en</code></td><td>Combining it with every country code needlessly</td></tr>
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="setup-title">
		<h2 id="setup-title">How to set up hreflang</h2>
		<Steps {steps} />
		<p>For large sites, the same information can live in the XML sitemap instead of the pages:</p>
		<pre><code>{sitemap}</code></pre>
	</section>

	<section class="band" aria-labelledby="errors-title">
		<h2 id="errors-title">Common hreflang errors and how to fix them</h2>
		<div class="table-wrap">
			<table>
				<caption>Hreflang errors, what they cause and the fix</caption>
				<thead>
					<tr>
						<th scope="col">Error</th>
						<th scope="col">What happens</th>
						<th scope="col">Fix</th>
					</tr>
				</thead>
				<tbody>
					{#each errors as [error, what, fix] (error)}
						<tr>
							<th scope="row">{error}</th>
							<td>{what}</td>
							<td>{fix}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p>
			A canonical pointing across languages is the most damaging of these: Google keeps one version and
			drops the rest, reported in Search Console as <a href={guides.duplicateCanonical.path}>"Duplicate,
			Google chose different canonical than user"</a>.
		</p>
	</section>

	<section aria-labelledby="markets-title">
		<h2 id="markets-title">When you do not need hreflang</h2>
		<p>
			Hreflang is for equivalent pages. Pages written for different markets that are not translations of each
			other do not form a set. This site has separate pages for the
			<a href={markets.uk.path}>UK</a>, <a href={markets.canada.path}>Canada</a> and
			<a href={markets.newZealand.path}>New Zealand</a>, each written for its own market, so each one declares
			only its own language and region instead of pointing to the others.
		</p>
		<p>
			The UK and Canada pages cover the market-specific cases in depth: sites for the UK and Ireland, and
			bilingual English and French sites selling into Quebec.
		</p>
	</section>

	<Faq {faqs} title="Questions about hreflang" />

	<Related
		links={[
			{ href: markets.uk.path, text: 'UK and Ireland site setups' },
			{ href: markets.canada.path, text: 'Bilingual English and French sites' },
			{ href: guides.duplicateCanonical.path, text: 'Canonical conflicts between versions' },
			{ href: guides.migrationChecklist.path, text: 'Adding countries in a migration' },
			{ href: services.audit.path, text: 'Technical SEO audit for international sites' }
		]}
	/>

	<Contact {email} title="The wrong country version ranks?" intro="Email the site and the countries or languages it serves. I reply with what Google sees in your hreflang and what to fix." />
</main>
