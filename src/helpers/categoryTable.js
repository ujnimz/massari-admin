export function createCategoryData(id, name, productCount) {
  return {
    id,
    name,
    productCount,
  };
}

export const categoryHeadCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'productCount',
    align: 'left',
    disablePadding: false,
    label: 'Product Count',
  },
  {
    id: 'actions',
    align: 'right',
    disablePadding: false,
    label: 'Actions',
  },
];
