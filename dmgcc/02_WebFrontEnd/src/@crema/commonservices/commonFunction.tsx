export const formatToUnits = (number, precision) =>{
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3)
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ))
    const suffix = abbrev[order];
  
    return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix;
  }

  
export interface FilmOptionType {
  inputValue?: string;
  hourly_description?: string;
  level?: string;
  rate?: string;
  year?: string,
  shortid?:any
}
