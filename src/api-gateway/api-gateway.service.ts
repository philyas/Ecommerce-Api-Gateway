import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiGatewayService {
  constructor(private httpService: HttpService) {}

  async logIn(username: string, password:string): Promise<any> {
    try {
      const payload = {
        username, password
      }

      console.log(payload)

      // Forward request to Order Service
      const response = await this.httpService.axiosRef
        .post('http://localhost:3001/auth/login', payload, {})

        console.log(response.data)

      return { payload: response.data}
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }


  async createOrder(userId: number, orderPayload: any): Promise<any> {
    try {
      // Forward request to Order Service
      const response = await this.httpService.axiosRef
        .post('http://localhost:3002/orders/create', orderPayload)

      return response.data
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  // Add more methods for other functionalities (e.g., getProduct, updateOrder, etc.)
}
