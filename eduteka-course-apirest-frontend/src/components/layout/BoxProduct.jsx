import { useState } from "react";
import { Button, ButtonSmall } from "../common/Button";
import "./BoxProduct.css";
import { BiTrash, BiEdit, BiSolidUserCircle } from "react-icons/bi";
import Modal from "../common/Modal";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function BoxProduct({ productInfo, products, setProducts, totalProducts, setTotalProducts }) {
  const [modalRmvProductIsOpen, setModalRmvProductIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    setIsLoading(true);

    await api
      .delete(`/products/${productId}`)
      .then((response) => {
        console.log(response);
        setProducts(products.filter((product) => product.id !== productId));
        setTotalProducts(totalProducts - 1);
        setIsLoading(false);
        setModalRmvProductIsOpen(!modalRmvProductIsOpen);
      })
      .catch((error) => {
        console.error("Erro ao deletar produtos:", error);
        setIsLoading(false);
      });
  };

  const handleUpdate = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="box_user">
      <div className="box_picture">
        <BiSolidUserCircle />
      </div>

      <div className="box_infos">
        <div className="infos">
            <h2>{productInfo.name}</h2>
            <span>{productInfo.description}</span><br/>
            <p>R$ {productInfo.price}</p>
        </div>

        <div className="actions">
          <ButtonSmall
            className="updt"
            tooltipId="react-tooltip-edt"
            tooltipContent="Editar"
            onClick={() => handleUpdate(productInfo.id)}
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

      <Modal
        title="Remover"
        isOpen={modalRmvProductIsOpen}
        onClose={() => setModalRmvProductIsOpen(!modalRmvProductIsOpen)}
      >
        <p>
          Tem certeza que deseja remover o produto <b>{productInfo?.name}</b>?
        </p>

        <Button onClick={() => handleDelete(productInfo.id)}>
          {isLoading ? "Removendo..." : "Confirmar remoção"}
        </Button>
      </Modal>
    </div>
  );
}

export default BoxProduct;
