import "./BoxBill.css";
import { useState } from "react";
import Modal from "../common/Modal";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Button, ButtonSmall } from "../common/Button";
import { BiTrash, BiEdit, BiSolidUserCircle } from "react-icons/bi";

function BoxBill({ billInfo, bills, setBills, totalBills, setTotalBills }) {
  const [modalRmvProductIsOpen, setModalRmvProductIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (billId) => {
    setIsLoading(true);

    await api
      .delete(`/bills/${billId}`)
      .then((response) => {
        console.log(response);
        setBills(bills.filter((billId) => billId.id !== billIdId));
        setTotalBills(totalBills - 1);
        setIsLoading(false);
        setModalRmvProductIsOpen(!modalRmvProductIsOpen);
      })
      .catch((error) => {
        console.error("Erro ao deletar produtos:", error);
        setIsLoading(false);
      });
  };

  const handleUpdate = (billId) => {
    navigate(`/bill/${billId}`);
  };

  return (
    <>
      <div className="box_user">
        <div className="box_picture">
          <BiSolidUserCircle />
        </div>

        <div className="box_infos">
          <div className="infos">
            <h2>{billInfo.name}</h2>
            
            <div className="dual-th">
              <span>{billInfo.category}</span>
              <span>Status: {billInfo.status}</span>
            </div><br />

            <p>R$ {billInfo.price}</p>
          </div>

          <div className="actions">
            <ButtonSmall
              className="updt"
              tooltipId="react-tooltip-edt"
              tooltipContent="Editar"
              onClick={() => handleUpdate(billInfo.id)}
            >
              <BiEdit />
            </ButtonSmall>

            <ButtonSmall
              className="rmv"
              tooltipId="react-tooltip-rmv"
              tooltipContent="Remover"
              onClick={() => setModalRmvProductIsOpen(true)}
            >
              <BiTrash />
            </ButtonSmall>
          </div>
        </div>
      </div>

      <Modal
        title="Remover"
        isOpen={modalRmvProductIsOpen}
        onClose={() => setModalRmvProductIsOpen(!modalRmvProductIsOpen)}
      >
        <p>
          Tem certeza que deseja remover a conta <b>{billInfo?.name}</b>?
        </p>

        <Button onClick={() => handleDelete(billInfo.id)}>
          {isLoading ? "Removendo..." : "Confirmar remoção"}
        </Button>
      </Modal>
    </>
  );
}

export default BoxBill;
