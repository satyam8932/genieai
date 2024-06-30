'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  pdf_url: string;
};

const PDFViewer = ({ pdf_url }: Props) => {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const encodedUrl = encodeURIComponent(pdf_url);
    const googleDocsUrl = `https://docs.google.com/viewer?embedded=true&url=${encodedUrl}`;
    setIframeUrl(googleDocsUrl);
  }, []);

  return (
    <iframe
      src={iframeUrl}
      className="w-full h-full"
      title="PDF Viewer"
    ></iframe>
  );
};

export default PDFViewer;