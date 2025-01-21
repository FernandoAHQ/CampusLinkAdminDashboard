// Define the Admin type
interface Admin {
    id: string;
    username: string;
    email: string;
    [key: string]: any; // Add other properties as needed
  }
  
  // DTO for the response structure
  export interface AuthResponseDTO {
    status: number;
    data: {
      status: string;
    message: string;
    accessToken?: string; // Optional
    user?: Admin;
    }
  }
  