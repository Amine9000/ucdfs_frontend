import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fragment, HTMLAttributes, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShieldAlert } from "lucide-react";
import { UserDto } from "@/types/user/UserDto";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { cn } from "@/lib/utils";
import { fetchRoles } from "@/lib/axios/roles/FetchRoles";
import validator from "validator";
import toast from "react-hot-toast";
import { useUsers } from "@/hooks/useUsers";
import { updateUser } from "@/lib/axios/users/updateUser";

const animatedComponents = makeAnimated();

type userErrors = {
  prenom: string | null;
  nom: string | null;
  email: string | null;
  roles: string | null;
};

const errorMessages = {
  prenom: "Erreur: Le prénom est requis et ne peut pas être vide.",
  nom: "Erreur: Le nom est requis et ne peut pas être vide.",
  email: "Erreur: L'email est requis et doit être au format correct.",
  pwd: "Erreur: Le mot de passe est requis et ne peut pas être vide.",
  roles: "Erreur: Au moins un rôle doit être sélectionné.",
};

interface UpdateUserDialogPropse extends HTMLAttributes<HTMLDivElement> {
  data: UserDto;
}

export function UpdateUserDialog({ data, children }: UpdateUserDialogPropse) {
  const [userData, setUserData] = useState<UserDto>({
    id: data.id,
    prenom: data.prenom,
    nom: data.nom,
    email: data.email,
    roles: data.roles,
  });
  const [error, setError] = useState<userErrors>({
    prenom: null,
    nom: null,
    email: null,
    roles: null,
  });
  const [open, setOpen] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<
    { value: string; label: string }[]
  >(data.roles.map((role) => ({ value: role, label: role })));
  const { users, setUsers } = useUsers();

  async function getRoles() {
    const data = await fetchRoles();
    if (Array.isArray(data) && data.length > 0)
      setRoles(
        data.map((role) => ({ value: role.role_name, label: role.role_name }))
      );
    setIsLoading(false);
  }

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (selectedRoles.length > 0)
      setUserData({
        ...userData,
        roles: selectedRoles.map((role) => role.value),
      });
  }, [selectedRoles]);

  function validateForm() {
    let isValid = true;
    const newErrors: userErrors = {
      prenom: null,
      nom: null,
      email: null,
      roles: null,
    };

    if (!userData.prenom) {
      newErrors.prenom = errorMessages.prenom;
      isValid = false;
    }

    if (!userData.nom) {
      newErrors.nom = errorMessages.nom;
      isValid = false;
    }

    if (!userData.email) {
      newErrors.email = "Erreur: L'email est requis.";
      isValid = false;
    } else if (!validator.isEmail(userData.email)) {
      newErrors.email = "Erreur: L'email n'est pas valide.";
      isValid = false;
    }

    if (userData.roles.length === 0) {
      newErrors.roles = errorMessages.roles;
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  }

  async function handleAddUserClick() {
    if (validateForm() && userData.id) {
      const resData = await updateUser(userData.id, userData);
      if (resData !== null) {
        setUsers(
          users.map((user) => {
            if (user.id === userData.id) {
              return {
                ...user,
                prenom: userData.prenom,
                nom: userData.nom,
                email: userData.email,
                roles: userData.roles,
              };
            }
            return user;
          })
        );
        toast.success("L'utilisateur a été mis à jour avec succès.");
        reset();
        setOpen(false);
      }
    }
  }

  function reset() {
    setError({
      prenom: null,
      nom: null,
      email: null,
      roles: null,
    });
    setUserData({
      prenom: "",
      nom: "",
      email: "",
      roles: [],
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel utilisateur.</DialogTitle>
          <DialogDescription>Ajouter un nouvel utilisateur</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-7 gap-2 text-red-500 mt-2">
            {Object.entries(error).map(([k, v]) => {
              if (v != null)
                return (
                  <Fragment key={k}>
                    <div className="col-span-1 flex items-center justify-end">
                      <div className="h-10 w-10 bg-red-50 rounded flex items-center justify-center">
                        <ShieldAlert size={20} />
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div className="bg-red-50 h-10 w-full rounded flex items-center justify-start px-3">
                        <span className="text-sm font-mediu">{v}</span>
                      </div>
                    </div>
                  </Fragment>
                );
            })}
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right col-span-1 text-gray-700"
            >
              Prenom
            </Label>
            <Input
              value={userData.prenom}
              onChange={(e) =>
                setUserData({ ...userData, prenom: e.target.value })
              }
              className={cn(
                "focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6",
                error.prenom == null ? "border-gray-300" : "border-red-300",
                error.prenom == null
                  ? "placeholder:text-gray-500"
                  : "placeholder:text-red-500"
              )}
              placeholder={"Saisir le nom du utilisateur."}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right col-span-1 text-gray-700"
            >
              Nom
            </Label>
            <Input
              value={userData.nom}
              onChange={(e) =>
                setUserData({ ...userData, nom: e.target.value })
              }
              className={cn(
                "focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6",
                error.nom == null ? "border-gray-300" : "border-red-300",
                error.nom == null
                  ? "placeholder:text-gray-500"
                  : "placeholder:text-red-500"
              )}
              placeholder={"Saisir le prenom du utilisateur."}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right col-span-1 text-gray-700"
            >
              Email
            </Label>
            <Input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className={cn(
                "focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6",
                error.email == null ? "border-gray-300" : "border-red-300",
                error.email == null
                  ? "placeholder:text-gray-500"
                  : "placeholder:text-red-500"
              )}
              placeholder={"Saisir l'email du utilisateur."}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right col-span-1 text-gray-700"
            >
              roles
            </Label>
            <Select
              isMulti
              isLoading={isLoading}
              components={animatedComponents}
              value={selectedRoles}
              onChange={(sRoles) => {
                if (sRoles.length <= 0)
                  setError({
                    ...error,
                    roles: errorMessages.roles,
                  });
                else
                  setError({
                    ...error,
                    roles: null,
                  });

                setSelectedRoles(sRoles as { value: string; label: string }[]);
              }}
              name="roles"
              options={roles}
              className={cn(
                "basic-multi-select col-span-6",
                error.roles == null ? "border-gray-300" : "border-red-300",
                error.roles == null
                  ? "placeholder:text-gray-500"
                  : "placeholder:text-red-500"
              )}
              classNamePrefix="select"
              placeholder={`choisir parmi les ${roles.length} roles`}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddUserClick} type="submit">
            Ajouter un nouvel utilisateur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
