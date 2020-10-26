import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Browse from '../pages/browse';
import Pipeline from '../pages/pipeline';
import Error from '../pages/error';

import '../interface/css/innerbody.scss';

export default () => { return (
   <div id={ 'innerbody' }>
      <Switch>
         <Route exact path="/" component={() => <Redirect to={ '/pipelines' } /> } />
         <Route exact path={ '/pipelines' } component={ Browse } />
         <Route path={ '/pipelines/:name' } component={ Pipeline } />
         <Route component={ Error } />
      </Switch>
   </div>
)}