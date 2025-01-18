import { Avatar, Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import React from 'react'

type StudentDataType = {
    name: string,
    email: string,
    password: string,
    password2: string,
    major: string,
    active: boolean,
    profile_picture: string
  }
type props = {openCreateModal: boolean, setOpenCreateModal: Function, studentData: StudentDataType, setStudentData:Function, addStudent: Function}

function CreateStudentModal({openCreateModal, setOpenCreateModal, studentData, setStudentData, addStudent}: props) {
    const profilePictures = [1, 39, 25, 49, 75, 56, 66, 86];

  return (
    
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
  )
}

export default CreateStudentModal