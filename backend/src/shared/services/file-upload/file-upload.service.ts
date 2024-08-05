import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadedFile } from 'express-fileupload';

import * as path from 'path';
import * as fs from 'fs-extra';

import { functions } from 'src/shared/utils/functions';

@Injectable()
export class FileUploadService {
  private readonly fullPath = path.join(__dirname, '../../../../uploads');
  private readonly dockerPath = path.join(
    __dirname,
    '../../../../dockers-custom',
  );

  constructor(private readonly _configService: ConfigService) {}

  private checkImageSize(image: UploadedFile): void {
    try {
      if (
        image.size > this._configService.get<number>('IMAGE_MAX_UPLOAD_SIZE')
      ) {
        functions.throwHttpException(
          false,
          `The size of your image ${image.name} is ${functions.formatBytes(image.size)}, the maximum size is ${functions.formatBytes(this._configService.get<number>('IMAGE_MAX_UPLOAD_SIZE'))}.`,
          HttpStatus.PAYLOAD_TOO_LARGE,
        );
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while checking the image size.',
      );
    }
  }

  private checkImageExtension(image: UploadedFile): void {
    try {
      const extensions: Array<string> = this._configService
        .get<string>('IMAGE_EXTENSIONS')
        .split(', ');

      if (!extensions.includes(path.extname(image.name))) {
        functions.throwHttpException(
          false,
          `The image extension of ${image.name} is not supported.`,
          HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        );
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while checking the image extension.',
      );
    }
  }

  private checkImageInFolder(filename: string): void {
    try {
      if (fs.existsSync(`${this.fullPath}/${filename}`)) {
        functions.throwHttpException(
          false,
          `An image with the same name already exists on the server.`,
          HttpStatus.CONFLICT,
        );
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while checking for duplicate images on the server.',
      );
    }
  }

  private checkDockerInFolder(folder: string): void {
    try {
      if (fs.existsSync(`${this.dockerPath}/${folder}/Dockerfile`)) {
        functions.throwHttpException(
          false,
          `An docker with the same name already exists on the server.`,
          HttpStatus.CONFLICT,
        );
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while checking for duplicate dockers on the server.',
      );
    }
  }

  public async uploadImage(
    prefix: string = '',
    image: UploadedFile | UploadedFile[],
  ): Promise<string | null> {
    try {
      if (Array.isArray(image)) {
        functions.throwHttpException(
          false,
          'You can only upload one image at a time.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        this.checkImageExtension(image);
        this.checkImageSize(image);

        const filename =
          prefix +
          '_' +
          functions.generateRandomString() +
          path.extname(image.name);

        this.checkImageInFolder(filename);

        try {
          await image.mv(`${this.fullPath}/${filename}`);
        } catch (err: unknown) {
          functions.throwHttpException(
            false,
            `An error occurred while uploading ${image.name}.`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        return filename;
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while uploading the image.',
      );
    }
  }

  public async uploadDocker(
    dockerImage: string,
    docker: UploadedFile | UploadedFile[],
  ): Promise<void> {
    try {
      if (Array.isArray(docker)) {
        functions.throwHttpException(
          false,
          'You can only upload one docker file at a time.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (docker.name !== 'Dockerfile.zip') {
          functions.throwHttpException(
            false,
            'The file name must be Dockerfile.zip.',
            HttpStatus.BAD_REQUEST,
          );
        }

        this.checkDockerInFolder(dockerImage);

        try {
          if (!fs.existsSync(`${this.dockerPath}/${dockerImage}`)) {
            fs.mkdirSync(`${this.dockerPath}/${dockerImage}`);
          }
          await docker.mv(`${this.dockerPath}/${dockerImage}/${docker.name}`);
        } catch (err: unknown) {
          functions.throwHttpException(
            false,
            `An error occurred while uploading ${dockerImage}.`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while uploading the docker.',
      );
    }
  }

  public deleteFile(filename: string): void {
    try {
      fs.unlinkSync(`${this.fullPath}/${filename}`);
    } catch (err: unknown) {}
  }

  public deleteDocker(folder: string): void {
    try {
      fs.rmSync(`${this.dockerPath}/${folder}`, {
        recursive: true,
      });
    } catch (err: unknown) {}
  }
}
