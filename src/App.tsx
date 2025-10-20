import { LoadingProvider } from "@/contexts/loading";
import { AdminProvider }   from "@/contexts/admin";
import "./main.css"

function App() {


  return (
    <LoadingProvider>
      <AdminProvider/>
    </LoadingProvider>
  )
}

export default App
