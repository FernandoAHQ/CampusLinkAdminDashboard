import { Student } from "../models/students";
import axios from 'axios';
import { useAuth } from "./useAuth";
import { CreateArticleType, CreateStudentType, UpdateArticleType, UpdateStudentType } from "../utils/types";
import { Article } from "../models/articles";



interface FetchArticleResponse {
  status: string;
  data: Article;
}

interface FetchArticlesResponse {
  status: string;
  data: Article[];
}


interface FetchStudentsResponse {
  status: string;
  data: Student[];
}

interface PostArticleResponse {
  status: string;
  message: string;
}

interface PostStudentResponse {
  status: string;
  message: string;
}

interface UpdateStudentResponse {
  status: string;
  message: string;
}



export const useApi = () => {

  const {cookies} = useAuth();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach token
axiosInstance.interceptors.request.use(

    
    (config:any) => {
        const token = cookies['token']; // Adjust if using a different storage method
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error:Error) => {
        return Promise.reject(error);
    }
);


  const fetchStudents = async (): Promise<[string, Student[]] | Error> => {
    try {
      const response = await axiosInstance.get<FetchStudentsResponse>("/students/all");
      console.log(response.data);
      
    return [response.data.status, response.data.data];
  } catch (error) {
    if (error instanceof Error) {
      // If `error` is an instance of `Error`, return it as is
      return error;
    } else {
      // If `error` is not an `Error`, wrap it into an `Error`
      return new Error("An unknown error occurred");
    }
  }
};

const postNewStudent = async (newStudentData: CreateStudentType) => {
  const postData = {
    name: newStudentData.name,
    password: newStudentData.password,
    email: newStudentData.email,
    section: Number(newStudentData.major),
    profile_picture: `https://avatar.iran.liara.run/public/${newStudentData.profile_picture}`,
    active: newStudentData.active,
  };

  console.log("DATA:");
  console.log(postData);

  try {

    const response = await axiosInstance.post<PostStudentResponse>("/students/create", postData);
    console.log(response);
    
    return [response.data.status, response.data.message];

  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("An unknown error occurred");
    }
  }
};


const postUpdateStudent = async (
  {id, newStudentData, optionals} : UpdateStudentType
) => {
  let postData: {
    id: number;
    name: string;
    password?: string;
    email: string;
    section?: number;
    profile_picture?: string;
    active: boolean;
  };

  console.log(newStudentData.name, newStudentData.major);

  postData = {
    id,
    name: newStudentData.name,
    email: newStudentData.email,
    active: Number(newStudentData.active) == 1 ? true : false,
  };

  if (!isNaN(Number(newStudentData.major))) {
    postData = {
      ...postData,
      section: Number(newStudentData.major),
    };
  }

  if (optionals.passwordChange) {
    postData = {
      ...postData,
      password: newStudentData.password,
    };
  }
  if (optionals.pictureChange) {
    postData = {
      ...postData,
      profile_picture: `https://avatar.iran.liara.run/public/${newStudentData.profile_picture}`,
    };
  }

  console.log("DATA:");

  console.log(postData);

  try {

    const response = await axiosInstance.post<UpdateStudentResponse>("/students/edit", postData);
    console.log(response);
    
    return [response.data.status, response.data.message];

  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("An unknown error occurred");
    }
  }



};

const fetchArticle = async (id:string): Promise<[string, Article] | Error> => {
  try {
    const response = await axiosInstance.get<FetchArticleResponse>(`/articles/${id}`);
    console.log(response.data);
    
  return [response.data.status, response.data.data];
} catch (error) {
  if (error instanceof Error) {
    // If `error` is an instance of `Error`, return it as is
    return error;
  } else {
    // If `error` is not an `Error`, wrap it into an `Error`
    return new Error("An unknown error occurred");
  }
}
};

const fetchArticles = async (q:string): Promise<[string, Article[]] | Error> => {
  const query = q == '' ? '' : '?query=' + q;
  try {
    const response = await axiosInstance.get<FetchArticlesResponse>(`/articles/all/admin${query}`);
    console.log(response.data);
    
  return [response.data.status, response.data.data];
} catch (error) {
  if (error instanceof Error) {
    // If `error` is an instance of `Error`, return it as is
    return error;
  } else {
    // If `error` is not an `Error`, wrap it into an `Error`
    return new Error("An unknown error occurred");
  }
}
};


const postNewArticle = async (newArticleData: CreateArticleType) => {


  console.log("DATA:");
  console.log(newArticleData);

  try {

    const response = await axiosInstance.post<PostArticleResponse>("/articles/new", newArticleData);
    console.log(response);
    
    return [response.data.status, response.data.message];

  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("An unknown error occurred");
    }
  }
};


const postUpdateArticle = async (id: string, articleData: UpdateArticleType) => {


  console.log("DATA:");
  console.log(articleData);

  try {

    const response = await axiosInstance.patch<PostArticleResponse>(`/articles/${id}`, articleData);
    console.log(response);
    
    return [response.data.status, response.data.message];

  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("An unknown error occurred");
    }
  }
};


return {
  postNewArticle,
  fetchStudents,
  postNewStudent,
  postUpdateStudent,
  fetchArticles,
  fetchArticle,
  postUpdateArticle
}

};