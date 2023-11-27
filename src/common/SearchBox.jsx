function SearchBox({ formik, placeholder }) {
  return (
    <div className="mb-5">
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
          Search:
        </h3>
      </div>
      <div className="w-full">
        <input
          className="block w-full rounded-xl bg-slate-300 text-base text-slate-800 placeholder:text-slate-800 dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-400  lg:text-lg"
          type="text"
          name="userSearch"
          value={formik.values.userSearch}
          onChange={formik.handleChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default SearchBox;
