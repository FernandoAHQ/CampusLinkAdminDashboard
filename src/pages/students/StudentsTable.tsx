import { Avatar, Table, ToggleSwitch } from "flowbite-react";
import { Student } from "../../models/students";

export function StudentsTable({ students }: { students: Student[] }) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Major</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Active</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {students.map((student) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>
                <Avatar
                  img={student.student_profile_picture}
                  alt={student.student_name}
                  rounded
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {student.student_name}
              </Table.Cell>
              <Table.Cell>{student.major}</Table.Cell>
              <Table.Cell>{student.student_email}</Table.Cell>
              <Table.Cell>
                <ToggleSwitch
                  checked={student.active}
                  onChange={() => console.log("toggled")}
                />
              </Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
