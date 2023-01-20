import * as React from "react";

export interface SubmitTriggerProps {
    onSubmit: () => void
    files:File[]
}

export default function SubmitTrigger(props:SubmitTriggerProps) {
    return (
        <button onClick={ props.onSubmit } >Submit</button>
    );
}
