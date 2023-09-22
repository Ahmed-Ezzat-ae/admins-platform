import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { AdminContext } from '../context/AdminContext';

const TeacherTableItems = ({ teacher, index, handleDeleteTeacher }) => {
  const { isMainAdmin } = useContext(AdminContext);
  return (
    <tr className="text-center align-middle">
      <td>{index}</td>
      <td>
        <img
          src={teacher?.profile}
          alt="profile"
          width={50}
          height={50}
          className="rounded"
        />
      </td>
      <td>{teacher?.name}</td>
      <td>{teacher?.material}</td>
      <td className="text-center">
        {teacher?.phone.map((p) => (
          <p className="mb-1" key={p}>
            {p}
          </p>
        ))}
      </td>
      <td>
        <Button variant="danger" disabled={!isMainAdmin} size="sm" onClick={() => handleDeleteTeacher(teacher?._id)}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
};

export default TeacherTableItems;
