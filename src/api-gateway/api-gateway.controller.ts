import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('api')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('auth/login')
  //  @UseGuards(AuthGuard) // Example of using AuthGuard for authentication
   async logIn(@Req() req, @Body() { username, password, email }: any): Promise<any> {
     // Forward order creation request to ApiGatewayService
     return this.apiGatewayService.logIn(username, password, email);
   }

   @Post('auth/register')
   //  @UseGuards(AuthGuard) // Example of using AuthGuard for authentication
    async register(@Req() req, @Body() { username, password, email }: any): Promise<any> {
      // Forward order creation request to ApiGatewayService
      return this.apiGatewayService.register(username, password, email);
    }

  @Post('orders/create')
  @UseGuards(AuthGuard('jwt')) 
  async createOrder(@Req() req, @Body() orderPayload: any): Promise<any> {
    const userId = req.userId 
    return {message:'Authorized To Create Orders'}
    // Forward order creation request to ApiGatewayService
  //  return this.apiGatewayService.createOrder(userId, orderPayload);
  }
}
