import * as React from "react";

import reducer, { NoteActions } from "../actions/NoteReducer";
import { useFetch } from "../hooks";

import { ENDPOINT, Item } from "../main";

type NoteContextValue = {
    items: Item[],
    add: (title: string, content: string) => void;
    update: (done: boolean, created: number) => void;
    load: (items: Item[]) => void;
    error: Error;
}
export const NoteContext = React.createContext<NoteContextValue>(null);

const NoteProvider = ({ children }) => {

    const [items, dispatch] = React.useReducer(reducer, []);

    const add = (title: string, content: string) => {
        dispatch({
            type: NoteActions.ADD,
            payload: {
                title,
                content: content,
                history: [
                    {
                        time: Date.now(),
                        type: "created"
                    }
                ],
                done: false
            }
        })
    }

    const update = (done: boolean, created: number) => {
        dispatch({
            type: NoteActions.UPDATE,
            payload: {
                created,
                done,
            }
        })
    }

    const load = (items: Item[]) => {
        dispatch({
            type: NoteActions.LOAD,
            payload: items.map(e => ({ ...e, fetched: true }))
        })
    }

    // const value = {items, update, add, error };
    const value = React.useMemo(() => ({ items, update, add, load, error: null }), [items]);

    return (
        <NoteContext.Provider value={value}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteProvider;