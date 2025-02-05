export type IDoSortFC = (callBack: () => void) => void

export interface ITableContext<THeads, TRows> {
  rows: TRows[]
  heads: THeads[]
  doSort: IDoSortFC
}

export interface IData<THeads, TRows> {
  rows: TRows[]
  heads: THeads[]
}
