import { type ChangeEvent, type FC, memo, type MouseEventHandler, useRef } from 'react';

interface UploadImageProps {
  src?: string // Base64 || url
  onUpload: (src: string) => void
  size?: 'small' | 'normal' | 'big'
  aspect?: 'portrait' | 'landscape' | 'square'
}

const ERROR_IMG_SRC =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export const UploadImage: FC<UploadImageProps> = memo(({
                                                         src,
                                                         onUpload,
                                                         size = 'normal',
                                                         aspect = 'portrait'
                                                       }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onUpload(reader.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleButtonClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  // Конфигурация размеров и пропорций
  const orientationConfig = {
    portrait: { wK: 3, hK: 4 },    // исправил: было 4:3
    landscape: { wK: 4, hK: 3 },   // исправил: было 3:4
    square: { wK: 4, hK: 4 },      // исправил: было 4:4
  }[aspect];

  const baseSize = {
    small: 50,
    normal: 100,
    big: 150,
  }[size];

  // Вычисляем реальные размеры
  const width = orientationConfig.wK * baseSize;
  const height = orientationConfig.hK * baseSize;
  const aspectRatio = `${orientationConfig.wK}/${orientationConfig.hK}`;

  return (

      <div
        className="rounded-2xl hover-shadow overflow-hidden  transition-shadow cursor-pointer"
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          src={src || ERROR_IMG_SRC}
          alt="Upload preview"
          className="w-full h-full object-cover"
          style={{ aspectRatio }}
        />
      </div>

  );
});

UploadImage.displayName = 'UploadImage';
