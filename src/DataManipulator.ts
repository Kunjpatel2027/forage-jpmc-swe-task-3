import { timeStamp } from 'console';
import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number,
  timestamp: Date,
  upper_bound:number,
  lower_bound:number,
  trigger_alert:number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const priceABC=(serverResponds[0].top_ask.price+serverResponds[0].top_bid.price)/2;
    const priceDEF=(serverResponds[1].top_ask.price+serverResponds[1].top_bid.price)/2;
    const ratio= priceABC/priceDEF;
    const upperBound=1+9.95;
    const lowerbound=1-9.95;
    
    
      return {
        price_abc:priceABC,
        price_def:priceDEF,
        ratio,
        timeStamp:serverResponds[0].timestamp > serverResponds[1].timestamp?
          serverResponds[0].timestamp:serverResponds[1].timestamp,
          upper_bound:upperBound,
          lower_bound:lowerbound,
          trigger_alert1:(ratio>upperBound || ratio<lowerbound)?ratio:undefined,

      };
    }
  }

