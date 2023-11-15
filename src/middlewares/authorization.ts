import response from "../utils/response"

function authorization(req: any, res: any, next: any) {
    const authHeader = req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return response(res, { status: 401, message: 'Authorization token is missing or invalid' })
    }

    const token = authHeader.replace('Bearer ', '');

    const validToken = 'secretpassword';

    if (token !== validToken) {
        return response(res, { status: 401, message: 'Invalid token' })
    }

    next();
}

export default authorization;