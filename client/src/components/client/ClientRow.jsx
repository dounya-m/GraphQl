import React from 'react'
import { useMutation } from '@apollo/client'
import {DELETE_CLIENT} from '../../mutations/clientMutation'
function ClientRow({client}) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id}
    })
    return (
    <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
        1
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
            {client.name}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
            {client.email}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
            <a
                className="text-green-500 hover:text-green-700"
                href="/"
            >
                Edit
            </a>
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
            <a
                onClick={deleteClient}
                className="text-red-500 hover:text-red-700"
                href="/"
            >
                Delete
            </a>
        </td>
    </tr>

  )
}

export default ClientRow
