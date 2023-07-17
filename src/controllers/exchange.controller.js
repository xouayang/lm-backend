const exchanges = require('../model/exchange.model');

// create exchange 
exports.create = async (req, res) => {
    try {
        await exchanges.create({...req.body}).then((data) => {
            if(data) {
                return res.status(200).json(data)
            }
        }).catch((error) => {
            return res.status(200).json({message:error.message})
        } )
        
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}
// get all 
exports.get_all = async (req, res) => {
   try {
     await exchanges.findAll().then(data => {
        if(data.length > 0) {
            return res.status(200).json(data)
        }
     }).catch((error) => {
        return res.status(200).json(data)
     })
   } catch (error) {
    return res.status(500).json({message:error.message})
   }
}
// update 
exports.update_data = async (req, res) => {
    try {
        const {id} = req.params;
        await exchanges.update({...req.body}, {where:{id:id}}).then((deleted) => {
            if(deleted) {
                return res.status(200).json({message:"Updated"})
            }
        }).catch((error) => {
            return res.status(200).json({message:error.message})
        })
        
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}
// delete 
exports.deleted_data = async (req, res) => {
    try {
      const id = req.params.id;
      await exchanges.destroy({where:{id:id}}).then((deleted) => {
        if(deleted) {
            return res.status(200).json({message:"Deleted"})
        }
      }).catch((error) => {
        return res.status(200).json({message:error.message})
      })  
    } catch (error) {
      return res.status(500).json({message:error.message})  
    }
}
