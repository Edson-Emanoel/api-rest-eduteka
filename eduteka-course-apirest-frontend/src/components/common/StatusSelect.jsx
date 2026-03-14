import "./StatusSelect.css";
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
        <option value="">Selecione um Status</option>
        <option value="Vencida">Vencida</option>
        <option value="Corrente">Corrente</option>
        <option value="Paga">Paga</option>
      </select>
    </>
  );
}

export default CategorySelect;
