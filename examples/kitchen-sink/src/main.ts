import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

import { defaultTheme, daisyUITheme, iconifyTheme, setActiveTheme } from '@emamid/svelte-data-table'

setActiveTheme([defaultTheme, daisyUITheme, iconifyTheme]);

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app