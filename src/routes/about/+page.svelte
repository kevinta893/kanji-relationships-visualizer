<script lang="ts">
	import { ArrowTopRightOnSquare } from 'svelte-heros-v2';
</script>

<svelte:head>
	<title>Kanji Relationships Visualizer Comparison - About</title>
</svelte:head>

<div class="flex h-[calc(100vh-4rem)] flex-col gap-4 bg-base-200 p-4 md:p-12">
	<h1 class="text-3xl">About</h1>

	<div class="flex items-center justify-between">
		<a
			href="https://github.com/kevinta893/kanji-relationships-visualizer"
			target="_blank"
			rel="noopener noreferrer"
			class="flex link items-center"
		>
			GitHub
			<ArrowTopRightOnSquare class="w-8" size="18" /></a
		>
	</div>

	<p>
		This is a simple visualization to compare Kanji across different aspects like readings and
		radicals.
	</p>
</div>
