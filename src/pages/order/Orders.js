import {useEffect} from 'react';
// UI
import Loading from '../Loading';
import PageLayout from '../../components/layouts/PageLayout';
import OrderTable from '../../components/body/OrderTable';
// HELPERS
import {orderHeadCells, createOrderData} from '../../helpers/orderTable';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from '../../redux/slices/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const {isLoading, orders} = useSelector(state => state.orderState);

  useEffect(() => {
    dispatch(getOrders());

    return () => {
      //donothing();
    };
  }, [dispatch]);

  //console.log(orders);

  if (isLoading) {
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    );
  }

  const headCells = orderHeadCells;
  let dataRows = [];

  if (orders?.length) {
    dataRows = orders.map(item =>
      createOrderData(item._id, item.totalPrice, item.paidAt, item.orderStatus),
    );
  }

  return (
    <PageLayout>
      {dataRows?.length ? (
        <OrderTable rows={dataRows} headCells={headCells} />
      ) : (
        <h1>No Data</h1>
      )}
    </PageLayout>
  );
};

export default Orders;
