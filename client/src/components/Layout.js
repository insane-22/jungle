import React from 'react';
import Header from "./Header";
import Footer from './Footer';
import { Helmet } from "react-helmet";

const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name='description' content={description} />
        <meta name='author' content={author} />
        <meta name='keywords' content={keywords} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{minHeight:"70vh"}}>
      {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'Jungle',
  description: 'Project Full stack dev',
  keywords: 'mern,react,node,express',
  author:'insane_22'
}

export default Layout
