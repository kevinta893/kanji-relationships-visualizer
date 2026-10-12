<script lang="ts">
	import Graph, { type Link, type Node } from '$lib/components/Graph.svelte';
	import { kanjiData } from '$lib/types/kanji';
	import { onMount } from 'svelte';

	let maxKanjiNodes: number = $state(500);
	let nodes: Node[] = $state([]);
	let links: Link[] = $state([]);
	let graph: Graph | null = $state(null);

	const generateGraph = () => {
		const nodeList: Node[] = [];
		const linkList: Link[] = [];
		const readingsSet: Set<string> = new Set();

		const kanjiEntries = Object.entries(kanjiData);
		console.log('Loading graph for', kanjiEntries.length, 'kanji');

		kanjiEntries.forEach((entry) => {
			const kanji = entry[0];
			const kanjiInfo = entry[1];

			kanjiInfo.readings_on?.forEach((reading) => readingsSet.add(reading));
			// kanjiInfo.readings_kun?.forEach((reading) => readingsSet.add(reading));
			// kanjiInfo.wk_readings_on?.forEach((reading) => readingsSet.add(reading));
			// kanjiInfo.wk_readings_kun?.forEach((reading) => readingsSet.add(reading));
		});

		readingsSet.forEach((reading) => {
			nodeList.push({
				id: reading,
				label: reading,
				group: 1,
			});
		});

		kanjiEntries.slice(0, maxKanjiNodes).forEach((entry) => {
			const kanji = entry[0];
			const kanjiInfo = entry[1];
			nodeList.push({
				id: kanji,
				label: kanji,
				group: 0,
			});
			linkList.push({
				source: kanji,
				target: kanjiInfo.readings_on[0],
			});
		});
		nodes = nodeList;
		links = linkList;

		graph?.loadGraph();
	};

	onMount(generateGraph);
</script>

<svelte:head>
	<title>Kanji Relationships Visualizer - Compare</title>
</svelte:head>

<Graph bind:this={graph} {nodes} {links}></Graph>
