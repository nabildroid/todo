import * as React from "react";

import { History } from "../main";

type Props = {
    value: History[]
};


const HistoryList = ({ value }: Props) => {
    const [expand, setExpand] = React.useState<boolean>(false);

    return (
        <div className={"history " + (expand ? "expanded" : "")}>
            <ul>
                {value.slice(0, 2).map(h => (
                    <li key={h.time}>
                        {h.type}
                        <b>{h.time}</b>
                    </li>
                ))}
            </ul>

            <button
                hidden={expand || value.length < 3}
                onClick={_ => setExpand(true)}
            >more</button>

            <ul hidden={!expand}>
                {value.slice(2).map(h => (
                    <li key={h.time}>
                        {h.type}
                        <b>{h.time}</b>
                    </li>
                ))}
            </ul>


            <button
                hidden={!expand}
                onClick={_ => setExpand(false)}
            >less</button>

        </div>
    )
}


export default HistoryList;