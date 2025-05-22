export interface Snippet{
    id:number;
    title:string;
    code:string;
    createdAt:Date
}

export let snippets: Snippet[] = []