import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import BoxBill from "../../components/layout/BoxBill";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import "./Home.css";


function  HomeBill() {
  const numBillPerPage = 3;
  const [totalBills, setTotalBills] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    setIsLoading(true);

    await api
      .get("/bills")
      .then((response) => {
        setBills([...bills, ...response.data.data]);
        setCurrentPage(currentPage + 1);
        setTotalBills(response.data.infos.total_bills);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar contas:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (totalBills !== bills.length) {
      fixCurrentPage();
    }
  }, [totalBills]);

  const fixCurrentPage = () => {
    //Arredonda pra cima
    let maxNumPage = Math.ceil(totalBills / numBillPerPage);
    
    if (currentPage > maxNumPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadMore = () => {
    loadBills();
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Listagem de Contas</h1>
          <p>Listagem de todas contas cadastradas na aplicação.</p>

          {bills.length <= 0 ? (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <p>Ops! Nenhuma conta cadastrada até o momento!.</p>
              )}
            </>
          ) : (
            <>
              {bills.length === 1 ? (
                <span>1 Conta</span>
              ) : (
                <span>{totalBills} Contas</span>
              )}

              {bills.map((bill, index) => {
                return (
                  <BoxBill
                    key={index}
                    billInfo={bill}
                    bills={bills}
                    setBills={setBills}
                    totalBills={totalBills}
                    setTotalBills={setTotalBills}
                  />
                );
              })}

              {bills.length < totalBills && (
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

export default HomeBill;
