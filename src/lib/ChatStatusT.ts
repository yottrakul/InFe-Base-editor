import { Fact } from "@/pages/facts";

export type ChatState = {
    kb:          Rule[];
    startNode:   Fact[];
    concludNode: Fact[];
    bb:          Fact[];
    query:       Fact[];
    result:      Fact[]|null;
    save_query:  Fact[];
}

export type Rule = {
    id:           string;
    preFactId_1:  string;
    preExp:       null | string;
    preFactId_2:  null | string;
    postFactId_1: string;
    postExp:      null | string;
    postFactId_2: null | string;
    postFact_1:   Fact;
    postFact_2:   Fact | null;
    preFact_1:    Fact;
    preFact_2:    Fact | null;
}