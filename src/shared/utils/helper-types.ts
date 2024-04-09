import { Dispatch, SetStateAction } from "react";

export type SetState<SET_TYPE> = Dispatch<SetStateAction<SET_TYPE>>;
