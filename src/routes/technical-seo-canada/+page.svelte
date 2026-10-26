<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { industries, markets, services, type Email } from '$lib/site';

	const path = markets.canada.path;
	const title = 'Technical SEO Consultant in Canada | Ranking Fixer';
	const description =
		'Remote technical SEO consultant for Canadian businesses in Toronto, Vancouver and Ottawa: audits, bilingual English and French sites, speed and migrations.';
	const email: Email = { subject: 'Technical SEO for a Canadian website', label: 'Send your Canadian site' };

	const crumbs = [{ name: markets.canada.name, path }];

	const faqs: FaqItem[] = [
		{
			question: 'Do you work with Canadian businesses remotely?',
			answer:
				'Yes. Ranking Fixer is a remote consultancy: I work from Brazil, one to two hours ahead of Toronto and Ottawa, so the working day overlaps with Eastern Canada and most of the afternoon with Vancouver. Audits, fixes and calls happen online, and there is no local office.'
		},
		{
			question: 'Do I need a French version of my website?',
			answer:
				"If you sell to consumers in Quebec, the Charter of the French Language, as amended by Bill 96, generally requires your commercial information, including the website, to be available in French. Confirm what applies to your business with a lawyer. My part is the technical side: URLs, hreflang and indexing of both language versions."
		},
		{
			question: 'How should English and French pages be set up for SEO?',
			answer:
				'Give each language its own URL, for example /en/ and /fr/ folders, link each page to its translation with hreflang tags for en-CA and fr-CA, and let visitors switch languages instead of redirecting them by location. Googlebot crawls mostly from the United States, so automatic redirects can hide the French version from Google.'
		},
		{
			question: 'Should a Canadian business use a .ca or a .com domain?',
			answer:
				'A .ca domain tells Google the site targets Canada, which helps when your customers are all Canadian. A .com works for both countries but needs clear signals, like Canadian prices, addresses and hreflang for en-CA, when it also serves the United States. Changing domains later is a migration, so decide before investing in links.'
		},
		{
			question: 'What does a technical SEO audit include for a Toronto business?',
			answer:
				'The same audit as anywhere: indexing, crawling, rendering, Core Web Vitals, structured data and site architecture. For Canadian sites it also checks the English and French versions, Canada and US targeting, and the local business data on each location page.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		service: {
			name: markets.canada.name,
			serviceType: 'Technical SEO consulting',
			description,
			audience: 'Canadian businesses and agencies',
			country: markets.canada.country
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Technical SEO Consultant in Canada</h1>
		<p>
			I audit and fix the technical problems that keep Canadian websites from ranking: pages Google will
			not index, slow mobile pages, broken migrations and the bilingual setups that make English and
			French versions compete with each other.
		</p>
		<p>
			Ranking Fixer is remote, with no Canadian office. I work one to two hours ahead of Toronto and
			Ottawa, so the working day is the same as yours.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="problems-title">
		<h2 id="problems-title">Technical SEO problems specific to Canadian websites</h2>
		<ul class="cards">
			<li>
				<span class="tag">Bilingual</span>
				<h3>English and French versions</h3>
				<p>Missing or wrong hreflang, translated pages that share one URL, and language redirects that hide French pages from Google.</p>
			</li>
			<li>
				<span class="tag">Quebec</span>
				<h3>New French pages to index</h3>
				<p>Stores that add French to sell in Quebec double their pages. Machine-translated copies often end up "crawled - currently not indexed".</p>
			</li>
			<li>
				<span class="tag">Canada and US</span>
				<h3>The wrong country ranking</h3>
				<p>US pages showing to Canadians, or the reverse, when prices, currency and hreflang for en-CA and en-US are not set.</p>
			</li>
			<li>
				<span class="tag">Locations</span>
				<h3>Office and store pages</h3>
				<p>Location pages across provinces that only swap the city name and get treated as duplicates.</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="bilingual-title">
		<h2 id="bilingual-title">Bilingual English and French sites: the setups and their SEO effect</h2>
		<div class="table-wrap">
			<table>
				<caption>Common ways to publish a Canadian site in two languages</caption>
				<thead>
					<tr>
						<th scope="col">Setup</th>
						<th scope="col">Example</th>
						<th scope="col">SEO effect</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Folders</th>
						<td><code>example.ca/en/</code> and <code>example.ca/fr/</code></td>
						<td>Recommended in most cases: one domain, shared authority, clear hreflang pairs</td>
					</tr>
					<tr>
						<th scope="row">Subdomains</th>
						<td><code>en.example.ca</code> and <code>fr.example.ca</code></td>
						<td>Works, but each subdomain builds signals more separately</td>
					</tr>
					<tr>
						<th scope="row">Separate domains</th>
						<td>One domain per language</td>
						<td>Two sites to maintain and link; only worth it for distinct brands</td>
					</tr>
					<tr>
						<th scope="row">Same URL, language by cookie or script</th>
						<td><code>example.ca</code> switching text in the browser</td>
						<td>Google indexes one language only; the other is invisible in search</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="cities-title">
		<h2 id="cities-title">SEO audits for Toronto, Vancouver and Ottawa businesses</h2>
		<p>
			The work is the same in every city, because it happens in the code and in Google Search Console.
			What changes is the time zone and the market:
		</p>
		<ul class="checks">
			<li><strong>Toronto and Ottawa:</strong> Eastern time, one to two hours behind me, so the full working day overlaps.</li>
			<li><strong>Vancouver:</strong> Pacific time, four to five hours behind me, so your morning is my afternoon.</li>
			<li><strong>Calgary and Edmonton:</strong> Mountain time, with most of the afternoon in common.</li>
		</ul>
		<p>
			If your business is a law firm, an online store or an agency, the
			<a href={industries.lawFirms.path}>law firm</a>, <a href={industries.ecommerce.path}>ecommerce</a> and
			<a href={industries.agencies.path}>white label</a> pages explain the problems specific to each.
		</p>
		<EmailCta {...email} />
	</section>

	<Faq {faqs} title="Questions from Canadian businesses" />

	<Related
		links={[
			{ href: services.audit.path, text: 'What the technical SEO audit covers' },
			{ href: services.migration.path, text: 'Migrations and domain changes' },
			{ href: services.coreWebVitals.path, text: 'Core Web Vitals optimization' },
			{ href: markets.newZealand.path, text: 'Technical SEO in New Zealand' }
		]}
	/>

	<Contact {email} title="Send your Canadian website" intro="Email the site, the city and, if it has one, the French version. I reply with the technical issues I see and how I would fix them." />
</main>
