function response(res: any, { status = 200, message, data = {} }: { status?: number, message: string, data?: {} }) {
    if (status >= 400 && status < 500) {
        return res.status(status).json({
            status: 'failed',
            message,
            data
        })
    }
    if (status >= 500 && status < 600) {
        return res.status(status).json({
            status: 'error',
            message,
            data
        })
    }

    return res.status(status).json({
        status: 'success',
        message,
        data
    })
}

export default response;