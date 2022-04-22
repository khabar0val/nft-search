import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './UploadImage.scss';
import icon from './image-picker.png'

interface FileImage {
    file: File,
    image: string
}

export const UploadImage = () => {
    const [file, setFile] = useState<FileImage | null>(null);

    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles);
    }, [])
    const { getInputProps, getRootProps } = useDropzone({ onDrop });


    return (
        <div className="UploadImage">
            {!file ?
                <div {...getRootProps()} className='dropzone'>
                    <input {...getInputProps} className='input' />
                    <img
                        className='icon'
                        alt='Upload'
                        src={icon} 
                    />
                    <p className='text'>Drag 'n' drop some files here, or click to select files</p>
                </div> :
                <div className='preview'>
                    <img src={file.image} alt='preview' />
                </div>
            }
        </div>
    );
}