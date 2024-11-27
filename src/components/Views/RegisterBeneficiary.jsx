import React from "react";
import { useState, useCallback } from "react";
import { SelectInput } from "../Inputs/SelectInput";
import { TextInput } from "../Inputs/TextInput";
import { executeProcedure } from "../../api";
import { DoneModal } from "../Modals/DoneModal";

export const RegisterBeneficiary = () => {
  const [accountType, setAccountType] = useState("");
  const [idType, setIdType] = useState("");
  const [id, setId] = useState("");
  const [account, setAccount] = useState("");
  const [reference, setReference] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [isOpen, setIsOpen] = useState(true)

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleAccountTypeChange = useCallback((event) => {
    setAccountType(event.target.value);
  }, []);

  const handleIdTypeChange = useCallback((event) => {
    setIdType(event.target.value);
  }, []);

  const handleIdChange = useCallback((e) => {
    setId(e.target.value);
    if (e.target.value?.length > 9) {
    }
  }, []);

  const handleAccountChange = useCallback((event) => {
    setAccount(event.target.value);
  }, []);

  const handleReferenceChange = useCallback((event) => {
    setReference(event.target.value);
  }, []);

  const handleBeneficiaryChange = useCallback((event) => {
    setBeneficiary(event.target.value);
  }, []);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    executeProcedure(
      "p_registrar_beneficiarios",
      { beneficiario: beneficiary, id_cuenta: account, identificacion: id },
      "dbo"
    )
      .then((resp) => {
        if (resp?.data?.returnValue < 0) {
          console.log(resp?.data?.recordset[0]);
          let { campo, mensaje } = resp?.data?.recordset[0];
          setError({ campo, mensaje });
        } else {
          console.log(resp?.data?.recordset[0]);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  });
  return (
    <div>
      <form
        className="max-w-sm mx-auto my-auto"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* <SelectInput
        label="Tipo de cuenta"
        name="tipocuenta"
        value={accountType}
        selected="ELIGE EL TIPO DE CUENTA"
        onChange={handleAccountTypeChange}
        data={[{value: 0, desc: "CUENTA DE AHORROS"}, {value: 1, desc: "CUENTA CORRIENTE"}]}
        size={2}
      />
      
      <SelectInput
        label="Tipo de identificacion"
        name="tipoidentificacion"
        value={idType}
        onChange={handleIdTypeChange}
        data={[{value: 0, desc: "CEDULA"}, {value: 1, desc: "RNC"}, {value: 2, desc: "PASAPORTE"}]}
        size={2}
      /> */}

        <TextInput
          label="Identificacion *"
          name="identificacion"
          value={id}
          onChange={handleIdChange}
          max={14}
          size={2}
          error={error}
        />

        <TextInput
          label="Cuenta *"
          name="id_cuenta"
          value={account}
          placeholder="DIGITE EL NUMERO DE CUENTA"
          onChange={handleAccountChange}
          size={2}
          error={error}
        />

        <TextInput
          label="Referencia *"
          name="referencia"
          value={reference}
          onChange={handleReferenceChange}
          size={2}
          error={error}
        />

        <TextInput
          label="Beneficiario *"
          name="beneficiario"
          value={beneficiary}
          onChange={handleBeneficiaryChange}
          //disabled={true}
          size={2}
          error={error}
        />

        <TextInput
          label="Correo"
          name="correo"
          value={email}
          onChange={handleEmailChange}
          size={2}
          error={error}
        />

        <button
          className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          type="submit"
        >
          Guardar
        </button>
      </form>
      <DoneModal isOpen={isOpen} onClose={closeModal}/>
    </div>
  );
};
