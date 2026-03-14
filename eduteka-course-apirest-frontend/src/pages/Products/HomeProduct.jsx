import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import BoxProduct from "../../components/layout/BoxProduct";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import "./Home.css";


function  ProductHome() {
  const numProductPerPage = 3;
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Ninntendo Switch (3)",
      price: 1250.00,
      description: "Outro console da metendo",
      stock: 1000
    },
  ]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);

    await api
      .get("/products")
      .then((response) => {
        setProducts([...products, ...response.data]);
        // setCurrentPage(currentPage + 1);
        // setTotalProducts(response.data.infos.total_products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   if (totalProducts !== products.length) {
  //     fixCurrentPage();
  //   }
  // }, [totalProducts]);

  const fixCurrentPage = () => {
    //Arredonda pra cima
    let maxNumPage = Math.ceil(totalProducts / numProductPerPage);
    
    if (currentPage > maxNumPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadMore = () => {
    loadProducts();
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Listagem de Produtos</h1>
          <p>Listagem de todos produtos cadastrados na aplicação.</p>

          {products.length <= 0 ? (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <p>Ops! Nenhum produto cadastrado até o momento!.</p>
              )}
            </>
          ) : (
            <>
              {/* {products.length === 1 ? (
                <span>1 Produto</span>
              ) : (
                <span>{totalProducts} Produtos</span>
              )} */}

              {products.map((product, index) => {
                return (
                  <BoxProduct
                    key={index}
                    productInfo={product}
                    products={products}
                    setProducts={setProducts}
                    // totalUsers={totalUsers}
                    // setTotalUsers={setTotalUsers}
                  />
                );
              })}

              {products.length < totalProducts && (
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

export default ProductHome;
