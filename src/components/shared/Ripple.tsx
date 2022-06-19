const Ripple = () => {
  const rippleColor = '239, 68, 68';
  
  return (
    <div className="ripple absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <style jsx>
        {`
          .ripple {
            background-color: rgb(${rippleColor});
            margin: 0 auto;
            border-radius: 50%;
            -webkit-animation: ripple .6s linear infinite;
            animation: ripple .6s linear infinite;
            transform: rotate(45deg);
          }

          @-webkit-keyframes ripple {
            0% {
              box-shadow: 0 0 0 0 rgba(${rippleColor}, 0.3), 0 0 0 10px rgba(${rippleColor}, 0.3), 0 0 0 30px rgba(${rippleColor}, 0.3), 0 0 0 60px rgba(${rippleColor}, 0.3);
            }
            100% {
              box-shadow: 0 0 0 10px rgba(${rippleColor}, 0.3), 0 0 0 30px rgba(${rippleColor}, 0.3), 0 0 0 60px rgba(${rippleColor}, 0.3), 0 0 0 90px rgba(${rippleColor}, 0); 
            } 
          }

            @keyframes ripple {
              0% {
                box-shadow: 0 0 0 0 rgba(${rippleColor}, 0.3), 0 0 0 10px rgba(${rippleColor}, 0.3), 0 0 0 30px rgba(${rippleColor}, 0.3), 0 0 0 60px rgba(${rippleColor}, 0.3); 
              }
              100% {
                box-shadow: 0 0 0 10px rgba(${rippleColor}, 0.3), 0 0 0 30px rgba(${rippleColor}, 0.3), 0 0 0 60px rgba(${rippleColor}, 0.3), 0 0 0 90px rgba(${rippleColor}, 0); 
              } 
           }
        `}
      </style>
    </div>
  );
};

export default Ripple;