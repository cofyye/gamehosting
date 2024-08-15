import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ISelectedGame } from '../../models/game.model';

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrl: './game-select.component.css',
})
export class GameSelectComponent implements AfterViewChecked {
  @Input() ngClass: string = '';
  @Output() selectionChange = new EventEmitter<ISelectedGame>();

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
    placeholder: 'Select game...',
    toggleTag: `<button type="button" aria-expanded="false"><span class="me-2" data-game-icon data-icon></span><span class="text-gray-800" data-game-title data-title></span></button>`,
    toggleClasses:
      'hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-4 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
    dropdownClasses:
      'mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300',
    optionClasses:
      'py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100',
    optionTemplate:
      '<div><div class="flex items-center"><div class="me-2" data-icon></div><div class="text-gray-800" data-title></div></div></div>',
    extraMarkup:
      '<div class="absolute top-1/2 end-3 -translate-y-1/2"><svg class="shrink-0 size-3.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg></div>',
  });
  public games = [
    {
      value: 'a2oa',
      label: 'ARMA 2: Operation Arrowhead',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/a2oa.png' alt='ARMA 2: Operation Arrowhead' />`,
      }),
    },
    {
      value: 'aaa',
      label: 'ARMA: Armed Assault',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/aaa.png' alt='ARMA: Armed Assault' />`,
      }),
    },
    {
      value: 'aapg',
      label: "America's Army: Proving Grounds",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/aapg.png' alt="America's Army: Proving Grounds" />`,
      }),
    },
    {
      value: 'abioticfactor',
      label: 'Abiotic Factor',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/abioticfactor.png' alt='Abiotic Factor' />`,
      }),
    },
    {
      value: 'actionsource',
      label: 'Action: Source',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/actionsource.png' alt='Action: Source' />`,
      }),
    },
    {
      value: 'acwa',
      label: 'ARMA: Cold War Assault',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/acwa.png' alt='ARMA: Cold War Assault' />`,
      }),
    },
    {
      value: 'ahl',
      label: 'Action Half-Life',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ahl.png' alt='Action Half-Life' />`,
      }),
    },
    {
      value: 'alienarena',
      label: 'Alien Arena',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/alienarena.png' alt='Alien Arena' />`,
      }),
    },
    {
      value: 'alienswarm',
      label: 'Alien Swarm',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/alienswarm.png' alt='Alien Swarm' />`,
      }),
    },
    {
      value: 'americasarmy',
      label: "America's Army",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/americasarmy.png' alt="America's Army" />`,
      }),
    },
    {
      value: 'americasarmy2',
      label: "America's Army 2",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/americasarmy2.png' alt="America's Army 2" />`,
      }),
    },
    {
      value: 'americasarmy3',
      label: "America's Army 3",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/americasarmy3.png' alt="America's Army 3" />`,
      }),
    },
    {
      value: 'aoc',
      label: 'Age of Chivalry',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/aoc.png' alt='Age of Chivalry' />`,
      }),
    },
    {
      value: 'aoe2',
      label: 'Age of Empires 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/aoe2.png' alt='Age of Empires 2' />`,
      }),
    },
    {
      value: 'aosc',
      label: 'Ace of Spades Classic',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/aosc.png' alt='Ace of Spades Classic' />`,
      }),
    },
    {
      value: 'arma2',
      label: 'ARMA 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/arma2.png' alt='ARMA 2' />`,
      }),
    },
    {
      value: 'arma3',
      label: 'ARMA 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/arma3.png' alt='ARMA 3' />`,
      }),
    },
    {
      value: 'armagetronadvanced',
      label: 'Armagetron Advanced',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/armagetronadvanced.png' alt='Armagetron Advanced' />`,
      }),
    },
    {
      value: 'armareforger',
      label: 'ARMA: Reforger',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/armareforger.png' alt='ARMA: Reforger' />`,
      }),
    },
    {
      value: 'armaresistance',
      label: 'ARMA: Resistance',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/armaresistance.png' alt='ARMA: Resistance' />`,
      }),
    },
    {
      value: 'asa',
      label: 'Ark: Survival Ascended',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/asa.png' alt='Ark: Survival Ascended' />`,
      }),
    },
    {
      value: 'ase',
      label: 'Ark: Survival Evolved',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ase.png' alt='Ark: Survival Evolved' />`,
      }),
    },
    {
      value: 'asr08',
      label: "Arca Sim Racing '08",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/asr08.png' alt="Arca Sim Racing '08" />`,
      }),
    },
    {
      value: 'assettocorsa',
      label: 'Assetto Corsa',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/assettocorsa.png' alt='Assetto Corsa' />`,
      }),
    },
    {
      value: 'atlas',
      label: 'Atlas',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/atlas.png' alt='Atlas' />`,
      }),
    },
    {
      value: 'avorion',
      label: 'Avorion',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/avorion.png' alt='Avorion' />`,
      }),
    },
    {
      value: 'avp2',
      label: 'Aliens versus Predator 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/avp2.png' alt='Aliens versus Predator 2' />`,
      }),
    },
    {
      value: 'avp2010',
      label: 'Aliens vs. Predator 2010',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/avp2010.png' alt='Aliens vs. Predator 2010' />`,
      }),
    },
    {
      value: 'baldursgate',
      label: "Baldur's Gate",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/baldursgate.png' alt="Baldur's Gate" />`,
      }),
    },
    {
      value: 'ballisticoverkill',
      label: 'Ballistic Overkill',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ballisticoverkill.png' alt='Ballistic Overkill' />`,
      }),
    },
    {
      value: 'barotrauma',
      label: 'Barotrauma',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/barotrauma.png' alt='Barotrauma' />`,
      }),
    },
    {
      value: 'bas',
      label: 'Build and Shoot',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/bas.png' alt='Build and Shoot' />`,
      }),
    },
    {
      value: 'basedefense',
      label: 'Base Defense',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/basedefense.png' alt='Base Defense' />`,
      }),
    },
    {
      value: 'battalion1944',
      label: 'Battalion 1944',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/battalion1944.png' alt='Battalion 1944' />`,
      }),
    },
    {
      value: 'battlefield1942',
      label: 'Battlefield 1942',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/battlefield1942.png' alt='Battlefield 1942' />`,
      }),
    },
    {
      value: 'battlefield2',
      label: 'Battlefield 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/battlefield2.png' alt='Battlefield 2' />`,
      }),
    },
    {
      value: 'battlefield2142',
      label: 'Battlefield 2142',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/battlefield2142.png' alt='Battlefield 2142' />`,
      }),
    },
    {
      value: 'battlefield3',
      label: 'Battlefield 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/battlefield3.png' alt='Battlefield 3' />`,
      }),
    },
    {
      value: 'battlefield4',
      label: 'Battlefield 4',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/battlefield4.png' alt='Battlefield 4' />`,
      }),
    },
    {
      value: 'battlefieldhardline',
      label: 'Battlefield Hardline',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/battlefieldhardline.png' alt='Battlefield Hardline' />`,
      }),
    },
    {
      value: 'battlefieldvietnam',
      label: 'Battlefield Vietnam',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/battlefieldvietnam.png' alt='Battlefield Vietnam' />`,
      }),
    },
    {
      value: 'bbc2',
      label: 'Battlefield: Bad Company 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/bbc2.png' alt='Battlefield: Bad Company 2' />`,
      }),
    },
    {
      value: 'beammp',
      label: 'BeamMP (2021)',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/beammp.png' alt='BeamMP (2021)' />`,
      }),
    },
    {
      value: 'blackmesa',
      label: 'Black Mesa',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/blackmesa.png' alt='Black Mesa' />`,
      }),
    },
    {
      value: 'bladesymphony',
      label: 'Blade Symphony',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/bladesymphony.png' alt='Blade Symphony' />`,
      }),
    },
    {
      value: 'brainbread',
      label: 'BrainBread',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/brainbread.png' alt='BrainBread' />`,
      }),
    },
    {
      value: 'brainbread2',
      label: 'BrainBread 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/brainbread2.png' alt='BrainBread 2' />`,
      }),
    },
    {
      value: 'breach',
      label: 'Breach',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/breach.png' alt='Breach' />`,
      }),
    },
    {
      value: 'breed',
      label: 'Breed',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/breed.png' alt='Breed' />`,
      }),
    },
    {
      value: 'brink',
      label: 'Brink',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/brink.png' alt='Brink' />`,
      }),
    },
    {
      value: 'c2d',
      label: 'CS2D',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/c2d.png' alt='CS2D' />`,
      }),
    },
    {
      value: 'c3db',
      label: 'Commandos 3: Destination Berlin',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/c3db.png' alt='Commandos 3: Destination Berlin' />`,
      }),
    },
    {
      value: 'cacr',
      label: 'Command and Conquer: Renegade',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/cacr.png' alt='Command and Conquer: Renegade' />`,
      }),
    },
    {
      value: 'chaser',
      label: 'Chaser',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/chaser.png' alt='Chaser' />`,
      }),
    },
    {
      value: 'chrome',
      label: 'Chrome',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/chrome.png' alt='Chrome' />`,
      }),
    },
    {
      value: 'cmw',
      label: 'Chivalry: Medieval Warfare',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/cmw.png' alt='Chivalry: Medieval Warfare' />`,
      }),
    },
    {
      value: 'cod',
      label: 'Call of Duty',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/cod.png' alt='Call of Duty' />`,
      }),
    },
    {
      value: 'cod2',
      label: 'Call of Duty 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/cod2.png' alt='Call of Duty 2' />`,
      }),
    },
    {
      value: 'cod3',
      label: 'Call of Duty 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/cod3.png' alt='Call of Duty 3' />`,
      }),
    },
    {
      value: 'cod4mw',
      label: 'Call of Duty 4: Modern Warfare',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/cod4mw.png' alt='Call of Duty 4: Modern Warfare' />`,
      }),
    },
    {
      value: 'codbo3',
      label: 'Call of Duty: Black Ops 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/codbo3.png' alt='Call of Duty: Black Ops 3' />`,
      }),
    },
    {
      value: 'codenamecure',
      label: 'Codename CURE',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/codenamecure.png' alt='Codename CURE' />`,
      }),
    },
    {
      value: 'codenameeagle',
      label: 'Codename Eagle',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/codenameeagle.png' alt='Codename Eagle' />`,
      }),
    },
    {
      value: 'codmw2',
      label: 'Call of Duty: Modern Warfare 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/codmw2.png' alt='Call of Duty: Modern Warfare 2' />`,
      }),
    },
    {
      value: 'codmw3',
      label: 'Call of Duty: Modern Warfare 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/codmw3.png' alt='Call of Duty: Modern Warfare 3' />`,
      }),
    },
    {
      value: 'coduo',
      label: 'Call of Duty: United Offensive',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/coduo.png' alt='Call of Duty: United Offensive' />`,
      }),
    },
    {
      value: 'codwaw',
      label: 'Call of Duty: World at War',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/codwaw.png' alt='Call of Duty: World at War' />`,
      }),
    },
    {
      value: 'coj',
      label: 'Call of Juarez',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/coj.png' alt='Call of Juarez' />`,
      }),
    },
    {
      value: 'colonysurvival',
      label: 'Colony Survival',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/colonysurvival.png' alt='Colony Survival' />`,
      }),
    },
    {
      value: 'conanexiles',
      label: 'Conan Exiles',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/conanexiles.png' alt='Conan Exiles' />`,
      }),
    },
    {
      value: 'contagion',
      label: 'Contagion',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/contagion.png' alt='Contagion' />`,
      }),
    },
    {
      value: 'contractjack',
      label: 'Contract J.A.C.K.',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/contractjack.png' alt='Contract J.A.C.K.' />`,
      }),
    },
    {
      value: 'corekeeper',
      label: 'Core Keeper',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/corekeeper.png' alt='Core Keeper' />`,
      }),
    },
    {
      value: 'counterstrike15',
      label: 'Counter-Strike 1.5',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/counterstrike15.png' alt='Counter-Strike 1.5' />`,
      }),
    },
    {
      value: 'counterstrike16',
      label: 'Counter-Strike 1.6',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/counterstrike16.png' alt='Counter-Strike 1.6' />`,
      }),
    },
    {
      value: 'counterstrike2',
      label: 'Counter-Strike 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/counterstrike2.png' alt='Counter-Strike 2' />`,
      }),
    },
    {
      value: 'crce',
      label: 'Cross Racing Championship Extreme',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/crce.png' alt='Cross Racing Championship Extreme' />`,
      }),
    },
    {
      value: 'creativerse',
      label: 'Creativerse',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/creativerse.png' alt='Creativerse' />`,
      }),
    },
    {
      value: 'crysis',
      label: 'Crysis',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/crysis.png' alt='Crysis' />`,
      }),
    },
    {
      value: 'crysis2',
      label: 'Crysis 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/crysis2.png' alt='Crysis 2' />`,
      }),
    },
    {
      value: 'crysiswars',
      label: 'Crysis Wars',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/crysiswars.png' alt='Crysis Wars' />`,
      }),
    },
    {
      value: 'cscz',
      label: 'Counter-Strike: Condition Zero',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/cscz.png' alt='Counter-Strike: Condition Zero' />`,
      }),
    },
    {
      value: 'csgo',
      label: 'Counter-Strike: Global Offensive',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/csgo.png' alt='Counter-Strike: Global Offensive' />`,
      }),
    },
    {
      value: 'css',
      label: 'Counter-Strike: Source',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/css.png' alt='Counter-Strike: Source' />`,
      }),
    },
    {
      value: 'dab',
      label: 'Double Action: Boogaloo',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dab.png' alt='Double Action: Boogaloo' />`,
      }),
    },
    {
      value: 'daikatana',
      label: 'Daikatana',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/daikatana.png' alt='Daikatana' />`,
      }),
    },
    {
      value: 'dal',
      label: 'Dark and Light',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dal.png' alt='Dark and Light' />`,
      }),
    },
    {
      value: 'dayofdragons',
      label: 'Day of Dragons',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dayofdragons.png' alt='Day of Dragons' />`,
      }),
    },
    {
      value: 'dayz',
      label: 'DayZ',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dayz.png' alt='DayZ' />`,
      }),
    },
    {
      value: 'dayzmod',
      label: 'DayZ Mod',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dayzmod.png' alt='DayZ Mod' />`,
      }),
    },
    {
      value: 'ddd',
      label: 'Dino D-Day',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ddd.png' alt='Dino D-Day' />`,
      }),
    },
    {
      value: 'ddpt',
      label: 'Deadly Dozen: Pacific Theater',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ddpt.png' alt='Deadly Dozen: Pacific Theater' />`,
      }),
    },
    {
      value: 'deathmatchclassic',
      label: 'Deathmatch Classic',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/deathmatchclassic.png' alt='Deathmatch Classic' />`,
      }),
    },
    {
      value: 'deerhunter2005',
      label: 'Deer Hunter 2005',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/deerhunter2005.png' alt='Deer Hunter 2005' />`,
      }),
    },
    {
      value: 'descent3',
      label: 'Descent 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/descent3.png' alt='Descent 3' />`,
      }),
    },
    {
      value: 'deusex',
      label: 'Deus Ex',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/deusex.png' alt='Deus Ex' />`,
      }),
    },
    {
      value: 'devastation',
      label: 'Devastation',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/devastation.png' alt='Devastation' />`,
      }),
    },
    {
      value: 'dhe4445',
      label: "Darkest Hour: Europe '44-'45",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dhe4445.png' alt="Darkest Hour: Europe '44-'45" />`,
      }),
    },
    {
      value: 'discord',
      label: 'Discord',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/discord.png' alt='Discord' />`,
      }),
    },
    {
      value: 'dmomam',
      label: 'Dark Messiah of Might and Magic',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dmomam.png' alt='Dark Messiah of Might and Magic' />`,
      }),
    },
    {
      value: 'dnf2001',
      label: 'Duke Nukem Forever 2001',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dnf2001.png' alt='Duke Nukem Forever 2001' />`,
      }),
    },
    {
      value: 'dod',
      label: 'Day of Defeat',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dod.png' alt='Day of Defeat' />`,
      }),
    },
    {
      value: 'dods',
      label: 'Day of Defeat: Source',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dods.png' alt='Day of Defeat: Source' />`,
      }),
    },
    {
      value: 'doi',
      label: 'Day of Infamy',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/doi.png' alt='Day of Infamy' />`,
      }),
    },
    {
      value: 'doom3',
      label: 'Doom 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/doom3.png' alt='Doom 3' />`,
      }),
    },
    {
      value: 'dootf',
      label: 'Drakan: Order of the Flame',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dootf.png' alt='Drakan: Order of the Flame' />`,
      }),
    },
    {
      value: 'dota2',
      label: 'Dota 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dota2.png' alt='Dota 2' />`,
      }),
    },
    {
      value: 'dow',
      label: 'Days of War',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dow.png' alt='Days of War' />`,
      }),
    },
    {
      value: 'dst',
      label: "Don't Starve Together",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dst.png' alt="Don't Starve Together" />`,
      }),
    },
    {
      value: 'dtr2',
      label: 'Dirt Track Racing 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dtr2.png' alt='Dirt Track Racing 2' />`,
      }),
    },
    {
      value: 'dystopia',
      label: 'Dystopia',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/dystopia.png' alt='Dystopia' />`,
      }),
    },
    {
      value: 'eco',
      label: 'Eco',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/eco.png' alt='Eco' />`,
      }),
    },
    {
      value: 'egs',
      label: 'Empyrion - Galactic Survival',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/egs.png' alt='Empyrion - Galactic Survival' />`,
      }),
    },
    {
      value: 'eldewrito',
      label: 'Halo Online - ElDewrito',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/eldewrito.png' alt='Halo Online - ElDewrito' />`,
      }),
    },
    {
      value: 'empiresmod',
      label: 'Empires Mod',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/empiresmod.png' alt='Empires Mod' />`,
      }),
    },
    {
      value: 'enshrouded',
      label: 'enshrouded',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/enshrouded.png' alt='enshrouded' />`,
      }),
    },
    {
      value: 'etqw',
      label: 'Enemy Territory: Quake Wars',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/etqw.png' alt='Enemy Territory: Quake Wars' />`,
      }),
    },
    {
      value: 'ets2',
      label: 'Euro Truck Simulator 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ets2.png' alt='Euro Truck Simulator 2' />`,
      }),
    },
    {
      value: 'f1c9902',
      label: "F1 Challenge '99-'02",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/f1c9902.png' alt="F1 Challenge '99-'02" />`,
      }),
    },
    {
      value: 'factorio',
      label: 'Factorio',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/factorio.png' alt='Factorio' />`,
      }),
    },
    {
      value: 'farcry',
      label: 'Far Cry',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/farcry.png' alt='Far Cry' />`,
      }),
    },
    {
      value: 'farcry2',
      label: 'Far Cry 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/farcry2.png' alt='Far Cry 2' />`,
      }),
    },
    {
      value: 'farmingsimulator19',
      label: 'Farming Simulator 19',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/farmingsimulator19.png' alt='Farming Simulator 19' />`,
      }),
    },
    {
      value: 'farmingsimulator22',
      label: 'Farming Simulator 22',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/farmingsimulator22.png' alt='Farming Simulator 22' />`,
      }),
    },
    {
      value: 'fear',
      label: 'F.E.A.R.',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/fear.png' alt='F.E.A.R.' />`,
      }),
    },
    {
      value: 'ffow',
      label: 'Frontlines: Fuel of War',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ffow.png' alt='Frontlines: Fuel of War' />`,
      }),
    },
    {
      value: 'fof',
      label: 'Fistful of Frags',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/fof.png' alt='Fistful of Frags' />`,
      }),
    },
    {
      value: 'formulaone2002',
      label: 'Formula One 2002',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/formulaone2002.png' alt='Formula One 2002' />`,
      }),
    },
    {
      value: 'fortressforever',
      label: 'Fortress Forever',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/fortressforever.png' alt='Fortress Forever' />`,
      }),
    },
    {
      value: 'foundry',
      label: 'FOUNDRY',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/foundry.png' alt='FOUNDRY' />`,
      }),
    },
    {
      value: 'garrysmod',
      label: "Garry's Mod",
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/garrysmod.png' alt="Garry's Mod" />`,
      }),
    },
    {
      value: 'gck',
      label: 'Giants: Citizen Kabuto',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gck.png' alt='Giants: Citizen Kabuto' />`,
      }),
    },
    {
      value: 'geneshift',
      label: 'Geneshift',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/geneshift.png' alt='Geneshift' />`,
      }),
    },
    {
      value: 'globaloperations',
      label: 'Global Operations',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/globaloperations.png' alt='Global Operations' />`,
      }),
    },
    {
      value: 'goldeneyesource',
      label: 'GoldenEye: Source',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/goldeneyesource.png' alt='GoldenEye: Source' />`,
      }),
    },
    {
      value: 'groundbreach',
      label: 'Ground Breach',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/groundbreach.png' alt='Ground Breach' />`,
      }),
    },
    {
      value: 'gta5f',
      label: 'Grand Theft Auto V - FiveM',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gta5f.png' alt='Grand Theft Auto V - FiveM' />`,
      }),
    },
    {
      value: 'gta5r',
      label: 'Grand Theft Auto V - RAGE MP',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gta5r.png' alt='Grand Theft Auto V - RAGE MP' />`,
      }),
    },
    {
      value: 'gta5am',
      label: 'Grand Theft Auto V - alt:V Multiplayer',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gta5am.png' alt='Grand Theft Auto V - alt:V Multiplayer' />`,
      }),
    },
    {
      value: 'gtasam',
      label: 'Grand Theft Auto: San Andreas Multiplayer',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gtasam.png' alt='Grand Theft Auto: San Andreas Multiplayer' />`,
      }),
    },
    {
      value: 'gtasamta',
      label: 'Grand Theft Auto: San Andreas - Multi Theft Auto',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gtasamta.png' alt='Grand Theft Auto: San Andreas - Multi Theft Auto' />`,
      }),
    },
    {
      value: 'gtasao',
      label: 'Grand Theft Auto: San Andreas OpenMP',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gtasao.png' alt='Grand Theft Auto: San Andreas OpenMP' />`,
      }),
    },
    {
      value: 'gtavcmta',
      label: 'Grand Theft Auto: Vice City - Multi Theft Auto',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gtavcmta.png' alt='Grand Theft Auto: Vice City - Multi Theft Auto' />`,
      }),
    },
    {
      value: 'gunmanchronicles',
      label: 'Gunman Chronicles',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gunmanchronicles.png' alt='Gunman Chronicles' />`,
      }),
    },
    {
      value: 'gus',
      label: 'Gore: Ultimate Soldier',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/gus.png' alt='Gore: Ultimate Soldier' />`,
      }),
    },
    {
      value: 'halo',
      label: 'Halo',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/halo.png' alt='Halo' />`,
      }),
    },
    {
      value: 'halo2',
      label: 'Halo 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/halo2.png' alt='Halo 2' />`,
      }),
    },
    {
      value: 'heretic2',
      label: 'Heretic II',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/heretic2.png' alt='Heretic II' />`,
      }),
    },
    {
      value: 'hexen2',
      label: 'Hexen II',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/hexen2.png' alt='Hexen II' />`,
      }),
    },
    {
      value: 'hiddendangerous2',
      label: 'Hidden & Dangerous 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/hiddendangerous2.png' alt='Hidden & Dangerous 2' />`,
      }),
    },
    {
      value: 'hl2d',
      label: 'Half-Life 2: Deathmatch',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/hl2d.png' alt='Half-Life 2: Deathmatch' />`,
      }),
    },
    {
      value: 'hld',
      label: 'Half-Life Deathmatch',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/hld.png' alt='Half-Life Deathmatch' />`,
      }),
    },
    {
      value: 'hlds',
      label: 'Half-Life Deathmatch: Source',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/hlds.png' alt='Half-Life Deathmatch: Source' />`,
      }),
    },
    {
      value: 'hll',
      label: 'Hell Let Loose',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/hll.png' alt='Hell Let Loose' />`,
      }),
    },
    {
      value: 'hlof',
      label: 'Half-Life: Opposing Force',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/hlof.png' alt='Half-Life: Opposing Force' />`,
      }),
    },
    {
      value: 'homefront',
      label: 'Homefront',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/homefront.png' alt='Homefront' />`,
      }),
    },
    {
      value: 'homeworld2',
      label: 'Homeworld 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/homeworld2.png' alt='Homeworld 2' />`,
      }),
    },
    {
      value: 'hurtworld',
      label: 'Hurtworld',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/hurtworld.png' alt='Hurtworld' />`,
      }),
    },
    {
      value: 'i2cs',
      label: 'IGI 2: Covert Strike',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/i2cs.png' alt='IGI 2: Covert Strike' />`,
      }),
    },
    {
      value: 'i2s',
      label: 'IL-2 Sturmovik',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/i2s.png' alt='IL-2 Sturmovik' />`,
      }),
    },
    {
      value: 'imic',
      label: 'Insurgency: Modern Infantry Combat',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/imic.png' alt='Insurgency: Modern Infantry Combat' />`,
      }),
    },
    {
      value: 'insurgency',
      label: 'Insurgency',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/insurgency.png' alt='Insurgency' />`,
      }),
    },
    {
      value: 'insurgencysandstorm',
      label: 'Insurgency: Sandstorm',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/insurgencysandstorm.png' alt='Insurgency: Sandstorm' />`,
      }),
    },
    {
      value: 'ironstorm',
      label: 'Iron Storm',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ironstorm.png' alt='Iron Storm' />`,
      }),
    },
    {
      value: 'jb0n',
      label: 'James Bond 007: Nightfire',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/jb0n.png' alt='James Bond 007: Nightfire' />`,
      }),
    },
    {
      value: 'jc2m',
      label: 'Just Cause 2 - Multiplayer',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/jc2m.png' alt='Just Cause 2 - Multiplayer' />`,
      }),
    },
    {
      value: 'jc3m',
      label: 'Just Cause 3 - Multiplayer',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/jc3m.png' alt='Just Cause 3 - Multiplayer' />`,
      }),
    },
    {
      value: 'killingfloor',
      label: 'Killing Floor',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/killingfloor.png' alt='Killing Floor' />`,
      }),
    },
    {
      value: 'killingfloor2',
      label: 'Killing Floor 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/killingfloor2.png' alt='Killing Floor 2' />`,
      }),
    },
    {
      value: 'kloc',
      label: 'Kingpin: Life of Crime',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/kloc.png' alt='Kingpin: Life of Crime' />`,
      }),
    },
    {
      value: 'kpctnc',
      label: 'Kiss: Psycho Circus: The Nightmare Child',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/kpctnc.png' alt='Kiss: Psycho Circus: The Nightmare Child' />`,
      }),
    },
    {
      value: 'kreedzclimbing',
      label: 'Kreedz Climbing',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/kreedzclimbing.png' alt='Kreedz Climbing' />`,
      }),
    },
    {
      value: 'kspd',
      label: 'Kerbal Space Program - DMP',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/kspd.png' alt='Kerbal Space Program - DMP' />`,
      }),
    },
    {
      value: 'l4d',
      label: 'Left 4 Dead',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/l4d.png' alt='Left 4 Dead' />`,
      }),
    },
    {
      value: 'l4d2',
      label: 'Left 4 Dead 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/l4d2.png' alt='Left 4 Dead 2' />`,
      }),
    },
    {
      value: 'm2m',
      label: 'Mafia II - Multiplayer',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/m2m.png' alt='Mafia II - Multiplayer' />`,
      }),
    },
    {
      value: 'm2o',
      label: 'Mafia II - Online',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/m2o.png' alt='Mafia II - Online' />`,
      }),
    },
    {
      value: 'mbe',
      label: 'Minecraft: Bedrock Edition',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mbe.png' alt='Minecraft: Bedrock Edition' />`,
      }),
    },
    {
      value: 'medievalengineers',
      label: 'Medieval Engineers',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/medievalengineers.png' alt='Medieval Engineers' />`,
      }),
    },
    {
      value: 'mgm',
      label: 'Mumble - GT Murmur',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mgm.png' alt='Mumble - GT Murmur' />`,
      }),
    },
    {
      value: 'minecraft',
      label: 'Minecraft',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/minecraft.png' alt='Minecraft' />`,
      }),
    },
    {
      value: 'minetest',
      label: 'Minetest',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/minetest.png' alt='Minetest' />`,
      }),
    },
    {
      value: 'mnc',
      label: 'Monday Night Combat',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mnc.png' alt='Monday Night Combat' />`,
      }),
    },
    {
      value: 'moe',
      label: 'Myth of Empires',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/moe.png' alt='Myth of Empires' />`,
      }),
    },
    {
      value: 'moh',
      label: 'Medal of Honor',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/moh.png' alt='Medal of Honor' />`,
      }),
    },
    {
      value: 'moha',
      label: 'Medal of Honor: Airborne',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/moha.png' alt='Medal of Honor: Airborne' />`,
      }),
    },
    {
      value: 'mohaa',
      label: 'Medal of Honor: Allied Assault',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mohaa.png' alt='Medal of Honor: Allied Assault' />`,
      }),
    },
    {
      value: 'mohaab',
      label: 'Medal of Honor: Allied Assault Breakthrough',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mohaab.png' alt='Medal of Honor: Allied Assault Breakthrough' />`,
      }),
    },
    {
      value: 'mohaas',
      label: 'Medal of Honor: Allied Assault Spearhead',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mohaas.png' alt='Medal of Honor: Allied Assault Spearhead' />`,
      }),
    },
    {
      value: 'mohpa',
      label: 'Medal of Honor: Pacific Assault',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mohpa.png' alt='Medal of Honor: Pacific Assault' />`,
      }),
    },
    {
      value: 'mohw',
      label: 'Medal of Honor: Warfighter',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mohw.png' alt='Medal of Honor: Warfighter' />`,
      }),
    },
    {
      value: 'mordhau',
      label: 'Mordhau',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mordhau.png' alt='Mordhau' />`,
      }),
    },
    {
      value: 'mumble',
      label: 'Mumble',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mumble.png' alt='Mumble' />`,
      }),
    },
    {
      value: 'mutantfactions',
      label: 'Mutant Factions',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/mutantfactions.png' alt='Mutant Factions' />`,
      }),
    },
    {
      value: 'nab',
      label: 'Nerf Arena Blast',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/nab.png' alt='Nerf Arena Blast' />`,
      }),
    },
    {
      value: 'nascarthunder2004',
      label: 'NASCAR Thunder 2004',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/nascarthunder2004.png' alt='NASCAR Thunder 2004' />`,
      }),
    },
    {
      value: 'naturalselection',
      label: 'Natural Selection',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/naturalselection.png' alt='Natural Selection' />`,
      }),
    },
    {
      value: 'naturalselection2',
      label: 'Natural Selection 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/naturalselection2.png' alt='Natural Selection 2' />`,
      }),
    },
    {
      value: 'netpanzer',
      label: 'netPanzer',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/netpanzer.png' alt='netPanzer' />`,
      }),
    },
    {
      value: 'neverwinternights',
      label: 'Neverwinter Nights',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/neverwinternights.png' alt='Neverwinter Nights' />`,
      }),
    },
    {
      value: 'neverwinternights2',
      label: 'Neverwinter Nights 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/neverwinternights2.png' alt='Neverwinter Nights 2' />`,
      }),
    },
    {
      value: 'nexuiz',
      label: 'Nexuiz',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/nexuiz.png' alt='Nexuiz' />`,
      }),
    },
    {
      value: 'nfshp2',
      label: 'Need for Speed: Hot Pursuit 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/nfshp2.png' alt='Need for Speed: Hot Pursuit 2' />`,
      }),
    },
    {
      value: 'nitrofamily',
      label: 'Nitro Family',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/nitrofamily.png' alt='Nitro Family' />`,
      }),
    },
    {
      value: 'nla',
      label: 'Nova-Life: Amboise',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/nla.png' alt='Nova-Life: Amboise' />`,
      }),
    },
    {
      value: 'nmrih',
      label: 'No More Room in Hell',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/nmrih.png' alt='No More Room in Hell' />`,
      }),
    },
    {
      value: 'nolf2asihw',
      label: 'No One Lives Forever 2: A Spy in H.A.R.M.s Way',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/nolf2asihw.png' alt='No One Lives Forever 2: A Spy in H.A.R.M.s Way' />`,
      }),
    },
    {
      value: 'nucleardawn',
      label: 'Nuclear Dawn',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/nucleardawn.png' alt='Nuclear Dawn' />`,
      }),
    },
    {
      value: 'ofcwc',
      label: 'Operation Flashpoint: Cold War Crisis',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ofcwc.png' alt='Operation Flashpoint: Cold War Crisis' />`,
      }),
    },
    {
      value: 'ofr',
      label: 'Operation Flashpoint: Resistance',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ofr.png' alt='Operation Flashpoint: Resistance' />`,
      }),
    },
    {
      value: 'ohd',
      label: 'Operation: Harsh Doorstop',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ohd.png' alt='Operation: Harsh Doorstop' />`,
      }),
    },
    {
      value: 'onset',
      label: 'Onset',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/onset.png' alt='Onset' />`,
      }),
    },
    {
      value: 'openarena',
      label: 'OpenArena',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/openarena.png' alt='OpenArena' />`,
      }),
    },
    {
      value: 'openttd',
      label: 'OpenTTD',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/openttd.png' alt='OpenTTD' />`,
      }),
    },
    {
      value: 'painkiller',
      label: 'Painkiller',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/painkiller.png' alt='Painkiller' />`,
      }),
    },
    {
      value: 'palworld',
      label: 'Palworld',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/palworld.png' alt='Palworld' />`,
      }),
    },
    {
      value: 'pce',
      label: 'Primal Carnage: Extinction',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/pce.png' alt='Primal Carnage: Extinction' />`,
      }),
    },
    {
      value: 'pixark',
      label: 'PixARK',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/pixark.png' alt='PixARK' />`,
      }),
    },
    {
      value: 'postal2',
      label: 'Postal 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/postal2.png' alt='Postal 2' />`,
      }),
    },
    {
      value: 'postscriptum',
      label: 'Post Scriptum',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/postscriptum.png' alt='Post Scriptum' />`,
      }),
    },
    {
      value: 'prb2',
      label: 'Project Reality: Battlefield 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/prb2.png' alt='Project Reality: Battlefield 2' />`,
      }),
    },
    {
      value: 'prey',
      label: 'Prey',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/prey.png' alt='Prey' />`,
      }),
    },
    {
      value: 'projectcars',
      label: 'Project Cars',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/projectcars.png' alt='Project Cars' />`,
      }),
    },
    {
      value: 'projectcars2',
      label: 'Project Cars 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/projectcars2.png' alt='Project Cars 2' />`,
      }),
    },
    {
      value: 'projectzomboid',
      label: 'Project Zomboid',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/projectzomboid.png' alt='Project Zomboid' />`,
      }),
    },
    {
      value: 'pvak2',
      label: 'Pirates, Vikings, and Knights II',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/pvak2.png' alt='Pirates, Vikings, and Knights II' />`,
      }),
    },
    {
      value: 'q3a',
      label: 'Quake 3: Arena',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/q3a.png' alt='Quake 3: Arena' />`,
      }),
    },
    {
      value: 'quake',
      label: 'Quake',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/quake.png' alt='Quake' />`,
      }),
    },
    {
      value: 'quake2',
      label: 'Quake 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/quake2.png' alt='Quake 2' />`,
      }),
    },
    {
      value: 'quake4',
      label: 'Quake 4',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/quake4.png' alt='Quake 4' />`,
      }),
    },
    {
      value: 'quakelive',
      label: 'Quake Live',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/quakelive.png' alt='Quake Live' />`,
      }),
    },
    {
      value: 'rainbowsix',
      label: 'Rainbow Six',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rainbowsix.png' alt='Rainbow Six' />`,
      }),
    },
    {
      value: 'rallisportchallenge',
      label: 'RalliSport Challenge',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rallisportchallenge.png' alt='RalliSport Challenge' />`,
      }),
    },
    {
      value: 'rallymasters',
      label: 'Rally Masters',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rallymasters.png' alt='Rally Masters' />`,
      }),
    },
    {
      value: 'rdkf',
      label: 'Rag Doll Kung Fu',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rdkf.png' alt='Rag Doll Kung Fu' />`,
      }),
    },
    {
      value: 'rdr2r',
      label: 'Red Dead Redemption 2 - RedM',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rdr2r.png' alt='Red Dead Redemption 2 - RedM' />`,
      }),
    },
    {
      value: 'redline',
      label: 'Redline',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/redline.png' alt='Redline' />`,
      }),
    },
    {
      value: 'redorchestra',
      label: 'Red Orchestra',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/redorchestra.png' alt='Red Orchestra' />`,
      }),
    },
    {
      value: 'redorchestra2',
      label: 'Red Orchestra 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/redorchestra2.png' alt='Red Orchestra 2' />`,
      }),
    },
    {
      value: 'rfactor',
      label: 'rFactor',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rfactor.png' alt='rFactor' />`,
      }),
    },
    {
      value: 'ricochet',
      label: 'Ricochet',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ricochet.png' alt='Ricochet' />`,
      }),
    },
    {
      value: 'risingworld',
      label: 'Rising World',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/risingworld.png' alt='Rising World' />`,
      }),
    },
    {
      value: 'ron',
      label: 'Rise of Nations',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ron.png' alt='Rise of Nations' />`,
      }),
    },
    {
      value: 'roo4145',
      label: 'Red Orchestra: Ostfront 41-45',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/roo4145.png' alt='Red Orchestra: Ostfront 41-45' />`,
      }),
    },
    {
      value: 'ror2',
      label: 'Risk of Rain 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ror2.png' alt='Risk of Rain 2' />`,
      }),
    },
    {
      value: 'rs2rs',
      label: 'Rainbow Six 2: Rogue Spear',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rs2rs.png' alt='Rainbow Six 2: Rogue Spear' />`,
      }),
    },
    {
      value: 'rs2v',
      label: 'Rising Storm 2: Vietnam',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rs2v.png' alt='Rising Storm 2: Vietnam' />`,
      }),
    },
    {
      value: 'rs3rs',
      label: 'Rainbow Six 3: Raven Shield',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rs3rs.png' alt='Rainbow Six 3: Raven Shield' />`,
      }),
    },
    {
      value: 'rtcw',
      label: 'Return to Castle Wolfenstein',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rtcw.png' alt='Return to Castle Wolfenstein' />`,
      }),
    },
    {
      value: 'rune',
      label: 'Rune',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rune.png' alt='Rune' />`,
      }),
    },
    {
      value: 'rust',
      label: 'Rust',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/rust.png' alt='Rust' />`,
      }),
    },
    {
      value: 's2ats',
      label: 'Savage 2: A Tortured Soul',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/s2ats.png' alt='Savage 2: A Tortured Soul' />`,
      }),
    },
    {
      value: 'sdtd',
      label: '7 Days to Die',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/sdtd.png' alt='7 Days to Die' />`,
      }),
    },
    {
      value: 'serioussam',
      label: 'Serious Sam',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/serioussam.png' alt='Serious Sam' />`,
      }),
    },
    {
      value: 'serioussam2',
      label: 'Serious Sam 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/serioussam2.png' alt='Serious Sam 2' />`,
      }),
    },
    {
      value: 'shatteredhorizon',
      label: 'Shattered Horizon',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/shatteredhorizon.png' alt='Shattered Horizon' />`,
      }),
    },
    {
      value: 'shogo',
      label: 'Shogo',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/shogo.png' alt='Shogo' />`,
      }),
    },
    {
      value: 'shootmania',
      label: 'Shootmania',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/shootmania.png' alt='Shootmania' />`,
      }),
    },
    {
      value: 'sin',
      label: 'SiN',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/sin.png' alt='SiN' />`,
      }),
    },
    {
      value: 'sinepisodes',
      label: 'SiN Episodes',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/sinepisodes.png' alt='SiN Episodes' />`,
      }),
    },
    {
      value: 'sof',
      label: 'Soldier of Fortune',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/sof.png' alt='Soldier of Fortune' />`,
      }),
    },
    {
      value: 'sof2',
      label: 'Soldier of Fortune 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/sof2.png' alt='Soldier of Fortune 2' />`,
      }),
    },
    {
      value: 'soldat',
      label: 'Soldat',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/soldat.png' alt='Soldat' />`,
      }),
    },
    {
      value: 'sotf',
      label: 'Sons Of The Forest',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/sotf.png' alt='Sons Of The Forest' />`,
      }),
    },
    {
      value: 'soulmask',
      label: 'Soulmask',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/soulmask.png' alt='Soulmask' />`,
      }),
    },
    {
      value: 'spaceengineers',
      label: 'Space Engineers',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/spaceengineers.png' alt='Space Engineers' />`,
      }),
    },
    {
      value: 'squad',
      label: 'Squad',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/squad.png' alt='Squad' />`,
      }),
    },
    {
      value: 'stalker',
      label: 'S.T.A.L.K.E.R.',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/stalker.png' alt='S.T.A.L.K.E.R.' />`,
      }),
    },
    {
      value: 'starbound',
      label: 'Starbound',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/starbound.png' alt='Starbound' />`,
      }),
    },
    {
      value: 'starmade',
      label: 'StarMade',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/starmade.png' alt='StarMade' />`,
      }),
    },
    {
      value: 'starsiege',
      label: 'Starsiege',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/starsiege.png' alt='Starsiege' />`,
      }),
    },
    {
      value: 'stbc',
      label: 'Star Trek: Bridge Commander',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/stbc.png' alt='Star Trek: Bridge Commander' />`,
      }),
    },
    {
      value: 'stn',
      label: 'Survive the Nights',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/stn.png' alt='Survive the Nights' />`,
      }),
    },
    {
      value: 'stvef',
      label: 'Star Trek: Voyager - Elite Force',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/stvef.png' alt='Star Trek: Voyager - Elite Force' />`,
      }),
    },
    {
      value: 'stvef2',
      label: 'Star Trek: Voyager - Elite Force 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/stvef2.png' alt='Star Trek: Voyager - Elite Force 2' />`,
      }),
    },
    {
      value: 'suicidesurvival',
      label: 'Suicide Survival',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/suicidesurvival.png' alt='Suicide Survival' />`,
      }),
    },
    {
      value: 'svencoop',
      label: 'Sven Coop',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/svencoop.png' alt='Sven Coop' />`,
      }),
    },
    {
      value: 'swat4',
      label: 'SWAT 4',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/swat4.png' alt='SWAT 4' />`,
      }),
    },
    {
      value: 'swb',
      label: 'Star Wars: Battlefront',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/swb.png' alt='Star Wars: Battlefront' />`,
      }),
    },
    {
      value: 'swb2',
      label: 'Star Wars: Battlefront 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/swb2.png' alt='Star Wars: Battlefront 2' />`,
      }),
    },
    {
      value: 'swjk2jo',
      label: 'Star Wars Jedi Knight II: Jedi Outcast',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/swjk2jo.png' alt='Star Wars Jedi Knight II: Jedi Outcast' />`,
      }),
    },
    {
      value: 'swjkja',
      label: 'Star Wars Jedi Knight: Jedi Academy',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/swjkja.png' alt='Star Wars Jedi Knight: Jedi Academy' />`,
      }),
    },
    {
      value: 'swrc',
      label: 'Star Wars: Republic Commando',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/swrc.png' alt='Star Wars: Republic Commando' />`,
      }),
    },
    {
      value: 'synergy',
      label: 'Synergy',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/synergy.png' alt='Synergy' />`,
      }),
    },
    {
      value: 't1s',
      label: 'Tribes 1: Starsiege',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/t1s.png' alt='Tribes 1: Starsiege' />`,
      }),
    },
    {
      value: 'tacticalops',
      label: 'Tactical Ops',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/tacticalops.png' alt='Tactical Ops' />`,
      }),
    },
    {
      value: 'tcgraw',
      label: 'Tom Clancy Ghost Recon Advanced Warfighter',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/tcgraw.png' alt='Tom Clancy Ghost Recon Advanced Warfighter' />`,
      }),
    },
    {
      value: 'tcgraw2',
      label: 'Tom Clancy Ghost Recon Advanced Warfighter 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/tcgraw2.png' alt='Tom Clancy Ghost Recon Advanced Warfighter 2' />`,
      }),
    },
    {
      value: 'teamfactor',
      label: 'Team Factor',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/teamfactor.png' alt='Team Factor' />`,
      }),
    },
    {
      value: 'teamfortress2',
      label: 'Team Fortress 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/teamfortress2.png' alt='Team Fortress 2' />`,
      }),
    },
    {
      value: 'teamspeak2',
      label: 'Teamspeak 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/teamspeak2.png' alt='Teamspeak 2' />`,
      }),
    },
    {
      value: 'teamspeak3',
      label: 'Teamspeak 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/teamspeak3.png' alt='Teamspeak 3' />`,
      }),
    },
    {
      value: 'terminus',
      label: 'Terminus',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/terminus.png' alt='Terminus' />`,
      }),
    },
    {
      value: 'terrariatshock',
      label: 'Terraria - TShock',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/terrariatshock.png' alt='Terraria - TShock' />`,
      }),
    },
    {
      value: 'tfc',
      label: 'Team Fortress Classic',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/tfc.png' alt='Team Fortress Classic' />`,
      }),
    },
    {
      value: 'theforest',
      label: 'The Forest',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/theforest.png' alt='The Forest' />`,
      }),
    },
    {
      value: 'thefront',
      label: 'The Front',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/thefront.png' alt='The Front' />`,
      }),
    },
    {
      value: 'thehidden',
      label: 'The Hidden',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/thehidden.png' alt='The Hidden' />`,
      }),
    },
    {
      value: 'theisle',
      label: 'The Isle',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/theisle.png' alt='The Isle' />`,
      }),
    },
    {
      value: 'theship',
      label: 'The Ship',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/theship.png' alt='The Ship' />`,
      }),
    },
    {
      value: 'thespecialists',
      label: 'The Specialists',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/thespecialists.png' alt='The Specialists' />`,
      }),
    },
    {
      value: 'thps3',
      label: 'Tony Hawk Pro Skater 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/thps3.png' alt='Tony Hawk Pro Skater 3' />`,
      }),
    },
    {
      value: 'thps4',
      label: 'Tony Hawk Pro Skater 4',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/thps4.png' alt='Tony Hawk Pro Skater 4' />`,
      }),
    },
    {
      value: 'thu2',
      label: 'Tony Hawk Underground 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/thu2.png' alt='Tony Hawk Underground 2' />`,
      }),
    },
    {
      value: 'tie',
      label: 'The Isle Evrima',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/tie.png' alt='The Isle Evrima' />`,
      }),
    },
    {
      value: 'toh',
      label: 'Take On Helicopters',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/toh.png' alt='Take On Helicopters' />`,
      }),
    },
    {
      value: 'tonolf',
      label: 'The Operative: No One Lives Forever',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/tonolf.png' alt='The Operative: No One Lives Forever' />`,
      }),
    },
    {
      value: 'towerunite',
      label: 'Tower Unite',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/towerunite.png' alt='Tower Unite' />`,
      }),
    },
    {
      value: 'trackmania2',
      label: 'Trackmania 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/trackmania2.png' alt='Trackmania 2' />`,
      }),
    },
    {
      value: 'trackmaniaforever',
      label: 'Trackmania Forever',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/trackmaniaforever.png' alt='Trackmania Forever' />`,
      }),
    },
    {
      value: 'tremulous',
      label: 'Tremulous',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/tremulous.png' alt='Tremulous' />`,
      }),
    },
    {
      value: 'tribesvengeance',
      label: 'Tribes: Vengeance',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/tribesvengeance.png' alt='Tribes: Vengeance' />`,
      }),
    },
    {
      value: 'tron20',
      label: 'Tron 2.0',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/tron20.png' alt='Tron 2.0' />`,
      }),
    },
    {
      value: 'turok2',
      label: 'Turok 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/turok2.png' alt='Turok 2' />`,
      }),
    },
    {
      value: 'u2tax',
      label: 'Unreal 2: The Awakening - XMP',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/u2tax.png' alt='Unreal 2: The Awakening - XMP' />`,
      }),
    },
    {
      value: 'universalcombat',
      label: 'Universal Combat',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/universalcombat.png' alt='Universal Combat' />`,
      }),
    },
    {
      value: 'unreal',
      label: 'Unreal',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/unreal.png' alt='Unreal' />`,
      }),
    },
    {
      value: 'unrealtournament',
      label: 'Unreal Tournament',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/unrealtournament.png' alt='Unreal Tournament' />`,
      }),
    },
    {
      value: 'unrealtournament2003',
      label: 'Unreal Tournament 2003',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/unrealtournament2003.png' alt='Unreal Tournament 2003' />`,
      }),
    },
    {
      value: 'unrealtournament2004',
      label: 'Unreal Tournament 2004',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/unrealtournament2004.png' alt='Unreal Tournament 2004' />`,
      }),
    },
    {
      value: 'unrealtournament3',
      label: 'Unreal Tournament 3',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/unrealtournament3.png' alt='Unreal Tournament 3' />`,
      }),
    },
    {
      value: 'unturned',
      label: 'unturned',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/unturned.png' alt='unturned' />`,
      }),
    },
    {
      value: 'urbanterror',
      label: 'Urban Terror',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/urbanterror.png' alt='Urban Terror' />`,
      }),
    },
    {
      value: 'v8sc',
      label: 'V8 Supercar Challenge',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/v8sc.png' alt='V8 Supercar Challenge' />`,
      }),
    },
    {
      value: 'valheim',
      label: 'Valheim',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/valheim.png' alt='Valheim' />`,
      }),
    },
    {
      value: 'vampireslayer',
      label: 'Vampire Slayer',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/vampireslayer.png' alt='Vampire Slayer' />`,
      }),
    },
    {
      value: 'vcm',
      label: 'Vice City Multiplayer',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/vcm.png' alt='Vice City Multiplayer' />`,
      }),
    },
    {
      value: 'ventrilo',
      label: 'Ventrilo',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/ventrilo.png' alt='Ventrilo' />`,
      }),
    },
    {
      value: 'vietcong',
      label: 'Vietcong',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/vietcong.png' alt='Vietcong' />`,
      }),
    },
    {
      value: 'vietcong2',
      label: 'Vietcong 2',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/vietcong2.png' alt='Vietcong 2' />`,
      }),
    },
    {
      value: 'vrising',
      label: 'V Rising',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/vrising.png' alt='V Rising' />`,
      }),
    },
    {
      value: 'warfork',
      label: 'Warfork',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/warfork.png' alt='Warfork' />`,
      }),
    },
    {
      value: 'warsow',
      label: 'Warsow',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/warsow.png' alt='Warsow' />`,
      }),
    },
    {
      value: 'wet',
      label: 'Wolfenstein: Enemy Territory',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/wet.png' alt='Wolfenstein: Enemy Territory' />`,
      }),
    },
    {
      value: 'wolfenstein',
      label: 'Wolfenstein',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/wolfenstein.png' alt='Wolfenstein' />`,
      }),
    },
    {
      value: 'wot',
      label: 'Wheel of Time',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/wot.png' alt='Wheel of Time' />`,
      }),
    },
    {
      value: 'wurmunlimited',
      label: 'Wurm Unlimited',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/wurmunlimited.png' alt='Wurm Unlimited' />`,
      }),
    },
    {
      value: 'xonotic',
      label: 'Xonotic',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/xonotic.png' alt='Xonotic' />`,
      }),
    },
    {
      value: 'xpandrally',
      label: 'Xpand Rally',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/xpandrally.png' alt='Xpand Rally' />`,
      }),
    },
    {
      value: 'zombiemaster',
      label: 'Zombie Master',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/zombiemaster.png' alt='Zombie Master' />`,
      }),
    },
    {
      value: 'zps',
      label: 'Zombie Panic: Source',
      optionConfig: JSON.stringify({
        icon: `<img class='inline-block size-5' src='${environment.API_URL}/assets/games/zps.png' alt='Zombie Panic: Source' />`,
      }),
    },
  ];

  public ngAfterViewChecked(): void {
    if (!this.buttonInitialized) {
      this.addNameToInputSearch();
    }
  }

  private addNameToInputSearch(): void {
    const input = this._el.nativeElement.querySelector('input');
    if (input) {
      this._renderer.setAttribute(input, 'id', 'search-game-input');
    }
  }

  onSelectionChange(event: Event) {
    const selectEl = event.target as HTMLSelectElement;

    this.selectionChange.emit({
      value: selectEl.value,
      label:
        this.games.find((game) => game.value === selectEl.value)?.label ?? '',
    });
  }
}
