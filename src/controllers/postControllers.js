const { getPosts, newPost, duplicatePost, updatePost, findPost, deletePost } = require('../models/postModels');

//Traer los posts (GET)
const getAllPost = async (req, res) => {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .json({ message: 'Error al obtener los datos' });

    }
}

//Crear Nuevo post (POST)
const createNewPost = async (req, res) => {
    try {
        const payload = req.body
        const resultDuplicate = await duplicatePost(payload)
        if (
            payload.id === "" ||
            payload.titulo === "" ||
            payload.url === "" ||
            payload.descripcion === ""
        ) {
            console.log("Por Favor completa todos los campos");
        } else if (resultDuplicate[0].num > 0) {
            res.send("Registro ya existe en la base de datos");
        } else {
            await newPost(payload)
            res.send("post Agregado con exito")
        }
    } catch (error) {
        res.
            json({ message: "Faltan campos por ingresar" });
    }
};

//Actualizar likes para poder interactuar (PUT)
const updatePostById = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    payload.id = id;
    try {
        const foundPost = await findPost(id);
        payload.like = foundPost[0].likes + 1;
        if (foundPost.length === 0) {
            console.log("Post no encontrado");
            return res
                .status(404).json({ message: "Post no encontrado" });
        }
        const updatedPost = await updatePost(payload);
        res
            .json(updatedPost);
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .json({ message: "error al actualizar el post" });
    }
};

//Eliminar registro (DELETE)
const deletePostById = async (req, res) => {
    const { id } = req.params;
    try {
        const foundPost = await findPost(id);
        if (foundPost.length === 0) {
            console.log("Post no encontrado");
            return res
                .status(404).json({ message: "Post no encontrado" });
        }
        await deletePost(id);
        console.log("Post eliminado con exito!");
        res
            .json({ message: "Post eliminado con exito" });
    } catch (e) {
        console.log(e);
        res
            .status(500).json({ message: "error al eliminar el post" });
    }
};

module.exports = { getAllPost, createNewPost, updatePostById, deletePostById };
