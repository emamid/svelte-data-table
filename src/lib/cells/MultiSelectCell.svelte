<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { MultiSelect } from 'flowbite-svelte';
	import type { ColumnConfig } from '../common.ts';
	import TabWrapper from './TabWrapper.svelte';

	export let item: any;
	export let column: ColumnConfig;
	export let displayProp: string = 'name';
	export let valueProp: string = 'id';
	export let items: any[] = [];
	export let value: any;

	let newValue = value;

	const dispatch = createEventDispatcher();

	$: if (value !== newValue) {
		dispatch('cellChanged', {
			column,
			item,
			oldValue: value,
			newValue: newValue,
		});
	}
</script>

<TabWrapper {column} {item} on:prevTab on:nextTab>
	<MultiSelect
		{...$$props}
		items={items.map((item) => ({ value: item[valueProp], name: item[displayProp] }))}
		bind:value={newValue}
		autofocus
	/>
</TabWrapper>
