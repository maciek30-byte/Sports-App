export const getStringFromDate = (data: Date): string=>{
  return data.toISOString().split('T')[0]
}
