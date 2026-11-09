<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.brandedSearch.path;
	const title = 'Branded Search: How to Own the Google Results for Your Brand | Ranking Fixer';
	const description =
		'What people see when they google your business name, and how to fix each part: ranking first, site name, favicon, logo, sitelinks and the knowledge panel.';
	const email: Email = { subject: 'Branded search results', label: 'Have me review your brand results' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.brandedSearch.name, path }
	];

	// Dados estruturados da home: o mesmo formato que este site publica (src/lib/schema.ts)
	const schema = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com/",
      "name": "Example Plumbing",
      "alternateName": "example.com",
      "publisher": { "@id": "https://example.com/#organization" }
    },
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Example Plumbing",
      "url": "https://example.com/",
      "logo": "https://example.com/images/logo-512.png",
      "sameAs": [
        "https://www.linkedin.com/company/example-plumbing",
        "https://www.facebook.com/exampleplumbing",
        "https://www.youtube.com/@exampleplumbing"
      ]
    }
  ]
}`;

	const favicon = `<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" type="image/png" sizes="96x96">`;

	const faqs: FaqItem[] = [
		{
			question: 'What is branded search?',
			answer:
				'Branded search is any search that includes your business, product or personal name, like "acme plumbing" or "acme plumbing reviews". People who search your name already know you, so these searches convert better than any others, and the results they see decide whether they reach your site or a competitor, a directory or an old review.'
		},
		{
			question: 'Why does my website not show up when I search my business name?',
			answer:
				'Usually because the site is not indexed yet, the business name is a common word or shared with another company, or the home page does not say the name clearly in its title and text. Check indexing first with site:yourdomain.com, then make sure the exact name is in the home page title, the main heading and the Organization structured data.'
		},
		{
			question: 'How do I change the site name Google shows in search results?',
			answer:
				'Add WebSite structured data to the home page with your preferred name in the name property and an alternate in alternateName, and use the same name in the home page title, main heading and og:site_name. Google reads these signals together and updates the site name after it recrawls the home page, which can take weeks.'
		},
		{
			question: 'Why is my favicon not showing in Google search?',
			answer:
				'Google needs a favicon linked from the home page with a rel="icon" tag, square, with a stable URL, and crawlable by both Googlebot and Googlebot-Image. Larger than 48 by 48 pixels is recommended. A favicon blocked by robots.txt, served from another domain that blocks crawlers, or changed recently can take weeks to show, and until then Google shows a generic globe.'
		},
		{
			question: 'How do I get sitelinks in Google?',
			answer:
				'You cannot add sitelinks directly; Google generates them when it understands the structure of a site. Clear navigation with descriptive link text, one page per main topic and pages that people actually visit from your brand searches make them more likely. Google removed the sitelinks search box in November 2024.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Branded Search: How to Own the Google Results for Your Brand' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Branded Search: How to Own the Google Results for Your Brand</h1>
		<p>
			When someone searches your business name, they are already looking for you. What Google shows them
			decides whether they reach your site, a directory listing, a competitor's ad or a two-year-old
			complaint. Most of those results come from signals you control on your own site.
		</p>
		<p>
			Google this right now: your exact business name, alone, in a private window. Then go through the
			parts below, from the one that matters most.
		</p>
	</header>

	<section aria-labelledby="parts-title">
		<h2 id="parts-title">What a strong brand result looks like</h2>
		<div class="table-wrap">
			<table>
				<caption>The parts of a branded search result and what controls each one</caption>
				<thead>
					<tr>
						<th scope="col">Part</th>
						<th scope="col">What you want</th>
						<th scope="col">What controls it</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">First result</th>
						<td>Your home page, above directories and lookalikes</td>
						<td>Indexing, the name in the title and text, links to your site</td>
					</tr>
					<tr>
						<th scope="row">Site name</th>
						<td>Your brand, not your domain or a page title</td>
						<td>WebSite structured data, home page title, og:site_name</td>
					</tr>
					<tr>
						<th scope="row">Favicon</th>
						<td>Your icon, not a grey globe</td>
						<td>rel="icon" on the home page, crawlable file</td>
					</tr>
					<tr>
						<th scope="row">Sitelinks</th>
						<td>Links to your main pages under the first result</td>
						<td>Navigation, internal links, clear page topics (Google decides)</td>
					</tr>
					<tr>
						<th scope="row">Knowledge panel or Business Profile</th>
						<td>A box with your logo, details and profiles</td>
						<td>Organization data, consistent profiles, Business Profile for local businesses</td>
					</tr>
					<tr>
						<th scope="row">The rest of page one</th>
						<td>Your profiles, reviews and press, not someone else's story</td>
						<td>Active official profiles linked from your site; real coverage</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="first-title">
		<h2 id="first-title">If your site is not the first result for its own name</h2>
		<ul class="checks">
			<li><strong>Not indexed:</strong> site:yourdomain.com shows nothing. Start with <a href={guides.getOnGoogle.path}>getting the website on Google</a>.</li>
			<li><strong>The name is not on the page:</strong> the home page title says "Home" or only the service. Put the exact brand name in the title, the main heading and the first paragraph.</li>
			<li><strong>The name is a common word:</strong> "Summit" or "Bright Dental" competes with every other Summit. Google needs the name with context, like the city or the service, and links from sites that mention both.</li>
			<li><strong>Another company has the same name:</strong> the older, better-linked one wins. Consistent profiles and Organization data that tie your name to your domain help Google keep you apart.</li>
			<li><strong>Directories outrank you:</strong> a common sign of a new site or a site Google struggles to crawl. Fix crawling and indexing first; your own domain should beat a listing of you.</li>
		</ul>
	</section>

	<section aria-labelledby="name-title">
		<h2 id="name-title">Site name and logo: the structured data</h2>
		<p>
			Google takes the site name from WebSite structured data on the home page, cross-checked with the home
			page title, the main heading and <code>og:site_name</code>. The logo and the links between your site and
			your profiles come from Organization structured data. Both go on the home page:
		</p>
		<pre><code>{schema}</code></pre>
		<ul class="checks">
			<li><strong>Same name everywhere:</strong> the same spelling in the structured data, the title, the heading, the footer and your profiles. Mixed versions confuse Google about which one is yours.</li>
			<li><strong>Site names work per domain or subdomain:</strong> a section in a folder, like <code>/blog</code>, cannot have its own.</li>
			<li><strong>Logo:</strong> a square or wide image of at least 112 by 112 pixels on a crawlable URL. Google may still choose another image for the knowledge panel.</li>
			<li><strong>sameAs:</strong> only official profiles you control. This is how Google connects your site to the accounts that appear next to it.</li>
		</ul>
		<p>
			This site publishes exactly this structure, with one more step: the founder is described with the same
			identifier here and on the founder's personal site, so Google reads both as the same person instead of
			two different people with the same name.
		</p>
	</section>

	<section class="band" aria-labelledby="favicon-title">
		<h2 id="favicon-title">Favicon not showing in Google search</h2>
		<pre><code>{favicon}</code></pre>
		<p>
			Google uses the icon linked from the home page, so a favicon set only on inner pages is ignored. It must
			be square, should be larger than 48 by 48 pixels, keep a stable URL and be crawlable by Googlebot and
			Googlebot-Image. A plugin, CDN or robots.txt rule that blocks the file is the usual reason for the grey
			globe. After a fix, request indexing for the home page and expect the change to take days to weeks.
		</p>
	</section>

	<section aria-labelledby="sitelinks-title">
		<h2 id="sitelinks-title">Sitelinks</h2>
		<p>
			Sitelinks are chosen by Google; there is no setting or markup that adds them. They appear when Google
			understands the structure of the site and people searching your name go to different sections. Make
			that easy: a short menu with descriptive labels instead of "Solutions" and "Resources", one page per main
			service, and links between related pages. To remove a sitelink you do not want, noindex that page or make
			it less prominent in your navigation.
		</p>
	</section>

	<section class="band" aria-labelledby="panel-title">
		<h2 id="panel-title">Knowledge panel and Business Profile</h2>
		<p>
			A local business with an address or service area gets a Business Profile panel, managed in Google
			Business Profile. Brands, organizations and public people can get a knowledge panel, which comes from
			Google's understanding of the entity and cannot be created on request. How to make one more likely, and
			how to claim it, is in <a href={guides.knowledgePanel.path}>Google knowledge panel</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about branded search" />

	<Related
		links={[
			{ href: guides.knowledgePanel.path, text: 'How to get a Google knowledge panel' },
			{ href: guides.getOnGoogle.path, text: 'How to get your website on Google' },
			{ href: guides.notShowing.path, text: 'Website not showing up on Google' },
			{ href: guides.cannibalization.path, text: 'The wrong page ranking for your name' },
			{ href: services.audit.path, text: 'Technical SEO audit, structured data included' }
		]}
	/>

	<Contact {email} title="Your brand results look wrong?" intro="Email your business name and website. I reply with what Google gets wrong about your brand and what to change on the site." />
</main>
