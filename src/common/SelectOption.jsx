function SelectOption({ formik, name, optionsList }) {
  return (
    <div className="w-full">
      <select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        className="w-full cursor-pointer rounded-xl bg-slate-300 text-base text-slate-800 dark:bg-slate-600 dark:text-slate-200"
      >
        {optionsList.map((option) => {
          return (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectOption;
