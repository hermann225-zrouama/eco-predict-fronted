import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PredictSectionNavigationsWhite1 from '../components/navigations-white/PredictSectionNavigationsWhite1';
import PredictSection__structures2 from '../components/__structures/PredictSection__structures2';
import PredictSection__structures5 from '../components/__structures/PredictSection__structures5';

const meta = {
  title: '',
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Predict() {
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <PredictSectionNavigationsWhite1 />
      <PredictSection__structures2 />
      <PredictSection__structures5 />
    </React.Fragment>
  );
}

