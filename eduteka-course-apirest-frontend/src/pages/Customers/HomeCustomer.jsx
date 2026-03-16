import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import BoxCustomer from "../../components/layout/BoxCustomer";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import "./HomeCustomer.css";


function  CustomerHome() {
  const numCustomerPerPage = 3;
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setIsLoading(true);

    await api
      .get("/customers", {
        params: {
          current_page: currentPage,
          per_page: 3,
        }
      })
      .then((response) => {
        setCustomers([...customers, ...response.data.data]);
        setCurrentPage(currentPage + 1);
        setTotalCustomers(response.data.infos.total_customers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (totalCustomers !== customers.length) {
      fixCurrentPage();
    }
  }, [totalCustomers]);

  const fixCurrentPage = () => {
    //Arredonda pra cima
    let maxNumPage = Math.ceil(totalCustomers / numCustomerPerPage);
    
    if (currentPage > maxNumPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadMore = () => {
    loadCustomers();
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Listagem de Clientes</h1>
          <p>Listagem de todos clientes cadastrados na aplicação.</p>

          {customers.length <= 0 ? (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <p>Ops! Nenhum cliente cadastrado até o momento!.</p>
              )}
            </>
          ) : (
            <>
              {customers.length === 1 ? (
                <span>1 Cliente</span>
              ) : (
                <span>{totalCustomers} Clientes</span>
              )}

              {customers.map((customer, index) => {
                return (
                  <BoxCustomer
                    key={index}
                    customerInfo={customer}
                    customers={customers}
                    setCustomers={setCustomers}
                    totalCustomers={totalCustomers}
                    setTotalCustomers={setTotalCustomers}
                  />
                );
              })}

              {customers.length < totalCustomers && (
                <>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <Button onClick={() => loadMore()}>Carregar mais</Button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerHome;
