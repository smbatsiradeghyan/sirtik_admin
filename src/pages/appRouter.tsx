import { type FC, Suspense }                      from 'react';
import { DeleteProvider }                         from "@/contexts/delete";
import { Dashboard }                              from "@/sections/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PagesList }                              from "@/pages/pages";
import { LoadingWrapper }                         from "@/components/loadingWrapper.tsx";
import { Card }                                   from "@/components/card.tsx";
import { LocaleProvider }                         from "@/contexts/locale";


export const AppRouter: FC = () => {
  return (
    <Router>
      <DeleteProvider>
        <LocaleProvider>
          <div className="flex item-stretch justify-start  w-screen pl-[282px] relative">
            <div className="left-0 t-0 w-[250px] m-4 rounded-xl shadow-dashboard flex  h-[calc(100%-32px)] fixed flex-col p-0  "><Dashboard/></div>
            <Card className="m-4 p-4 flex-1 overflow-y-auto overflow-x-hidden max-w-[1200px]">
              <Suspense fallback={<LoadingWrapper status title=""/>}>
                <Routes>
                  {
                    PagesList.map(page => <Route key={page.path} path={page.path} element={page.element}/>)
                  }
                </Routes>
              </Suspense>
            </Card>
          </div>
        </LocaleProvider>
      </DeleteProvider>
    </Router>
  );
};

