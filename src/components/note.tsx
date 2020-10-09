import * as React from "react";

import { Item } from "../main";
import HistoryList from "./historyList"
import Toggle from "./toggle"

type Props = {
    item: Item;
};

import "../style/note.less";
import { useSyncNote } from "../hooks";

const Note = ({ item }: Props) => {

    // const {loading,error} = useSyncNote(item)

    console.log("#Rendering a Note#", item.title);

    const RememberHistoryList = React.useMemo(() =>
        <HistoryList value={item.history} />,
        [item.history]
    )
    const RememberToggle = React.useMemo(() =>
        <Toggle id={item.history[0].time} isDone={item.done} />,
        [ item.done]
    )
    return (
        <div className={"item"}>
            <div className={"title"}>
                <span>#</span>
                <h2>{item.title}</h2>
            </div>
            <p>{item.content}</p>
            <div className={"action"}>
                {RememberHistoryList}
                {!item.fetched && RememberToggle}
            </div>
        </div>
    )
};
export default Note;