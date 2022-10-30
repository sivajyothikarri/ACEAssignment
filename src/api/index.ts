import axios from 'axios'
export const baseUrl : string = "http://localhost:6060";

export const fetchService = async ({method,url,data}:any)=>{
     return axios({
       method, // *GET, POST, PUT, DELETE, etc.
       url :`${baseUrl}${url}` ,
        headers: {
          'Content-Type': 'application/json'
        },
        data :  data
      }) 
}

export const getDepartments = async () => {
  return axios.get(`${baseUrl}/departments`)
}

export const getData = async (hc_lowerLimit?:string, hc_upperLimit?:string, departments?:number[] ) => {
  const lowerLimit = hc_lowerLimit ? +hc_lowerLimit : hc_lowerLimit;
  const upperLimit = hc_upperLimit ? +hc_upperLimit : hc_upperLimit;
  return axios.post(`${baseUrl}/table_data`, {
    headCountUpperLimit: upperLimit,
    headCountLowerLimit: lowerLimit,
    departments
  })
}
