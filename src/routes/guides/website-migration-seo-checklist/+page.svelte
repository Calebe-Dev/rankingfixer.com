<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.migrationChecklist.path;
	const title = 'Website Migration SEO Checklist: Before, On and After Launch | Ranking Fixer';
	const description =
		'A website migration SEO checklist for redesigns, new platforms and domain changes: what to save before, test on launch day and watch after, to keep rankings.';
	const email: Email = { subject: 'Website migration checklist', label: 'Have me review your migration' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.migrationChecklist.name, path }
	];

	const before = [
		['Export every URL that matters', 'From Search Console (pages with clicks or impressions in the last 16 months), analytics, a full crawl, the old sitemap and a backlink tool.'],
		['Save a benchmark', 'Clicks, impressions and positions for the main pages and queries, plus a full crawl of the old site. You will compare against it after launch.'],
		['Build the redirect map', 'One row per old URL with its closest new equivalent. One 301 each, no chains, nothing sent to the home page in bulk.'],
		['Keep what ranks', 'Pages, headings and text that bring traffic stay, or move to an equivalent page. Cutting them is the most common cause of lost rankings.'],
		['Protect staging with a password', 'Not with robots.txt or noindex, which get copied to production on launch day.'],
		['Crawl staging before launch', 'Titles, canonicals, internal links, structured data, hreflang, status codes and whether the content is in the HTML without JavaScript.'],
		['Check speed on the new templates', 'Run the main templates through PageSpeed Insights. A slower site loses close rankings even with perfect redirects.']
	];

	const launch = [
		['Remove the staging protection', 'Password, noindex tags, X-Robots-Tag headers and Disallow rules from the development setup.'],
		['Turn on the redirects and test them in bulk', 'Every old URL from the map should answer 301 to the right new URL, which answers 200.'],
		['Update internal links', 'Menus, footers and content should link to the new URLs directly, not through redirects.'],
		['Publish the new sitemap and submit it', 'Only the new canonical URLs. Keep the old sitemap available for a few weeks too, so Google recrawls the redirects faster.'],
		['Use Change of Address for a new domain', 'In Search Console, from the old domain property, once the redirects are live.'],
		['Inspect the key pages', 'URL Inspection with Test live URL on the home page and a page from each template.']
	];

	const after = [
		['Week 1: watch errors daily', '404s, server errors and redirect problems in Search Console and server logs. Fix each broken redirect the day it appears.'],
		['Weeks 1 to 4: compare with the benchmark', 'Clicks per page and query against the saved numbers. Pages that lost the most traffic show where a redirect or content is missing.'],
		['Weeks 2 to 8: watch indexing', 'The Page indexing report should shift from old URLs to new ones. Growth in "crawled but not indexed" on new templates points to thin or duplicate pages.'],
		['Keep the redirects', 'At least a year, and longer for URLs with backlinks. Removing them later breaks the links that still point to the old site.']
	];

	const test = `# redirects.csv: old URL,expected new URL
while IFS=, read -r old new; do
  got=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "$old")
  [ "$got" = "301 $new" ] || echo "CHECK $old -> $got (expected 301 $new)"
done < redirects.csv`;

	const faqs: FaqItem[] = [
		{
			question: 'Will I lose SEO rankings if I migrate my website?',
			answer:
				'A short dip of a few weeks is normal while Google recrawls the site. A lasting drop almost always comes from fixable mistakes: missing redirects, removed content, a noindex left from staging, or a slower or JavaScript-heavy new site. With a redirect map and a pre-launch crawl, most sites keep their rankings.'
		},
		{
			question: 'How long do 301 redirects need to stay after a migration?',
			answer:
				'Google recommends keeping them for at least a year. Keep redirects for URLs that have backlinks for as long as you control the old domain, because those links keep sending visitors and signals through them.'
		},
		{
			question: 'How long does SEO take to recover after a website migration?',
			answer:
				'A clean migration usually settles within two to six weeks. Large sites and domain changes take longer, often a few months. After a broken migration, the clock starts when the redirects and lost content are fixed.'
		},
		{
			question: 'Should I change URLs when redesigning a website?',
			answer:
				'Only when there is a clear reason, like a new platform that forces a different structure or URLs that are genuinely confusing. Keeping URLs removes the biggest risk of a redesign. When they must change, map every old URL to its new equivalent.'
		},
		{
			question: 'What is the most common SEO mistake in a website migration?',
			answer:
				'Missing or wrong redirects, especially sending every old URL to the home page. Close behind come a noindex or robots.txt block copied from the staging site, and pages that ranked being cut or merged into thinner ones.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Website Migration SEO Checklist: Before, On and After Launch' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Website Migration SEO Checklist: Before, On and After Launch</h1>
		<p>
			Most traffic lost in a website migration is lost for predictable reasons: old URLs without redirects,
			content that ranked and was cut, a noindex left from staging, or a new site Google cannot read as well.
			This checklist covers redesigns, platform changes like WordPress to Shopify, and domain changes, in the
			order the work happens.
		</p>
	</header>

	{#each [{ id: 'before', heading: 'Before launch', items: before, band: false }, { id: 'launch', heading: 'On launch day', items: launch, band: true }, { id: 'after', heading: 'After launch', items: after, band: false }] as group (group.id)}
		<section class:band={group.band} aria-labelledby={`${group.id}-title`}>
			<h2 id={`${group.id}-title`}>{group.heading}</h2>
			<ul class="checks">
				{#each group.items as [item, detail] (item)}
					<li><strong>{item}:</strong> {detail}</li>
				{/each}
			</ul>
			{#if group.id === 'launch'}
				<p>A short script tests the whole redirect map against the live site and prints only the URLs that fail:</p>
				<pre><code>{test}</code></pre>
			{/if}
		</section>
	{/each}

	<section class="band" aria-labelledby="drop-title">
		<h2 id="drop-title">Traffic already dropped after a migration?</h2>
		<p>
			Start with the pages that lost the most clicks in Search Console, comparing the four weeks before and
			after launch. For each one, check whether the old URL redirects to the right page, whether the content
			survived, and whether the new page is indexed. Old URLs reported as 404 and new pages stuck in
			<a href={guides.crawledNotIndexed.path}>"Crawled - currently not indexed"</a> are the usual findings.
			If the whole site vanished, go through <a href={guides.disappeared.path}>website disappeared from
			Google</a> first.
		</p>
		<p>
			Fixing a migration that already broke is what the <a href={services.migration.path}>SEO website
			migration service</a> is for; online stores changing platform have their own risks in
			<a href={industries.ecommerce.path}>ecommerce technical SEO</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about website migrations and SEO" />

	<Related
		links={[
			{ href: services.migration.path, text: 'SEO website migration and recovery' },
			{ href: guides.excludedNoindex.path, text: 'A noindex left from staging' },
			{ href: guides.blockedRobots.path, text: 'robots.txt rules copied to production' },
			{ href: guides.duplicateCanonical.path, text: 'Duplicate URLs after a move to https' },
			{ href: guides.hreflang.path, text: 'Hreflang on international migrations' }
		]}
	/>

	<Contact {email} title="Migrating soon, or lost traffic after one?" intro="Email the site, the launch date and what is changing. I reply with the risks I see and what to check first." />
</main>
