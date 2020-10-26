import React, { useContext, Fragment } from 'react';
import { Context } from "../../assets/context";
import axios from 'axios';
import YAML from 'yaml'

export default ({ header, other }) => {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // PARSE GIVEN FILE
   function parse(event) {
      event.persist();

      // IF THE INPUT ISNT EMPTY
      if (event.target.value !== null) {

         // FIND THE FILE
         const content = event.target.files[0];
         const reader = new FileReader();

         reader.onload = () => {
            axios.get(reader.result).then(response => {
               try {

                  // PARSE AS YAML
                  const content = YAML.parse(response.data)

                  // SHOW LOADING SCREEN
                  dispatch({
                        type: 'prompt',
                        payload: {
                           type: 'loading'
                        }
                  })

                  // SELECT API FUNCTION
                  switch (other.api) {

                     // USE WITH API
                     case 'use':
                        use(content)
                     break;

                     // CREATE WITH API
                     case 'create':
                        create(content)
                     break;

                     // FALLBACK
                     default:
                        console.log('BAD IMPORT API NAME')
                  }

               } catch(error) {
                  console.log('BAD YAML FILE')
                  dispatch({ type: 'hide-prompt' })
               }

               // IRREGARDLESS, CLEAR THE INPUT FIELD
               event.target.value = null;
            })
         }
   
         // TRIGGER THE READER
         reader.readAsDataURL(content);
      }
  }

   // SEND POST TO THE PIPELINE API
   function create(content) {
      axios.post('http://localhost:8000/create', {
         data: content

      // IF EVERYTHING WORKED PROPERLY
      }).then(response => {
         if (response.status === 200) {

            // REDIRECT TO THE PIPELINE PAGE
            dispatch({
               type: 'redirect',
               payload: '/pipelines/' + response.data.name
            })
         } else {
            console.log('RECEIVED WRONG STATUS CODE')
         }

         // IRREGARDLESS, STOP LOADING SCREEN
         dispatch({ type: 'hide-prompt' })

      // OTHERWISE, SHOW ERROR & STOP LOADING
      }).catch(error => {
         console.log(error)
         dispatch({ type: 'hide-prompt' })
      })
   }

   function use(content) {
      axios.post('http://localhost:8000/pipelines/' + other.pipeline + '/use' , {
         data: content

      // IF EVERYTHING WORKED PROPERLY
      }).then(response => {
         if (response.status === 200) {
            other.update(response.data.name, response.data.data)
         } else {
            console.log('RECEIVED WRONG STATUS CODE')
         }

         // IRREGARDLESS, STOP LOADING SCREEN
         dispatch({ type: 'hide-prompt' })

      // OTHERWISE, SHOW ERROR & STOP LOADING
      }).catch(error => {
         console.log(error)
         dispatch({ type: 'hide-prompt' })
      })
   }
   
   return (
      <Fragment>
         <div id={ 'header' }>{ header }</div>
         <div id={ 'container' }>
            <input
               id={ 'route' }
               type={ 'file' }
               onChange={ parse }
            />
            <div id={ 'label' }>Select or Drop a yaml config</div>
         </div>
      </Fragment>
   )
}