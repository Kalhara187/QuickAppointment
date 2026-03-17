export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatTime = (time) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export const formatDateTime = (date, time) => {
  return `${formatDate(date)} at ${formatTime(time)}`
}

export const capitalizeString = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const debounce = (func, wait) => {
  let timeoutId

  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => func(...args), wait)
  }
}