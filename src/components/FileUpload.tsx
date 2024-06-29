'use client'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Inbox } from 'lucide-react'
import { storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const FileUpload = () => {

  // Using the react-dropzone module to create drag and drop files uploader
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      // Upload files to firebase
      if (!acceptedFiles) return;  // If no files are accepted

      // Select the First PDF file
      const pdfFile = acceptedFiles[0];

      // Check for File Size
      if (pdfFile.size > 10 * 1024 * 1024) {
        // Bigger File than 10MB
        alert('File is too big');
        return;
      }

      // File Structure and Uploading 
      const fileStructure = `/files/${pdfFile.name}`;
      const storageRef = ref(storage, fileStructure);
      const uploadTask = uploadBytesResumable(storageRef, pdfFile);

      // Note - The firebase has been set to allow all the users to upload and read files from the rules this needs to be avoided in production and allow only authenticated users

      // Upload Progress
      uploadTask.on('state_changed', (snapshot) => {
        const uploadProgress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(uploadProgress);
      },
        (err) => console.log(err),
        () => { getDownloadURL(uploadTask.snapshot.ref).then((download) => console.log(download)) },
      );
    }
  });


  return (
    <>
      <div className="p-2 bg-white rounded-xl">
        <div  {...getRootProps({
          className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'
        })}>
          <input {...getInputProps()} />
          <>
            <Inbox className='w-10 h-10 text-blue-500' />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        </div>
      </div>
    </>
  )
};

export default FileUpload;
