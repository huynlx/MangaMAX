import { memo } from "react";

const Loader = ({ className }: { className?: string }) => (
    <div className={`loading scale-[.67] fixed lg:absolute lg:scale-[.85] -translate-x-2/4 -translate-y-1/2 z-10 p-5 rounded-md bg-nav/[.80] backdrop-blur-3xl ${className}`}>
        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <style jsx>{`
            .loading {
                text-align: center;
                width: fit-content;
                height: auto;
                top: 50%;
                left: 50%;
            }
            .loading .lds-spinner {
                color: currentColor;
                display: inline-block;
                position: relative;
                width: 80px;
                height: 80px;
            }
            .loading .lds-spinner div {
                transform-origin: 40px 40px;
                animation: lds-spinner 1.2s linear infinite;
            }
            .loading .lds-spinner div:after {
                content: " ";
                display: block;
                position: absolute;
                top: 3px;
                left: 37px;
                width: 6px;
                height: 18px;
                border-radius: 20%;
                background: #fff;
            }
            .loading .lds-spinner div:nth-child(1) {
                transform: rotate(0deg);
                animation-delay: -1.1s;
            }
            .loading .lds-spinner div:nth-child(2) {
                transform: rotate(30deg);
                animation-delay: -1s;
            }
            .loading .lds-spinner div:nth-child(3) {
                transform: rotate(60deg);
                animation-delay: -0.9s;
            }
            .loading .lds-spinner div:nth-child(4) {
                transform: rotate(90deg);
                animation-delay: -0.8s;
            }
            .loading .lds-spinner div:nth-child(5) {
                transform: rotate(120deg);
                animation-delay: -0.7s;
            }
            .loading .lds-spinner div:nth-child(6) {
                transform: rotate(150deg);
                animation-delay: -0.6s;
            }
            .loading .lds-spinner div:nth-child(7) {
                transform: rotate(180deg);
                animation-delay: -0.5s;
            }
            .loading .lds-spinner div:nth-child(8) {
                transform: rotate(210deg);
                animation-delay: -0.4s;
            }
            .loading .lds-spinner div:nth-child(9) {
                transform: rotate(240deg);
                animation-delay: -0.3s;
            }
            .loading .lds-spinner div:nth-child(10) {
                transform: rotate(270deg);
                animation-delay: -0.2s;
            }
            .loading .lds-spinner div:nth-child(11) {
                transform: rotate(300deg);
                animation-delay: -0.1s;
            }
            .loading .lds-spinner div:nth-child(12) {
                transform: rotate(330deg);
                animation-delay: 0s;
            }
            @keyframes lds-spinner {
                0% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                }
            }
      `}</style>
    </div>
);

export default memo(Loader);