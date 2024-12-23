import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class IsPositivePipe implements PipeTransform{
    transform(value: any){
        if(value <= 0){
            throw new BadRequestException('Value must be positive.');
        }
        return value;
    }
}