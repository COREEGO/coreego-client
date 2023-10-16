import { useEffect, useState } from "react"

export default function useFile(){

    const [files, setFiles] = useState<Array<any>>([])

    const addFile = (newFile:Array<any>) => {

        newFile = [...newFile].map((file:any) => {
            return {file: file, url: URL.createObjectURL(file) }
        })

        let currentFile = [...files]
        currentFile = currentFile.concat([...newFile])

        setFiles(currentFile)

    }

    return {
        files,
        addFile
    }
}
