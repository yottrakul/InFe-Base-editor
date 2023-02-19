import Modal from "@/UI/Model";
import { useState, useEffect } from "react";

type Props = {
  onClose: Function;
  onCreate?: Function;
  onEdit?: Function;
  rule?: Rule;
};

type Fact = {
  id: string;
  label: string;
  fact: string | null;
};

type Rule = {
  id: string;
  preFactId_1: string;
  preExp: string | null;
  preFactId_2: string | null;
  postFactId_1: string;
  postExp: string | null;
  postFactId_2: string | null;
  preFact_1: Fact;
  preFact_2: Fact | null;
  postFact_1: Fact;
  postFact_2: Fact | null;
};

type UserInput = {
  premise: string | null;
  premise2: string | null;
  operation: string | null;
  conclude: string | null;
  conclude2: string | null;
  operationConclude: string | null;
};

const DUMMY: Array<Fact> = [
  {
    id: "c9d81192-d6b9-4be9-b71b-486e6e7e86e6",
    label: "w",
    fact: null,
  },
  {
    id: "4c1e3067-23f3-4f3c-bc31-2d4c70430166",
    label: "e",
    fact: null,
  },
  {
    id: "d46e14c0-5bf1-4f8f-b1d4-fe36486b454a",
    label: "c",
    fact: null,
  },
  {
    id: "58a9cc71-3caa-4ac8-ad55-3e67d378fe5d",
    label: "f",
    fact: null,
  },
];

function CreateRuleBox({ onClose, onCreate, onEdit, rule }: Props) {
  //State
  const [facts, setFacts] = useState(DUMMY); // ติดต่อ database เพื่อทำการดึง fact ทั้งหมด เปลี่ยน dummy เป็น params รับค่า facts
  const [userInput, setUserInput]: [UserInput, any] = useState({
    premise: null,
    premise2: null,
    operation: null,
    conclude: null,
    conclude2: null,
    operationConclude: null,
  });
  const [error, setError] = useState(null);

  const listSelectFacts = facts.map((fact) => {
    return (
      <option key={fact.id} value={fact.id}>
        {fact.label}
      </option>
    );
  });

  useEffect(() => {
    if (onEdit && rule) {
      console.log(rule)
      setUserInput((prev: UserInput) => {
        prev.premise = rule.preFactId_1;
        prev.premise2 = rule.preFactId_2;
        prev.operation = rule.preExp;
        prev.conclude = rule.postFactId_1;
        prev.conclude2 = rule.postFactId_2;
        prev.operationConclude = rule.postExp;
        return {...prev};
      });
    }
  }, []);

  //   const handleChangeName = (e: any) => {
  //     setnameFact(e.target.value);
  //   };

  //   const handleChangeDes = (e: any) => {
  //     setDesFact(e.target.value);
  //   };

  const handleCreate = () => {
    // ทำติดต่อฐานข้อมูล
    try {
      if (!userInput.premise) {
        throw new Error("Invalid: Please input premise");
      } else if (!userInput.conclude) {
        throw new Error("Invalid: Please input 2nd premise");
      } else if (userInput.operation && !userInput.premise2) {
        throw new Error("Invalid: Please input 2nd premise");
      } else if (userInput.operationConclude && !userInput.conclude2) {
        throw new Error("Invalid: Please input 2nd conclude");
      }
      const newRule: Omit<
        Rule,
        "preFact_1" | "preFact_2" | "postFact_1" | "postFact_2"
      > = {
        id: Date.now().toString(),
        preFactId_1: userInput.premise,
        preFactId_2: userInput.premise2,
        preExp: userInput.operation,
        postFactId_1: userInput.conclude,
        postFactId_2: userInput.conclude2,
        postExp: userInput.operationConclude,
      };
      if (onCreate) {
        onCreate(newRule);
      }
      onClose(false);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleEdit = () => {
    // ติดต่อฐานข้อมูลด้วย
    try {
      if (rule && onEdit) {
        const newRule: Omit<
          Rule,
          "preFact_1" | "preFact_2" | "postFact_1" | "postFact_2"
        > = {
          id: rule.id,
          preFactId_1: userInput.premise!,
          preFactId_2: userInput.premise2,
          preExp: userInput.operation,
          postFactId_1: userInput.conclude!,
          postFactId_2: userInput.conclude2,
          postExp: userInput.operationConclude,
        };
        onEdit(newRule);
      }
      onClose(false);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  // JSX Content
  const body = (
    <form>
      <h1 className="text-white mb-4">If</h1>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="premise1"
            className="block mb-2 text-sm font-medium text-yellow-400"
          >
            Select 1st Premise
          </label>
          <select
            value={userInput.premise ?? ""}
            onChange={(e) => {
              setUserInput((prev: UserInput) => {
                prev.premise = e.target.value !== "-" ? e.target.value : null;
                return { ...prev };
              });
            }}
            id="premise1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>-</option>
            {listSelectFacts}
          </select>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="op1"
            className="block mb-2 text-sm font-medium text-yellow-400"
          >
            Select Operation
          </label>
          <select
            value={userInput.operation ?? ""}
            onChange={(e) => {
              setUserInput((prev: UserInput) => {
                prev.operation = e.target.value !== "-" ? e.target.value : null;
                prev.premise2 = e.target.value !== "-" ? prev.premise2 : null;
                return { ...prev };
              });
            }}
            id="op1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>-</option>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="premise2"
            className="block mb-2 text-sm font-medium text-yellow-400"
          >
            Select 2nd Premise
          </label>
          <select
            disabled={!userInput.operation ? true : false}
            value={userInput.premise2 ?? ""}
            onChange={(e) => {
              setUserInput((prev: UserInput) => {
                prev.premise2 = e.target.value !== "-" ? e.target.value : null;
                return { ...prev };
              });
            }}
            id="premise2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>-</option>
            {listSelectFacts}
          </select>
        </div>
      </div>
      <h1 className="text-white mb-4">Then</h1>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="conclude1"
            className="block mb-2 text-sm font-medium text-emerald-400"
          >
            Select 1st Conclude
          </label>
          <select
            value={userInput.conclude ?? ""}
            onChange={(e) => {
              setUserInput((prev: UserInput) => {
                prev.conclude = e.target.value !== "-" ? e.target.value : null;
                return { ...prev };
              });
            }}
            id="conclude1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>-</option>
            {listSelectFacts}
          </select>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="op2"
            className="block mb-2 text-sm font-medium text-emerald-400"
          >
            Select Operation
          </label>
          <select
            value={userInput.operationConclude ?? ""}
            onChange={(e) => {
              setUserInput((prev: UserInput) => {
                prev.operationConclude =
                  e.target.value !== "-" ? e.target.value : null;
                prev.conclude2 = e.target.value !== "-" ? prev.conclude2 : null;
                return { ...prev };
              });
            }}
            id="op2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>-</option>
            <option value="AND">AND</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="conclude2"
            className="block mb-2 text-sm font-medium text-emerald-400"
          >
            Select 2nd Conclude
          </label>
          <select
            disabled={!userInput.operationConclude ? true : false}
            value={userInput.conclude2 ?? ""}
            onChange={(e) => {
              setUserInput((prev: UserInput) => {
                prev.conclude2 = e.target.value !== "-" ? e.target.value : null;
                return { ...prev };
              });
            }}
            id="conclude2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>-</option>
            {listSelectFacts}
          </select>
        </div>
      </div>
      {error ? <div className="text-red-400">{error}</div> : null}
    </form>
  );

  return (
    <Modal
      onClose={onClose}
      body={body}
      confirm_msg={onEdit ? "Confirm Edit" : "Add Rule"}
      title={onEdit ? "Edit Rule" : "Add Rule"}
      confirm={onEdit && !onCreate ? handleEdit : handleCreate}
    />
  );
}

export default CreateRuleBox;
