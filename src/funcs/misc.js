// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

// WRAP RESPONSE IN PROMISE
function promisify(data, time) {
   return new Promise(resolve => {
      sleep(time * 1000).then(() => {
         resolve(data)
      })
   })
}

// eslint-disable-next-line no-extend-native
String.prototype.format = function() {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    })
}

// SELECT GRAPH TYPE
function options(json, dispatch, subheader) {

    // CONTAINER
    const container = []

    // LOOP THROUGH JSON KEYS
    Object.keys(json).forEach(key => {

        // DECONSTRUCT PARAMS
        const { data, graph } = json[key]

        // LOOP IN OPTIONS
        switch (graph) {

            // LINECHART
            case 'line':
                container.push([
                    key,
                    () => { dispatch({
                        type: 'prompt',
                        payload: {
                            type: 'line',
                            header: subheader.format(key),
                            data: data
                        }
                    }) }
                ])
            break;

            // CONFUSION MATRIX HEATMAP
            case 'matrix':
                container.push([
                    key,
                    () => { dispatch({
                        type: 'prompt',
                        payload: {
                            type: 'matrix',
                            header: subheader.format(key),
                            data: data
                        }
                    }) }
                ])
            break;

            // BARCHART
            case 'bar':
                container.push([
                    key,
                    () => { dispatch({
                        type: 'prompt',
                        payload: {
                            type: 'multibar',
                            header: subheader.format(key),
                            data: data
                        }
                    }) }
                ])
            break;

            // FALLBACK
            default: console.log('no graph match')
        }
    })

    return container
}

export {
   sleep,
   promisify,
   options
}