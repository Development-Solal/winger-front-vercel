import {useState, useEffect} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {AdminAidesModel} from "@/models/AdminModel";
import {GetAllUsers} from "@/services/AdminService";

interface AidantOption {
  id: number;
  first_name: string;
  last_name: string;
}

interface ChangeAidantModalProps {
  aide: AdminAidesModel | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (aideId: string, newAidantId: number) => void;
}

export function ChangeAidantModal({aide, isOpen, onClose, onSave}: ChangeAidantModalProps) {
  const [selectedAidantId, setSelectedAidantId] = useState<number | null>(null);
  const [aidants, setAidants] = useState<AidantOption[]>([]);

  useEffect(() => {
    GetAllUsers()
      .then(res => {
        const aidantsOnly = res.filter((user: {roleId: number}) => user.roleId !== 1);
        setAidants(aidantsOnly);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (aide?.ProfileAidant?.id) {
      setSelectedAidantId(aide.ProfileAidant.id);
    }
  }, [aide]);

  const handleSave = () => {
    if (aide && selectedAidantId !== null) {
      onSave(aide.id, selectedAidantId);
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedAidantId(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Changer l’Aidant</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="aidant" className="text-right">
              Nouvel Aidant
            </Label>
            <div className="col-span-3">
              <Select
                value={selectedAidantId?.toString() || ""}
                onValueChange={value => setSelectedAidantId(parseInt(value))}>
                <SelectTrigger id="aidant">
                  <SelectValue placeholder="Sélectionnez un aidant" />
                </SelectTrigger>
                <SelectContent>
                  {aidants?.map(aidant => (
                    <SelectItem key={aidant.id} value={aidant.id.toString()}>
                      {aidant.first_name} {aidant.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} className="bg-dark-pink hover:bg-[#d81b60]">
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
