import React, { Fragment } from 'react';
import YAML from 'yaml';

export default ({ header, other }) => {

   // STRINGIFY THE OBJECT
   const stringified = YAML.stringify(other.data, {
      indent: 4
   })

   return (
      <Fragment>
         <div id={ 'header' }>{ header }</div>
         <div id={ 'viewer' }>
            <pre>{ stringified }</pre>
         </div>
      </Fragment>
   )
}