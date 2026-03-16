import "./BoxCustomer.css";
import { useState } from "react";
import Modal from "../common/Modal";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Button, ButtonSmall } from "../common/Button";
import { BiTrash, BiEdit, BiSolidUserCircle } from "react-icons/bi";

function BoxCustomer({ customerInfo, customers, setCustomers, totalCustomers, setTotalCustomers }) {
  const [modalRmvCustomerIsOpen, setModalRmvCustomerIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (customerId) => {
    setIsLoading(true);

    await api
      .delete(`/customers/${customerId}`)
      .then((response) => {
        console.log(response);
        setCustomers(customers.filter((customer) => customer.id !== customerId));
        setTotalCustomers(totalCustomers - 1);
        setIsLoading(false);
        setModalRmvCustomerIsOpen(!modalRmvCustomerIsOpen);
      })
      .catch((error) => {
        console.error("Erro ao deletar cliente!:", error);
        setIsLoading(false);
      });
  };

  const handleUpdate = (customerId) => {
    navigate(`/customer/${customerId}`);
  };

  return (
    <>
      <div className="box_user">
        <div className="box_picture">
          <BiSolidUserCircle />
        </div>

        <div className="box_infos">
          <div className="infos">
            <h2>{customerInfo.name}</h2>
            
            <div className="dual-th">
              <span>{customerInfo.email}</span>
              <span>{customerInfo.cpf}</span>
            </div><br />

            <p>{customerInfo.phone}</p>
          </div>

          <div className="actions">
            <ButtonSmall
              className="updt"
              tooltipId="react-tooltip-edt"
              tooltipContent="Editar"
              onClick={() => handleUpdate(customerInfo.id)}
            >
              <BiEdit />
            </ButtonSmall>

            <ButtonSmall
              className="rmv"
              tooltipId="react-tooltip-rmv"
              tooltipContent="Remover"
              onClick={() => setModalRmvCustomerIsOpen(true)}
            >
              <BiTrash />
            </ButtonSmall>
          </div>
        </div>
      </div>

      <Modal
        title="Remover"
        isOpen={modalRmvCustomerIsOpen}
        onClose={() => setModalRmvCustomerIsOpen(!modalRmvCustomerIsOpen)}
      >
        <p>
          Tem certeza que deseja remover o usuário <b>{customerInfo?.name}</b>?
        </p>

        <Button onClick={() => handleDelete(customerInfo.id)}>
          {isLoading ? "Removendo..." : "Confirmar remoção"}
        </Button>
      </Modal>
    </>
  );
}

export default BoxCustomer;
