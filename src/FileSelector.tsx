import * as React from "react";
import { useState } from "react";

export interface FileSelectorProps {
    onSelectionChange: (files:File[]) => void
    multiple?: boolean
}

export default function FileSelector(props:FileSelectorProps) {
    const [fileList, setFileList] = useState<FileList | null>(null)
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? [...e.target.files] : []
        setFileList(e.target.files);
        props.onSelectionChange( files )
    }

  return (
    <input type="file" onChange={handleFileChange} multiple={ props.multiple } />
  );
}
