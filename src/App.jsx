import { Toaster } from "react-hot-toast";
import Providers from "./components/Providers";
import Routes from "./routes/Routes";

function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-slate-100 font-vollkorn dark:bg-slate-900">
        <Routes />
        <Toaster />
      </div>
    </Providers>
  );
}

export default App;
