
export const MobileUtils = {
  // Device detection
  isMobile: () => window.innerWidth < 768,
  isTablet: () => window.innerWidth >= 768 && window.innerWidth < 1024,
  isDesktop: () => window.innerWidth >= 1024,
  
  // Touch device detection
  isTouchDevice: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  },
  
  // iOS detection
  isIOS: () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  },
  
  // Android detection
  isAndroid: () => {
    return /Android/.test(navigator.userAgent)
  },
  
  // Safari detection
  isSafari: () => {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  },
  
  // Set dynamic viewport height for mobile browsers
  setViewportHeight: () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },
  
  // Handle orientation changes
  handleOrientationChange: (callback) => {
    const handler = () => {
      // Wait for the orientation change to complete
      setTimeout(() => {
        MobileUtils.setViewportHeight()
        if (callback) callback()
      }, 100)
    }
    
    window.addEventListener('orientationchange', handler)
    return () => window.removeEventListener('orientationchange', handler)
  },
  
  // Prevent zoom on input focus (iOS)
  preventZoomOnInputs: () => {
    if (MobileUtils.isIOS()) {
      const inputs = document.querySelectorAll('input, select, textarea')
      inputs.forEach(input => {
        if (!input.style.fontSize) {
          input.style.fontSize = '16px'
        }
      })
    }
  },
  
  // Lock body scroll (useful for modals on mobile)
  lockBodyScroll: () => {
    if (MobileUtils.isMobile()) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.dataset.scrollY = scrollY.toString()
    }
  },
  
  // Unlock body scroll
  unlockBodyScroll: () => {
    const scrollY = document.body.dataset.scrollY
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY))
      delete document.body.dataset.scrollY
    }
  },
  
  // Debounced resize handler
  debounceResize: (callback, delay = 150) => {
    let timeoutId
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(callback, delay)
    }
  },
  
  // Safe area insets detection
  getSafeAreaInsets: () => {
    const computedStyle = getComputedStyle(document.documentElement)
    return {
      top: computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0px',
      right: computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0px',
      bottom: computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0px',
      left: computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0px'
    }
  },
  
  // Smooth scroll to element
  smoothScrollTo: (element, offset = 0) => {
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementTop - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  },
  
  // Get viewport dimensions
  getViewportDimensions: () => {
    return {
      width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    }
  },
  
  // Check if element is in viewport
  isElementInViewport: (element, threshold = 0) => {
    const rect = element.getBoundingClientRect()
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth
    
    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= viewportHeight + threshold &&
      rect.right <= viewportWidth + threshold
    )
  }
}

/**
 * Mobile-specific event handlers
 */
export const MobileEventHandlers = {
  // Touch swipe detection
  handleSwipe: (element, callbacks = {}) => {
    let startX = 0
    let startY = 0
    let endX = 0
    let endY = 0
    const minSwipeDistance = 50
    
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }
    
    const handleTouchMove = (e) => {
      e.preventDefault() // Prevent scrolling while swiping
    }
    
    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX
      endY = e.changedTouches[0].clientY
      
      const deltaX = endX - startX
      const deltaY = endY - startY
      const absDeltaX = Math.abs(deltaX)
      const absDeltaY = Math.abs(deltaY)
      
      // Determine swipe direction
      if (absDeltaX > minSwipeDistance && absDeltaX > absDeltaY) {
        if (deltaX > 0) {
          callbacks.onSwipeRight?.(deltaX)
        } else {
          callbacks.onSwipeLeft?.(Math.abs(deltaX))
        }
      } else if (absDeltaY > minSwipeDistance && absDeltaY > absDeltaX) {
        if (deltaY > 0) {
          callbacks.onSwipeDown?.(deltaY)
        } else {
          callbacks.onSwipeUp?.(Math.abs(deltaY))
        }
      }
    }
    
    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    // Return cleanup function
    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  },
  
  // Pull to refresh
  handlePullToRefresh: (container, onRefresh, threshold = 60) => {
    let startY = 0
    let currentY = 0
    let isRefreshing = false
    
    const handleTouchStart = (e) => {
      if (container.scrollTop === 0) {
        startY = e.touches[0].clientY
      }
    }
    
    const handleTouchMove = (e) => {
      if (container.scrollTop === 0 && !isRefreshing) {
        currentY = e.touches[0].clientY
        const pullDistance = currentY - startY
        
        if (pullDistance > 0) {
          e.preventDefault()
          // Visual feedback for pull to refresh
          const opacity = Math.min(pullDistance / threshold, 1)
          container.style.transform = `translateY(${Math.min(pullDistance * 0.5, threshold)}px)`
          container.style.opacity = 1 - (opacity * 0.2)
        }
      }
    }
    
    const handleTouchEnd = (e) => {
      if (container.scrollTop === 0 && !isRefreshing) {
        const pullDistance = currentY - startY
        
        if (pullDistance > threshold) {
          isRefreshing = true
          onRefresh().finally(() => {
            isRefreshing = false
            container.style.transform = ''
            container.style.opacity = ''
          })
        } else {
          container.style.transform = ''
          container.style.opacity = ''
        }
      }
    }
    
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }
}

/**
 * Initialize mobile utilities
 */
export const initMobileUtils = () => {
  // Set initial viewport height
  MobileUtils.setViewportHeight()
  
  // Handle viewport changes
  window.addEventListener('resize', MobileUtils.debounceResize(() => {
    MobileUtils.setViewportHeight()
  }))
  
  // Handle orientation changes
  MobileUtils.handleOrientationChange()
  
  // Prevent zoom on inputs for iOS
  if (MobileUtils.isIOS()) {
    document.addEventListener('DOMContentLoaded', MobileUtils.preventZoomOnInputs)
  }
  
  // Add touch device class
  if (MobileUtils.isTouchDevice()) {
    document.documentElement.classList.add('touch-device')
  }
  
  // Add platform classes
  if (MobileUtils.isIOS()) {
    document.documentElement.classList.add('ios')
  }
  
  if (MobileUtils.isAndroid()) {
    document.documentElement.classList.add('android')
  }
  
  if (MobileUtils.isSafari()) {
    document.documentElement.classList.add('safari')
  }
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  initMobileUtils()
}

// Export for Vue composable usage
export const useMobileUtils = () => {
  return {
    ...MobileUtils,
    ...MobileEventHandlers
  }
}