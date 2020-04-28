import { Component } from '@angular/core';
import { AFM } from '@gooddata/typings';
import { IValidElementsOptions } from '@gooddata/gooddata-js/lib/metadata';
import { factory as goodDataSdkFactory, SDK } from '@gooddata/gooddata-js';
import { fromPromise } from 'rxjs/internal-compatibility';

export class GoodDataSdkFactory {
  public getSdk(config?: any): SDK {
    return goodDataSdkFactory(config);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'skyux-spa-testing';

  constructor(private sdkFactory: GoodDataSdkFactory) {}

  public sendRequest() {
    // tslint:disable-next-line:max-line-length
    const afm = '{"attributes":[{"displayForm":{"uri":"/gdc/md/xuvb6vi3e06fapjh56ym3hmni3g80f43/obj/137537"},"localIdentifier":"38bd3c2b4b5e443fb29c5f40c925e818"},{"displayForm":{"uri":"/gdc/md/xuvb6vi3e06fapjh56ym3hmni3g80f43/obj/5919"},"localIdentifier":"8927f8295765485085937852a4f7783b"}],"measures":[{"localIdentifier":"0411e5527a09456e93a7bb4b0250373b","definition":{"measure":{"item":{"uri":"/gdc/md/xuvb6vi3e06fapjh56ym3hmni3g80f43/obj/5370"},"aggregation":"sum"}},"alias":"Sum of Gift amount","format":"#,##0.00"}],"filters":[{"positiveAttributeFilter":{"displayForm":{"uri":"/gdc/md/xuvb6vi3e06fapjh56ym3hmni3g80f43/obj/137537"},"in":["/gdc/md/xuvb6vi3e06fapjh56ym3hmni3g80f43/obj/137536/elements?id=1"]}},{"positiveAttributeFilter":{"displayForm":{"uri":"/gdc/md/xuvb6vi3e06fapjh56ym3hmni3g80f43/obj/5919"},"in":["/gdc/md/xuvb6vi3e06fapjh56ym3hmni3g80f43/obj/5918/elements?id=3440056"]}}]}';
    const a = <AFM.IAfm>JSON.parse(afm);
    const opts: IValidElementsOptions = {
      afm: a
    };

    const sdk = this.sdkFactory.getSdk({ domain: 'https://analyze.renxt.blackbaud.com' });
    fromPromise(sdk.md.getValidElements('xuvb6vi3e06fapjh56ym3hmni3g80f43', 'identifier:' + 'label.gift.gift_id', opts)).subscribe(e => {
      console.log('success');
      console.log(e);
    }, (err) => {
      console.log('error');
      console.log(err);
    });
  }
}
