import { useQuery } from "@apollo/client";


function useCustomQuery(customQuery,options){
   return useQuery(customQuery,options)
};

export default useCustomQuery; 