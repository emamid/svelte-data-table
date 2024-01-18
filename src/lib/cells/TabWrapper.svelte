<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { ColumnConfig } from '../common.js';

	export let item: any = null;
	export let column: ColumnConfig | null = null;

	const dispatch = createEventDispatcher();

	const prevTab = (_event: any) => {
		dispatch('prevTab', {
			column,
			item,
		});
	};

	const nextTab = (_event: any) => {
		dispatch('nextTab', {
			column,
			item,
		});
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex-->
<div tabindex="0" on:focus={prevTab} />
<slot />
<!-- svelte-ignore a11y-no-noninteractive-tabindex-->
<div tabindex="0" on:focus={nextTab} />
