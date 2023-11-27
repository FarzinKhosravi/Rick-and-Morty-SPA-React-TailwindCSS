function ResetButton({ filterOptions }) {
  let conditionFilterOptions = "";

  function detectFilterOptions(filterOptions) {
    filterOptions.forEach((option) => {
      if (typeof option === "object")
        conditionFilterOptions += `${option.length || ""}`;
      else conditionFilterOptions += `${option || ""}`;
    });

    return conditionFilterOptions;
  }

  return (
    <div>
      <button
        className="block w-full cursor-pointer appearance-none rounded-xl border-none bg-red-600 px-4 py-3 text-center text-slate-800 outline-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:bg-gray-400 dark:text-slate-200 dark:disabled:bg-gray-600 lg:text-lg"
        type="submit"
        disabled={detectFilterOptions(filterOptions) ? false : true}
      >
        Reset
      </button>
    </div>
  );
}

export default ResetButton;
