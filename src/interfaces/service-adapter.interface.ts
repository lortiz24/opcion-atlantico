export interface ServiceAdapter {
    getAll<T>(): Promise<T>
    getOne<T>(id: string): Promise<T>
    create<T>(item: T): Promise<T>
    update<T>(url: string): Promise<T>
    delete<T>(url: string): Promise<T>
}
