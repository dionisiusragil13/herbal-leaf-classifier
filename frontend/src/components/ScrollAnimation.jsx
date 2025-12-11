import React from 'react';

const ScrollAnimation = () => {
  const logos = [
    { name: 'Facebook', src: './tensorflow.png' },
    { name: 'Disney', src: './python.png' },
    { name: 'Airbnb', src: './react.png' },
    { name: 'Spark', src: './tailwind.png' },
    { name: 'Apple', src: './javascripts.webp' },
    { name: 'Samsung', src: './github.png' },
    { name: 'Quora', src: './keras.jpg' },
    { name: 'Sass', src: './flaskimg.png' }
  ];

  return (
    <div className="flex items-center justify-center p-8 h-41 bg-black">
      <div className="w-full max-w-6xl">
        <div 
          className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        >
          {/* Set 1 */}
          <ul className="flex items-center [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {logos.map((logo, index) => (
              <li key={index}>
                <img 
                  src={logo.src} 
                  alt={logo.name}
                  className="h-16 w-auto"
                />
              </li>
            ))}
          </ul>
          {/* Set 2 (Duplikat) */}
          <ul className="flex items-center [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
            {logos.map((logo, index) => (
              <li key={`duplicate-${index}`}>
                <img 
                  src={logo.src} 
                  alt={logo.name}
                  className="h-16 w-auto"
                />
              </li>
            ))}
          </ul>
          {/* Set 3 (Duplikat lagi untuk menghilangkan jeda) */}
          <ul className="flex items-center [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
            {logos.map((logo, index) => (
              <li key={`duplicate2-${index}`}>
                <img 
                  src={logo.src} 
                  alt={logo.name}
                  className="h-16 w-auto"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.33%); /* Karena sekarang ada 3 set */
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollAnimation;