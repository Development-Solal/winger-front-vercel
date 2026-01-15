import {useEffect, useMemo, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";

import {ArrowUp, ChevronLeft, ChevronRight, Edit, Eye, UserCheck, UserX} from "lucide-react";
import AdminNav from "./AdminNav";
import {AdminAidesModel} from "@/models/AdminModel";
import {DeactivateAides, GetAllAides, UpdateAideAidant} from "@/services/AdminService";
import {formatTimestampDate} from "@/utils/utilts";
import {Badge} from "@/components/ui/badge";
import toast from "react-hot-toast";
import DeactivateModal from "@/components/modals/DeactivateModal";
import {useNavigate} from "react-router-dom";
import {useMobile} from "@/hooks/use-mobile";
import {ChangeAidantModal} from "./ChangeAidant";

const statusClassesSub: Record<string, string> = {
  true: "bg-green-100 text-green-800 border-green-200",
  false: "bg-red-100 text-red-800 border-red-200",
};

const AdminAide = () => {
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [aides, setAides] = useState<AdminAidesModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [editingAide, setEditingAide] = useState<AdminAidesModel | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedAide, setSelectedAide] = useState<{id: string; isActive: boolean}>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [isMobile]);

  useEffect(() => {
    GetAllAides()
      .then(res => {
        setAides(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [refresh]);

  const filteredAides = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return aides.filter(aide => {
      const fullName = `${aide.ProfileAidant.first_name} ${aide.ProfileAidant.last_name}`.toLowerCase();

      return fullName.toLowerCase().includes(lowerSearch) || aide.name.toLowerCase().includes(lowerSearch);
    });
  }, [searchTerm, aides]);

  const paginatedAides = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAides.slice(start, end);
  }, [currentPage, filteredAides]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleAideStatus = (id: string | undefined) => {
    if (!id) return;

    DeactivateAides(id)
      .then(res => {
        toast.success(res.message);
        setRefresh(prev => !prev);
      })
      .catch(err => {
        console.error(err);
        toast.error(err.message || "Une erreur est survenue");
      });
  };

  const handleEditAide = (user: AdminAidesModel) => {
    setEditingAide(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAide(undefined);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingAide(null);
  };

  const handleSaveAide = (aideId: string, newAidantId: number) => {
    const data = {aideId, newAidantId};
    UpdateAideAidant(data)
      .then(res => {
        toast.success(res.message);
        setRefresh(prev => !prev);
      })
      .catch(err => {
        console.error(err);
        toast.error(err.message);
      });
  };

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 container mx-auto ">
      <div className="bg-gradient-to-r from-mid-pink to-dark-pink px-4 py-6 text-white font-quicksand_book">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-quicksand">WINGer Administrateur</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          <AdminNav />
          <div ref={ref} className="space-y-6 p-6">
            <h2 className="text-2xl font-quicksand">Gestion des aidés</h2>

            <Card className="-ml-6">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
                  <CardDescription>Une liste de tous les aidés sur la plateforme.</CardDescription>
                  <div className="relative flex  md:justify-end md:w-96">
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="w-full  md:w-1/2 pl-4"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Desktop Table */}
                <div className="hidden md:block rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Nom Aidant</TableHead>
                        <TableHead>Date rejoint</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAides.map(aide => (
                        <TableRow key={aide.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <span className="font-medium">{aide.name}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center">
                              <Badge variant="outline" className={statusClassesSub[String(aide.active === true)]}>
                                {aide.active === true ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            {aide.ProfileAidant?.first_name} {aide.ProfileAidant?.last_name}
                          </TableCell>

                          <TableCell className="text-left">{formatTimestampDate(aide.createdAt)}</TableCell>
                          <TableCell className="text-right ">
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 mr-2 bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                              aria-label="Changer Aidant"
                              onClick={() => {
                                handleEditAide(aide);
                              }}
                              title="Changer Aidant">
                              <Edit className="h-5 w-5" />
                            </Button>

                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 mr-2 bg-blue-200 text-blue-600 hover:bg-blue-300 dark:hover:bg-blue-900/20"
                              onClick={() => {
                                navigate(`/admin/editAdminAide/${aide.id}`);
                              }}
                              aria-label="Lire et Modifier les informations de l'Aidé"
                              title="Lire et Modifier les informations de l'Aidé">
                              <Eye className="h-5 w-5" />
                            </Button>

                            {aide?.active === true ? (
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 mr-2 bg-red-200 text-red-600 hover:bg-red-300 dark:hover:bg-red-900/20"
                                onClick={() => {
                                  setSelectedAide({id: aide.id, isActive: true});
                                  setIsModalOpen(true);
                                }}
                                aria-label="Désactiver aidé"
                                title="Désactiver aidé">
                                <UserX className="h-5 w-5" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 mr-2 bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                                onClick={() => {
                                  setSelectedAide({id: aide.id, isActive: false});
                                  setIsModalOpen(true);
                                }}
                                aria-label="Réactiver aidé"
                                title="Réactiver aidé">
                                <UserCheck className="h-5 w-5" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {Math.ceil(filteredAides.length / itemsPerPage)}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === Math.ceil(filteredAides.length / itemsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {paginatedAides.map(aide => (
                    <div key={aide.id} className="rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-x-4">
                          <p className="font-medium">{aide.name}</p>
                          <Badge variant="outline" className={statusClassesSub[String(aide.active === true)]}>
                            {aide.active === true ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p>
                          <span className="font-semibold">Aidant:</span> {aide.ProfileAidant?.first_name}{" "}
                          {aide.ProfileAidant?.last_name}
                        </p>

                        <p>
                          <span className="font-semibold">Date rejoint:</span> {formatTimestampDate(aide.createdAt)}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          className="w-full p-0 mr-2 bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                          aria-label="Changer Aidant"
                          onClick={() => {
                            handleEditAide(aide);
                          }}
                          title="Changer Aidant">
                          <Edit className="h-5 w-5" />
                        </Button>

                        <Button
                          variant="ghost"
                          className="w-full p-0 mr-2 bg-blue-200 text-blue-600 hover:bg-blue-300 dark:hover:bg-blue-900/20"
                          onClick={() => {
                            navigate(`/admin/editAdminAide/${aide.id}`);
                          }}
                          aria-label="Lire et Modifier les informations de l'Aidé "
                          title="Lire et Modifier les informations de l'Aidé ">
                          <Eye className="h-5 w-5" />
                        </Button>

                        {aide.active === true ? (
                          <Button
                            variant="ghost"
                            className="w-full p-0 mr-2 bg-red-200 text-red-600 hover:bg-red-300 dark:hover:bg-red-900/20"
                            onClick={() => {
                              setSelectedAide({id: aide.id, isActive: true});
                              setIsModalOpen(true);
                            }}
                            aria-label="Désactiver aidé"
                            title="Désactiver aidé">
                            <UserX className="h-5 w-5" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            className="w-full p-0 mr-2 bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                            onClick={() => {
                              setSelectedAide({id: aide.id, isActive: false});
                              setIsModalOpen(true);
                            }}
                            aria-label="Réactiver aidé"
                            title="Réactiver aidé">
                            <UserCheck className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {Math.ceil(filteredAides.length / itemsPerPage)}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === Math.ceil(filteredAides.length / itemsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ChangeAidantModal
        aide={editingAide}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveAide}
      />

      <DeactivateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => toggleAideStatus(selectedAide?.id)}
        isReactivate={!selectedAide?.isActive}
        text="cet aidé"
      />
      {isMobile && (
        <button
          onClick={() => {
            topRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
          }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
          aria-label="Retour en haut">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AdminAide;