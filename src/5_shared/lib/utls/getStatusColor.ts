export const getStatusColor = (status: string | null): string => {
    switch (status) {
        case 'failed':
            return '#ff4d4f' // red
        case 'queued':
            return '#faad14' // orange/yellow
        case 'ready':
            return '#52c41a' // green
        case 'created':
            return '#1890ff' // blue
        default:
            return '#8c8c8c' // secondary gray
    }
}
