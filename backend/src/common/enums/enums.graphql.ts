import { registerEnumType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

registerEnumType(Status, {
    name: 'Status',
});
