import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadImage = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`${
        isDragActive ? 'border-green-500' : 'border-gray-500'
      } border-2 border-dashed rounded p-8 text-center cursor-pointer`}
    >
      <input {...getInputProps()} />
      <p className="text-white">
        {isDragActive
          ? 'Drop the image here...'
          : 'Drag and drop an image, or click to select a file'}
      </p>
    </div>
  );
};

export default UploadImage;
