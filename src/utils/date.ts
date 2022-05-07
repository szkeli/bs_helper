/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/no-this-alias */

declare global {
  interface Date {
    clone: () => Date
    date: (date: number) => Date
    month: (month: number) => Date
    year: (year: number) => Date
    cmpYMD: (other: Date) => number
    isLeapYear: () => boolean
    getMonthLen: () => number
    prevMonth: () => Date
    nextMonth: () => Date
  }
}

Date.prototype.clone = function () {
  return new Date(+this)
}

/**
 * 给定日期，得到新的 Date。
 */
Date.prototype.date = function (date: number) {
  const temp: Date = this.clone()
  temp.setDate(date)
  return temp
}

/**
 * 给定月份，得到新的 Date，注意日期将会设置为 1。
 */
Date.prototype.month = function (month: number) {
  const temp: Date = this.clone()
  temp.setMonth(month)
  temp.setDate(1)
  return temp
}

Date.prototype.year = function (year: number) {
  const temp: Date = this.clone()
  temp.setFullYear(year)
  return temp
}

Date.prototype.cmpYMD = function (other: Date) {
  const temp: Date = this
  if (temp.getFullYear() !== other.getFullYear()) {
    return (temp.getFullYear() - other.getFullYear()) > 0 ? 1 : -1
  } else if (temp.getMonth() !== other.getMonth()) {
    return (temp.getMonth() - other.getMonth()) > 0 ? 1 : -1
  } else if (temp.getDate() !== other.getDate()) {
    return (temp.getDate() - other.getDate()) > 0 ? 1 : -1
  } else {
    return 0
  }
}

Date.prototype.isLeapYear = function () {
  const year: number = this.getFullYear()
  return (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0
}

Date.prototype.getMonthLen = function () {
  const temp: Date = this
  switch (temp.getMonth() + 1) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31
    case 4:
    case 6:
    case 9:
    case 11:
      return 30
    case 2:
      return temp.isLeapYear() ? 29 : 28
    default:
      throw new Error('invalid month')
  }
}

Date.prototype.prevMonth = function () {
  const temp: Date = this
  const year: number = this.getFullYear()
  const month: number = this.getMonth()
  if (month === 0) {
    return temp.year(year - 1).month(11)
  } else {
    return temp.month(month - 1)
  }
}

Date.prototype.nextMonth = function () {
  const temp: Date = this
  const year: number = this.getFullYear()
  const month: number = this.getMonth()
  if (month === 11) {
    return temp.year(year + 1).month(0)
  } else {
    return temp.month(month + 1)
  }
}

export {}
