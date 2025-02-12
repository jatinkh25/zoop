import { create } from 'zustand'

type AuthStore = {
  isAuthenticated: boolean
  isLoading: boolean
  setIsAuthenticated: (isAuth: boolean) => void
  setIsLoading: (loading: boolean) => void
}

const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  isLoading: true,
  setIsAuthenticated: (isAuth: boolean) => set({ isAuthenticated: isAuth }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}))

export default useAuthStore
