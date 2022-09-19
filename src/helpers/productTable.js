export function createProductData(
  id,
  name,
  sku,
  stock,
  price,
  salePrice,
  ratings,
  status,
) {
  return {
    id,
    name,
    sku,
    stock,
    price,
    salePrice,
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
    id: 'sku',
    align: 'left',
    disablePadding: false,
    label: 'SKU',
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
    id: 'salePrice',
    align: 'left',
    disablePadding: false,
    label: 'Sale Price (SAR)',
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
