import {useState, useEffect} from 'react';
import {useParams, Navigate} from 'react-router-dom';
// MUI
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// UI
import PageLayout from '../../components/layouts/PageLayout';
import Loading from '../Loading';
import MainTitle from '../../components/ui/elements/MainTitle';
import ConfirmDialog from '../../components/ui/elements/ConfirmDialog';

// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {
  getOrder,
  updateOrder,
  deleteOrder,
} from '../../redux/slices/orderSlice';

// STYLES
const StyledPaper = styled(Paper)(({theme}) => ({
  width: '100%',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(5),
}));
const StyledButton = styled(LoadingButton)(({theme}) => ({
  width: '100%',
  fontWeight: 800,
  lineHeight: 3,
}));
const SectionTitle = styled(Typography)(({theme}) => ({
  marginBottom: theme.spacing(3),
  fontWeight: theme.typography.fontWeightBold,
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
  fontWeight: theme.typography.fontWeightMedium,
}));

const SingleOrder = () => {
  let {orderId} = useParams();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const [orderStatus, setOrderStatus] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [shippingPrice, setShippingPrice] = useState('');
  const [taxPrice, setTaxPrice] = useState('');
  const [paidAt, setPaidAt] = useState('');
  const [deliveredAt, setDeliveredAt] = useState('');

  const orderStatusList = [
    'Completed',
    'Delivered',
    'Shipped',
    'Delivery',
    'Pending Payment',
    'Processing',
    'Return',
    'On Hold',
    'Refunded',
    'Faild',
  ];

  const {
    isLoading: isOrderLoading,
    isSaving,
    isDeleting,
    order,
  } = useSelector(state => state.orderState);

  useEffect(() => {
    if (!isSubmitSuccess && (!order || order._id !== orderId)) {
      dispatch(getOrder(orderId));
    } else {
      setAddress(
        `${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.country}`,
      );
      setTelephone(order?.shippingInfo.phoneNo);
      setTotalPrice(order?.totalPrice);
      setOrderStatus(order?.orderStatus);
      setOrderItems(order?.orderItems);
      setShippingPrice(order?.shippingPrice);
      setTaxPrice(order?.taxPrice);
      setPaidAt(order?.paidAt);
      setDeliveredAt(order?.deliveredAt ? order?.deliveredAt : '');
    }
    return () => {
      setAddress('');
      setTelephone('');
      setTotalPrice('');
      setOrderStatus('');
      setPaidAt('');
    };
  }, [isSubmitSuccess, orderId, order, dispatch]);

  // Handle order status change switch
  const handleStatusChange = event => {
    setOrderStatus(event.target.value);
  };

  // Submit and Save Data
  const updateOrderSubmitHandler = e => {
    e.preventDefault();
    const orderData = {
      orderStatus,
    };

    dispatch(updateOrder({orderId, orderData}));
  };

  const handleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleDelete = () => {
    dispatch(deleteOrder({orderId}));
    setDialogOpen(!dialogOpen);
    setIsSubmitSuccess(true);
  };

  if (isOrderLoading) {
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    );
  }

  if (isSubmitSuccess && !isDeleting) {
    return <Navigate to={`/orders`} />;
  }

  return (
    <PageLayout>
      <Container maxWidth='lg'>
        <MainTitle title={`Order Details`} />

        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={updateOrderSubmitHandler}
        >
          <StyledPaper>
            <SectionTitle variant='h6' gutterBottom>
              General Details
            </SectionTitle>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                ID
              </Grid>
              <Grid item xs={8}>
                {orderId}
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={4}>
                Paid At
              </Grid>
              <Grid item xs={8}>
                {paidAt}
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={4}>
                Address
              </Grid>
              <Grid item xs={8}>
                {address}
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={4}>
                Email
              </Grid>
              <Grid item xs={8}>
                Test
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={4}>
                Telephone
              </Grid>
              <Grid item xs={8}>
                {telephone}
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={4}>
                Order Weight
              </Grid>
              <Grid item xs={8}>
                Test
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={4}>
                Order Sub-total
              </Grid>
              <Grid item xs={8}>
                {`${totalPrice} SAR`}
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>
              {deliveredAt !== '' ? (
                <>
                  <Grid item xs={4}>
                    Delivered At
                  </Grid>
                  <Grid item xs={8}>
                    {deliveredAt}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </>
              ) : (
                <></>
              )}

              <Grid item xs={4}>
                Order Status
              </Grid>
              <Grid item xs={8}>
                <Box sx={{minWidth: 120}}>
                  {orderStatusList ? (
                    isOrderLoading ? (
                      <span>loading...</span>
                    ) : (
                      <FormControl fullWidth>
                        <Select
                          labelId='order-status-label'
                          id='order-status-select'
                          value={orderStatus}
                          onChange={handleStatusChange}
                        >
                          {orderStatusList.map((status, index) => (
                            <MenuItem key={index} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )
                  ) : (
                    <span>No Categories</span>
                  )}
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>

          <StyledPaper>
            <SectionTitle variant='h6' gutterBottom>
              Order Items
            </SectionTitle>

            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label='order items table'>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align='left'>Description</TableCell>
                    <TableCell align='right'>Item Price&nbsp;(SAR)</TableCell>
                    <TableCell align='right'>Quantity</TableCell>
                    <TableCell align='right'>Total&nbsp;(SAR)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((item, index) => (
                    <TableRow
                      key={item._id}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell align='left'>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align='right'>{item.price}</TableCell>
                      <TableCell align='right'>{item.quantity}</TableCell>
                      <TableCell align='right'>
                        {item.price * item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={4} />
                    <TableCell rowSpan={4} />
                    <TableCell rowSpan={4} />
                    <StyledTableCell align='right'>Shipping</StyledTableCell>
                    <StyledTableCell align='right'>
                      {shippingPrice}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align='right'>Tax</StyledTableCell>
                    <StyledTableCell align='right'>{taxPrice}</StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align='right'>Total</StyledTableCell>
                    <StyledTableCell align='right'>
                      {totalPrice}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>

          <StyledPaper>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <StyledButton
                  type='submit'
                  variant='contained'
                  disabled={isOrderLoading}
                  loading={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Update'}
                </StyledButton>
              </Grid>
              <Grid item xs={2}>
                <StyledButton
                  startIcon={<DeleteIcon />}
                  color='error'
                  variant='contained'
                  disabled={isOrderLoading}
                  onClick={handleDialog}
                >
                  Delete
                </StyledButton>
              </Grid>
            </Grid>
          </StyledPaper>
        </Box>
      </Container>
      <ConfirmDialog
        loading={isDeleting}
        isOpen={dialogOpen || isDeleting}
        message={`Delete Product`}
        description={`Do you really want to delete the order? This action cannot be undone.`}
        handleClose={handleDialog}
        handleDelete={handleDelete}
      />
    </PageLayout>
  );
};

export default SingleOrder;
