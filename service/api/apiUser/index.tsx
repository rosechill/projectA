'use server'

import { DataKaryawan } from '@/interfaces/KaryawanInterface'
import satellite from '@/service/satellite'
import { read } from '@/store/cookies'

let userAccountPromise: Promise<any> | null = null

const apiGetKaryawan = () => {
  if (userAccountPromise) {
    return userAccountPromise
  }

  userAccountPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/karyawan/index`, {
        headers: {
          Authorization: `Bearer ${read('__TOKEN__')}`,
        },
      })
      .then((response: { data: DataKaryawan }) => {
        const storageData = response.data
        resolve({ status: 'success', data: storageData })
      })
      .catch(error => {
        reject(error)
      })
      .finally(() => {
        userAccountPromise = null
      })
  })

  return userAccountPromise
}

export default apiGetKaryawan

// export const apiCreateUser = async (body: UserFormInterface) => {
//   await satellite
//     .post(`${process.env.NEXT_PUBLIC_BASE_URL}/userAccount`, body, {
//       headers: {
//         Authorization: `Bearer ${read('__TOKEN__')}`,
//       },
//     })
//     .catch(err => {
//       throw err.response.data
//     })
//     .then(() => {})
//   return apiCreateUser
// }

// export const apiEditUser = async (body: {id?: number, username: string; password: string, role: string; }) => {
//   await satellite
//     .put(`${process.env.NEXT_PUBLIC_BASE_URL}/userAccount`, body, {
//       headers: {
//         Authorization: `Bearer ${read('__TOKEN__')}`,
//       },
//     })
//     .catch(err => {
//       throw err.response.data
//     })
//     .then(() => {})
//   return apiEditUser
// }

// export const apiDeleteUser = async (id: number) => {
//   await satellite
//     .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/userAccount`, {
//       headers: {
//         Authorization: `Bearer ${read('__TOKEN__')}`,
//       },
//       data: {
//         id: id,
//       },
//     })
//     .catch(err => {
//       throw err.response.data
//     })
//     .then(() => {})
//   return apiDeleteUser
// }
