const dayjs = require('dayjs');

const jsonwebtoken = require('jsonwebtoken');

const createToken = (user) => {
    const payload = {
        user_id: user.id,
        user_name: user.name,
        user_nickname: user.user_nickname,
        user_email: user.email,
        user_birthday: dayjs(user.date_of_birth).format('YYYY-MM-DD'), 
        user_role: user.role_id,
        user_status: user.status,
        user_location: user.location_id,
        user_creation_date: dayjs(user.creation_date).format('YYYY-MM-DD HH:mm:ss'), 
        user_update_date: dayjs(user.update_date).format('YYYY-MM-DD HH:mm:ss'), 
        exp: dayjs().add(5, 'days').unix()
    };
    // Codificamos el token
    return jsonwebtoken.sign(payload, process.env.SECRET_KEY);
};

module.exports = { createToken };