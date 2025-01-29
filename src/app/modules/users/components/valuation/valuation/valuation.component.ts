import {
  Component,
  ComponentRef,
  OnInit,
  Type,
  ViewChild,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../../../../../core/constants/global-constants';
import { BerkusMethodComponent } from './child-components/berkus-method/berkus-method.component';
import { DiscountedCashflowComponent } from './child-components/discounted-cashflow/discounted-cashflow.component';
import { VentureCapitalMethodComponent } from './child-components/venture-capital-method/venture-capital-method.component';
import { EarningMultiplierMethodComponent } from './child-components/earning-multiplier-method/earning-multiplier-method.component';
import { PaynescoreMethodComponent } from './child-components/paynescore-method/paynescore-method.component';
import { RiskSummationFactorComponent } from './child-components/risk-summation-factor/risk-summation-factor.component';
import { StartupsMethodComponent } from './child-components/startups-method/startups-method.component';
import { SummarizedValuationComponent } from './child-components/summarized-valuation/summarized-valuation.component';
import { ValuationPDFService } from '../../../../../core/services/valuation-pdf/valuation-pdf.service';

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrl: './valuation.component.scss',
})
export class ValuationComponent implements OnInit {
  isLoading = false;

  ValuationFormGroup: any = FormGroup;

  constructor(private formBuilder: FormBuilder,private valuationPdf: ValuationPDFService) {}

  selectedTabs!: String;

  private currentComponentRef: ComponentRef<any> | null = null;

  tabNames: any = {
    StartupsMethod: 'StartupsMethod',
    PaynescoreMethod: 'PaynescoreMethod',
    BerkusMethod: 'BerkusMethod',
    DiscountedCashFlow: 'DiscountedCashFlow',
    VentureCapitalMethod: 'VentureCapitalMethod',
    EarningMultiplierMethod: 'EarningMultiplierMethod',
    RiskSummationFactor: 'RiskSummationFactorMethod',
    SummarizedValuation: 'SummarizedValuation'
  };

  // Store data for each tab
  tabData: { [key: string]: any } = {};

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  createComponent(ComponentName: String) {
    debugger
    console.log('tabData:', this.tabData);
    // Save data for the currently selected tab
    if (this.selectedTabs) {
      this.saveTabData(this.selectedTabs);
    }
  
    // Clear the container and create a new component
    this.container.clear();
    this.selectedTabs = ComponentName;
    const containerType = this.getComponentType(ComponentName);
    this.currentComponentRef = this.container.createComponent(containerType);
  
    // Pass data to the new component
    if (this.tabData[ComponentName as string]) {
      this.currentComponentRef.instance.data = this.tabData[ComponentName as string];
    }
  
    // Specifically pass StartupsMethod data to PaynescoreMethod
    if (ComponentName === this.tabNames.PaynescoreMethod && this.tabData['StartupsMethod']) {
      this.currentComponentRef.instance.startupData = this.tabData['StartupsMethod'];
    }

    if(ComponentName === this.tabNames.SummarizedValuation){
      this.currentComponentRef.instance.startupData = this.tabData['StartupsMethod'];
      this.currentComponentRef.instance.paynescoreData = this.tabData['PaynescoreMethod'];
      this.currentComponentRef.instance.berkusData = this.tabData['BerkusMethod'];
      this.currentComponentRef.instance.riskSummation = this.tabData['RiskSummationFactorMethod'];
      this.currentComponentRef.instance.discountedCashFlow = this.tabData['DiscountedCashFlow'];
      this.currentComponentRef.instance.ventureCapital = this.tabData['VentureCapitalMethod'];
      this.currentComponentRef.instance.earningMultiplier = this.tabData['EarningMultiplierMethod'];
    }
  }

  saveTabData(tabName: String) {
    if (this.currentComponentRef) {
      this.tabData[tabName as string] = this.currentComponentRef.instance.data;
    }
  }

  getComponentType(name: String): Type<any> {
    let type: Type<any> = BerkusMethodComponent;
    switch (name) {
      case this.tabNames.StartupsMethod: {
        type = StartupsMethodComponent;
        break;
      }

      case this.tabNames.BerkusMethod: {
        type = BerkusMethodComponent;
        break;
      }
      case this.tabNames.PaynescoreMethod: {
        type = PaynescoreMethodComponent;
        break;
      }
      case this.tabNames.RiskSummationFactor: {
        type = RiskSummationFactorComponent;
        break;
      }
      case this.tabNames.DiscountedCashFlow: {
        type = DiscountedCashflowComponent;
        break;
      }
      case this.tabNames.VentureCapitalMethod: {
        type = VentureCapitalMethodComponent;
        break;
      }
      case this.tabNames.EarningMultiplierMethod: {
        type = EarningMultiplierMethodComponent;
        break;
      }
      case this.tabNames.SummarizedValuation: {
        type = SummarizedValuationComponent;
        break;
      }
    }
    return type;
  }

  ngOnInit(): void {
    this.ValuationFormGroup = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      startupName: [
        '',
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      founderName: [
        '',
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      address: ['', [Validators.required]],
      decription: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      website: [
        '',
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
    });

    this.createComponent('StartupsMethod');
  }

  valuationFormSubmit() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false; // Reset or change the loading state
      console.log('Stopped loading.');
    }, 2000); // Stop after 5 seconds
    console.log(this.ValuationFormGroup.value);
  }

  onReset() {
    this.ValuationFormGroup.reset(); // Reset the form
    this.isLoading = false; // Reset loading state, just in case
  }

  generatePdf(){
    this.valuationPdf.generatePdf(this.tabData,this.ValuationFormGroup.value);
  }

}
