const List = require('../models/List')
const User = require('../models/Users')

//Helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId
const { randomUUID } = require('crypto');

module.exports = class ListController{
    static async createList(req, res){

        const { name , users } = req.body

        //Validations
        if(!name){
            res.status(422).json({mensage: 'O nome é obrigatório'})
            return
        }

        //check user exist
        if(users){
            for (const userEmail of users) {
                const user = await User.findOne({"email": userEmail})
                if(!user){
                    res.status(404).json({mensage: `Nenhum usuário com o email: ${userEmail} foi encontrado`})
                    return
                }
            };
        }

        // get group owner
        const token = getToken(req)
        const userCurrent = await getUserByToken(token)

        const usersUnique = [...new Set(users)];

        //CreateList
        const list = new List({
            name,
            users: usersUnique,
            owner: userCurrent
        })

        //SaveList
        try {

            const newList = await list.save()
            res.status(201).json({
                mensage: 'Lista cadastrada com sucesso!',
                newList
            })
            
        } catch (error) {
            res.status(500).json({mensage: error})
        }
    }

    static async getList(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        // const lists = await List.find({'owner._id':user._id}, {'users':user.email }).sort('-createdAt')
        const lists = await List.find({
            $or: [
                {'owner._id':user._id},
                {'users':user.email }
            ]
        }).sort('-createdAt')
        res.status(200).json({
            lists
        })
    }

    static async updateList(req, res){
        const id = req.params.id
        let updateListData = {}

        //check id valid
        if(!id || !ObjectId.isValid(id)){
            res.status(422).json({mensage: 'ID inválido'})
            return
        }

        
        //check list exist
        const list = await List.findOne({_id: id})
        
        if(!list){
            res.status(404).json({mensage: 'Lista não encontrado'})
            return
        }
        
        // get List owner
        const token = getToken(req)
        const userCurrent = await getUserByToken(token)

        if(!(list.users.includes(userCurrent.email) || list.owner.email === userCurrent.email)){
            res.status(404).json({mensage: 'Você não tem permição pra editar esta lista.'})
            return
        }

        updateListData = list

        const { name , users } = req.body

        //Validations
        if(!name){
            res.status(422).json({mensage: 'O nome é obrigatório'})
            return
        }else{
            updateListData.name = name
        }

        //check user exist
        if(users){
            for (const userEmail of users) {
                const user = await User.findOne({"email": userEmail})
                if(!user){
                    res.status(404).json({mensage: `Nenhum usuário com o email: ${userEmail} foi encontrado`})
                    return
                }
            };
            const usersUnique = [...new Set(users)];
            updateListData.users = usersUnique
        }

        try {

            await List.findByIdAndUpdate(id, updateListData)
            res.status(201).json({
                mensage: 'Lista atualizada com sucesso!',
                updateListData
            })
            
        } catch (error) {
            res.status(500).json({mensage: error})
        }

    }

    static async deleteList(req, res){
        const id = req.params.id

        //check id valid
        if(!id || !ObjectId.isValid(id)){
            res.status(422).json({mensage: 'ID inválido'})
            return
        }

        
        //check list exist
        const list = await List.findOne({_id: id})
        
        if(!list){
            res.status(404).json({mensage: 'Lista não encontrado'})
            return
        }
        
        // get List owner
        const token = getToken(req)
        const userCurrent = await getUserByToken(token)

        if(list.owner.email !== userCurrent.email){
            res.status(404).json({mensage: 'Você não tem permição pra deletar esta lista.'})
            return
        }

        try {
            await List.findByIdAndRemove(id)
    
            res.status(200).json({mensage: 'Lista removido com sucesso!'})
        } catch (error) {
            res.status(500).json({mensage: error})
        }

    }
    
    // ITENS

    static async createItem (req, res){
        const id = req.params.id
        let updateListData = {}

        //check id valid
        if(!id || !ObjectId.isValid(id)){
            res.status(422).json({mensage: 'ID inválido'})
            return
        }

        
        //check list exist
        const list = await List.findOne({_id: id})
        
        if(!list){
            res.status(404).json({mensage: 'Lista não encontrado'})
            return
        }
        
        // get List owner
        const token = getToken(req)
        const userCurrent = await getUserByToken(token)

        if(!(list.users.includes(userCurrent.email) || list.owner.email === userCurrent.email)){
            res.status(404).json({mensage: 'Você não tem permição pra editar esta lista.'})
            return
        }

        updateListData = list

        const { name } = req.body

        //Validations
        if(!name){
            res.status(422).json({mensage: 'O nome é obrigatório'})
            return
        }else{
            updateListData.itens.push({
                name,
                author: userCurrent.name,
                checked: false,
                id: randomUUID()
            })
        }

        try {
            await List.findByIdAndUpdate(id, updateListData)
            res.status(201).json({
                mensage: 'Lista atualizada com sucesso!',
                updateListData
            })
            
        } catch (error) {
            res.status(500).json({mensage: error})
        }
    }
}