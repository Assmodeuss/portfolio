"use client"

import { createContext, useContext } from "react"

type LoaderContextType = {
  loading: boolean
  setLoading: (value: boolean) => void
}

export const LoaderContext = createContext<LoaderContextType>({
  loading: false,
  setLoading: () => {},
})

export const useLoader = () => useContext(LoaderContext)
