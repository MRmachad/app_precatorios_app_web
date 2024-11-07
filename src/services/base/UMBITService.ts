import { UMBITRequest } from "./UMBITRequest";


export class UMBITService {
  private _baseUrl: string;
  
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private getToken = () : string | null => {
    return localStorage.getItem("acessToken");
  }

  requisicaoGET = (path: string) : UMBITRequest => {
    const token = this.getToken();

    const response = new UMBITRequest(`${this._baseUrl}/${path}`, { 
      method: "GET", 
      headers: { 
        "Content-Type": "application/json",
        ...(token && { 'Authorization': `Bearer ${token}` }) 
      }, 
    });

    return response;
  }

  requisicaoPOST = <TRequest>(path: string, body: TRequest) : UMBITRequest => {
    const token = this.getToken();

    const response = new UMBITRequest(`${this._baseUrl}/${path}`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json",
        ...(token && { 'Authorization': `Bearer ${token}` })
      }, 
      body: JSON.stringify(body) 
    });

    return response;
  }

  requisicaoPUT = <TRequest>(path: string, body: TRequest) : UMBITRequest => {
    const token = this.getToken();

    const response = new UMBITRequest(`${this._baseUrl}/${path}`, { 
      method: "PUT", 
      headers: { 
        "Content-Type": "application/json",
        ...(token && { 'Authorization': `Bearer ${token}` })
      }, 
      body: JSON.stringify(body) 
    });

    return response;
  }

  requisicaoDELETE = (path: string) : UMBITRequest => {
    const token = this.getToken();

    const response = new UMBITRequest(`${this._baseUrl}/${path}`, { 
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        ...(token && { 'Authorization': `Bearer ${token}` })
      }, 
    });

    return response;
  }
}

