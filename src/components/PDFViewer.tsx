import React from 'react';

type Props = {
  pdf_url: string;
};

const PDFViewer = ({ pdf_url }: Props) => {
  // Properly encode the entire URL
  const encodedUrl = encodeURIComponent(pdf_url);
  
  // Construct the Google Docs Viewer URL
  const googleDocsUrl = `https://docs.google.com/viewer?embedded=true&url=${encodedUrl}`;
  return (
    <iframe
      src={googleDocsUrl}
      className="w-full h-full"
      title="PDF Viewer"
    ></iframe>
  );
};

export default PDFViewer;