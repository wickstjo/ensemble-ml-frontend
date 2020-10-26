import React, { useContext } from 'react';
import { Context } from "../assets/context";
import '../interface/css/menu.scss';
import MenuItem from './menu/item';
import MenuTrigger from './menu/trigger';

export default () => {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

    return (
        <div id={ 'menu' }>
            <MenuItem
                header={ 'BROWSE' }
                link={ '/pipelines' }
            />
            <MenuTrigger
                header={ 'CREATE PIPELINE' }
                func={() => {
                    dispatch({
                        type: 'prompt',
                        payload: {
                            type: 'import',
                            header: 'create new pipeline',
                            other: {
                                api: 'create'
                            }
                        }
                    })
                }}
            />
        </div>
    )
}