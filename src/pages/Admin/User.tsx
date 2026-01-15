import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  EditIcon,
  Eye,
  FileSignature,
  LockKeyholeIcon,
  UserCheck,
  UserX,
} from "lucide-react";
import AdminNav from "./AdminNav";
import { AdminUsersModel } from "@/models/AdminModel";
import { DeactivateUsers, GetAllUsers, updateProContractSignature, UpdateUser } from "@/services/AdminService";
import { formatTimestampDate } from "@/utils/utilts";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { EditUserModal } from "./EditUser";
import DeactivateModal from "@/components/modals/DeactivateModal";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { t } from "i18next";
import { ChangePasswordService } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";
import { useMobile } from "@/hooks/use-mobile";
import { sendAidantProContractSignedEmailToAidant } from "@/services/EmailService.ts";

const statusClassesSub: Record<string, string> = {
  true: "bg-green-100 text-green-800 border-green-200",
  false: "bg-red-100 text-red-800 border-red-200",
};

const AdminUser = () => {
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState<AdminUsersModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState<{ id: string; isActive: boolean }>();
  const [editingUser, setEditingUser] = useState<AdminUsersModel | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isMobile]);

  useEffect(() => {
    GetAllUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  const filteredUsers = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();

      return fullName.toLowerCase().includes(lowerSearch) || user.email.toLowerCase().includes(lowerSearch);
    });
  }, [searchTerm, users]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredUsers.slice(start, end);
  }, [currentPage, filteredUsers, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleUserStatus = (id: string | undefined) => {
    if (!id) return;

    DeactivateUsers(id)
      .then((res) => {
        toast.success(res.message);
        setRefresh((prev) => !prev);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Une erreur est survenue");
      });
  };

  const updateProUserContract = (user: AdminUsersModel) => {
    if (!user.id) return;

    const currentStatus = user.ProfileAidant.contract_signed;
    const willBeSigned = !currentStatus; // What it will become after toggle

    updateProContractSignature(user.id)
      .then((res) => {
        // Show appropriate message based on new status
        if (willBeSigned) {
          toast.success("Contrat signé avec succès");
        } else {
          toast.success("Signature du contrat annulée");
        }

        setRefresh((prev) => !prev);

        // Only send email when signing (not when unsigning)
        if (willBeSigned) {
          return sendAidantProContractSignedEmailToAidant(user);
        }
        return null;
      })
      .then((emailRes) => {
        if (emailRes) {
          console.log("Email sent successfully:", emailRes);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Erreur lors de la mise à jour du contrat");
      });
  };

  const handleEditUser = (user: AdminUsersModel) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (userId: string, first_name: string, last_name: string, credits: string, roleId: number) => {
    const data = { id: userId, first_name, last_name, credits, roleId };

    UpdateUser(userId, data)
      .then((res) => {
        toast.success(res.message);
        setRefresh((prev) => !prev);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleCloseDeactivateModal = () => {
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changePass = (data: any) => {
    setIsModalPasswordOpen(false);
    if (selectedUser?.id) {
      const form = {
        userId: selectedUser.id,
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
        requiresOldPassword: false,
      };
      ChangePasswordService(form)
        .then((res) => {
          console.log(res);
          toast.success(t("compte.change_password"));
        })
        .catch((err) => {
          console.error(err);
          toast.error(err?.response?.data?.message);
        });
    }
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
            <h2 className="text-2xl font-quicksand">Gestion des utilisateurs</h2>

            <Card className="-ml-6">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
                  <CardDescription>Une liste de tous les utilisateurs enregistrés sur la plateforme.</CardDescription>
                  <div className="relative flex  md:justify-end md:w-96">
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="w-full  md:w-1/2 pl-4"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Nombre d'aidés</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Date rejoint</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {user.first_name} {user.last_name}{" "}
                                  {user.ProfileAidant?.ProfileTypeAidant.title_fr == "Professionnel" ? (
                                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                      {"Pro"}
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                </span>
                                <span className="text-sm text-muted-foreground">{user.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center">
                              <Badge
                                variant="outline"
                                className={statusClassesSub[String(user.ProfileAidant?.active === true)]}>
                                {user.ProfileAidant?.active === true ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>{user.role.title}</TableCell>
                          <TableCell className="text-center">{user.aideCount}</TableCell>
                          <TableCell className="text-center">{user.credits}</TableCell>
                          <TableCell className="text-left">{formatTimestampDate(user.createdAt)}</TableCell>
                          <TableCell className="text-right ">
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 mr-2 bg-blue-200 text-blue-600 hover:bg-blue-300 dark:hover:bg-blue-900/20"
                              onClick={() => {
                                if (user.ProfileAidant?.ProfileTypeAidant.title_fr == "Professionnel") {
                                  navigate(`/admin/editAdminAidantPro/${user.id}`);
                                } else {
                                  navigate(`/admin/editAdminAidant/${user.id}`);
                                }
                              }}
                              aria-label="Lire et Modifier les informations de l'Aidant"
                              title="Lire et Modifier les informations de l'Aidant">
                              <Eye className="h-5 w-5" />
                            </Button>

                            {user.ProfileAidant?.active === true && (
                              <Button
                                variant="ghost"
                                className={`h-8 w-8 p-0 mr-2 ${
                                  user.ProfileAidant?.profile_type_id === 2 && user.ProfileAidant?.contract_signed
                                    ? "bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:hover:bg-gray-900/20"
                                }`}
                                onClick={() => {
                                  if (user.ProfileAidant?.profile_type_id === 2) {
                                    updateProUserContract(user);
                                  }
                                }}
                                disabled={user.ProfileAidant?.profile_type_id !== 2}
                                aria-label="Contrat aidant signé"
                                title={
                                  user.ProfileAidant?.profile_type_id !== 2
                                    ? "Non applicable"
                                    : user.ProfileAidant?.contract_signed
                                    ? "Contrat signé"
                                    : "Contrat non signé"
                                }>
                                <FileSignature className="h-5 w-5" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 mr-2 bg-yellow-200 text-yellow-600 hover:bg-yellow-300 dark:hover:bg-yellow-900/20"
                              onClick={() => {
                                handleEditUser(user);
                              }}
                              aria-label="Modifier Nom, Prénom, Rôle et Crédits"
                              title="Modifier Nom, Prénom, Rôle et Crédits">
                              <EditIcon className="h-5 w-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 mr-2 bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                              onClick={() => {
                                setSelectedUser({
                                  id: user.id,
                                  isActive: user.ProfileAidant?.active === true,
                                });
                                setIsModalPasswordOpen(true);
                              }}
                              aria-label="Changer le mot de passe"
                              title="Changer le mot de passe">
                              <LockKeyholeIcon className="h-5 w-5" />
                            </Button>
                            {user.ProfileAidant?.active === true && (
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 mr-2 bg-purple-200 text-purple-600 hover:bg-purple-300 dark:hover:bg-purple-900/20"
                                onClick={() => {
                                  navigate(`/admin/historique/${user.id}`);
                                }}
                                aria-label="Voire historique d'achats"
                                title="Voire historique d'achats">
                                <CreditCard className="h-5 w-5" />
                              </Button>
                            )}
                            {user.ProfileAidant?.active === true ? (
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 mr-2 bg-red-200 text-red-600 hover:bg-red-300 dark:hover:bg-red-900/20"
                                onClick={() => {
                                  setSelectedUser({ id: user.id, isActive: true });
                                  setIsModalOpen(true);
                                }}
                                aria-label="Désactiver utilisateur"
                                title="Désactiver utilisateur">
                                <UserX className="h-5 w-5" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 mr-2 bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                                onClick={() => {
                                  setSelectedUser({ id: user.id, isActive: false });
                                  setIsModalOpen(true);
                                }}
                                aria-label="Réactiver utilisateur"
                                title="Réactiver utilisateur">
                                <UserCheck className="h-5 w-5" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex justify-between mt-4">
                    <div className="m-4 flex items-center space-x-2">
                      <label htmlFor="itemsPerPage" className="text-sm">
                        Afficher
                      </label>
                      <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1); // reset to first page when limit changes
                        }}
                        className="border rounded px-2 py-1 text-sm">
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      <span className="text-sm">par page</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {paginatedUsers.map((user) => (
                    <div key={user.id} className="rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">
                            {user.first_name} {user.last_name}{" "}
                            {user.ProfileAidant?.ProfileTypeAidant.title_fr == "Professionnel" ? (
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                {"Pro"}
                              </Badge>
                            ) : (
                              ""
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <Badge
                          variant="outline"
                          className={statusClassesSub[String(user.ProfileAidant?.active === true)]}>
                          {user.ProfileAidant?.active === true ? "Active" : "Inactive"}
                        </Badge>
                        <p>
                          <span className="font-semibold">Role:</span> {user.role.title}
                        </p>
                        <p>
                          <span className="font-semibold">Nombre d'aidés:</span> {user.aideCount}
                        </p>
                        <p>
                          <span className="font-semibold">Credits:</span> {user.credits}
                        </p>
                        <p>
                          <span className="font-semibold">Date rejoint:</span> {formatTimestampDate(user.createdAt)}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        {user.ProfileAidant?.active === true && (
                          <Button
                            variant="ghost"
                            className={`h-8 w-8 p-0 mr-2 ${
                              user.ProfileAidant?.profile_type_id === 2 && user.ProfileAidant?.contract_signed
                                ? "bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:hover:bg-gray-900/20"
                            }`}
                            onClick={() => {
                              if (user.ProfileAidant?.profile_type_id === 2) {
                                updateProUserContract(user);
                              }
                            }}
                            disabled={user.ProfileAidant?.profile_type_id !== 2}
                            aria-label="Contrat aidant signé"
                            title={
                              user.ProfileAidant?.profile_type_id !== 2
                                ? "Non applicable"
                                : user.ProfileAidant?.contract_signed
                                ? "Contrat signé"
                                : "Contrat non signé"
                            }>
                            <FileSignature className="h-5 w-5" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          className="w-full p-0 mr-2 bg-blue-200 text-blue-600 hover:bg-blue-300 dark:hover:bg-blue-900/20"
                          onClick={() => {
                            if (user.ProfileAidant?.ProfileTypeAidant.title_fr == "Professionnel") {
                              navigate(`/admin/editAdminAidantPro/${user.id}`);
                            } else {
                              navigate(`/admin/editAdminAidant/${user.id}`);
                            }
                          }}
                          aria-label="Voire utilisateur"
                          title="Voire utilisateur">
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full p-0 mr-2 bg-yellow-200 text-yellow-600 hover:bg-yellow-300 dark:hover:bg-yellow-900/20"
                          onClick={() => {
                            handleEditUser(user);
                          }}
                          aria-label="Modifier utilisateur"
                          title="Modifier utilisateur">
                          <EditIcon className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full p-0 mr-2 bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                          onClick={() => {
                            setSelectedUser({
                              id: user.id,
                              isActive: user.ProfileAidant?.active === true,
                            });
                            setIsModalPasswordOpen(true);
                          }}
                          aria-label="Changer le mot de passe"
                          title="Changer le mot de passe">
                          <LockKeyholeIcon className="h-5 w-5" />
                        </Button>

                        {user.ProfileAidant?.active === true ? (
                          <Button
                            variant="ghost"
                            className="w-full p-0 bg-red-200 text-red-600 hover:bg-red-300 dark:hover:bg-red-900/20"
                            onClick={() => {
                              setSelectedUser({ id: user.id, isActive: true });
                              setIsModalOpen(true);
                            }}
                            aria-label="Désactiver utilisateur"
                            title="Désactiver utilisateur">
                            <UserX className="h-5 w-5" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            className="w-full p-0 bg-green-200 text-green-600 hover:bg-green-300 dark:hover:bg-green-900/20"
                            onClick={() => {
                              setSelectedUser({ id: user.id, isActive: false });
                              setIsModalOpen(true);
                            }}
                            aria-label="Réactiver utilisateur"
                            title="Réactiver utilisateur">
                            <UserCheck className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 flex flex-col items-center justify-center">
                    {/* Dropdown */}
                    <div className="mb-2 flex items-center space-x-2">
                      <label htmlFor="itemsPerPage" className="text-sm">
                        Afficher
                      </label>
                      <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="border rounded px-2 py-1 text-sm">
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      <span className="text-sm">par page</span>
                    </div>

                    {/* Pagination buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
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
      <EditUserModal user={editingUser} isOpen={isEditModalOpen} onClose={handleCloseModal} onSave={handleSaveUser} />
      <DeactivateModal
        text={"l'utilisateur"}
        isOpen={isModalOpen}
        onClose={handleCloseDeactivateModal}
        onConfirm={() => toggleUserStatus(selectedUser?.id)}
        isReactivate={!selectedUser?.isActive}
      />
      <ChangePasswordModal
        isOpen={isModalPasswordOpen}
        onClose={() => setIsModalPasswordOpen(false)}
        onConfirm={changePass}
        requireOldPassword={false}
      />
      {isMobile && (
        <button
          onClick={() => {
            topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
          aria-label="Retour en haut">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AdminUser;
