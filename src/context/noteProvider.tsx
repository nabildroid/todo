import * as React from "react";

import reducer, { NoteActions } from "../actions/NoteReducer";
import { useFetch } from "../hooks";

import { ENDPOINT, Item } from "../main";

type NotesProvider = {
    items: Item[]
}
type NotesActionsProvider = {
    add: (title: string, content: string) => void;
    update: (done: boolean, created: number) => void;
    load: (items: Item[]) => void;
    error: Error;
}

export const NotesContext = React.createContext<NotesProvider>(null);
export const NotesActionsContext = React.createContext<NotesActionsProvider>(null);

const NoteProvider = ({ children }) => {

    const [items, dispatch] = React.useReducer(reducer, []);

    const add = React.useCallback((title: string, content: string) => {
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
    }, []);

    const update = React.useCallback((done: boolean, created: number) => {
        dispatch({
            type: NoteActions.UPDATE,
            payload: {
                created,
                done,
            }
        })
    }, [dispatch])

    const load = React.useCallback((items: Item[]) => {
        dispatch({
            type: NoteActions.LOAD,
            payload: items.map(e => ({ ...e, fetched: true }))
        })
    }, [dispatch])



    const values1: NotesProvider = React.useMemo(() => ({ items }), [items]);
    const values2: NotesActionsProvider = React.useMemo(() => ({
        add,
        load,
        update,
        error: null
    }), [add, load, update])


    return (
        <NotesActionsContext.Provider value={values2}>
            <NotesContext.Provider value={values1}>
                {children}
            </NotesContext.Provider>
        </NotesActionsContext.Provider>
    )
}

export default NoteProvider;