<script lang="ts">
	// "Related": links internos para páginas do mesmo cluster (âncoras descritivas e variadas).
	let { links, title = 'Related' }: { links: { href: string; text: string }[]; title?: string } = $props();
</script>

<nav class="related" aria-labelledby="related-title">
	<h2 id="related-title">{title}</h2>
	<ul>
		{#each links as link (link.href)}
			<li><a href={link.href}>{link.text}</a></li>
		{/each}
	</ul>
</nav>
