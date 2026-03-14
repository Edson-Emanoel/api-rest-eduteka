import Home from "../pages/Home";
import ProductHome from "../pages/Products/HomeProduct";
import ProductRegister from "../pages/Products/RegisterProduct";
import Register from "../pages/Register";
import { Routes as RoutesManager, Route } from "react-router-dom";

function Routes() {
  return (
    <>
      <RoutesManager>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<Register />} />
        <Route path="/alterar/:userId" element={<Register />} />

        {/* Products Pages */}
        <Route path="/product" element={<ProductHome />} />
        <Route path="/product/new" element={<ProductRegister />} />
        <Route path="/product/alterar/:userId" element={<ProductRegister />} />

        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </RoutesManager>
    </>
  );
}

export default Routes;
