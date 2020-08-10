const express=require('express')
const auth=require('../middleware/auth')
const router=new express.Router()
const Task=require('../models/task')


router.post('/tasks', auth ,async (req,res)=>
{
    const task=new Task(
       {
           ...req.body,
           owner: req.user._id
       })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e)
    {
        res.status(404).send(e)
    }
})

//GET /tasks?completed=false
//GET/tasks?limit=10&skip=20
//GET /taks?sortBy=createdAt:desc
router.get('/tasks',auth,async (req,res)=>
{
  const match = {}
  const sort={}
    if(req.query.completed)
    {
        match.completed = req.query.completed==='true'
    }
    if(req.query.sortBy)
    {
        const parts=req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]=== 'desc' ? -1 : 1
    }
    try
    {
        await req.user.populate(
            {
                path: 'tasks',
                match,
                options:
                {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
                
            }).execPopulate()
        res.send(req.user.tasks)
    }catch(e)
    {
        res.status(500).send()
    }
})
router.get('/tasks/:id',auth,async (req,res)=>
{
    const _id=req.params.id
    try
    {
    
       const task=await Task.findOne({_id,owner:req.user._id})
        if(!task)
        return res.status(404).send()
        res.send(task)
}
    catch(e)
    {
        res.status(500).send()
    }

})
router.patch('/tasks/:id',auth,async (req,res)=>
{
    const updates=Object.keys(req.body)
    const allowUpdates=['description','completed']
    const isValid=updates.every((update)=>
    allowUpdates.includes(update))
    if(!isValid)
    return res.status(400).send({error:'Invalid updates'})
    try{
        const work=await Task.findOne({_id:req.params.id , owner:req.user._id})
      
        if(!work)
       return res.status(404).send()
       updates.forEach((update)=>
       {
          work[update]=req.body[update]
       })
       await work.save()
        res.send(work)
    }catch(e)
    {
        res.status(400).send(e)
    }
})
router.delete('/tasks/:id',auth,async(req,res)=>
{
    try{
        const work=await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})

        if(!work)
        res.status(404).send()
        res.send(work)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

module.exports = router