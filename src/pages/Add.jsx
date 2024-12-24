import React from "react";

const Add = (props) => {
  const { onAdd, onChange } = props;
  return (
    <div>
      <form action="" onSubmit={onAdd}>
        <input type="text" name="name" placeholder="name" onInput={onChange} />
        <input type="text" name="des" placeholder="des" onInput={onChange} />
        <input type="text" name="img" placeholder="img" onInput={onChange} />
        <input
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

export default Add;
