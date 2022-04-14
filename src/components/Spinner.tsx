import React from 'react';

const Spinner: React.FC<{ className: string }> = ({ className }) => (
  <div data-v-75449fdc="" className={`justify-center py-8 flex ${className} w-full`}>
    <div data-v-06a22a94="" data-v-75449fdc="" className="relative">
      <svg data-v-06a22a94="" viewBox="0 0 50 50" className="spinner">
        <circle data-v-06a22a94="" fill="transparent" stroke="currentColor" strokeWidth="4px" cx="25" cy="25" r="18" strokeDasharray="113.097" strokeLinecap="round" className="line" />
      </svg>
    </div>
    <style jsx>
      {`
        .spinner[data-v-06a22a94] {
            transform-origin: center center;
            -webkit-animation: spinner-rotate-data-v-06a22a94 1.4s linear infinite;
            animation: spinner-rotate-data-v-06a22a94 1.4s linear infinite;
            border-radius: 50%; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;
        }
        .relative{
            width: 5rem; height: 5rem;
        }
        .line[data-v-06a22a94] {
            transform-origin: center center;
            transform: rotate(0deg);
            -webkit-animation: spinner-arc-data-v-06a22a94 1.4s ease-in-out infinite;
            animation: spinner-arc-data-v-06a22a94 1.4s ease-in-out infinite;
        }
        @keyframes spinner-arc-data-v-06a22a94{
            0% {
                stroke-dasharray: 1,200;
                stroke-dashoffset: 0px;
            }
            50% {
                stroke-dasharray: 100,200;
                stroke-dashoffset: -15px;
            }
            100% {
                stroke-dasharray: 100,200;
                stroke-dashoffset: -113.097px;
            }
        }
        @keyframes spinner-rotate-data-v-06a22a94{
            100% {
                transform: rotate(1turn);
            }
        }
      `}
    </style>
  </div>
);

export default Spinner;