const CustomCircle = () => {
  return (
    <div data-v-circle="" className="lds-ripple">
      <div data-v-circle=""></div>
      <div data-v-circle=""></div>

      <style jsx>{`
        .lds-ripple[data-v-circle] {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }

        .lds-ripple div[data-v-circle] {
          position: absolute;
          background: #ff6740;
          opacity: 1;
          border-radius: 50%;
          -webkit-animation: lds-ripple-data-v-circle 2.5s ease-in-out infinite;
          animation: lds-ripple-data-v-circle 2.5s ease-in-out infinite;
        }
        
        .lds-ripple div[data-v-circle]:nth-child(2) {
          -webkit-animation-delay: -1.25s;
          animation-delay: -1.25s;
        }
        
        @keyframes lds-ripple-data-v-circle {
          0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
          }
        
          100% {
            top: 0;
            left: 0;
            width: 72px;
            height: 72px;
            opacity: 0;
          }
        }      
      `}</style>
    </div>
  );
};

export default CustomCircle;