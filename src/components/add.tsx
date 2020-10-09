import * as React from "react";
import { NoteContext } from "../context/noteProvider";

import "../style/add.less";


function Add() {

    const [title, setTitle] = React.useState("");
    const [paragraph, setParagraph] = React.useState("");
    const [error, setError] = React.useState<boolean>(false);

    const connect = React.useContext(NoteContext);
    const add = connect("add");

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