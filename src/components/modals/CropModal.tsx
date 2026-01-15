// components/CropModal.tsx
import {useState, useCallback} from "react";
import Cropper from "react-easy-crop";
import {Slider} from "@/components/ui/slider";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {getCroppedImg} from "@/utils/cropImage";

interface CropModalProps {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File, previewUrl: string) => void;
}

export default function CropModal({imageSrc, onClose, onCropComplete}: CropModalProps) {
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCropCompleteInternal = useCallback((_: any, areaPixels: any) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleDone = async () => {
    const {file, previewUrl} = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(file, previewUrl);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogTitle className="text-lg font-medium">Recadrer l’image</DialogTitle>

      <DialogContent className="max-w-md bg-white">
        <div className="relative w-full h-64 bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            minZoom={1} // 👈 allows more zooming out
            maxZoom={3}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteInternal}
          />
        </div>
        <div className="mt-4">
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={[zoom]}
            onValueChange={v => setZoom(v[0])}
            className="bg-light-pink"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Annuler
          </button>
          <button onClick={handleDone} className="px-3 py-1 bg-dark-pink text-white rounded">
            Valider
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
