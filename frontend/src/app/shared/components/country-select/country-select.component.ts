import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ISelectedCountry } from '../../models/country.model';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrl: './country-select.component.css',
})
export class CountrySelectComponent implements AfterViewChecked, OnChanges {
  @Input() ngClass: string = '';
  @Output() selectionChange = new EventEmitter<ISelectedCountry>();
  @Output() selectionBlur = new EventEmitter<boolean>();

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _el: ElementRef
  ) {}

  private buttonInitialized = false;
  public hsSelectConfig = JSON.stringify({
    hasSearch: true,
    searchPlaceholder: 'Search...',
    searchClasses:
      'block w-full text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] py-2 px-3',
    searchWrapperClasses: 'bg-white p-2 -mx-1 sticky top-0',
    placeholder: 'Select country...',
    toggleTag: `<button type="button" aria-expanded="false"><span class="me-2" data-icon></span><span class="text-gray-800" data-title></span></button>`,
    toggleClasses:
      'hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-4 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
    dropdownClasses:
      'mt-2 max-h-48 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300',
    optionClasses:
      'py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100',
    optionTemplate:
      '<div><div class="flex items-center"><div class="me-2" data-icon></div><div class="text-gray-800" data-title></div></div></div>',
    extraMarkup:
      '<div class="absolute top-1/2 end-3 -translate-y-1/2"><svg class="shrink-0 size-3.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg></div>',
  });
  public countries = [
    {
      value: 'AF',
      label: 'Afghanistan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/af.svg' alt='Afghanistan' />`,
      }),
    },
    {
      value: 'AX',
      label: 'Aland Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ax.svg' alt='Aland Islands' />`,
      }),
    },
    {
      value: 'AL',
      label: 'Albania',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/al.svg' alt='Albania' />`,
      }),
    },
    {
      value: 'DZ',
      label: 'Algeria',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/dz.svg' alt='Algeria' />`,
      }),
    },
    {
      value: 'AS',
      label: 'American Samoa',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/as.svg' alt='American Samoa' />`,
      }),
    },
    {
      value: 'AD',
      label: 'Andorra',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ad.svg' alt='Andorra' />`,
      }),
    },
    {
      value: 'AO',
      label: 'Angola',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ao.svg' alt='Angola' />`,
      }),
    },
    {
      value: 'AI',
      label: 'Anguilla',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ai.svg' alt='Anguilla' />`,
      }),
    },
    {
      value: 'AG',
      label: 'Antigua and Barbuda',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ag.svg' alt='Antigua and Barbuda' />`,
      }),
    },
    {
      value: 'AR',
      label: 'Argentina',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ar.svg' alt='Argentina' />`,
      }),
    },
    {
      value: 'AM',
      label: 'Armenia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/am.svg' alt='Armenia' />`,
      }),
    },
    {
      value: 'AW',
      label: 'Aruba',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/aw.svg' alt='Aruba' />`,
      }),
    },
    {
      value: 'AU',
      label: 'Australia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/au.svg' alt='Australia' />`,
      }),
    },
    {
      value: 'AT',
      label: 'Austria',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/at.svg' alt='Austria' />`,
      }),
    },
    {
      value: 'AZ',
      label: 'Azerbaijan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/az.svg' alt='Azerbaijan' />`,
      }),
    },
    {
      value: 'BS',
      label: 'Bahamas',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bs.svg' alt='Bahamas' />`,
      }),
    },
    {
      value: 'BH',
      label: 'Bahrain',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bh.svg' alt='Bahrain' />`,
      }),
    },
    {
      value: 'BD',
      label: 'Bangladesh',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bd.svg' alt='Bangladesh' />`,
      }),
    },
    {
      value: 'BB',
      label: 'Barbados',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bb.svg' alt='Barbados' />`,
      }),
    },
    {
      value: 'BY',
      label: 'Belarus',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/by.svg' alt='Belarus' />`,
      }),
    },
    {
      value: 'BE',
      label: 'Belgium',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/be.svg' alt='Belgium' />`,
      }),
    },
    {
      value: 'BZ',
      label: 'Belize',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bz.svg' alt='Belize' />`,
      }),
    },
    {
      value: 'BJ',
      label: 'Benin',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bj.svg' alt='Benin' />`,
      }),
    },
    {
      value: 'BM',
      label: 'Bermuda',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bm.svg' alt='Bermuda' />`,
      }),
    },
    {
      value: 'BT',
      label: 'Bhutan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bt.svg' alt='Bhutan' />`,
      }),
    },
    {
      value: 'BO',
      label: 'Bolivia (Plurinational State of)',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bo.svg' alt='Bolivia (Plurinational State of)' />`,
      }),
    },
    {
      value: 'BQ',
      label: 'Bonaire, Sint Eustatius and Saba',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bq.svg' alt='Bonaire, Sint Eustatius and Saba' />`,
      }),
    },
    {
      value: 'BA',
      label: 'Bosnia and Herzegovina',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ba.svg' alt='Bosnia and Herzegovina' />`,
      }),
    },
    {
      value: 'BW',
      label: 'Botswana',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bw.svg' alt='Botswana' />`,
      }),
    },
    {
      value: 'BR',
      label: 'Brazil',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/br.svg' alt='Brazil' />`,
      }),
    },
    {
      value: 'IO',
      label: 'British Indian Ocean Territory',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/io.svg' alt='British Indian Ocean Territory' />`,
      }),
    },
    {
      value: 'BN',
      label: 'Brunei Darussalam',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bn.svg' alt='Brunei Darussalam' />`,
      }),
    },
    {
      value: 'BG',
      label: 'Bulgaria',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bg.svg' alt='Bulgaria' />`,
      }),
    },
    {
      value: 'BF',
      label: 'Burkina Faso',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bf.svg' alt='Burkina Faso' />`,
      }),
    },
    {
      value: 'BI',
      label: 'Burundi',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bi.svg' alt='Burundi' />`,
      }),
    },
    {
      value: 'CV',
      label: 'Cabo Verde',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cv.svg' alt='Cabo Verde' />`,
      }),
    },
    {
      value: 'KH',
      label: 'Cambodia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/kh.svg' alt='Cambodia' />`,
      }),
    },
    {
      value: 'CM',
      label: 'Cameroon',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cm.svg' alt='Cameroon' />`,
      }),
    },
    {
      value: 'CA',
      label: 'Canada',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ca.svg' alt='Canada' />`,
      }),
    },
    {
      value: 'KY',
      label: 'Cayman Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ky.svg' alt='Cayman Islands' />`,
      }),
    },
    {
      value: 'CF',
      label: 'Central African Republic',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cf.svg' alt='Central African Republic' />`,
      }),
    },
    {
      value: 'TD',
      label: 'Chad',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/td.svg' alt='Chad' />`,
      }),
    },
    {
      value: 'CL',
      label: 'Chile',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cl.svg' alt='Chile' />`,
      }),
    },
    {
      value: 'CN',
      label: 'China',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cn.svg' alt='China' />`,
      }),
    },
    {
      value: 'CX',
      label: 'Christmas Island',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cx.svg' alt='Christmas Island' />`,
      }),
    },
    {
      value: 'CC',
      label: 'Cocos (Keeling) Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cc.svg' alt='Cocos (Keeling) Islands' />`,
      }),
    },
    {
      value: 'CO',
      label: 'Colombia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/co.svg' alt='Colombia' />`,
      }),
    },
    {
      value: 'KM',
      label: 'Comoros',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/km.svg' alt='Comoros' />`,
      }),
    },
    {
      value: 'CK',
      label: 'Cook Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ck.svg' alt='Cook Islands' />`,
      }),
    },
    {
      value: 'CR',
      label: 'Costa Rica',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cr.svg' alt='Costa Rica' />`,
      }),
    },
    {
      value: 'HR',
      label: 'Croatia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/hr.svg' alt='Croatia' />`,
      }),
    },
    {
      value: 'CU',
      label: 'Cuba',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cu.svg' alt='Cuba' />`,
      }),
    },
    {
      value: 'CW',
      label: 'Curaçao',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cw.svg' alt='Curaçao' />`,
      }),
    },
    {
      value: 'CY',
      label: 'Cyprus',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cy.svg' alt='Cyprus' />`,
      }),
    },
    {
      value: 'CZ',
      label: 'Czech Republic',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cz.svg' alt='Czech Republic' />`,
      }),
    },
    {
      value: 'CI',
      label: 'Côte Ivoire',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ci.svg' alt='Côte Ivoire' />`,
      }),
    },
    {
      value: 'CD',
      label: 'Democratic Republic of the Congo',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cd.svg' alt='Democratic Republic of the Congo' />`,
      }),
    },
    {
      value: 'DK',
      label: 'Denmark',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/dk.svg' alt='Denmark' />`,
      }),
    },
    {
      value: 'DJ',
      label: 'Djibouti',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/dj.svg' alt='Djibouti' />`,
      }),
    },
    {
      value: 'DM',
      label: 'Dominica',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/dm.svg' alt='Dominica' />`,
      }),
    },
    {
      value: 'DO',
      label: 'Dominican Republic',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/do.svg' alt='Dominican Republic' />`,
      }),
    },
    {
      value: 'EC',
      label: 'Ecuador',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ec.svg' alt='Ecuador' />`,
      }),
    },
    {
      value: 'EG',
      label: 'Egypt',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/eg.svg' alt='Egypt' />`,
      }),
    },
    {
      value: 'SV',
      label: 'El Salvador',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sv.svg' alt='El Salvador' />`,
      }),
    },
    {
      value: 'GB-ENG',
      label: 'England',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gb.svg' alt='England' />`,
      }),
    },
    {
      value: 'GQ',
      label: 'Equatorial Guinea',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gq.svg' alt='Equatorial Guinea' />`,
      }),
    },
    {
      value: 'ER',
      label: 'Eritrea',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/er.svg' alt='Eritrea' />`,
      }),
    },
    {
      value: 'EE',
      label: 'Estonia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ee.svg' alt='Estonia' />`,
      }),
    },
    {
      value: 'ET',
      label: 'Ethiopia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/et.svg' alt='Ethiopia' />`,
      }),
    },
    {
      value: 'FK',
      label: 'Falkland Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/fk.svg' alt='Falkland Islands' />`,
      }),
    },
    {
      value: 'FO',
      label: 'Faroe Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/fo.svg' alt='Faroe Islands' />`,
      }),
    },
    {
      value: 'FM',
      label: 'Federated States of Micronesia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/fm.svg' alt='Federated States of Micronesia' />`,
      }),
    },
    {
      value: 'FJ',
      label: 'Fiji',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/fj.svg' alt='Fiji' />`,
      }),
    },
    {
      value: 'FI',
      label: 'Finland',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/fi.svg' alt='Finland' />`,
      }),
    },
    {
      value: 'FR',
      label: 'France',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/fr.svg' alt='France' />`,
      }),
    },
    {
      value: 'GF',
      label: 'French Guiana',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gf.svg' alt='French Guiana' />`,
      }),
    },
    {
      value: 'PF',
      label: 'French Polynesia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pf.svg' alt='French Polynesia' />`,
      }),
    },
    {
      value: 'TF',
      label: 'French Southern Territories',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tf.svg' alt='French Southern Territories' />`,
      }),
    },
    {
      value: 'GA',
      label: 'Gabon',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ga.svg' alt='Gabon' />`,
      }),
    },
    {
      value: 'GM',
      label: 'Gambia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gm.svg' alt='Gambia' />`,
      }),
    },
    {
      value: 'GE',
      label: 'Georgia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ge.svg' alt='Georgia' />`,
      }),
    },
    {
      value: 'DE',
      label: 'Germany',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/de.svg' alt='Germany' />`,
      }),
    },
    {
      value: 'GH',
      label: 'Ghana',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gh.svg' alt='Ghana' />`,
      }),
    },
    {
      value: 'GI',
      label: 'Gibraltar',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gi.svg' alt='Gibraltar' />`,
      }),
    },
    {
      value: 'GR',
      label: 'Greece',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gr.svg' alt='Greece' />`,
      }),
    },
    {
      value: 'GL',
      label: 'Greenland',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gl.svg' alt='Greenland' />`,
      }),
    },
    {
      value: 'GD',
      label: 'Grenada',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gd.svg' alt='Grenada' />`,
      }),
    },
    {
      value: 'GP',
      label: 'Guadeloupe',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gp.svg' alt='Guadeloupe' />`,
      }),
    },
    {
      value: 'GU',
      label: 'Guam',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gu.svg' alt='Guam' />`,
      }),
    },
    {
      value: 'GT',
      label: 'Guatemala',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gt.svg' alt='Guatemala' />`,
      }),
    },
    {
      value: 'GG',
      label: 'Guernsey',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gg.svg' alt='Guernsey' />`,
      }),
    },
    {
      value: 'GN',
      label: 'Guinea',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gn.svg' alt='Guinea' />`,
      }),
    },
    {
      value: 'GW',
      label: 'Guinea-Bissau',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gw.svg' alt='Guinea-Bissau' />`,
      }),
    },
    {
      value: 'GY',
      label: 'Guyana',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gy.svg' alt='Guyana' />`,
      }),
    },
    {
      value: 'HT',
      label: 'Haiti',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ht.svg' alt='Haiti' />`,
      }),
    },
    {
      value: 'VA',
      label: 'Holy See',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/va.svg' alt='Holy See' />`,
      }),
    },
    {
      value: 'HN',
      label: 'Honduras',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/hn.svg' alt='Honduras' />`,
      }),
    },
    {
      value: 'HK',
      label: 'Hong Kong',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/hk.svg' alt='Hong Kong' />`,
      }),
    },
    {
      value: 'HU',
      label: 'Hungary',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/hu.svg' alt='Hungary' />`,
      }),
    },
    {
      value: 'IS',
      label: 'Iceland',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/is.svg' alt='Iceland' />`,
      }),
    },
    {
      value: 'IN',
      label: 'India',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/in.svg' alt='India' />`,
      }),
    },
    {
      value: 'ID',
      label: 'Indonesia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/id.svg' alt='Indonesia' />`,
      }),
    },
    {
      value: 'IR',
      label: 'Iran (Islamic Republic of)',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ir.svg' alt='Iran (Islamic Republic of)' />`,
      }),
    },
    {
      value: 'IQ',
      label: 'Iraq',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/iq.svg' alt='Iraq' />`,
      }),
    },
    {
      value: 'IE',
      label: 'Ireland',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ie.svg' alt='Ireland' />`,
      }),
    },
    {
      value: 'IM',
      label: 'Isle of Man',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/im.svg' alt='Isle of Man' />`,
      }),
    },
    {
      value: 'IL',
      label: 'Israel',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/il.svg' alt='Israel' />`,
      }),
    },
    {
      value: 'IT',
      label: 'Italy',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/it.svg' alt='Italy' />`,
      }),
    },
    {
      value: 'JM',
      label: 'Jamaica',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/jm.svg' alt='Jamaica' />`,
      }),
    },
    {
      value: 'JP',
      label: 'Japan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/jp.svg' alt='Japan' />`,
      }),
    },
    {
      value: 'JE',
      label: 'Jersey',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/je.svg' alt='Jersey' />`,
      }),
    },
    {
      value: 'JO',
      label: 'Jordan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/jo.svg' alt='Jordan' />`,
      }),
    },
    {
      value: 'KZ',
      label: 'Kazakhstan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/kz.svg' alt='Kazakhstan' />`,
      }),
    },
    {
      value: 'KE',
      label: 'Kenya',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ke.svg' alt='Kenya' />`,
      }),
    },
    {
      value: 'KI',
      label: 'Kiribati',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ki.svg' alt='Kiribati' />`,
      }),
    },
    {
      value: 'KW',
      label: 'Kuwait',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/kw.svg' alt='Kuwait' />`,
      }),
    },
    {
      value: 'KG',
      label: 'Kyrgyzstan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/kg.svg' alt='Kyrgyzstan' />`,
      }),
    },
    {
      value: 'LA',
      label: 'Laos',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/la.svg' alt='Laos' />`,
      }),
    },
    {
      value: 'LV',
      label: 'Latvia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/lv.svg' alt='Latvia' />`,
      }),
    },
    {
      value: 'LB',
      label: 'Lebanon',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/lb.svg' alt='Lebanon' />`,
      }),
    },
    {
      value: 'LS',
      label: 'Lesotho',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ls.svg' alt='Lesotho' />`,
      }),
    },
    {
      value: 'LR',
      label: 'Liberia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/lr.svg' alt='Liberia' />`,
      }),
    },
    {
      value: 'LY',
      label: 'Libya',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ly.svg' alt='Libya' />`,
      }),
    },
    {
      value: 'LI',
      label: 'Liechtenstein',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/li.svg' alt='Liechtenstein' />`,
      }),
    },
    {
      value: 'LT',
      label: 'Lithuania',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/lt.svg' alt='Lithuania' />`,
      }),
    },
    {
      value: 'LU',
      label: 'Luxembourg',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/lu.svg' alt='Luxembourg' />`,
      }),
    },
    {
      value: 'MO',
      label: 'Macau',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mo.svg' alt='Macau' />`,
      }),
    },
    {
      value: 'MG',
      label: 'Madagascar',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mg.svg' alt='Madagascar' />`,
      }),
    },
    {
      value: 'MW',
      label: 'Malawi',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mw.svg' alt='Malawi' />`,
      }),
    },
    {
      value: 'MY',
      label: 'Malaysia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/my.svg' alt='Malaysia' />`,
      }),
    },
    {
      value: 'MV',
      label: 'Maldives',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mv.svg' alt='Maldives' />`,
      }),
    },
    {
      value: 'ML',
      label: 'Mali',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ml.svg' alt='Mali' />`,
      }),
    },
    {
      value: 'MT',
      label: 'Malta',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mt.svg' alt='Malta' />`,
      }),
    },
    {
      value: 'MH',
      label: 'Marshall Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mh.svg' alt='Marshall Islands' />`,
      }),
    },
    {
      value: 'MQ',
      label: 'Martinique',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mq.svg' alt='Martinique' />`,
      }),
    },
    {
      value: 'MR',
      label: 'Mauritania',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mr.svg' alt='Mauritania' />`,
      }),
    },
    {
      value: 'MU',
      label: 'Mauritius',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mu.svg' alt='Mauritius' />`,
      }),
    },
    {
      value: 'YT',
      label: 'Mayotte',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/yt.svg' alt='Mayotte' />`,
      }),
    },
    {
      value: 'MX',
      label: 'Mexico',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mx.svg' alt='Mexico' />`,
      }),
    },
    {
      value: 'MD',
      label: 'Moldova',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/md.svg' alt='Moldova' />`,
      }),
    },
    {
      value: 'MC',
      label: 'Monaco',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mc.svg' alt='Monaco' />`,
      }),
    },
    {
      value: 'MN',
      label: 'Mongolia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mn.svg' alt='Mongolia' />`,
      }),
    },
    {
      value: 'ME',
      label: 'Montenegro',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/me.svg' alt='Montenegro' />`,
      }),
    },
    {
      value: 'MS',
      label: 'Montserrat',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ms.svg' alt='Montserrat' />`,
      }),
    },
    {
      value: 'MA',
      label: 'Morocco',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ma.svg' alt='Morocco' />`,
      }),
    },
    {
      value: 'MZ',
      label: 'Mozambique',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mz.svg' alt='Mozambique' />`,
      }),
    },
    {
      value: 'MM',
      label: 'Myanmar',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mm.svg' alt='Myanmar' />`,
      }),
    },
    {
      value: 'NA',
      label: 'Namibia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/na.svg' alt='Namibia' />`,
      }),
    },
    {
      value: 'NR',
      label: 'Nauru',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/nr.svg' alt='Nauru' />`,
      }),
    },
    {
      value: 'NP',
      label: 'Nepal',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/np.svg' alt='Nepal' />`,
      }),
    },
    {
      value: 'NL',
      label: 'Netherlands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/nl.svg' alt='Netherlands' />`,
      }),
    },
    {
      value: 'NC',
      label: 'New Caledonia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/nc.svg' alt='New Caledonia' />`,
      }),
    },
    {
      value: 'NZ',
      label: 'New Zealand',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/nz.svg' alt='New Zealand' />`,
      }),
    },
    {
      value: 'NI',
      label: 'Nicaragua',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ni.svg' alt='Nicaragua' />`,
      }),
    },
    {
      value: 'NE',
      label: 'Niger',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ne.svg' alt='Niger' />`,
      }),
    },
    {
      value: 'NG',
      label: 'Nigeria',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ng.svg' alt='Nigeria' />`,
      }),
    },
    {
      value: 'NU',
      label: 'Niue',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/nu.svg' alt='Niue' />`,
      }),
    },
    {
      value: 'NF',
      label: 'Norfolk Island',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/nf.svg' alt='Norfolk Island' />`,
      }),
    },
    {
      value: 'KP',
      label: 'North Korea',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/kp.svg' alt='North Korea' />`,
      }),
    },
    {
      value: 'MK',
      label: 'North Macedonia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mk.svg' alt='North Macedonia' />`,
      }),
    },
    {
      value: 'GB-NIR',
      label: 'Northern Ireland',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gb.svg' alt='Northern Ireland' />`,
      }),
    },
    {
      value: 'MP',
      label: 'Northern Mariana Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mp.svg' alt='Northern Mariana Islands' />`,
      }),
    },
    {
      value: 'NO',
      label: 'Norway',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/no.svg' alt='Norway' />`,
      }),
    },
    {
      value: 'OM',
      label: 'Oman',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/om.svg' alt='Oman' />`,
      }),
    },
    {
      value: 'PK',
      label: 'Pakistan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pk.svg' alt='Pakistan' />`,
      }),
    },
    {
      value: 'PW',
      label: 'Palau',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pw.svg' alt='Palau' />`,
      }),
    },
    {
      value: 'PA',
      label: 'Panama',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pa.svg' alt='Panama' />`,
      }),
    },
    {
      value: 'PG',
      label: 'Papua New Guinea',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pg.svg' alt='Papua New Guinea' />`,
      }),
    },
    {
      value: 'PY',
      label: 'Paraguay',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/py.svg' alt='Paraguay' />`,
      }),
    },
    {
      value: 'PE',
      label: 'Peru',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pe.svg' alt='Peru' />`,
      }),
    },
    {
      value: 'PH',
      label: 'Philippines',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ph.svg' alt='Philippines' />`,
      }),
    },
    {
      value: 'PN',
      label: 'Pitcairn',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pn.svg' alt='Pitcairn' />`,
      }),
    },
    {
      value: 'PL',
      label: 'Poland',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pl.svg' alt='Poland' />`,
      }),
    },
    {
      value: 'PT',
      label: 'Portugal',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pt.svg' alt='Portugal' />`,
      }),
    },
    {
      value: 'PR',
      label: 'Puerto Rico',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pr.svg' alt='Puerto Rico' />`,
      }),
    },
    {
      value: 'QA',
      label: 'Qatar',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/qa.svg' alt='Qatar' />`,
      }),
    },
    {
      value: 'CG',
      label: 'Republic of the Congo',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/cg.svg' alt='Republic of the Congo' />`,
      }),
    },
    {
      value: 'RO',
      label: 'Romania',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ro.svg' alt='Romania' />`,
      }),
    },
    {
      value: 'RU',
      label: 'Russia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ru.svg' alt='Russia' />`,
      }),
    },
    {
      value: 'RW',
      label: 'Rwanda',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/rw.svg' alt='Rwanda' />`,
      }),
    },
    {
      value: 'RE',
      label: 'Réunion',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/re.svg' alt='Réunion' />`,
      }),
    },
    {
      value: 'BL',
      label: 'Saint Barthélemy',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/bl.svg' alt='Saint Barthélemy' />`,
      }),
    },
    {
      value: 'SH',
      label: 'Saint Helena, Ascension and Tristan da Cunha',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sh.svg' alt='Saint Helena, Ascension and Tristan da Cunha' />`,
      }),
    },
    {
      value: 'KN',
      label: 'Saint Kitts and Nevis',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/kn.svg' alt='Saint Kitts and Nevis' />`,
      }),
    },
    {
      value: 'LC',
      label: 'Saint Lucia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/lc.svg' alt='Saint Lucia' />`,
      }),
    },
    {
      value: 'MF',
      label: 'Saint Martin',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/mf.svg' alt='Saint Martin' />`,
      }),
    },
    {
      value: 'PM',
      label: 'Saint Pierre and Miquelon',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/pm.svg' alt='Saint Pierre and Miquelon' />`,
      }),
    },
    {
      value: 'VC',
      label: 'Saint Vincent and the Grenadines',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/vc.svg' alt='Saint Vincent and the Grenadines' />`,
      }),
    },
    {
      value: 'WS',
      label: 'Samoa',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ws.svg' alt='Samoa' />`,
      }),
    },
    {
      value: 'SM',
      label: 'San Marino',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sm.svg' alt='San Marino' />`,
      }),
    },
    {
      value: 'ST',
      label: 'Sao Tome and Principe',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/st.svg' alt='Sao Tome and Principe' />`,
      }),
    },
    {
      value: 'SA',
      label: 'Saudi Arabia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sa.svg' alt='Saudi Arabia' />`,
      }),
    },
    {
      value: 'GB-SCT',
      label: 'Scotland',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gb.svg' alt='Scotland' />`,
      }),
    },
    {
      value: 'SN',
      label: 'Senegal',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sn.svg' alt='Senegal' />`,
      }),
    },
    {
      value: 'RS',
      label: 'Serbia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/rs.svg' alt='Serbia' />`,
      }),
    },
    {
      value: 'SC',
      label: 'Seychelles',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sc.svg' alt='Seychelles' />`,
      }),
    },
    {
      value: 'SL',
      label: 'Sierra Leone',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sl.svg' alt='Sierra Leone' />`,
      }),
    },
    {
      value: 'SG',
      label: 'Singapore',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sg.svg' alt='Singapore' />`,
      }),
    },
    {
      value: 'SX',
      label: 'Sint Maarten',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sx.svg' alt='Sint Maarten' />`,
      }),
    },
    {
      value: 'SK',
      label: 'Slovakia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sk.svg' alt='Slovakia' />`,
      }),
    },
    {
      value: 'SI',
      label: 'Slovenia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/si.svg' alt='Slovenia' />`,
      }),
    },
    {
      value: 'SB',
      label: 'Solomon Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sb.svg' alt='Solomon Islands' />`,
      }),
    },
    {
      value: 'SO',
      label: 'Somalia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/so.svg' alt='Somalia' />`,
      }),
    },
    {
      value: 'ZA',
      label: 'South Africa',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/za.svg' alt='South Africa' />`,
      }),
    },
    {
      value: 'GS',
      label: 'South Georgia and the South Sandwich Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gs.svg' alt='South Georgia and the South Sandwich Islands' />`,
      }),
    },
    {
      value: 'KR',
      label: 'South Korea',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/kr.svg' alt='South Korea' />`,
      }),
    },
    {
      value: 'SS',
      label: 'South Sudan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ss.svg' alt='South Sudan' />`,
      }),
    },
    {
      value: 'ES',
      label: 'Spain',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/es.svg' alt='Spain' />`,
      }),
    },
    {
      value: 'LK',
      label: 'Sri Lanka',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/lk.svg' alt='Sri Lanka' />`,
      }),
    },
    {
      value: 'PS',
      label: 'State of Palestine',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ps.svg' alt='State of Palestine' />`,
      }),
    },
    {
      value: 'SD',
      label: 'Sudan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sd.svg' alt='Sudan' />`,
      }),
    },
    {
      value: 'SR',
      label: 'Suriname',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sr.svg' alt='Suriname' />`,
      }),
    },
    {
      value: 'SJ',
      label: 'Svalbard and Jan Mayen',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sj.svg' alt='Svalbard and Jan Mayen' />`,
      }),
    },
    {
      value: 'SZ',
      label: 'Swaziland',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sz.svg' alt='Swaziland' />`,
      }),
    },
    {
      value: 'SE',
      label: 'Sweden',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/se.svg' alt='Sweden' />`,
      }),
    },
    {
      value: 'CH',
      label: 'Switzerland',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ch.svg' alt='Switzerland' />`,
      }),
    },
    {
      value: 'SY',
      label: 'Syrian Arab Republic',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/sy.svg' alt='Syrian Arab Republic' />`,
      }),
    },
    {
      value: 'TW',
      label: 'Taiwan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tw.svg' alt='Taiwan' />`,
      }),
    },
    {
      value: 'TJ',
      label: 'Tajikistan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tj.svg' alt='Tajikistan' />`,
      }),
    },
    {
      value: 'TZ',
      label: 'Tanzania',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tz.svg' alt='Tanzania' />`,
      }),
    },
    {
      value: 'TH',
      label: 'Thailand',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/th.svg' alt='Thailand' />`,
      }),
    },
    {
      value: 'TL',
      label: 'Timor-Leste',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tl.svg' alt='Timor-Leste' />`,
      }),
    },
    {
      value: 'TG',
      label: 'Togo',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tg.svg' alt='Togo' />`,
      }),
    },
    {
      value: 'TK',
      label: 'Tokelau',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tk.svg' alt='Tokelau' />`,
      }),
    },
    {
      value: 'TO',
      label: 'Tonga',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/to.svg' alt='Tonga' />`,
      }),
    },
    {
      value: 'TT',
      label: 'Trinidad and Tobago',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tt.svg' alt='Trinidad and Tobago' />`,
      }),
    },
    {
      value: 'TN',
      label: 'Tunisia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tn.svg' alt='Tunisia' />`,
      }),
    },
    {
      value: 'TR',
      label: 'Turkey',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tr.svg' alt='Turkey' />`,
      }),
    },
    {
      value: 'TM',
      label: 'Turkmenistan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tm.svg' alt='Turkmenistan' />`,
      }),
    },
    {
      value: 'TC',
      label: 'Turks and Caicos Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tc.svg' alt='Turks and Caicos Islands' />`,
      }),
    },
    {
      value: 'TV',
      label: 'Tuvalu',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/tv.svg' alt='Tuvalu' />`,
      }),
    },
    {
      value: 'UG',
      label: 'Uganda',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ug.svg' alt='Uganda' />`,
      }),
    },
    {
      value: 'UA',
      label: 'Ukraine',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ua.svg' alt='Ukraine' />`,
      }),
    },
    {
      value: 'AE',
      label: 'United Arab Emirates',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ae.svg' alt='United Arab Emirates' />`,
      }),
    },
    {
      value: 'GB',
      label: 'United Kingdom',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gb.svg' alt='United Kingdom' />`,
      }),
    },
    {
      value: 'UM',
      label: 'United States Minor Outlying Islands',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/um.svg' alt='United States Minor Outlying Islands' />`,
      }),
    },
    {
      value: 'US',
      label: 'United States of America',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/us.svg' alt='United States of America' />`,
      }),
    },
    {
      value: 'UY',
      label: 'Uruguay',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/uy.svg' alt='Uruguay' />`,
      }),
    },
    {
      value: 'UZ',
      label: 'Uzbekistan',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/uz.svg' alt='Uzbekistan' />`,
      }),
    },
    {
      value: 'VU',
      label: 'Vanuatu',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/vu.svg' alt='Vanuatu' />`,
      }),
    },
    {
      value: 'VE',
      label: 'Venezuela (Bolivarian Republic of)',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ve.svg' alt='Venezuela (Bolivarian Republic of)' />`,
      }),
    },
    {
      value: 'VN',
      label: 'Vietnam',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/vn.svg' alt='Vietnam' />`,
      }),
    },
    {
      value: 'VG',
      label: 'Virgin Islands (British)',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/vg.svg' alt='Virgin Islands (British)' />`,
      }),
    },
    {
      value: 'VI',
      label: 'Virgin Islands (U.S.)',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/vi.svg' alt='Virgin Islands (U.S.)' />`,
      }),
    },
    {
      value: 'GB-WLS',
      label: 'Wales',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/gb.svg' alt='Wales' />`,
      }),
    },
    {
      value: 'WF',
      label: 'Wallis and Futuna',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/wf.svg' alt='Wallis and Futuna' />`,
      }),
    },
    {
      value: 'EH',
      label: 'Western Sahara',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/eh.svg' alt='Western Sahara' />`,
      }),
    },
    {
      value: 'YE',
      label: 'Yemen',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/ye.svg' alt='Yemen' />`,
      }),
    },
    {
      value: 'ZM',
      label: 'Zambia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/zm.svg' alt='Zambia' />`,
      }),
    },
    {
      value: 'ZW',
      label: 'Zimbabwe',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/zw.svg' alt='Zimbabwe' />`,
      }),
    },
  ];

  public ngAfterViewChecked(): void {
    if (!this.buttonInitialized) {
      this.addBlurEventToButton();
      this.addNameToInputSearch();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngClass']) {
      this.applyClassesToElement();
    }
  }

  private addBlurEventToButton(): void {
    const button = this._el.nativeElement.querySelector('button');
    if (button && !this.buttonInitialized) {
      this._renderer.listen(button, 'blur', (_) => {
        this.selectionBlur.emit(true);
      });
      this.buttonInitialized = true;
    }
  }

  private addNameToInputSearch(): void {
    const input = this._el.nativeElement.querySelector('input');
    if (input) {
      this._renderer.setAttribute(input, 'id', 'search-country-input');
    }
  }

  private applyClassesToElement(): void {
    const button = this._el.nativeElement.querySelector('button');
    if (button) {
      const currentClasses = button.getAttribute('class') || '';
      const newClasses = this.ngClass.split(' ');
      newClasses.forEach((className) => {
        if (currentClasses.indexOf(className) === -1) {
          this._renderer.addClass(button, className);
        }
      });
    }
  }

  onSelectionChange(event: Event) {
    const selectEl = event.target as HTMLSelectElement;

    this.selectionChange.emit({
      value: selectEl.value,
      label:
        this.countries.find((country) => country.value === selectEl.value)
          ?.label ?? '',
    });
  }
}
