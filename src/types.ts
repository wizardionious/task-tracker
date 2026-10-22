export type TaskId = string

export type Task = {
  id: TaskId
  text: string
  completed: boolean
  deletedAt: number | null
}
