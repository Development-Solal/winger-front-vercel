import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeactivateModalProps {
  text?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id?: string) => void;
  title?: string;
  description?: string;
  isReactivate?: boolean;
}

const DeactivateModal: React.FC<DeactivateModalProps> = ({
  text,
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isReactivate = false,
}) => {
  const defaultTitle = isReactivate
    ? text
      ? `Êtes-vous sûr de vouloir réactiver ${text}?`
      : "Êtes-vous sûr de vouloir réactiver?"
    : text
    ? `Êtes-vous sûr de vouloir désactiver ${text}?`
    : "Êtes-vous sûr de vouloir désactiver?";

  const defaultDescription = isReactivate
    ? "Cette action réactivera le compte."
    : "L'administrateur peut réactiver ce compte.";

  return (
    <div className="bg-white">
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title || defaultTitle}</AlertDialogTitle>
            <AlertDialogDescription>{description || defaultDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Non</AlertDialogCancel>
            <AlertDialogAction onClick={() => onConfirm()}>Oui</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeactivateModal;