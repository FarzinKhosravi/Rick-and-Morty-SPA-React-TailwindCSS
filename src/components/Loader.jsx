import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div className="flex items-center gap-4 text-slate-300">
      <p className="text-slate-300"> Loading Data...</p>
      <LoaderIcon className="h-5 w-5" />
    </div>
  );
}

export default Loader;
