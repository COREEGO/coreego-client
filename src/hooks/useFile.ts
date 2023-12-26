import { useEffect, useState } from "react";
import * as imageConversion from "image-conversion";
import { apiFetch } from "../http-common/apiFetch";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

interface CompressedImage {
  file: File;
  url: string;
}

export interface FileItem {
  file: File;
  url: string;
}

interface UseFileHook {
  files: FileItem[];
  addFile: (newFiles: FileList, multiple?: boolean) => Promise<void>;
  removeFile: (fileIndex: number) => void;
  deleteFile: (fileId:number) => void;
  clearFiles: Function;
}

const useFile = (mutate?: Function | null): UseFileHook => {
  const allowedExtensions = ["image/jpg", "image/jpeg", "image/png", "capture=camera"];

  const [files, setFiles] = useState<FileItem[]>([]);

  const confirm = useConfirm()

  const compressFile = async (file: File): Promise<CompressedImage | null> => {
    if (!allowedExtensions.includes(file.type)) {
      // Ne pas compresser les fichiers non autorisés
      return null;
    }

    try {
      const compressedFile : any = await imageConversion.compressAccurately(file, 300);
      const compressedImage: CompressedImage = {
        file: compressedFile,
        url: URL.createObjectURL(compressedFile),
      };
      return compressedImage;
    } catch (error) {
      console.error("Erreur lors de la compression de l'image :", error);
      return null;
    }
  };

  const addFile = async (newFiles: FileList, multiple = true): Promise<void> => {
    const compressPromises: Promise<CompressedImage | null>[] = [];

    for (const file of Array.from(newFiles)) {
      compressPromises.push(compressFile(file));
    }

    const compressedImages = await Promise.all(compressPromises);

    const validCompressedImages = compressedImages.filter((image) => image !== null) as CompressedImage[];

    if (multiple) {
      setFiles((prevFiles) => [...prevFiles, ...validCompressedImages]);
    } else {
      setFiles(validCompressedImages.slice(0, 1));
    }
  };

  const removeFile = (fileIndex: number): void => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
  };

  const deleteFile = async (fileId: number) => {
    try {
        confirm({description: "Supprimer l'image ?"})

        if(!confirm) return;

        await apiFetch(`/image/delete/${fileId}`, 'DELETE', null, true)
        if(mutate){
          mutate()
        }
        toast.success("Image supprimée");

    } catch (error:any) {
        toast.error(JSON.parse(error.message))
    }
}

  const clearFiles = () => {
    setFiles([])
  }

  return {
    files,
    addFile,
    removeFile,
    deleteFile,
    clearFiles
  };
};

export default useFile;
