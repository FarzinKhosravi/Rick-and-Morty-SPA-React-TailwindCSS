function RadioButton({ formik, name, value, label }) {
  return (
    <div className="ml-4 flex items-center first:ml-0">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={formik.handleChange}
        checked={formik.values[name] === value}
        id={value}
        className="cursor-pointer"
      />
      <label
        className="ml-1.5 cursor-pointer text-slate-900 dark:text-slate-300"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
