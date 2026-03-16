import api from "../../services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Form from "../../components/common/Form";
import Input from "../../components/common/Input";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { Button } from "../../components/common/Button";

function CustomerRegister() {
  const { customerId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",  
    cpf: "",
  });

  const [formDataErrors, setFormDataErrors] = useState({
    name: [],
    email: [],
    phone: [],
    cpf: [],
  });

  useEffect(() => {
    if (customerId) {
      loadCustomer();
    }
  }, [customerId]);

  const loadCustomer = async () => {
    setIsLoading(true);

    await api
      .get(`/customers/${customerId}`)
      .then((response) => {
        setFormData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar cliente:", error);
        setIsLoading(false);
      });
  };

  const handleUpdate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setFormDataErrors({});

    await api
      .put(`/customers/${customerId}`, formData)
      .then((response) => {
        console.log(response);
        toast.success("Cliente alterado com sucesso!");
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
      .post("/customers", formData)
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
          {customerId ? (
            <>
              <h1>Alterar Cliente</h1>
              <p>Altere os dados do cliente na aplicação.</p>
            </>
          ) : (
            <>
              <h1>Cadastrar novo Cliente</h1>
              <p>Cadastre um novo cliente na aplicação.</p>
            </>
          )}

          <Form>
            <Input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Nome do Cliente"
              validateErrors={formDataErrors?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <Input
              type="email"
              name="email"
              value={formData.email}
              placeholder="E-mail do Cliente"
              validateErrors={formDataErrors?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              placeholder="Telefone do Cliente"
              validateErrors={formDataErrors?.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <Input
              type="text"
              name="cpf"
              value={formData.cpf}
              placeholder="CPF do Cliente"
              validateErrors={formDataErrors?.cpf}
              onChange={(e) =>
                setFormData({ ...formData, cpf: e.target.value })
              }
            />

            <Link
              to={{
                pathname: "/customer",
                // search: "?query=string",
                // hash: "#hash",
              }}
            >
              Ver listagem
            </Link>

            {customerId ? (
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

export default CustomerRegister;
