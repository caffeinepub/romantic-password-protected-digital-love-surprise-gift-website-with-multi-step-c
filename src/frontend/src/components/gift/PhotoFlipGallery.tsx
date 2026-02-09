import { useState } from 'react';
import type { PhotoWithNote } from '../../types/gift';

interface PhotoFlipGalleryProps {
  photos: PhotoWithNote[];
}

export default function PhotoFlipGallery({ photos }: PhotoFlipGalleryProps) {
  const [flippedIndices, setFlippedIndices] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    setFlippedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-cursive text-romantic-primary text-center">
        Our Memories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="flip-card h-80 cursor-pointer"
            onClick={() => toggleFlip(index)}
          >
            <div className={`flip-card-inner ${flippedIndices.has(index) ? 'flipped' : ''}`}>
              {/* Front */}
              <div className="flip-card-front">
                <img
                  src={photo.preview}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {/* Back */}
              <div className="flip-card-back bg-romantic-light/90 backdrop-blur-sm rounded-lg p-6 flex items-center justify-center">
                <p className="text-center text-foreground font-medium leading-relaxed">
                  {photo.note || 'A special memory ❤️'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
