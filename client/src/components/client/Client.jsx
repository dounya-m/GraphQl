import React from 'react'
import {gql, useQuery} from '@apollo/client'
import ClientRow from './ClientRow'

const GET_CLIENTS = gql`
    query getClients{
        clients{
            id
            name
            email
            phone
        }
}
`
function Client() {
    const {loading, error, data} = useQuery(GET_CLIENTS)

    if (loading) return <p>Loading...</p>
    if(error) return <p>Something went wrong </p>
return (
    <>
        {!loading && !error && <h1>Clients</h1>}
<div className="flex flex-col">
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Phone
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                Edit
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.clients.map(client => (
                            <ClientRow key = {client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
    </>
)
}

export default Client
