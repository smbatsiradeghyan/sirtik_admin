import { type FC, Suspense }                      from 'react';
import { DeleteProvider }                         from "@/contexts/delete";
import { Dashboard }                              from "@/sections/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PagesList }                              from "@/pages/pages";
import { LoadingWrapper }                         from "@/components/loadingWrapper.tsx";


export const AppRouter: FC = () => {
  return (
    <Router>
      <DeleteProvider>
        <div className="flex item-stretch justify-start h-screen w-screen">
          <div className="w-[250px] m-4 rounded-xl shadow-dashboard flex flex-col p-0 pos:relative"><Dashboard/></div>
          <div className="p-4 flex-1 overflow-y-auto overflow-x-hidden max-w-[1200px]">
            <Suspense fallback={<LoadingWrapper status title=""/>}>
              <Routes>
                {
                  PagesList.map(page => <Route key={page.path} path={page.path} element={page.element}/>)
                }
              </Routes>
            </Suspense>
          </div>
        </div>
      </DeleteProvider>
    </Router>
  );
};

