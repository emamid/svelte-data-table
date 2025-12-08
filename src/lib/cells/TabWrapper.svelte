<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { ColumnConfig } from '../common.js';

	interface Props {
		item?: any;
		column?: ColumnConfig | null;
		children?: import('svelte').Snippet;
	}

	let { item = null, column = null, children }: Props = $props();

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

<!-- svelte-ignore a11y_no_noninteractive_tabindex-->
<div tabindex="0" onfocus={prevTab}></div>
{@render children?.()}
<!-- svelte-ignore a11y_no_noninteractive_tabindex-->
<div tabindex="0" onfocus={nextTab}></div>
