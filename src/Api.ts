import { useQuery } from "@tanstack/react-query";
import axios from "axios"
const ApiUrl = "https://bikeindex.org/api/v3"

const useQueryGetAllBikes = (page : number,search:string) => {
    const query = useQuery({
        queryKey: ["get-all-bikes",page , search],
        queryFn: async () => {
            const { data }: any = await axios.get(`${ApiUrl}/seach` , {
                params:{
                    page:page,
                    per_page:10,
                    query:search
                }
            });
            return data;
          },
           
    });
    return query;
};

const Api = {
    useQueryGetAllBikes,
    ApiUrl
}
export default Api