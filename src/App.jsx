import React, { useEffect } from 'react'
import { githubFetch } from './utils/apiClient'
import { formatNumber } from './utils/formatNumbers'

export const App = () => {
  useEffect(() => {
    // --- Test formatNumber ---
    console.log("formatNumber(1200):", formatNumber(1200));
    console.log("formatNumber(1000000):", formatNumber(1000000));
    console.log("formatNumber(1500000):", formatNumber(1500000));
    console.log("formatNumber(999):", formatNumber(999));
    console.log("formatNumber(0):", formatNumber(0));
    console.log("formatNumber(null):", formatNumber(null));
    console.log("formatNumber(25300):", formatNumber(25300));
  }, []);

  return (
    <div>App</div>
  )
}
