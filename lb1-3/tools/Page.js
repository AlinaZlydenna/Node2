class Page {
    static async setValue(schema, sortColumn, limit, offset) {
        return await schema
            .sort(sortColumn)
            .limit(limit ?? 100)
            .skip(offset ?? 0)
    }
}

export default Page