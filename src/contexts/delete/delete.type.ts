export interface IDeleteParams {
  title: string
  subTitle?: string
  description?: string
  onConfirm: () => void
}