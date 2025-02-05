import { useEffect } from 'react'
import { router } from 'expo-router'
import { useIsNavigationReady } from '@/hooks/useIsNavigationReady'
import useIsAuthenticated from '@/hooks/useIsAuthenticated'

export default function Index() {
  const isAuthenticated = useIsAuthenticated()
  const isNavigationReady = useIsNavigationReady()

  useEffect(() => {
    if (!isNavigationReady) return
    router.replace(isAuthenticated ? '/home' : '/onboarding')
  }, [isAuthenticated, isNavigationReady])

  return <></>
}
