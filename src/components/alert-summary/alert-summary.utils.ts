import { AlertCondition, AlertType } from "../../models/admin/IAlert";

export const generateAlertMessage = (type : AlertType, condition : AlertCondition, value : number) => {
    const typeText = type === 'newDeaths' 
            ? 'new deaths' 
            : 'new confirmed cases';

    const conditionText = condition === 'greaterThan' 
            ? 'more than' 
            : 'less than';

    return `When ${typeText} are ${conditionText} ${value}.`
}


