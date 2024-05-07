import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros (erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos."});
    } else if (erro instanceof mongoose.Error.ValidationError) { 
        const mensagensErro = Object.values(erro.errors);
        mensagensErro.map(erro => erro.message);
        mensagensErro.join("; ");

        res.status(400).send({message: `Os seguintes erros foram encontrados: ${mensagensErro}`});
    } else {
        res.status(500).json( { message: `${erro.message} - Falha na requisição do autor`});
    }
}

export default manipuladorDeErros;