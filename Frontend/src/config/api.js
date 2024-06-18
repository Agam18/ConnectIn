import axios from "axios";

const jwtToken=localStorage.getItem("jwt");

export const api=axios.create({baseUrl:"http://localhost:8080/",
    headers:{
        "Authorization":`Bearer ${jwtToken}`,
        "Content-Type":"application/json"
    }
});
