<script lang="ts">
	import { ArrowsRightLeft, InformationCircle } from 'svelte-heros-v2';
	import { page } from '$app/state';

	const path = $derived(page.url.pathname);
</script>

<div class="dock bg-base-300">
	<a href="/compare" class={[{ 'dock-active': path.startsWith('/compare') ? true : false }]}>
		<ArrowsRightLeft />
		<span class="dock-label">Compare</span>
	</a>

	<a href="/about" class={[{ 'dock-active': path.startsWith('/about') ? true : false }]}>
		<InformationCircle />
		<span class="dock-label">About</span>
	</a>
</div>
