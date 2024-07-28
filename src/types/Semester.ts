export type Module = {
  module_code: string;
  module_name: string;
  status: string;
};

export type Semester = {
  semester_code: string;
  semester_name: string;
  modules: Module[];
};
