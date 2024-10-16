'use client'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Inbox, Loader2 } from 'lucide-react'
import { storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);  // Track upload progress state
  const { mutate, status } = useMutation({
    mutationFn: async ({ fileKey, fileName }: { fileKey: string, fileName: string }) => {
      const response = await axios.post('/api/create-chat', {
        fileKey,
        fileName,
      });
      return response.data;
    },
    onSuccess: () => {
      setUploading(false);  // Set uploading to false when mutation is successful
    },
    onError: () => {
      setUploading(false);  // Set uploading to false when mutation fails
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      const pdfFile = acceptedFiles[0];
      if (pdfFile.size > 15 * 1024 * 1024) {
        toast.error('File is too large');
        return;
      }

      try {
        setUploading(true);  // Start uploading when a file is dropped

        const fileStructure = `${pdfFile.name}`;  // File structure changed as previous it wa /file/
        const storageRef = ref(storage, fileStructure);
        // console.log(storageRef);
        const uploadTask = uploadBytesResumable(storageRef, pdfFile);

        uploadTask.on('state_changed',
          (snapshot) => {
            const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // console.log(uploadProgress);  // Upload progress
          },
          (err) => {
            console.log(err);
            setUploading(false);  // Stop uploading if there is an error
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log(downloadURL);  // URL link

              if (!fileStructure || !pdfFile.name) {
                toast.error("Something went wrong");
                setUploading(false);  // Stop uploading if there is an error
                return;
              }

              // Caching the query using react-query
              mutate({ fileKey: fileStructure, fileName: pdfFile.name }, {
                onSuccess: (chatId) => {
                  toast.success("Chat Created!");
                  router.push(`/docbot/${chatId.pdfChatId}`);
                },
                onError: (error) => {
                  toast.error("Error Creating Chat");
                },
              });
            });
          }
        );
      } catch (error) {
        console.log(error);
        setUploading(false);  // Stop uploading if there is an error
      }
    }
  });

  return (
    <>
      <div className="p-2 bg-white text-gray-200 dark:bg-black dark:text-slate-100 rounded-xl">
        <div {...getRootProps({
          className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'
        })}>
          <input {...getInputProps()} />
          {(uploading || status === 'pending') ? (
            // Loading State
            <>
              <Loader2 className='h-10 w-10 text-blue-500 animate-spin' />
              <p className='mt-2 text-sm text-black/80 dark:text-slate-50'>
                Spilling the tea to GPT...
              </p>
            </>
          ) : (
            <>
              <Inbox className='w-10 h-10 text-blue-500' />
              <p className="mt-2 text-sm text-black/80 dark:text-slate-50">Drop PDF Here</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
