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
        className="lg:h-4.5 lg:w-4.5 cursor-pointer"
      />
      <label
        className="ml-1.5 mt-1 cursor-pointer text-slate-900 dark:text-slate-300 lg:text-lg"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
