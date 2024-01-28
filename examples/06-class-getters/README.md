# Custom cell component example

Uses ```trClassGetter``` on the ```DataTable``` component to add a red background class (```bg-red-500```) to rows where ```item.alignment === 'evil'```, and ```tdClassGetter``` on the Name column's config to add a strikethrough decorator (```line-through decoration-wavy```) to the name when ```item.dead === true```.

![](../../screenshot-06.png)

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
