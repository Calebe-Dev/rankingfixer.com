<script lang="ts">
	import { page } from '$app/state';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import { BRAND, guides, guidesPage, services } from '$lib/site';
</script>

<svelte:head>
	<title>Page not found | {BRAND}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main id="content">
	<header class="hero">
		{#if page.status === 404}
			<h1>Page not found</h1>
			<p>This address does not exist or was moved. These are the main pages of the site:</p>
		{:else}
			<h1>Something went wrong</h1>
			<p>The page could not be loaded. Try again or go to one of the pages below:</p>
		{/if}
	</header>
	<section>
		<ul>
			<li><a href="/">Home</a></li>
			{#each Object.values(services) as s (s.path)}
				<li><a href={s.path}>{s.name}</a></li>
			{/each}
			<li><a href={guidesPage.path}>Technical SEO guides</a></li>
			<li><a href={guides.notShowing.path}>{guides.notShowing.name}</a></li>
		</ul>
		<EmailCta subject="Website fix request (from the 404 page)" />
	</section>
</main>
