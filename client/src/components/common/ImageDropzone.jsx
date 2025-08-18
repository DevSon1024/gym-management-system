import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropzone = ({ onFileChange }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      onFileChange(file);
      setPreview(URL.createObjectURL(file));
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false,
  });

  const dropzoneClasses = `
    border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
  `;

  return (
    <div {...getRootProps()} className={dropzoneClasses}>
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Preview" className="mx-auto h-24 object-contain" />
      ) : (
        isDragActive ?
          <p>Drop the image here ...</p> :
          <p>Drag 'n' drop an image here, or click to select one</p>
      )}
    </div>
  );
};

export default ImageDropzone;