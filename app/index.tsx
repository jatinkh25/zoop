import { useEffect } from 'react'
import { router } from 'expo-router'
import { useIsNavigationReady } from '@/hooks/useIsNavigationReady'
import * as SplashScreen from 'expo-splash-screen'
import { getSupabaseClient } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'
import useAuthStore from '@/store/auth'

export default function Index() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore()
  const isNavigationReady = useIsNavigationReady()

  const {
    data: sessionData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['get-session'],
    queryFn: async () => {
      return await getSupabaseClient().auth.getSession()
    },
  })

  useEffect(() => {
    if (!isNavigationReady) {
      return // Navigation system not ready, do nothing
    }

    if (isLoading) {
      return // Still loading session data, do nothing
    }

    if (error) {
      // Session fetch error, redirect to onboarding
      setIsAuthenticated(false)
      SplashScreen.hideAsync()
      router.replace('/onboarding')
      return
    }

    // Session data loaded successfully
    if (sessionData?.data?.session) {
      // User has a session, navigate to home
      if (!isAuthenticated) {
        setIsAuthenticated(true) // Update auth state only if not already authenticated
      }
      SplashScreen.hideAsync()
      router.replace('/home')
    } else {
      // No active session, navigate to onboarding
      if (isAuthenticated) {
        setIsAuthenticated(false) // Update auth state only if already authenticated (to reset)
      }
      SplashScreen.hideAsync()
      router.replace('/onboarding')
    }
  }, [isNavigationReady, isLoading, error, sessionData, isAuthenticated, setIsAuthenticated])

  return <></>
}
