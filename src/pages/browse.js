import React, { useState, useEffect } from 'react';
import List from '../components/list';
import axios from 'axios';

export default () => {

    // LOCAL STATE
    const [pipelines, set_pipelines] = useState([])

    // ON LOAD, FETCH ALL PIPELINES
    useEffect(() => {
        axios.get('http://localhost:8000/pipelines').then(result => {
            if (result.status === 200) {
                set_pipelines(result.data)
            }
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <List
            header={ 'browse available pipelines' }
            data={ pipelines }
            type={ 'links' }
            location={ 'pipelines' }
            show_count={ true }
        />
    )
}