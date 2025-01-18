import { useEffect, useState } from "react";
import { StudentsTable } from "./StudentsTable";
import { Paginator } from "../../components/Pagination";
import {
  getAllStudents,
  postNewStudent,
} from "../../services/studentsServices";
import {
  Avatar,
  Button,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import CreateStudentModal from "./CreateStudentModal";
import EditStudentModal from "./EditStudentModal";

function Students() {



  const initialStudentData = {
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
  const [students, setStudents] = useState([]);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [studentData, setStudentData] = useState(initialStudentData);

  const fetchData = async () => {
    const res = await getAllStudents();
    if (res.status == "success") {
      setStudents(res.data);
      setTotalPages(1);
    }
    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addStudent = async () => {
    const [isValid, message] = validateForm(studentData);
    if (!isValid) {
      return alert(message);
    }
    const response = await postNewStudent(studentData);
    fetchData();
    setOpenCreateModal(false);
    alert(response.message);
    setStudentData(initialStudentData);
  };


  const updateStudent = async () => {
    const [isValid, message] = validateForm(studentData);
    if (!isValid) {
      return alert(message);
    }
    // const response = await postNewStudent(studentData);
    // fetchData();
    // setOpenCreateModal(false);
    // alert(response.message);
    // setStudentData(initialStudentData);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Students</h1>
      <div className="text-sm mt-1">
        All Students: <span className="font-bold">{students.length}</span>
      </div>
      <hr className="h-0.5 my-4 bg-gray-200 border-0 rounded dark:bg-gray-700" />
      <Button size="xs" className="mb-3" color="blue" onClick={() => setOpenCreateModal(true)}>
        <HiPlus size={16} className="text-white" /> Add Student
      </Button>

      <StudentsTable students={students} setStudentData={setStudentData} setOpenEditModal={setOpenEditModal} ></StudentsTable>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      ></Paginator>

<CreateStudentModal openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} studentData={studentData} setStudentData={setStudentData} addStudent={addStudent}/>
<EditStudentModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} studentData={studentData} setStudentData={setStudentData} updateStudent={updateStudent}/>
</div>
  );
}

interface StudentData {
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

export default Students;
