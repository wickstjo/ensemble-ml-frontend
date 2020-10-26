import React, { Fragment } from 'react';

export default ({ data, fallback, header }) => { return (
   <Fragment>
      <div id={ 'header' }>{ header }</div>
      <div id={ 'list' }>
         <Content
            data={ data }
            fallback={ fallback }
         />
      </div>
   </Fragment>
)}

function Content({ data, fallback }) {
   switch(Object.keys(data).length) {

      case 0: { return (
         <div id={ 'row' }>{ fallback }</div>
      )}

      default: {
         return Object.keys(data).map((key, index) =>
            <Row
               header={ key }
               content={ data[key] }
               key={ index }
            />
         )
      }
   }
}

function Row({ header, content }) { return (
   <div id={ 'row' }>
      <div className={ 'split' }>
         <div>{ header }</div>
         <div>{ content }</div>
      </div>
   </div>
)}