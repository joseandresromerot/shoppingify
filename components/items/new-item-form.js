import classes from './new-item-form.module.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OutlinedTextfield from '../ui/field/outlined-textfield';
import TransparentButton from '../ui/button/transparent-button';
import RoundedButton from '../ui/button/rounded-button';
import OutlinedTextArea from '../ui/field/outlined-textarea';
import CategorySelect from './category-select';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAppMode, setCategories, setItems } from '@/store/actions/items';
import { showLoading, showMessage, hideMessage } from '@/store/actions/messages';
import { APP_MODES } from '@/store/reducers/itemsReducer';

const addCategory = async (name) => {
  const response = await fetch('/api/categories', {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Errooooor!");
  }

  return data;
};

const addNewItem = async ({ name, note, image_url, category_id }) => {
  const response = await fetch('/api/items', {
    method: "POST",
    body: JSON.stringify({ name, note, image_url, category_id }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Errooooor!");
  }

  return data;
};

const NewItemForm = () => {
  const dispatch = useDispatch();
  const [fetchCategories, setFetchCategories] = useState(true);

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
  }, [fetchCategories]);

  const handleAddCategory = async (newCategory) => {
    console.info('newCategory', newCategory);
    dispatch(showLoading());
    try {
      const result = await addCategory(newCategory);
      let message = "";

      if (result.success === true) {
        setFetchCategories(!fetchCategories);
        message = "New category added";
      } else {
        message = result.message;
      }

      dispatch(hideMessage());
      dispatch(showMessage(
        message,
        "Ok",
        () => {
          dispatch(hideMessage());
        },
        null,
        null
      ));
    } catch (error) {
      dispatch(hideMessage());
      dispatch(showMessage(
        error,
        "Ok",
        () => {
          dispatch(hideMessage());
        }
      ));
    }
  };

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
          dispatch(showLoading());
          addNewItem(values)
            .then(data => {
              setSubmitting(false);
              dispatch(hideMessage());
              dispatch(setItems(data.items));
              dispatch(setAppMode(APP_MODES.EDIT_SHOPPING_LIST));
              dispatch(showMessage(
                "Item added successfully",
                "Ok",
                () => {
                  dispatch(hideMessage());
                },
                null,
                null
              ));
            })
            .catch(err => {
              console.info('err', err);
              setSubmitting(false);
              dispatch(hideMessage());
              dispatch(showMessage(
                err,
                "Ok",
                () => {
                  dispatch(hideMessage());
                },
                null,
                null
              ));
            });
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
              onCreateOption={handleAddCategory}
            />
            
          </div>

          <div className={classes.toolbar}>
            <TransparentButton type="button" className={classes.cancel} onClick={() => dispatch(setAppMode(APP_MODES.EDIT_SHOPPING_LIST))}>cancel</TransparentButton>
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