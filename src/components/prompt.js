import React, { useContext, useEffect } from 'react';
import { Context } from "../assets/context";
import { sleep } from "../funcs/misc";
import '../interface/css/prompt.scss';

import Multibar from './graphs/multibar';
import Line from './graphs/line';
import Matrix from './graphs/matrix';
import Import from './prompt/import';
import Viewer from './prompt/viewer';

import EventListener from 'react-event-listener';
import Plot from 'react-plotly.js';
import { SizeMe } from 'react-sizeme';

// PROMPT CONTAINER
function Prompt() {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // TOGGLE VISIBILITY BASED ON STATE
   useEffect(() => {
      if (state.prompt.visible) {
         document.getElementById('prompt').style.display = 'flex';
         sleep(100).then(() => {
            document.getElementById('wrapper').style.filter = 'blur(6px)';
            document.getElementById('prompt').style.opacity = 1;
         })
      } else {
         document.getElementById('prompt').style.opacity = 0;
         document.getElementById('wrapper').style.filter = 'none';
         sleep(100).then(() => {
            document.getElementById('prompt').style.display = 'none';
         })
      }
   }, [state.prompt.visible]);

   // CLOSE PROMPT ON ESC KEY
   function key_event(event) {
      if (state.prompt.visible && event.code === 'Escape') {
         dispatch({ type: 'hide-prompt' })
      }
   }

   return (
      <div id={ 'prompt' }>
         <div id={ 'inner' }>
            <SizeMe>{({ size }) =>
               <Content
                  type={ state.prompt.type }
                  header={ state.prompt.header }
                  data={ state.prompt.data }
                  other={ state.prompt.other }
                  size={ size }
               />
            }</SizeMe>
            <EventListener
               target={ document }
               onKeyDown={ key_event }
            />
            <span
               id="close"
               onClick={() => { dispatch({ type: 'hide-prompt' }) }}
            />
         </div>
      </div>
   )
}

// PROMPT CONTENT
function Content({ type, header, data, other, size }) {
   switch(type) {

      // LOADING
      case 'loading': {
         return <div className="lds-dual-ring" />
      }

      // JSON VIEWER
      case 'viewer': {
         return <Viewer
            header={ header }
            other={ other }
         />
      }

      // IMPORT PROMPT
      case 'import': {
         return <Import
            header={ header }
            other={ other }
         />
      }

      // MULTI BAR CHART
      case 'matrix': {
         return <Matrix
            header={ header }
            data={ data }
            size={ size }
            Plot={ Plot }
         />
      }

      // MULTI BAR CHART
      case 'multibar': {
         return <Multibar
            header={ header }
            data={ data }
            size={ size }
            Plot={ Plot }
         />
      }

      // LINE CHART
      case 'line': {
         return <Line
            header={ header }
            data={ data }
            size={ size }
            Plot={ Plot }
         />
      }

      // FALLBACK
      default: {
         return <div>Prompt type error</div>
      }
   }
}

export default Prompt;