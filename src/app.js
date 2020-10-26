import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "./assets/context";
import './interface/css/general.scss';

import Init from './assets/init';
import Menu from './components/menu';
import Pages from './assets/pages';
import Prompt from './components/prompt';
import Redirect from './components/redirect';

export default () => { return (
   <BrowserRouter>
      <Provider>
         <Init />
         <div id={ 'wrapper' }>
            <Menu />
            <Pages />
         </div>
         <Prompt />
         <Redirect />
      </Provider>
   </BrowserRouter>
)}