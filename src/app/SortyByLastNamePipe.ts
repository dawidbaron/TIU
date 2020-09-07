import { Pipe, PipeTransform } from '@angular/core';
import { User } from './service/data.service';
@Pipe({
  name: 'lastname'
})
export class SortByLastNamePipe implements PipeTransform {

    transform(users: User[]): User[] {
        return users.sort((a, b) => a.lastName.localeCompare(b.lastName));
      }
}