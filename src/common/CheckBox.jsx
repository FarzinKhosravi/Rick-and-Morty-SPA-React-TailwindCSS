function CheckBox({ formik, value, name, label }) {
  return (
    <div className="mb-3 flex items-center">
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={formik.handleChange}
        checked={formik.values[name].includes(value)}
        id={value}
        className="lg:h-4.5 lg:w-4.5 cursor-pointer rounded"
      />
      <label
        className="ml-2 mt-1 cursor-pointer text-slate-900 dark:text-slate-300 lg:text-lg"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
