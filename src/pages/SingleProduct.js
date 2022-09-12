import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
// MUI
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// UI
import PageLayout from '../components/layouts/PageLayout';
import Loading from './Loading';
import MainTitle from '../components/ui/elements/MainTitle';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {getProduct, updateProduct} from '../redux/slices/productSlice';
import {Typography} from '@mui/material';

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
const StyledButton = styled(Button)(({theme}) => ({
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

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const {isLoading, product} = useSelector(state => state.productState);

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(getProduct(productId));
    } else {
      setName(product?.name);
      setDescription(product?.description);
      setRegularPrice(product?.price);
      setStock(product?.stock);
      setOldImages(product?.images);
      setImagesPreview([]);
    }
    return () => {
      setName('');
      setDescription('');
      setRegularPrice('');
      setStock('');
      setOldImages([]);
    };
  }, [productId, product, dispatch]);

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
      //console.log(images);
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = index => {
    const newArr = [...oldImages];
    newArr.splice(index, 1);
    console.log(newArr);
    setImagesPreview(oldImages => [...oldImages, ...newArr]);
    //setImages(oldImages => [...oldImages, ...newArr]);
    //setImages(oldImages => oldImages.splice(index, 1));
  };

  const updateProductSubmitHandler = e => {
    e.preventDefault();

    const productData = {
      name,
      price: regularPrice,
      description,
      stock,
      images,
    };

    dispatch(updateProduct({productId, productData}));
  };

  if (isLoading) {
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Container maxWidth='lg'>
        <MainTitle title={`Edit ${name}`} />

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
                  Product Details
                </SectionTitle>
                <StyledTextInput
                  id='outlined-name-input'
                  label='Name'
                  variant='outlined'
                  name='name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <StyledTextInput
                  id='outlined-description-input'
                  label='Description'
                  variant='outlined'
                  name='description'
                  multiline
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <StyledTextInput
                  id='outlined-name-input'
                  label='Regular Price'
                  variant='outlined'
                  name='regularPrice'
                  value={regularPrice}
                  onChange={e => setRegularPrice(e.target.value)}
                />
                <StyledTextInput
                  id='outlined-name-input'
                  label='Stock'
                  variant='outlined'
                  name='stock'
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                />
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
                            onClick={() => handleRemoveImage(index)}
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
                          <RemoveCircleIcon />
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
                <StyledButton
                  type='submit'
                  variant='contained'
                  disabled={isLoading}
                >
                  Update
                </StyledButton>
              </Grid>
            </StyledPaper>
          </Grid>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default SingleProduct;
