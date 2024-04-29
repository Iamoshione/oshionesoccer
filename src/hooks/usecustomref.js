import { useRef } from "react";

function useCustomRef(value){
    return useRef(value)
}

export default useCustomRef;