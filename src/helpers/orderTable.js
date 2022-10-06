export function createOrderData(id, totalPrice, paidAt, orderStatus) {
  return {
    id,
    totalPrice,
    paidAt,
    orderStatus,
  };
}

export const orderHeadCells = [
  {
    id: 'totalPrice',
    align: 'left',
    disablePadding: true,
    label: 'Total Price (SAR)',
  },
  {
    id: 'paidAt',
    align: 'left',
    disablePadding: false,
    label: 'Paid At',
  },
  {
    id: 'orderStatus',
    align: 'left',
    disablePadding: false,
    label: 'Order Status',
  },
  {
    id: 'actions',
    align: 'right',
    disablePadding: false,
    label: 'Actions',
  },
];
