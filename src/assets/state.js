// DEFUALT VALUES
const values = {

   // DATA
   data: {},

   // PROMPT PARAMS
   prompt: {
      visible: true,
      type: 'loading',
      payload: null
   },

   // REDIRECT PARAMS
   redirect: {
      status: false,
      location: ''
   },
}

// REDUCER
function reducer(state, { type, payload }) {
   switch (type) {

      // LOADING STATUS
      case 'init': { return {
         ...state,
         data: payload
      }}

      // SHOW SPECIFIC PROMPT
      case 'prompt': { return {
         ...state,
         prompt: {
            visible: true,
            ...payload
         }
      }}

      // HIDE PROMPT
      case 'hide-prompt': { return {
            ...state,
            prompt: {
               ...state.prompt,
               visible: false,
               payload: null
            }
      }}

      // REDIRECT TO PAGE
      case 'redirect': { return {
         ...state,
         redirect: {
            status: true,
            location: payload
         }
      }}

      // RESET REDIRECT LOGIC
      case 'reset-redirect': { return {
         ...state,
         redirect: {
            status: false,
            location: ''
         }
      }}
      
      // FALLBACK
      default: {
         console.log('CONTEXT REDUCER TYPE NOT FOUND');
         return state;
      }
   }
}

export {
   values,
   reducer
}