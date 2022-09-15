import {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
// MUI
import {styled} from '@mui/material/styles';
import {Typography} from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// UI
import PageLayout from '../../components/layouts/PageLayout';
import MainTitle from '../../components/ui/elements/MainTitle';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {addProduct} from '../../redux/slices/productSlice';
import {getAllCategories} from '../../redux/slices/categorySlice';

// STYLES
const StyledPaper = styled(Paper)(({theme}) => ({
  width: '100%',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(5),
}));
const SectionTitle = styled(Typography)(({theme}) => ({
  marginBottom: theme.spacing(3),
  fontWeight: theme.typography.fontWeightBold,
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
const StyledAvatar = styled('div')(({theme}) => ({
  marginBottom: theme.spacing(5),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1),
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
const UploadButton = styled(Button)(({theme}) => ({
  marginBottom: theme.spacing(5),
  fontWeight: 800,
}));

const NewProduct = () => {
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);
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
  const [imagesPreview, setImagesPreview] = useState([]);

  const [seoTitle, setSeoTitle] = useState(null);
  const [seoDescription, setSeoDescription] = useState(null);

  const {isLoading: isProductsLoading, product} = useSelector(
    state => state.productState,
  );
  // Get all the categories
  const {isLoading: isCategoriesLoading, allCategories} = useSelector(
    state => state.categoryState,
  );

  useEffect(() => {
    if (!allCategories) {
      dispatch(getAllCategories());
    }
    return () => {
      //second();
    };
  }, [allCategories, dispatch]);

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
    const isIn = isCategoryIn(_id);
    if (isIn) {
      let arrCopy = [...categories];
      var index = arrCopy
        .map(x => {
          return x.category_id;
        })
        .indexOf(_id);
      arrCopy.splice(index, 1);
      setCategories(arrCopy);
    } else {
      setCategories([...categories, {category_id: _id, category_name: name}]);
    }
  };

  // check if the category is in the product categories
  const isCategoryIn = id => {
    if (categories.length > 0) {
      const found = categories.some(cat => cat.category_id === id);
      return found;
    } else {
      return false;
    }
  };

  // Handle product images input
  const handleProductImagesChange = e => {
    const files = Array.from(e.target.files);

    if (imagesPreview.length <= 0) {
      setImages([]);
      setImagesPreview([]);
    }

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

  // Handle individual image remove
  const handleRemoveImage = id => {
    const newArr = [...imagesPreview];
    var index = newArr
      .map(x => {
        return x._id;
      })
      .indexOf(id);

    newArr.splice(index, 1);
    setImagesPreview(newArr);
    setImages(newArr);
  };

  const isReadyToSubmit = () => {
    return !(name && price && sku && stock);
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

    dispatch(addProduct({productData}));
    setSubmitted(true);
  };

  if (submitted && product) {
    return <Navigate to={`/products/${product._id}`} />;
  }

  return (
    <PageLayout>
      <Container maxWidth='lg'>
        <MainTitle title='Add New Product' />

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
                {isCategoriesLoading ? (
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
                )}
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Grid xs={12}>
                <SectionTitle variant='h6' gutterBottom>
                  Product Images
                </SectionTitle>
                <StyledAvatar>
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
                            onClick={() => handleRemoveImage(item._id)}
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
                    onChange={handleProductImagesChange}
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
              <Grid xs={12}>
                <StyledButton
                  loading={isProductsLoading}
                  type='submit'
                  variant='contained'
                  disabled={isReadyToSubmit()}
                >
                  Submit
                </StyledButton>
              </Grid>
            </StyledPaper>
          </Grid>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default NewProduct;
