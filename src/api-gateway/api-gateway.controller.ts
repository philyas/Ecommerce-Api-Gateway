import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';


@Controller('api')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('auth/login')
  //  @UseGuards(AuthGuard) // Example of using AuthGuard for authentication
   async logIn(@Req() req, @Body() { username, password, email }: any): Promise<any> {

     // Forward order creation request to ApiGatewayService
     return this.apiGatewayService.logIn(username, password, email);
   }

  @Post('orders/create')
 //  @UseGuards(AuthGuard) // Example of using AuthGuard for authentication
  async createOrder(@Req() req, @Body() orderPayload: any): Promise<any> {
    const userId = req.user.id; // Assuming user ID is available in the request

    // Forward order creation request to ApiGatewayService
    return this.apiGatewayService.createOrder(userId, orderPayload);
  }
}
