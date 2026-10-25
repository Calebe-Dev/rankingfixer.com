<script lang="ts">
	// Lista ordenada visível; o mesmo array alimenta o HowTo do JSON-LD.
	import type { Step } from '$lib/schema';

	let { steps }: { steps: Step[] } = $props();
</script>

<ol class="steps">
	{#each steps as step (step.name)}
		<li><strong>{step.name}.</strong> {step.text}</li>
	{/each}
</ol>
