import React from 'react';

interface YouTubeEmbedProps {
  id: string; // YouTube video ID (not full URL)
  title?: string; // for iframe accessibility
  className?: string; // optional wrapper class override
  autoplay?: boolean;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  id,
  title = 'YouTube Video Player',
  className = '',
  autoplay = false,
}) => {
  const src = `https://www.youtube.com/embed/${id}?rel=0${autoplay ? '&autoplay=1&mute=1' : ''}`;

  return (
    <div className={`aspect-video w-full relative overflow-hidden bg-black ${className}`}>
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
};

export default YouTubeEmbed;
