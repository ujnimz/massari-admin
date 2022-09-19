import {useState, useEffect} from 'react';
import {useParams, Navigate} from 'react-router-dom';
// MUI
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
// UI
import PageLayout from '../../components/layouts/PageLayout';
import Loading from '../Loading';
import MainTitle from '../../components/ui/elements/MainTitle';
import ConfirmDialog from '../../components/ui/elements/ConfirmDialog';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {
  getCategory,
  updateCategory,
  deleteCategory,
} from '../../redux/slices/categorySlice';
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
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: 3,
}));
const SectionTitle = styled(Typography)(({theme}) => ({
  marginBottom: theme.spacing(3),
  fontWeight: theme.typography.fontWeightBold,
}));

const SingleCategory = () => {
  let {categoryId} = useParams();
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const [seoTitle, setSeoTitle] = useState(null);
  const [seoDescription, setSeoDescription] = useState(null);

  const {isLoading, isSaving, isDeleting, category} = useSelector(
    state => state.categoryState,
  );

  useEffect(() => {
    if (!isSubmitSuccess && (!category || category._id !== categoryId)) {
      dispatch(getCategory(categoryId));
    } else {
      setName(category?.name);
      setDescription(category?.description);
      setSeoTitle(category?.seoTitle);
      setSeoDescription(category?.seoDescription);
    }
    return () => {
      setName(null);
      setDescription(null);
      setSeoTitle(null);
      setSeoDescription(null);
    };
  }, [isSubmitSuccess, categoryId, category, dispatch]);

  // Submit and Save Data
  const updateCategorySubmitHandler = e => {
    e.preventDefault();

    const categoryData = {
      name,
      description,
      seoTitle,
      seoDescription,
    };

    dispatch(updateCategory({categoryId, categoryData}));
  };

  const handleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleDelete = () => {
    dispatch(deleteCategory({categoryId}));
    setDialogOpen(!dialogOpen);
    setIsSubmitSuccess(true);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    );
  }

  if (isSubmitSuccess && !isDeleting) {
    return <Navigate to={`/categories`} />;
  }

  return (
    <PageLayout>
      <Container maxWidth='lg'>
        <MainTitle title={`Edit ${category?.name}`} />

        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={updateCategorySubmitHandler}
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
                </FormGroup>
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
                    disabled={isLoading}
                    loading={isSaving}
                  >
                    Save
                  </StyledButton>
                </Grid>
                <Grid xs={2}>
                  <StyledButton
                    startIcon={<DeleteIcon />}
                    color='error'
                    variant='contained'
                    disabled={isLoading}
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
        message={`Delete Category`}
        description={`Do you really want to delete the category ${name}? This action cannot be undone.`}
        handleClose={handleDialog}
        handleDelete={handleDelete}
      />
    </PageLayout>
  );
};

export default SingleCategory;
