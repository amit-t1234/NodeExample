const pool = require('../../config/database');


module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(firstName, lastName, gender, password, number)
            values(?,?,?,?,?)`,
            [
                data.first_name, 
                data.last_name,
                data.gender,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: (callBack) => {
        pool.query(
            `SELECT firstName, lastName, gender, password, number FROM registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            `SELECT firstName, lastName, gender, password, number FROM registration WHERE id= ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE registration SET firstName=?, lastName=?, gender=?, password=?, number=? WHERE id= ?`,
            [
                data.first_name, 
                data.last_name,
                data.gender,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `DELETE FROM registration WHERE id= ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );        
    }
}