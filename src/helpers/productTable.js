export function createProductData(id, name, stock, price, ratings, status) {
  return {
    id,
    name,
    stock,
    price,
    ratings,
    status,
  };
}

export const productsHeadCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'stock',
    align: 'left',
    disablePadding: false,
    label: 'Stock',
  },
  {
    id: 'price',
    align: 'left',
    disablePadding: false,
    label: 'Price (SAR)',
  },
  {
    id: 'ratings',
    align: 'left',
    disablePadding: false,
    label: 'Ratings',
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'actions',
    align: 'right',
    disablePadding: false,
    label: 'Actions',
  },
];
