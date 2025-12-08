<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { NumberInput } from 'flowbite-svelte';
	import type { ColumnConfig } from '../common.js';
	import TabWrapper from './TabWrapper.svelte';

	interface Props {
		item: any;
		column: ColumnConfig;
		value: number;
		[key: string]: any
	}

	let { ...props }: Props = $props();

	let internalValue: number = $derived(value);

	

	const dispatch = createEventDispatcher();

	const dispatchCellChanged = () => {
		if (props.value !== internalValue) {
			dispatch('cellChanged', {
				props.props.column,
				props.props.item,
				oldValue: props.value,
				newValue: internalValue,
			});
		}
	};

	const keypress = async (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			dispatch('enterPressed', {
				props.props.column,
				props.props.item,
			});
			dispatchCellChanged();
		}
	};

	const prevTab = (_event: any) => {
		dispatch('prevTab', {
			props.props.column,
			props.props.item,
		});
		dispatchCellChanged();
	};

	const nextTab = (_event: any) => {
		dispatch('nextTab', {
			props.props.column,
			props.props.item,
		});
		dispatchCellChanged();
	};
</script>

<TabWrapper on:prevTab={prevTab} on:nextTab={nextTab}>
	<NumberInput bind:value={internalValue} {...props} on:keypress={keypress} autofocus />
</TabWrapper>
