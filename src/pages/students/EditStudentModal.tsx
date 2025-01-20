import {
  Avatar,
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { StudentData } from "./Students";

type props = {
  openEditModal: boolean;
  setOpenEditModal: (isOpen: boolean) => void;
  setStudentData: (studentData: StudentData) => void;
  studentData: StudentData;
  updateStudent: (optionals: {
    passwordChange: boolean;
    pictureChange: boolean;
  }) => void;
};

export const majors = [
  "Computer Systems Engineering",
  "Electric Engineering",
  "Business Administration",
  "Accounting",
];

function EditStudentModal({
  openEditModal,
  setOpenEditModal,
  studentData,
  setStudentData,
  updateStudent,
}: props) {
  const profilePictures = [1, 39, 25, 49, 75, 56, 66, 86];
  const majors = [
    "Computer Systems Engineering",
    "Electric Engineering",
    "Business Administration",
    "Accounting",
  ];

  const majorIndex = majors.indexOf(studentData.major) + 1;

  const [changePassword, setChangePassword] = useState(false);
  const [changePicture, setChangePicture] = useState(false);

  const resetOptionals = () => {
    setChangePassword(false);
    setChangePicture(false);
  };

  useEffect(() => {
    resetOptionals();
  }, [openEditModal]);

  return (
    <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
      <Modal.Header>Edit Student</Modal.Header>
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
              value={majorIndex}
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
          <div className="flex items-center gap-2">
            <Checkbox
              id="password-change"
              checked={changePassword}
              onChange={(e) => {
                setChangePassword(e.target.checked);
              }}
            />
            <Label htmlFor="password-change">Change Password</Label>
          </div>
          {changePassword && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="●●●●●●●"
                onChange={(e) => {
                  setStudentData({ ...studentData, password: e.target.value });
                }}
                required
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <Checkbox
              id="picture-change"
              checked={changePicture}
              onChange={(e) => {
                setChangePicture(e.target.checked);
              }}
            />
            <Label htmlFor="password-change">Change Picture</Label>
          </div>
          {changePicture && (
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
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() =>
            updateStudent({
              passwordChange: changePassword,
              pictureChange: changePicture,
            })
          }
        >
          Save
        </Button>
        <Button color="gray" onClick={() => setOpenEditModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditStudentModal;
