import { useEffect, useState } from "react";
import { StudentsTable } from "./StudentsTable";
import { Paginator } from "../../components/Pagination";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import CreateStudentModal from "./CreateStudentModal";
import EditStudentModal from "./EditStudentModal";
import { useApi } from "../../hooks/useApi";
import { Student } from "../../models/students";

function Students() {
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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [studentData, setStudentData] =
    useState<StudentData>(initialStudentData);

  const {fetchStudents, postNewStudent, postUpdateStudent} = useApi();

  const fetchData = async () => {
    const result = await fetchStudents();
    console.log(result);
    
    if (Array.isArray(result)) {
      const [status, studentsFetched] = result;
      if (status === "success") {
        setStudents(studentsFetched);
      }
    } else {
      console.error("Failed to fetch students:", result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!openEditModal) setStudentData(initialStudentData);
  }, [openCreateModal, openEditModal]);

  const addStudent = async () => {
    const [isValid, message] = validateForm(studentData);
    if (!isValid) {
      return alert(message);
    }
    const result = await postNewStudent(studentData);

        if (Array.isArray(result)) {
      const [status, message] = result;
      
      if (status === "success") {
        alert(message);
      }
    } else {
      alert("Error: " + message);
    }
    fetchData();
    setOpenCreateModal(false);
    setStudentData(initialStudentData);
  };

  const updateStudent = async (optionals: {
    passwordChange: boolean;
    pictureChange: boolean;
  }) => {
    const [isValid, message] = validateEditForm(studentData, optionals);
    if (!isValid) {
      return alert(message);
    }
    //NEED TO ADD STUDENT ID
    const result = await postUpdateStudent({
      id: studentData.id, 
      newStudentData: studentData, 
      optionals
    }
    );

   if (Array.isArray(result)) {
      const [status, message] = result;
      
      if (status === "success") {
        alert(message);
      }
    } else {
      alert("Error: " + message);
    }
    fetchData();
    setOpenEditModal(false);
    //alert(result.message);
    setStudentData(initialStudentData);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Students</h1>
      <div className="text-sm mt-1">
        All Students: <span className="font-bold">{students.length}</span>
      </div>
      <hr className="h-0.5 my-4 bg-gray-200 border-0 rounded dark:bg-gray-700" />
      <Button
        size="xs"
        className="mb-3"
        color="blue"
        onClick={() => setOpenCreateModal(true)}
      >
        <HiPlus size={16} className="text-white" /> Add Student
      </Button>

      <StudentsTable
        students={students}
        setStudentData={setStudentData}
        setOpenEditModal={setOpenEditModal}
      ></StudentsTable>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      ></Paginator>

      <CreateStudentModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        studentData={studentData}
        setStudentData={setStudentData}
        addStudent={addStudent}
      />
      <EditStudentModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        studentData={studentData}
        setStudentData={setStudentData}
        updateStudent={updateStudent}
      />
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
  if (formData.password !== formData.password2) {
    return [false, "Passwords do not match"];
  }

  for (const prop in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, prop)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((formData as any)[prop] == "") {
        return [false, `${prop} is required`];
      }
    }
  }
  return [true, ""];
};

const validateEditForm = (
  formData: StudentData,
  {
    passwordChange,
    pictureChange,
  }: {
    passwordChange: boolean;
    pictureChange: boolean;
  }
) => {
  if (formData.id < 1) {
    return [false, "No student selected."];
  }

  if (passwordChange) {
    if (formData.password == "") {
      return [false, "Password field required."];
    }
  }

  if (pictureChange) {
    if (formData.profile_picture == "") {
      return [false, "Please select a profile picture."];
    }
  }

  const { name, major, email } = formData;

  if (name == "" || major == "" || email == "") {
    return [false, "Please fill out all fields."];
  }

  return [true, ""];
};

export default Students;
