import { lazy } from 'react';


const Contacts = lazy(() => import('./contacts.page'));
const HeaderSections = lazy(() => import('./headerSections.page'));
const Hero = lazy(() => import('./hero.page'));
const Seo = lazy(() => import('./seo/seo.page'));
const About = lazy(() => import('./about.page'));
const Certificates = lazy(() => import('./certificates.page'));
const Categories = lazy(() => import('./categories.page'));
const PostsList = lazy(() => import('./posts/postList.page'));
const Post = lazy(() => import('./posts/post.page'));


// eslint-disable-next-line react-refresh/only-export-components
export const PagesList = [
  {
    name   : "Hero",
    path   : '/hero',
    element: <Hero/>
  },
  {
    name   : "About",
    path   : '/about',
    element: <About/>
  },


  {
    name   : "Certificates",
    path   : '/certificates',
    element: <Certificates/>
  },
  // {
  //   //   name   : "Reviews",
  //   //   path   : '/reviews',
  //   //   element: <h1 className="text-6xl w-full flex items-center justify-center">Page doesn't create yet</h1>
  //   // },
  {
    name   : "Post Category",
    path   : '/posts-category',
    element: <Categories/>
  },
  {
    name   : "Posts",
    path   : '/posts',
    element: <PostsList/>
  },
  {
    name   : "Posts",
    path   : '/posts/:slug',
    element: <Post/>
  },

  {
    name   : "404",
    path   : '*',
    element: <h1 className="text-6xl w-full flex items-center justify-center">Page doesn't create yet</h1>
  },
  {
    name   : "Contacts",
    path   : '/contacts',
    element: <Contacts/>
  },
  {
    name   : "Header Sections",
    path   : '/header-sections',
    element: <HeaderSections/>
  },
  {
    name   : "Seo",
    path   : '/seo',
    element: <Seo/>
  },
]
export const DashboardTabs = PagesList.map(({name, path: url}) => ({name, url})).filter(({name,url}) => name !== '404' && url !== '/posts/:slug' )
