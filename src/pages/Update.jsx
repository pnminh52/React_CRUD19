import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Update = ({ products, onUpdate }) => {
  const [inputValue, setInputValue] = useState([]);
  const { id } = useParams();
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const crtPrd = products.find((item) => item.id == id);
  const UpdateFinal = (e) => {
    e.preventDefault();
    const updateData = { ...crtPrd, ...inputValue };
    onUpdate(updateData);
  };
  return (
    <div>
      <form action="" onSubmit={UpdateFinal}>
        <input
          defaultValue={crtPrd?.name}
          type="text"
          name="name"
          placeholder="name"
          onInput={onChange}
        />
        <input
          defaultValue={crtPrd?.des}
          type="text"
          name="des"
          placeholder="des"
          onInput={onChange}
        />
        <input
          defaultValue={crtPrd?.img}
          type="text"
          name="img"
          placeholder="img"
          onInput={onChange}
        />
        <input
          defaultValue={crtPrd?.price}
          type="text"
          name="price"
          placeholder="price"
          onInput={onChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Update;
