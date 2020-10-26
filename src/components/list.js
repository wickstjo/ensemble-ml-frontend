import React, { Fragment } from 'react';
import Header from './header';
import { Link } from 'react-router-dom';

export default ({ data, header, type, location, show_count=false }) => { return (
    <Fragment>
        <Header text={ show_count ? header + ' (' + data.length + ')' : header }  />
        <div id={ 'list' }>
            { data.map((value, index) =>
                <Row
                    key={ index }
                    type={ type }
                    value={ value }
                    location={ location }
                />
            )}
        </div>
    </Fragment>
)}

function Row({ type, value, location }) {
    switch(type) {

        // LINKS
        case 'links': { return (
            <Link to={ location + '/' + value }>
                <div id={ 'row' }>{ value }</div>
            </Link>
        )}

        // TRIGGERS
        case 'triggers': { return (
            <div id={ 'row' } onClick={ value[1] }>{ value[0] }</div>
        )}

        // FALLBACK
        default: { return (
            <div id={ 'row' }>{ value }</div>
        )}
    }
}