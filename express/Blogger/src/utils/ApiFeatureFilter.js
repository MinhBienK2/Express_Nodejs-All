class ApiFeatureFilter {
    constructor(query,queryString){
        this.query = query,
        this.queryString = queryString
    }

    filter(){
        const queryObj = {...this.queryString}
        const excludesField = ['page','limit','fields','sort','select']
        excludesField.map((el) => {
            delete queryObj[el]
        })
        let queyrObjStr = JSON.stringify(queryObj)
        queyrObjStr = queyrObjStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
        this.query.find(JSON.parse(queyrObjStr))
        return this
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }
        return this
    }

    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        }
        if(this.queryString.select){
            const querySelect = this.queryString.select.split(',').join(' ')
            query.select(querySelect)
        }
        return this
    }

    pagination() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 100
        const skip = (page - 1) * limit
        this.query.skip(skip).limit(limit)
        return this
    }

}

module.exports = ApiFeatureFilter