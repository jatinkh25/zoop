import { getSupabaseClient } from '@/lib/supabase'
import { ApiParamsTypes } from './api.types'

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const DELETE = 'delete'

export const createApiCall =
  (url: string, method: string) =>
  async (params: ApiParamsTypes = {}, headers: HeadersInit = {}): Promise<any> => {
    let apiEndpoint = process.env.EXPO_PUBLIC_API_URL + url

    const { body, urlParams, pathVariables } = params

    if (urlParams) {
      const searchParams = new URLSearchParams()
      Object.entries(urlParams).forEach(([key, value]) => {
        searchParams.append(key, String(value))
      })
      apiEndpoint = `${apiEndpoint}?${searchParams.toString()}`
    }

    if (pathVariables) {
      apiEndpoint = Object.keys(pathVariables).reduce((acc, curr) => {
        return acc.replace(`{${curr}}`, String(pathVariables[curr]))
      }, apiEndpoint)
    }

    const {
      data: { session },
    } = await getSupabaseClient().auth.getSession()
    const token = session?.access_token

    if (!token) {
      throw new Error('No token found')
    }

    try {
      const response = await fetch(apiEndpoint, {
        method,
        body: JSON.stringify(body),
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        return data
      } else {
        throw data
      }
    } catch (error) {
      console.error('error', error)
      throw error
    }
  }
