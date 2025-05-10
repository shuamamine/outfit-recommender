import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

interface UploadFormProps {
  onImageUpload: (imageUrl: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary bg-primary bg-opacity-10 dark:border-primary-light dark:bg-primary-light dark:bg-opacity-10' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary-light'}`}
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-4">
            <svg
              className="mx-auto h-12 w-12 text-primary dark:text-primary-light"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-gray-600 dark:text-gray-300">
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <p>Drag and drop an image here, or click to select</p>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports JPG, PNG up to 10MB
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadForm; 