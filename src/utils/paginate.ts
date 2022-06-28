const paginate = async (model: any, filters = {}, page = 1, limit = 10) => {
    const offset = page > 1 ? page * limit : 0
    const count = await model.count({ where: filters })

    const results = await model.findAndCountAll({
        where: filters,
        limit,
        offset
    })

    const hasNextPage = results.count === limit

    const nextPage = hasNextPage ? page + 1 : null

    return {
        count,
        results: results.rows,
        nextPage
    }
}

export default paginate
