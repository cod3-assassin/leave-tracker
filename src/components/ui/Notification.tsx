import { Toaster } from 'react-hot-toast';

export default function Notification() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#374151',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '12px',
        },
        success: {
          style: {
            borderColor: '#10b981',
          },
        },
        error: {
          style: {
            borderColor: '#ef4444',
          },
        },
      }}
    />
  );
}