import {useEffect} from 'react';
// UI
import Loading from '../Loading';
import PageLayout from '../../components/layouts/PageLayout';
import CategoryTable from '../../components/body/CategoryTable';
// HELPERS
import {
  categoryHeadCells,
  createCategoryData,
} from '../../helpers/categoryTable';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategories} from '../../redux/slices/categorySlice';

const Categories = () => {
  const dispatch = useDispatch();
  const {isLoading, allCategories} = useSelector(state => state.categoryState);

  useEffect(() => {
    dispatch(getAllCategories());

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

  const headCells = categoryHeadCells;
  let dataRows = [];

  if (allCategories?.length) {
    dataRows = allCategories.map(item =>
      createCategoryData(item._id, item.name, item.products.length),
    );
  }

  return (
    <PageLayout>
      {dataRows?.length ? (
        <CategoryTable rows={dataRows} headCells={headCells} />
      ) : (
        <h1>No Data</h1>
      )}
    </PageLayout>
  );
};

export default Categories;
