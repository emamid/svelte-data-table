<script lang="ts">
	import type { ColumnConfig, DataCellEvent } from '../common.js';

	interface Props {
		item: any;
		column: ColumnConfig;
		children?: import('svelte').Snippet;
		onnexttab?: (event: DataCellEvent) => void;
		onprevtab?: (event: DataCellEvent) => void;
	}

	let {
		item,
		column,
		children,
		onnexttab,
		onprevtab,
	}: Props = $props();
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex-->
<div tabindex="0" onfocus={() => onprevtab?.({ column, item })}></div>
{@render children?.()}
<!-- svelte-ignore a11y_no_noninteractive_tabindex-->
<div tabindex="0" onfocus={() => onnexttab?.({ column, item })}></div>
