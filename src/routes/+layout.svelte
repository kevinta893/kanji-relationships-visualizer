<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import DockNav from '$lib/components/DockNav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Kanji Relationships Visualizer Comparison</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container pb-16">
	{@render children()}
</div>

<DockNav />
