import   { type FC, Suspense }     from 'react';
import { DeleteProvider }          from "@/contexts/delete";
import { Dashboard }               from "@/sections/dashboard";
import { Page }                    from "./page";
import { BrowserRouter as Router } from "react-router-dom";




export const AppRouter: FC = () => {
  return (
    <Router>
      <DeleteProvider>
        <div className="flex item-stretch justify-between h-screen w-screen gap-6">
          <div className="w-[300px] m-4 rounded-xl shadow-dashboard flex flex-col p-0 pos:relative"><Dashboard/></div>
          <div className="p-4 flex-1 overflow-y-auto overflow-x-hidden ">
            <Suspense fallback={<div>Loading...</div>}>
              <Page/>
            </Suspense>
          </div>
        </div>
      </DeleteProvider>
    </Router>
  );
};

