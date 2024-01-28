# Custom cell component example

A custom cell component is implemented in ```src/BarCell.svelte```. It fills the cell with a color bar from left to right, width being determined by the data value and ```maxValue``` in the component's config. In the example grid, ```BarCell``` is used as the ```viewComponent``` for the Level column, and ```viewComponentConfig.maxValue``` is set to the maximum ```level``` from all the items in the data.

![](../../screenshot-05.png)

## Installation

Install the package dependencies:

```sh
npm i
```

## Run

Start the Vite dev server:
```sh
npm run dev
```

Then click the "Local" link, http://localhost:5173 by default.
