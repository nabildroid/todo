import * as React from "react";
import Section from "./section";
import { useFetch } from "../hooks";
import { ENDPOINT, EndpointList } from "../main";
import { NotesActionsContext } from "../context/noteProvider"


function Sections() {

    const {load} = React.useContext(NotesActionsContext);

    const [fetchedItems, loading, error] = useFetch<EndpointList>(ENDPOINT.LIST, []);
    React.useEffect(() => {
        load(fetchedItems)
    }, [fetchedItems]);
    return (
        <main className={"container mx-auto"}>
            <Section name="progress" filter={s => !s} />
            <Section name="done" filter={s => s} />
        </main>
    )
}
export default Sections