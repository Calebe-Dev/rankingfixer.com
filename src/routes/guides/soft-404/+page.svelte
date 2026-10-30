<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.soft404.path;
	const title = 'Soft 404 Errors in Search Console: How to Fix Them | Ranking Fixer';
	const description =
		'A soft 404 is a page that returns 200 OK but looks empty or missing to Google. See the usual causes and how to fix each one in the code.';
	const email: Email = { subject: 'Soft 404 errors', label: 'Have me fix the template' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.soft404.name, path }
	];

	const responses = [
		['404 Not Found', '404', 'Treats the content as missing and drops the URL from the index', 'The page is gone and has no replacement'],
		['410 Gone', '410', 'The same as 404: Google handles all 4xx errors except 429 alike', 'The page is gone and you want to say so explicitly'],
		['301 redirect', '301', 'Takes it as a strong signal that the destination is the canonical URL', 'The content moved to an equivalent page'],
		['Soft 404', '200', 'Treats the page as missing anyway and reports the mismatch', 'Never on purpose: it is the bug to fix']
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Export the examples', text: 'In the Page indexing report, open "Soft 404" and export the URLs. Group them by template: products, categories, search, profiles or app routes.' },
		{ name: 'Decide if each group should exist', text: 'A page that is gone needs a real error code. A page that should rank needs content. The answer decides the fix.' },
		{ name: 'Return a real 404 or 410 for missing pages', text: 'Set the status on the server, so the very first response already says the page does not exist.' },
		{ name: 'Redirect only to true replacements', text: 'Send moved content to its new address with a 301. Do not send everything to the home page.' },
		{ name: 'Give real pages real content', text: 'Fill thin templates with the information visitors came for, or keep them out of the index until they have it.' },
		{ name: 'Check what Google sees', text: 'Use URL Inspection, Test live URL, to confirm the status code and that the rendered HTML shows the content.' },
		{ name: 'Validate the fix', text: 'Click Validate fix in Search Console once the template is deployed.' }
	];

	const svelteKit = `import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const post = await getPost(params.slug);
	if (!post) error(404, 'Not found');
	return { post };
}`;

	const nextJs = `import { notFound } from 'next/navigation';

export default async function Page({ params }) {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) notFound();
	// ...
}`;

	const angular = `import { Component, inject, RESPONSE_INIT } from '@angular/core';

@Component({ selector: 'app-not-found', template: '<h1>Page not found</h1>' })
export class NotFound {
	constructor() {
		const response = inject(RESPONSE_INIT);
		if (response) response.status = 404;
	}
}`;

	const curl = 'curl -I https://example.com/this-page-does-not-exist';

	const faqs: FaqItem[] = [
		{
			question: 'What is a soft 404?',
			answer:
				'A soft 404 is a URL that returns a success code, 200 OK, while the page tells visitors the content does not exist, or shows almost nothing. Google treats it as a missing page, leaves it out of the index and reports it as "Soft 404" in Search Console.'
		},
		{
			question: 'Do soft 404 errors hurt SEO?',
			answer:
				'The flagged URL is not indexed, which is correct when the page really is missing. The cost comes when real pages are flagged by mistake, like thin product or location pages, or when every mistyped URL on the site answers 200 and creates a new page for Google to crawl.'
		},
		{
			question: 'Should a missing page return 404 or 410?',
			answer:
				'Either works. Google treats all 4xx errors except 429 the same way: the content does not exist, and the URL is dropped from the index if it was there. A 410 simply states more explicitly that the page is gone for good.'
		},
		{
			question: 'Why is a real page reported as a soft 404?',
			answer:
				'Google judged the rendered page as empty or as an error. Check the rendered HTML in URL Inspection: content that depends on a failed API call, a script Google could not load or a thin template can make a real page look like an error.'
		},
		{
			question: 'Can I redirect all my 404 pages to the home page?',
			answer:
				'It is better not to. Google advises against redirecting missing pages to the home page, and those redirects can be reported as soft 404s anyway. Redirect only to a page that replaces the old one, and let the rest return 404.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Soft 404 Errors in Search Console: How to Fix Them' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Soft 404 Errors in Search Console: How to Fix Them</h1>
		<p>
			A soft 404 is a URL that answers with a success code, 200 OK, while the page itself says the content
			does not exist, is empty or looks like an error. Google treats it as missing and leaves it out of
			search. The fix is to return a real 404 or 410, redirect to a true replacement, or give the page real
			content.
		</p>
		<p>
			Most soft 404s come from a template, so one change in the code clears hundreds of URLs at once. It is
			the kind of fix covered by <a href={services.indexing.path}>Google indexing fixes</a>.
		</p>
	</header>

	<section aria-labelledby="codes-title">
		<h2 id="codes-title">Soft 404 vs 404 vs 410</h2>
		<div class="table-wrap">
			<table>
				<caption>What each response tells Google about a page that is not there</caption>
				<thead>
					<tr>
						<th scope="col">Response</th>
						<th scope="col">Status code</th>
						<th scope="col">What Google does</th>
						<th scope="col">Use it when</th>
					</tr>
				</thead>
				<tbody>
					{#each responses as [response, code, google, when] (response)}
						<tr>
							<th scope="row">{response}</th>
							<td>{code}</td>
							<td>{google}</td>
							<td>{when}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p>
			Real 404 errors are normal and, according to Google, do not hurt a site's performance in search. What
			causes trouble is hiding them: fake content, blanket redirects to the home page, or blocking missing
			URLs in robots.txt.
		</p>
	</section>

	<section class="band" aria-labelledby="why-title">
		<h2 id="why-title">Why Google flags a page as a soft 404</h2>
		<ul class="cards">
			<li>
				<h3>Single-page apps</h3>
				<p>The app shows "not found" for a missing route, but the server already answered 200, because client-side routing cannot change the status code.</p>
			</li>
			<li>
				<h3>Empty categories and searches</h3>
				<p>Categories with no products, tag pages with no posts and internal search results with no hits look like error pages.</p>
			</li>
			<li>
				<h3>Unavailable products</h3>
				<p>A product page reduced to "this item is unavailable", with nothing else on it, reads as an empty page.</p>
			</li>
			<li>
				<h3>Deleted pages sent to the home page</h3>
				<p>Redirecting removed URLs to the home page or an unrelated page gives Google something other than what was asked for.</p>
			</li>
			<li>
				<h3>Thin templates</h3>
				<p>Pages with a title and little else, like placeholder locations or profiles without data.</p>
			</li>
			<li>
				<h3>Error messages on a 200 page</h3>
				<p>A template that prints "no results" or "something went wrong" when an API call fails, while the server still reports success.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="check-title">
		<h2 id="check-title">How to check the real status code</h2>
		<p>Run this in a terminal with a URL that should not exist on your site:</p>
		<pre><code>{curl}</code></pre>
		<ul class="checks">
			<li><strong>Read the first line.</strong> It is the status the server sends before any JavaScript runs. A missing page should say 404 or 410, not 200.</li>
			<li><strong>Compare with a real page.</strong> If a made-up URL and a real page both return 200, every mistyped link to your site creates a soft 404.</li>
			<li><strong>Look at what Google rendered.</strong> In URL Inspection, View crawled page and Test live URL show the HTTP response and the rendered HTML.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix soft 404 errors</h2>
		<Steps {steps} />
	</section>

	<section aria-labelledby="frameworks-title">
		<h2 id="frameworks-title">Returning a real 404 in JavaScript frameworks</h2>
		<p>
			When the server renders the page, set the status there. In <strong>SvelteKit</strong>, calling
			<code>error()</code> in a load function sets the response status to 404 and renders the error page:
		</p>
		<pre><code>{svelteKit}</code></pre>
		<p>
			In the <strong>Next.js</strong> App Router, <code>notFound()</code> renders the not-found page. Called
			before the response starts streaming, it returns a 404. Once streaming has started, the status stays
			200 and Next.js adds a noindex tag instead, so check missing records before any Suspense boundary
			streams.
		</p>
		<pre><code>{nextJs}</code></pre>
		<p>
			In <strong>Angular</strong> with server-side rendering, the not-found component sets the status through
			the <code>RESPONSE_INIT</code> token. The token is null in the browser and during prerendering, so
			this works only for routes rendered on the server at request time.
		</p>
		<pre><code>{angular}</code></pre>
		<p>
			A single-page app with no server rendering cannot change the status code. Google's JavaScript SEO
			guide gives two alternatives: redirect with JavaScript to a URL that returns a real 404, such as
			<code>/not-found</code>, or add <code>&lt;meta name="robots" content="noindex"&gt;</code> to the error
			view.
		</p>
	</section>

	<section class="band" aria-labelledby="stock-title">
		<h2 id="stock-title">Out-of-stock products: keep, redirect or 404?</h2>
		<ul class="checks">
			<li><strong>Back in stock soon:</strong> keep the page live with the full product details, the availability shown on the page and in the Product structured data, and links to similar products.</li>
			<li><strong>Replaced by a new model:</strong> redirect with a 301 to the new product.</li>
			<li><strong>Gone for good, no replacement:</strong> return 404 or 410. If the page still earns links or searches, keep it with clear alternatives instead of an empty notice.</li>
		</ul>
		<p>
			Stores with thousands of variants and seasonal products have more cases like this, covered in
			<a href={industries.ecommerce.path}>ecommerce technical SEO</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about soft 404 errors" />

	<Related
		links={[
			{ href: services.indexing.path, text: 'Have the soft 404s fixed' },
			{ href: guides.crawledNotIndexed.path, text: 'Pages Google crawled and left out' },
			{ href: guides.duplicateCanonical.path, text: 'Duplicate without user-selected canonical' },
			{ href: industries.ecommerce.path, text: 'Unavailable products and empty categories' },
			{ href: services.audit.path, text: 'Technical SEO audit for JavaScript sites' }
		]}
	/>

	<Contact {email} title="Real pages reported as soft 404?" intro="Email the site and one URL from the report. I reply with why Google sees it as empty and how I would fix the template." />
</main>
