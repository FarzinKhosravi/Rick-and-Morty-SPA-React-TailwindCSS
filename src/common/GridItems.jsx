function GridItems({ items, renderWebItems }) {
  return (
    <div
      className={`hidden grid-cols-2 gap-x-8 gap-y-6 xl:grid-cols-3 2xl:grid-cols-4 ${
        !items.length ? "md:flex md:items-center md:justify-center" : "md:grid"
      }`}
    >
      {renderWebItems()}
    </div>
  );
}

export default GridItems;
