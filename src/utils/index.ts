import moment from 'moment'
import { BASE_URL } from './variables'

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

export const getFirstImage = (images: Array<any>) => {
    const url = BASE_URL + images[0].filePath
    if(url) return url
    return;
}
