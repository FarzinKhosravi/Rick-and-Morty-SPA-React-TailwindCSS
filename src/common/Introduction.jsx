function Introduction({ introduction }) {
  if (!introduction) return;

  const { id, title, description, firstPage, icon } = introduction;

  return (
    <>
      <div className="mb-8 w-full text-center dark:text-slate-300">
        <h2 className="animate-light text-2xl font-semibold">{title}</h2>
      </div>
      <div className="mb-9">
        <p className="italic text-slate-900 dark:text-slate-300">
          {description}
          <br />
          <br />
          In this Application, You can Get Information about All the{" "}
          <span className="capitalize">{firstPage || id}</span>
          &nbsp; of the Series. <span className="not-italic">{icon}</span>
        </p>
      </div>
    </>
  );
}

export default Introduction;
