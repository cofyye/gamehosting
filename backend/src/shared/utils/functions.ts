import { HttpException, HttpStatus } from '@nestjs/common';

import {
  IDataSendResponse,
  ISendResponse,
} from '../interfaces/response.interface';
import { IStartupVariable } from '../interfaces/startup.interface';

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
  const listOfSupportedGames: string[] = ['counterstrike16', 'counterstrike2'];

  if (!listOfSupportedGames.includes(gameTag)) {
    return false;
  } else {
    return true;
  }
}

function validateProvidedGamesForMachine(games: string): string[] {
  try {
    const _games = JSON.parse(games) as string[];

    if (_games.length < 1) {
      functions.throwHttpException(
        false,
        'You must select at least one game.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (_games.length > 10) {
      functions.throwHttpException(
        false,
        'You can select up to 10 games.',
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

function validateProvidedStartupVariables(
  startupVariables: string,
): IStartupVariable[] {
  try {
    const _startupVariables = JSON.parse(
      startupVariables,
    ) as IStartupVariable[];

    if (_startupVariables.length < 1) {
      functions.throwHttpException(
        false,
        'You must select at least one startup variable.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (_startupVariables.length > 10) {
      functions.throwHttpException(
        false,
        'You can select up to 10 startup variables.',
        HttpStatus.BAD_REQUEST,
      );
    }

    _startupVariables.forEach((item) => {
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

    return _startupVariables;
  } catch (err) {
    functions.handleHttpException(
      err,
      false,
      'The startup variables are not provided in a valid JSON format.',
    );
  }
}

export const functions = {
  handleHttpException,
  throwHttpException,
  throwHttpExceptionData,
  generateCode,
  generateRandomString,
  formatBytes,
  checkListOfSupportedGames,
  validateProvidedGamesForMachine,
  validateProvidedStartupVariables,
};
