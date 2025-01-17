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

function Students() {
  const profilePictures = [1, 39, 25, 49, 75, 56, 66, 86];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState([]);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    major: "",
    active: true,
    profile_picture: "",
  });

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
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Students</h1>
      <div className="text-sm mt-1">
        All Students: <span className="font-bold">{students.length}</span>
      </div>
      <hr className="h-0.5 my-4 bg-gray-200 border-0 rounded dark:bg-gray-700" />
      <Button size="xs" color="blue" onClick={() => setOpenCreateModal(true)}>
        <HiPlus size={16} className="text-white" /> Add Student
      </Button>

      <StudentsTable students={students}></StudentsTable>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      ></Paginator>

      <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Modal.Header>Add a New Student</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                placeholder="John Smith"
                required
                shadow
                value={studentData.name}
                onChange={(e) => {
                  setStudentData({ ...studentData, name: e.target.value });
                }}
              />
            </div>

            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="major" value="Select the student's major" />
              </div>
              <Select
                id="majors"
                required
                onChange={(e) => {
                  setStudentData({ ...studentData, major: e.target.value });
                }}
              >
                <option value={""}>Select a Major</option>
                <option value={"1"}>Computer Systems Engineering</option>
                <option value={"2"}>Electric Engineering</option>
                <option value={"3"}>Business Administration</option>
                <option value={"4"}>Accounting</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2" value="Your email" />
              </div>
              <TextInput
                id="email2"
                type="email"
                placeholder="name@outlook.com"
                required
                shadow
                value={studentData.email}
                onChange={(e) => {
                  setStudentData({ ...studentData, email: e.target.value });
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="●●●●●●●"
                required
                shadow
                value={studentData.password}
                onChange={(e) => {
                  setStudentData({ ...studentData, password: e.target.value });
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeat-password" value="Repeat password" />
              </div>
              <TextInput
                id="repeat-password"
                type="password"
                placeholder="●●●●●●●"
                required
                shadow
                value={studentData.password2}
                onChange={(e) => {
                  setStudentData({ ...studentData, password2: e.target.value });
                }}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="profile_picture" value="Profile Picture" />
                <div className="flex flex-wrap gap-2">
                  {profilePictures.map((pic) => (
                    <Avatar
                      size="lg"
                      className={`${
                        studentData.profile_picture == pic.toString()
                          ? "outline outline-2 outline-offset-2  outline-blue-500 hover:brightness-50"
                          : "hover:brightness-50"
                      }`}
                      key={pic}
                      img={`https://avatar.iran.liara.run/public/${pic}`}
                      alt={pic.toString()}
                      rounded
                      onClick={() => {
                        setStudentData({
                          ...studentData,
                          profile_picture: pic.toString(),
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addStudent()}>Save</Button>
          <Button color="gray" onClick={() => setOpenCreateModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
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
