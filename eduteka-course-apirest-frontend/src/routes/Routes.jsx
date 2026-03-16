import Home from "../pages/Home";
import Register from "../pages/Register";

import ProductHome from "../pages/Products/HomeProduct";
import ProductRegister from "../pages/Products/RegisterProduct";

import HomeBill from "../pages/Bills/HomeBill";
import RegisterBill from "../pages/Bills/RegisterBill";

import HomeCustomer from "../pages/Customers/HomeCustomer";
import RegisterCustomer from "../pages/Customers/RegisterCustomer";

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
        <Route path="/product/:productId" element={<ProductRegister />} />

        {/* Bills Pages */}
        <Route path="/bill" element={<HomeBill />} />
        <Route path="/bill/new" element={<RegisterBill />} />
        <Route path="/bill/:billId" element={<RegisterBill />} />

        {/* Customers Pages */}
        <Route path="/customer" element={<HomeCustomer />} />
        <Route path="/customer/new" element={<RegisterCustomer />} />
        <Route path="/customer/:customerId" element={<RegisterCustomer />} />

        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </RoutesManager>
    </>
  );
}

export default Routes;
