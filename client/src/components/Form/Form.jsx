import React, { useRef, useState } from 'react'

import { FormContainer, FormInput } from './Form.styles.js'
import { Box, Button } from '@mui/joy'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'Activity',
        headerName: 'activity',
        width: 100,
        editable: true,
    },
    {
        field: 'Duration',
        headerName: 'duration',
        width: 100,
        editable: true,
    },
    {
        field: 'Previous activity',
        headerName: 'previousActivity',
        width: 150,
        editable: true,
    },
    {
        field: 'Next activity',
        headerName: 'nextActivity',
        width: 150,
        editable: true,
    },
]

const Form = () => {
    const activityRef = useRef('')
    const durationRef = useRef('')
    const previousRef = useRef('')
    const nextRef = useRef('')

    const [rows, updateRows] = useState([])

    const handleOnAdd = () => {
        const activity = activityRef.current.value
        const duration = durationRef.current.value
        const previousAct = previousRef.current.value
        const nextAct = nextRef.current.value

        const newRow = {
            Activity: activity,
            Duration: duration,
            'Previous activity': previousAct,
            'Next activity': nextAct,
        }
        const isUniq = rows.includes.call(newRow)
        console.log(isUniq)

        if (!isUniq) {
            updateRows((rows) => [...rows, newRow])
        }
    }

    return (
        <FormContainer>
            <FormInput>
                <TextField
                    sx={{ mr: 2 }}
                    inputRef={activityRef}
                    type="text"
                    placeholder="Enter activity"
                />

                <TextField
                    inputRef={durationRef}
                    sx={{ mr: 2 }}
                    type="text"
                    placeholder="Enter duration"
                />
                <TextField
                    inputRef={previousRef}
                    sx={{ mr: 2 }}
                    type="text"
                    placeholder="Enter previous activity"
                />
                <TextField
                    inputRef={nextRef}
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
                    getRowId={(row) => row.Activity}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </FormContainer>
    )
}

export default Form
