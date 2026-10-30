<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.crawledNotIndexed.path;
	const title = 'Crawled - Currently Not Indexed: How to Fix It | Ranking Fixer';
	const description =
		'What "Crawled - currently not indexed" means in Search Console, how it differs from "Discovered", and how to get those pages indexed.';
	const email: Email = { subject: 'Crawled - currently not indexed', label: 'Have me look at your report' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.crawledNotIndexed.name, path }
	];

	const steps: Step[] = [
		{ name: 'Export the examples', text: 'In the Page indexing report, open "Crawled - currently not indexed" and export the list of URLs.' },
		{ name: 'Separate the pages that do not matter', text: 'Feeds, paginated pages, tag archives, filtered URLs and old parameters can stay out of the index. Focus on pages that should bring traffic.' },
		{ name: 'Group the rest by template', text: 'Products, locations, articles or categories. When one template fails, the cause is usually in the template, not in each page.' },
		{ name: 'Compare each page with what is already indexed', text: 'If a page says nearly the same as another page on your site, or as many pages elsewhere, Google has little reason to keep both.' },
		{ name: 'Improve, merge or remove', text: 'Add what only this page offers, merge near-duplicates into one stronger page with a 301 redirect, or noindex pages that should not rank.' },
		{ name: 'Link to the pages you keep', text: 'Add internal links from pages that are indexed and visited, like the home page, menus, categories and related articles.' },
		{ name: 'Clean the sitemap', text: 'List only canonical pages you want indexed. A sitemap full of weak URLs lowers the trust Google gives to the rest.' },
		{ name: 'Validate the fix', text: 'Click Validate fix in Search Console. Indexing changes over weeks, not days, so track the count of indexed pages per template.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What does "Crawled - currently not indexed" mean?',
			answer:
				'It means Googlebot visited the page and decided not to add it to the index, at least for now. The page is not blocked and has no error; Google simply did not find enough reason to show it in search results. Google may index it later, especially if the page or the site improves.'
		},
		{
			question: 'Is "Crawled - currently not indexed" a penalty?',
			answer:
				'No. It is a normal status that every large site has. It becomes a problem only when it affects pages meant to rank, like services, products or main articles, or when a large share of the site falls into it.'
		},
		{
			question: 'Should I request indexing for every page?',
			answer:
				'No. Requesting indexing helps when Google has not visited a page yet. For pages Google already crawled and rejected, a new request repeats the same decision. Fix the page or the links to it first, then request indexing for the most important URLs.'
		},
		{
			question: 'Why did validation fail for "Crawled - currently not indexed"?',
			answer:
				'Validation fails as soon as Google rechecks one of the sample URLs and still does not index it. It does not mean nothing improved. Check the failing examples, fix them, and start the validation again.'
		},
		{
			question: 'How long does it take for a crawled page to get indexed?',
			answer:
				'After a page is improved and linked, Google can index it within days or take several weeks, depending on how often it crawls the site. Pages on new or small sites, like many on Wix and Squarespace, often wait longer because Google visits them less.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Crawled - Currently Not Indexed: How to Fix It' },
		howTo: { name: 'How to fix "Crawled - currently not indexed"', steps }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Crawled - Currently Not Indexed: How to Fix It</h1>
		<p>
			"Crawled - currently not indexed" means Google visited the page and chose not to keep it in its
			index. Nothing is blocking it; Google decided the page was not worth showing yet, usually because it
			repeats content that is already indexed, offers little of its own or is barely linked from the rest
			of the site.
		</p>
		<p>The fix is in the page and in the site around it, not in requesting indexing again.</p>
	</header>

	<section aria-labelledby="vs-title">
		<h2 id="vs-title">Crawled vs discovered - currently not indexed</h2>
		<div class="table-wrap">
			<table>
				<caption>The two most common "not indexed" statuses in Google Search Console</caption>
				<thead>
					<tr>
						<th scope="col">Status</th>
						<th scope="col">What Google did</th>
						<th scope="col">Usual cause</th>
						<th scope="col">Where to fix</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Crawled - currently not indexed</th>
						<td>Visited the page and did not index it</td>
						<td>Duplicate, thin or low-value content; weak internal links</td>
						<td>The page itself and the links pointing to it</td>
					</tr>
					<tr>
						<th scope="row">Discovered - currently not indexed</th>
						<td>Found the URL but has not visited it yet</td>
						<td>Too many URLs for the crawl Google gives the site; slow server</td>
						<td>Crawl waste, internal links, sitemap and server speed</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="why-title">
		<h2 id="why-title">Why Google crawls a page and does not index it</h2>
		<ul class="cards">
			<li>
				<h3>It looks like another page</h3>
				<p>City pages that swap a name, product variants, tag archives and printer versions read as copies.</p>
			</li>
			<li>
				<h3>It adds little of its own</h3>
				<p>Short pages, manufacturer descriptions and articles that repeat what many sites say.</p>
			</li>
			<li>
				<h3>Nothing points to it</h3>
				<p>A page linked only from the sitemap tells Google that the site itself does not consider it important.</p>
			</li>
			<li>
				<h3>The site is new or small</h3>
				<p>Google is selective with sites that have few links, and indexes more as the site earns trust.</p>
			</li>
			<li>
				<h3>Content appears only after JavaScript</h3>
				<p>If the main content loads late, Google may judge the page by an almost empty first render.</p>
			</li>
			<li>
				<h3>Too many weak pages</h3>
				<p>A large share of thin URLs lowers how much of the site Google is willing to index.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix "Crawled - currently not indexed"</h2>
		<Steps {steps} />
	</section>

	<section class="band" aria-labelledby="discovered-title">
		<h2 id="discovered-title">When the status is "Discovered - currently not indexed"</h2>
		<p>
			Here Google has not even visited the pages, so the fix is not in the page content. It is in crawl
			waste, internal links and how fast the server answers, explained step by step in the guide to
			<a href={guides.discoveredNotIndexed.path}>"Discovered - currently not indexed"</a>.
		</p>
		<p>
			On online stores both statuses usually come from filters and variants, covered in
			<a href={industries.ecommerce.path}>ecommerce technical SEO</a>. When the copies are flagged as
			duplicates instead, see <a href={guides.duplicateCanonical.path}>"Duplicate without user-selected
			canonical"</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about pages not indexed" />

	<Related
		links={[
			{ href: services.indexing.path, text: 'Google indexing fixes' },
			{ href: guides.discoveredNotIndexed.path, text: 'Discovered - currently not indexed' },
			{ href: guides.soft404.path, text: 'Pages reported as soft 404' },
			{ href: guides.notShowing.path, text: 'Website not showing up on Google' },
			{ href: industries.lawFirms.path, text: 'Law firm office pages not indexed' },
			{ href: services.audit.path, text: 'Technical SEO audit' }
		]}
	/>

	<Contact {email} title="Hundreds of pages crawled but not indexed?" intro="Email the site and the number of pages in the report. I reply with the pattern I see and what would get those pages indexed." />
</main>
