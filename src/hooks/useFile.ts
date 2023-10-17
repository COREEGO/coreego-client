import { useEffect, useState } from "react"

export default function useFile(){
    const allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png'];

    const [files, setFiles] = useState<Array<any>>([])

    const addFile = (newFile:Array<any>) => {
        newFile = [...newFile].reduce((prev:any,file:any) => {
            if(allowedExtensions.includes(file.type)){
                prev.push({file: file, url: URL.createObjectURL(file) })
            }
            return prev
        }, [])
        setFiles([...files].concat([...newFile]))
    }

    const removeFile = (fileIndex: number) => {
        setFiles(files.filter((file:any, index: number) => index !== fileIndex))
    }

    return {
        files,
        addFile,
        removeFile
    }
}
