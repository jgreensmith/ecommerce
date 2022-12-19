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
        {projection: {pid: 1, encrypted_manage_inventory: 1, iv: 1, auth_tag: 1, preview_mode: 1, holidayMode: 1, reviews: 1,  _id: 0}}
      )       

    return JSON.parse(JSON.stringify(pidObj))
}

export async function getConnectId(pid: string) {
    const client = await clientPromise
     
    const connectId = await client.db('test').collection('users').findOne(
        {pid : { $eq: pid }},
        {projection: {connectedAccount: 1, customerId: 1, _id: 0}}
      )       

    return JSON.parse(JSON.stringify(connectId))
}