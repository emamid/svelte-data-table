/**
 * Cell containing a numeric value and plus and minus buttons. The value is decremented or incremented when the buttons are clicked.
 * @typedef {object} SpinCell
 * @property {number} [decValue] - Amount to decrement the value by when the minus button is clicked. Defaults to 1.
 * @property {number} [incValue] - Amount to increment the value by when the plus button is clicked. Defaults to 1.
 * @property {number} [minValue] - If specified, the minus button cannot make the value go lower than this.
 * @property {number} [maxValue] - If specified, the plus button cannot make the value go higher than this.
 * @property {ConstructorOfATypedSvelteComponent} [minusIcon] Svelte component class for the minus icon. Defaults to MinusSolid from {@link https://flowbite.com/icons/}
 * @property {string} [minusIconClass] - CSS class of the minus icon, defaults to 'pr-1 w-3 h-3'
 * @property {ConstructorOfATypedSvelteComponent} [plusIcon] Svelte component class for the plus icon. Defaults to PlusSolid from {@link https://flowbite.com/icons/}
 * @property {string} [plusIconClass] - CSS class of the plus icon, defaults to 'pr-1 w-3 h-3'
 */
