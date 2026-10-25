<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { guides, industries, services, type Email } from '$lib/site';

	const path = industries.ecommerce.path;
	const title = 'Ecommerce Technical SEO Audit and Fixes | Ranking Fixer';
	const description =
		'Ecommerce technical SEO: faceted navigation, product variants, unindexed collections, site speed and platform migrations, fixed by a developer.';
	const email: Email = { subject: 'Ecommerce technical SEO', label: 'Send your store' };

	const crumbs = [{ name: industries.ecommerce.name, path }];

	const problems = [
		['Faceted navigation', 'Every filter combination creates a URL, and Google crawls thousands of near-copies', 'Decide which filters deserve indexable pages; canonical or block the rest'],
		['Product variants', 'Color and size URLs compete with the main product', 'One canonical product URL, variants as options, not separate pages'],
		['Duplicate product paths', 'The same product reachable under every collection it belongs to', 'Link to the canonical product URL everywhere, including theme code'],
		['Thin collection pages', 'Category pages with only a product grid are left out of the index', 'Unique intro text, internal links and filters that keep the URL clean'],
		['Out-of-stock products', 'Pages removed or redirected in bulk lose their rankings and links', 'Keep pages that will return; redirect discontinued ones to the closest product'],
		['Internal search pages', 'Search result URLs indexed by mistake, often by the thousand', 'noindex on search results and no links to them in sitemaps'],
		['Product structured data', 'Errors in Product, Offer and review markup block rich results', 'Valid markup generated from the same data shown on the page'],
		['App and tracking scripts', 'Each app adds JavaScript to every page, and mobile speed collapses', 'Remove leftovers, load only where needed, delay what can wait']
	];

	const faqs: FaqItem[] = [
		{
			question: 'Why are my Shopify products not showing on Google?',
			answer:
				'If the store appears but products do not, the usual causes are product pages treated as duplicates because of variants and collection paths, descriptions copied from the manufacturer, products not available on the Online Store sales channel, or a sitemap Google has not processed yet. Products in the Shopping tab are a separate case: they come from Google Merchant Center, not from the regular index.'
		},
		{
			question: 'How long does it take for a new online store to appear on Google?',
			answer:
				'Once the store is public and the sitemap is submitted in Search Console, the home page often appears within days. Product and collection pages take longer, from a few weeks to a few months, depending on internal links, unique content and how many near-duplicate URLs the store generates.'
		},
		{
			question: 'Should filter pages be indexed?',
			answer:
				'Only the ones people search for, like a color or a brand inside a category, and only when the page has a clean, stable URL. Every other filter combination should be canonicalized to the main category or kept out of crawling, or it wastes crawl and creates duplicates.'
		},
		{
			question: 'What happens to SEO when a product goes out of stock?',
			answer:
				'If the product will return, keep the page live with its stock status, so it keeps its rankings. If it is discontinued, redirect it to the closest replacement or category. Mass deleting old products is one of the most common causes of traffic loss in stores.'
		},
		{
			question: 'Which ecommerce platforms do you work with?',
			answer:
				'The audit works on any platform, because it looks at what Google sees. What can be fixed depends on the access the platform gives: theme code and apps on Shopify, plugins and templates on WooCommerce, and full code on Magento, BigCommerce or custom stores.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		service: {
			name: industries.ecommerce.name,
			serviceType: 'Ecommerce technical SEO audit and fixes',
			description,
			audience: 'Online stores and ecommerce teams'
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Ecommerce Technical SEO Audit and Fixes</h1>
		<p>
			Online stores generate technical SEO problems by design: filters that multiply URLs, variants that
			compete with the main product, apps that slow every page. I audit the store, decide what Google
			should index and fix the templates, so products and collections can rank.
		</p>
		<p>
			For stores whose products are missing from Google, whose traffic fell after a platform change, or
			whose mobile pages are too slow to sell.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="problems-title">
		<h2 id="problems-title">Technical SEO problems of online stores</h2>
		<div class="table-wrap">
			<table>
				<caption>Common ecommerce issues, their effect on Google and the fix</caption>
				<thead>
					<tr>
						<th scope="col">Problem</th>
						<th scope="col">What happens</th>
						<th scope="col">Fix</th>
					</tr>
				</thead>
				<tbody>
					{#each problems as [problem, effect, fix] (problem)}
						<tr>
							<th scope="row">{problem}</th>
							<td>{effect}</td>
							<td>{fix}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="shopify-title">
		<h2 id="shopify-title">Why is my Shopify store not showing up on Google?</h2>
		<ul class="checks">
			<li><strong>Password protection is on.</strong> New stores start behind a password page, and Google cannot index them until it is removed.</li>
			<li><strong>The wrong primary domain.</strong> If the myshopify.com address is primary, your own domain only redirects and the store builds no signals on it.</li>
			<li><strong>noindex from a theme or app.</strong> Some apps and theme edits add noindex or robots.txt rules to whole sections.</li>
			<li><strong>Duplicate product URLs.</strong> Products linked under collection paths compete with the canonical product page.</li>
			<li><strong>The store is new.</strong> Without links and with thin collections, Google takes weeks to index more than the home page.</li>
		</ul>
		<p>
			The same checks apply to any platform. The general guide covers WordPress, Wix and Squarespace:
			<a href={guides.notShowing.path}>why a website is not showing up on Google</a>.
		</p>
	</section>

	<section aria-labelledby="audit-title">
		<h2 id="audit-title">What the ecommerce SEO audit covers</h2>
		<ul class="checks">
			<li><strong>Indexing</strong> of products, collections and categories in Search Console, by template.</li>
			<li><strong>Crawl waste</strong> from filters, sorting, pagination and internal search.</li>
			<li><strong>Canonicals</strong> for variants, collection paths and tracking parameters.</li>
			<li><strong>Structured data</strong> for products, offers, reviews and breadcrumbs.</li>
			<li><strong>Speed</strong> of product and collection templates on mobile, including apps and tags.</li>
			<li><strong>Internal links</strong> from navigation, collections and related products.</li>
		</ul>
		<EmailCta {...email} />
	</section>

	<section class="band" aria-labelledby="migration-title">
		<h2 id="migration-title">Ecommerce platform migrations</h2>
		<p>
			Moving from Magento, WooCommerce or a custom store to Shopify, or the other way around, changes
			every URL pattern. Shopify, for example, forces product URLs under <code>/products/</code> and
			categories under <code>/collections/</code>. Without a complete redirect map, years of product
			rankings disappear in a week. I build the map from Search Console, analytics and backlinks, import
			the redirects in bulk and test them before the switch. More on the
			<a href={services.migration.path}>SEO website migration</a> page.
		</p>
	</section>

	<Faq {faqs} title="Ecommerce technical SEO questions" />

	<Related
		links={[
			{ href: services.coreWebVitals.path, text: 'Store speed and Core Web Vitals' },
			{ href: services.indexing.path, text: 'Products not indexed by Google' },
			{ href: services.migration.path, text: 'Migrate a store without losing traffic' },
			{ href: guides.crawledNotIndexed.path, text: 'Crawled but not indexed collections' }
		]}
	/>

	<Contact {email} title="Send your store" intro="Email the store URL, the platform and what is wrong, like products missing from Google or a traffic drop after a migration." />
</main>
