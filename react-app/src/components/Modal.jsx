import React from 'react';
import { Line } from 'react-chartjs-2';

const Modal = ({ isOpen, onRequestClose, data }) => {
  if (!isOpen) {
    return null;
  }

  const chartData = {
    labels: data.map((_, index) => `Dose ${index + 1}`),
    datasets: [
      {
        label: 'HIV Viral Load',
        data,
        borderColor: 'rgba(141,141,255,1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div
        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <Line data={chartData} />

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
