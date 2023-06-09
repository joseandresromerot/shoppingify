import classes from './category-select.module.css';
import CreatableSelect from 'react-select/creatable';
import { useSelector } from 'react-redux';

const CategorySelect = ({ onChange, value, ...rest }) => {
  const { categories } = useSelector(state => state.itemsData);
  const options = categories.map(c => ({
    value: c.id,
    label: c.name
  }));
  const optionValue = options.find(c => c.value === value);

  const styles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'transparent',
      border: "2px solid #BDBDBD",
      borderRadius: 12,
      height: 60
    }),

    placeholder: (styles) => ({
      ...styles,
      fontSize: "normal",
      fontWeight: "500",
      fontSize: 14,
      color: "#BDBDBD"
    })
  };

  return (
    <CreatableSelect
      options={options}
      value={optionValue}
      onChange={(selected) => {
        onChange(selected.value);
      }}
      styles={styles}
      {...rest}
    />
  );
};

CategorySelect.defaultProps = {
  onChange: () => {}
};

export default CategorySelect;