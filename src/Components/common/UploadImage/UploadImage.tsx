import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './UploadImage.scss';
import icon from './image-picker.png'
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

interface FileImage {
    file: File,
    image: string
}

export const UploadImage = () => {
    const [file, setFile] = useState<FileImage | null>(null);
    const nav = useNavigate();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length) {
            const acceptedFile = acceptedFiles[0];
            const image = URL.createObjectURL(acceptedFile);
            setFile({
                image,
                file: acceptedFile
            })
        }
    }, [])
    const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop });


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
                    <p className='text'>{isDragActive ? "Drop here" : "Drag 'n' drop some files here, or click to select files"}</p>
                </div> :
                <div className='preview'>
                    <img width={'100%'} src={file.image} alt='preview' />
                    <Button onClick={() => nav('/result')}>Send</Button>
                </div>
            }
        </div>
    );
}