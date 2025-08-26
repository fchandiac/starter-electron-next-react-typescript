"use client";
import { url } from "inspector";
import React, { useState } from "react";
import { IconButton } from "@/components/Button/IconButton";

const slides = [
	{
		title: "Slide 1",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		image:
			"https://images.pexels.com/photos/13914273/pexels-photo-13914273.jpeg",
		url: "https://example.com/slide1",
		duration: 5,
        seo: "Descripción del Slide 1",
        index: 0,
	},
	{
		title: "Slide 2",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		video:
			"/FPV Drone Flight through Beautiful Iceland Canyon.mp4",
		url: "",
		duration: 8,
        seo: "Descripción del Slide 2",
        index: 1
	},
	{
		title: "Slide 3",
		description: "Descripción del slide 3.",
		image: "https://images.pexels.com/photos/33479107/pexels-photo-33479107/free-photo-of-lujosa-villa-privada-en-vagator-goa-al-atardecer.jpeg",
		url: "https://example.com/slide3",
		duration: 4,
        seo: "Descripción del Slide 3",
        index: 2
	},
];

export default function Slider({ transitionTime = 2000 }: { transitionTime?: number }) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState((current + 1) % slides.length);

  function animation(nextIndex: number) {
    setCurrent(nextIndex);
    setNext((nextIndex + 1) % slides.length);
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  React.useEffect(() => {
    let isMounted = true;
    async function autoAdvance() {
      await delay(slides[current].duration * 2000);
      if (isMounted) {
        animation((next + 1) % slides.length);
      }
    }
    autoAdvance();
    return () => { isMounted = false; };
  }, [current, next]);


  return (
  <div className="w-full max-w-none overflow-hidden relative m-0 h-[80vh]">
      {/* Contenedor para todas las imágenes, crossfade con CSS */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, i) => (
          slide.video ? (
            <video
              key={i}
              src={slide.video}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              style={{ transition: `opacity ${transitionTime}ms linear` }}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              key={i}
              src={slide.image}
              alt={slide.seo}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              style={{ transition: `opacity ${transitionTime}ms linear` }}
            />
          )
        ))}
      </div>
        
      {/* Contenido flotante */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between">
        {/* Flechas */}
        <IconButton
          variant="text"
          className="absolute left-4 top-1/2 -translate-y-1/2"
          aria-label="Anterior"
          onClick={() => animation((current - 1 + slides.length) % slides.length)}
        >
          <span
            className="material-symbols-rounded text-background p-2 drop-shadow-lg"
            style={{ fontSize: "4rem", fontVariationSettings: "'wght' 700" }}
          >
            chevron_left
          </span>
        </IconButton>
       
        <IconButton
          variant="text"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          aria-label="Siguiente"
          onClick={() => animation((current + 1) % slides.length)}
        >

          <span
            className="material-symbols-rounded text-background p-2 drop-shadow-lg"
            style={{ fontSize: "4rem", fontVariationSettings: "'wght' 700" }}
          >
            chevron_right
          </span>
        </IconButton>
        {/* Indicadores (dots) */}
        <div className="absolute bottom-6 right-8 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => animation(i)}
              className={`w-3 h-3 rounded-full transition-all border border-solid border-white ${i === current ? "bg-primary" : "bg-white/40"}`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
        {/* Contenedor inferior izquierdo para título y descripción */}
				<div
          className="absolute left-[10%] bottom-[10%] flex flex-col items-start text-left px-4 md:px-8"
					style={{ maxWidth: "50%", zIndex: 20 }}
				>
          <h2
            className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2"
            style={{
              textShadow: "2px 2px 8px #000, 0 0 2px #000",
            }}
          >
            {slides[current].title}
          </h2>
          <p
            className=" md:text-lg lg:text-xl text-white mb-4"
            style={{
              textShadow: "2px 2px 8px #000, 0 0 2px #000",
            }}
          >
            {slides[current].description}
          </p>
					{slides[current].url && (
						<a
							href={slides[current].url}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/80 transition"
						>
							Ver más
						</a>
					)}
				</div>
      </div>
    
    </div>
  );
}
