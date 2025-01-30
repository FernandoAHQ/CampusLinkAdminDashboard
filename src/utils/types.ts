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

export type CreateArticleType = {
  title: string;
  content: string;
  tags?: string[];
  image_url: string;
};

export type UpdateArticleType = {
  title: string;
  content: string;
  tags?: string[];
  image_url: string;
};