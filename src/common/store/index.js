import React,{createContext,useReducer} from 'react';
import { rootIntialState, rootReducer } from '../reducer';

const Store = ({children}) => {
    const [state,dispatch] = useReducer(rootReducer(),rootIntialState);
    return(
        <Context.Provider value={[state,dispatch]}>
            {children}
        </Context.Provider>
    );
};
export const Context = createContext(rootIntialState);
export default Store;