import Cookies from 'js-cookie'
import { ExpiredTimeUnit } from "./app.types";
import { COOKIE_KEY_ADMIN } from '../constants/config'

export function getExpiredTime(unit: ExpiredTimeUnit, time: number): Date {
    const date = new Date()
    switch (unit) {
        case ExpiredTimeUnit.SECOND:
            date.setTime(date.getTime() + time * 1000)
            break;

        case ExpiredTimeUnit.MINUTE:
            date.setTime(date.getTime() + time * 60 * 1000)
            break;

        case ExpiredTimeUnit.HOUR:
            date.setTime(date.getTime() + time * 60 * 60 * 1000)
            break;

        case ExpiredTimeUnit.DAY:
            date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000)
            break;

        default:
            break;
    }
    return date
}

export const isSystemAdmin = (): boolean => {
    const adminValue = Cookies.get(COOKIE_KEY_ADMIN)
    if (!adminValue) {
        return false
    }
    const { id } = JSON.parse(adminValue)
    return id === 1
}

export const getAdminUserIdFromCookies = (): number | null => {
    const adminValue = Cookies.get(COOKIE_KEY_ADMIN)
    if (!adminValue) {
        return null
    }
    const { id } = JSON.parse(adminValue)
    if (isNaN(id)) {
        return null
    }
    return id
}