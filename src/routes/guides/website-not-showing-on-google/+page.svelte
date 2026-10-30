<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.notShowing.path;
	const title = 'Why Is My Website Not Showing Up on Google? | Ranking Fixer';
	const description =
		'Website not showing up on Google? Check the causes in order: indexing, noindex, robots.txt, platform settings, a new domain and penalties.';
	const email: Email = { subject: 'My website is not showing up on Google', label: 'Have me check your site' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.notShowing.name, path }
	];

	const steps: Step[] = [
		{ name: 'Search for the site itself', text: 'Type site:yourdomain.com into Google. No results means the site is not indexed; some results means it is indexed but not ranking for the searches you tried.' },
		{ name: 'Add the site to Google Search Console', text: 'Verify the domain in Search Console. It is free and it is the only place where Google tells you why a page is or is not indexed.' },
		{ name: 'Inspect the home page', text: 'Paste the home page URL into the URL Inspection tool. It shows whether the page is on Google and, if not, the reason.' },
		{ name: 'Look for noindex and robots.txt blocks', text: 'Check that pages do not carry a noindex tag and that robots.txt does not disallow the site. Both are often left over from development.' },
		{ name: 'Check the platform visibility setting', text: 'Website builders have a switch that hides the site from search engines or puts it behind a password. Make sure the site is public.' },
		{ name: 'Submit the sitemap', text: 'Submit the sitemap URL in Search Console so Google finds every page, then request indexing for the home page.' },
		{ name: 'Read the Page indexing report', text: 'After a few days, the report lists every page that is not indexed and why, such as crawled but not indexed, duplicate or redirect.' },
		{ name: 'Check manual actions and security issues', text: 'In Search Console, open Manual actions and Security issues. A penalty or a hacked site can remove pages from Google.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'How long does it take for a new website to show up on Google?',
			answer:
				'Usually from a few days to a few weeks. Adding the site to Google Search Console and submitting a sitemap speeds up discovery. Showing up for the business name comes first; ranking for competitive searches takes months.'
		},
		{
			question: 'Do I have to pay Google to appear in search results?',
			answer:
				'No. Organic results are free and cannot be bought. Google Ads are a separate, paid placement marked as sponsored, and paying for ads does not change organic rankings.'
		},
		{
			question: 'Why does my business show on Google Maps but my website does not show in search?',
			answer:
				'The Google Business Profile and the website are indexed separately. The profile can appear on Maps even when the website is not indexed or ranks low. Linking the website in the profile does not get it indexed; that still depends on the site itself.'
		},
		{
			question: 'Why is my website not showing up on Google anymore?',
			answer:
				'A site that disappears after being indexed usually has one of these causes: a noindex tag or robots.txt rule published by mistake, server errors, a domain or hosting that expired, a manual action, or a hacked site. A drop in rankings, where the site is still indexed but on later pages, is a different problem.'
		},
		{
			question: 'Why is my logo or favicon not showing in Google search?',
			answer:
				'Google shows a favicon only if it is linked from the home page, is square, ideally 48 by 48 pixels or larger, and can be crawled. Changes can take weeks to appear. The logo in the knowledge panel comes from Organization structured data and from Google systems, and cannot be forced.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Why Is My Website Not Showing Up on Google?' },
		howTo: { name: 'How to find out why a website is not showing up on Google', steps }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Why Is My Website Not Showing Up on Google?</h1>
		<p>
			A website does not show up on Google for one of five reasons: Google has not found it yet, the site
			is blocked from indexing, Google crawled it and decided not to index it, it is indexed but ranks too
			low to be seen, or it was removed because of a penalty or a hack. The checks below find which one,
			in the order that saves the most time.
		</p>
		<p>Most of them take a few minutes and need only free Google tools.</p>
	</header>

	<section aria-labelledby="steps-title">
		<h2 id="steps-title">How to find out why your website is not on Google</h2>
		<Steps {steps} />
	</section>

	<section class="band" aria-labelledby="platforms-title">
		<h2 id="platforms-title">Platform settings that hide a website from Google</h2>
		<ul class="cards">
			<li>
				<h3>WordPress</h3>
				<p>Settings, Reading: "Discourage search engines from indexing this site" must be unchecked. SEO plugins can also set noindex per page type.</p>
			</li>
			<li>
				<h3>Wix</h3>
				<p>The site must be published, and the SEO setting that lets search engines index the site must be on. Pages can also be hidden one by one.</p>
			</li>
			<li>
				<h3>Squarespace</h3>
				<p>Site availability must be Public, not Private or Password protected. Each page has its own "hide from search results" option.</p>
			</li>
			<li>
				<h3>Shopify</h3>
				<p>New stores start behind a password page. Remove it in Online Store preferences. More in the <a href={industries.ecommerce.path}>ecommerce SEO guide</a>.</p>
			</li>
			<li>
				<h3>GoDaddy, Canva and portfolio builders</h3>
				<p>Check the publish and visibility settings, and whether the site uses your own domain. Some builders do not allow Search Console verification.</p>
			</li>
			<li>
				<h3>Custom or JavaScript sites</h3>
				<p>Check that the HTML has the content without running JavaScript, and that staging rules did not go live.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="indexed-title">
		<h2 id="indexed-title">The site is indexed, but you still cannot find it</h2>
		<p>
			If site:yourdomain.com shows your pages, Google has indexed them and the problem is ranking. Search
			for the exact business name first: a new site should appear for it within a few weeks. For service
			searches like "plumber in Austin", the site competes with businesses that have years of content,
			links and reviews.
		</p>
		<p>
			When the business shows on Maps but the website is missing from the results, remember that the
			Business Profile and the website are ranked separately. The profile depends on proximity and
			reviews; the website on content, links and technical health.
		</p>
	</section>

	<section class="band" aria-labelledby="crawled-title">
		<h2 id="crawled-title">When Search Console says "crawled" or "discovered" but not indexed</h2>
		<p>
			These two statuses are the most common answer to "why is my page not on Google". Google either read
			the page and chose not to keep it, or found the URL and has not visited it yet. Each has its own
			fixes, explained in the guides to
			<a href={guides.crawledNotIndexed.path}>"Crawled - currently not indexed"</a> and
			<a href={guides.discoveredNotIndexed.path}>"Discovered - currently not indexed"</a>.
		</p>
		<p>
			If the site used to rank and then vanished, the causes are different: a noindex or robots.txt rule
			published by mistake, a removal request, a manual action or a hack. They are covered in
			<a href={guides.disappeared.path}>website disappeared from Google</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about websites missing from Google" />

	<Related
		links={[
			{ href: services.indexing.path, text: 'Have your indexing issues fixed' },
			{ href: guides.crawledNotIndexed.path, text: 'Crawled - currently not indexed' },
			{ href: guides.disappeared.path, text: 'Site was on Google and disappeared' },
			{ href: guides.sitemapNotRead.path, text: 'Sitemap could not be read' },
			{ href: services.migration.path, text: 'Site gone after a redesign or migration' },
			{ href: services.audit.path, text: 'Technical SEO audit' }
		]}
	/>

	<Contact {email} title="Still not on Google?" intro="Email the website address. I check what Google sees and reply with the cause and how to fix it." />
</main>
