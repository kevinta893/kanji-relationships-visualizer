<script lang="ts">
	import { MagnifyingGlass } from 'svelte-heros-v2';

	interface Props {
		value: string;
		placeholder?: string;
	}

	let { value = $bindable(), placeholder }: Props = $props();

	let inputElement: HTMLInputElement | null = $state(null);

	export const focus = () => {
		inputElement?.focus();
	};
</script>

<label class="input w-full">
	<MagnifyingGlass />
	<input bind:this={inputElement} type="search" {placeholder} bind:value />
</label>
