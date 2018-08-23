const baseURL = 'https://api.douban.com'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export const isPhoneNum = (str) => {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}

export const showToast = (text) => {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 2000
  })
}
export const showLoding = (title, content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          resolve(res)
        } else if (res.cancel) {
          // console.log('用户点击取消')
          reject(res.cancel)
        }
      }
    })
  })
}
export const ajax = {
  get (url, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${baseURL}${url}`,
        data: params,
        method: 'GET',
        header: {
          "content-type":"json"
        },
        success (res) {
          resolve(res)
        },
        fail (res) {
          reject(res)
        }
      })
    })
  },
  post (url, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${baseURL}${url}`,
        data: params,
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success (res) {
          resolve(res)
        },
        fail (res) {
          reject(res)
        }
      })
    })
  }
}
export default {
  formatNumber,
  formatTime,
  showToast,
  ajax,
  isPhoneNum
}
