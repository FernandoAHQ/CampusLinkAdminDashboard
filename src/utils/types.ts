export type CreateStudentType = {
  name: string;
  email: string;
  major: string;
  password: string;
  profile_picture: string;
  active: boolean;
};

export type UpdateStudentType = {
  id: number,
  newStudentData: CreateStudentType,
  optionals: { passwordChange: boolean; pictureChange: boolean }
};
