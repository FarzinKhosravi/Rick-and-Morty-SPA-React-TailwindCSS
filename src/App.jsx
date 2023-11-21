import { Toaster } from "react-hot-toast";
import Providers from "./components/Providers";
import Routes from "./routes/Routes";

function App() {
  return (
    <Providers>
      <div className="font-vollkorn min-h-screen bg-slate-900">
        <Routes />
        <Toaster />
      </div>
    </Providers>
  );
}

export default App;
