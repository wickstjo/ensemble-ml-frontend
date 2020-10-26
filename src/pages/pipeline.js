import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Context } from "../assets/context";
import List from '../components/list';
import Submenu from '../components/submenu';
import axios from 'axios';
import { options } from '../funcs/misc';

export default ({ match }) => {

    // GLOBAL STATE
    const { dispatch } = useContext(Context);

    // LOCAL STATE
    const [local, set_local] = useState({
        regression_fitting: [],
        predictions: {
            regression: [],
            classifiers: []
        },
        config: {},
        results: {},
        new_results: {}
    })

    // ADD RESULT TO LIST
    function add_result(name, value) {
        set_local({
            ...local,
            new_results: {
                ...local.new_results,
                [name + ' - new']: value
            }
        })
    }

    // ON LOAD, FETCH ALL PIPELINES
    useEffect(() => {
        axios.get('http://localhost:8000/pipelines/' + match.params.name).then(result => {
            if (result.status === 200) {
                console.log(result.data)
                set_local(result.data)
            }
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            <List
                header={ 'regression model fittings' }
                type={ 'triggers' }
                data={ options(
                    local.regression_fitting,
                    dispatch,
                    '{} fitting history'
                )}
            />
            <List
                header={ 'regression ensemble predictions' }
                type={ 'triggers' }
                data={ options(
                    local.predictions.regression,
                    dispatch,
                    '{} predictions'
                )}
            />
            { Object.keys(local.predictions.classifiers).map(model =>
                <List
                    key={ model }
                    header={ model + ' confusion matrix' }
                    type={ 'triggers' }
                    data={ options(
                        local.predictions.classifiers[model],
                        dispatch,
                        model + ' {} predictions'
                    )}
                />
            )}
            <List
                header={ 'profit predictions' }
                type={ 'triggers' }
                data={ options(
                    {
                        ...local.results,
                        ...local.new_results
                    },
                    dispatch,
                    'prediction profit/loss overview'
                )}
            />
            <Submenu
                pipeline={ match.params.name }
                config={ local.config }
                dispatch={ dispatch }
                update={ add_result }
            />
        </Fragment>
    )
}