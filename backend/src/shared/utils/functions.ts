import { HttpException, HttpStatus } from '@nestjs/common';

import {
  IDataSendResponse,
  ISendResponse,
} from '../interfaces/response.interface';
import {
  ICustomStartupVariable,
  IRequiredStartupVariable,
} from '../interfaces/startup.interface';
import { IProvidedMachinesForPlan } from '../interfaces/plan.interface';
import { HostBy } from '../enums/game.enum';
import { UNSIGNED_INTEGER_REGEX, UUID_V4_REGEX } from './regex.constants';

const handleHttpException = (
  err: unknown,
  success: boolean,
  message: string,
): void => {
  if (err instanceof HttpException) {
    throw err;
  }

  throwHttpException(success, message, HttpStatus.INTERNAL_SERVER_ERROR);
};

const throwHttpException = (
  success: boolean,
  message: string,
  httpStatus: HttpStatus,
) => {
  throw new HttpException(
    {
      success,
      message,
    } as ISendResponse,
    httpStatus,
  );
};

const throwHttpExceptionData = <T>(
  success: boolean,
  data: T,
  message: string,
  httpStatus: HttpStatus,
) => {
  throw new HttpException(
    {
      success,
      data,
      message,
    } as IDataSendResponse<T>,
    httpStatus,
  );
};

function generateCode(length: number = 10): string {
  const characters: string =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength: number = characters.length;
  let randomString: string = '';

  for (let i: number = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * charactersLength),
    );
  }

  return randomString;
}

function generatePinCode(): string {
  let pinCode = '';
  for (let i = 0; i < 5; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    pinCode += randomDigit;
  }
  return pinCode;
}

function generateRandomString(length: number = 15): string {
  const array = new Uint16Array(length / 2);
  crypto.getRandomValues(array);

  return Array.from(array, (dec) => dec.toString(16).padStart(2, '0')).join('');
}

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function checkListOfSupportedGames(gameTag: string): boolean {
  const listOfSupportedGames: string[] = [
    'a2oa',
    'aaa',
    'aapg',
    'abioticfactor',
    'actionsource',
    'acwa',
    'ahl',
    'alienarena',
    'alienswarm',
    'americasarmy',
    'americasarmy2',
    'americasarmy3',
    'aoc',
    'aoe2',
    'aosc',
    'arma2',
    'arma3',
    'armagetronadvanced',
    'armareforger',
    'armaresistance',
    'asa',
    'ase',
    'asr08',
    'assettocorsa',
    'atlas',
    'avorion',
    'avp2',
    'avp2010',
    'baldursgate',
    'ballisticoverkill',
    'barotrauma',
    'bas',
    'basedefense',
    'battalion1944',
    'battlefield1942',
    'battlefield2',
    'battlefield2142',
    'battlefield3',
    'battlefield4',
    'battlefieldhardline',
    'battlefieldvietnam',
    'bbc2',
    'beammp',
    'blackmesa',
    'bladesymphony',
    'brainbread',
    'brainbread2',
    'breach',
    'breed',
    'brink',
    'c2d',
    'c3db',
    'cacr',
    'chaser',
    'chrome',
    'cmw',
    'cod',
    'cod2',
    'cod3',
    'cod4mw',
    'codbo3',
    'codenamecure',
    'codenameeagle',
    'codmw2',
    'codmw3',
    'coduo',
    'codwaw',
    'coj',
    'colonysurvival',
    'conanexiles',
    'contagion',
    'contractjack',
    'corekeeper',
    'counterstrike15',
    'counterstrike16',
    'counterstrike2',
    'crce',
    'creativerse',
    'crysis',
    'crysis2',
    'crysiswars',
    'cscz',
    'csgo',
    'css',
    'dab',
    'daikatana',
    'dal',
    'dayofdragons',
    'dayz',
    'dayzmod',
    'ddd',
    'ddpt',
    'deathmatchclassic',
    'deerhunter2005',
    'descent3',
    'deusex',
    'devastation',
    'dhe4445',
    'discord',
    'dmomam',
    'dnf2001',
    'dod',
    'dods',
    'doi',
    'doom3',
    'dootf',
    'dota2',
    'dow',
    'dst',
    'dtr2',
    'dystopia',
    'eco',
    'egs',
    'eldewrito',
    'empiresmod',
    'enshrouded',
    'etqw',
    'ets2',
    'f1c9902',
    'factorio',
    'farcry',
    'farcry2',
    'farmingsimulator19',
    'farmingsimulator22',
    'fear',
    'ffow',
    'fof',
    'formulaone2002',
    'fortressforever',
    'foundry',
    'garrysmod',
    'gck',
    'geneshift',
    'globaloperations',
    'goldeneyesource',
    'groundbreach',
    'gta5f',
    'gta5r',
    'gta5am',
    'gtasam',
    'gtasamta',
    'gtasao',
    'gtavcmta',
    'gunmanchronicles',
    'gus',
    'halo',
    'halo2',
    'heretic2',
    'hexen2',
    'hiddendangerous2',
    'hl2d',
    'hld',
    'hlds',
    'hll',
    'hlof',
    'homefront',
    'homeworld2',
    'hurtworld',
    'i2cs',
    'i2s',
    'imic',
    'insurgency',
    'insurgencysandstorm',
    'ironstorm',
    'jb0n',
    'jc2m',
    'jc3m',
    'killingfloor',
    'killingfloor2',
    'kloc',
    'kpctnc',
    'kreedzclimbing',
    'kspd',
    'l4d',
    'l4d2',
    'm2m',
    'm2o',
    'mbe',
    'medievalengineers',
    'mgm',
    'minecraft',
    'minetest',
    'mnc',
    'moe',
    'moh',
    'moha',
    'mohaa',
    'mohaab',
    'mohaas',
    'mohpa',
    'mohw',
    'mordhau',
    'mumble',
    'mutantfactions',
    'nab',
    'nascarthunder2004',
    'naturalselection',
    'naturalselection2',
    'netpanzer',
    'neverwinternights',
    'neverwinternights2',
    'nexuiz',
    'nfshp2',
    'nitrofamily',
    'nla',
    'nmrih',
    'nolf2asihw',
    'nucleardawn',
    'ofcwc',
    'ofr',
    'ohd',
    'onset',
    'openarena',
    'openttd',
    'painkiller',
    'palworld',
    'pce',
    'pixark',
    'postal2',
    'postscriptum',
    'prb2',
    'prey',
    'projectcars',
    'projectcars2',
    'projectzomboid',
    'pvak2',
    'q3a',
    'quake',
    'quake2',
    'quake4',
    'quakelive',
    'rainbowsix',
    'rallisportchallenge',
    'rallymasters',
    'rdkf',
    'rdr2r',
    'redline',
    'redorchestra',
    'redorchestra2',
    'rfactor',
    'ricochet',
    'risingworld',
    'ron',
    'roo4145',
    'ror2',
    'rs2rs',
    'rs2v',
    'rs3rs',
    'rtcw',
    'rune',
    'rust',
    's2ats',
    'sdtd',
    'serioussam',
    'serioussam2',
    'shatteredhorizon',
    'shogo',
    'shootmania',
    'sin',
    'sinepisodes',
    'sof',
    'sof2',
    'soldat',
    'sotf',
    'soulmask',
    'spaceengineers',
    'squad',
    'stalker',
    'starbound',
    'starmade',
    'starsiege',
    'stbc',
    'stn',
    'stvef',
    'stvef2',
    'suicidesurvival',
    'svencoop',
    'swat4',
    'swb',
    'swb2',
    'swjk2jo',
    'swjkja',
    'swrc',
    'synergy',
    't1s',
    'tacticalops',
    'tcgraw',
    'tcgraw2',
    'teamfactor',
    'teamfortress2',
    'teamspeak2',
    'teamspeak3',
    'terminus',
    'terrariatshock',
    'tfc',
    'theforest',
    'thefront',
    'thehidden',
    'theisle',
    'theship',
    'thespecialists',
    'thps3',
    'thps4',
    'thu2',
    'tie',
    'toh',
    'tonolf',
    'towerunite',
    'trackmania2',
    'trackmaniaforever',
    'tremulous',
    'tribesvengeance',
    'tron20',
    'turok2',
    'u2tax',
    'universalcombat',
    'unreal',
    'unrealtournament',
    'unrealtournament2003',
    'unrealtournament2004',
    'unrealtournament3',
    'unturned',
    'urbanterror',
    'v8sc',
    'valheim',
    'vampireslayer',
    'vcm',
    'ventrilo',
    'vietcong',
    'vietcong2',
    'vrising',
    'warfork',
    'warsow',
    'wet',
    'wolfenstein',
    'wot',
    'wurmunlimited',
    'xonotic',
    'xpandrally',
    'zombiemaster',
    'zps',
  ];

  if (!listOfSupportedGames.includes(gameTag)) {
    return false;
  } else {
    return true;
  }
}

function validateProvidedGamesForMachine(games: string): string[] {
  try {
    const _games = JSON.parse(games) as string[];

    if (!Array.isArray(_games)) {
      functions.throwHttpException(
        false,
        'The games are not provided in a valid JSON format.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (_games.length < 1) {
      functions.throwHttpException(
        false,
        'You must select at least one game.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return _games;
  } catch (err) {
    functions.handleHttpException(
      err,
      false,
      'The games are not provided in a valid JSON format.',
    );
  }
}

function validateProvidedMachinesForPlan(
  machines: string,
): IProvidedMachinesForPlan[] {
  try {
    const _machines = JSON.parse(machines) as IProvidedMachinesForPlan[];

    if (_machines.length < 1) {
      functions.throwHttpException(
        false,
        'You must select at least one machine.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!Array.isArray(_machines)) {
      functions.throwHttpException(
        false,
        'The machines are not provided in a valid JSON format.',
        HttpStatus.BAD_REQUEST,
      );
    }

    _machines.forEach((item) => {
      if (!item?.id) {
        functions.throwHttpException(
          false,
          'The machine ID field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!UUID_V4_REGEX.test(item?.id)) {
        functions.throwHttpException(
          false,
          'The machine ID is not valid.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!item?.maxServers) {
        functions.throwHttpException(
          false,
          'The maximum servers field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (item?.maxServers < 1) {
        functions.throwHttpException(
          false,
          'The minimum value for the maximum servers field must be 1.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (item?.maxServers > 65535) {
        functions.throwHttpException(
          false,
          'The maximum value for the maximum servers field must be 65535.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!UNSIGNED_INTEGER_REGEX.test(item?.maxServers.toString())) {
        functions.throwHttpException(
          false,
          'The maximum servers field must be a number.',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    return _machines;
  } catch (err) {
    functions.handleHttpException(
      err,
      false,
      'The machines are not provided in a valid JSON format.',
    );
  }
}

function validateProvidedCustomStartupVariables(
  startupVariables: string,
): ICustomStartupVariable[] {
  try {
    const _customStartupVariables = JSON.parse(
      startupVariables,
    ) as ICustomStartupVariable[];

    if (_customStartupVariables.length < 1) {
      functions.throwHttpException(
        false,
        'You must select at least one startup variable.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (_customStartupVariables.length > 10) {
      functions.throwHttpException(
        false,
        'You can select up to 10 startup variables.',
        HttpStatus.BAD_REQUEST,
      );
    }

    _customStartupVariables.forEach((item) => {
      if (!item?.name) {
        functions.throwHttpException(
          false,
          'The name field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (item?.name?.length > 40) {
        functions.throwHttpException(
          false,
          'The name field must be at most 40 characters long.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!item?.value) {
        functions.throwHttpException(
          false,
          'The value field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (item?.value?.length > 40) {
        functions.throwHttpException(
          false,
          'The value field must be at most 40 characters long.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!item?.default_value) {
        functions.throwHttpException(
          false,
          'The default value field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (item?.default_value?.length > 40) {
        functions.throwHttpException(
          false,
          'The default value field must be at most 40 characters long.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!('docker_env' in item)) {
        functions.throwHttpException(
          false,
          'The docker env field must be present.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (item?.docker_env?.length > 40) {
        functions.throwHttpException(
          false,
          'The docker env field must be at most 40 characters long.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!item?.show) {
        functions.throwHttpException(
          false,
          'The show field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!item?.editable) {
        functions.throwHttpException(
          false,
          'The editable field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    return _customStartupVariables;
  } catch (err) {
    functions.handleHttpException(
      err,
      false,
      'The startup variables are not provided in a valid JSON format.',
    );
  }
}

function replaceCustomStartupVariables(
  command: string,
  variables: ICustomStartupVariable[],
): string {
  variables.forEach((variable) => {
    const regex = new RegExp(`\\$\\{${variable.docker_env}\\}`, 'g');
    command = command.replace(regex, variable.value);
  });

  return command;
}

function replaceRequiredStartupVariables(
  command: string,
  variables: IRequiredStartupVariable,
): string {
  return command
    .replace(/\${IP}/g, variables.IP)
    .replace(/\${PORT}/g, variables.PORT)
    .replace(/\${SLOT}/g, variables.SLOT)
    .replace(/\${RAM}/g, variables.RAM)
    .replace(/\${FTP_USER}/g, variables.FTP_USER);
}

function getCompleteReplacedDockerCommand(
  command: string,
  requiredVariables: IRequiredStartupVariable,
  customVariables: string,
): string {
  let dockerCommand = functions.replaceRequiredStartupVariables(
    command,
    requiredVariables,
  );

  dockerCommand = functions.replaceCustomStartupVariables(
    dockerCommand,
    functions.validateProvidedCustomStartupVariables(customVariables),
  );

  return dockerCommand;
}

function checkRequiredStartupCommandParameters(
  hostBy: HostBy,
  command: string,
): void {
  if (!command.includes('${PORT}')) {
    functions.throwHttpException(
      false,
      `The PORT must be specified in the startup command.`,
      HttpStatus.BAD_REQUEST,
    );
  }

  if (!command.includes('${FTP_USER}')) {
    functions.throwHttpException(
      false,
      `The FTP_USER must be specified in the startup command.`,
      HttpStatus.BAD_REQUEST,
    );
  }

  if (hostBy === HostBy.SLOT) {
    if (command.includes('${RAM}')) {
      functions.throwHttpException(
        false,
        `It is not allowed to use the RAM option in the Docker command because your type of game is slot-based.`,
        HttpStatus.CONFLICT,
      );
    }
    if (command.includes('${CPU_COUNT}')) {
      functions.throwHttpException(
        false,
        `It is not allowed to use the CPU_COUNT option in the Docker command because your type of game is slot-based.`,
        HttpStatus.CONFLICT,
      );
    }
  }
}

function checkParametersForGameHostType(
  hostBy: HostBy,
  ram: number | string,
  cpuCount: number | string,
  slot: number | string,
): void {
  if (hostBy === HostBy.SLOT) {
    if (!slot) {
      functions.throwHttpException(
        false,
        `The slot field cannot be empty.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  } else {
    if (!ram || !cpuCount) {
      functions.throwHttpException(
        false,
        `The RAM or CPU count field cannot be empty.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

export const functions = {
  handleHttpException,
  throwHttpException,
  throwHttpExceptionData,
  generateCode,
  generatePinCode,
  generateRandomString,
  formatBytes,
  checkListOfSupportedGames,
  validateProvidedGamesForMachine,
  validateProvidedMachinesForPlan,
  validateProvidedCustomStartupVariables,
  replaceCustomStartupVariables,
  replaceRequiredStartupVariables,
  getCompleteReplacedDockerCommand,
  checkRequiredStartupCommandParameters,
  checkParametersForGameHostType,
};
