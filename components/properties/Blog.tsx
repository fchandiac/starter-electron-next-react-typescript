import React from "react";

interface BlogProps {
  Headline: string;
  Deck?: string;
  Body: React.ReactNode;
  Date?: string;
  Image?: string;
}

const Blog: React.FC<BlogProps> = ({ Headline, Deck, Body, Date, Image }) => (
  <div className="w-full bg-transparent">
    {/* Fila 1: Título, bajada, fecha e imagen */}
    <div className="grid grid-cols-5 gap-4 mb-2">
      <div className="col-span-3">
        <h2 className="text-xl font-bold mb-1">{Headline}</h2>
  {Deck && <div className="text-sm text-neutral-500 mb-1 text-justify">{Deck}</div>}
        {Date && <div className="text-xs text-neutral-400 mb-2">{Date}</div>}
      </div>
      <div className="col-span-2 flex items-center justify-end">
        {Image && (
          <div className="w-full" style={{ maxWidth: '100%' }}>
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={Image}
                alt={Headline}
                className="w-full h-full object-cover rounded"
                style={{ minWidth: '40%', aspectRatio: '16/9' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
    {/* Fila 2: Cuerpo del blog */}
    <div className="w-full text-justify">
      {Body}
    </div>
  </div>
);

export default Blog;
