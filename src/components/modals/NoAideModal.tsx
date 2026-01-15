import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

interface NoAideModalProps {
  open: boolean;
  onClose: () => void;
}

const NoAideModal = ({ open, onClose }: NoAideModalProps) => {
  const navigate = useNavigate();

  const handleCreateAide = () => {
    onClose();
    navigate("/compte/profils-aides");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose(); // Only call onClose when closing
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dark-pink flex items-center gap-2">
            <UserPlus className="w-6 h-6" />
            Aucun Aidé(e) trouvé
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Vous devez créer un profil d'Aidé(e) pour accéder aux fiches des profils compatibles sur la plateforme.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button 
            type="button" // Add this
            variant="outline" 
            onClick={onClose}
            className="flex-1 sm:flex-none">
            Annuler
          </Button>
          <Button
            type="button" // Add this
            className="bg-dark-pink hover:bg-dark-pink/90 flex-1 sm:flex-none"
            onClick={handleCreateAide}>
            Créer un Aidé(e)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoAideModal;