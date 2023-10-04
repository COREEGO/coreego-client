import moment from 'moment'

export const dateParse = (date : Date) => {

    let dateParse = moment(date).fromNow()

    if(moment(new Date()).diff(date, 'd') > 0){
        dateParse = moment(date).fromNow()
    }

    return dateParse
}

export const getViolationField = (violations: Array<any>, fieldName: string) => {
    let violationField: any = null
    if (Array.isArray(violations) && violations.length) {
        violationField = violations.find((violation: any) => violation.propertyPath === fieldName)
    }
    return violationField
}
