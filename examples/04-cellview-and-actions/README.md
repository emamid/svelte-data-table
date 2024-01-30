# Actions and cell view component example

The Name column has an ```InputCell``` focus component, while the Dead column has a ```ToggleCell``` view component and the Fingers column has a ```SpinCell``` view component. Editing is implemented via ```cellChanged```. The Actions column has an ```ActionsCell``` as the view component, with delete and info actions (from the pre-made ones). The delete action is enabled only if ```dead === true``` for that row, and will delete that row which clicked. The info action will open a Flowbite ```Modal``` component.

![](../../screenshot-04.png)

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
