'use server'

import satellite from "@/service/satellite";
import { create } from "@/store/cookies";

const apiLogin = async (body: { email: string; password: string }) =>
  await satellite
    .post('https://jurwawe.sga.dom.my.id/api/auth/login', body, {
      headers: {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
      },
    })
    .then(response => {
      create('__TOKEN__', response.data.data.token)
      create('__ROLE__', response.data.data.role)
      const storageData = response.data
      delete storageData.tokenSession
      return { status: 'status', data: storageData }
    })
    .catch(error => {
      throw error.response.data
    })

export default apiLogin
