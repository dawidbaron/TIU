import {PipeTransform,Pipe} from '@angular/core'
import { User } from './service/data.service';

@Pipe({
    name:'nameFilter'
})
export class SearchNamePipe implements PipeTransform{
    transform(users:User[],searchName: string):User[]{
        if(!users|| !searchName) return users
        return users.filter(users=>users.firstName.toLowerCase().indexOf(searchName.toLowerCase())!==-1)
    }
}