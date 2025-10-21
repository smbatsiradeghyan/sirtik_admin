import { lazy } from 'react';


const Contacts = lazy(() => import('./contacts.page'));
const HeaderSections = lazy(() => import('./headerSections.page'));
// const Banners = lazy(() => import('./banner/banner.page'));
const Seo = lazy(() => import('./seo/seo.page'));
// const About = lazy(() => import('./about/about.page'));
// const Exhibition = lazy(() => import('./exhibition/exhibition.page'));
// const Exhibitions = lazy(() => import('./exhibition/exhibitions.page'));
// const Pictures = lazy(() => import('./pictures/pictures.page'));


// eslint-disable-next-line react-refresh/only-export-components
export const PagesList = [
  {
    name   : "Header Sections ✔️",
    path   : '/header-sections',
    element: <HeaderSections/>
  },
  {
    name   : "Seo ✔️",
    path   : '/seo',
    element: <Seo/>
  },
  {
    name   : "Contacts ✔️",
    path   : '/contacts',
    element: <Contacts/>
  },
  {
    name   : "About --",
    path   : '/about',
    element: <h1 className="text-6xl w-full flex items-center justify-center">Page doesn't create yet</h1>
  }, {
    name   : "Hero --",
    path   : '/hero',
    element: <h1 className="text-6xl w-full flex items-center justify-center">Page doesn't create yet</h1>
  }, {
    name   : "Certificates --",
    path   : 'certificates',
    element: <h1 className="text-6xl w-full flex items-center justify-center">Page doesn't create yet</h1>
  }, {
    name   : "Reviews --",
    path   : '/reviews',
    element: <h1 className="text-6xl w-full flex items-center justify-center">Page doesn't create yet</h1>
  }, {
    name   : "Posts --",
    path   : '/posts',
    element: <h1 className="text-6xl w-full flex items-center justify-center">Page doesn't create yet</h1>
  },
  {
    name   : "Post Category --",
    path   : '/posts-category',
    element: <h1 className="text-6xl w-full flex items-center justify-center">Page doesn't create yet</h1>
  },
  {
    name   : "404",
    path   : '*',
    element: <h1 className="text-6xl w-full flex items-center justify-center">Page doesn't create yet</h1>
  },
]
export const DashboardTabs = PagesList.map(({name, path:url}) => ({name, url})).filter(({name})=>name !== '404')
