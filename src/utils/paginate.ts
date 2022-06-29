const paginate = async (model: any, filters = {}, limit?: number, offset = 0) => {
    const queryParams: any = { where: filters, offset }

    if (limit) {
        queryParams.limit = limit
    }

    const results = await model.findAndCountAll(queryParams)

    let hasNextPage = false

    if (limit) {
        hasNextPage = (results.count - offset) > limit
    }

    return {
        total: results.count,
        results: results.rows,
        hasNextPage
    }
}

export default paginate
