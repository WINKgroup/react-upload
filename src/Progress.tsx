import * as React from "react";
import { IProgressData } from "./Upload";

export interface ProgressProps {
    data: IProgressData
}

export default function Progress(props:ProgressProps) {
    return (<div>{ props.data.current } of { props.data.total }</div>)
}