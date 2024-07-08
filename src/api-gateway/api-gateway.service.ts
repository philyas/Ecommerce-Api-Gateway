import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiGatewayService {
  constructor(private httpService: HttpService) {}

  async logIn(username: string, password:string, email:string): Promise<any> {
    try {
      const payload = {
        username, password, email
      }

      console.log(payload)

      // Forward request to Order Service
      const response = await this.httpService.axiosRef
        .post('http://localhost:3001/auth/login', payload, {})

      return { payload: response.data}
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async register(username: string, password:string, email:string): Promise<any> {
    try {
      const payload = {
        username, password, email
      }

      // Forward request to Authentication Service / register
      const response = await this.httpService.axiosRef
        .post('http://localhost:3001/auth/register', payload, {})

      return { payload: response.data}
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async getProducts(): Promise<any> {
    try {
      // Forward request to Product Service 
      const response = await this.httpService.axiosRef
        .get('http://localhost:3002/products')

      return { payload: response.data}
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }


  async createOrder(userId: number, orderPayload: any): Promise<any> {
    console.log(orderPayload)
    try {
      // Forward request to Order Service
      const response = await this.httpService.axiosRef
        .post('http://localhost:3002/orders', orderPayload, {})

      return response.data
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
    
  } 

}
