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
import LoadingButton from '@mui/lab/LoadingButton';
// UI
import PageLayout from '../../components/layouts/PageLayout';
import MainTitle from '../../components/ui/elements/MainTitle';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {
  addCategory,
  resetCategoryState,
} from '../../redux/slices/categorySlice';

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

const NewCategory = () => {
  const dispatch = useDispatch();

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const [seoTitle, setSeoTitle] = useState(null);
  const [seoDescription, setSeoDescription] = useState(null);

  const {isSaving, category} = useSelector(state => state.categoryState);

  useEffect(() => {
    dispatch(resetCategoryState());
  }, [dispatch]);

  const isReadyToSubmit = () => {
    return !name;
  };

  // Submit and Save Data
  const updateCategorySubmitHandler = e => {
    e.preventDefault();
    const categoryData = {
      name,
      description,
      seoTitle,
      seoDescription,
    };
    dispatch(addCategory({categoryData}));
    setIsSubmitSuccess(true);
  };

  if (isSubmitSuccess && category) {
    return <Navigate to={`/categories/${category._id}`} />;
  }

  return (
    <PageLayout>
      <Container maxWidth='lg'>
        <MainTitle title='Add New Category' />

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
              <Grid xs={12}>
                <StyledButton
                  loading={isSaving}
                  type='submit'
                  variant='contained'
                  disabled={isReadyToSubmit()}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </StyledButton>
              </Grid>
            </StyledPaper>
          </Grid>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default NewCategory;
