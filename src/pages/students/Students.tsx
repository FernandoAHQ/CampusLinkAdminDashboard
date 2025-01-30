import { useEffect, useState } from "react";
import { StudentsTable } from "./StudentsTable";
import { Paginator } from "../../components/Pagination";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import CreateStudentModal from "./CreateStudentModal";
import EditStudentModal from "./EditStudentModal";
import { useApi } from "../../hooks/useApi";
import { Student } from "../../models/students";

const initialStudentData = {
  id: -1,
  name: "",
  email: "",
  password: "",
  password2: "",
  major: "",
  active: true,
  profile_picture: "",
};

function Students() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [studentData, setStudentData] = useState<StudentData>(initialStudentData);

  const { fetchStudents, postNewStudent, postUpdateStudent } = useApi();

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (!openEditModal) resetStudentData();
  }, [openCreateModal, openEditModal]);

  const loadStudents = async () => {
    const result = await fetchStudents();
    if (Array.isArray(result) && result[0] === "success") {
      setStudents(result[1]);
    } else {
      console.error("Failed to fetch students:", result);
    }
  };

  const resetStudentData = () => setStudentData(initialStudentData);

  const handleAddStudent = async () => {
    const [isValid, message] = validateForm(studentData);
    if (!isValid) return alert(message);

    const result = await postNewStudent(studentData);
    handleApiResponse(result);
    setOpenCreateModal(false);
    resetStudentData();
  };

  const handleUpdateStudent = async (optionals: { passwordChange: boolean; pictureChange: boolean }) => {
    const [isValid, message] = validateEditForm(studentData, optionals);
    if (!isValid) return alert(message);

    const result = await postUpdateStudent({ id: studentData.id, newStudentData: studentData, optionals });
    handleApiResponse(result);
    setOpenEditModal(false);
    resetStudentData();
  };

  const handleApiResponse = (result: any) => {
    if (Array.isArray(result) && result[0] === "success") {
      alert(result[1]);
      loadStudents();
    } else {
      alert("Error: " + result[1]);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-primary-700 font-Nexa">Students</h1>
      <div className="text-sm mt-1 font-Nexa text-gray-600">
        All Students: <span className="font-bold text-gray-700">{students.length}</span>
      </div>
      <hr className="h-0.5 my-4 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <button onClick={() => setOpenCreateModal(true)} 
                type="button" className="font-Montserrat font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
                <HiPlus size={20} className="text-white mr-1" /> 
                Add Student
                </button>

      
      <StudentsTable students={students} setStudentData={setStudentData} setOpenEditModal={setOpenEditModal} />
      <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      
      <CreateStudentModal openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} studentData={studentData} setStudentData={setStudentData} addStudent={handleAddStudent} />
      <EditStudentModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} studentData={studentData} setStudentData={setStudentData} updateStudent={handleUpdateStudent} />
    </div>
  );
}

export interface StudentData {
  id: number;
  name: string;
  email: string;
  password: string;
  password2: string;
  major: string;
  active: boolean;
  profile_picture: string;
}

const validateForm = (formData: StudentData) => {
  if (formData.password !== formData.password2) return [false, "Passwords do not match"];
  
  for (const [key, value] of Object.entries(formData)) {
    if (value === "") return [false, `${key} is required`];
  }

  return [true, ""];
};

const validateEditForm = (formData: StudentData, { passwordChange, pictureChange }: { passwordChange: boolean; pictureChange: boolean }) => {
  if (formData.id < 1) return [false, "No student selected."];
  if (passwordChange && formData.password === "") return [false, "Password field required."];
  if (pictureChange && formData.profile_picture === "") return [false, "Please select a profile picture."];
  
  const { name, major, email } = formData;
  if (!name || !major || !email) return [false, "Please fill out all fields."];
  
  return [true, ""];
};

export default Students;