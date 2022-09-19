import {useState, useEffect} from 'react';
import {useParams, Navigate} from 'react-router-dom';
// MUI
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
// UI
import PageLayout from '../../components/layouts/PageLayout';
import Loading from '../Loading';
import MainTitle from '../../components/ui/elements/MainTitle';
import ConfirmDialog from '../../components/ui/elements/ConfirmDialog';

// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {
  getProduct,
  updateProduct,
  deleteProduct,
} from '../../redux/slices/productSlice';
import {getAllCategories} from '../../redux/slices/categorySlice';
// STYLES
const StyledPaper = styled(Paper)(({theme}) => ({
  width: '100%',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(5),
}));
const StyledTextInput = styled(TextField)(({theme}) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  fontWeight: 800,
}));
const StyledButton = styled(LoadingButton)(({theme}) => ({
  width: '100%',
  fontWeight: 800,
  lineHeight: 3,
}));
const UploadButton = styled(Button)(({theme}) => ({
  marginBottom: theme.spacing(5),
  fontWeight: 800,
}));
const StyledAvatar = styled('div')(({theme}) => ({
  marginBottom: theme.spacing(5),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1),
}));
const SectionTitle = styled(Typography)(({theme}) => ({
  marginBottom: theme.spacing(3),
  fontWeight: theme.typography.fontWeightBold,
}));
const ImageBox = styled('div')(({theme}) => ({
  position: 'relative',
  height: 150,
  width: 150,
}));
const ImageBoxImg = styled('img')(({theme}) => ({
  position: 'absolute',
  display: 'block',
}));

const SingleProduct = () => {
  let {productId} = useParams();
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [stock, setStock] = useState(null);
  const [sku, setSku] = useState(null);
  const [weight, setWeight] = useState(null);
  const [length, setLength] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [status, setStatus] = useState('Published');
  const [soldIndividually, setSoldIndividually] = useState(false);
  const [price, setPrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [seoTitle, setSeoTitle] = useState(null);
  const [seoDescription, setSeoDescription] = useState(null);

  const {
    isLoading: isProductsLoading,
    isSaving,
    isDeleting,
    product,
  } = useSelector(state => state.productState);
  const {isLoading: isCategoriesLoading, allCategories} = useSelector(
    state => state.categoryState,
  );

  useEffect(() => {
    if (!isSubmitSuccess && (!product || product._id !== productId)) {
      dispatch(getProduct(productId));
    } else {
      setName(product?.name);
      setDescription(product?.description);
      setPrice(product?.price);
      setSalePrice(product?.salePrice);
      setCategories(product?.categories);
      setSku(product?.sku);
      setStock(product?.stock);
      setSoldIndividually(product?.soldIndividually);
      setWeight(product?.weight);
      setLength(product?.length);
      setWidth(product?.width);
      setHeight(product?.height);
      setStatus(product?.status);
      setOldImages(product?.images);
      setImagesPreview([]);
      setSeoTitle(product?.seoTitle);
      setSeoDescription(product?.seoDescription);
    }
    return () => {
      setName(null);
      setDescription(null);
      setPrice(null);
      setSalePrice(null);
      setCategories([]);
      setSku(null);
      setStock(null);
      setSoldIndividually(false);
      setWeight(null);
      setLength(null);
      setWidth(null);
      setHeight(null);
      setStatus(null);
      setOldImages([]);
      setImagesPreview([]);
      setSeoTitle(null);
      setSeoDescription(null);
    };
  }, [isSubmitSuccess, productId, product, dispatch]);

  useEffect(() => {
    if (!allCategories) {
      dispatch(getAllCategories());
    }
    return () => {
      //second();
    };
  }, [allCategories, dispatch]);

  const updateProductImagesChange = e => {
    const files = Array.from(e.target.files);

    if (imagesPreview.length <= 0) {
      setImages([]);
      setImagesPreview([]);
    }
    setOldImages([]);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(oldImages => [...oldImages, reader.result]);
          setImages(oldImages => [...oldImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // const handleRemoveImage = id => {
  //   const newArr = [...oldImages];
  //   var index = newArr
  //     .map(x => {
  //       return x._id;
  //     })
  //     .indexOf(id);

  //   newArr.splice(index, 1);
  //   console.log(newArr);
  //   //setImagesPreview(oldImages => [...oldImages, ...newArr]);
  //   setOldImages(newArr);
  //   setImages(newArr);
  // };

  // Handle product status change switch
  const handleStatusChange = () => {
    setStatus(status => (status === 'Published' ? 'Draft' : 'Published'));
  };

  // Handle product sold individually change switch
  const handleSoldIndividuallyChange = () => {
    setSoldIndividually(soldIndividually => !soldIndividually);
  };

  // Handle product category check boxes
  const handleCategoryChange = ({_id, name}) => {
    let arrCopy = [...categories];
    const isIn = isCategoryIn(_id);
    if (isIn) {
      var index = arrCopy.indexOf(_id);
      arrCopy.splice(index, 1);
      setCategories(arrCopy);
    } else {
      arrCopy.push(_id);
      setCategories(arrCopy);
    }
  };

  // check if the category is in the product categories
  const isCategoryIn = id => {
    if (categories.length > 0) {
      const found = categories.some(cat_id => cat_id === id);
      return found;
    } else {
      return false;
    }
  };

  // Submit and Save Data
  const updateProductSubmitHandler = e => {
    e.preventDefault();

    const productData = {
      name,
      price,
      salePrice,
      description,
      stock,
      status,
      sku,
      soldIndividually,
      weight,
      length,
      width,
      height,
      categories,
      images,
      seoTitle,
      seoDescription,
    };

    dispatch(updateProduct({productId, productData}));
  };

  const handleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleDelete = () => {
    dispatch(deleteProduct({productId}));
    setDialogOpen(!dialogOpen);
    setIsSubmitSuccess(true);
  };

  if (isProductsLoading) {
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    );
  }

  if (isSubmitSuccess && !isDeleting) {
    return <Navigate to={`/products`} />;
  }

  return (
    <PageLayout>
      <Container maxWidth='lg'>
        <MainTitle title={`Edit ${product?.name}`} />

        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={updateProductSubmitHandler}
        >
          <Grid container>
            <StyledPaper>
              <Grid xs={12}>
                <SectionTitle variant='h6' gutterBottom>
                  General Details
                </SectionTitle>
                <FormGroup>
                  <StyledTextInput
                    id='outlined-name-input'
                    label='Name'
                    variant='outlined'
                    name='name'
                    value={name ? name : ''}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                  <StyledTextInput
                    id='outlined-description-input'
                    label='Description'
                    variant='outlined'
                    name='description'
                    multiline
                    rows={4}
                    value={description ? description : ''}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <StyledTextInput
                    id='outlined-name-input'
                    label='Regular Price'
                    variant='outlined'
                    name='price'
                    value={price ? price : ''}
                    onChange={e => setPrice(e.target.value)}
                    required
                  />
                  <StyledTextInput
                    id='outlined-name-input'
                    label='Sale Price'
                    variant='outlined'
                    name='salePrice'
                    value={salePrice ? salePrice : ''}
                    onChange={e => setSalePrice(e.target.value)}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={status === 'Published'}
                        onChange={handleStatusChange}
                      />
                    }
                    label={status}
                  />
                </FormGroup>
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Grid xs={12}>
                <SectionTitle variant='h6' gutterBottom>
                  Inventory
                </SectionTitle>
                <FormGroup>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <StyledTextInput
                        id='outlined-sku-input'
                        label='SKU'
                        variant='outlined'
                        name='sku'
                        value={sku ? sku : ''}
                        onChange={e => setSku(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextInput
                        id='outlined-stock-input'
                        label='Stock'
                        variant='outlined'
                        name='stock'
                        value={stock ? stock : ''}
                        onChange={e => setStock(e.target.value)}
                        required
                      />
                    </Grid>
                  </Grid>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={soldIndividually}
                        onChange={handleSoldIndividuallyChange}
                      />
                    }
                    label='Sold individually'
                  />
                </FormGroup>
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Grid xs={12}>
                <SectionTitle variant='h6' gutterBottom>
                  Shipping
                </SectionTitle>
                <FormGroup>
                  <StyledTextInput
                    id='outlined-weight-input'
                    label='Weight (kg)'
                    variant='outlined'
                    name='weight'
                    value={weight ? weight : ''}
                    onChange={e => setWeight(e.target.value)}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <StyledTextInput
                        id='outlined-length-input'
                        label='Length (cm)'
                        variant='outlined'
                        name='length'
                        value={length ? length : ''}
                        onChange={e => setLength(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <StyledTextInput
                        id='outlined-width-input'
                        label='Width (cm)'
                        variant='outlined'
                        name='width'
                        value={width ? width : ''}
                        onChange={e => setWidth(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <StyledTextInput
                        id='outlined-height-input'
                        label='Height (cm)'
                        variant='outlined'
                        name='height'
                        value={height ? height : ''}
                        onChange={e => setHeight(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Grid xs={12}>
                <SectionTitle variant='h6' gutterBottom>
                  Product Categories
                </SectionTitle>
                {allCategories ? (
                  isCategoriesLoading ? (
                    <span>loading...</span>
                  ) : (
                    <FormGroup>
                      {allCategories.map((cat, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={isCategoryIn(cat._id)}
                              onChange={() => handleCategoryChange(cat)}
                              name={cat._id}
                              inputProps={{'aria-label': 'controlled'}}
                            />
                          }
                          label={cat.name}
                        />
                      ))}
                    </FormGroup>
                  )
                ) : (
                  <span>No Categories</span>
                )}
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Grid xs={12}>
                <SectionTitle variant='h6' gutterBottom>
                  Product Images
                </SectionTitle>
                <StyledAvatar>
                  {oldImages?.length ? (
                    <Stack direction='row' spacing={2}>
                      {oldImages.map((item, index) => (
                        <ImageBox key={index}>
                          <ImageBoxImg
                            src={item.url}
                            alt={item.public_id}
                            loading='lazy'
                            width={150}
                            height={150}
                          />
                          <IconButton
                            style={{position: 'absolute'}}
                            //onClick={() => handleRemoveImage(item._id)}
                          >
                            <RemoveCircleIcon style={{color: 'red'}} />
                          </IconButton>
                        </ImageBox>
                      ))}
                    </Stack>
                  ) : (
                    ''
                  )}
                  {imagesPreview?.length ? (
                    <Stack direction='row' spacing={2}>
                      {imagesPreview.map((item, index) => (
                        <ImageBox key={index}>
                          <ImageBoxImg
                            src={item}
                            alt={item}
                            loading='lazy'
                            width={150}
                            height={150}
                            style={{display: 'block'}}
                          />
                          <IconButton
                            style={{position: 'absolute'}}
                            //onClick={() => handleRemoveImage(item._id)}
                          >
                            <RemoveCircleIcon style={{color: 'red'}} />
                          </IconButton>
                        </ImageBox>
                      ))}
                    </Stack>
                  ) : (
                    ''
                  )}
                </StyledAvatar>

                <UploadButton variant='contained' component='label'>
                  Select Images
                  <input
                    accept='image/*'
                    type='file'
                    name='images'
                    onChange={updateProductImagesChange}
                    multiple
                    hidden
                  />
                </UploadButton>
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Grid xs={12}>
                <SectionTitle variant='h6' gutterBottom>
                  SEO Meta
                </SectionTitle>
                <FormGroup>
                  <StyledTextInput
                    id='outlined-seo-title-input'
                    label='SEO title'
                    variant='outlined'
                    name='seoTitle'
                    value={seoTitle ? seoTitle : ''}
                    onChange={e => setSeoTitle(e.target.value)}
                  />
                  <StyledTextInput
                    id='outlined-seo-description-input'
                    label='SEO Description'
                    variant='outlined'
                    name='seoDescription'
                    multiline
                    rows={4}
                    value={seoDescription ? seoDescription : ''}
                    onChange={e => setSeoDescription(e.target.value)}
                  />
                </FormGroup>
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Grid container spacing={2}>
                <Grid xs={10}>
                  <StyledButton
                    type='submit'
                    variant='contained'
                    disabled={isProductsLoading}
                    loading={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </StyledButton>
                </Grid>
                <Grid xs={2}>
                  <StyledButton
                    startIcon={<DeleteIcon />}
                    color='error'
                    variant='contained'
                    disabled={isProductsLoading}
                    onClick={handleDialog}
                  >
                    Delete
                  </StyledButton>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Box>
      </Container>
      <ConfirmDialog
        loading={isDeleting}
        isOpen={dialogOpen || isDeleting}
        message={`Delete Product`}
        description={`Do you really want to delete the product ${name}? This action cannot be undone.`}
        handleClose={handleDialog}
        handleDelete={handleDelete}
      />
    </PageLayout>
  );
};

export default SingleProduct;
