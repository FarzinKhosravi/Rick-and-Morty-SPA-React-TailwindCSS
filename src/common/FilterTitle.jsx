function FilterTitle({ title }) {
  return (
    <div className="mb-2">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
        Filter of {title} :
      </h2>
    </div>
  );
}

export default FilterTitle;
