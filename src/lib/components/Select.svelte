<script lang="ts" generics="T">
	interface SelectOptions<T> {
		label: string;
		value: T;
	}

	interface Props {
		value?: T;
		options: SelectOptions<T>[];
		prompt?: string;
	}

	let { value = $bindable(), options = [], prompt }: Props = $props();
</script>

<select class="select" bind:value>
	{#if !!prompt}
		<option disabled selected>{prompt}</option>
	{/if}
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
