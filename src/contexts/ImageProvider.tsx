import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

interface ImageProviderProps{
    children: ReactNode
}


const ImageContext = createContext({
    files: [{}],
    addFiles: (files: Array<any>) => { },
    removeFile: (index: number) => { },
    emptyFiles: () => { }
});

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
    const [files, setFiles] = useState<Array<any>>([]);

    const handleRemoveFile = useCallback((index: number) => {
        setFiles(currentFiles => currentFiles.filter((_, i) => i !== index));
    }, []);

    const addFiles = useCallback((newFiles: Array<any>) => {
        setFiles(currentFiles => [...currentFiles, ...newFiles]);
    }, []);

    const emptyFiles = useCallback(() => {
        setFiles([]);
    }, []);

    return (
        <ImageContext.Provider
            value={{
                files,
                addFiles,
                removeFile: handleRemoveFile,
                emptyFiles
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};

export const useImageContext = () => useContext(ImageContext);
