import "./CategorySelect.css";
import FieldError from "./FieldError";

function CategorySelect({ name, value, validateErrors, onChange }) {
  return (
    <>
      {validateErrors?.map((errorMsg, index) => {
        return <FieldError key={index}>{errorMsg}</FieldError>;
      })}

      <select
        name={name ?? ""}
        className={`${validateErrors?.length && "field_error"}`}
        value={value ?? ""}
        onChange={onChange}
      >
        <option value="">Selecione uma Categoria</option>
        <option value="Casa">Casa</option>
        <option value="Limpeza">Limpeza</option>
        <option value="Roupas">Roupas</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
      </select>
    </>
  );
}

export default CategorySelect;
