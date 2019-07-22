/* eslint-disable */

// http://mockjs.com/examples.html
import Mock from 'mockjs'

//
//
export const delay = 0
export const disabled = false
//
const tabDate = Mock.mock({
  'Data|40-200': [
    {
      name: '@ctitle(2, 4)',
      type: '@cword(2)',
      date: '@date("yyyy-MM-dd HH:mm:ss")',
      state: true,
    },
  ],

  count() {
    return this.Data.length
  },
})

//
export default {
  //
  'GET /tab/getList': (req, res, next) => {
    const { query } = req
    const { currentPage, pageSize } = query
    const starIndex = (currentPage - 1) * pageSize
    const lastIndex = starIndex + Number(pageSize)
    const Data = tabDate.Data.slice(starIndex, lastIndex)
    const count = tabDate.count
    return {
      Data,
      count,
      currentPage: Number(currentPage),
      pageSize: Number(pageSize)
    }
  },
}
