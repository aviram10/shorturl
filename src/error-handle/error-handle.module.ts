import { Module } from '@nestjs/common';

@Module({})
export class ErrorHandleModule {
  prismaErrorHandle(error) {
    switch(error.code){
        //uniqe
        case 'P2002':
             
    }
  }
}
