import api from "../../services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Form from "../../components/common/Form";
import Input from "../../components/common/Input";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { Button } from "../../components/common/Button";
import CategorySelect from "../../components/common/CategorySelect";
import StatusSelect from "../../components/common/StatusSelect";

function RegisterBill() {
  const { billId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    status: "",  
    category: "",
  });

  const [formDataErrors, setFormDataErrors] = useState({
    name: [],
    price: [],
    status: [],
    category: [],
  });

  useEffect(() => {
    if (billId) {
      loadBill();
    }
  }, [billId]);

  const loadBill = async () => {
    setIsLoading(true);

    await api
      .get(`/bills/${billId}`)
      .then((response) => {
        setFormData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar contas:", error);
        setIsLoading(false);
      });
  };

  const handleUpdate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setFormDataErrors({});

    await api
      .put(`/bills/${billId}`, formData)
      .then((response) => {
        console.log(response);
        toast.success("Conta alterada com sucesso!");
        setIsLoading(false);
      })
      .catch((error) => {
        // Erro de validação dos dados
        if (error.status === 422) {
          setFormDataErrors(error.response.data.errors);
        } else {
          console.log(error);
          toast.error(error.response.data);
        }

        setIsLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setFormDataErrors({});

    await api
      .post("/bills", formData)
      .then((response) => {
        console.log(response);
        toast.success("Cadastro realizado com sucesso!");
        setFormData({});
        setIsLoading(false);
      })
      .catch((error) => {
        // Erro de validação dos dados
        if (error.status === 422) {
          setFormDataErrors(error.response.data.errors);
        } else {
          console.log(error);
          toast.error(error.response.data);
        }

        setIsLoading(false);
      });
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          {billId ? (
            <>
              <h1>Alterar Conta</h1>
              <p>Altere os dados do conta na aplicação.</p>
            </>
          ) : (
            <>
              <h1>Cadastrar novo Conta</h1>
              <p>Cadastre um novo conta na aplicação.</p>
            </>
          )}

          <Form>
            <Input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Nome da Conta"
              validateErrors={formDataErrors?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <Input
              type="number"
              name="price"
              value={formData.price}
              placeholder="Preço da Conta"
              validateErrors={formDataErrors?.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            
            <CategorySelect
              name="category"
              value={formData.category}
              validateErrors={formDataErrors?.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />

            <StatusSelect
              name="status"
              value={formData.status}
              validateErrors={formDataErrors?.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            />

            <Link
              to={{
                pathname: "/bill",
                // search: "?query=string",
                // hash: "#hash",
              }}
            >
              Ver listagem
            </Link>

            {billId ? (
              <Button onClick={(e) => handleUpdate(e)}>
                {isLoading ? "Alterando..." : "Alterar"}
              </Button>
            ) : (
              <Button onClick={(e) => handleSubmit(e)}>
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterBill;
