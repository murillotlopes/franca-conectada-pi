const { update } = require('../models/solicitacoesModels');
const Solicitacoes = require('../models/solicitacoesModels');

module.exports = {

    async index(req,res) {
    const solicitacoes = await Solicitacoes.findAll();
    return res.json(solicitacoes);
    },

    async store(req,res) {
        const {codusuario,dataregistro,databaixa,baixamotivo,estadosolicitacao,observacoes,cep,logradouro,referencia,bairro,latitude,longitude} = req.body;
        const solicitacao = await Solicitacoes.create({codusuario,dataregistro,databaixa,baixamotivo,estadosolicitacao,observacoes,cep,logradouro,referencia,bairro,latitude,longitude});
        return res.status(200).send({
            status: 1,
            message: "Solicitacao Cadastrada com sucesso!",
            solicitacao
        })
    },

    async update(req, res){
        const {codusuario,dataregistro,databaixa,baixamotivo,estadosolicitacao,observacoes,cep,logradouro,referencia,bairro,latitude,longitude} = req.body;
        const { codigo } = req.params;

        await Solicitacoes.update({
            codusuario,dataregistro,databaixa,baixamotivo,estadosolicitacao,observacoes,cep,logradouro,referencia,bairro,latitude,longitude},
            {where: {id: codigo}});
        return res.status(200).send({
            status: 1,
            message: "Solicitacao Atualizado com sucesso",
        })
    },

    async delete(req, res) {
        const { codigo } =req.params;

        await Solicitacoes.destroy({
            where: {
                id: codigo
            }
        });
        return res.status(200).send({
            status: 1,
            message: "Solicitação Excluída com sucesso"
        })
    }

}