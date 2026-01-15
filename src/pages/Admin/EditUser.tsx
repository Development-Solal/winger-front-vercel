import {useState, useEffect} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {AdminUsersModel} from "@/models/AdminModel";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface EditUserModalProps {
  user: AdminUsersModel | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, firstName: string, lastName: string, credits: string, roleId: number) => void;
}

export function EditUserModal({user, isOpen, onClose, onSave}: EditUserModalProps) {
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    credits: "",
    roleId: 0,
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        credits: user.credits.toString() || "",
        roleId: user.role.id,
      });
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      onSave(user.id, editForm.firstName, editForm.lastName, editForm.credits, editForm.roleId);
    }
    handleClose();
  };

  const handleClose = () => {
    setEditForm({firstName: "", lastName: "", credits: "", roleId: 0});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier utilisateur</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              Prenom
            </Label>
            <Input
              id="firstName"
              value={editForm.firstName}
              onChange={e => setEditForm({...editForm, firstName: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Nom
            </Label>
            <Input
              id="lastName"
              value={editForm.lastName}
              onChange={e => setEditForm({...editForm, lastName: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="credits" className="text-right">
              Credits
            </Label>
            <Input
              id="credits"
              value={editForm.credits}
              onChange={e => setEditForm({...editForm, credits: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Rôle
            </Label>
            <div className="col-span-3">
              <Select
                value={editForm.roleId.toString()}
                onValueChange={value => setEditForm({...editForm, roleId: parseInt(value)})}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Admin</SelectItem>
                  <SelectItem value="2">Aidant</SelectItem>
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
