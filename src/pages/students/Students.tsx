import { useEffect, useState } from "react";
import { StudentsTable } from "./StudentsTable";
import { Paginator } from "../../components/Pagination";
import { getAllStudents } from "../../services/studentsServices";

function Students() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllStudents();
      if (res.status == "success") {
        setStudents(res.data);
        setTotalPages(1);
      }
      console.log(res);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <StudentsTable students={students}></StudentsTable>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      ></Paginator>
    </div>
  );
}

export default Students;
