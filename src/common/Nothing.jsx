function Nothing() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-24 translate-x-16 translate-y-0 -rotate-45">
        <span className="block text-2xl font-black text-slate-800 dark:text-yellow-400">
          Haaa...
        </span>
      </div>
      <div className="max-w-72">
        <img
          className="block w-full"
          src="../../../public/00.png"
          alt="Not Found"
        />
      </div>
      <div className="w-20 -translate-x-16 -translate-y-8 -rotate-45">
        <span className="block text-2xl font-black text-slate-800 dark:text-yellow-400">
          Nooo
        </span>
      </div>
    </div>
  );
}

export default Nothing;
