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
import { Fragment, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Plus, ShieldAlert } from "lucide-react";
import { UserDto } from "@/types/user/UserDto";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { cn } from "@/lib/utils";
import { fetchRoles } from "@/lib/axios/roles/FetchRoles";
import validator from "validator";
import zxcvbn from "zxcvbn";
import toast from "react-hot-toast";
import { addUser } from "@/lib/axios/users/addUser";
import { useUsers } from "@/hooks/useUsers";

const animatedComponents = makeAnimated();

type userErrors = {
  prenom: string | null;
  nom: string | null;
  email: string | null;
  pwd: string | null;
  roles: string | null;
};

const errorMessages = {
  prenom: "Erreur: Le prénom est requis et ne peut pas être vide.",
  nom: "Erreur: Le nom est requis et ne peut pas être vide.",
  email: "Erreur: L'email est requis et doit être au format correct.",
  pwd: "Erreur: Le mot de passe est requis et ne peut pas être vide.",
  roles: "Erreur: Au moins un rôle doit être sélectionné.",
};

export function AddUserDialog() {
  const [userData, setUserData] = useState<UserDto>({
    prenom: "",
    nom: "",
    email: "",
    pwd: "",
    roles: [],
  });
  const [error, setError] = useState<userErrors>({
    prenom: null,
    nom: null,
    email: null,
    pwd: null,
    roles: null,
  });
  const [open, setOpen] = useState<boolean>();
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<
    { value: string; label: string }[]
  >([]);
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
      pwd: null,
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

    if (!userData.pwd) {
      newErrors.pwd = "Erreur: Le mot de passe est requis.";
      isValid = false;
    } else {
      const passwordStrength = zxcvbn(userData.pwd);
      if (passwordStrength.score < 3) {
        newErrors.pwd =
          "Erreur: Le mot de passe est trop faible. Veuillez en choisir un plus sécurisé.";
        isValid = false;
      }
    }

    if (userData.roles.length === 0) {
      newErrors.roles = errorMessages.roles;
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  }

  async function handleAddUserClick() {
    if (validateForm()) {
      const resData = await addUser(userData);
      if (resData !== null) {
        setUsers([userData, ...users]);
        toast.success("L'utilisateur a été ajouté avec succès.");
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
      pwd: null,
      roles: null,
    });
    setUserData({
      prenom: "",
      nom: "",
      email: "",
      pwd: "",
      roles: [],
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white bg-sky-500 hover:bg-sky-700">
          Ajouter <Plus size={20} className="text-white ml-2" />
        </Button>
      </DialogTrigger>
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
              Password
            </Label>
            <div
              className={cn(
                "flex gap-1 items-center justify-start w-full col-span-6"
              )}
            >
              <Input
                type={showPwd ? "text" : "password"}
                value={userData.pwd}
                onChange={(e) =>
                  setUserData({ ...userData, pwd: e.target.value })
                }
                className={cn(
                  "focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6",
                  error.pwd == null ? "border-gray-300" : "border-red-300",
                  error.pwd == null
                    ? "placeholder:text-gray-500"
                    : "placeholder:text-red-500"
                )}
                placeholder={"Saisir le mot de pass du utilisateur."}
              />
              <div
                className="w-10 h-10 rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                onClick={() => setShowPwd(!showPwd)}
              >
                {!showPwd ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>
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
