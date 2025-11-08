import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../orders.service';
import { Order } from '../../../models/order';
import { EMPTY_ORDER } from '../../../models/defaults';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, DatePipe, RouterLink],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent implements OnInit {
  order: Order = {
    ...EMPTY_ORDER
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.ordersService.getOrder(id)?.subscribe(res => {
        const itemsSanitized = res.data.items?.replace(/'/g, '"');
        if (itemsSanitized) {
          res.data.items = JSON.parse(itemsSanitized);
        }
        this.order = res.data;
        console.log(this.order);
      });
    }
  }
}
