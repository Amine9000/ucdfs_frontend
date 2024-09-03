export type Module = {
  nom: string;
  status: string;
};

export type Semester = {
  semester_code: string;
  semester_name: string;
  modules: Module[];
};
