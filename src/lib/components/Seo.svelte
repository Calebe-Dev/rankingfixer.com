<script lang="ts">
	// <head> de cada página: title, metadados, canonical, Open Graph, Twitter/X e JSON-LD.
	import { BRAND, SITE_URL, UPDATED, aboutPage, dateModified, datePublished, pageKeywords, person, shareCard } from '$lib/site';
	import { absolute } from '$lib/schema';

	let {
		title,
		description,
		path,
		jsonLd,
		ogType = 'website'
	}: { title: string; description: string; path: string; jsonLd: object; ogType?: 'website' | 'article' } = $props();

	const SUFFIX = ` | ${BRAND}`;
	const url = $derived(absolute(path));
	// O Google exibe o nome do site separado (schema WebSite); acima de 60 caracteres o sufixo
	// de marca sai do <title> para o termo-alvo não ser cortado na busca.
	const pageTitle = $derived(title.length > 60 && title.endsWith(SUFFIX) ? title.slice(0, -SUFFIX.length) : title);
	const headline = $derived(title.endsWith(SUFFIX) ? title.slice(0, -SUFFIX.length) : title);
	const keywords = $derived(pageKeywords[path] ?? []);
	const year = UPDATED.slice(0, 4);

	// Card próprio de cada página, 1200×630 (LinkedIn, Facebook, X, WhatsApp, Slack)
	const image = $derived(`${SITE_URL}${shareCard(path)}`);
	const imageAlt = $derived(`${headline} — ${BRAND}`);

	// JSON dentro de <script>: escapa "<" para não fechar a tag por acidente
	const jsonLdScript = $derived(
		`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</` + 'script>'
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	{#if keywords.length}
		<meta name="keywords" content={keywords.join(', ')} />
	{/if}
	<meta name="author" content={person.name} />
	<meta name="publisher" content={BRAND} />
	<meta name="copyright" content={`© ${year} ${BRAND}`} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="theme-color" content="#0b1220" />

	<link rel="canonical" href={url} />
	<link rel="alternate" hreflang="en" href={url} />
	<link rel="alternate" hreflang="x-default" href={url} />
	<link rel="author" href={absolute(aboutPage.path)} />
	<link rel="publisher" href={`${SITE_URL}/`} />
	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
	<link rel="image_src" href={image} />

	<!-- Open Graph -->
	<meta property="og:type" content={ogType} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={BRAND} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={headline} />
	<meta property="og:description" content={description} />
	<meta property="og:updated_time" content={dateModified} />
	<meta property="og:image" content={image} />
	<meta property="og:image:secure_url" content={image} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />
	{#if ogType === 'article'}
		<meta property="article:author" content={person.homepage} />
		<meta property="article:publisher" content={`${SITE_URL}/`} />
		<meta property="article:published_time" content={datePublished(path)} />
		<meta property="article:modified_time" content={dateModified} />
		<meta property="article:section" content="Technical SEO" />
		{#each keywords as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={headline} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />

	{@html jsonLdScript}
</svelte:head>
