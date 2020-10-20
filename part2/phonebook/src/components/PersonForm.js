import React from "react";

const PersonForm = ({
  contactNameHandler,
  contactNumberHandler,
  submitHandler,
  defaultName,
  defaultNumber,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={contactNameHandler} value={defaultName} />
        <div>
          number:{" "}
          <input onChange={contactNumberHandler} value={defaultNumber} />
        </div>
      </div>
      <div>
        <button type="submit" onClick={submitHandler}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
