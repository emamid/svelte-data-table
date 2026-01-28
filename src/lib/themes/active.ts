import { merge } from 'lodash';
import type { DataTableTheme } from '../common.js'

import { defaultTheme } from './default.js';

export let activeTheme = defaultTheme;

export const mergeThemes = (themes: DataTableTheme | DataTableTheme[]) => {
	return (Array.isArray(themes) ? themes : [themes]).reduce((processedThemes, theme) => {
		return merge(processedThemes, theme);
	}, {});
}

export const setActiveTheme = (themes: DataTableTheme | DataTableTheme[]) => {
	activeTheme = mergeThemes(themes);
	return activeTheme;
}
