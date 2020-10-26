import React, { Fragment, useEffect, useState } from 'react';

export default ({ header, data, size, Plot }) => {

   // LOCAL STATE
   const [lines, set_lines] = useState([])
   
   useEffect(() => {
      const colours = ['#FF99CC', '#CC99FF', '#99CCFF', '#99FF99', '#FFFF99']
      const container = []
      Object.keys(data).forEach((key, index) => {
         container.push({
            name: key.toUpperCase(),
            x: Object.keys(data[key]),
            y: Object.values(data[key]),
            type: 'scatter',
            mode: 'lines',
            hoverlabel: {
               bgcolor: 'black',
               namelength: 20,
               font: {
                  color: colours[index],
                  size: 14
               }
            },
            hovertemplate: '%{y} @ ' + key.toUpperCase() + '<extra></extra>',
            line: {
               width: 1,
               color: colours[index],
               opacity: 0.8
            }
         })
      })
      set_lines(container)
   }, [data])

   return (
      <Fragment>
         <div id={ 'header' }>{ header }</div>
         <div id={ 'plot' }>
            <Plot
               data={ lines }
               layout={{
                  width: size.width,
                  ...plot_layout,
                  xaxis: {
                     ...plot_layout.xaxis,
                     rangeslider: {}
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
   xaxis: grid_layout,
   yaxis: {
      ...grid_layout,
      fixedrange: true
   },
   plot_bgcolor: 'rgba(124, 213, 255, 0.11)',
   paper_bgcolor: 'transparent'
}