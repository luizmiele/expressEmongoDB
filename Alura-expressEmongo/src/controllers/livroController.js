import livro from "../models/Livros.js";
import { autor } from "../models/Autor.js";

class LivroController {
    static async listarLivros (req, res, next) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);

        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivroPorId (req, res, next) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);

        } catch (erro) {
            next(erro);
        }
    }

    static async cadastraLivro (req, res, next) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarLivro (req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "livro atualizado com sucesso"});

        } catch (erro) {
            next(erro);
        }
    }

    static async excluirLivro (req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "livro excluido com sucesso"});

        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivrosPorEditora (req, res, next) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            next(erro);
        }
    }
}

export default LivroController;
