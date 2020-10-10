import * as React from "react";
import { NotesActionsContext } from "../context/noteProvider";

import "../style/add.less";


function Add() {

    const [title, setTitle] = React.useState("hello world");
    const [paragraph, setParagraph] = React.useState("hello world");
    const [error, setError] = React.useState<boolean>(false);

    const {add} = React.useContext(NotesActionsContext);
    // console.log(add.name);
    console.log("#Rendering add new Note");
    const validate = () => {
        const isValide = title.trim().length > 1 && paragraph.trim().length > 1;
        if (!isValide) {
            setError(true);
            setTimeout(() => setError(false), 1500);
        } else {
            setTitle("");
            setParagraph("");
        }
        return isValide;
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate() && add(title, paragraph)
    };

    return (
        <form onSubmit={submit}>
            <div id="add">
                <div id="input">
                    <div>
                        <span>#</span>
                        <input type="text"
                            placeholder="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <button
                        className={error ? "error" : ""}
                        type="submit"
                    >
                        add!
                </button>
                </div>
                <textarea
                    placeholder="paragraph"
                    value={paragraph}
                    onChange={e => setParagraph(e.target.value)}
                ></textarea>
                <button
                    className={error ? "error" : ""}
                    type="submit"
                >
                    add!
                </button>
            </div>
        </form>
    )
}


export default Add;