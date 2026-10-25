<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { BRAND, contact, defaultEmail, emailLink, menu, person, siteGroups } from '$lib/site';

	let { children } = $props();

	// marca o link da página atual no menu (acessibilidade e destaque visual)
	const current = (href: string) => (page.url.pathname === href ? 'page' : undefined);
	const groupCurrent = (itens: { href: string }[]) => itens.some((item) => item.href === page.url.pathname);
</script>

<a class="skip" href="#content">Skip to content</a>

<header class="site-header">
	<a class="brand" href="/"><img src="/images/logo.svg" alt="" width="32" height="32" />{BRAND}</a>

	<!-- menu do celular sem JavaScript: a caixa de seleção abre e fecha o painel -->
	<input type="checkbox" id="menu-open" class="menu-control" />
	<label for="menu-open" class="menu-button"><span>Menu</span></label>

	<nav aria-label="Main">
		<ul>
			{#each menu as group (group.label)}
				<li class="menu-group" class:menu-group-current={groupCurrent(group.itens)}>
					<a href={group.href} aria-current={current(group.href)}>{group.label}</a>
					{#if group.itens.length}
						<ul>
							{#each group.itens as item (item.href)}
								<li><a href={item.href} aria-current={current(item.href)}>{item.label}</a></li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
			<li class="menu-cta"><a href={emailLink(defaultEmail.subject)}>{defaultEmail.label}</a></li>
		</ul>
	</nav>
</header>

{@render children()}

<footer class="site-footer">
	<div class="footer-main">
		<div class="footer-brand">
			<a class="brand" href="/"><img src="/images/logo.svg" alt="" width="32" height="32" />{BRAND}</a>
			<p>
				Technical SEO fixes implemented by a developer. Audits, Core Web Vitals, indexing issues and
				website migrations for businesses and agencies in the US and worldwide.
			</p>
			<address>
				<p><a href={emailLink(defaultEmail.subject)}>{contact.email}</a></p>
				<p>Run by <a href={person.homepage}>{person.name}</a>, remote from {person.city}, {person.country}.</p>
			</address>
		</div>

		<nav aria-label="Site map">
			{#each siteGroups as group (group.id)}
				<div>
					<h2>{group.title}</h2>
					<ul>
						{#each group.entries as entry (entry.href)}
							<li><a href={entry.href}>{entry.text}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</div>

	<div class="footer-base">
		<p>© {new Date().getFullYear()} {BRAND} · <a href="/sitemap.xml">XML sitemap</a></p>
		<ul>
			<li><a href={person.linkedin} rel="me">LinkedIn</a></li>
			<li><a href={person.github} rel="me">GitHub</a></li>
		</ul>
	</div>
</footer>
