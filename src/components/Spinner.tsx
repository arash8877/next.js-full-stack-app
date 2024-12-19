import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <style jsx>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* Full viewport height */
        }
        .spinner {
          border: 8px solid rgba(0, 0, 0, 0.1);
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 1s ease infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Media query for mobile view */
        @media (max-width: 768px) {
          .spinner-container {
            height: 50vh; /* Adjust height for mobile view */
          }
          .spinner {
            width: 100px; /* Smaller size for mobile view */
            height: 100px; /* Smaller size for mobile view */
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
