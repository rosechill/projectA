'use server'

import { DataPromo } from '@/interfaces/PromoInterface'
import satellite from '@/service/satellite'
import { read } from '@/store/cookies'

let promoPromise: Promise<any> | null = null

const apiGetPromo = () => {
  if (promoPromise) {
    return promoPromise
  }
//   console.log(read('__TOKEN__'))
  promoPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/promo-poin/index`, {
        headers: {
          Authorization: `Bearer ${read('__TOKEN__')}`,
        },
      })
      .then((response: { data: DataPromo }) => {
        const storageData = response.data
        resolve({ status: 'success', data: storageData })
      })
      .catch(error => {
        reject(error)
      })
      .finally(() => {
        promoPromise = null
      })
  })

  return promoPromise
}

export default apiGetPromo