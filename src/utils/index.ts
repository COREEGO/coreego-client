import moment from 'moment'

export const dateParse = (date : Date) => {

    let dateParse = moment(date).fromNow()

    if(moment(new Date()).diff(date, 'd') > 0){
        dateParse = moment(date).fromNow()
    }

    return dateParse
}
