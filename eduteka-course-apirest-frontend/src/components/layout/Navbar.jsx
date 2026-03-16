import "./Navbar.css"; // Opcional: para estilização
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

function Navbar() {
  return (
    <nav className="menu">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Eduteka" title="Eduteka" />
        </Link>
      </div>

      <ul>
        <li>
          <Link to="/">Listagem</Link>
        </li>

        <li>
          <Link to="/cadastrar">Cadastrar</Link>
        </li>
        

        <li>
          <Link to="/product">Produtos</Link>
        </li>

        <li className="teste">
          <Link to="/product/new">C.Produtos</Link>
        </li>
        
        
        <li>
          <Link to="/bill">Contas</Link>
        </li>

        <li>
          <Link to="/bill/new">C.Contas</Link>
        </li>
        
        
        <li>
          <Link to="/customer">Clientes</Link>
        </li>

        <li>
          <Link to="/customer/new">C.Clientes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
