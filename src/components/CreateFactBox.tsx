import Modal from "@/UI/Model";
import { randomUUID } from "crypto";
import { useState } from "react";

type Props = {
  onClose: Function;
  onCreate: Function
};

type Fact = {
    id: string;
    label: string;
    fact: string | null;
  };

function CreateFactBox({ onClose, onCreate }: Props) {
  //State
  const [nameFact, setnameFact] = useState('');
  const [desFact, setDesFact] = useState('');

  const handleChangeName = (e: any) => {
    setnameFact(e.target.value)
  }

  const handleChangeDes = (e: any) => {
    setDesFact(e.target.value)
  }

  const handleCreate = () => {
    const fact: Fact = {
        id: Date.now().toString(),
        label: nameFact,
        fact: desFact === ''? null : desFact
    }
    onCreate(fact);
  }

  // JSX Content
  const body = (
    <form>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="floating_factName"
          id="floating_factName"
          className="block text-white py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={nameFact}
          onChange={(e) => handleChangeName(e)}
          required
        />
        <label
          htmlFor="floating_factName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name (ตัวอย่าง : A)
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="floating_factDes"
          id="floating_factDes"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={desFact}
          onChange={(e) => handleChangeDes(e)}
          required
        />
        <label
          htmlFor="floating_factDes"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Description (ตัวอย่าง : รถติด)
        </label>
      </div>
    </form>
  );

  // Function To Add Fact
  const confirm = () => {};

  return (
    <Modal
      onClose={onClose}
      body={body}
      confirm_msg={"Add Fact"}
      title={"Add Fact"}
      confirm={handleCreate}
    />
  );
}

export default CreateFactBox;
