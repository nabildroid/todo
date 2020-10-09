import * as React from "react";

import reducer, { NoteActions } from "../actions/NoteReducer";
import { useFetch } from "../hooks";

import { ENDPOINT, Item } from "../main";

type ConnectTo = {
    items: Item[],
    add: (title: string, content: string) => void;
    update: (done: boolean, created: number) => void;
    load: (items: Item[]) => void;
    error: Error;
}

type Connect = <T extends keyof ConnectTo>  (to: T) => ConnectTo[T];
export const NoteContext = React.createContext<Connect>(null);

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

    const subscribes = React.useRef<{
        [key in keyof ConnectTo]: ((val: ConnectTo[key]) => void)[]
    }>();

    const connect: Connect = (to) => {
        switch (to) {
            case "items":
                return React.useMemo(() => items, [items]);
            case "add":
                return React.useMemo(() => add, [add]);
            case "load":
                return React.useMemo(() => load, [load]);
            case "update":
                return React.useMemo(() => update, [update]);
            case "error":
                return React.useMemo(() => null, []);
        }
    };

    return (
        <NoteContext.Provider value={connect}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteProvider;