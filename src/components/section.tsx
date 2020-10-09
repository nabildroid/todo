import * as React from "react";

import { NoteContext } from "../context/noteProvider";

import Note from "./note";

import "../style/section.less";

type Props = {
    name: string;
    filter: (s: boolean) => boolean;
}

function Section({ name, filter }: Props) {

    const connect = React.useContext(NoteContext);
    const items = connect("items");
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