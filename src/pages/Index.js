import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import IndexSectionNavigationsWhite2 from '../components/navigations-white/IndexSectionNavigationsWhite2';
import IndexSectionHeadersWhitePattern3 from '../components/headers-white-pattern/IndexSectionHeadersWhitePattern3';

const meta = {
  title: '',
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Index() {
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <IndexSectionNavigationsWhite2 />
      <IndexSectionHeadersWhitePattern3 />
    </React.Fragment>
  );
}

