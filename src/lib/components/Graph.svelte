<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3'; // Core D3 library
	import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';

	interface Props {
		nodes: Node[];
		links: Link[];
	}

	export interface Node {
		id: string;
		label: string;
		group: number; // Useful for coloring/clustering
	}

	export interface Link {
		source: string; // ID of the source node
		target: string; // ID of the target node
		weight?: number; // Optional weight/strength
	}

	let { nodes, links }: Props = $props();

	// In a real app, you might want to load kanjiData here, but for this setup, we use sample data.

	let svgElement: SVGElement;

	export const loadGraph = () => {
		const container = d3.select(svgElement);
		const width = container.node().clientWidth;
		const height = container.node().clientHeight;

		// 1. Setup Group for transformations (Zoom/Pan) and clear previous content
		let g = container.append('g');
		// 2. Initialize the simulation with data
		const simulation = forceSimulation(nodes)
			.force(
				'link',
				forceLink(links)
					.id((d) => d.id)
					.distance(120)
			)
			.force('charge', forceManyBody().strength(-50))
			.force('center', forceCenter(width / 2, height / 2))
			.on('tick', ticked);

		// 3. Create and bind Link elements (Edges)
		const link = g
			.append('g')
			.attr('class', 'links')
			.selectAll('line')
			.data(links)
			.join('line')
			.attr('stroke', '#999')
			.attr('stroke-opacity', 0.6)
			.attr('stroke-width', 2);

		// 4. Create and bind Node elements (Circles)
		const node = g
			.append('g')
			.attr('class', 'nodes')
			.selectAll('circle')
			.data(nodes)
			.join('circle')
			.attr('r', 12)
			.attr('fill', (d) => (d.group === 1 ? '#e74c3c' : d.group === 2 ? '#3498db' : '#2ecc71'))
			.call(dragBehavior);

		// 5. Add Labels (Text on nodes)
		const label = g
			.append('g')
			.attr('class', 'labels')
			.selectAll('text')
			.data(nodes)
			.join('text')
			.attr('text-anchor', 'middle')
			.text((d) => d.label)
			.attr('font-size', '10px');

		// 6. Zoom/Pan Behavior
		const zoom = d3
			.zoom()
			.scaleExtent([0.1, 10])
			.on('zoom', (event) => {
				g.attr('transform', event.transform);
			});

		container.call(zoom);

		// 7. Simulation Tick Function
		function ticked() {
			// Update link positions
			link
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			// Update node positions
			node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
			label.attr('x', (d) => d.x).attr('y', (d) => d.y + 5); // Offset label below circle
		}

		// 8. Drag Behavior Implementation (Requires d3 force utilities)
		function dragBehavior(selection: any) {
			return selection.call(
				d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
			);
		}

		function dragstarted(event: any) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		function dragged(event: any) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		function dragended(event: any) {
			if (!event.active) simulation.alphaTarget(0); // Let physics take over again
			event.subject.fx = null;
			event.subject.fy = null;
		}

		// 9. Start the simulation
		simulation.alpha(1).restart();

		// Cleanup function
		return () => {
			simulation.stop();
		};
	};

	onMount(loadGraph);
</script>

<div class="graph-container">
	<svg bind:this={svgElement} width="100%" height="100%"></svg>
</div>

<style scoped>
	.graph-container {
		width: 100%;
		height: 600px;
		border: 1px solid #eee;
		background: lightgray;
	}
	/* See layout.css for styling for the nodes since they are not detected as used by rollup */
</style>
