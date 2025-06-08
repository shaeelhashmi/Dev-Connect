import jwt from 'jsonwebtoken';
const Autheticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const data = token.split(' ')[1];
    jwt.verify(data, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }  
        req.user=decoded.user
        req.role=decoded.role
        next();
    });
}
export default Autheticate;