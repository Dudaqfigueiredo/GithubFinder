import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export const Spinner = () => (
  <Fragment>

    <img
      src={spinner}
      alt="Loading..."
      style={{ width: '200px', margin: 'auto', display: 'block', marginTop:'50px' }}
    ></img>
  </Fragment>
);

export default Spinner;
