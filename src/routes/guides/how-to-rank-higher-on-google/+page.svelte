<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.rankHigher.path;
	const title = 'How to Rank Higher on Google: What Actually Moves a Page Up | Ranking Fixer';
	const description =
		'How to rank higher on Google: find the searches you almost rank for, match the intent, fix what holds pages back and earn links, in order of payoff.';
	const email: Email = { subject: 'Ranking higher on Google', label: 'Have me look at your rankings' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.rankHigher.name, path }
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Start from the searches you almost rank for', text: 'In Search Console, open Performance, show Average position and sort the queries. Queries at positions 8 to 30 with real impressions are the fastest wins: Google already considers the page relevant.' },
		{ name: 'Check which page ranks for each one', text: 'Filter by the query and open the Pages tab. If the wrong page ranks, or two pages take turns, fix that first; it is keyword cannibalization and no amount of new content helps until it is solved.' },
		{ name: 'Look at what Google shows for the search', text: 'Search the query in a private window. If the top results are guides and yours is a sales page, or the reverse, the page answers the wrong question. Match the format before polishing anything else.' },
		{ name: 'Rewrite the title and the opening', text: 'Put the words people search in the title and the first lines, and answer the question right away. Then add what the top results leave out: prices, examples, steps, your own data.' },
		{ name: 'Link to the page from your strongest pages', text: 'Add links with descriptive text from the home page, the menu and related pages that already get traffic. Internal links are the cheapest ranking signal you control.' },
		{ name: 'Fix what holds the whole site back', text: 'Slow pages on phones, pages Google cannot index, duplicate URLs and broken redirects cap every page at once. These are the fixes that lift many rankings together.' },
		{ name: 'Earn links and mentions', text: 'Partners, suppliers, local press, associations and useful resources that people cite. A few links from real sites in your field are worth more than any number of directory listings.' },
		{ name: 'Measure in weeks, not days', text: 'Compare clicks and average position over 28 days against the previous 28. Rankings move after Google recrawls the page and reassesses it, which takes weeks.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'How can I rank higher on Google for free?',
			answer:
				'Improve the pages that already appear on page two or three for real searches, make sure each page answers one search better than the current results, link to them from your strongest pages, and fix technical problems that slow or hide the site. None of this costs money; it costs time.'
		},
		{
			question: 'How long does it take to rank higher on Google?',
			answer:
				'Changes to a page that already ranks usually show within two to eight weeks, after Google recrawls it. A new page on a new site can take several months to reach the first page for a competitive search, depending on the competition and the links the site earns.'
		},
		{
			question: 'Why is my website not ranking on Google?',
			answer:
				'Either it is not indexed, which Search Console shows in the Page indexing report, or it is indexed but outranked: other pages answer the search better, have more links, or the site has technical problems that hold all pages back. Check indexing first, then compare your page with the top results for the search.'
		},
		{
			question: 'Does paying for Google Ads help organic rankings?',
			answer:
				'No. Ads and organic results are separate systems. Ads buy a sponsored placement while you pay, and stopping them has no effect on organic positions.'
		},
		{
			question: 'What is the most important Google ranking factor?',
			answer:
				'There is no single one. A page has to be indexable first, then answer the search better than the alternatives, from a site Google trusts. Relevance to the search intent and the quality of the content come first; links, speed and technical health decide close contests.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'How to Rank Higher on Google: What Actually Moves a Page Up' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>How to Rank Higher on Google: What Actually Moves a Page Up</h1>
		<p>
			To rank higher on Google, start with the searches where you already appear on page two or three, make
			each page the best answer to one search, link to it from your strongest pages, and fix the technical
			problems that cap the whole site. New content and links matter too, but they pay off faster once those
			basics are right.
		</p>
		<p>The steps below go in order of payoff: the first ones take hours and move rankings within weeks.</p>
	</header>

	<section aria-labelledby="steps-title">
		<h2 id="steps-title">How to rank higher on Google, step by step</h2>
		<Steps {steps} />
	</section>

	<section class="band" aria-labelledby="where-title">
		<h2 id="where-title">Where your page stands decides what to do</h2>
		<div class="table-wrap">
			<table>
				<caption>What to work on depending on the page's current position for a search</caption>
				<thead>
					<tr>
						<th scope="col">Position in Search Console</th>
						<th scope="col">What it means</th>
						<th scope="col">What usually moves it</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Not indexed</th>
						<td>Google does not have the page</td>
						<td>Fix indexing first: <a href={guides.getOnGoogle.path}>get the page on Google</a></td>
					</tr>
					<tr>
						<th scope="row">50 and below</th>
						<td>Google barely connects the page with the search</td>
						<td>A page built for that search, or a clearer title and topic</td>
					</tr>
					<tr>
						<th scope="row">11 to 30</th>
						<td>Relevant, but outranked</td>
						<td>Better answer than the top results, internal links, a few good external links</td>
					</tr>
					<tr>
						<th scope="row">4 to 10</th>
						<td>On page one, below the fold</td>
						<td>Title that earns the click, content depth, links, speed</td>
					</tr>
					<tr>
						<th scope="row">1 to 3</th>
						<td>Winning</td>
						<td>Keep the page current; protect it in redesigns and migrations</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			Positions in Search Console are averages across every search and country. Filter by the query and the
			country you care about before deciding anything.
		</p>
	</section>

	<section aria-labelledby="tech-title">
		<h2 id="tech-title">Technical problems that hold every page down</h2>
		<ul class="checks">
			<li><strong>Pages Google does not index:</strong> <a href={guides.crawledNotIndexed.path}>crawled but not indexed</a>, <a href={guides.excludedNoindex.path}>noindex left from development</a> or <a href={guides.blockedRobots.path}>blocked by robots.txt</a>.</li>
			<li><strong>Several URLs for the same page:</strong> versions with and without www, slashes or parameters split the signals, shown as <a href={guides.duplicateCanonical.path}>duplicate canonical</a> statuses.</li>
			<li><strong>Slow pages on phones:</strong> a <a href={guides.cwvFailed.path}>failed Core Web Vitals assessment</a> loses close contests and visitors.</li>
			<li><strong>Content that needs JavaScript:</strong> pages that look empty before the scripts run, common in <a href={guides.vibeCoded.path}>sites built with AI app builders</a>.</li>
			<li><strong>Pages competing with each other:</strong> two pages for the same search, covered in <a href={guides.cannibalization.path}>keyword cannibalization</a>.</li>
		</ul>
		<p>
			These are what a <a href={services.audit.path}>technical SEO audit</a> finds, and fixing them usually
			lifts many rankings at once instead of one page at a time.
		</p>
	</section>

	<section class="band" aria-labelledby="dont-title">
		<h2 id="dont-title">What does not help</h2>
		<ul class="checks">
			<li><strong>Repeating the keyword:</strong> Google understands synonyms and topics; stuffing makes the page worse to read.</li>
			<li><strong>Bought links and link packages:</strong> they break Google's spam policies and can get the site a manual action.</li>
			<li><strong>Publishing many thin pages:</strong> a page per keyword variation or city with the same text ends up not indexed and drags the rest down.</li>
			<li><strong>Changing everything at once:</strong> you will not know what worked. Change a few pages, wait, measure.</li>
		</ul>
	</section>

	<Faq {faqs} title="Questions about ranking higher on Google" />

	<Related
		links={[
			{ href: guides.getOnGoogle.path, text: 'Get your website on Google first' },
			{ href: guides.cannibalization.path, text: 'The wrong page ranking for a keyword' },
			{ href: guides.auditErrors.path, text: 'Which SEO audit errors to fix first' },
			{ href: guides.brandedSearch.path, text: 'Rank first for your own brand' },
			{ href: services.audit.path, text: 'Technical SEO audit' }
		]}
	/>

	<Contact {email} title="Stuck on page two?" intro="Email the site and the searches you want to rank for. I reply with what holds the pages back and the change that should move them first." />
</main>
