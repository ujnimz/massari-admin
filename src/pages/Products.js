import {useEffect} from 'react';
// UI
import PageLayout from '../components/layouts/PageLayout';
import Loading from './Loading';
import DataTable from '../components/body/DataTable';
// HELPERS
import {productsHeadCells, createProductData} from '../helpers/productTable';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../redux/slices/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const {isLoading, products} = useSelector(state => state.productState);

  useEffect(() => {
    dispatch(getProducts());

    return () => {
      //donothing();
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    );
  }

  const headCells = productsHeadCells;
  let dataRows = [];

  if (products?.length) {
    dataRows = products.map(item =>
      createProductData(
        item._id,
        item.name,
        item.stock,
        item.price,
        item.ratings,
        'Published',
      ),
    );
  }

  return (
    <PageLayout>
      {dataRows?.length ? (
        <DataTable rows={dataRows} headCells={headCells} />
      ) : (
        <h1>No Data</h1>
      )}
    </PageLayout>
  );
};

export default Products;
