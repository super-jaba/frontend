export const formatDate = (timestamp: string) => {
    if (!timestamp) return ''

    const date = new Date(timestamp)
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
    }

    return date.toLocaleString('en-US', options)
}
