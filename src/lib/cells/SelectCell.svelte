<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Select } from 'flowbite-svelte';
	import type { ColumnConfig } from '../common.js';
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
	<Select
		{...$$props}
		items={items.map((item) => ({ value: item[valueProp], name: item[displayProp] }))}
		bind:value={newValue}
		autofocus
	/>
</TabWrapper>
