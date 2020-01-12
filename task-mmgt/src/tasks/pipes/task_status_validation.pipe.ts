import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task_status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses: TaskStatus[] = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    transform(value: any) {
        const upperCaseValue = value ? value.toUpperCase() : '';
        if (!this.isStatusValid(upperCaseValue)) {
            throw new BadRequestException('${value} is an invalid status');
        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}
