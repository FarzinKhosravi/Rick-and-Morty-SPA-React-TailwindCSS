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
        className="cursor-pointer rounded"
      />
      <label
        className="ml-2 cursor-pointer text-slate-900 dark:text-slate-300"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
