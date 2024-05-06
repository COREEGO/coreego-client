import { useEffect, useState } from "react";
import * as imageConversion from "image-conversion";
import { useConfirm } from "material-ui-confirm";
import { allowedExtensions } from "../utils";
import axios from "axios";
import { BEARER_HEADERS } from "../utils/variables";



const useFile = (mutate = Function) => {

  const [files, setFiles] = useState([]);
  const [isBusyFile, setIsBusyFile] = useState(false)

  const confirm = useConfirm();

  const compressFile = async (file) => {
    setIsBusyFile(true)
    if (!allowedExtensions.includes(file.type)) {
      // Ne pas compresser les fichiers non autorisés
      return null;
    }
    try {
      const compressedFile = await imageConversion.compressAccurately(
        file,
        300
      );

      return compressedFile;
    } catch (error) {
      console.error("Erreur lors de la compression de l'image :", error);
      return null;
    }finally{
      setIsBusyFile(false)
    }

  };

  const addFile = async (
    newFiles,
    multiple = true
  ) => {
    const compressPromises = [];

    for (const file of Array.from(newFiles)) {
      compressPromises.push(compressFile(file));
    }

    const compressedImages = await Promise.all(compressPromises);

    const validCompressedImages = compressedImages.filter((image) => image !== null);

    if (multiple) {
      setFiles((prevFiles) => [...prevFiles, ...validCompressedImages]);
    } else {
      setFiles(validCompressedImages.slice(0, 1));
    }
  };

  const removeFile = (fileIndex) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== fileIndex)
    );
  };

  const deleteFile = async (fileId) => {
    confirm({ description: "Supprimer l'image ?" })
      .then((_) => {
        axios.delete(`/images/${fileId}`, BEARER_HEADERS).then(
          () => {
              mutate()
          }
        );
      })
      .catch(() => {
      });
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return {
    files,
    addFile,
    removeFile,
    deleteFile,
    clearFiles,
    isBusyFile
  };
};

export default useFile;
