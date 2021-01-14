export class User {
    userId: number;
    email: string;
    userTypeKey: string;
    fullName: string;
    createdDate: Date;
    actionAccessMappings: { [action: string]: number; }; //key: actionName, value: accessLevel
}