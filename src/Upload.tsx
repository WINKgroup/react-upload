import * as React from "react";
import SubmitTriggerDefault, { SubmitTriggerProps } from './SubmitTrigger'
import FileSelectorDefault, { FileSelectorProps } from "./FileSelector";
import ProgressDefault, { ProgressProps } from './Progress'

export interface IProgressData {
    current: number
    total: number
}

export interface UploadProps {
    url: string
    uploader?: (url:string, files:File[]) => Promise<void>
    FileSelector?: (props:FileSelectorProps) => JSX.Element
    SubmitTrigger?: (props:SubmitTriggerProps) => JSX.Element
    Progress?: () => JSX.Element
    onError?: (err:any, files:File[]) => void
    onUploaded?: (files:File[]) => void
}

export default function Upload(props:UploadProps) {
    const [uploading, setUploading] = React.useState(false)
    const [files, setFiles] = React.useState([] as File[])
    const [progressData, setProgressData] = React.useState({current: 0, total: 0} as IProgressData)

    const uploader = props.uploader ? props.uploader : uploaderDefault
    const FileSelector = props.FileSelector ? props.FileSelector : FileSelectorDefault
    const SubmitTrigger = props.SubmitTrigger ? props.SubmitTrigger : SubmitTriggerDefault
    const Progress = props.Progress ? props.Progress : ProgressDefault
    const onError = props.onError ? props.onError : onErrorDefault
    const onUploaded = props.onUploaded ? props.onUploaded : (files:File[]) => {}

    async function uploaderDefault(url:string, files:File[], onProgress?: (props:IProgressData) => void) {
        const data = new FormData()
        files.forEach((file, i) => {
            console.log(file)
            data.append(`file-${i}`, file, file.name);
        })
        console.log(data, files)
        await fetch(url, {
            method: 'POST',
            body: data,
        })
    }

    function onErrorDefault(err:any) {
        alert(err)
    }

    async function onSubmit() {
        setUploading(true)
        try {
            console.log(files)
            await uploader(props.url, files, setProgressData)
            onUploaded(files)
        } catch (e) {
            onError(e, files)
        } finally {
            setUploading(false)
        }
    }

    function onSelectionChange(files:File[]) {
        console.log(files)
        setFiles(files)
    }

    return uploading ? (
        <Progress data={ progressData } />
    ) : (
        <>
            <FileSelector
                onSelectionChange={ onSelectionChange }
            />
            <SubmitTrigger
                onSubmit={ onSubmit }
                files={ files }
            />
        </>
    )
}
