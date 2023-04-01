export class Task {
    constructor(id, duration, dependencies = []) {
        this.id = id
        this.duration = duration
        this.dependencies = dependencies
        this.earliestStart = 0
        this.latestStart = 0
    }
}

export function calculateCPM(tasks) {
    const taskMap = new Map()
    tasks.forEach((task) => taskMap.set(task.id, task))

    //Earliest Start
    tasks.forEach((task) => {
        if (task.dependencies.length === 0) {
            task.earliestStart = 0
        } else {
            task.earliestStart = Math.max(
                ...task.dependencies.map(
                    (depId) =>
                        taskMap.get(depId).earliestStart +
                        taskMap.get(depId).duration
                )
            )
        }
    })

    //project duration
    const projectDuration = Math.max(
        ...tasks.map((task) => task.earliestStart + task.duration)
    )

    //Latest Start
    tasks.forEach((task) => {
        task.latestStart = projectDuration - task.duration
    })

    const reverseTasks = Array.from(tasks).reverse()
    reverseTasks.forEach((task) => {
        task.dependencies.forEach((depId) => {
            const dependency = taskMap.get(depId)
            dependency.latestStart = Math.min(
                dependency.latestStart,
                task.latestStart - dependency.duration
            )
        })
    })

    //critical path
    const criticalPath = tasks.filter(
        (task) => task.earliestStart === task.latestStart
    )

    return {
        projectDuration,
        criticalPath,
    }
}

// const tasks = [
//     new Task('A', 5),
//     new Task('B', 6, ['A']),
//     new Task('C', 4, ['A']),
//     new Task('D', 3, ['B']),
//     new Task('E', 2, ['B', 'C']),
//     new Task('F', 4, ['C']),
//     new Task('G', 7, ['D', 'E', 'F']),
// ]
//
// const result = calculateCPM(tasks)
// console.log('Project Duration:', result.projectDuration)
// console.log(
//     'Critical Path:',
//     result.criticalPath.map((task) => task.id).join(' -> ')
// )
