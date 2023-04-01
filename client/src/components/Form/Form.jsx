import React, { useRef, useState } from 'react'

import { FormContainer, FormInput, GraphContainer } from './Form.styles.js'
import { Box, Button } from '@mui/joy'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'
import { Task, calculateCPM } from '../../backend/CPMmethod.js'
import { DataSet, Network } from 'vis-network/standalone'

const columns = [
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
        field: 'previousActivity',
        headerName: 'previous activity',
        width: 150,
        editable: true,
    },
]

const Form = () => {
    const activityRef = useRef('')
    const durationRef = useRef('')
    const previousRef = useRef('')

    const [rows, updateRows] = useState([])
    const [duration, updateDuration] = useState(0)

    const checkDupclicate = (newRow) => {
        if (newRow.Activity === newRow.previousActivity) return false

        return (
            rows.find((row) => row.Activity === newRow.Activity) === undefined
        )
    }

    const handleOnAdd = () => {
        const activity = activityRef.current.value
        const duration = durationRef.current.value
        const previousAct = previousRef.current.value

        const newRow = {
            Activity: activity,
            Duration: duration,
            previousActivity: previousAct,
        }
        if (checkDupclicate(newRow)) {
            updateRows((rows) => [...rows, newRow])
        }
    }

    const getResult = () => {
        const tasks = []
        const nodes = []
        const edges = []
        rows.forEach((row) => {
            if (row.previousActivity === '') {
                tasks.push(new Task(row.Activity, Number(row.Duration)))
                nodes.push({ id: row.Activity, label: row.Activity })
                edges.push({
                    from: row.previousActivity,
                    to: row.Activity,
                    arrows: {
                        to: {
                            enabled: true,
                            type: 'arrow',
                        },
                    },
                })
                return
            }
            tasks.push(
                new Task(row.Activity, Number(row.Duration), [
                    row.previousActivity,
                ])
            )
            nodes.push({ id: row.Activity, label: row.Activity })
            edges.push({
                from: row.previousActivity,
                to: row.Activity,
                arrows: {
                    to: {
                        enabled: true,
                        type: 'arrow',
                    },
                },
            })
        })

        const nodesDataSet = new DataSet(nodes)
        const edgesDataSet = new DataSet(edges)

        const data = {
            nodes: nodesDataSet,
            edges: edgesDataSet,
        }

        const options = {}

        const container = document.getElementById('mynetwork')
        new Network(container, data, options)

        const result = calculateCPM(tasks)
        updateDuration(result.projectDuration)
        console.log(
            'Critical path:',
            result.criticalPath.map((task) => task.id).join(' -> ')
        )
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
            <Button onClick={getResult}>Get result</Button>
            <h1>Duration: {duration}</h1>
            <GraphContainer id="mynetwork" />
        </FormContainer>
    )
}

export default Form
