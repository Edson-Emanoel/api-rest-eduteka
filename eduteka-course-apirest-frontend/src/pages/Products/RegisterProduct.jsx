import api from "../../services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Form from "../../components/common/Form";
import Input from "../../components/common/Input";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { Button } from "../../components/common/Button";

function ProductRegister() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 1,
  });

  const [formDataErrors, setFormDataErrors] = useState({
    name: [],
    price: [],
    description: [],
    stock: [],
  });

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    setIsLoading(true);

    await api
      .get(`/products/${productId}`)
      .then((response) => {
        setFormData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setIsLoading(false);
      });
  };

  const handleUpdate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setFormDataErrors({});

    await api
      .put(`/products/${productId}`, formData)
      .then((response) => {
        console.log(response);
        toast.success("Produto alterado com sucesso!");
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
      .post("/products", formData)
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
          {productId ? (
            <>
              <h1>Alterar produto</h1>
              <p>Altere os dados do produto na aplicação.</p>
            </>
          ) : (
            <>
              <h1>Cadastrar novo produto</h1>
              <p>Cadastre um novo produto na aplicação.</p>
            </>
          )}

          <Form>
            <Input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Nome do Produto"
              validateErrors={formDataErrors?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <Input
              type="number"
              name="price"
              value={formData.price}
              placeholder="Preço"
              validateErrors={formDataErrors?.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            
            <Input
              type="text"
              name="description"
              value={formData.description}
              placeholder="Descrição do Produto"
              validateErrors={formDataErrors?.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <Input
              type="number"
              name="stock"
              value={formData.stock}
              placeholder="Qtd. em Estoque"
              validateErrors={formDataErrors?.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />

            <Link
              to={{
                pathname: "/product",
                // search: "?query=string",
                // hash: "#hash",
              }}
            >
              Ver listagem
            </Link>

            {productId ? (
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

export default ProductRegister;
