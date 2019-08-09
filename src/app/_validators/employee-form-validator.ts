import { ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import { Position } from '../_models/position';
import { Room } from '../_models/room';

export const EmployeeFormValidator = 
    (roomField: string, salaryField: string, positionField: string): ValidatorFn => {
    return (control: FormGroup): ValidationErrors | null => {
        const room = control.get(roomField);
        const salary = control.get(salaryField);
        const position = control.get(positionField);

        const salaryValue: number = Number.parseInt(salary.value);
        const positionValue: Position = position.value;
        const roomValue: Room = room.value;

        if (room) {
            if(roomValue.capacity - roomValue.occupiedPlaces === 0) {
                room.setErrors({ busyRoom: true });
            } 
        }

        if (position && salary) {
            if(salaryValue < positionValue.minWage || salaryValue > positionValue.maxWage) {

                salary.setErrors({ salaryNotMatch: true });
            }
        }

        if (!room) {
            room.setErrors({ busyRoom: null });
        }

        if (!position || !salary) {
            salary.setErrors({ salaryNotMatch: null });
            salary.updateValueAndValidity({ onlySelf: true });
        }

        // console.log(minWage);
        
        //     if(salaryValue < minWage || salaryValue > maxWage) {

        //         salary.setErrors({ salaryNotMatch: true });
        //         return null;
        //     }
        

        // if (roomCapacity !== null && roomOccupiedPlaces !== null) {
        //     if(roomCapacity - roomOccupiedPlaces === 0) {

        //         room.setErrors({ noFreePlaces: true });
        //         return null;
        //     }
        // }
        
        // room.setErrors({ noFreePlaces: true });
        // room.updateValueAndValidity({ onlySelf: true });
        return null;
    }
}