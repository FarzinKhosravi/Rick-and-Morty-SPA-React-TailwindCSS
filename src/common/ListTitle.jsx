function ListTitle({ title, items }) {
  if (!items.length) return;

  return (
    <div className="flex">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-300 md:mb-6 lg:text-xl">
        List of {title} :
      </h2>
      <div className="-mt-4 ml-3 flex items-center justify-center sm:hidden">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-400 text-xs text-slate-900 dark:bg-slate-700 dark:text-white">
          {items.length}
        </span>
      </div>
    </div>
  );
}

export default ListTitle;
