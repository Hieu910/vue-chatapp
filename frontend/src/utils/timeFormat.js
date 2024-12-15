import dayjs from "dayjs"

export const formatTime = (value, format)=>{
    return dayjs(value).format(format)
}

export const getHourMinute = (value)=>{
    return dayjs(value).format("HH:mm")
}
