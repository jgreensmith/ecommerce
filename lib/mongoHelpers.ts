import clientPromise from "./mongodb"

export async function getPids() {
    const client = await clientPromise
     
    const projects = await client.db('test').collection('users').find({}, {projection: {pid: 1, _id: 0}}).toArray()

    const filteredProjects = projects.filter(plop => plop.pid)

    return  JSON.parse(JSON.stringify(filteredProjects)) 
}

export async function getPidObj(pid: string) {
    const client = await clientPromise
     
    const pidObj = await client.db('test').collection('users').findOne(
        {pid : { $eq: pid }},
        {projection: {pid: 1, manage_inventory: 1, preview_mode: 1, _id: 0}}
      )       

    return JSON.parse(JSON.stringify(pidObj))
}