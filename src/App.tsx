import { LoadingProvider } from "@/contexts/loading";
import { AdminProvider }   from "@/contexts/admin";
import "./main.css"
import { Analytics } from '@vercel/analytics/react';

function App() {


  return (
    <LoadingProvider>
      <AdminProvider/>
      <Analytics />
    </LoadingProvider>
  )
}

export default App
