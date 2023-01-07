const pool = require('../helpers/connectionDb').getInstance();

//Consulta para visualizar los posts
const getPosts = async () => {
    SQLquery = {
        text: 'SELECT * FROM posts',
    };
    try {
        const result = await pool.query(SQLquery);
        return result.rows;
    } catch (e) {
        console.log(
            "error al obtener  datos de la tabla posts",
            e.code,
            e.message
        );
        throw newError(e);
    }
};

//Consulta para agregar nuevo post
const newPost = async (payload) => {
    const SQLquery = {
        text: 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [
            payload.titulo,
            payload.url,
            payload.descripcion,
            payload.likes,
        ],
    }
    try {
        const result = await pool.query(SQLquery)
        console.log("POST AGREGADO")
        return result.rows
    } catch (e) {
        console.log('Error al agregar la información en la tabla posts:',
            e.code,
            e.message)
        throw new ERROR(e)

    }

}
//Consulta para validar los posts duplicados
const duplicatePost = async (payload) => {
    const SQLquery = {
        text: 'SELECT COUNT(*) as NUM FROM posts WHERE titulo=$1 AND img=$2 AND descripcion=$3',
        values: [payload.titulo, payload.url, payload.descripcion],
    }
    const { rows } = await pool.query(SQLquery)
    return rows
}

//consulta para actualizar los likes
const updatePost = async (payload) => {
    const query = {
        text: "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *",
        values: [payload.like, payload.id],
    };
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (e) {
        console.log('Error al modificar los datos en tabla posts:',
            e.code,
            e.message);
        throw new Error(e);
    }
}

//consulta para encontrar un registo por id
const findPost = async (payload) => {
    try {
        const query = {
            text: "SELECT * FROM posts WHERE id = $1",
            values: [payload],
        };
        const result = await pool.query(query);
        return result.rows;
    } catch (e) {
        console.log("Error al encontrar datos en tabla posts:", e.code, e.message);
        throw new Error(e);
    }
}

const deletePost = async (payload) => {
    try {
        const query = {
            text: "DELETE FROM posts WHERE id = $1",
            values: [payload],
        };
        const result = await pool.query(query);
        return result.rows;
    } catch (e) {
        console.log("Error al eliminar datos de la tabla posts:", e.code, e.message)
        throw new Error(e);
    }
}

module.exports = { getPosts, newPost, duplicatePost, updatePost, findPost, deletePost }
