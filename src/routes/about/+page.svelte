<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph } from '$lib/schema';
	import { aboutPage, person, services, type Email } from '$lib/site';

	const path = aboutPage.path;
	const title = 'About Ranking Fixer and Calebe Araujo | Ranking Fixer';
	const description =
		'Ranking Fixer is run by Calebe Araujo, a full-stack developer and tech lead in Brazil who audits websites and fixes technical SEO in code.';
	const email: Email = { subject: 'Hello from the about page', label: 'Email me' };

	const crumbs = [{ name: aboutPage.name, path }];

	const jsonLd = pageGraph({ path, title, description, crumbs, type: 'AboutPage' });
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>About Ranking Fixer and Calebe Araujo</h1>
		<p>
			Ranking Fixer is a technical SEO consultancy run by one developer: me, {person.name}. I find the
			technical problems that keep websites from ranking on Google and fix them in the code, the theme or
			the server.
		</p>
		<p>
			The name says what the work is. Not monthly reports, not content packages: the fixes that get pages
			indexed, fast and understood by search engines.
		</p>
	</header>

	<section aria-labelledby="who-title">
		<h2 id="who-title">Who does the work</h2>
		<p>
			I have been building websites since 2015. I started as a freelancer after a web design course in the
			days of Adobe Flash and early versions of Dreamweaver, when web developers were still called
			webmasters. Today I am a full-stack developer and tech lead based in {person.city}, {person.country},
			specialized in CMS integrations for multiple projects and in web performance optimization. At Grupo OC, I coordinate the
			IT team and lead the platform that connects the group's websites to a central headless CMS, including
			the migration of legacy systems to modern frameworks. Before that, I built landing pages and business
			websites with technical SEO and conversion tracking at a marketing agency.
		</p>
		<p>
			I work with Angular, Svelte, TypeScript, Node.js, Java, PostgreSQL, Docker, AWS and Cloudflare,
			and my degree is in Systems Analysis and Development at Fatec Itu (2023 to 2026). My full profile is on
			<a href={person.homepage}>calebearaujo.com.br</a>, <a href={person.linkedin}>LinkedIn</a> and
			<a href={person.github}>GitHub</a>.
		</p>
	</section>

	<section class="band" aria-labelledby="how-title">
		<h2 id="how-title">How I work</h2>
		<ul class="checks">
			<li><strong>Remote, in English,</strong> with working hours that overlap with the United States.</li>
			<li><strong>A quote per project,</strong> sent after I look at the site and before any work starts.</li>
			<li><strong>Direct contact:</strong> you talk to the person who audits and fixes the site, by email.</li>
			<li><strong>Proof over promises:</strong> every fix is checked in Search Console and in real speed data.</li>
		</ul>
	</section>

	<section aria-labelledby="not-title">
		<h2 id="not-title">What Ranking Fixer does not do</h2>
		<ul>
			<li>Guarantee rankings or positions. Nobody can, and promises like that are a warning sign.</li>
			<li>Buy links, build private blog networks or anything else against Google's spam policies.</li>
			<li>Sell content packages. The work is technical, and content is better left to people who know your business.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="site-title">
		<h2 id="site-title">This website is part of the portfolio</h2>
		<p>
			Ranking Fixer is built the way I build client fixes: prerendered static pages with no JavaScript of
			their own, structured data on every page that matches what you read, and a sitemap generated from
			the code. Run it through PageSpeed Insights or the Rich Results Test; the result is part of the pitch.
			Start with the <a href={services.audit.path}>technical SEO audit</a> to see how the work is organized.
		</p>
	</section>

	<Contact {email} title="Get in touch" intro="Email the website you want fixed, or just a question. You get a reply from me." />
</main>
