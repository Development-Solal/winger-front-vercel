import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  profilePic: string;
}

export default function ImageModal({open, onClose, profilePic}: ImageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-4">
        <DialogHeader>
          <DialogTitle>Photo de profil</DialogTitle>
        </DialogHeader>
        <img src={profilePic} alt="Photo de profil" className="w-full h-auto object-contain rounded" />
      </DialogContent>
    </Dialog>
  );
}
