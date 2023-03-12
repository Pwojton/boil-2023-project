import React from 'react'
import Input from '@mui/joy/Input'

import { FormContainer, FormInput } from './Form.styles.js'
import { Box, Button } from '@mui/joy'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'Activity',
        headerName: 'Activity',
        width: 150,
        editable: true,
    },
    {
        field: 'Duration',
        headerName: 'Duration',
        width: 150,
        editable: true,
    },
    {
        field: 'Previous activity',
        headerName: 'Previous activity',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Next activity',
        headerName: 'Next activity',
        type: 'number',
        width: 110,
        editable: true,
    },
]

const rows = []

const handleOnAdd = () => {}

const Form = () => {
    return (
        <FormContainer>
            <FormInput>
                <Input
                    sx={{ mr: 2 }}
                    type="text"
                    placeholder="Enter activity"
                />
                <Input
                    sx={{ mr: 2 }}
                    type="text"
                    placeholder="Enter duration"
                />
                <Input
                    sx={{ mr: 2 }}
                    type="text"
                    placeholder="Enter previous activity"
                />
                <Input
                    sx={{ mr: 2 }}
                    type="text"
                    placeholder="Enter next activity"
                />
                <Button onClick={handleOnAdd}>Add</Button>
            </FormInput>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </FormContainer>
    )
}

export default Form
