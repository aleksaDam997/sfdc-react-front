import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiConfig } from '../Config/ApiConfig';


export interface ApiResponse{
  status: 'ok' | 'error' | 'login';
  data: any;
}

export function login(creditentials: {username: string; password: string}) {

  return new Promise<ApiResponse>((resolve) => {
    const params = new URLSearchParams()
    params.append('username', creditentials.username);
    params.append('password', creditentials.password);

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      
      axios.post("http://apps.sf.ues.rs.ba:8080/app/api/login", params, config)
        .then((res) => {

          console.log(res);
          console.log(res.data);

          if(res.status < 200 || res.status >= 300){

            const response: ApiResponse = {
                status: 'error',
                data: res.data
            };
    
            return resolve(response);
        }
        
        if(res.data.statusCode < 0){
            const response: ApiResponse = {
                status: 'ok',
                data: res.data
            };
    
            return resolve(response);
        }
    
        const response: ApiResponse = {
            status: 'ok',
            data: res.data
        };
    
        return resolve(response);

        })
        .catch((err) => {
          console.log(err);
        })
  });
}

export function fetch(path: string, method: 'get' | 'post' | 'put' | 'patch' | 'delete', body: any | undefined){
  return new Promise<ApiResponse>((resolve) => {
        
    const requestData: AxiosRequestConfig = {
        method: method,
        url: path,
        baseURL: ApiConfig.baseUrl,
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAccessToken()            }
    };

    axios(requestData)
    .then(res => responseHandler(res, resolve))
    .catch(async err => {
   
      const response: ApiResponse = {
          status: 'error',
          data: err
      };

      return resolve(response);
  });
  
  });

}

export function saveAccessToken(accessToken: string): void {
  localStorage.setItem("access_token", accessToken);
}

export function saveRefreshToken(refreshToken: string): void {
  localStorage.setItem("refresh_token", refreshToken);
}

function getAccessToken(): string {
  const token = localStorage.getItem("access_token");
  return "Bearer " + token;
}

function getRefreshToken(): string {
  const token = localStorage.getItem("refresh_token");
  return "Bearer " + token;
}

async function responseHandler(res: AxiosResponse<any>, resolve: (value: ApiResponse) => void){

  console.log(res);

  if(res.status < 200 || res.status >= 300){

      const response: ApiResponse = {
          status: 'error',
          data: res.data
      };

      return resolve(response);
  }
  
  if(res.data.statusCode < 0){
      const response: ApiResponse = {
          status: 'ok',
          data: res.data
      };

      return resolve(response);
  }

  const response: ApiResponse = {
      status: 'ok',
      data: res.data
  };

  return resolve(response)
}