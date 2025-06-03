import React, { FC } from 'react';

interface CopyTranscriptProps {
  transcript: string;
}

const CopyTranscript: FC<CopyTranscriptProps> = ({ transcript }) => {
  const handleCopy = () => {
    const cleanedTranscript = transcript
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join('\n');

    navigator.clipboard.writeText(cleanedTranscript)
      .then(() => {
        alert('Transcript copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy transcript:', err);
      });
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <pre className="bg-gray-100 p-2 rounded-md whitespace-pre-wrap">{transcript}</pre>
      <button
        onClick={handleCopy}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Copy Transcript
      </button>
    </div>
  );
};

export default CopyTranscript;