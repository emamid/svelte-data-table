## Svelte Data Table based on [Tailwind](https://tailwindcss.com/)

This data table is designed for viewing and editing data in an array of objects. It works with Tailwind by default but any styling classes can be used via themeing. It supports custom cell editors, moving focus between cells with tab and enter, column sorting (simple and custom), conditional CSS, and more.

## Install

To add to an existing Svelte app, first install Tailwind if you haven't already:

```bash
> npx svelte-add@latest tailwindcss
```

Then install the data table component.
```bash
> npm i -D @emamid/svelte-data-table
```

## Note

Originally, this package used Flowbite, but I decided to reduce the number of things my package depends on. You can still use it with Flowbite, it's just not required. The primary change besides removing the Flowbite requirement is cleaning up all of the class properties and making them all work the same by using a theme data structure. Properties that used to be on the data table or part of the column config are now handled by specifying partial themes on the table or columns. I will be writing a migration guide for that but I want to get a Svelte 5 migration published right away, which the 1.x.x version is. I also need to update the documentation. I was previously using better-docs for that, but the last update was 3 years ago, so I'm looking for something else. If anyone has a suggestion to easily batch-generate docs for a Svelte component package, please drop me a line.

## Basic example

```html
<script lang="ts">
  import DataTable from '@emamid/svelte-data-table';
  import type { ColumnConfig } from '@emamid/svelte-data-table';

  const columns: ColumnConfig[] = [
    { canSort: true, key: 'firstName', title: 'First Name' },
    { canSort: true, key: 'lastName', title: 'Last Name' },
  ];

  const items: any[] = [
    { firstName: 'Bilbo', lastName: 'Baggins'},
    { firstName: 'Frodo', lastName: 'Baggins'},
    { firstName: 'Samwise', lastName: 'Gamgee'},
    { firstName: 'Meriadoc', lastName: 'Brandybuck'},
    { firstName: 'Peregrin', lastName: 'Took'},
  ];
</script>

<main>	
  <DataTable
    {columns}
    {items}
  />
</main>
```

Examples for most of the component's features are under /examples . You can find the documentation [here](https://emamid.github.io/svelte-data-table/).

#### Example 1 - Basic data table
![Example 1](./screenshot-01.png)

#### Example 2 - Table with cell focus components
![Example 2](./screenshot-02.png)

#### Example 3 - Table with cell focus Select components, cell renderers, and custom sort
![Example 3](./screenshot-03.png)

#### Example 4 - Table with actions and cell view components
![Example 4](./screenshot-04.png)

#### Example 5 - Table with custom cell component
![Example 5](./screenshot-05.png)

#### Example 6 - Table with cell and row class getter functions
![Example 6](./screenshot-06.png)

#### Kitchen Sink example - All of the above