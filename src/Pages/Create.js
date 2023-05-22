import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';

const CreatePage = () => {
  return (
    <Fragment> {/**Fragment oru parent avukayanu div nu pakaram  */}
      <Header />
      <Create/>
    </Fragment>
  );
};

export default CreatePage;
