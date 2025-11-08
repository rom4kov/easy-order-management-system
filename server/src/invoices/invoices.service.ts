import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { DeleteResult } from 'typeorm';
import { Order } from 'src/orders/order.entity';
import { Customer } from 'src/customers/customer.entity';
import { invoices } from 'src/seed/invoices';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async seedInvoices(): Promise<void> {
    console.log('seeding invoices');
    for (const inv of invoices) {
      console.log(inv);
      if (inv) {
        const order = await this.ordersRepository.findOneBy({
          id: inv.order,
        });
        if (!order) continue;

        const customer = await this.customersRepository.findOneBy({
          id: inv.customer,
        });
        if (!customer) continue;
        console.log(order);

        const invoice = this.invoicesRepository.create({
          ...inv,
          order,
          customer,
        });

        await this.invoicesRepository.save(invoice);
      }
    }
  }

  async getInvoices(
    query: string,
    amount: number,
    page: number,
    orderBy: string,
    orderMode: 'ASC' | 'DESC',
  ): Promise<Invoice[] | []> {
    const result = await this.invoicesRepository
      .createQueryBuilder('Invoice')
      .leftJoin('Invoice.customer', 'Customer')
      .leftJoin('Invoice.order', 'Order')
      .select([
        'Invoice.id',
        'Invoice.invoiceNumber',
        'Invoice.items',
        'Invoice.createdAt',
        'Invoice.updatedAt',
        'Invoice.dueDate',
        'Invoice.status',
        'Invoice.total',
        'Customer.id',
        'Customer.name',
        'Order.id',
        'Order.title',
      ])
      .where('Invoice.invoiceNumber ilike :query', {
        query: `%${query}%`,
      })
      .take(amount >= 0 ? amount : undefined)
      .skip(page * 10)
      .orderBy(`Invoice.${orderBy}`, orderMode)
      .getMany();
    console.log(result);
    return result;
  }

  async getNumOfInvoices(query: string): Promise<number> {
    const result = await this.invoicesRepository
      .createQueryBuilder()
      .leftJoin('Invoice.customer', 'Customer')
      .leftJoin('Invoice.order', 'Order')
      .select([
        'Invoice.id',
        'Invoice.invoiceNumber',
        'Invoice.items',
        'Invoice.createdAt',
        'Invoice.updatedAt',
        'Invoice.dueDate',
        'Invoice.status',
        'Invoice.total',
        'Customer.id',
        'Customer.name',
        'Order.id',
        'Order.title',
      ])
      .where('"Order".title ilike :query', {
        query: `%${query}%`,
      })
      .getCount();
    return result;
  }

  async getInvoice(id: number): Promise<Invoice | null> {
    const result = await this.invoicesRepository.findOneBy({
      id: id,
    });
    console.log('getInvoice result: ', result);
    return result;
  }

  async addInvoice(invoice: CreateInvoiceDto): Promise<void> {
    const order = await this.ordersRepository.findOneBy({
      id: invoice.order,
    });
    const customer = await this.customersRepository.findOneBy({
      id: invoice.customer,
    });
    if (order instanceof Order && customer instanceof Customer) {
      const invoiceWithOrder = this.invoicesRepository.create({
        ...invoice,
        order,
        customer,
      });
      const response = await this.invoicesRepository.insert(invoiceWithOrder);
      console.log(response);
    }
  }

  async updateInvoice(invoice: Invoice): Promise<Invoice | null> {
    const invoiceToUpdate = await this.invoicesRepository.findOneBy({
      id: Number(invoice.id),
    });
    if (invoiceToUpdate) {
      invoiceToUpdate.invoiceNumber = invoice.invoiceNumber;
      invoiceToUpdate.order = invoice.order;
      invoiceToUpdate.customer = invoice.customer;
      invoiceToUpdate.createdAt = invoice.createdAt;
      invoiceToUpdate.updatedAt = invoice.updatedAt;
      invoiceToUpdate.dueDate = invoice.dueDate;
      invoiceToUpdate.status = invoice.status;
      invoiceToUpdate.items = invoice.items;
      invoiceToUpdate.total = invoice.total;
      return await this.invoicesRepository.save(invoiceToUpdate);
    }
    return null;
  }

  async deleteInvoice(id: number): Promise<DeleteResult> {
    const response = await this.invoicesRepository.delete(id);
    return response;
  }
}
