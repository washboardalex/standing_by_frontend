import { AlertCondition, AlertType } from "../../models/admin/IAlert";


export const genTypeText = (type : AlertType) : string => 
        type === 'newDeaths' 
            ? 'new deaths' 
            : 'new confirmed cases';

export const genConditionText = (condition : AlertCondition) : string => 
        condition === 'greaterThan' 
            ? 'greater than' 
            : 'less than';

