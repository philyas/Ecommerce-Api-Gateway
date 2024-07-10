import { Controller, Post, Body, Req, UseGuards, Get, UploadedFile, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from 'src/product/create-product.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @Get('products')
    //  @UseGuards(AuthGuard) // Example of using AuthGuard for authentication
     async getProducts(): Promise<any> {
       // Forward order creation request to ApiGatewayService
       return this.apiGatewayService.getProducts();
     }

     @Post('products')
      @UseInterceptors(FileInterceptor('file'))
     //  @UseGuards(AuthGuard) // Example of using AuthGuard for authentication
      async createProduct(@UploadedFile() file: Express.Multer.File | undefined, @Body() body:any): Promise<any> {
        const createProductDto = new CreateProductDto() 
        createProductDto.name = body.name
        createProductDto.description = body.description
        createProductDto.price = body.price
        createProductDto.stock = body.stock
        createProductDto.categoryIds = JSON.parse(body.categoryIds)

        if (file) {
           this.apiGatewayService.uploadFile(file)
        }
        return this.apiGatewayService.createProduct(createProductDto);
      }



  @Post('order/create')
  @UseGuards(AuthGuard('jwt')) 
  async createOrder(@Req() req, @Body() orderPayload: any): Promise<any> {
     const userId = req?.user?.userId 
 
    // Forward order creation request to ApiGatewayService
    return this.apiGatewayService.createOrder(userId,orderPayload);
  }
}
