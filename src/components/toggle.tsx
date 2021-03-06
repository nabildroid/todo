import * as React from "react";
import { NotesActionsContext } from "../context/noteProvider";

type Props = {
    id: number
    isDone: boolean
};


const Toggle = ({ id, isDone }: Props) => {
    const [done, setDone] = React.useState<Boolean>(isDone);
    

    const {update} = React.useContext(NotesActionsContext);
    console.log(`rendering ${id}'s toggle`);
    return (
        <button className={"checkBox"} onClick={() => {
            setDone(!done);
            setTimeout(() => update(!done, id), 250);
        }}>
            <span >progress</span>
            <div>
                <span className={done ? "right" : ""}></span>
            </div>
            <span className={"active"}>done</span>
        </button>
    )
}


export default Toggle;