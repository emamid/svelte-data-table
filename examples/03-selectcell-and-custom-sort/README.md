# Select cell, rendering function, and custom sort example

The Name column has an ```InputCell``` focus component, while the Race and Class columns have ```SelectCell``` focus components. Editing is implemented via the ```cellChanged event```. The Race and Class columns also have ```cellRender``` configs to return the race and class names instead of raceID and cellID, and ```sortFunction``` configs to sort by the names instead of IDs as well.

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
