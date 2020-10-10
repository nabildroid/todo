import * as React from "react";

import { NotesContext } from "../context/noteProvider";

import Note from "./note";

import "../style/section.less";

type Props = {
    name: string;
    filter: (s: boolean) => boolean;
}

function Section({ name, filter }: Props) {

    const {items} = React.useContext(NotesContext);
    const filtredItems = items.filter(({ done }) => filter(done));
    return (
        !!filtredItems.length
            ?
            <section>
                <h2><b>{filtredItems.length}</b> {name}</h2>
                <div className={"items"}>
                    {filtredItems.map(item =>
                        <Note item={item} key={item.history[0].time} />
                    )}
                </div>
            </section>
            : null
    )
}

export default Section;