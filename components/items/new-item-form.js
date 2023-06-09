import classes from './new-item-form.module.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OutlinedTextfield from '../ui/field/outlined-textfield';
import TransparentButton from '../ui/button/transparent-button';
import RoundedButton from '../ui/button/rounded-button';
import OutlinedTextArea from '../ui/field/outlined-textarea';
import CategorySelect from './category-select';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from '@/store/actions/items';

const NewItemForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch('/api/categories', {
        method: "GET"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Errooooor!");
      }

      return data;
    };

    getCategories()
      .then(data => {
        dispatch(setCategories(data.categories));
      })
      .catch(err => {
        console.info('err', err);
      });
  }, []);

  return (
    <div className={classes.container}>
      <Formik
        initialValues={{
          name: "",
          note: "",
          image_url: "",
          category_id: ""
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Requerido"),
          note: Yup.string().nullable(),
          image_url: Yup.string().nullable(),
          category_id: Yup.string().required("Requerido"),
        })}
        onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
        }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         setFieldValue
       }) => {
        return (
        <form onSubmit={handleSubmit}>
          <h2 className={classes.title}>Add a new item</h2>

          <div className={classes.fields}>
            <label className={classes.label}>Name</label>
            <OutlinedTextfield
              type="text"
              name="name"
              placeholder="Enter a name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              containerClassName={classes.field}
              error={errors.name && touched.name && errors.name}
            />

            <label className={classes.label}>Note (optional)</label>
            <OutlinedTextArea
              type="text"
              name="note"
              placeholder="Enter a note"
              value={values.note}
              onChange={handleChange}
              onBlur={handleBlur}
              containerClassName={`${classes.field} ${classes.note}`}
              className={classes.noteField}
              error={errors.note && touched.note && errors.note}
              rows={4}
            />

            <label className={classes.label}>Image (optional)</label>
            <OutlinedTextfield
              type="text"
              name="image_url"
              placeholder="Enter a url"
              value={values.image_url}
              onChange={handleChange}
              onBlur={handleBlur}
              containerClassName={classes.field}
              error={errors.image_url && touched.image_url && errors.image_url}
            />

            <label className={classes.label}>Category</label>
            <CategorySelect
              name="category_id"
              onChange={value => setFieldValue("category_id", value)}
              onBlur={handleBlur}
              value={values.category_id}
              placeholder="Enter a category"
              onCreateOption={newOption => console.info('newOption', newOption)}
            />
            
          </div>

          <div className={classes.toolbar}>
            <TransparentButton className={classes.cancel} onClick={() => {}}>cancel</TransparentButton>
            <RoundedButton type="submit" disabled={isSubmitting} className={classes.save}>Save</RoundedButton>
          </div>
        </form>
        );
      }}
     </Formik>
    </div>
  );
};

export default NewItemForm;