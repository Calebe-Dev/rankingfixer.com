<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.getOnGoogle.path;
	const title = 'How to Get Your Website to Show Up on Google (Step by Step) | Ranking Fixer';
	const description =
		'How to get your website on Google: the setup that gets a new site found and indexed, how long it takes, and what it takes to move up from page five.';
	const email: Email = { subject: 'Getting my website on Google', label: 'Have me check your setup' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.getOnGoogle.name, path }
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Make sure the site is public', text: 'No password page, no "coming soon" mode, no "discourage search engines" box ticked. Website builders hide new sites by default more often than people expect.' },
		{ name: 'Give every page a real title and real text', text: 'One page per service or product, each with its own title, a heading that says what it is, and a few paragraphs in plain words. A page Google cannot tell apart from the others will not be indexed.' },
		{ name: 'Verify the site in Google Search Console', text: 'Add a Domain property and verify it with the DNS record Search Console gives you. It is free, and it is where Google reports what it indexed and why it skipped the rest.' },
		{ name: 'Submit your sitemap', text: 'Most platforms create one at /sitemap.xml. Submit that address in Search Console under Sitemaps so Google learns every page at once.' },
		{ name: 'Request indexing for the home page', text: 'Paste the home page into URL Inspection and click Request indexing. Do the same for your two or three most important pages. The rest will follow through the sitemap and links.' },
		{ name: 'Get linked from places Google already visits', text: 'Your Google Business Profile, LinkedIn and other social profiles, industry directories, partners and suppliers. Each link is a path for Google to find you and a sign that the site is real.' },
		{ name: 'Add the site to Bing Webmaster Tools', text: 'It can import everything from Search Console in a minute. Bing powers several other search engines and AI assistants, so it is worth the extra step.' },
		{ name: 'Check back in a week', text: 'Search site:yourdomain.com and open the Page indexing report. Pages listed as not indexed come with a reason, and each reason has a fix.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'How do I get my website on Google for free?',
			answer:
				'Make the site public, verify it in Google Search Console, submit the sitemap and request indexing for the home page. None of this costs anything. Google does not charge to include a site in its organic results, and paying for ads does not change them.'
		},
		{
			question: 'How long does it take for a new website to show up on Google?',
			answer:
				'Usually a few days to a few weeks for the home page and the main pages. Showing up when someone searches your exact business name comes first. Ranking for searches like "plumber in Austin" or "accounting software" takes months and depends on competition.'
		},
		{
			question: 'Why does my website show up on Google but not on the first page?',
			answer:
				'Being indexed only means Google has the page. Ranking on the first page depends on how well the page answers the search compared with every other result, how many trusted sites link to you, and whether the site loads fast and works on phones. New sites start low and climb as they earn those signals.'
		},
		{
			question: 'How do I get my business to show up on Google Maps?',
			answer:
				'Create and verify a Google Business Profile with the exact business name, address or service area, phone number and category. The profile is what appears on Maps and in the local results; your website is indexed separately, so you need both.'
		},
		{
			question: 'Do I need to submit my website to Google every time I add a page?',
			answer:
				'No. Once the sitemap is submitted, Google rechecks it on its own and finds new pages through it and through your internal links. Request indexing only for a page that matters and needs to appear quickly.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'How to Get Your Website to Show Up on Google' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>How to Get Your Website to Show Up on Google</h1>
		<p>
			To get a website on Google, make it public, verify it in Google Search Console, submit its sitemap and
			request indexing for the home page. That gets Google to find the site, usually within days. Getting it
			to show up for the searches your customers make is a second job, and it starts with the same setup
			done right.
		</p>
		<p>
			Here is the setup in order, then what decides whether you climb from page five to page one.
		</p>
	</header>

	<section aria-labelledby="steps-title">
		<h2 id="steps-title">How to get your website on Google, step by step</h2>
		<Steps {steps} />
	</section>

	<section class="band" aria-labelledby="stages-title">
		<h2 id="stages-title">Found, indexed, ranking: three different things</h2>
		<div class="table-wrap">
			<table>
				<caption>The three stages between launching a site and getting traffic from Google</caption>
				<thead>
					<tr>
						<th scope="col">Stage</th>
						<th scope="col">What it means</th>
						<th scope="col">How you know</th>
						<th scope="col">Usual time</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Found</th>
						<td>Google knows the URL exists</td>
						<td>The URL appears in Search Console, even as "not indexed"</td>
						<td>Hours to days after the sitemap</td>
					</tr>
					<tr>
						<th scope="row">Indexed</th>
						<td>Google stored the page and can show it</td>
						<td>site:yourdomain.com lists it; URL Inspection says "URL is on Google"</td>
						<td>Days to weeks</td>
					</tr>
					<tr>
						<th scope="row">Ranking</th>
						<td>The page shows up for real searches, not just your name</td>
						<td>Impressions and clicks in the Search Console Performance report</td>
						<td>Months, depending on competition</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			If a page is stuck before "indexed", the reason is in Search Console:
			<a href={guides.discoveredNotIndexed.path}>discovered but not indexed</a>,
			<a href={guides.crawledNotIndexed.path}>crawled but not indexed</a> or
			<a href={guides.urlNotOnGoogle.path}>another reason in URL Inspection</a>. If the whole site is missing
			after a few weeks, go through <a href={guides.notShowing.path}>why your website is not showing up on
			Google</a>.
		</p>
	</section>

	<section aria-labelledby="top-title">
		<h2 id="top-title">How to get your website to the top of Google</h2>
		<p>No setup trick puts a page at the top. What moves it there, roughly in order of effort:</p>
		<ul class="checks">
			<li><strong>One page per search intent.</strong> A page for "emergency plumber" and another for "bathroom remodeling" beats one page that lists everything. Two pages chasing the same search hold each other back, which is <a href={guides.cannibalization.path}>keyword cannibalization</a>.</li>
			<li><strong>Answers people cannot get elsewhere.</strong> Prices, process, examples, photos of your own work, specific places you serve. Generic text is what Google already has plenty of.</li>
			<li><strong>A fast site that works on phones.</strong> Most searches happen on a phone, and slow pages lose both visitors and close contests in the rankings. Check yours with <a href={guides.cwvFailed.path}>Core Web Vitals</a>.</li>
			<li><strong>Links from sites people trust.</strong> Local press, associations, partners, suppliers and customers. A few real ones are worth more than hundreds from directories nobody visits.</li>
			<li><strong>Your brand searched by name.</strong> People who look for you by name, and find exactly you, are a strong signal. <a href={guides.brandedSearch.path}>Branded search</a> covers how to make those results work for you.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="builders-title">
		<h2 id="builders-title">If you built the site with Wix, Squarespace, Shopify or an AI builder</h2>
		<p>
			Wix, Squarespace and Shopify create the sitemap and the basic tags for you, so the steps above are
			mostly about connecting Search Console and turning off the settings that hide a new site. Sites built
			with AI app builders like Lovable or Bolt are different: they often send Google an empty page, which no
			amount of submitting fixes. The test and the fix are in <a href={guides.vibeCoded.path}>vibe-coded
			website not indexed</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about getting on Google" />

	<Related
		links={[
			{ href: guides.notShowing.path, text: 'Website still not showing on Google?' },
			{ href: guides.brandedSearch.path, text: 'Show up properly for your brand name' },
			{ href: guides.knowledgePanel.path, text: 'Getting a Google knowledge panel' },
			{ href: guides.urlNotOnGoogle.path, text: 'URL is not on Google' },
			{ href: services.audit.path, text: 'Technical SEO audit' },
			{ href: services.indexing.path, text: 'Google indexing fixes' }
		]}
	/>

	<Contact {email} title="Launched a site and Google still ignores it?" intro="Email the URL and when it went live. I reply with what is holding it back and what to do first." />
</main>
