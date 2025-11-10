import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Invoice } from './invoice.entity';
import { InvoicesService } from './invoices.service';
import { DeleteResult } from 'typeorm';
import { ApiCreatedResponse } from '@nestjs/swagger';
import TransformInterceptor from 'src/interceptors/transform.interceptor';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Public } from 'src/decorators/public.decorator';

interface Query {
  search: string;
}

interface Params {
  id?: number;
  query?: string;
}

@UseInterceptors(TransformInterceptor)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Public()
  @Get('seed')
  seedInvoices(): Promise<void> {
    return this.invoicesService.seedInvoices();
  }

  @Get()
  getInvoices(
    @Query('search') query: string,
    @Query('amount') amount: number,
    @Query('page') page: number,
    @Query('orderBy') orderBy: string,
    @Query('orderMode') orderMode: 'ASC' | 'DESC',
  ): Promise<Invoice[]> {
    return this.invoicesService.getInvoices(
      query,
      amount,
      page,
      orderBy,
      orderMode,
    );
  }

  @Get('count')
  getCount(@Query() query: Query): Promise<number> {
    return this.invoicesService.getNumOfInvoices(query.search);
  }

  @Get(':id')
  getInvoice(@Param() params: Params): Promise<Invoice | null> {
    return this.invoicesService.getInvoice(Number(params.id));
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async addInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<void> {
    const response = await this.invoicesService.addInvoice(createInvoiceDto);
    console.log('response:', response);
    return response;
  }

  @Put()
  async updateInvoice(
    @Body() createInvoiceDto: Invoice,
  ): Promise<Invoice | null> {
    const response = await this.invoicesService.updateInvoice(createInvoiceDto);
    return response;
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: string): Promise<DeleteResult> {
    const response = await this.invoicesService.deleteInvoice(Number(id));
    return response;
  }
}
