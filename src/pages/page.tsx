import { type FC, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';


// const Contacts = lazy(() => import('./contacts.page'));
// const Banners = lazy(() => import('./banner/banner.page'));
const Seo = lazy(() => import('./seo/seo.page'));
// const About = lazy(() => import('./about/about.page'));
// const Exhibition = lazy(() => import('./exhibition/exhibition.page'));
// const Exhibitions = lazy(() => import('./exhibition/exhibitions.page'));
// const Pictures = lazy(() => import('./pictures/pictures.page'));



export const Page: FC  = () => {
  return (

    <Routes>
      {/*<Route path={"/contacts"} element={<Contacts/>}/>*/}
      {/*<Route path={"/banner"} element={<Banners/>}/>*/}
      <Route path={"/seo"} element={<Seo/>}/>
      {/*<Route path={"/about"} element={<About/>}/>*/}
      {/*<Route path={"/pictures/"} element={<Pictures/>}/>*/}
      {/*<Route path={"/exhibition/"} element={<Exhibitions/>}/>*/}
      {/*<Route path={"/exhibition/:exhibitionSlug"} element={<Exhibition/>}/>*/}
      <Route path={"*"} element={<h1>Welcome</h1>}/>

    </Routes>


  );
};

