import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AdminsTableItems = ({ admin, index, handleDeleteAdmin }) => {
  const { adminData } = useContext(AdminContext);
  const decodedData = adminData ? jwt_decode(adminData?.token) : null;
  const navigate = useNavigate();
  return (
    <tr className="text-center align-middle">
      <td>{index}</td>
      <td>
        <img
          src={admin?.profile}
          alt="profile"
          width={50}
          height={50}
          className="rounded-5 object-fit-cover"
        />
      </td>
      <td>{admin?.name}</td>
      <td className="text-center">
        {admin?.phone.map((p) => (
          <p className="mb-1" key={p}>
            {p}
          </p>
        ))}
      </td>
      <td>{admin?.mainAdmin === true ? 'نعم' : 'لا'}</td>

      <td>
        <Button
          variant="success"
          size="sm"
          className="ms-2"
          disabled={!decodedData.mainAdmin}
          onClick={() => navigate(`/admins/${admin?._id}`)}
        >
          <FaEdit />
        </Button>
        <Button
          variant="danger"
          size="sm"
          disabled={!decodedData.mainAdmin || decodedData.id === admin?._id}
          onClick={() => handleDeleteAdmin(admin?._id)}
        >
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
};

export default AdminsTableItems;
