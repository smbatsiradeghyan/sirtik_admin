import { type ChangeEvent, type FC, memo, type MouseEventHandler, useRef } from 'react';


interface UploadImageProps {
  src?: string//Base64 || url
  onUpload: (src: string) => void
}
const ERROR_IMG_SRC =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export const UploadImage: FC<UploadImageProps> = memo(({src, onUpload}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: ChangeEvent<HTMLElement>) => {

    const input = event.target as HTMLInputElement; // Explicit type assertion
    const files = input.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onUpload(reader.result as string)

        }
      };
      reader.readAsDataURL(files[0]);
    }

  };
  const handleButtonClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-row w-1/2 gap-4 ">
      <div className="rounded-2xl overflow-hidden hover-shadow   cursor-pointer" onClick={handleButtonClick}>
        <input
          type="file"
          ref={fileInputRef}
          style={{display: "none"}}
          accept="image/*"
          onChange={handleFileChange}
        />
        <img src={src??ERROR_IMG_SRC} alt="About image" className="w-full h-full object-cover aspect-[4/3]"/>
      </div>



    </div>
  );
});

