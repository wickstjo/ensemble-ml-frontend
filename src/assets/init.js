import { useContext, useEffect } from 'react';
import { Context } from './context';
import { sleep } from '../funcs/misc';

export default () => {
   
   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // LOAD ONCE
   useEffect(() => {

      // HIDE METAMASK GARBAGE
      if (window.ethereum !== undefined) {
         window.ethereum.autoRefreshOnNetworkChange = false;
      }

      sleep(1000).then(() => {
         dispatch({
            type: 'hide-prompt'
         })
      })

   // eslint-disable-next-line
   }, [])

   return null;
}