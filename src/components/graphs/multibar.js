import React, { Fragment, useEffect, useState } from 'react';

export default ({ header, data, size, Plot }) => {

   // LOCAL STATE
   const [bars, set_bars] = useState([])

   useEffect(() => {
      const colours = ['#FF99CC', '#CC99FF', '#99CCFF', '#99FF99', '#FFFF99']
      const container = []

      Object.keys(data).forEach((key, index) => {
         container.push({
            name: key,
            x: Object.keys(data[key]),
            y: Object.values(data[key]),
            type: 'bar',
            text: Object.values(data[key]).map(value => {
               return String(value).substring(0, 5)
            }),
            textfont: {
               size: 14,
               color: 'white'
            },
            textposition: 'outside',
            marker: {
               color: colours[index],
               opacity: 0.7
            }
         })
      })
      set_bars(container)
   }, [data])

      // ADD ALL VALUES TO AN ARRAY
      const foo = [
         ...Object.values(data.R2),
         ...Object.values(data['R2 ADJ']),
      ]

      // SMALLEST VALUE
      const smallest = Math.min(...foo)

   return (
      <Fragment>
         <div id={ 'header' }>{ header }</div>
         <div id={ 'plot' }>
            <Plot
               data={ bars }
               layout={{
                  width: size.width,
                  ...plot_layout,
                  yaxis: {
                     ...plot_layout.yaxis,
                     range: [smallest * 0.98, 1.0015],
                  }
               }}
               config={{
                  scrollZoom: true,
               }}
            />
         </div>
      </Fragment>
   )
}

// STATIC GRID LAYOUT
const grid_layout = {
   linecolor: 'rgba(124, 213, 255, 0.425)',
   tickcolor: 'rgba(124, 213, 255, 0.425)',
   linewidth: 1,
   mirror: true,
   gridcolor: '#ffffff15',
   tickfont : {
      size : 14,
      color : 'white'
   }
}

// STATIC PLOT LAYOUT
const plot_layout = {
   height: 450,
   margin: {
      l: 50,
      r: 1,
      b: 30,
      t: 2,
      pad: 0
   },
   showlegend: true,
   legend: {
      font: {
         size: 13,
         color: 'white'
      },
      borderwidth: 2,
      x: 1.02,
      y: 0.5
   },
   xaxis: {
      ...grid_layout,
      fixedrange: true
   },
   yaxis: {
      ...grid_layout,
      fixedrange: true
   },
   plot_bgcolor: 'rgba(124, 213, 255, 0.11)',
   paper_bgcolor: 'transparent'
}