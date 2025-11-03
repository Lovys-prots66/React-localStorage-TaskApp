import { useEffect } from "react";
function useLocalStorage(item = [], key=0){

  if(key === 1){

    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(item))
    }, [item]);

  }else{

    const rawdata = localStorage.getItem("tasks");

    return rawdata ? JSON.parse(rawdata) : [];
  }
}
export default useLocalStorage;