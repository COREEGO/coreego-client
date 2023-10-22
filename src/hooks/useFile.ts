import { useEffect, useState } from "react";
import * as imageConversion from "image-conversion";

export default function useFile() {
  const allowedExtensions = ["image/jpg", "image/jpeg", "image/png"];

  const [files, setFiles] = useState<Array<any>>([]);

  const addFile = async (newFiles: Array<any>) => {
    let compressImages : any = []

    for(const file of newFiles){
        if(allowedExtensions.includes(file.type)){
            await imageConversion.compressAccurately(file, 300).then(res => {
                compressImages.push({
                    file: res,
                    url : URL.createObjectURL(res)
                })
            })
        }
    }
    setFiles([...files].concat([...compressImages]));
  };

  const removeFile = (fileIndex: number) => {
    setFiles(files.filter((file: any, index: number) => index !== fileIndex));
  };

  return {
    files,
    addFile,
    removeFile,
  };
}
