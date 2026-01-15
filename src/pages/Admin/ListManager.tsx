import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Plus, Pencil} from "lucide-react";
import toast from "react-hot-toast";
import {ListModel} from "@/models/ListModel";
import {AddListItem, UpdateListItem} from "@/services/AdminService";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function ListManager({
  listName,
  listItems,
  setListItems,
  listType,
}: {
  listName: string;
  listItems: {id: number | string; title: string}[];
  setListItems: (items: ListModel[]) => void;
  listType: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [editItem, setEditItem] = useState<{id: number | string; title: string} | null>(null);

  const openAddDialog = () => {
    setEditItem(null);
    setName("");
    setDialogOpen(true);
  };

  const openEditDialog = (item: ListModel) => {
    setEditItem(item);
    setName(item.title);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editItem) {
        UpdateListItem(editItem.id, name, listType)
          .then(res => {
            setListItems(res);
          })
          .catch(err => {
            console.error(err);
          });
        toast.success("List mis à jour !");
      } else {
        AddListItem(name, listType)
          .then(res => {
            setListItems(res);
          })
          .catch(err => {
            console.error(err);
          });
        toast.success("Item ajouté!");
      }

      setDialogOpen(false);
      setName("");
      setEditItem(null);
    } catch (err) {
      console.error(err);
      toast.error("Échoué");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{listName}</CardTitle>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-dark-pink hover:bg-[#d81b60]" onClick={openAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter {listName}
          </Button>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editItem ? `Edit ${listName}` : `Add New ${listName}`}</DialogTitle>
              <DialogDescription>
                {editItem
                  ? `Update the ${listName.toLowerCase()} value.`
                  : `Add a new ${listName.toLowerCase()} to the system.`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  value={name}
                  placeholder={`${listName} nom`}
                  onChange={e => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-[#e91e63] hover:bg-[#d81b60]" onClick={handleSave}>
                {editItem ? "Save Changes" : `Add ${listName}`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
