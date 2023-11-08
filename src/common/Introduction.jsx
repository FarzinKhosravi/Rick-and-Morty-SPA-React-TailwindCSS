function Introduction({ introduction }) {
  if (!introduction) return;

  const { title, description, firstPage } = introduction;

  return (
    <>
      <div className="mb-8 w-full text-center text-slate-300">
        <h2 className="animate-light text-3xl font-light">{title}</h2>
      </div>
      <div className="mb-9">
        <p className="font-light italic text-slate-300">
          {description}
          <br />
          <br />
          In this Application, You can Get Information about All the{" "}
          <span className="capitalize">{firstPage}</span>
          &nbsp; of the Series. <span className="not-italic">😍</span>
        </p>
      </div>
    </>
  );
}

export default Introduction;
