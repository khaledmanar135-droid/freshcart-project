export interface ListResponse<type>{
    data:type[],
    results:number,
    metadata:MetaData
}


export interface MetaData{
    currentPage: number,
     limit:number, 
     numberOfPages: number
}

